import { CHAT_ENDPOINT, CONTACT_EMAIL, CV, SOCIAL, SITE_URL, WHATSAPP_NUMBER } from "../config/site";
import { cvAction, mailtoUrl, whatsappConfigured, whatsappUrl } from "../lib/contact";
import { about, education, featuredProjectIds, profile, projects, skillCategories, timeline, type Project } from "../data/portfolio";

export type Link = { label: string; href: string };
export type Reply = { text: string; links?: Link[]; suggestions?: string[] };
export type Turn = { role: "user" | "assistant"; content: string };

export const WELCOME =
  "Hey there! I'm MotoBot, Yathavan's digital assistant. I can tell you about his journey, explore his projects, explain his technical skills, or help you get in touch with him. What would you like to discover?";

export const STARTERS = [
  "Who is Yathavan?",
  "What technologies does he use?",
  "Show me his best projects.",
  "Tell me about MoodAware.",
  "How does his AI project work?",
  "Can I download his CV?",
  "What is his GitHub profile?",
  "How can I contact him?",
  "What kind of opportunities is he interested in?",
];

const UNKNOWN =
  "I don't have a verified detail about that part of Yathavan's background yet. You can contact him directly for the most accurate information.";

const short = (p: Project) => p.title.split(" — ")[0];
const repoLink = (p: Project): Link => ({ label: `${short(p)} on GitHub`, href: p.href });
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#./ ]/g, " ").replace(/\s+/g, " ").trim();
const has = (q: string, re: RegExp) => re.test(q);

const contactLinks = (): Link[] => [
  ...(whatsappConfigured ? [{ label: `WhatsApp (${WHATSAPP_NUMBER})`, href: whatsappUrl() }] : []),
  { label: `Email ${CONTACT_EMAIL}`, href: mailtoUrl() },
];

/** Find a single project the query is clearly about. */
function findProject(q: string): Project | undefined {
  const aliases: Record<string, string[]> = {
    moodaware: ["moodaware", "mood aware", "mood-aware", "final year project", "ai project", "emotion"],
    learnforged: ["learn forged", "learn_forged", "learnforged", "lms", "learning management"],
    skmetal: ["sk metal", "metal shop"],
    cabzo: ["cabzo", "car booking", "ride booking", "ride-booking"],
    studentmgmt: ["student management"],
    vertex: ["vertex"],
    heartquist: ["heartquest", "heartquist", "heart quist", "heart-quist"],
    knowledgeknockout: ["knowledgeknockout", "knowledge knockout"],
    wrapitup: ["wrap it up", "cake"],
    carwash: ["car wash"],
    portfolio: ["this portfolio", "this website", "this site", "yathavan_portfolio", "previous site", "previous portfolio", "old portfolio"],
    managementsystem: ["management system"],
    vidma: ["vidma", "security assessment", "data protection"],
  };
  // Prefer the most specific alias hit (longest).
  let best: { p: Project; len: number } | undefined;
  for (const p of projects) {
    for (const a of aliases[p.id] ?? []) {
      if (q.includes(a) && (!best || a.length > best.len)) best = { p, len: a.length };
    }
  }
  return best?.p;
}

function projectReply(p: Project): Reply {
  const lines = [`${p.title} (${p.category}).`, p.description, `Stack: ${p.stack.join(", ")}.`];
  if (p.id === "moodaware") {
    lines.push(
      "It's an experimental academic project — not a clinical or diagnostic tool. Ask me “how does MoodAware work?” for the architecture."
    );
  }
  if (p.repoIsProfile) lines.push("I only have his GitHub profile link for this one, not a dedicated repository URL.");
  const links = [repoLink(p)];
  if (p.live) links.push({ label: "Live demo", href: p.live });
  else lines.push("There's no live demo listed for it — the source code is on GitHub.");
  return { text: lines.join("\n"), links, suggestions: ["Show me his best projects.", "How can I contact him?"] };
}

function moodAwareHow(): Reply {
  const m = projects.find((p) => p.id === "moodaware")!;
  return {
    text: [
      "MoodAware is a Flask web app with two ways to read emotion:",
      "1. Face — a webcam image is processed with OpenCV, then classified by an EfficientNetB0 (TensorFlow/Keras) model.",
      "2. Text — what a user types goes through TF-IDF and a Logistic Regression model (scikit-learn).",
      "The result maps to music and wellness suggestions, and moods are saved to MongoDB so a history dashboard can show patterns over time. Users register and log in with Flask-Login and Bcrypt, and there's an admin dashboard.",
      m.results ? `Reported results from the README: ${m.results.join("; ")}.` : "",
      "It's an experimental academic project, not a clinical tool.",
    ]
      .filter(Boolean)
      .join("\n"),
    links: [repoLink(m)],
    suggestions: ["Which projects use Python?", "Can I view the source code?"],
  };
}

/** Match a technology named in the query against skills and project stacks. */
function techReply(q: string): Reply | undefined {
  const terms = new Map<string, { display: string; keys: string[]; note?: string }>();
  for (const c of skillCategories)
    for (const s of c.items) terms.set(norm(s.name), { display: s.name, keys: [s.name, ...(s.match ?? [])].map(norm), note: s.note });
  for (const p of projects) for (const s of p.stack) if (!terms.has(norm(s))) terms.set(norm(s), { display: s, keys: [norm(s)] });
  const extra: Record<string, string> = { js: "javascript", ts: "typescript", android: "android / java", ml: "scikit-learn", tailwind: "tailwind css", tensorflow: "tensorflow / keras", keras: "tensorflow / keras" };

  let hit: { display: string; keys: string[]; note?: string } | undefined;
  let hitLen = 0;
  const tokens = ` ${q} `;
  for (const [k, v] of terms) {
    const re = new RegExp(`(^|[^a-z0-9])${k.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}([^a-z0-9]|$)`);
    if (re.test(tokens) && k.length > hitLen) {
      hit = v;
      hitLen = k.length;
    }
  }
  if (!hit)
    for (const [a, k] of Object.entries(extra)) if (new RegExp(`(^|[^a-z0-9])${a}([^a-z0-9]|$)`).test(tokens) && terms.has(k)) hit = terms.get(k);
  if (!hit) return undefined;

  const used = projects.filter((p) => p.stack.some((s) => hit!.keys.includes(norm(s))));
  if (used.length)
    return {
      text: `${hit.display} appears in the stack of ${used.length} of ${projects.length} projects:\n${used.map((p) => `• ${short(p)}`).join("\n")}`,
      links: used.slice(0, 4).map(repoLink),
      suggestions: ["What technologies does he use?", "Show me his best projects."],
    };
  return {
    text: `${hit.display} isn't in the stack of any of the ${projects.length} listed projects. ${hit.note ? `On record: ${hit.note}` : "It's listed in his portfolio, but I don't have a verified project that uses it."}`,
    suggestions: ["What technologies does he use?", "Show me his best projects."],
  };
}

/** Pure, deterministic, data-grounded answers. */
export function answerLocally(raw: string): Reply {
  const q = norm(raw);
  if (!q) return { text: "Ask me anything about Yathavan's background, skills, projects or how to reach him." };

  if (has(q, /^(hi|hey|hello|yo|hola|good (morning|afternoon|evening))\b/) && q.split(" ").length <= 4)
    return { text: "Hello! Ask me about Yathavan's projects, skills, education, CV or how to contact him.", suggestions: STARTERS.slice(0, 4) };

  if (has(q, /\b(contact|reach|get in touch|whatsapp|message him|email|phone|call|talk to|hire|collaborat)/)) {
    return {
      text: "Would you like to discuss a project, collaboration, or professional opportunity with Yathavan? You can reach him directly through WhatsApp or email. I can only open the channel for you — I can't send a message on your behalf.",
      links: contactLinks(),
      suggestions: ["Can I download his CV?", "What is his GitHub profile?"],
    };
  }

  if (has(q, /\b(cv|resume|curriculum)\b/)) {
    return cvAction.kind === "download"
      ? { text: "Yes — his CV is available as a PDF.", links: [{ label: "Download CV (PDF)", href: CV.href }] }
      : {
          text: "His CV file hasn't been uploaded to this site yet, so there's nothing to download right now. You can request it by email and he can send it over.",
          links: [{ label: "Request CV by email", href: cvAction.href }],
        };
  }

  if (has(q, /\blinkedin\b/)) return { text: "Here's his LinkedIn profile.", links: [{ label: "LinkedIn", href: SOCIAL.linkedin }] };

  if (has(q, /\b(live demo|demo|deployed|hosted)\b/))
    return {
      text: projects.some((p) => p.live)
        ? `Live demos: ${projects.filter((p) => p.live).map(short).join(", ")}.`
        : "None of the projects have a live demo URL listed yet. All of them have their source on GitHub — his GitHub profile is the best place to look.",
      links: [{ label: "GitHub profile", href: SOCIAL.github }],
    };

  if (has(q, /\b(github|source code|repo|repository|repositories|code)\b/) && !findProject(q))
    return {
      text: `All ${projects.length} projects are on GitHub. Three of them (Student Management System, Management System, and the Vidma security assessment) only have his profile link on record rather than a dedicated repository URL.`,
      links: [{ label: "GitHub profile", href: SOCIAL.github }],
      suggestions: ["Show me his best projects.", "Tell me about MoodAware."],
    };

  if (has(q, /\b(how does|how do|how it works|architecture|explain)\b/) && (has(q, /\b(mood|ai|emotion)/) || findProject(q)?.id === "moodaware"))
    return moodAwareHow();

  const proj = findProject(q);
  if (proj) return projectReply(proj);

  if (has(q, /\b(best|top|favou?rite|interesting|featured|show me)\b.*\b(project|work|build)|\b(project|work)s?\b.*\b(best|top|interesting)/)) {
    const f = featuredProjectIds.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);
    return {
      text: `These are the featured projects:\n${f.map((p) => `• ${short(p)} — ${p.category}`).join("\n")}\nThe one most people ask about is MoodAware, his AI-based final-year project.`,
      links: f.slice(0, 3).map(repoLink),
      suggestions: ["Tell me about MoodAware.", "Which projects use Java?"],
    };
  }

  if (has(q, /\b(all|list|every|how many)\b.*\bprojects?\b|\bprojects?\b/) && !techReply(q))
    return {
      text: `There are ${projects.length} projects on the portfolio:\n${projects.map((p) => `• ${short(p)} (${p.group})`).join("\n")}`,
      suggestions: ["Show me his best projects.", "Which projects use PHP?"],
    };

  const tech = techReply(q);
  if (tech && !has(q, /\b(technolog|skills?|stack)\b/)) return tech;

  if (has(q, /\b(skills?|technolog|stack|tools?|languages?|know)\b/)) {
    const lines = skillCategories.map((c) => `• ${c.label}: ${c.items.map((i) => i.name + (i.level ? ` (${i.level})` : "")).join(", ")}`);
    return {
      text: `Here's what's on record (with levels only where his portfolio states them — no made-up percentages):\n${lines.join("\n")}\nI treat anything marked “learning” as exactly that, not expertise.`,
      suggestions: ["Which projects use Java?", "Tell me about MoodAware."],
    };
  }
  if (tech) return tech;

  if (has(q, /\b(education|study|studying|degree|university|sliit|school|academic|graduat)/))
    return {
      text: `${education.degree} at ${education.institution} (${education.partner}) — ${education.expected.toLowerCase()}.\n${timeline[0].body}\nHe also completed a Diploma in English (March 2022 – Jan 2023).`,
      suggestions: ["Who is Yathavan?", "What technologies does he use?"],
    };

  if (has(q, /\b(experience|work history|worked|employ|intern|job|career|company|accron)\b/))
    return {
      text: `What I have on record is education, coursework and practice: ${timeline.map((t) => t.title).join("; ")}. I don't have verified employment or internship details, including any company work. ${UNKNOWN}`,
      links: contactLinks(),
    };

  if (has(q, /\b(opportunit|looking for|available|open to|availability|relocat|remote)\b/))
    return {
      text: `${profile.openTo}. His portfolio currently lists him as “${profile.status}”. For specifics like timing, relocation or remote work, it's best to ask him directly.`,
      links: contactLinks(),
    };

  if (has(q, /\b(learn|learned|learnt|lesson)\b/))
    return { text: `${UNKNOWN} What I can say is where he's focusing now: ${about.paragraphs[2].toLowerCase().replace("right now i'm", "right now he's")}`, links: contactLinks() };

  if (has(q, /\b(problem|solve|solved|challenge)\b/)) {
    const m = projects.find((p) => p.id === "moodaware")!;
    return {
      text: `The best-documented example is MoodAware. Problem: ${m.problem} Approach: ${m.solution}`,
      links: [repoLink(m)],
      suggestions: ["How does his AI project work?"],
    };
  }

  if (has(q, /\b(who|about|yathavan|introduce|tell me about (him|yourself))\b/))
    return {
      text: `${profile.name} is a ${profile.descriptor.toLowerCase()} — ${education.degree.replace("BSc (Hons) ", "")} at ${education.institution} — building full-stack web and Android applications, with a growing focus on backend engineering and Spring Boot. Based in ${profile.location}.\n${about.paragraphs[1]}`,
      suggestions: ["Show me his best projects.", "What technologies does he use?", "How can I contact him?"],
    };

  if (has(q, /\b(website|portfolio|site|url)\b/)) return { text: "This is his portfolio.", links: [{ label: SITE_URL.replace("https://", ""), href: SITE_URL }] };

  return { text: UNKNOWN, links: contactLinks(), suggestions: STARTERS.slice(0, 4) };
}

/**
 * Answer a message. Uses the secure backend if VITE_CHAT_ENDPOINT is configured
 * (contract: POST { messages: Turn[] } → { reply: string }); otherwise the local, rule-based demo engine.
 */
export async function ask(history: Turn[]): Promise<{ reply: Reply; mode: "ai" | "demo"; error?: boolean }> {
  const last = history[history.length - 1]?.content ?? "";
  if (CHAT_ENDPOINT) {
    try {
      const res = await fetch(CHAT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-10) }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { reply?: string };
      if (!data.reply) throw new Error("empty");
      return { reply: { text: data.reply }, mode: "ai" };
    } catch {
      return {
        reply: { ...answerLocally(last), text: "I couldn't reach the AI service just now, so I'm answering from my built-in notes.\n" + answerLocally(last).text },
        mode: "demo",
        error: true,
      };
    }
  }
  return { reply: answerLocally(last), mode: "demo" };
}
