import { Outlet } from "react-router";
import { Header } from "@/widgets/header";

/**
 * The shell every page renders inside.
 *
 * FSD allows an app-wide layout on either the `app` or the `widgets` layer.
 * It sits here because it is bound to routing — `<Outlet />` only means
 * anything inside a `<Route>` — and routing is an app-layer concern. A widget
 * is supposed to be a block you could drop onto any page; this is the page
 * frame itself.
 *
 * Mounting the header here rather than inside each page is what lets it keep
 * its state, and its in-flight weather request, across navigation.
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
