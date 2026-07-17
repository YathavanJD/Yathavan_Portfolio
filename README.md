# Loganathan Yathavan — Portfolio

A cinematic, animation-driven personal portfolio built with **React, TypeScript, Tailwind CSS v4, and GSAP**. Built to showcase full-stack and backend engineering work with motion design that reflects the actual craft — not generic template animation.

**Live site:** _add your deployed URL here once live_
**Contact:** loganathanyathavan@gmail.com

---

## ✨ Highlights

- **Pinned, scroll-scrubbed hero** — three "system state" scenes (`[BOOT]` → `[BUILD]` → `[TEST]`) cross-fade as the page scrolls, tied to the tagline *"I ship things end to end, then go find out why they broke."*
- **Timed autoplay showcase carousel** — a large photographic stage cycles through six featured projects every 5 seconds, with a progress bar, staggered text reveals, and a clickable thumbnail stack. Pauses on hover.
- **Full project grid** — all 13 repositories, each with a matching photo, category tag, and tech stack, revealed with a staggered scroll animation.
- **Light, high-contrast design system** — off-white canvas, white card surfaces, dark navy text, amber/teal accents. Space Grotesk + IBM Plex Mono + Inter.
- **Accessible by default** — respects `prefers-reduced-motion` (skips pinned scroll-scrub and autoplay), and simplifies to crossfades with a swipeable card list on mobile.
- **Single source of truth for content** — every piece of text, every project, every link lives in one typed data file.

---

## 🛠 Tech stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS v4 (`@theme` design tokens) |
| Animation | GSAP + `@gsap/react` (`useGSAP`, `ScrollTrigger`) |
| Fonts | Space Grotesk, IBM Plex Mono, Inter (Google Fonts) |

No UI component library, no CSS-in-JS — plain Tailwind utility classes and a small set of custom CSS variables for theming.

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Outputs a fully static site to `dist/`. `vite.config.ts` is set to `base: './'`, so the build works from any subpath — including a GitHub Pages project site like `username.github.io/repo-name/`.

### Preview the production build locally

```bash
npm run preview
```

---

## 📦 Deploying

Any static host works. Three common options:

**GitHub Pages**
1. Run `npm run build`
2. Push the contents of `dist/` to your Pages branch (or use a GitHub Action to build + deploy automatically)
3. Enable Pages in your repo settings, pointing at that branch

**Netlify / Vercel**
1. Run `npm run build`
2. Drag the `dist/` folder into [Netlify Drop](https://app.netlify.com/drop), or connect the repo and set build command `npm run build` with publish directory `dist`

**Any other static host**
Upload the contents of `dist/` — it's plain HTML/CSS/JS with no server requirements.

---

## ✏️ Editing content

Every piece of text on the site — bio, stats, projects, skills, timeline, references, contact details — lives in a single typed file:

```
src/data/portfolio.ts
```

Update that file and the whole site stays in sync automatically. No need to touch component code for a content change.

### Swapping project photos

Each entry in the `projects` array has an `image:` field pointing at a stock photo chosen to match that project's subject matter. To use real screenshots of your own apps instead:

1. Drop your screenshot files into `public/`
2. Replace the corresponding `image:` URL with the local path, e.g. `"/screenshots/moodaware.png"`

### Adding a new project

Add a new object to the `projects` array in `src/data/portfolio.ts` (and optionally to `featuredProjectIds` if it should appear in the rotating showcase). The grid and carousel both render from that array — no other changes needed.

---

## 📁 Project structure

```
src/
├── components/
│   ├── Nav.tsx              # Nav bar, solidifies on scroll
│   ├── Hero.tsx              # Pinned cinematic hero with scene transitions
│   ├── ProjectShowcase.tsx   # Timed autoplay project carousel
│   ├── ProjectGrid.tsx       # Full project grid
│   ├── About.tsx             # Bio, skills, toolkit
│   ├── Log.tsx                # Education & experience timeline
│   └── Contact.tsx           # Contact details & references
├── data/
│   └── portfolio.ts          # All site content — single source of truth
├── hooks/
│   ├── useReducedMotion.ts   # Detects prefers-reduced-motion
│   └── useIsMobile.ts        # Detects narrow viewports
├── index.css                  # Design tokens (colors, fonts) via Tailwind's @theme
├── App.tsx                    # Section assembly
└── main.tsx                   # Entry point, registers GSAP plugins
```

---

## 🎨 Design system

Defined as CSS variables in `src/index.css` under `@theme`, so every color is a single source of truth:

| Token | Use |
|---|---|
| `--color-canvas` | Page background (off-white) |
| `--color-paper` | Card / raised surface background (white) |
| `--color-ink` | Primary text (dark navy) |
| `--color-slate` / `--color-slate-dim` | Secondary / tertiary text |
| `--color-amber` / `--color-amber-text` | Accent — vivid fill vs. text-safe variant |
| `--color-signal` / `--color-signal-text` | Secondary accent (teal) — same fill/text split |
| `--color-scrim` | Fixed dark overlay used only on photo panels, independent of page theme |

---

## ♿ Accessibility & performance notes

- Honors `prefers-reduced-motion`: skips the pinned scroll-scrub hero and carousel autoplay for users who have that OS setting enabled.
- Mobile viewports get a simplified crossfade hero (no scroll pinning, which tends to fight with touch scroll momentum) and a swipeable card list instead of hover-dependent thumbnails.
- All interactive elements are keyboard-focusable with visible focus states.

---

## 📄 License

This is a personal portfolio — feel free to fork the structure for your own site, but please swap out the content, photos, and personal details for your own.

---

Built by Loganathan Yathavan · Final-year BSc (Hons) Computer Science, SLIIT City University
