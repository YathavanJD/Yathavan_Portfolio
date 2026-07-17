import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Log() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".log-row", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.12,
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
    <section id="log" ref={sectionRef} className="relative py-24 md:py-32 bg-paper border-t border-line/10">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal-text mb-3">
          [FIELD NOTES]
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-ink mb-14">
          Education &amp; experience log
        </h2>

        <div className="space-y-0">
          {timeline.map((t, i) => (
            <div
              key={t.title}
              className="log-row grid md:grid-cols-[160px_1fr] gap-3 md:gap-10 py-7 border-t border-line/12 last:border-b"
            >
              <div className="flex items-start gap-3 md:block">
                <span className="font-mono text-[10px] text-slate-dim/60" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs text-amber-text">{t.date}</span>
              </div>
              <div>
                <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-signal-text border border-signal/30 rounded-full px-2.5 py-1 mb-3">
                  {t.tag}
                </span>
                <h3 className="font-display text-lg md:text-xl font-semibold text-ink">
                  {t.title}
                </h3>
                <p className="font-body text-sm text-slate mt-2 max-w-2xl leading-relaxed">
                  {t.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
