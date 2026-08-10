import type { ComponentType } from "react";
import { Route, Routes } from "react-router";
import { ContactPage } from "@/pages/contact";
import { ExperiencePage } from "@/pages/experience";
import { NotFoundPage } from "@/pages/not-found";
import { ProfilePage } from "@/pages/profile";
import { ProjectsPage } from "@/pages/projects";
import type { RoutePath } from "@/shared/config";
import { navigationItems, ROUTE_PATH } from "@/shared/config";
import { RootLayout } from "../layouts/RootLayout";

/**
 * The other half of the split described in `shared/config/navigation.ts`:
 * this file is the only one allowed to know which component renders where,
 * because it is the only one on a layer above `pages`.
 *
 * `Record<RoutePath, ...>` is the point of the exercise. `RoutePath` is a
 * closed union built from ROUTE_PATH, so adding a nav item without adding a
 * page here is a compile error, not a blank screen at runtime.
 */
const PAGE_BY_PATH: Record<RoutePath, ComponentType> = {
  [ROUTE_PATH.profile]: ProfilePage,
  [ROUTE_PATH.projects]: ProjectsPage,
  [ROUTE_PATH.experience]: ExperiencePage,
  [ROUTE_PATH.contact]: ContactPage,
};

export function AppRoutes() {
  return (
    <Routes>
      {/* A pathless parent route: it renders the layout, and its children
          render into the layout's <Outlet />. */}
      <Route element={<RootLayout />}>
        {navigationItems.map(({ path }) => {
          const Page = PAGE_BY_PATH[path];
          return <Route key={path} path={path} element={<Page />} />;
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
