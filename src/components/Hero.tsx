import { useRef } from "react";
import { gsap, ScrollTrigger, scrollToId, useGSAP } from "../lib/motion";
import { heroStages, profile } from "../data/portfolio";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia";
import { CvButton, WhatsAppButton } from "./ContactButtons";
import { ArrowDown, ArrowRight } from "./Icons";
import SystemMap from "./SystemMap";

const LINES = ["I BUILD DIGITAL", "EXPERIENCES", "THAT WORK."];

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  /* ── Entrance (waits for the intro; instant when reduced motion) ── */
  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);
      gsap.set(q(".h-line-in"), { yPercent: 115 });
      gsap.set(q(".h-fade"), { opacity: 0, y: 18 });
      gsap.set(q(".h-panel"), { opacity: 0, clipPath: "inset(8% 8% 8% 8% round 24px)" });
      if (!ready) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(q(".h-fade.eyebrow-row"), { opacity: 1, y: 0, duration: 0.6 }, 0)
        .to(q(".h-line-in"), { yPercent: 0, duration: 1.0, stagger: 0.1, ease: "expo.out" }, 0.1)
        .to(q(".h-panel"), { opacity: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 1.2, ease: "expo.out" }, 0.25)
        .to(q(".h-fade:not(.eyebrow-row)"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 }, 0.55);
    },
    { scope: root, dependencies: [ready, reduced], revertOnUpdate: true }
  );

  /* ── Scroll narrative: DISCOVER → DESIGN → BUILD → SHIP (desktop, motion allowed) ── */
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(el);
        el.dataset.stage = "1";

        gsap.set(q(".map-node:not([data-stage='1'])"), { opacity: 0, scale: 0.4 });
        gsap.set(q(".map-edge"), { strokeDashoffset: 1 });
        gsap.set(q(".map-flow"), { opacity: 0 });
        gsap.set(q(".readout:not([data-stage='1'])"), { opacity: 0, y: 14 });
        gsap.set(q(".stage-fill"), { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: q(".hero-pin")[0],
            start: "top top",
            end: "+=300%",
            scrub: 0.8,
            pin: true,
            anticipatePin: 1,
            refreshPriority: 10, // pins must measure before section triggers that sit below them
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              const s = p < 0.3 ? 1 : p < 0.56 ? 2 : p < 0.82 ? 3 : 4;
              if (el.dataset.stage !== String(s)) el.dataset.stage = String(s);
            },
          },
        });

        for (let k = 2; k <= 4; k++) {
          const at = (k - 1) * 1;
          tl.to(q(`.map-edge[data-stage='${k}']`), { strokeDashoffset: 0, duration: 0.55, stagger: 0.08, ease: "power2.out" }, at - 0.2)
            .to(q(`.map-flow[data-stage='${k}']`), { opacity: 1, duration: 0.2 }, at + 0.3)
            .to(q(`.map-node[data-stage='${k}']`), { opacity: 1, scale: 1, duration: 0.35, stagger: 0.07, ease: "back.out(1.7)" }, at - 0.05)
            .to(q(`.readout[data-stage='${k - 1}']`), { opacity: 0, y: -14, duration: 0.22 }, at - 0.15)
            .to(q(`.readout[data-stage='${k}']`), { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, at + 0.05);
        }
        tl.to(q(".map-rot"), { rotation: 110, duration: 3.4 }, 0)
          .to(q(".stage-fill"), { scaleX: 1, duration: 3 }, 0)
          .to(q(".hero-copy"), { y: -36, duration: 3.4 }, 0)
          .to(q(".map-wrap"), { y: 26, duration: 3.4 }, 0)
          .to({}, { duration: 0.4 }, 3); // brief hold on SHIP before the pin releases

        return () => {
          delete el.dataset.stage;
        };
      });

      // Everywhere else (tablet/mobile/reduced motion): everything is visible, SHIP state, no pin.
      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        el.dataset.stage = "4";
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  /* ── Subtle pointer parallax on the system map (fine pointers only) ── */
  useGSAP(
    () => {
      if (!fine || reduced) return;
      const el = root.current;
      const target = el?.querySelector<SVGGElement>(".map-parallax");
      if (!el || !target) return;
      const xTo = gsap.quickTo(target, "x", { duration: 0.9, ease: "power3.out" });
      const yTo = gsap.quickTo(target, "y", { duration: 0.9, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 22);
        yTo((e.clientY / window.innerHeight - 0.5) * 22);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    },
    { scope: root, dependencies: [fine, reduced], revertOnUpdate: true }
  );

  /* Hide the scroll cue once the visitor has started scrolling. */
  useGSAP(() => {
    ScrollTrigger.create({
      start: 60,
      end: "max",
      onToggle: (self) => gsap.to(".scroll-cue", { opacity: self.isActive ? 0 : 1, duration: 0.3, overwrite: true }),
    });
  });

  return (
    <section ref={root} id="top" tabIndex={-1} aria-label="Introduction" className="hero relative outline-none" data-stage="4">
      <div className="hero-pin bg-grid-light relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pb-12 lg:pt-24">
        <div className="container-x grid w-full items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ───────── editorial copy ───────── */}
          <div className="hero-copy lg:col-span-7">
            <p className="h-fade eyebrow-row eyebrow mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-ink">
              <span className="inline-block h-px w-10 bg-navy" aria-hidden="true" />
              <span>{profile.descriptor}</span>
              <span aria-hidden="true">/</span>
              <span>{profile.location}</span>
            </p>

            <h1 className="t-hero text-navy" aria-label="I build digital experiences that work.">
              {LINES.map((line, i) => (
                <span key={i} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
                  <span className="h-line-in block">
                    {i === 2 ? (
                      <>
                        THAT <span className="relative inline-block">WORK.<span className="absolute -bottom-[0.02em] left-0 h-[0.09em] w-full bg-lime ring-1 ring-navy/70" /></span>
                      </>
                    ) : (
                      line
                    )}
                  </span>
                </span>
              ))}
            </h1>

            <p className="h-fade t-lede mt-8 text-slate-ink">
              Final-year Computer Science undergraduate and aspiring Software Engineer — building full-stack web and
              Android applications, with a growing focus on backend engineering.
            </p>

            <div className="h-fade mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("projects");
                }}
                className="btn btn-lime"
              >
                Explore my work <ArrowRight />
              </a>
              <CvButton variant="ghost" magnetic />
            </div>
            <div className="h-fade mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              <WhatsAppButton variant="ghost" />
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("contact");
                }}
                className="eyebrow link-u inline-flex min-h-11 items-center text-navy"
              >
                Contact me
              </a>
            </div>
          </div>

          {/* ───────── technical panel ───────── */}
          <div className="map-wrap lg:col-span-5">
            <div className="h-panel on-dark relative mx-auto aspect-square w-full max-w-[34rem] overflow-hidden rounded-3xl border border-navy-line bg-navy text-ivory shadow-[0_30px_60px_-30px_rgba(16,24,39,0.55)]">
              <div className="bg-grid-dark absolute inset-0 opacity-70" aria-hidden="true" />
              <div className="absolute inset-0 p-3 sm:p-4">
                <SystemMap />
              </div>

              {/* stage readout */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/90 to-transparent px-5 pb-5 pt-14 sm:px-6">
                <div className="relative hidden h-[4.25rem] lg:block" aria-live="polite">
                  {heroStages.map((s, i) => (
                    <div key={s.id} data-stage={i + 1} className="readout absolute inset-0">
                      <p className="eyebrow text-lime">
                        {s.n} / {s.label}
                      </p>
                      <p className="mt-1.5 max-w-[26rem] text-sm leading-snug text-ivory/85">{s.line}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-3 lg:hidden">
                  <p className="eyebrow text-lime">SYS / ONLINE</p>
                  <p className="eyebrow text-ivory/70">{heroStages.length} stages</p>
                </div>
              </div>
            </div>

            {/* stage tracker */}
            <div className="mx-auto mt-5 w-full max-w-[34rem]">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-hair" aria-hidden="true">
                <div className="stage-fill absolute inset-0 origin-left bg-navy" style={{ transform: "scaleX(1)" }} />
              </div>
              <ol className="mt-3 grid grid-cols-4 gap-2">
                {heroStages.map((s) => (
                  <li key={s.id} data-n={Number(s.n)} className="stage-step eyebrow !text-[0.66rem] text-navy">
                    <span className="block text-slate-ink">{s.n}</span>
                    {s.label}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="scroll-cue eyebrow absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-slate-ink lg:flex" aria-hidden="true">
          Scroll <ArrowDown className="animate-bounce motion-reduce:animate-none" width={14} height={14} />
        </div>
      </div>
    </section>
  );
}
