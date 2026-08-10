import { useCallback, useRef, useState } from "react";
import { WeatherBadge } from "../features/weather/WeatherBadge";
import { Breadcrumbs } from "./Breadcrumbs";
import { MenuIcon } from "./icons";
import { NavDrawer } from "./NavDrawer";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Send focus back to the hamburger when the drawer closes. Otherwise focus
  // is left on a node that just became `inert` and the browser drops it to
  // the top of the document — the keyboard user loses their place.
  //
  // `useCallback` is not a micro-optimisation here: NavDrawer lists `onClose`
  // in an effect's dependencies, so a fresh function each render would re-run
  // that effect on every render.
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-canvas/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-3xl items-center gap-4 px-6 sm:px-8">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          className="-ml-2 shrink-0 rounded-full p-2 text-ink transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <MenuIcon />
        </button>

        {/* min-w-0 lets the breadcrumbs truncate instead of pushing the
            weather badge off the right edge on a narrow screen. */}
        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        <WeatherBadge />
      </div>

      <NavDrawer isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
}
