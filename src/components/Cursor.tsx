import { useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { useFinePointer, useReducedMotion } from "../hooks/useMedia";

/**
 * Companion cursor (dot + lagging ring). The native pointer is NEVER hidden.
 * Only mounted for fine pointers without reduced-motion. Listeners are delegated and cleaned up.
 *  - links/buttons: ring grows
 *  - [data-cursor="Label"]: ring grows and shows the label (used on project stage)
 *  - text fields: ring fades so it never competes with the caret
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  if (!fine || reduced) return null;
  return <CursorInner />;
}

function CursorInner() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const d = dot.current!;
    const r = ring.current!;
    const l = label.current!;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dx = gsap.quickTo(d, "x", { duration: 0.12, ease: "power3.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.12, ease: "power3.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(d, { opacity: 1, duration: 0.25 });
      gsap.to(r, { opacity: 1, duration: 0.25 });
    };
    const hide = () => {
      visible = false;
      gsap.to([d, r], { opacity: 0, duration: 0.25 });
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      show();
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };

    const over = (e: PointerEvent) => {
      if (!visible) return;
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const field = t.closest("input,textarea,select,[contenteditable='true']");
      const custom = t.closest<HTMLElement>("[data-cursor]");
      const link = t.closest("a,button,[role='button'],summary");
      if (field) {
        gsap.to(r, { scale: 0.4, opacity: 0, duration: 0.2 });
        l.textContent = "";
      } else if (custom) {
        l.textContent = custom.dataset.cursor ?? "";
        gsap.to(r, { scale: 3.4, opacity: 1, duration: 0.35, ease: "power3.out" });
        gsap.to(d, { scale: 0.6, duration: 0.2 });
      } else if (link) {
        l.textContent = "";
        gsap.to(r, { scale: 1.8, opacity: 1, duration: 0.3, ease: "power3.out" });
        gsap.to(d, { scale: 1.4, duration: 0.2 });
      } else {
        l.textContent = "";
        gsap.to(r, { scale: 1, opacity: 1, duration: 0.3 });
        gsap.to(d, { scale: 1, duration: 0.2 });
      }
    };

    const down = () => gsap.to(r, { scale: "-=0.25", duration: 0.12 });
    const up = () => gsap.to(r, { scale: "+=0.25", duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9998]">
      <div
        ref={ring}
        className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-white mix-blend-difference"
      >
        <span ref={label} className="font-mono text-[0.22rem] uppercase tracking-widest text-white" />
      </div>
      <div ref={dot} className="absolute left-0 top-0 h-2 w-2 rounded-full border border-navy bg-lime" />
    </div>
  );
}
