import { useEffect, useState } from "react";
import { ScrollTrigger } from "./lib/motion";
import { prefersReducedMotion } from "./lib/motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import ProjectShowcase from "./components/ProjectShowcase";
import ProjectArchive from "./components/ProjectArchive";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import WhatsAppFloat from "./components/WhatsAppFloat";
import MotoBot from "./chat/MotoBot";

const SEEN = "ly-intro-seen";

/** Intro plays once per browser session, never for reduced-motion users or deep links. */
function shouldPlayIntro() {
  try {
    if (prefersReducedMotion() || window.location.hash || sessionStorage.getItem(SEEN)) return false;
  } catch {
    return false;
  }
  return true;
}

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro);

  const done = () => {
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* storage unavailable — intro may replay next visit, which is fine */
    }
    setIntro(false);
  };

  // ScrollTrigger already refreshes itself on window load/resize. We only add ONE extra refresh, and only
  // if webfonts were still loading (they change text metrics → section heights). Refreshes are costly, so no more.
  useEffect(() => {
    if (!document.fonts || document.fonts.status === "loaded") return;
    let alive = true;
    document.fonts.ready.then(() => alive && ScrollTrigger.refresh());
    return () => {
      alive = false;
    };
  }, []);

  // Honour a deep link (#projects etc.) after layout is ready.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => {
      ScrollTrigger.refresh();
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "auto" });
    }, 300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      {intro && <Preloader onDone={done} />}
      <a
        href="#about"
        className="sr-only-focusable fixed left-4 top-4 z-[110] rounded-full bg-lime px-5 py-3 font-mono text-xs uppercase tracking-widest text-navy"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <div inert={intro}>
        <Nav />
        <main id="main">
          <Hero ready={!intro} />
          <About />
          <Skills />
          <section id="projects" tabIndex={-1} aria-label="Projects" className="outline-none">
            <ProjectShowcase />
            <ProjectArchive />
          </section>
          <Timeline />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFloat />
        <MotoBot />
      </div>
    </>
  );
}
