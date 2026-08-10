import type { AppRoute } from "../routes";
import { HOME_PATH } from "../routes";

export type Crumb = {
  label: string;
  path: string;
};

/**
 * Turn a pathname into a trail, using the route registry for labels.
 *
 * Pure and separate from the component that renders it, for the same reason
 * the WMO mapping is separate from the weather icon: URL edge cases (trailing
 * slash, an unknown segment, the home page itself) are cheap to test as data
 * and expensive to test through the DOM.
 */
export function buildBreadcrumbs(pathname: string, routes: AppRoute[]): Crumb[] {
  const home = routes.find((route) => route.path === HOME_PATH);
  const trail: Crumb[] = [{ label: home?.label ?? "Home", path: HOME_PATH }];

  const segments = pathname.split("/").filter(Boolean);
  let path = "";

  for (const segment of segments) {
    path += `/${segment}`;
    const known = routes.find((route) => route.path === path);
    trail.push({ label: known?.label ?? humanise(segment), path });
  }

  return trail;
}

/** `my-side-projects` -> `My side projects`, for URLs with no registry entry. */
function humanise(segment: string): string {
  const words = decodeURIComponent(segment).replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
