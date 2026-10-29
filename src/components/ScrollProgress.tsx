import { useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";

/** One ScrollTrigger drives the whole-page progress line (no per-frame React renders). */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true, invalidateOnRefresh: true },
      }
    );
  });
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left scale-x-0 bg-lime" style={{ boxShadow: "0 0 0 0.5px #101827" }} />
    </div>
  );
}
