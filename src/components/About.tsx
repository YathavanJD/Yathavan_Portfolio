import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, profile, skillGroups, toolkit } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".about-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32 bg-canvas border-t border-line/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-16">
        <div>
          <p className="about-reveal font-mono text-xs tracking-[0.3em] uppercase text-signal-text mb-3">
            [ABOUT]
          </p>
          <h2 className="about-reveal font-display text-2xl md:text-4xl font-semibold text-ink leading-snug max-w-2xl">
            {about.heading}
          </h2>
          <p className="about-reveal font-body text-sm md:text-base text-slate mt-6 max-w-xl leading-relaxed">
            {about.body}
          </p>

          <div className="about-reveal flex flex-wrap gap-2 mt-10">
            {toolkit.map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-wider text-slate border border-line/15 rounded-full px-3 py-1.5 bg-paper"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="about-reveal">
          <div className="relative rounded-2xl overflow-hidden border border-line/10 aspect-[4/5] max-w-sm mx-auto lg:mx-0 shadow-lg shadow-ink/5">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-scrim/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-paper">
              {profile.name} &middot; {profile.role}
            </div>
          </div>

          <div className="mt-8 space-y-4 max-w-sm mx-auto lg:mx-0">
            {skillGroups.map((g) => (
              <div key={g.label} className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-text w-16 shrink-0">
                  {g.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {g.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10px] text-ink bg-paper border border-line/15 rounded px-2 py-1"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
