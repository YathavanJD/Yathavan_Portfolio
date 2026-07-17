import { profile, references } from "../data/portfolio";

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-canvas border-t border-line/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <p className="font-mono text-xs tracking-[0.3em] uppercase text-signal-text mb-3">
          [CONTACT]
        </p>
        <h2 className="font-display text-3xl md:text-6xl font-semibold text-ink max-w-3xl leading-tight">
          Open to entry-level software roles.
        </h2>
        <p className="font-mono text-sm text-slate mt-4">
          {profile.location} &middot; Available for relocation &amp; remote work
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="font-mono text-xs uppercase tracking-widest bg-amber text-ink px-6 py-3 rounded-full hover:bg-ink hover:text-paper transition-colors shadow-sm"
          >
            Email
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s/g, "")}`}
            className="font-mono text-xs uppercase tracking-widest border border-line/25 text-ink px-6 py-3 rounded-full hover:border-line/60 transition-colors"
          >
            Call
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest border border-line/25 text-ink px-6 py-3 rounded-full hover:border-line/60 transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-widest border border-line/25 text-ink px-6 py-3 rounded-full hover:border-line/60 transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <p className="font-mono text-xs text-slate mt-6">
          {profile.email} &middot; {profile.phone}
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mt-16 max-w-3xl">
          {references.map((r) => (
            <div key={r.name} className="rounded-xl border border-line/12 bg-paper p-5 shadow-sm">
              <p className="font-display font-semibold text-ink">{r.name}</p>
              <p className="font-mono text-xs text-slate mt-1">{r.role}</p>
              <p className="font-mono text-xs text-slate-dim mt-3">{r.email}</p>
              <p className="font-mono text-xs text-slate-dim">{r.phone}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mt-20 pt-8 border-t border-line/10">
          <p className="font-mono text-[11px] text-slate-dim">
            &copy; 2026 {profile.name} &middot; Built with React, TypeScript, Tailwind &amp; GSAP.
          </p>
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-slate-dim hover:text-ink transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
