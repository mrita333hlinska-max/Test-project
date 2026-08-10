import { appRoutes } from "../routes";
import { buildBreadcrumbs } from "./buildBreadcrumbs";

describe("buildBreadcrumbs", () => {
  it("returns just the home crumb on the home page", () => {
    expect(buildBreadcrumbs("/", appRoutes)).toEqual([{ label: "Profile", path: "/" }]);
  });

  it("appends the current page after home", () => {
    expect(buildBreadcrumbs("/projects", appRoutes)).toEqual([
      { label: "Profile", path: "/" },
      { label: "Projects", path: "/projects" },
    ]);
  });

  it("ignores a trailing slash", () => {
    expect(buildBreadcrumbs("/contact/", appRoutes)).toHaveLength(2);
  });

  it("humanises a segment that has no route registered", () => {
    const trail = buildBreadcrumbs("/projects/weather-badge", appRoutes);

    expect(trail.at(-1)).toEqual({
      label: "Weather badge",
      path: "/projects/weather-badge",
    });
  });
});
