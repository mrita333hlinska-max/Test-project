import { navigationItems } from "@/shared/config";
import { buildBreadcrumbs } from "./buildBreadcrumbs";

describe("buildBreadcrumbs", () => {
  it("returns just the home crumb on the home page", () => {
    expect(buildBreadcrumbs("/", navigationItems)).toEqual([
      { label: "Profile", path: "/" },
    ]);
  });

  it("appends the current page after home", () => {
    expect(buildBreadcrumbs("/projects", navigationItems)).toEqual([
      { label: "Profile", path: "/" },
      { label: "Projects", path: "/projects" },
    ]);
  });

  it("ignores a trailing slash", () => {
    expect(buildBreadcrumbs("/contact/", navigationItems)).toHaveLength(2);
  });

  it("humanises a segment that has no route registered", () => {
    const trail = buildBreadcrumbs("/projects/weather-badge", navigationItems);

    expect(trail.at(-1)).toEqual({
      label: "Weather badge",
      path: "/projects/weather-badge",
    });
  });
});
