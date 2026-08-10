import type { WeatherCondition } from "./weatherCondition";
import { conditionFromWeatherCode } from "./weatherCondition";

/**
 * Open-Meteo current-conditions client.
 * Docs: https://open-meteo.com/en/docs
 *
 * No API key, so nothing secret ever reaches the browser bundle. That is the
 * only reason this call is allowed to happen from the frontend at all — the
 * moment a provider needs a key, the call has to move behind our own backend.
 */

export type Coordinates = {
  latitude: number;
  longitude: number;
};

/** The shape the UI wants — deliberately not the shape the API returns. */
export type CurrentWeather = {
  temperatureCelsius: number;
  condition: WeatherCondition;
  isDay: boolean;
};

const ENDPOINT = "https://api.open-meteo.com/v1/forecast";

export async function fetchCurrentWeather(
  { latitude, longitude }: Coordinates,
  signal: AbortSignal,
): Promise<CurrentWeather> {
  const url = new URL(ENDPOINT);
  url.search = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: "temperature_2m,weather_code,is_day",
    // `auto` resolves the timezone from the coordinates, which is what makes
    // `is_day` correct rather than UTC-correct.
    timezone: "auto",
  }).toString();

  const response = await fetch(url, { signal });

  // fetch only rejects on a network failure. A 404 or a 500 is a *resolved*
  // promise with ok === false, so an unchecked fetch silently parses an error
  // page as if it were data.
  if (!response.ok) {
    throw new Error(`Open-Meteo responded with ${response.status}`);
  }

  return parseCurrentWeather(await response.json());
}

/**
 * Parse, don't validate: `response.json()` is `any`-shaped data from another
 * machine, and TypeScript cannot check it for us. Everything downstream is
 * allowed to trust `CurrentWeather` only because this function refused to
 * return anything else.
 */
function parseCurrentWeather(payload: unknown): CurrentWeather {
  if (!isRecord(payload) || !isRecord(payload.current)) {
    throw new Error("Open-Meteo payload has no `current` object");
  }

  const { temperature_2m: temperature, weather_code: code, is_day: isDay } = payload.current;

  if (typeof temperature !== "number" || typeof code !== "number" || typeof isDay !== "number") {
    throw new Error("Open-Meteo `current` is missing the fields we asked for");
  }

  return {
    temperatureCelsius: temperature,
    condition: conditionFromWeatherCode(code),
    isDay: isDay === 1,
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
