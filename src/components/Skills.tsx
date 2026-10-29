import { useMemo, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { projects, skillCategories, type Skill, type SkillLevel } from "../data/portfolio";
import { useReducedMotion } from "../hooks/useMedia";
import { ArrowUpRight } from "./Icons";

const LEVEL_LABEL: Record<SkillLevel, string> = {
  core: "Core",
  working: "Working knowledge",
  learning: "Learning",
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/** Which projects' stacks actually mention this skill? (Derived, never hand-typed.) */
function projectsUsing(skill: Skill) {
  const keys = [skill.name, ...(skill.match ?? [])].map(norm);
  return projects.filter((p) => p.stack.some((s) => keys.includes(norm(s))));
}

export default function Skills() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [sel, setSel] = useState<{ cat: string; name: string }>({ cat: "languages", name: "Java" });

  const selected = useMemo(() => {
    const cat = skillCategories.find((c) => c.id === sel.cat)!;
    const skill = cat.items.find((i) => i.name === sel.name)!;
    return { cat, skill, used: projectsUsing(skill) };
  }, [sel]);

  useGSAP(
    () => {
      if (reduced) return;
      const q = gsap.utils.selector(root);
      gsap
        .timeline({ scrollTrigger: { trigger: q(".skill-grid")[0], start: "top 80%", once: true } })
        .from(q(".skill-card"), { opacity: 0, y: 36, duration: 0.8, stagger: 0.08, ease: "power3.out" })
        .fromTo(q(".skill-rule"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, stagger: 0.08, ease: "power3.inOut" }, 0.1)
        .from(q(".skill-chip"), { opacity: 0, y: 10, duration: 0.4, stagger: { each: 0.018, from: "start" } }, 0.3);
    },
    { scope: root, dependencies: [reduced], revertOnUpdate: true }
  );

  /* Evidence panel flash on change */
  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(".evidence-body", { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" });
    },
    { scope: root, dependencies: [sel, reduced], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="skills" tabIndex={-1} aria-labelledby="skills-h" className="section-pad relative border-t border-hair outline-none">
      <div className="container-x">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow text-teal-ink">[02] Skills</p>
            <h2 id="skills-h" className="t-display mt-3">
              What I work with.
            </h2>
            <p className="t-lede mt-5 text-slate-ink">
              Grouped by what each tool is for — and checked against the projects that actually use it. No percentage bars: select a
              skill to see the evidence.
            </p>
          </div>
          <span className="numeral hidden [--numeral-stroke:rgba(16,24,39,0.28)] sm:block" aria-hidden="true">
            02
          </span>
        </div>

        <div className="skill-grid mt-14 grid gap-px overflow-hidden rounded-2xl border border-hair bg-hair sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((c) => {
            const isActive = sel.cat === c.id;
            return (
              <div key={c.id} className={`skill-card relative bg-ivory p-6 transition-colors duration-500 ${isActive ? "!bg-paper" : ""}`}>
                <div className="flex items-baseline justify-between">
                  <p className="eyebrow text-teal-ink">{c.code}</p>
                  <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? "bg-lime ring-1 ring-navy" : "bg-hair"}`} />
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{c.label}</h3>
                <p className="mt-1 text-sm text-slate-ink">{c.note}</p>
                <span aria-hidden="true" className="skill-rule my-4 block h-px origin-left bg-navy/70" />
                <ul className="flex flex-wrap gap-1.5">
                  {c.items.map((s) => {
                    const on = isActive && sel.name === s.name;
                    return (
                      <li key={s.name}>
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSel({ cat: c.id, name: s.name })}
                          className={`skill-chip inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 md:min-h-9 md:px-3 text-[0.8rem] font-medium transition-colors ${
                            on ? "border-navy bg-navy text-ivory" : "border-navy/20 bg-transparent text-navy hover:border-navy hover:bg-ivory"
                          }`}
                        >
                          {s.name}
                          {s.level && (
                            <span className={`font-mono text-[0.6rem] uppercase tracking-wider ${on ? "text-lime" : "text-teal-ink"}`}>
                              · {s.level}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Evidence */}
        <div className="on-dark mt-6 rounded-2xl border border-navy-line bg-navy p-6 text-ivory sm:p-8" role="region" aria-live="polite" aria-label="Skill evidence">
          <div className="evidence-body grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-lime">{selected.cat.code} / Evidence</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">{selected.skill.name}</p>
              {selected.skill.level && (
                <p className="eyebrow mt-3 inline-block rounded-full border border-lime px-3 py-1 text-lime">{LEVEL_LABEL[selected.skill.level]}</p>
              )}
            </div>
            <div className="lg:col-span-8">
              {selected.used.length > 0 ? (
                <>
                  <p className="text-sm text-ivory/80">
                    Appears in the stack of <strong className="text-ivory">{selected.used.length}</strong> of {projects.length} projects:
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {selected.used.map((p) => (
                      <li key={p.id}>
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="chip min-h-11 transition-colors md:min-h-9 hover:border-lime hover:text-lime"
                        >
                          {p.title.split(" — ")[0]} <ArrowUpRight width={12} height={12} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-ivory/80">
                  {selected.skill.note ?? "Listed in the original portfolio."}
                  <span className="mt-2 block text-ivory/55">Not part of any listed project's stack.</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
