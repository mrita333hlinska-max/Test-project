# react-fullstack-test-app

Monorepo root. Frontend and backend live side by side.

```text
.
├── FE/     React 19 + Vite + MUI + Vitest app
└── BE/     backend (empty for now)
```

## Frontend

```bash
cd FE
npm install
npm run dev       # vite dev server
npm run test      # vitest watch
npm run test:run  # vitest once
npm run build     # tsc -b && vite build
npm run lint      # eslint
```

## Backend

`BE/` is intentionally empty. Add its own `package.json` (or other toolchain)
when work starts there — it is a separate package from `FE/`.
