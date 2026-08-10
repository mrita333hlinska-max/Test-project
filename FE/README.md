# FE — portfolio frontend

React 19 + TypeScript + Vite. Tailwind CSS 4 is the only styling system;
MUI, emotion and TSS-react were removed on 2026-08-10.

## Run

```bash
npm install
npm run dev        # dev server with HMR
npm run typecheck  # tsc -b, the only thing that actually checks types
npm run lint
npm run test       # vitest, watch mode
npm run test:run   # vitest, single run
npm run build      # tsc -b && vite build
```

`npm run dev` proxies `/api` to the backend on `http://localhost:3000`
(see `vite.config.ts`), so start `BE` too if you need real data.

## Layout — Feature-Sliced Design

```text
src/
├── main.tsx                 Vite entrypoint, outside the layers. BrowserRouter + createRoot
├── app/                     app-wide setup — no slices, segments only
│   ├── routes/              the only place that knows path -> page component
│   ├── layouts/RootLayout   header + <Outlet> + footer
│   └── styles/index.css     @import "tailwindcss" + @theme tokens
├── pages/                   one slice per route
├── widgets/header/          hamburger · breadcrumbs · weather slot
├── features/weather/        Open-Meteo badge
└── shared/                  no business logic — no slices, segments only
    ├── config/navigation    paths + labels, imported by both the router and the header
    └── ui/                  Avatar, EmptyState, icons/
```

**The import rule**: a slice may only import from layers *strictly below* it.
`app` → `pages` → `widgets` → `features` → `entities` → `shared`. `app` and
`shared` are the exceptions — they have no slices, and their segments may
reference each other.

Two consequences worth knowing before you move anything:

- **The header widget cannot import the router.** That is why path+label live in
  `shared/config/navigation.ts` (inert data, no imports) while the path → component
  mapping lives in `app/routes` (imports pages). Adding a page still means editing
  one list; forgetting to give it a component is a *compile* error, because
  `PAGE_BY_PATH` is typed `Record<RoutePath, ComponentType>`.
- **The weather badge is a feature, not a widget.** The header composes it, and a
  widget may not import another widget — same layer.

**Public API**: every slice exposes an `index.ts`. Import `@/widgets/header`, never
`@/widgets/header/ui/Header`. Absolute `@/…` imports are aliased in both
`vite.config.ts` and `tsconfig.app.json` — change one and you must change the other.

## Conventions

- **Tailwind 4 is configured in CSS**, not in `tailwind.config.js` — that file is a
  v3 pattern and does not exist here. Colours live as `@theme` tokens in
  `src/index.css` and are named by role (`ink`, `canvas`, `accent`), never by
  appearance.
- **Dark mode has no `dark:` classes.** The tokens are re-pointed inside a
  `prefers-color-scheme` media query, which re-themes every utility at once.
- **Import from `react-router`, not `react-router-dom`** — React Router 8 removed
  the `-dom` package.
- Adding a page means adding one entry to `routes.ts`. The nav drawer and the
  breadcrumbs read from it; there is no second list to update.

## External data

The header shows current weather from [Open-Meteo](https://open-meteo.com/) —
no API key, so the call is safe to make from the browser. The data is CC BY 4.0
and the attribution in the footer is a licence term, not a courtesy.
