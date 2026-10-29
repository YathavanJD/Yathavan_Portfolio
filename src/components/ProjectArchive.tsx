import { useLayoutEffect, useRef, useState } from "react";
import type { ScrollTrigger as ST } from "gsap/ScrollTrigger";
import { gsap, Flip, ScrollTrigger, useGSAP } from "../lib/motion";
import { featuredProjectIds, projectGroups, projects, type Project, type ProjectGroup } from "../data/portfolio";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia";
import { ProjectPlate } from "./ProjectPlate";
import { ArrowUpRight } from "./Icons";

type Filter = "All" | ProjectGroup;

function ProjectCard({ p, hidden }: { p: Project; hidden: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const [name, ...rest] = p.title.split(" — ");
  const featured = featuredProjectIds.includes(p.id);

  /* Restrained perspective tilt on an inner wrapper (Flip owns the outer element's transform). */
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !fine || reduced) return;
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });
      gsap.set(el, { transformPerspective: 900 });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 5);
        rx(((e.clientY - r.top) / r.height - 0.5) * -5);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref, dependencies: [fine, reduced], revertOnUpdate: true }
  );

  return (
    <li className={`pcard ${hidden ? "hidden" : ""}`} data-id={p.id}>
      <div ref={ref} className="h-full will-change-transform">
        <article
          className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hair bg-paper transition-[border-color,box-shadow] duration-500 hover:border-navy/40 hover:shadow-[0_24px_40px_-28px_rgba(16,24,39,0.45)] focus-within:border-navy/40"
          aria-labelledby={`pt-${p.id}`}
        >
          <div className="relative aspect-[8/5] overflow-hidden bg-navy">
            <div className="h-full w-full transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]">
              <ProjectPlate project={p} />
            </div>
            {featured && (
              <span className="eyebrow absolute right-3 top-3 rounded-full bg-lime px-2.5 py-1 !text-[0.62rem] text-navy">Featured</span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <p className="eyebrow flex items-center gap-2 text-slate-ink">
              <span className="text-navy">{p.index}</span>
              <span aria-hidden="true">/</span>
              {p.category}
            </p>
            <h3 id={`pt-${p.id}`} className="mt-3 font-display text-xl font-semibold leading-tight tracking-tight transition-transform duration-500 group-hover:translate-x-0.5">
              {name}
            </h3>
            {rest.length > 0 && <p className="mt-1 text-sm font-medium text-slate-ink">{rest.join(" — ")}</p>}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-ink">{p.description}</p>

            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
              {p.stack.slice(0, 4).map((s) => (
                <li key={s} className="chip !min-h-6 !px-2.5 !text-[0.62rem]">
                  {s}
                </li>
              ))}
              {p.stack.length > 4 && <li className="chip !min-h-6 !px-2.5 !text-[0.62rem]">+{p.stack.length - 4}</li>}
            </ul>

            <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !min-h-11 !px-4"
                aria-label={`${p.repoIsProfile ? "GitHub profile" : "GitHub repository"} for ${name} — opens in a new tab`}
              >
                {p.repoIsProfile ? "GitHub profile" : "GitHub"} <ArrowUpRight width={15} height={15} />
              </a>
              {p.live && (
                <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-lime !min-h-11 !px-4">
                  Live demo <ArrowUpRight width={15} height={15} />
                </a>
              )}
            </div>
          </div>
        </article>
      </div>
    </li>
  );
}

export default function ProjectArchive() {
  const [filter, setFilter] = useState<Filter>("All");
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const reveal = useRef<ST[]>([]);
  const reduced = useReducedMotion();

  const shown = projects.filter((p) => filter === "All" || p.group === filter);
  const count = (f: Filter) => (f === "All" ? projects.length : projects.filter((p) => p.group === f).length);

  const choose = (f: Filter) => {
    if (f === filter) return;
    // Using a filter means the visitor is engaged: finish any pending scroll-reveals so Flip is the only motion.
    reveal.current.forEach((t) => t.kill());
    reveal.current = [];
    if (grid.current) gsap.set(grid.current.querySelectorAll(".pcard"), { opacity: 1, y: 0 });
    if (!reduced && grid.current) flipState.current = Flip.getState(grid.current.querySelectorAll(".pcard"));
    setFilter(f);
  };

  /* Animate the layout change (Flip) after React has updated the DOM. */
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current) return;
    flipState.current = null;
    const ctx = gsap.context(() => {
      Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.025,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, delay: 0.15, ease: "power3.out" }),
        onLeave: (els) => gsap.to(els, { opacity: 0, duration: 0.25 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    }, grid);
    return () => ctx.revert();
  }, [filter]);

  /* Reveal cards as they scroll in. */
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".pcard", { opacity: 0 });
        reveal.current = ScrollTrigger.batch(".pcard", {
          start: "top 90%",
          once: true,
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true }),
        });
        
      });
      return () => mm.revert();
    },
    { scope: grid }
  );

  return (
    <div id="archive" className="section-pad bg-ivory">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-ink">[04] Archive</p>
            <h2 className="t-display mt-3">Every project, in one place.</h2>
            <p className="t-lede mt-5 text-slate-ink">
              {projects.length} repositories — from Android apps and PHP / MySQL platforms to an AI thesis project and a security
              assessment. Filter by type.
            </p>
          </div>
          <p className="eyebrow text-slate-ink" role="status" aria-live="polite">
            Showing {shown.length} of {projects.length}
          </p>
        </div>

        <div role="group" aria-label="Filter projects by type" className="mt-10 flex flex-wrap gap-2">
          {projectGroups.map((g) => {
            const on = filter === g;
            return (
              <button
                key={g}
                type="button"
                aria-pressed={on}
                onClick={() => choose(g)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                  on ? "border-navy bg-navy text-ivory" : "border-navy/25 text-navy hover:border-navy"
                }`}
              >
                {g}
                <span className={on ? "text-lime" : "text-slate-ink"}>{count(g)}</span>
              </button>
            );
          })}
        </div>

        <ul ref={grid} className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" aria-label="Projects">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} hidden={!(filter === "All" || p.group === filter)} />
          ))}
        </ul>
      </div>
    </div>
  );
}
