import type { Coordinates } from "../api/fetchCurrentWeather";

/**
 * The location the header reports the weather for.
 *
 * TODO(marharyta): replace with your own city.
 *
 * A constant rather than `navigator.geolocation`: a permission prompt the
 * second a stranger opens your portfolio is a bad first impression, and the
 * answer "deny" is a normal outcome you would then have to fall back from
 * anyway. Look coordinates up here: https://open-meteo.com/en/docs/geocoding-api
 */
export const HOME_LOCATION: Coordinates = {
  latitude: 50.4501,
  longitude: 30.5234,
};

export const HOME_LOCATION_LABEL = "Kyiv";
