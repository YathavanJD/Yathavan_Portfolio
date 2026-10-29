import { useRef } from "react";
import { ScrollTrigger, useGSAP } from "../lib/motion";
import { whatsappConfigured, whatsappUrl } from "../lib/contact";
import { WhatsApp } from "./Icons";

/** Small floating shortcut: appears after the hero, hides while the Contact section is on screen. */
export default function WhatsAppFloat() {
  const ref = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const state = { past: false, contact: false };
    const apply = () => ref.current?.setAttribute("data-show", String(state.past && !state.contact));
    ScrollTrigger.create({ start: 500, end: "max", onToggle: (s) => ((state.past = s.isActive), apply()) });
    const c = document.getElementById("contact");
    if (c) ScrollTrigger.create({ trigger: c, start: "top 85%", end: "bottom top", onToggle: (s) => ((state.contact = s.isActive), apply()) });
  });
  if (!whatsappConfigured) return null;
  return (
    <a
      ref={ref}
      data-show="false"
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp — opens in a new tab"
      className="wa-float fixed bottom-4 left-4 z-40 grid h-14 w-14 place-items-center rounded-full border border-navy bg-lime text-navy shadow-[0_10px_24px_-10px_rgba(16,24,39,0.6)] transition-[opacity,transform] duration-500 hover:scale-105 data-[show=false]:pointer-events-none data-[show=false]:translate-y-4 data-[show=false]:opacity-0 sm:bottom-6 sm:left-6"
    >
      <WhatsApp width={26} height={26} />
    </a>
  );
}
