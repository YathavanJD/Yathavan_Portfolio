import { useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { timeline } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useMedia";

export default function Timeline() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const items = q(".tl-item");

      // Active milestone accent works with or without motion (it's a class toggle, not movement).
      items.forEach((item) =>
        gsap.timeline({
          scrollTrigger: { trigger: item, start: "top 62%", end: "bottom 62%", toggleClass: { targets: item, className: "is-active" } },
        })
      );
      if (reduced) {
        gsap.set(q(".tl-fill"), { scaleY: 1 });
        return;
      }

      gsap.fromTo(
        q(".tl-fill"),
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: q(".tl-list")[0], start: "top 62%", end: "bottom 62%", scrub: true } }
      );
      items.forEach((item) => {
        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "top 80%", once: true } })
          .from(item.querySelector(".tl-date"), { opacity: 0, x: -24, duration: 0.7, ease: "power3.out" })
          .from(item.querySelector(".tl-node"), { scale: 0, duration: 0.45, ease: "back.out(2.4)" }, 0.1)
          .from(item.querySelectorAll(".tl-reveal"), { opacity: 0, y: 22, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 0.15);
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="experience" tabIndex={-1} aria-labelledby="exp-h" className="section-pad relative border-t border-hair outline-none">
      <div className="container-x">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-ink">[05] Experience</p>
            <h2 id="exp-h" className="t-display mt-3">
              Education &amp; experience log.
            </h2>
          </div>
          <span className="numeral hidden [--numeral-stroke:rgba(16,24,39,0.28)] sm:block" aria-hidden="true">
            05
          </span>
        </div>

        <ol className="tl-list relative mt-16 max-w-5xl">
          {/* rail */}
          <span aria-hidden="true" className="absolute bottom-2 left-[0.6rem] top-2 w-px bg-hair md:left-[calc(11rem+0.6rem)]" />
          <span aria-hidden="true" className="tl-fill absolute bottom-2 left-[0.6rem] top-2 w-px origin-top bg-navy md:left-[calc(11rem+0.6rem)]" />

          {timeline.map((t, i) => (
            <li key={t.title} className="tl-item relative grid gap-3 pb-14 pl-10 last:pb-0 md:grid-cols-[11rem_1fr] md:gap-x-0 md:pl-0">
              <div className="tl-date eyebrow pt-1 text-slate-ink md:pr-10 md:text-right">
                <span className="mr-3 text-navy/40 md:mr-0 md:block">{String(i + 1).padStart(2, "0")}</span>
                {t.date}
              </div>
              <span
                aria-hidden="true"
                className="tl-node absolute left-0 top-1 h-[1.2rem] w-[1.2rem] rounded-full border border-navy bg-ivory md:left-[11rem]"
              />
              <div className="md:pl-10">
                <span className="tl-reveal chip mb-3 !border-teal-ink/40 !text-teal-ink">{t.tag}</span>
                <h3 className="tl-reveal tl-title t-title max-w-2xl">{t.title}</h3>
                <p className="tl-reveal mt-3 max-w-2xl leading-relaxed text-slate-ink">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
