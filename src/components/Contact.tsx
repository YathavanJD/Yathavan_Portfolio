import { useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { CONTACT_EMAIL, SOCIAL, WHATSAPP_NUMBER } from "../config/site";
import { profile } from "../data/portfolio";
import { whatsappConfigured } from "../lib/contact";
import { useReducedMotion } from "../hooks/useMedia";
import { CvButton, EmailButton, WhatsAppButton } from "./ContactButtons";
import ContactForm from "./ContactForm";
import { Github, Linkedin } from "./Icons";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ scrollTrigger: { trigger: root.current, start: "top 60%", once: true } })
        .from(q(".c-line"), { yPercent: 115, duration: 1, stagger: 0.12, ease: "expo.out" })
        .fromTo(q(".c-accent"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "power3.inOut" }, 0.5)
        .from(q(".c-fade"), { opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: "power3.out" }, 0.5);
      // slow, scroll-linked drift of the geometric ornament
      gsap.to(q(".c-geo"), {
        rotation: 70,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="contact" tabIndex={-1} aria-labelledby="contact-h" className="on-dark relative overflow-hidden bg-navy text-ivory outline-none">
      <div className="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true" />
      <svg aria-hidden="true" viewBox="0 0 600 600" className="c-geo pointer-events-none absolute -right-40 -top-24 h-[44rem] w-[44rem] opacity-40" style={{ transformOrigin: "center" }}>
        <g fill="none" stroke="#36CFC9" strokeWidth="1">
          <circle cx="300" cy="300" r="260" strokeDasharray="2 9" />
          <circle cx="300" cy="300" r="200" stroke="#28364A" />
          <circle cx="300" cy="300" r="130" stroke="#28364A" />
          <path d="M300 40 560 300 300 560 40 300Z" stroke="#28364A" />
          <circle cx="560" cy="300" r="6" fill="#B7F34A" stroke="none" />
        </g>
      </svg>

      <div className="container-x section-pad relative">
        <div className="flex items-start justify-between gap-6">
          <p className="eyebrow text-lime">[06] Contact</p>
          <span className="numeral hidden [--numeral-stroke:rgba(245,245,240,0.22)] sm:block" aria-hidden="true">
            06
          </span>
        </div>

        <div className="mt-6 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 id="contact-h" className="t-hero" aria-label="Have something worth building?">
              {["HAVE SOMETHING", "WORTH BUILDING?"].map((l) => (
                <span key={l} aria-hidden="true" className="block overflow-hidden pb-[0.08em]">
                  <span className="c-line block">{l}</span>
                </span>
              ))}
            </h2>
            <span className="c-accent mt-5 block h-[5px] w-40 origin-left bg-lime" aria-hidden="true" />
            <p className="c-fade t-lede mt-8 text-ivory/80">
              Have a project, collaboration, internship, or opportunity in mind? Let’s connect.
            </p>
            <p className="c-fade eyebrow mt-4 text-teal">{profile.openTo}</p>

            <div className="c-fade mt-9 flex flex-wrap gap-3">
              <WhatsAppButton variant="lime" magnetic />
              <EmailButton variant="ghost" magnetic>
                Email me
              </EmailButton>
              <CvButton variant="ghost" magnetic />
            </div>

            <ul className="c-fade mt-10 grid gap-y-4 border-t border-navy-line pt-6 text-sm sm:grid-cols-[7rem_1fr]">
              <li className="contents">
                <span className="eyebrow text-ivory/60">Email</span>
                <a className="link-u inline-flex min-h-11 w-fit items-center break-all" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              {whatsappConfigured && (
                <li className="contents">
                  <span className="eyebrow text-ivory/60">WhatsApp</span>
                  <span>{WHATSAPP_NUMBER}</span>
                </li>
              )}
              <li className="contents">
                <span className="eyebrow text-ivory/60">Based in</span>
                <span>{profile.location}</span>
              </li>
              <li className="contents">
                <span className="eyebrow text-ivory/60">Elsewhere</span>
                <span className="flex flex-wrap gap-5">
                  <a className="link-u inline-flex min-h-11 items-center gap-2" href={SOCIAL.github} target="_blank" rel="noopener noreferrer">
                    <Github width={16} height={16} /> GitHub
                  </a>
                  <a className="link-u inline-flex min-h-11 items-center gap-2" href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin width={16} height={16} /> LinkedIn
                  </a>
                </span>
              </li>
            </ul>
          </div>

          <div className="c-fade lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
