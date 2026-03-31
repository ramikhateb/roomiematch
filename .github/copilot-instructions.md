<!-- Copilot / AI agent instructions tailored to this repository -->
# Copilot instructions — roomiematch

Purpose: provide concise, actionable guidance for AI coding agents working on this React + TypeScript + Vite app.

- Big picture
  - Single-page React + TypeScript app built with Vite. Entry: [src/main.tsx](src/main.tsx).
  - Main UI surface lives in [src/App.tsx](src/App.tsx). Static assets are in [src/assets](src/assets).
  - Dev server and bundling handled by Vite; project uses TypeScript type-checking (`tsc -b`) before production builds.

- Key files and where to look first
  - App entry: [src/main.tsx](src/main.tsx)
  - Root component: [src/App.tsx](src/App.tsx)
  - Vite config: [vite.config.ts](vite.config.ts)
  - Scripts & deps: [package.json](package.json)
  - ESLint config: [eslint.config.js](eslint.config.js)
  - TypeScript configs: [tsconfig.json](tsconfig.json) and [tsconfig.app.json](tsconfig.app.json)

- Developer workflows (commands you can run)
  - Start dev server (HMR): `npm run dev` (runs `vite`) — quick iterations, open http://localhost:5173 by default.
  - Build for production: `npm run build` (runs `tsc -b && vite build`). Note: `tsc -b` runs project-level type checks.
  - Preview production build: `npm run preview`.
  - Lint code: `npm run lint` (uses ESLint configuration in `eslint.config.js`).

- Project-specific patterns and conventions
  - Imports include explicit file extensions in some places (e.g. `import App from './App.tsx'` in [src/main.tsx](src/main.tsx#L1-L6)). Follow existing style when adding files.
  - Assets (SVG/PNG) are imported directly into components (see [src/App.tsx](src/App.tsx)). Use `src/assets` for app images; public static files (like `/icons.svg`) are referenced from the `public/` root.
  - DOM bootstrapping uses non-null assertion on `getElementById('root')!` — code assumes `index.html` contains `#root`.
  - CSS is colocated in `src/index.css` and `src/App.css` for global and component styles.

- Integration points & external expectations
  - Dependencies: React 19 and Vite (see [package.json](package.json)). No backend code in repo — treat this as frontend-only.
  - Type checking is enforced via `tsc -b` in the build step. Avoid committing code that fails `tsc`.

- When you make changes
  - Keep imports consistent with existing files (preserve extensions where present).
  - Update `src/assets` and `public/` carefully: images in `src/assets` are imported, files in `public/` are referenced by absolute path.
  - Run `npm run dev` locally after edits to verify HMR and layout changes.

- Notes for automated edits (PRs / large refactors)
  - Small UI changes: modify `src/App.tsx` and associated CSS. Verify visually via dev server.
  - Adding new pages/components: place under `src/` as `.tsx` files, export default the component, and ensure imports match extension style used in this repo.
  - No tests found in repository — do not add test runners without confirming preferred tooling.

If anything here is unclear or you want more/less detail (examples, preferred commit message format, or CI steps), tell me and I'll iterate.
