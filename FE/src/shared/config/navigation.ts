/**
 * Paths and labels for every page in the site.
 *
 * WHY THIS IS IN `shared` AND NOT NEXT TO THE ROUTER
 *
 * The old `src/routes.ts` held path + label + page component in one array.
 * Under FSD that array cannot exist: it imports pages, so it belongs to the
 * `app` layer — but the header widget needs the labels, and a widget may only
 * import from layers *strictly below* it. Widget importing app is exactly the
 * dependency inversion FSD exists to prevent.
 *
 * So the array splits along the line that was always there:
 *
 *   - path + label  -> pure data, no imports at all  -> `shared/config` (here)
 *   - path -> component mapping -> knows about pages -> `app/routes`
 *
 * Both the header and the router read the list below, so there is still one
 * place to add a page. `shared` can hold this precisely because it is inert
 * data with no business logic and no dependencies.
 */

/**
 * `as const` is doing real work: it turns the values into literal types
 * instead of plain `string`, which is what makes `RoutePath` a closed union
 * and lets `app/routes` fail to compile when a page is missing.
 */
export const ROUTE_PATH = {
  profile: "/",
  projects: "/projects",
  experience: "/experience",
  contact: "/contact",
} as const;

export type RoutePath = (typeof ROUTE_PATH)[keyof typeof ROUTE_PATH];

export const HOME_PATH = ROUTE_PATH.profile;

export type NavItem = {
  path: RoutePath;
  label: string;
};

export const navigationItems: NavItem[] = [
  { path: ROUTE_PATH.profile, label: "Profile" },
  { path: ROUTE_PATH.projects, label: "Projects" },
  { path: ROUTE_PATH.experience, label: "Experience" },
  { path: ROUTE_PATH.contact, label: "Contact" },
];
