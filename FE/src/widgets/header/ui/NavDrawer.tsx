import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router";
import { HOME_PATH, navigationItems } from "@/shared/config";
import { CloseIcon } from "@/shared/ui";

type NavDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NavDrawer({ isOpen, onClose }: NavDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();

  // Escape closes it. Any overlay you can open with the keyboard but only
  // close with the mouse is a trap.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Move focus into the drawer on open. Without this the keyboard is still
  // back on the page behind, tabbing through content nobody can see.
  useEffect(() => {
    if (isOpen) closeButtonRef.current?.focus();
  }, [isOpen]);

  // Navigating away should close it — the route changed, the menu has done
  // its job.
  //
  // The ref guard matters: an effect also runs on mount, so closing
  // unconditionally would fire `onClose` on first paint, and `onClose` moves
  // focus to the hamburger. The whole page would load with focus already
  // yanked into the header.
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    onClose();
  }, [pathname, onClose]);

  // The panel stays mounted so it can slide both ways instead of vanishing.
  // `inert` is what makes that safe: while closed, its links are unfocusable
  // and invisible to screen readers, which `opacity-0` alone would not do.
  //
  // Portalled to <body> rather than rendered where it sits in the tree. The
  // header carries `backdrop-blur`, and any backdrop-filter makes an element
  // the containing block for its `position: fixed` descendants — so `inset-0`
  // would resolve to the 64px header box instead of the viewport, and the
  // overlay would darken only the header. A portal escapes that entirely.
  return createPortal(
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} inert={!isOpen}>
      <div
        className={`absolute inset-0 bg-ink/25 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-line bg-surface transition-transform duration-200 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-5">
          <span className="text-xs uppercase tracking-[0.18em] text-ink-muted">Menu</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-full p-2 text-ink-muted transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Main" className="p-3">
          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === HOME_PATH}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-2.5 text-[0.95rem] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                      isActive
                        ? "bg-accent-soft font-medium text-accent"
                        : "text-ink-muted hover:bg-accent-soft/60 hover:text-ink"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>,
    document.body,
  );
}
