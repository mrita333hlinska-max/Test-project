/**
 * WMO 4677 weather interpretation codes.
 *
 * Open-Meteo returns the raw numeric code in `current.weather_code`. There are
 * roughly thirty of them, and no UI wants thirty icons — so the codes get
 * folded into eight conditions here, once, in a pure function.
 *
 * Pure means: no fetch, no React, no DOM. That is what makes it testable
 * without rendering anything, and it is why the mapping does not live inside
 * the component that draws the icon.
 *
 * Code table: https://open-meteo.com/en/docs
 */
export type WeatherCondition =
  | "clear"
  | "partly-cloudy"
  | "overcast"
  | "fog"
  | "drizzle"
  | "rain"
  | "snow"
  | "thunderstorm";

export function conditionFromWeatherCode(code: number): WeatherCondition {
  if (code <= 1) return "clear"; // 0 clear sky, 1 mainly clear
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "overcast";
  if (code === 45 || code === 48) return "fog";
  if (code >= 51 && code <= 57) return "drizzle"; // incl. freezing drizzle
  if (code >= 61 && code <= 67) return "rain"; // incl. freezing rain
  if (code >= 71 && code <= 77) return "snow"; // incl. snow grains
  if (code >= 80 && code <= 82) return "rain"; // rain showers
  if (code >= 85 && code <= 86) return "snow"; // snow showers
  if (code >= 95) return "thunderstorm";
  return "overcast"; // unknown code: degrade quietly, never crash the header
}

/** Human-readable label, used as the accessible name of the weather badge. */
export const CONDITION_LABEL: Record<WeatherCondition, string> = {
  clear: "Clear",
  "partly-cloudy": "Partly cloudy",
  overcast: "Overcast",
  fog: "Fog",
  drizzle: "Drizzle",
  rain: "Rain",
  snow: "Snow",
  thunderstorm: "Thunderstorm",
};
