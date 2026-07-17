import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroScenes, profile } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsMobile } from "../hooks/useIsMobile";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const skipPin = reducedMotion || isMobile;

  useGSAP(
    () => {
      const layers = gsap.utils.toArray<HTMLElement>(".hero-scene");
      const badges = gsap.utils.toArray<HTMLElement>(".hero-badge");

      gsap
        .timeline({ delay: 0.2 })
        .from(".hero-eyebrow", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" })
        .from(
          ".hero-heading-0 .word",
          { opacity: 0, y: 40, stagger: 0.06, duration: 0.9, ease: "power3.out" },
          "-=0.35"
        )
        .from(".hero-sub-0", { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .from(badges, { opacity: 0, y: 20, stagger: 0.12, duration: 0.6, ease: "power2.out" }, "-=0.4");

      if (skipPin) {
        layers.forEach((layer, i) => {
          if (i === 0) return;
          gsap.set(layer, { opacity: 0, position: "relative" });
        });
        return;
      }

      const scenes = gsap.utils.toArray<HTMLElement>(".hero-scene-content");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      for (let i = 1; i < layers.length; i++) {
        tl.to(layers[i - 1], { opacity: 0, duration: 0.4, ease: "power1.inOut" }, i)
          .to(layers[i], { opacity: 1, duration: 0.4, ease: "power1.inOut" }, i);

        if (scenes[i - 1]) {
          tl.to(scenes[i - 1], { opacity: 0, y: -24, duration: 0.35, ease: "power1.inOut" }, i - 0.15);
        }
        if (scenes[i]) {
          tl.fromTo(
            scenes[i],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
            i + 0.05
          );
        }
      }
    },
    { scope: containerRef, dependencies: [skipPin] }
  );

  return (
    <section id="top" ref={containerRef} className="relative h-screen w-full overflow-hidden bg-canvas">
      {/* Scene background layers - light, technical, no stock imagery needed here */}
      {heroScenes.map((scene, i) => (
        <div
          key={scene.id}
          className={`hero-scene absolute inset-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-grid opacity-70" />
          <div
            className="absolute inset-0"
            style={{
              background:
                i === 0
                  ? "radial-gradient(circle at 15% 15%, rgba(20,184,166,0.10), transparent 55%), radial-gradient(circle at 85% 85%, rgba(226,149,42,0.10), transparent 55%)"
                  : i === 1
                  ? "radial-gradient(circle at 85% 25%, rgba(226,149,42,0.14), transparent 55%), radial-gradient(circle at 10% 90%, rgba(20,184,166,0.08), transparent 55%)"
                  : "radial-gradient(circle at 50% 75%, rgba(20,184,166,0.14), transparent 55%), radial-gradient(circle at 90% 10%, rgba(226,149,42,0.1), transparent 55%)",
            }}
          />
        </div>
      ))}

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-end pb-28 md:pb-32">
        <p className="hero-eyebrow font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-signal-text mb-6">
          {profile.location} &middot; {profile.status}
        </p>

        <div className="relative min-h-[3.5em] md:min-h-[2.4em]">
          {heroScenes.map((scene, i) => (
            <div
              key={scene.id}
              className={`hero-scene-content ${i === 0 ? "" : "absolute inset-0"} ${
                i === 0 ? "opacity-100" : "opacity-0"
              }`}
              style={i === 0 ? {} : { top: 0, left: 0 }}
            >
              <span className="font-mono text-xs tracking-widest text-amber-text block mb-3">
                {scene.tag}
              </span>
              <h1
                className={`hero-heading-${i} font-display font-semibold text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tight text-ink max-w-4xl`}
              >
                {scene.heading.split(" ").map((w, wi) => (
                  <span key={wi} className="word inline-block mr-[0.25em]">
                    {w}
                  </span>
                ))}
              </h1>
              <p className={`hero-sub-${i} font-mono text-sm md:text-base text-slate mt-5`}>
                {scene.sub}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="hero-badge flex items-baseline gap-2 rounded-full border border-line/15 bg-paper/70 backdrop-blur-sm px-4 py-2 shadow-sm"
            >
              <span className="font-display font-semibold text-ink">{s.value}</span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <a
            href="#work"
            className="font-mono text-xs uppercase tracking-widest bg-amber text-ink px-6 py-3 rounded-full hover:bg-ink hover:text-paper transition-colors shadow-sm"
          >
            View my work &rarr;
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs uppercase tracking-widest border border-line/25 text-ink px-6 py-3 rounded-full hover:border-line/60 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>

      {!skipPin && (
        <div className="absolute bottom-6 right-6 md:right-10 z-10 font-mono text-[10px] uppercase tracking-widest text-slate-dim flex items-center gap-2">
          <span className="w-6 h-px bg-slate-dim/60" />
          scroll
        </div>
      )}
    </section>
  );
}
