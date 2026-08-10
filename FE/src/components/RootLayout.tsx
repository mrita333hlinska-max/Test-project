import { Outlet } from "react-router";
import { Header } from "./Header";

/**
 * The shell every page renders inside. `<Outlet />` is the hole the matched
 * child route fills — which is why the header mounts once and keeps its state
 * (and its weather request) across navigation, instead of remounting per page.
 */
export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-canvas font-sans text-ink antialiased">
      {/* First tab stop on the page: lets a keyboard user jump the header
          instead of tabbing through the menu on every single page. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:outline-2 focus:outline-accent"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6 py-14 sm:px-8">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-3xl px-6 pb-10 text-xs text-ink-muted sm:px-8">
        {/* Open-Meteo is CC BY 4.0. The attribution is a licence term, not
            a courtesy — using the data without it is a licence breach. */}
        Weather data by{" "}
        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
        >
          Open-Meteo.com
        </a>
      </footer>
    </div>
  );
}
