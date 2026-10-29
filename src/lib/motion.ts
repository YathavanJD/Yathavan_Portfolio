import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

/**
 * The ONE place GSAP plugins are registered (safe under StrictMode / HMR: registration is idempotent).
 * Components import { gsap, ScrollTrigger, ... } from "../lib/motion" — never register themselves.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, Flip);

// Fewer surprises when the tab regains focus after a long idle.
gsap.ticker.lagSmoothing(500, 33);
// Mobile browser toolbars resizing the viewport must not trigger full ScrollTrigger refreshes.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, ScrollToPlugin, Flip, useGSAP };

/** Motion tokens */
export const EASE = {
  out: "power3.out",
  expo: "expo.out",
  inOut: "power3.inOut",
  soft: "power2.out",
} as const;

export const DUR = { fast: 0.35, base: 0.7, slow: 1.1 } as const;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Smooth in-page navigation. Uses ScrollToPlugin so it cooperates with ScrollTrigger pin-spacers
 * (native anchor jumps can land in the wrong place after a pinned section). Falls back to an instant jump
 * for reduced motion. Moves focus to the target so keyboard / screen-reader users arrive in context.
 */
export function scrollToId(id: string, { updateHash = true } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  const done = () => {
    if (updateHash) history.replaceState(null, "", `#${id}`);
    el.focus({ preventScroll: true });
  };
  if (prefersReducedMotion()) {
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: y, behavior: "auto" });
    done();
    return;
  }
  gsap.to(window, {
    scrollTo: { y: el, offsetY: id === "top" ? 0 : 0, autoKill: true },
    duration: 1.1,
    ease: EASE.inOut,
    overwrite: true,
    onComplete: done,
  });
}
