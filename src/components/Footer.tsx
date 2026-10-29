import { profile, sections } from "../data/portfolio";
import { scrollToId } from "../lib/motion";
import { SOCIAL } from "../config/site";

export default function Footer() {
  return (
    <footer className="on-dark border-t border-navy-line bg-navy text-ivory">
      <div className="container-x flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-ivory/70">
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind CSS &amp; GSAP.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(s.id);
                  }}
                  className="eyebrow link-u inline-flex min-h-11 items-center"
                >
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={SOCIAL.github} target="_blank" rel="noopener noreferrer" className="eyebrow link-u inline-flex min-h-11 items-center">
                GitHub
              </a>
            </li>
            <li>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="eyebrow link-u inline-flex min-h-11 items-center">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="eyebrow link-u inline-flex min-h-11 items-center">
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
