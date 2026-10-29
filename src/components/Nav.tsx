import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, scrollToId, useGSAP, prefersReducedMotion } from "../lib/motion";
import { profile, sections } from "../data/portfolio";
import { CvButton, WhatsAppButton } from "./ContactButtons";
import { Close, Menu } from "./Icons";

export default function Nav() {
  const headerRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  /* Solid background after the hero starts scrolling — one passive ScrollTrigger, no scroll listener. */
  useGSAP(() => {
    ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => {
        headerRef.current?.setAttribute("data-solid", String(self.isActive));
      },
    });
  });

  /* Scroll-spy: one trigger per section. */
  useGSAP(() => {
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) setActive(id);
          else setActive((cur) => (cur === id ? null : cur));
        },
      });
    });
  });

  /* Sliding active indicator. */
  const placeIndicator = useCallback(
    (animate: boolean) => {
      const ind = indicatorRef.current;
      const ul = linksRef.current;
      if (!ind || !ul) return;
      const link = active ? ul.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
      if (!link) {
        gsap.to(ind, { opacity: 0, duration: 0.25 });
        return;
      }
      const vars = { x: link.offsetLeft, width: link.offsetWidth, opacity: 1 };
      if (animate && !prefersReducedMotion()) gsap.to(ind, { ...vars, duration: 0.55, ease: "power3.out" });
      else gsap.set(ind, vars);
    },
    [active]
  );
  useEffect(() => {
    placeIndicator(true);
  }, [placeIndicator]);
  useEffect(() => {
    const ul = linksRef.current;
    if (!ul) return;
    const ro = new ResizeObserver(() => placeIndicator(false));
    ro.observe(ul);
    return () => ro.disconnect();
  }, [placeIndicator]);

  /* Mobile menu: scroll-lock, Esc, focus management, focus trap. */
  const closeMenu = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) menuBtnRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a,button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return closeMenu();
      if (e.key !== "Tab") return;
      const items = [
        menuBtnRef.current,
        ...(panelRef.current?.querySelectorAll<HTMLElement>("a[href],button:not([disabled])") ?? []),
      ].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && closeMenu(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  /* Menu open animation (opacity-only under reduced motion). */
  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel || !open) return;
      const reduce = prefersReducedMotion();
      gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: reduce ? 0.01 : 0.35, ease: "power2.out" });
      if (!reduce)
        gsap.from(panel.querySelectorAll(".m-item"), {
          y: 28,
          opacity: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.08,
        });
    },
    { dependencies: [open], revertOnUpdate: true }
  );

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (open) {
      setOpen(false);
      // Let the scroll lock release before scrolling.
      window.setTimeout(() => scrollToId(id), 60);
    } else scrollToId(id);
  };

  return (
    <header
      ref={headerRef}
      data-solid="false"
      className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background-color,border-color,backdrop-filter] duration-500 data-[solid=true]:border-hair data-[solid=true]:bg-ivory/90 data-[solid=true]:backdrop-blur-md"
    >
      <nav aria-label="Primary" className="container-x flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#top"
          onClick={go("top")}
          className="relative z-[70] flex min-h-11 items-center gap-2.5 font-display text-lg font-bold tracking-tight"
        >
          <span aria-hidden="true" className="block h-2.5 w-2.5 rounded-full bg-lime ring-1 ring-navy" />
          <span className={open ? "text-ivory" : ""}>YATHAVAN</span>
          <span className={`eyebrow hidden pt-0.5 xl:inline ${open ? "text-ivory/60" : "text-slate-ink"}`}>
            / Software Engineer
          </span>
        </a>

        {/* desktop links */}
        <ul ref={linksRef} className="relative hidden items-center gap-1 lg:flex">
          <span
            ref={indicatorRef}
            aria-hidden="true"
            className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-lime opacity-0 ring-[0.5px] ring-navy/60"
            style={{ width: 0 }}
          />
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                data-id={s.id}
                onClick={go(s.id)}
                aria-current={active === s.id ? "true" : undefined}
                className="eyebrow block px-4 py-3 text-navy"
              >
                <span className="link-u" aria-current={active === s.id ? "true" : undefined}>
                  {s.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="relative z-[70] flex items-center gap-3">
          <span
            className="on-dark eyebrow hidden items-center gap-2 rounded-full bg-navy px-3 py-1.5 text-ivory xl:inline-flex"
            title={profile.openTo}
          >
            <span className="relative grid h-2 w-2 place-items-center" aria-hidden="true">
              <span className="pulse-ring absolute h-2 w-2 rounded-full bg-lime" />
              <span className="h-2 w-2 rounded-full bg-lime" />
            </span>
            {profile.status}
          </span>
          <CvButton variant="lime" className="hidden !min-h-10 !px-4 sm:inline-flex" magnetic />
          <button
            ref={menuBtnRef}
            type="button"
            className={`grid h-12 w-12 place-items-center rounded-full border transition-colors lg:hidden ${
              open ? "on-dark border-ivory/30 text-ivory" : "border-navy/25 text-navy"
            }`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => (open ? closeMenu() : setOpen(true))}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={panelRef}
          className="on-dark fixed inset-0 z-[65] overflow-y-auto bg-navy px-6 pb-10 pt-28 text-ivory lg:hidden"
        >
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
          <ul className="relative mx-auto max-w-lg">
            {sections.map((s, i) => (
              <li key={s.id} className="m-item border-b border-navy-line">
                <a
                  href={`#${s.id}`}
                  onClick={go(s.id)}
                  className="flex min-h-[4.5rem] items-baseline gap-4 py-4 font-display text-4xl font-semibold tracking-tight"
                  aria-current={active === s.id ? "true" : undefined}
                >
                  <span className="eyebrow w-8 text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span className={active === s.id ? "text-lime" : ""}>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="m-item relative mx-auto mt-10 flex max-w-lg flex-col gap-3">
            <WhatsAppButton variant="lime" className="w-full" />
            <CvButton variant="ghost" className="w-full" />
            <p className="eyebrow mt-3 text-ivory/60">{profile.openTo}</p>
          </div>
        </div>
      )}
    </header>
  );
}
