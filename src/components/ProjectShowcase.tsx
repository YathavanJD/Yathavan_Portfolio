import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { featuredProjectIds, projects } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";

const featured = featuredProjectIds
  .map((id) => projects.find((p) => p.id === id)!)
  .filter(Boolean);

const INTERVAL_MS = 5000;

export default function ProjectShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const total = featured.length;
  const reducedMotion = useReducedMotion();

  const advance = (dir = 1) => {
    setActiveIndex((prev) => (prev + dir + total) % total);
  };

  useEffect(() => {
    if (paused || reducedMotion) return;
    const id = window.setInterval(() => advance(1), INTERVAL_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, activeIndex, reducedMotion]);

  useGSAP(
    () => {
      if (!progressRef.current) return;
      gsap.killTweensOf(progressRef.current);
      if (reducedMotion) {
        gsap.set(progressRef.current, { width: "100%" });
        return;
      }
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: paused ? 999 : INTERVAL_MS / 1000, ease: "none" }
      );
    },
    { dependencies: [activeIndex, paused, reducedMotion] }
  );

  useGSAP(
    () => {
      if (!stageRef.current) return;
      const tl = gsap.timeline();
      tl.fromTo(
        ".showcase-tile img",
        { opacity: 0, scale: 1.08 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      )
        .fromTo(
          ".showcase-title-line",
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power4.out" },
          "-=0.75"
        )
        .fromTo(
          ".showcase-desc",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".showcase-cta",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.35"
        );
    },
    { dependencies: [activeIndex], scope: stageRef }
  );

  const active = featured[activeIndex];
  const titleWords = active.title.split(" — ");

  const upcoming = Array.from({ length: Math.min(4, total - 1) }, (_, i) => {
    const idx = (activeIndex + 1 + i) % total;
    return featured[idx];
  });

  return (
    <section id="work" className="relative py-24 md:py-32 bg-canvas">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal-text mb-3">
              [BUILD LOG]
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink">
              Selected work, on rotation
            </h2>
          </div>
          <p className="font-mono text-xs text-slate max-w-xs">
            Auto-advancing every {INTERVAL_MS / 1000}s — hover to pause, or pick a build directly.
          </p>
        </div>

        <div
          ref={stageRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative rounded-2xl md:rounded-3xl border border-line/10 overflow-hidden h-[560px] md:h-[520px] shadow-xl shadow-ink/5"
        >
          {/* Stage / large photo tile */}
          <div className="showcase-tile absolute inset-0 bg-scrim">
            <img
              key={active.id}
              src={active.image}
              alt={active.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-scrim via-scrim/55 to-scrim/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-scrim/60 via-transparent to-transparent" />

          {/* Text content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-10">
            <div className="flex items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-amber border border-amber/40 rounded-full px-3 py-1 bg-scrim/40 backdrop-blur-sm">
                {active.category}
              </span>
              <span className="font-mono text-xs text-paper/70">
                {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>

            <div className="max-w-2xl">
              <h3 className="font-display font-semibold text-2xl md:text-4xl leading-tight text-paper overflow-hidden">
                {titleWords.map((line, i) => (
                  <span key={i} className="showcase-title-line block overflow-hidden">
                    <span className="block">{line}</span>
                  </span>
                ))}
              </h3>
              <p className="showcase-desc font-body text-sm md:text-base text-paper/80 mt-4 max-w-xl">
                {active.description}
              </p>
              <div className="showcase-cta flex flex-wrap items-center gap-3 mt-5">
                {active.stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[10px] uppercase tracking-wider text-paper/80 border border-paper/25 rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
                <a
                  href={active.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-ink bg-paper px-4 py-2 rounded-full hover:bg-signal hover:text-paper transition-colors"
                >
                  View repo &#8599;
                </a>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-40 md:w-56 h-[3px] bg-paper/20 rounded-full overflow-hidden">
              <div ref={progressRef} className="h-full bg-amber rounded-full" style={{ width: "0%" }} />
            </div>
          </div>

          {/* Thumbnail stack */}
          <div className="absolute bottom-6 right-6 z-10 hidden sm:flex gap-2 md:gap-3">
            {upcoming.map((p, i) => {
              const realIndex = featured.findIndex((f) => f.id === p.id);
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(realIndex)}
                  className="group w-16 h-20 md:w-20 md:h-24 rounded-lg border border-paper/25 overflow-hidden relative transition-transform hover:-translate-y-1 focus-visible:-translate-y-1 shadow-md"
                  style={{ opacity: 1 - i * 0.15 }}
                  aria-label={`Show ${p.title}`}
                >
                  <img src={p.image} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 bg-scrim/30 group-hover:bg-scrim/10 transition-colors" />
                  <span className="absolute inset-x-0 bottom-0 bg-scrim/70 font-mono text-[9px] text-paper px-1 py-0.5 truncate">
                    {p.category.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Index dots for touch devices */}
        <div className="flex sm:hidden gap-2 mt-5 justify-center">
          {featured.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show ${p.title}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? "w-6 bg-amber" : "w-1.5 bg-line/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
