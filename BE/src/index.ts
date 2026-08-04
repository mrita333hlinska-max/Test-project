import express from "express";
import type { Request, Response } from "express";

// Stage 1: the smallest server that proves the toolchain works.
//
// Note `import type` above. Request and Response are types only — they vanish
// at compile time. `verbatimModuleSyntax` in tsconfig.json makes this keyword
// mandatory, so TypeScript never emits a runtime import for something that
// does not exist at runtime.

const app = express();

// Parses JSON request bodies into req.body. Built into Express 5 — you no
// longer install body-parser separately.
app.use(express.json());

// A health endpoint is the first route of any real service: it is what a load
// balancer, Docker healthcheck or uptime monitor calls to ask "are you alive?".
// It must be cheap and must not touch the database.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// TODO(stage 3): this port is hardcoded. It moves into a validated config
// module so a missing or malformed env var fails loudly at startup.
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
