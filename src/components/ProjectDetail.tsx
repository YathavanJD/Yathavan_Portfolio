import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/motion";
import { projects } from "../data/portfolio";
import { OPEN_PROJECT_EVENT } from "../lib/projectDetail";
import { ProjectPlate } from "./ProjectPlate";
import { ArrowLeft, ArrowRight, ArrowUpRight, Close } from "./Icons";

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="pd-block">
      <h3 className="eyebrow mb-4 flex items-center gap-3 text-teal-ink">
        <span aria-hidden="true" className="h-px w-6 bg-navy" />
        {label}
      </h3>
      {children}
    </section>
  );
}

/**
 * Full project details dialog. Open it with openProject(id) from anywhere.
 * Not rendered inside the inert page wrapper; focus is trapped, Esc closes, focus returns to the opener.
 */
export default function ProjectDetail({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const [id, setId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const index = id ? projects.findIndex((p) => p.id === id) : -1;
  const p = index >= 0 ? projects[index] : null;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const pid = (e as CustomEvent<string>).detail;
      if (!projects.some((x) => x.id === pid)) return;
      opener.current = document.activeElement as HTMLElement | null;
      setId(pid);
    };
    window.addEventListener(OPEN_PROJECT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PROJECT_EVENT, onOpen);
  }, []);

  useEffect(() => onOpenChange(!!id), [id, onOpenChange]);

  const close = useCallback(() => {
    const done = () => {
      setId(null);
      // The page is inert until React re-renders; restore focus once it's interactive again.
      window.setTimeout(() => {
        const el = opener.current;
        if (el && document.contains(el)) el.focus({ preventScroll: true });
      }, 60);
    };
    if (panel.current && !prefersReducedMotion()) {
      gsap.to(panel.current, { opacity: 0, y: 24, duration: 0.25, ease: "power2.in", onComplete: done });
      gsap.to(".pd-backdrop", { opacity: 0, duration: 0.25 });
    } else done();
  }, []);

  // Keyboard: Esc closes, Tab is trapped inside the dialog, arrows are not hijacked.
  useEffect(() => {
    if (!id) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !panel.current) return;
      const f = [...panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])")].filter(
        (el) => el.offsetParent !== null
      );
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [id, close]);

  // Open animation, and a content fade when stepping to another project.
  useGSAP(
    () => {
      if (!id || !panel.current) return;
      const reduce = prefersReducedMotion();
      scroller.current?.scrollTo({ top: 0 });
      if (reduce) {
        gsap.fromTo(panel.current, { opacity: 0 }, { opacity: 1, duration: 0.15 });
      } else {
        gsap.fromTo(".pd-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(panel.current, { opacity: 0, y: 40, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
        gsap.from(".pd-block", { opacity: 0, y: 18, duration: 0.6, stagger: 0.07, delay: 0.2, ease: "power3.out" });
      }
      closeBtn.current?.focus({ preventScroll: true });
    },
    { dependencies: [id], revertOnUpdate: true }
  );

  if (!p) return null;
  const d = p.details;
  const [name, ...rest] = p.title.split(" — ");
  const go = (delta: number) => setId(projects[(index + delta + projects.length) % projects.length].id);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div className="fixed inset-0 z-[90]" role="presentation">
      <div className="pd-backdrop absolute inset-0 bg-navy/80" onClick={close} aria-hidden="true" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pd-title"
        className="absolute inset-0 flex flex-col overflow-hidden bg-ivory sm:inset-4 sm:rounded-3xl lg:inset-x-[max(2rem,calc(50%-34rem))] lg:inset-y-6"
      >
        <div ref={scroller} className="flex-1 overflow-y-auto overscroll-contain">
          {/* header */}
          <header className="on-dark bg-grid-dark relative bg-navy text-ivory">
            <div className="absolute inset-0 opacity-30" aria-hidden="true">
              <ProjectPlate project={p} />
            </div>
            <div className="relative px-5 pb-8 pt-20 sm:px-10 sm:pb-12 sm:pt-24">
              <p className="eyebrow flex flex-wrap items-center gap-3 text-ivory/80">
                <span className="text-lime">{p.index}</span>
                <span aria-hidden="true">/</span>
                {p.category}
                <span className="chip">{p.group}</span>
              </p>
              <h2 id="pd-title" className="mt-4 max-w-3xl font-display font-bold leading-[1.02] tracking-[-0.03em]" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)" }}>
                {name}
              </h2>
              {rest.length > 0 && <p className="mt-2 max-w-2xl font-display text-lg text-ivory/75 sm:text-xl">{rest.join(" — ")}</p>}
              <div className="mt-7 flex flex-wrap gap-3">
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-lime">
                  {p.repoIsProfile ? "GitHub profile" : "View on GitHub"} <ArrowUpRight />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Live demo <ArrowUpRight />
                  </a>
                )}
              </div>
            </div>
            <button
              ref={closeBtn}
              type="button"
              onClick={close}
              aria-label="Close project details"
              className="on-dark absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/30 bg-navy text-ivory transition-colors hover:bg-ivory hover:text-navy sm:right-6 sm:top-6"
            >
              <Close />
            </button>
          </header>

          {/* body */}
          <div className="grid gap-12 px-5 py-10 sm:px-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
            <div className="space-y-12 lg:col-span-8">
              <Block label="Overview">
                <div className="space-y-4 text-[1.02rem] leading-[1.75] text-navy">
                  {d.overview.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  {p.problem && !d.overview.some((t) => t.includes("rely on listening history")) && <p className="text-slate-ink">{p.problem}</p>}
                </div>
              </Block>

              {d.features && (
                <Block label="Key features">
                  <ul className="grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2">
                    {d.features.map((f) => (
                      <li key={f.title} className="bg-paper p-5 sm:[&:last-child:nth-child(odd)]:col-span-2">
                        <p className="font-display text-base font-semibold tracking-tight">{f.title}</p>
                        {f.text && <p className="mt-1.5 text-sm leading-relaxed text-slate-ink">{f.text}</p>}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {d.flow && (
                <Block label="How it works">
                  <ol className="space-y-3">
                    {d.flow.map((s, i) => (
                      <li key={s} className="flex gap-4">
                        <span className="eyebrow grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy !text-[0.65rem] text-lime">{i + 1}</span>
                        <span className="pt-0.5 text-[0.95rem] leading-relaxed">{s}</span>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              {d.architecture && (
                <Block label="Architecture">
                  <ul className="space-y-2.5">
                    {d.architecture.map((a) => (
                      <li key={a} className="flex gap-3 text-[0.95rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {d.metrics && (
                <Block label={p.id === "vidma" ? "Deliverables" : "Reported results"}>
                  <dl className="grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2">
                    {d.metrics.map((m, i) => (
                      <div key={m.label + i} className="bg-paper p-5 sm:[&:last-child:nth-child(odd)]:col-span-2">
                        <dt className="eyebrow text-slate-ink">{m.label}</dt>
                        <dd className="mt-2 font-display text-2xl font-semibold tracking-tight">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                </Block>
              )}

              {d.usage && (
                <Block label="How to use it">
                  <ol className="list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed marker:font-mono marker:text-teal-ink">
                    {d.usage.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ol>
                </Block>
              )}

              {d.purpose && (
                <Block label="What it was built to explore">
                  <ul className="space-y-2.5">
                    {d.purpose.map((u) => (
                      <li key={u} className="flex gap-3 text-[0.95rem] leading-relaxed">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {d.run && (
                <Block label="Run it locally">
                  <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
                    {d.run.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span aria-hidden="true" className="eyebrow pt-0.5 text-teal-ink">
                          &gt;
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {d.future && (
                <Block label="Planned improvements">
                  <ul className="space-y-2.5 text-[0.95rem] leading-relaxed">
                    {d.future.map((r) => (
                      <li key={r} className="flex gap-3">
                        <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full border border-navy" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              {d.notes && (
                <Block label="Notes">
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-ink">
                    {d.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </Block>
              )}
            </div>

            {/* sidebar */}
            <aside className="space-y-8 lg:col-span-4" aria-label="Project facts">
              <div className="pd-block rounded-2xl border border-hair bg-paper p-6 lg:sticky lg:top-6">
                <dl className="space-y-5 text-sm">
                  <div>
                    <dt className="eyebrow text-slate-ink">Type</dt>
                    <dd className="mt-1.5">{p.category}</dd>
                  </div>
                  {p.role && (
                    <div>
                      <dt className="eyebrow text-slate-ink">Role</dt>
                      <dd className="mt-1.5">{p.role}</dd>
                    </div>
                  )}
                  {d.context && (
                    <div>
                      <dt className="eyebrow text-slate-ink">Context</dt>
                      <dd className="mt-1.5 leading-relaxed">{d.context}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="eyebrow text-slate-ink">Technologies</dt>
                    <dd className="mt-2">
                      <ul className="flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <li key={s} className="chip">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  {d.stackByLayer && (
                    <div>
                      <dt className="eyebrow text-slate-ink">Stack by layer</dt>
                      <dd className="mt-2 divide-y divide-hair">
                        {d.stackByLayer.map((l) => (
                          <p key={l.layer} className="py-2 leading-snug">
                            <span className="eyebrow block !text-[0.62rem] text-teal-ink">{l.layer}</span>
                            {l.tech}
                          </p>
                        ))}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="eyebrow text-slate-ink">Source of these details</dt>
                    <dd className="mt-1.5 leading-relaxed text-slate-ink">
                      {d.source === "readme" ? "The project's own README on GitHub, plus this portfolio's data." : "This portfolio's project summary only."}
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>

          {/* prev / next */}
          <nav aria-label="Other projects" className="grid gap-px border-t border-hair bg-hair sm:grid-cols-2">
            {[
              { proj: prev, dir: -1, label: "Previous project", icon: <ArrowLeft /> },
              { proj: next, dir: 1, label: "Next project", icon: <ArrowRight /> },
            ].map(({ proj, dir, label, icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(dir)}
                className={`group flex min-h-24 items-center gap-4 bg-ivory p-6 text-left transition-colors hover:bg-navy hover:text-ivory ${dir > 0 ? "sm:flex-row-reverse sm:text-right" : ""}`}
              >
                <span className="shrink-0 text-navy group-hover:text-lime">{icon}</span>
                <span className="min-w-0">
                  <span className="eyebrow block text-slate-ink group-hover:text-ivory/70">{label}</span>
                  <span className="mt-1 block truncate font-display text-lg font-semibold">{proj.title.split(" — ")[0]}</span>
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
