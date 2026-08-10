import type { NavItem } from "@/shared/config";
import { HOME_PATH } from "@/shared/config";

export type Crumb = {
  label: string;
  path: string;
};

/**
 * Turn a pathname into a trail, using the navigation config for labels.
 *
 * Lives in `lib` rather than `ui` because it is reusable logic internal to
 * this widget, with no JSX in it. Being pure is what lets the URL edge cases
 * (trailing slash, unknown segment, the home page itself) be tested as data
 * instead of through a rendered DOM.
 */
export function buildBreadcrumbs(pathname: string, items: NavItem[]): Crumb[] {
  const home = items.find((item) => item.path === HOME_PATH);
  const trail: Crumb[] = [{ label: home?.label ?? "Home", path: HOME_PATH }];

  const segments = pathname.split("/").filter(Boolean);
  let path = "";

  for (const segment of segments) {
    path += `/${segment}`;
    const known = items.find((item) => item.path === path);
    trail.push({ label: known?.label ?? humanise(segment), path });
  }

  return trail;
}

/** `my-side-projects` -> `My side projects`, for URLs with no config entry. */
function humanise(segment: string): string {
  const words = decodeURIComponent(segment).replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}
