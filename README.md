# Loganathan Yathavan — Portfolio

React 19 · TypeScript · Vite · Tailwind CSS v4 · GSAP (ScrollTrigger, Flip, ScrollTo) via `@gsap/react`.
Design concept: **The Digital Systems Architect** — ivory canvas, midnight-navy panels, lime/teal accents.

```bash
npm install
npm run dev       # local dev
npm run lint      # oxlint
npm run build     # tsc -b + vite build  → dist/
npm run preview   # serve the production build
```

## Where to edit things

| What | File |
|---|---|
| **WhatsApp number**, **email**, social links, form/chat endpoints | `src/config/site.ts` |
| **CV** | drop the PDF at `public/Loganathan_Yathavan_CV.pdf` (exact name) and rebuild — every "Request CV" button becomes "Download CV" automatically (detected in `vite.config.ts`) |
| Projects, skills, timeline, copy | `src/data/portfolio.ts` |
| Project screenshots | put images in `public/projects/`, then set `screenshot: "/projects/x.webp"` on the project. Until then a generated *schematic* (clearly not a screenshot) is shown |
| Live demo links | add `live: "https://…"` to a project — a "Live demo" button appears |
| Colours / fonts / buttons | `src/index.css` (`@theme` tokens) |

WhatsApp URL is built as `https://wa.me/<digits only>?text=<encoded message>` (`src/lib/contact.ts`).

## Contact form (honest by design)
- No backend configured → the form opens the visitor's email app pre-filled and says nothing has been sent until they press Send.
- To enable real submission, set `VITE_FORM_ENDPOINT` (e.g. a Formspree URL) at build time. Success is only shown on a 2xx response. A honeypot + minimum-time check filter basic bots. Do your own validation/spam protection server-side if you write a custom endpoint. **Never put secrets in `VITE_*` variables.**

## MotoBot
`src/chat/` — UI (`MotoBot.tsx`), data-grounded rule-based engine (`engine.ts`). It answers only from `portfolio.ts` + `site.ts` and is labelled **"Demo · rule-based, not an AI model"** in the UI.
To use a real LLM, deploy a serverless function that holds the API key and set `VITE_CHAT_ENDPOINT`. Contract: `POST { messages: [{role, content}] } → { reply: string }`. The UI switches to "AI-assisted" and falls back to the built-in notes if the call fails.

## Motion notes
- GSAP plugins are registered once in `src/lib/motion.ts`; all effects use `useGSAP` (context-safe cleanup). No Lenis / Framer Motion — native scrolling is preserved.
- Desktop (≥1024px wide, ≥740px tall, motion allowed): pinned hero (4 scroll stages) and pinned featured-project sequence. Everywhere else: no pins, simplified layouts, user-controlled project stage (no autoplay anywhere).
- `prefers-reduced-motion`: no intro, no pins, no cursor effects, no parallax; content and controls all remain.

## Contrast
Spec "muted slate" `#687386` is 4.3:1 on ivory (fine for large/decorative text only). Small text uses `--color-slate-ink #4d586b`; teal text on light uses `--color-teal-ink #0d6f6a`. Lime/teal are never used as small text on ivory.

## Verified (production build, Lighthouse desktop, local)
Accessibility 100 · SEO 100 · Best Practices 96 · Performance 83–93 (run-to-run variance in a sandbox).
