import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // FSD leans on absolute imports. With layers nested three deep, a relative
    // import reads "../../../shared/ui" — which says nothing about where the
    // file is, and silently breaks the moment you move the importing file.
    // "@/shared/ui" is the same string from anywhere in the project.
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: true,
    passWithNoTests: true,
  },
});
