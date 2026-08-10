import { conditionFromWeatherCode } from "./weatherCondition";

/**
 * This is the payoff for keeping the mapping pure: the whole WMO table is
 * covered without rendering a component, mocking `fetch`, or waiting on a
 * network round-trip.
 */
describe("conditionFromWeatherCode", () => {
  it.each([
    [0, "clear"],
    [1, "clear"],
    [2, "partly-cloudy"],
    [3, "overcast"],
    [45, "fog"],
    [48, "fog"],
    [53, "drizzle"],
    [57, "drizzle"],
    [61, "rain"],
    [67, "rain"],
    [71, "snow"],
    [77, "snow"],
    [81, "rain"],
    [86, "snow"],
    [95, "thunderstorm"],
    [99, "thunderstorm"],
  ])("maps WMO code %i to %s", (code, expected) => {
    expect(conditionFromWeatherCode(code)).toBe(expected);
  });

  it("falls back to overcast for codes outside the table", () => {
    expect(conditionFromWeatherCode(42)).toBe("overcast");
  });
});
