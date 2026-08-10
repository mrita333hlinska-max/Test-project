import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { App } from "./App";

/**
 * The header fetches live weather on mount. A unit test must never touch the
 * network: it makes the suite slow, and it makes it fail on a train.
 *
 * Stubbing `fetch` rather than mocking the whole weather module keeps the real
 * parsing and mapping code under test — the seam is the network, not our code.
 */
beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        current: { temperature_2m: 12.4, weather_code: 3, is_day: 1 },
      }),
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe("App routing", () => {
  it("renders the profile page at /", () => {
    renderAt("/");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Marharyta");
  });

  it("renders a placeholder page for a registered route", () => {
    renderAt("/projects");

    expect(screen.getByRole("heading", { level: 1, name: "Projects" })).toBeInTheDocument();
  });

  it("renders the not-found page for an unknown route", () => {
    renderAt("/nope");

    expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
  });

  it("shows the breadcrumb trail for the current page", () => {
    renderAt("/contact");

    const breadcrumbs = screen.getByRole("navigation", { name: "Breadcrumb" });

    expect(breadcrumbs).toHaveTextContent("Profile");
    expect(breadcrumbs).toHaveTextContent("Contact");
  });
});
