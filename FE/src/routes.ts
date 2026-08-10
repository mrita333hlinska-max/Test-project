/**
 * The route registry — one source of truth for three consumers:
 *
 *   1. `<Routes>` in App.tsx        — what renders at each URL
 *   2. the nav drawer                — the links
 *   3. the breadcrumbs               — the human label for a path segment
 *
 * The alternative is a hardcoded list of <Route>s plus a hardcoded list of
 * <Link>s plus a hardcoded segment→label map. Three lists, and adding a page
 * means remembering all three. They drift within a week.
 *
 * `Component` rather than `element: <Page />` keeps this file plain data —
 * no JSX, so it stays a `.ts` and can be imported by tests without a DOM.
 */
import type { ComponentType } from "react";
import ContactPage from "./pages/contact/ContactPage";
import ExperiencePage from "./pages/experience/ExperiencePage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProjectsPage from "./pages/projects/ProjectsPage";

export type AppRoute = {
  path: string;
  label: string;
  Component: ComponentType;
};

export const HOME_PATH = "/";

export const appRoutes: AppRoute[] = [
  { path: HOME_PATH, label: "Profile", Component: ProfilePage },
  { path: "/projects", label: "Projects", Component: ProjectsPage },
  { path: "/experience", label: "Experience", Component: ExperiencePage },
  { path: "/contact", label: "Contact", Component: ContactPage },
];
