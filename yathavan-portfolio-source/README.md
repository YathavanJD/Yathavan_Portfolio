# Loganathan Yathavan — Portfolio

A cinematic, animation-driven portfolio built with **React + TypeScript + Tailwind CSS v4 + GSAP** (`useGSAP` + `ScrollTrigger`).

## What's inside

- **Light theme, high-contrast throughout** — a cool off-white canvas, white card surfaces, and dark navy ink text, with amber/teal used only as accents. No light-text-on-dark-background sections outside the two intentional photo panels described below.
- **Pinned, scroll-scrubbed hero** — three "system state" scenes (`[BOOT]` -> `[BUILD]` -> `[TEST]`) cross-fade as you scroll, tying the motion to the real tagline "I ship things end to end, then go find out why they broke."
- **Timed autoplay showcase carousel** ("Selected work, on rotation") — a large photographic stage panel auto-advances every 5s through six featured projects, each backed by a real, freely-licensed photo matched to what that project actually does (facial-recognition/AI art for MoodAware, a server room for the Management System, a bakery interior for the cake shop site, etc.), with a progress bar, staggered title/description reveals, and a clickable thumbnail stack. Pauses on hover, resumes on mouse leave.
- **Full project grid** — all 13 repositories, each with its own matching photo, scroll-revealed with a staggered fade/lift.
- **About, Education & Experience Log, Contact** — pulled from your real CV/portfolio content, no placeholder copy.
- Respects `prefers-reduced-motion` (skips pinning/autoplay) and swaps the pinned scroll-scrub for a simple crossfade on small screens.

### About the project photos
Each project card and the showcase carousel now use real photography (sourced from Pexels — free to use, no attribution required) chosen to match that project's subject matter rather than screenshots, since none of your repos had production screenshots on hand. If you'd rather use actual screenshots of your own apps, swap the `image` URL for each entry in `src/data/portfolio.ts` — every project object has an `image:` field you can point at your own file.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed `http://localhost:5173` URL.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. This repo ships with `base: './'` in `vite.config.ts` so the build works from any subpath — including GitHub Pages project sites (e.g. `username.github.io/repo-name/`).

A pre-built `dist/` folder is included at the top level of this zip so you can deploy immediately without running the build yourself — just upload its contents to any static host (GitHub Pages, Netlify, Vercel, etc.).

## Editing content

Everything text-based — your bio, projects, skills, timeline, and contact details — lives in one place:

```
src/data/portfolio.ts
```

Update that file and the whole site (hero stats, showcase carousel, project grid, about, log, contact) stays in sync.

## Structure

```
src/
  components/
    Nav.tsx                nav bar, solidifies on scroll
    Hero.tsx               pinned cinematic hero with scene transitions
    ProjectShowcase.tsx    timed autoplay project carousel
    ProjectGrid.tsx        full 13-project grid
    About.tsx
    Log.tsx                education & experience timeline
    Contact.tsx
  data/portfolio.ts        all real content in one file
  hooks/
    useReducedMotion.ts
    useIsMobile.ts
  index.css                design tokens (colors, fonts) via Tailwind v4 @theme
```
