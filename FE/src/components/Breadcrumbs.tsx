import { Link, useLocation } from "react-router";
import { appRoutes } from "../routes";
import { buildBreadcrumbs } from "./buildBreadcrumbs";
import { ChevronRightIcon } from "./icons";

export function Breadcrumbs() {
  const { pathname } = useLocation();
  const trail = buildBreadcrumbs(pathname, appRoutes);

  return (
    // `aria-label` is what distinguishes this <nav> from the drawer's <nav>:
    // a screen reader lists landmarks by name, and two unnamed navs are
    // indistinguishable.
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-1 text-sm">
        {trail.map((crumb, index) => {
          const isCurrent = index === trail.length - 1;

          return (
            <li key={crumb.path} className="flex min-w-0 items-center gap-1">
              {index > 0 && (
                <ChevronRightIcon className="size-3.5 shrink-0 text-line" />
              )}
              {isCurrent ? (
                // The current page is not a link — clicking it would go
                // nowhere. `aria-current` is how assistive tech is told which
                // crumb you are standing on.
                <span aria-current="page" className="truncate font-medium text-ink">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="truncate text-ink-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
