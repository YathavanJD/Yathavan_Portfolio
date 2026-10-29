import { useSyncExternalStore } from "react";

/** Subscribe to a CSS media query without effect-driven re-render loops. */
export function useMedia(query: string, serverFallback = false) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");
/** Desktop-class layout: pinned scenes and horizontal choreography allowed. */
export const useIsDesktop = () => useMedia("(min-width: 1024px)");
/** Mouse-like pointer that can hover: custom cursor + magnetic effects allowed. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine)");
