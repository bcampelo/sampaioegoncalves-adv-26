# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page institutional site for **Sampaio & Gonçalves Advogados Associados** (a law firm in Sena Madureira, AC, Brazil). Dark, editorial, cinematic experience: WebGL 3D hero, scroll-driven GSAP motion. No routing, no backend, no CMS — it's one static page assembled from sections in `src/App.tsx`.

All UI copy and content in this repo is in **Portuguese** — keep new content, comments, and commit messages consistent with that unless told otherwise.

## Commands

```bash
npm install
npm run dev      # starts Vite dev server at http://localhost:5173
npm run build    # tsc --noEmit (typecheck) + vite build -> /dist
npm run preview  # serve the production build locally
```

There is no lint script and no test suite configured. `npm run build` is the closest thing to CI validation — it fails on type errors (strict mode, `noUnusedLocals`, `noUnusedParameters` are all on).

## Architecture

### Content is fully data-driven

**`src/data/content.ts` is the single source of truth for all editable content** — contacts, lawyers (with bios/skills/OAB numbers), practice areas, stats, manifesto items, nav links, marquee terms. Adding a lawyer or practice area means appending to an array in this file; no layout/component changes are needed. When asked to change site copy or add/remove a lawyer or practice area, edit this file, not the section components.

### Design system: MASTER.md is authoritative

`MASTER.md` at the repo root is the design system source of truth (colors, type scale, spacing, motion tokens, component inventory). It is implemented as:
- Tailwind tokens in `tailwind.config.ts` (colors `navy`/`gold`/`ink`, font families, `display-*` fluid clamp sizes, `shell`/`section` spacing, custom easings, keyframes)
- CSS variables/utilities in `src/index.css` (`.glass`, `.glass-strong`, `.text-gold-gradient`, `.reveal-mask`, `.overline`, `.shell`, `.perspective-grid`, etc.)

Before introducing a new color, spacing value, or animation easing, check whether a token already exists in `MASTER.md`/`tailwind.config.ts` rather than hardcoding a new value. Motion rules from MASTER.md to respect: no elastic bounce, no `ease-in` on entrances, never animate `width`/`height` directly, everything must respect `prefers-reduced-motion`.

### Motion architecture

- **GSAP + ScrollTrigger** (`src/lib/gsap.ts` registers the plugin) drives all scroll-linked animation, imported from `@/lib/gsap` (not `gsap` directly) so the plugin registration always happens.
- **Lenis** smooth-scroll (`src/providers/SmoothScroll.tsx`) wraps the whole app and syncs its raf loop to `gsap.ticker` so ScrollTrigger and the smooth scroll read the same timeline (no jitter). It also intercepts anchor-link clicks for smooth in-page navigation. It's skipped entirely when `prefers-reduced-motion` is set — native scroll takes over.
- **`useReducedMotion()`** (hook) / **`prefersReducedMotion()`** (non-reactive helper) in `src/hooks/useReducedMotion.ts` gate motion everywhere: components typically branch early to `gsap.set(...)` a final resting state instead of animating when reduced motion is preferred.
- Reusable animation primitives live in `src/components/ui/`: `Reveal`/`WordsReveal` (scroll-triggered entrance via `useGSAP` + `ScrollTrigger`), `TiltCard` (3D tilt), `Magnetic`, `Counter` (count-up), `Marquee`, `Cursor`. Prefer composing these over writing new raw GSAP timelines in section components.
- Animation code uses `useGSAP` (from `@gsap/react`) with `{ scope: ref }` rather than raw `useEffect`, so timelines are automatically scoped/cleaned up per component instance.

### 3D hero (`src/components/three/`)

`HeroScene.tsx` (react-three-fiber `Canvas`) + `GoldField.tsx` (custom shader particle field) render the WebGL hero background. Notable details:
- Lazy-loaded via `React.lazy` from `Hero.tsx` and code-split into its own `three` chunk (`vite.config.ts` `manualChunks`), so it doesn't block initial load.
- Disabled outright when `prefersReducedMotion()` is true.
- Particle count and post-processing (bloom) are reduced/disabled on touch devices (`useIsTouch()` from `src/hooks/useMediaQuery.ts`) for performance.

### Section/component layout conventions

- `src/App.tsx` composes the page top-to-bottom: `Preloader`, `NoiseOverlay`, `Cursor`, `FloatingWhatsApp` are page-level overlays outside `SmoothScroll`; the actual page sections (`Hero`, `Sobre`, `Areas`, `Advogados`, `Contato`) live inside `SmoothScroll` > `main`.
- `src/components/layout/` — `Navbar`, `Footer` (persistent chrome).
- `src/components/sections/` — one component per page section, each reads from `src/data/content.ts`.
- `src/components/ui/` — animation/interaction primitives and small building blocks (buttons, cards, reveals, cursor, preloader, WhatsApp FAB).
- `src/components/three/` — WebGL hero scene.
- Import alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`) — always use `@/...` imports, not relative paths across directories.
- `src/lib/utils.ts` has small shared helpers: `cx()` (classnames), `whatsappLink()` / `DEFAULT_WHATSAPP_MESSAGE` for building WhatsApp CTA links — reuse these instead of re-implementing.

### Accessibility/perf conventions already in place

- All CTA links to WhatsApp should go through `whatsappLink()` from `@/lib/utils`.
- Images use `loading="lazy"`.
- Interactive elements need visible focus states (gold `focus-visible` ring per MASTER.md's "5 states" rule: default/hover/focus/active/disabled).
