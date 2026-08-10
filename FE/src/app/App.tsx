import { AppRoutes } from "./routes/routes";
import "./styles/index.css";

/**
 * App owns the route table but not the router.
 *
 * `<BrowserRouter>` lives in main.tsx, because it is the piece that touches
 * the real browser URL. Keeping it out of here means a test can wrap App in
 * `<MemoryRouter initialEntries={["/projects"]}>` and assert on any page
 * without navigating anything for real — the same split as the backend's
 * app.ts (defines the app) versus index.ts (binds it to a port).
 *
 * When this app grows providers — a query client, a theme toggle, an error
 * boundary — they wrap <AppRoutes /> here.
 */
export function App() {
  return <AppRoutes />;
}
