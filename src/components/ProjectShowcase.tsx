import { useMemo, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "../lib/motion";
import { featuredProjectIds, projects, type Project } from "../data/portfolio";
import { useMedia, useReducedMotion } from "../hooks/useMedia";
import { ProjectPlate } from "./ProjectPlate";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "./Icons";
import { openProject } from "../lib/projectDetail";

const splitTitle = (t: string) => {
  const [name, ...rest] = t.split(" — ");
  return { name, tagline: rest.join(" — ") };
};

function Facts({ p }: { p: Project }) {
  const rows: [string, string[]][] = [];
  if (p.role) rows.push(["Role", [p.role]]);
  if (p.problem) rows.push(["Problem", [p.problem]]);
  if (p.results?.length) rows.push(["Results", p.results]);
  if (!rows.length && p.highlights?.length) rows.push(["Highlights", p.highlights]);
  if (!rows.length) return null;
  return (
    <dl className="s-fade mt-5 grid gap-x-6 gap-y-2 border-t border-navy-line pt-4 sm:grid-cols-[5.5rem_1fr]">
      {rows.map(([k, v]) => (
        <div key={k} className="contents">
          <dt className="eyebrow pt-0.5 text-lime">{k}</dt>
          <dd className="text-[0.84rem] leading-snug text-ivory/85">
            {v.length > 1 ? (
              <ul className="space-y-1">
                {v.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span aria-hidden="true" className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-teal" />
                    {x}
                  </li>
                ))}
              </ul>
            ) : (
              v[0]
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function ProjectShowcase() {
  const featured = useMemo(
    () => featuredProjectIds.map((id) => projects.find((p) => p.id === id)).filter((p): p is Project => !!p),
    []
  );
  const n = featured.length;
  const reduced = useReducedMotion();
  const tallDesktop = useMedia("(min-width: 1024px) and (min-height: 740px)");
  const pinMode = tallDesktop && !reduced;

  const root = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const prev = useRef(0);
  const [active, setActive] = useState(0);
  const p = featured[active];
  const { name, tagline } = splitTitle(p.title);

  /* ── Pinned scroll sequence (desktop). Scroll position ⇒ active project. ── */
  useGSAP(
    () => {
      stRef.current = null;
      if (!pinMode) return;
      const el = root.current!;
      const bar = el.querySelector(".showcase-bar");
      const st = ScrollTrigger.create({
        trigger: el.querySelector(".showcase-pin"),
        start: "top top",
        end: `+=${n * 75}%`,
        pin: true,
        anticipatePin: 1,
        refreshPriority: 5,
        invalidateOnRefresh: true,
        onToggle: (self) => document.documentElement.toggleAttribute("data-showcase", self.isActive),
        onUpdate: (self) => {
          const i = Math.min(n - 1, Math.floor(self.progress * n));
          setActive((c) => (c === i ? c : i));
          gsap.set(bar, { scaleX: self.progress });
          const parallax = el.querySelector(".plate-inner");
          if (parallax) gsap.set(parallax, { yPercent: (self.progress * n - Math.floor(self.progress * n) - 0.5) * -5 });
        },
      });
      stRef.current = st;
      return () => document.documentElement.removeAttribute("data-showcase");
    },
    { scope: root, dependencies: [pinMode, n], revertOnUpdate: true }
  );

  /* ── Transition between projects ── */
  const first = useRef(true);
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      const dir = active >= prev.current ? 1 : -1;
      prev.current = active;
      const q = gsap.utils.selector(root);
      if (reduced || prefersReducedMotion()) {
        gsap.from(q(".s-stage"), { opacity: 0, duration: 0.25 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q(".plate-clip"), { clipPath: dir > 0 ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)" }, { clipPath: "inset(0 0% 0 0%)", duration: 0.95 }, 0)
        .fromTo(q(".plate-zoom"), { scale: 1.22 }, { scale: 1, duration: 1.3 }, 0)
        .fromTo(q(".s-line"), { yPercent: 115 }, { yPercent: 0, duration: 0.9, stagger: 0.08 }, 0.08)
        .fromTo(q(".s-fade"), { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, 0.25)
        .fromTo(q(".s-numeral"), { x: dir * 90, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0);
    },
    { scope: root, dependencies: [active, reduced], revertOnUpdate: true }
  );

  /** Move to project i — by scrolling in pin mode (so scroll and UI never disagree), directly otherwise. */
  const goTo = (i: number) => {
    const idx = (i + n) % n;
    const st = stRef.current;
    if (pinMode && st) {
      const y = st.start + ((idx + 0.5) / n) * (st.end - st.start);
      if (prefersReducedMotion()) window.scrollTo({ top: y, behavior: "auto" });
      else gsap.to(window, { scrollTo: { y, autoKill: true }, duration: 0.9, ease: "power3.inOut", overwrite: true });
    } else setActive(idx);
  };

  const onKeys = (e: React.KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in map) {
      e.preventDefault();
      const next = (active + map[e.key] + n) % n;
      goTo(next);
      (e.currentTarget.querySelectorAll("button")[next] as HTMLElement | undefined)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(n - 1);
    }
  };

  return (
    <div ref={root} className="on-dark relative bg-navy text-ivory">
      <div className="showcase-pin bg-grid-dark relative flex min-h-[100svh] flex-col overflow-hidden py-24 lg:py-0 lg:pb-5 lg:pt-[5rem]">
        {/* scroll progress */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-navy-line">
          <div className="showcase-bar h-full origin-left bg-lime" style={{ transform: pinMode ? "scaleX(0)" : `scaleX(${(active + 1) / n})` }} />
        </div>

        {/* outlined index numeral — background movement */}
        <span
          key={`n-${p.id}`}
          aria-hidden="true"
          className="s-numeral numeral pointer-events-none absolute -right-4 top-20 hidden [--numeral-stroke:#28364A] lg:block"
          style={{ fontSize: "clamp(10rem, 28vw, 26rem)" }}
        >
          {p.index}
        </span>

        <div className="container-x relative flex flex-1 flex-col justify-center gap-6 lg:gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="eyebrow text-lime">[03] Featured work — selected projects</h2>
            </div>
            <p className="eyebrow text-ivory/70" aria-live="polite">
              <span className="text-lime">{String(active + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
              <span className="sr-only">
                {" "}
                — {name}
              </span>
            </p>
          </div>

          {/* stage */}
          <div className="s-stage grid items-center gap-8 lg:grid-cols-12 lg:gap-10" key={p.id}>
            <button
              type="button"
              onClick={() => openProject(p.id)}
              tabIndex={-1}
              aria-hidden="true"
              data-cursor="DETAILS"
              className="plate-clip relative block aspect-[8/5] w-full overflow-hidden rounded-2xl border border-navy-line lg:order-2 lg:col-span-7"
            >
              <div className="plate-inner absolute inset-x-0 -inset-y-[3%]">
                <div className="plate-zoom h-full w-full">
                  <ProjectPlate project={p} priority />
                </div>
              </div>
            </button>

            <article className="lg:order-1 lg:col-span-5" aria-label={`Project ${active + 1}: ${name}`}>
              <p className="s-fade eyebrow flex flex-wrap items-center gap-3 text-ivory/70">
                <span className="text-lime">{p.index}</span>
                <span aria-hidden="true">/</span>
                {p.category}
              </p>
              <h3 className="mt-4">
                <span className="block overflow-hidden pb-[0.1em]">
                  <span className="s-line block font-display font-bold leading-[1.02] tracking-[-0.03em]" style={{ fontSize: "clamp(1.8rem, 3.3vw, 3.1rem)" }}>
                    {name}
                  </span>
                </span>
                {tagline && (
                  <span className="block overflow-hidden">
                    <span className="s-line block pt-1 font-display text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-snug text-ivory/70">{tagline}</span>
                  </span>
                )}
              </h3>
              <p className="s-fade mt-4 max-w-xl text-[0.9rem] leading-relaxed text-ivory/85">{p.description}</p>

              <Facts p={p} />

              <ul className="s-fade mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
                {p.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              {p.caveat && <p className="s-fade mt-3 max-w-xl text-[0.7rem] leading-relaxed text-ivory/60">{p.caveat}</p>}

              <div className="s-fade mt-6 flex flex-wrap gap-3 lg:hidden">
                <button type="button" onClick={() => openProject(p.id)} className="btn btn-lime">
                  Full details <ArrowRight />
                </button>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-lime">
                  {p.repoIsProfile ? "GitHub profile" : "View on GitHub"} <ArrowUpRight />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Live demo <ArrowUpRight />
                  </a>
                )}
              </div>
            </article>
          </div>

          {/* controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-navy-line pt-4 lg:pr-20">
            <div
              role="group"
              aria-label="Choose a featured project"
              onKeyDown={onKeys}
              className="flex flex-wrap gap-2"
            >
              {featured.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "true" : undefined}
                  className={`group relative flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                    i === active ? "border-lime bg-lime text-navy" : "border-navy-line text-ivory/80 hover:border-ivory/60 hover:text-ivory"
                  }`}
                >
                  {f.index}
                  <span className="max-w-[9rem] truncate max-2xl:sr-only">{splitTitle(f.title).name.split("_")[0]}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-2 hidden gap-2 lg:flex">
                <button type="button" onClick={() => openProject(p.id)} className="btn btn-lime !min-h-11">
                  Full details <ArrowRight />
                </button>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11">
                  {p.repoIsProfile ? "GitHub profile" : "GitHub"} <ArrowUpRight />
                </a>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !min-h-11">
                    Live demo <ArrowUpRight />
                  </a>
                )}
              </div>
              <button type="button" onClick={() => goTo(active - 1)} className="btn btn-ghost !px-4" aria-label="Previous project">
                <ArrowLeft />
              </button>
              <button type="button" onClick={() => goTo(active + 1)} className="btn btn-ghost !px-4" aria-label="Next project">
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
