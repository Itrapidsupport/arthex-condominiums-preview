# Arthex condominiums preview (design preview, noindex)

Speculative preview of a condominium-management site for Arthex Property Management (1983) Inc., prepared by IT Rapid Support. Not published by Arthex; nothing here touches arthex.ca.

- Live: https://itrapidsupport.github.io/arthex-condominiums-preview/
- Repo: https://github.com/Itrapidsupport/arthex-condominiums-preview (`main` = this source, `gh-pages` = built `dist/`)
- Content source: arthex.ca only (harvest + spec in `../harvest/`, `SPEC.md`). Photos and logo are Arthex's own files.

## Stack (same as the Zeitwerk 2026 build)
Vite 8, React 19, TypeScript 6, Tailwind CSS 4 (`@tailwindcss/vite`), react-router-dom 7, framer-motion (header, hero fade), GSAP ScrollTrigger (photo parallax), Lenis smooth scroll, three + @react-three/fiber + drei (hero condo massing model, `src/hero3d/`), SSR prerender (`vite build --ssr src/entry-server.tsx` + `scripts/postbuild.mjs`, react-dom/static), Playwright + axe QA (`qa/run.cjs`).

## Commands (run in this folder, Node 22)
| | |
|---|---|
| `npm run dev` | dev server |
| `npm run build` | type-check, client build, SSR build, prerender every route to `dist/<route>/index.html` + `404.html` (refuses without noindex) |
| `node scripts/serve.cjs 4173` | GitHub Pages-like local server at `http://localhost:4173/arthex-condominiums-preview/` |
| `node qa/run.cjs [--url <live base>] [--out dir]` | Chrome 1440x900 + WebKit iPhone 390x844 on every route: status, overflow, text overlap, broken images, console errors, noindex, one h1, logo sharpness, axe (desktop), mobile menu. Full-page screenshots. Exit 1 on any failure |
| `node qa/bake-poster.cjs <base>` | re-bake the hero poster from the live 3D scene (then convert to `public/hero/poster-{800,1600}.webp`) |
| `python3 scripts/images.py` | rebuild `public/img/*.webp` + `src/data/images.json` from `../harvest/media/` |
| `bash scripts/deploy.sh "msg"` | build, then force-push source to `main` and `dist` to `gh-pages` (token from `$GH_TOKEN` or `GITHUB_TOKEN` in `~/openclaw-import/workspace/.env`; `SKIP_BUILD=1` reuses `dist`) |

## Where things live
- Copy and facts: `src/data/site.ts` (all from arthex.ca). SEO + JSON-LD per route: `src/data/seo.ts`.
- Pages: `src/pages/` (Home, Services, About, StatusCertificate, Faq, Contact, NotFound).
- Brand tokens: top of `src/styles.css` (Arthex red, charcoal, logo yellow/green accents).
- 3D hero: `src/hero3d/Hero3D.tsx` (poster first, 3D chunk fetched after the load event + idle, crossfades in; runs on desktop and phones, phones get a lite profile: DPR <= 1.5, no shadow maps, standard materials; reacts to scroll orbit/dolly, mouse, touch drag, device tilt; reduced motion / Save-Data keep the poster) and `TowerScene.tsx`.
- Motion layer: `src/motion/scan.ts` (per-route pass: headline word reveals, image mask wipes + parallax, card stagger/tilt, magnetic buttons, dark-section clip transitions; hidden states only under `html.mk-js`, set after hydration), `src/motion/Chrome.tsx` (scroll progress line, service-area marquee), route curtain in `components/Layout.tsx`, CSS at the end of `styles.css`. Proof run: `node qa/motion.cjs --url <base> --out ../qa-motion`.
- Contact form: mailto to info@arthex.ca (the address Arthex publishes). No backend.

## Going live (needs NK + Arthex approval)
Remove the robots meta in `index.html`, `public/robots.txt` Disallow, the noindex guard in `scripts/postbuild.mjs`, the preview footer line, and point `ORIGIN` in `src/data/seo.ts` at the real domain.
