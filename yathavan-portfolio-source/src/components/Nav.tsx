import { useEffect, useRef } from "react";
import { profile } from "../data/portfolio";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#log", label: "Log" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      nav.dataset.solid = window.scrollY > 80 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      data-solid="false"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b
        data-[solid=false]:bg-canvas/70 data-[solid=false]:border-transparent
        data-[solid=true]:bg-paper/90 data-[solid=true]:backdrop-blur-md data-[solid=true]:border-line/10 data-[solid=true]:shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-wider text-ink flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-signal" />
          LY<span className="text-amber-text">.</span>dev
        </a>
        <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-slate hover:text-ink transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="hidden md:inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-amber-text/40 text-amber-text px-4 py-2 rounded-full hover:bg-amber hover:text-ink hover:border-amber transition-colors"
        >
          Get in touch
        </a>
      </div>
    </nav>
  );
}
