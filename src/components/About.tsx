import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { about, education, profile } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useMedia";

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="mx-auto w-full max-w-[22rem] lg:mx-0">
      <div className="relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-navy bg-navy">
        {!failed ? (
          <img
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          /* Honest fallback: initials, not a fabricated likeness. */
          <div className="on-dark bg-grid-dark grid h-full w-full place-items-center">
            <span className="numeral text-lime" aria-hidden="true">
              LY
            </span>
            <span className="sr-only">{profile.name}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ivory/10" aria-hidden="true" />
      </div>
      {/* registration marks */}
      {["-left-2 -top-2", "-right-2 -top-2 rotate-90", "-bottom-2 -right-2 rotate-180", "-bottom-2 -left-2 -rotate-90"].map((pos) => (
        <svg key={pos} aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" className={`absolute ${pos} text-navy`}>
          <path d="M1 17V1h16" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ))}
      </div>
      <figcaption className="eyebrow mt-4 flex justify-between text-slate-ink">
        <span>FIG.01 — {profile.shortName.toUpperCase()}</span>
        <span>{profile.location.split(",")[0].toUpperCase()}</span>
      </figcaption>
    </figure>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);

      // Statement: words brighten as you read (scrubbed to scroll, no timers).
      gsap.fromTo(
        q(".about-word"),
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.12,
          ease: "none",
          scrollTrigger: { trigger: q(".about-statement")[0], start: "top 82%", end: "bottom 48%", scrub: true },
        }
      );

      gsap.from(q(".about-reveal"), {
        opacity: 0,
        y: 28,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: q(".about-body")[0], start: "top 78%", once: true },
      });

      // Interest line draws, then nodes light up in sequence.
      const tl = gsap.timeline({ scrollTrigger: { trigger: q(".interest-line")[0], start: "top 85%", once: true } });
      tl.fromTo(q(".interest-rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power3.inOut" })
        .from(q(".interest-node"), { scale: 0, duration: 0.4, stagger: 0.12, ease: "back.out(2)" }, 0.1)
        .from(q(".interest-text"), { opacity: 0, y: 12, duration: 0.5, stagger: 0.12 }, 0.2);
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="about" tabIndex={-1} aria-labelledby="about-h" className="section-pad relative outline-none">
      <div className="container-x">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="eyebrow text-teal-ink">[01] About</p>
            <h2 id="about-h" className="sr-only">
              About {profile.name}
            </h2>
          </div>
          <span className="numeral [--numeral-stroke:rgba(16,24,39,0.28)]" aria-hidden="true">
            01
          </span>
        </div>

        <p className="about-statement t-display mt-6 max-w-[22ch] sm:max-w-[26ch] lg:max-w-[30ch]" style={{ fontSize: "clamp(1.9rem, 4.6vw, 4.1rem)" }}>
          {about.heading.split(" ").map((w, i) => (
            <span key={i} className="about-word inline-block pr-[0.25em]">
              {w}
            </span>
          ))}
        </p>

        <div className="about-body mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="about-reveal lg:col-span-4">
            <Portrait />
          </div>

          <div className="lg:col-span-8 lg:pl-6">
            <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
              {about.paragraphs.map((t, i) => (
                <p key={i} className={`about-reveal text-[1.02rem] leading-[1.75] text-slate-ink ${i === 0 ? "md:col-span-2 md:text-lg md:text-navy" : ""}`}>
                  {t}
                </p>
              ))}
            </div>

            <dl className="about-reveal mt-12 grid gap-x-10 gap-y-5 border-t border-navy pt-6 sm:grid-cols-[8rem_1fr]">
              <dt className="eyebrow text-slate-ink">Studying</dt>
              <dd className="text-sm leading-relaxed">
                <strong className="font-semibold">{education.degree}</strong> — {education.institution} / {education.partner}
                <span className="eyebrow ml-2 text-teal-ink">{education.expected}</span>
              </dd>
              <dt className="eyebrow text-slate-ink">Based in</dt>
              <dd className="text-sm">{profile.location}</dd>
              <dt className="eyebrow text-slate-ink">Looking for</dt>
              <dd className="text-sm">{profile.openTo}</dd>
            </dl>
          </div>
        </div>

        {/* interests: an animated line connecting what I'm drawn to */}
        <div className="interest-line mt-20 lg:mt-28" aria-label="Interests">
          <p className="eyebrow mb-6 text-slate-ink">Interests · what I like building and learning</p>
          <div className="relative">
            <span aria-hidden="true" className="interest-rule absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-navy lg:block" />
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
              {about.interests.map((t, i) => (
                <li key={t} className="relative">
                  <span aria-hidden="true" className="interest-node relative z-10 mb-4 block h-[15px] w-[15px] rounded-full border border-navy bg-ivory">
                    {i === about.interests.length - 1 && <span className="absolute inset-[3px] rounded-full bg-lime" />}
                  </span>
                  <span className="interest-text block font-display text-base font-medium leading-snug">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
