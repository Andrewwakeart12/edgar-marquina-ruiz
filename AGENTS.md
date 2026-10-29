# AGENTS.md

## Commands
- `npm run dev` — Vite dev server; `npm run build` — production build; `npm run preview` — serve build.
- `npm run lint` — the only automated check (flat ESLint config in `eslint.config.js`). It currently passes.
- There is no test runner or typecheck. Do not invent `npm test` or `tsc`.

## Architecture
- Vite + React 19 SPA, no router. `src/App.jsx` renders exactly one section at a time from its `sections` map.
- Navigation is a custom DOM event, not URLs: `window.dispatchEvent(new CustomEvent("navigate", { detail: "<section-id>" }))`; `App.jsx` listens for `navigate`. Add a new view to the `sections` map and dispatch the matching id.
- `Navbar.jsx` has its own hardcoded `links` array. `character-sheet` is intentionally reached only by clicking the name on `Home.jsx`; it is not in the navbar.
- `Home.jsx` is the mounted landing page. Site copy is Spanish (`index.html` is `lang="es"`); keep new UI text Spanish.

## Content and assets
- All editable copy/data lives in `src/data/content.js` (profile, skills, projects, experience, education).
- Project images are resolved by basename: `Projects.jsx` uses `import.meta.glob("../assets/images/*")` and `project.image` is a filename without extension. Add the asset under `src/assets/images/` with the same name. Missing images render an initials placeholder in `ProjectCard.jsx`.
- `profile.cvUrl` points to `/cv.pdf`, but `public/cv.pdf` does not exist, so the CV button 404s until it is added. `profile.github` is empty and `profile.whatsapp`/`phone` are absent, so those buttons stay hidden.

## Styling and themes
- Global tokens and shared layout classes are in `src/index.css`; component styles live next to their component. `Home.css` has the landing-page rules and `Navbar.css` has the logo plus the timeline/bottom navigation.
- Theme is the `data-theme` attribute on `<html>` plus CSS variables. Two independent implementations already fight over it: `src/hook/useTheme.js` (localStorage key `theme`, defaults light) and `CharacterSheet.jsx` (key `obs_theme`, defaults dark, emits `themeChange`). Extend one rather than adding a third.
- Responsive navigation: at `max-width: 1024px` the right-side timeline becomes a fixed bottom bar; `index.css` and `Footer.css` reserve bottom padding (including `safe-area-inset-bottom`) so content is not hidden. Above 1024px the page reserves a 13rem right rail for the fixed timeline. Keep these in sync when changing navigation.
- Icons are mostly `react-icons/fi`; only `Navbar.jsx` uses `morphicons` + `lucide`. Keep new icons in the existing `react-icons/fi` style unless changing the navbar.
- `src/components/HalftoneBg.jsx` is a full-screen canvas background that observes `data-theme`; it is rendered globally by `App.jsx`.

## Deployment
- Vercel static deployment is configured in `vercel.json` (`npm run build`, output `dist`). `.vercel` is gitignored.
- No SPA rewrites are needed because there is no router and only the root page is served.

## Notes
- `README.md` is still the stock Vite template — trust `package.json` and the source instead.
- `src/hook/` is singular (not `hooks/`).
