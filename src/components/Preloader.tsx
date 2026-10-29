import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { profile } from "../data/portfolio";

const NAME = "LOGANATHAN YATHAVAN";

/**
 * Short, skippable "system initialising" intro (~2.6s). Never blocks content loading:
 * it's an overlay over an already-rendered page, with a hard 6s safety timeout.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const safety = window.setTimeout(finish, 6000); // animation-failure fallback
    return () => window.clearTimeout(safety);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete: finish });
      tlRef.current = tl;

      tl.from(".pl-grid", { opacity: 0, duration: 0.5, ease: "power2.out" })
        .from(".pl-corner", { opacity: 0, y: 6, stagger: 0.06, duration: 0.4 }, 0.1)
        .from(".pl-label", { opacity: 0, y: 10, duration: 0.45, ease: "power3.out" }, 0.2)
        .fromTo(".pl-h", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.3)
        .fromTo(".pl-v", { scaleY: 0 }, { scaleY: 1, duration: 0.8, ease: "power3.inOut" }, 0.45)
        .fromTo(
          ".pl-char",
          { yPercent: 115 },
          { yPercent: 0, duration: 0.7, stagger: 0.03, ease: "expo.out" },
          0.75
        )
        .from(".pl-sub", { opacity: 0, y: 8, duration: 0.5 }, 1.35)
        .addLabel("exit", 2.0)
        .to(".pl-content", { opacity: 0, y: -12, duration: 0.35, ease: "power2.in" }, "exit")
        .to(".pl-top", { yPercent: -100, duration: 0.75, ease: "power4.inOut" }, "exit+=0.15")
        .to(".pl-bot", { yPercent: 100, duration: 0.75, ease: "power4.inOut" }, "exit+=0.15");
    },
    { scope: root }
  );

  const skip = () => tlRef.current?.timeScale(6);

  return (
    <div
      ref={root}
      role="dialog"
      aria-label="Portfolio intro"
      className="on-dark fixed inset-0 z-[100] text-ivory"
      onKeyDown={(e) => e.key === "Escape" && skip()}
    >
      <div className="pl-top absolute inset-x-0 top-0 h-1/2 bg-navy" />
      <div className="pl-bot absolute inset-x-0 bottom-0 h-1/2 bg-navy" />

      <div className="pl-content absolute inset-0">
        <div className="pl-grid bg-grid-dark absolute inset-0" />

        <span className="pl-corner eyebrow absolute left-5 top-5 text-ivory/60 sm:left-8 sm:top-8">00.00 / 00.00</span>
        <span className="pl-corner eyebrow absolute right-5 top-5 text-ivory/60 sm:right-8 sm:top-8">
          {profile.location.split(",")[0].toUpperCase()}
        </span>
        <span className="pl-corner eyebrow absolute bottom-5 left-5 text-ivory/60 sm:bottom-8 sm:left-8">SYS / PORTFOLIO</span>

        {/* drawn guide lines */}
        <span aria-hidden="true" className="pl-h absolute left-0 right-0 top-1/2 h-px origin-left bg-lime" />
        <span aria-hidden="true" className="pl-v absolute bottom-0 left-1/2 top-0 w-px origin-top bg-teal/70" />

        <div className="absolute inset-0 grid place-items-center px-5">
          <div className="text-center">
            <p className="pl-label eyebrow mb-6 text-lime">
              Initializing portfolio<span className="blink">_</span>
            </p>
            <p
              aria-label={profile.name}
              className="font-display text-[clamp(1.6rem,6.2vw,4.4rem)] font-bold leading-none tracking-[-0.03em]"
            >
              <span aria-hidden="true" className="flex flex-wrap justify-center gap-x-[0.3em]">
                {NAME.split(" ").map((word, wi) => (
                  <span key={wi} className="inline-flex overflow-hidden pb-[0.12em]">
                    {[...word].map((c, i) => (
                      <span key={i} className="pl-char inline-block">
                        {c}
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </p>
            <p className="pl-sub eyebrow mt-6 text-ivory/70">{profile.descriptor} · Software Engineering</p>
          </div>
        </div>

        <button
          type="button"
          onClick={skip}
          autoFocus
          className="eyebrow absolute bottom-4 right-4 min-h-11 rounded-full border border-ivory/30 px-5 text-ivory transition-colors hover:bg-ivory hover:text-navy sm:bottom-7 sm:right-8"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}
