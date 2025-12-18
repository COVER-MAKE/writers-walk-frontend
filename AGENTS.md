# Repository Guidelines

## Project Structure & Module Organization
- Vite + React entry in `src/main.jsx`; routes live in `src/App.jsx` via React Router.
- Page screens live in `src/pages` (LoginPage, SignupPage, HomePage, BookListPage, BookDetailPage, NewBookPage, MyPage); shared chrome is in `src/layouts/MainLayout.jsx` and reusable widgets in `src/components` (e.g., `AuthInput`).
- API/prompt helpers stay in `src/utils/aiService.js`; static assets sit in `src/assets`; global styles are in `src/index.css` and `src/App.css`. Use `public/` for files served as-is and expect `dist/` to hold build output.

## Build, Test, and Development Commands
- `npm install` — install dependencies (keep `package-lock.json` in sync).
- `npm run dev` — start the Vite dev server (default http://localhost:5173).
- `npm run build` — produce an optimized bundle in `dist/`.
- `npm run preview` — serve the built bundle locally for smoke testing.
- `npm run lint` — run ESLint with React Hooks/Refresh presets; resolve findings before opening a PR.

## Coding Style & Naming Conventions
- ES modules with semicolons; import order from external libraries to local paths.
- Prefer function components and hooks; keep side effects in `useEffect` and navigation through React Router.
- Files and components use PascalCase; variables and functions use camelCase; shared constants may use SCREAMING_SNAKE_CASE.
- Match nearby indentation (current files mix 2–4 spaces); break long JSX props onto new lines when it improves readability.

## Testing Guidelines
- No automated tests are configured yet; rely on linting plus manual verification of key flows (auth, routing, API calls) before merging.
- If adding tests, use a Vite-friendly stack (Vitest + React Testing Library), colocate `*.test.jsx` near the source, and focus on behavior over snapshots.
- Document any untested areas in the PR description until coverage is established.

## Commit & Pull Request Guidelines
- Recent history mixes `feat: ...` style commits and merges; keep concise `<type>: <scope>` messages (e.g., `feat: add book pagination`) or follow the emoji-tag table in `README.md`, but stay consistent within a branch.
- Keep commits scoped and rebased; include `package-lock.json` when dependencies change.
- PRs should describe the change, link issues/tasks, include screenshots or clips for UI updates, and list manual checks (`npm run lint`, `npm run build`/`npm run preview`). Flag migrations or new env vars (use `VITE_*` prefixes for Vite).
- Never commit secrets. API keys consumed by `aiService` should live in local `.env` files and be injected via Vite env variables.

## Security & Configuration Tips
- Axios is configured with `withCredentials`, so cross-origin calls rely on cookies; verify backend CORS settings match frontend hosts.
- Keep API hosts and AI endpoints in env variables instead of hardcoding URLs; prefer `import.meta.env` lookups and a single config helper for reuse.
