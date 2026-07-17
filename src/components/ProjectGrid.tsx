import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 32,
          duration: 0.6,
          ease: "power2.out",
          delay: (i % 3) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: gridRef }
  );

  return (
    <section className="relative py-24 md:py-32 bg-paper border-t border-line/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal-text mb-3">
          [ALL BUILDS]
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-12 max-w-2xl">
          13 repositories. All shipped, all on GitHub.
        </h2>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="project-card group relative rounded-xl border border-line/10 bg-canvas overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-amber/40 hover:shadow-xl hover:shadow-ink/5"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/10 to-transparent" />
                <span className="absolute top-3 left-3 text-2xl drop-shadow">{p.icon}</span>
                <span className="absolute top-3 right-3 font-mono text-[10px] text-paper/90 bg-scrim/40 rounded px-1.5 py-0.5 backdrop-blur-sm">
                  {p.index}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-text">
                  {p.category}
                </span>
                <h3 className="font-display font-semibold text-lg text-ink mt-2 leading-snug group-hover:text-signal-text transition-colors">
                  {p.title}
                </h3>
                <p className="font-body text-xs text-slate mt-2 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {p.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[9px] uppercase tracking-wider text-slate border border-line/15 rounded px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
