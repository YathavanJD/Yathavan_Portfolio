import { cloneElement, useRef, type ReactElement } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia";

/**
 * Subtle magnetic pull for a single child. Disabled on touch + reduced motion.
 * The child keeps its normal hit-area and keyboard behaviour; the effect is cosmetic only.
 */
export function Magnetic({ children, strength = 0.28 }: { children: ReactElement<{ ref?: unknown }>; strength?: number }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = wrap.current;
      if (!el || !fine || reduced) return;
      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: wrap, dependencies: [fine, reduced], revertOnUpdate: true }
  );

  return (
    <span ref={wrap} className="inline-block will-change-transform">
      {cloneElement(children)}
    </span>
  );
}
