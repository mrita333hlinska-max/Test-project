import { Route, Routes } from "react-router";
import { RootLayout } from "./components/RootLayout";
import NotFoundPage from "./pages/not-found/NotFoundPage";
import { appRoutes } from "./routes";

/**
 * App owns the route table but not the router.
 *
 * `<BrowserRouter>` lives in main.tsx, because it is the piece that touches
 * the real browser URL. Keeping it out of here means a test can wrap App in
 * `<MemoryRouter initialEntries={["/projects"]}>` and assert on any page
 * without navigating anything for real — the same split as the backend's
 * app.ts (defines the app) versus index.ts (binds it to a port).
 */
export default function App() {
  return (
    <Routes>
      {/* A pathless parent route: it renders the layout, and its children
          render into the layout's <Outlet />. */}
      <Route element={<RootLayout />}>
        {appRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
