import { useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, EMAIL_SUBJECT, FORM_ENDPOINT } from "../config/site";
import { mailtoUrl, whatsappConfigured, whatsappUrl } from "../lib/contact";
import { Send } from "./Icons";

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "prepared" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, like name@example.com.";
  if (v.subject.trim().length < 3) e.subject = "Please add a short subject.";
  if (v.message.trim().length < 10) e.message = "Please write at least a sentence (10 characters).";
  if (v.message.length > 1500) e.message = "Please keep your message under 1,500 characters.";
  return e;
}

/**
 * Honest contact form.
 *  • With VITE_FORM_ENDPOINT set (e.g. a Formspree URL): POSTs JSON; success is only shown on a 2xx reply.
 *  • Without it: it prepares a pre-filled email in the visitor's mail app and says exactly that —
 *    it never claims a message was delivered. A hidden honeypot field filters naive bots.
 */
export default function ContactForm() {
  const [values, setValues] = useState<Fields>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const mounted = useRef(Date.now());
  const honey = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLDivElement>(null);

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (errors[k]) setErrors((cur) => ({ ...cur, [k]: validate(next)[k] }));
  };
  const blur = (k: keyof Fields) => () => setErrors((cur) => ({ ...cur, [k]: validate(values)[k] }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first invalid field so screen-reader users land on the problem.
      const first = (Object.keys(found) as (keyof Fields)[])[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    if (honey.current?.value) return; // bot: pretend success, send nothing
    setStatus("sending");

    if (FORM_ENDPOINT) {
      try {
        if (Date.now() - mounted.current < 2500) throw new Error("too-fast");
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, _subject: `${EMAIL_SUBJECT}: ${values.subject}` }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("sent");
        setValues({ name: "", email: "", subject: "", message: "" });
      } catch {
        setStatus("error");
      }
      return;
    }

    // No backend configured → open the visitor's mail client with everything pre-filled.
    const body = `${values.message.trim()}\n\n—\n${values.name.trim()}\n${values.email.trim()}`;
    window.setTimeout(() => {
      window.location.href = mailtoUrl({ subject: `${EMAIL_SUBJECT} — ${values.subject.trim()}`, body });
      setStatus("prepared");
    }, 350);
  }

  const field = "w-full rounded-xl border bg-paper px-4 py-3 text-[0.95rem] text-navy placeholder:text-slate transition-colors focus:border-navy";
  const err = (k: keyof Fields) => (errors[k] ? "border-[#b42318]" : "border-hair hover:border-navy/40");

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="cf-note" className="rounded-3xl bg-ivory p-6 text-navy sm:p-8">
      <h3 className="font-display text-2xl font-semibold tracking-tight">Send a message</h3>
      <p id="cf-note" className="mt-2 text-sm text-slate-ink">
        {FORM_ENDPOINT
          ? "Your message is sent straight to Yathavan."
          : "This opens your email app with the message pre-filled — nothing is sent until you press Send there."}
      </p>

      {/* honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this empty
          <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {Object.keys(errors).filter((k) => errors[k as keyof Fields]).length > 0 && (
        <div ref={summary} role="alert" className="mt-5 rounded-xl border border-[#b42318] bg-[#fef3f2] px-4 py-3 text-sm text-[#7a271a]">
          Please fix the highlighted {Object.keys(errors).filter((k) => errors[k as keyof Fields]).length === 1 ? "field" : "fields"} below.
        </div>
      )}

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {([
          ["name", "Your name", "text", "name"],
          ["email", "Your email", "email", "email"],
        ] as const).map(([k, label, type, auto]) => (
          <div key={k}>
            <label htmlFor={`cf-${k}`} className="eyebrow mb-2 block text-slate-ink">
              {label} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`cf-${k}`}
              name={k}
              type={type}
              autoComplete={auto}
              required
              value={values[k]}
              onChange={set(k)}
              onBlur={blur(k)}
              aria-invalid={!!errors[k]}
              aria-describedby={errors[k] ? `cf-${k}-err` : undefined}
              className={`${field} ${err(k)}`}
            />
            {errors[k] && (
              <p id={`cf-${k}-err`} className="mt-1.5 text-sm text-[#b42318]">
                {errors[k]}
              </p>
            )}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="cf-subject" className="eyebrow mb-2 block text-slate-ink">
            Subject <span aria-hidden="true">*</span>
          </label>
          <input
            id="cf-subject"
            name="subject"
            required
            value={values.subject}
            onChange={set("subject")}
            onBlur={blur("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "cf-subject-err" : undefined}
            className={`${field} ${err("subject")}`}
          />
          {errors.subject && (
            <p id="cf-subject-err" className="mt-1.5 text-sm text-[#b42318]">
              {errors.subject}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="eyebrow mb-2 block text-slate-ink">
            Message <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            maxLength={1600}
            value={values.message}
            onChange={set("message")}
            onBlur={blur("message")}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "cf-message-err" : undefined}
            className={`${field} resize-y ${err("message")}`}
          />
          {errors.message && (
            <p id="cf-message-err" className="mt-1.5 text-sm text-[#b42318]">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-lime !bg-navy !text-ivory hover:!bg-lime hover:!text-navy" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : FORM_ENDPOINT ? "Send message" : "Prepare email"} <Send width={16} height={16} />
        </button>
        <p role="status" aria-live="polite" className="min-h-6 text-sm">
          {status === "sending" && <span className="text-slate-ink">Working on it…</span>}
          {status === "sent" && <span className="font-medium text-teal-ink">Message sent — thank you. Yathavan will reply to the email address you provided.</span>}
          {status === "prepared" && (
            <span className="font-medium text-teal-ink">
              Your email app should have opened with your message ready. Nothing has been sent yet — press Send there. Nothing happened?{" "}
              <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </span>
          )}
          {status === "error" && (
            <span className="font-medium text-[#b42318]">
              That didn’t go through.{" "}
              <a className="underline" href={mailtoUrl({ subject: values.subject || undefined, body: values.message || undefined })}>
                Email instead
              </a>
              {whatsappConfigured && (
                <>
                  {" "}or{" "}
                  <a className="underline" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                    message on WhatsApp
                  </a>
                </>
              )}
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
