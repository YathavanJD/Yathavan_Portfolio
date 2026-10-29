import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";
import { CHAT_ENDPOINT } from "../config/site";
import { Close, Send } from "../components/Icons";
import MotoBotIcon from "./MotoBotIcon";
import { STARTERS, WELCOME, ask, type Link, type Turn } from "./engine";

type Msg = { id: number; role: "user" | "assistant"; text: string; links?: Link[]; error?: boolean };

export default function MotoBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>(STARTERS);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"ai" | "demo">(CHAT_ENDPOINT ? "ai" : "demo");
  const idRef = useRef(0);
  const panel = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message appears the first time the panel opens (no persistence: history lives only in memory).
  useEffect(() => {
    if (open && msgs.length === 0) setMsgs([{ id: ++idRef.current, role: "assistant", text: WELCOME }]);
  }, [open, msgs.length]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [msgs, typing, open]);

  useGSAP(
    () => {
      if (!open || !panel.current) return;
      if (prefersReducedMotion()) gsap.fromTo(panel.current, { opacity: 0 }, { opacity: 1, duration: 0.15 });
      else gsap.fromTo(panel.current, { opacity: 0, y: 24, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power3.out" });
      inputRef.current?.focus();
    },
    { dependencies: [open], revertOnUpdate: true }
  );

  const close = () => {
    setOpen(false);
    launcher.current?.focus();
  };

  async function send(text: string) {
    const t = text.trim();
    if (!t || typing) return;
    const user: Msg = { id: ++idRef.current, role: "user", text: t };
    const next = [...msgs, user];
    setMsgs(next);
    setInput("");
    setSuggestions([]);
    setTyping(true);
    const history: Turn[] = next.map((m) => ({ role: m.role, content: m.text }));
    const [res] = await Promise.all([ask(history), new Promise((r) => setTimeout(r, prefersReducedMotion() ? 150 : 650))]);
    setMode(res.mode);
    setTyping(false);
    setMsgs((cur) => [...cur, { id: ++idRef.current, role: "assistant", text: res.reply.text, links: res.reply.links, error: res.error }]);
    setSuggestions(res.reply.suggestions ?? []);
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <>
      <button
        ref={launcher}
        type="button"
        aria-expanded={open}
        aria-controls="motobot-panel"
        onClick={() => (open ? close() : setOpen(true))}
        className={`on-dark fixed bottom-4 right-4 z-[55] flex h-14 items-center gap-2 rounded-full border border-navy-line bg-navy pl-2 pr-2 text-ivory shadow-[0_12px_28px_-12px_rgba(16,24,39,0.7)] transition-[transform,opacity] duration-300 hover:scale-[1.03] sm:bottom-6 sm:right-6 sm:pr-5 ${open ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100" : ""}`}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ivory">
          <MotoBotIcon size={26} />
        </span>
        <span className="eyebrow hidden sm:inline">{open ? "Close MotoBot" : "Ask MotoBot"}</span>
        <span className="sr-only sm:hidden">{open ? "Close MotoBot chat" : "Open MotoBot chat"}</span>
      </button>

      {open && (
        <div
          id="motobot-panel"
          ref={panel}
          role="dialog"
          aria-label="MotoBot — Yathavan's digital assistant"
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="on-dark fixed inset-x-3 bottom-3 z-[56] flex h-[min(82dvh,640px)] flex-col overflow-hidden rounded-3xl border border-navy-line bg-navy text-ivory shadow-[0_30px_70px_-20px_rgba(16,24,39,0.8)] sm:inset-x-auto sm:bottom-24 sm:right-6 sm:w-[25rem]"
        >
          <header className="flex items-center gap-3 border-b border-navy-line px-4 py-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ivory">
              <MotoBotIcon size={26} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-semibold leading-tight">MotoBot</p>
              <p
                className="eyebrow !text-[0.6rem] text-teal"
                title={mode === "demo" ? "No AI model is connected. Answers come from a fixed rule-based matcher over the portfolio's own data." : "Answers come from an AI service grounded in the portfolio data."}
              >
                {mode === "demo" ? "Demo · rule-based, not an AI model" : "AI-assisted"}
              </p>
            </div>
            <button type="button" onClick={close} aria-label="Close chat" className="grid h-11 w-11 place-items-center rounded-full border border-navy-line hover:bg-ivory hover:text-navy">
              <Close />
            </button>
          </header>

          <div ref={log} role="log" aria-live="polite" aria-label="Conversation" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {msgs.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-[0.9rem] leading-relaxed ${
                    m.role === "user" ? "rounded-br-md bg-lime text-navy" : "rounded-bl-md border border-navy-line bg-navy-soft text-ivory"
                  }`}
                >
                  {m.text.split("\n").map((line, i) => (
                    <p key={i} className={i ? "mt-1.5" : ""}>
                      {line}
                    </p>
                  ))}
                  {m.links && m.links.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <li key={l.href + l.label}>
                          <a
                            href={l.href}
                            target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            className="inline-flex min-h-9 items-center rounded-full border border-lime px-3 text-xs font-medium text-lime transition-colors hover:bg-lime hover:text-navy"
                          >
                            {l.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex" role="status" aria-label="MotoBot is typing">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-navy-line bg-navy-soft px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal motion-reduce:animate-none" style={{ animationDelay: `${i * 160}ms` }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {suggestions.length > 0 && !typing && (
            <div className="max-h-[9.5rem] overflow-y-auto border-t border-navy-line px-4 py-3">
              <p className="eyebrow mb-2 !text-[0.6rem] text-ivory/60">Try asking</p>
              <ul className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => void send(s)}
                      className="min-h-9 rounded-full border border-navy-line px-3 text-left text-xs text-ivory/90 transition-colors hover:border-lime hover:text-lime"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={submit} className="flex items-center gap-2 border-t border-navy-line p-3">
            <label htmlFor="motobot-input" className="sr-only">
              Ask MotoBot a question
            </label>
            <input
              id="motobot-input"
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={300}
              autoComplete="off"
              placeholder="Ask about projects, skills, CV…"
              className="min-h-11 flex-1 rounded-full border border-navy-line bg-navy-soft px-4 text-sm text-ivory placeholder:text-ivory/50 focus:border-lime"
            />
            <button type="submit" disabled={typing || !input.trim()} aria-label="Send message" className="btn btn-lime !min-h-11 !px-4">
              <Send width={16} height={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
