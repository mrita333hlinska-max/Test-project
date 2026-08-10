import { useEffect, useState } from "react";
import type { Coordinates, CurrentWeather } from "./api";
import { fetchCurrentWeather } from "./api";

/**
 * A discriminated union, not `{ data, isLoading, error }`.
 *
 * With three independent fields the type permits nonsense — loading *and*
 * errored, or ready with no data — and every consumer has to defend against
 * combinations that can never happen. Here `status` is the discriminant, so
 * inside the `ready` branch TypeScript knows `weather` exists.
 */
export type WeatherState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; weather: CurrentWeather };

export function useWeather({ latitude, longitude }: Coordinates): WeatherState {
  const [state, setState] = useState<WeatherState>({ status: "loading" });

  useEffect(() => {
    // Every request gets a controller so the cleanup below can cancel it.
    // Without this, a request started by an unmounted component still resolves
    // and calls setState on nothing — and in StrictMode the effect runs twice,
    // so you would race two responses and keep whichever landed last.
    const controller = new AbortController();

    // Note there is no `setState({ status: "loading" })` here. The state
    // already starts as loading, and resetting it synchronously in an effect
    // body is a cascading render (eslint react-hooks/set-state-in-effect).
    // If the coordinates ever do change, keeping the previous reading on
    // screen until the new one lands beats flashing a skeleton at the user.
    fetchCurrentWeather({ latitude, longitude }, controller.signal)
      .then((weather) => setState({ status: "ready", weather }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return; // we cancelled it; not a failure
        console.error("Weather request failed", error);
        setState({ status: "error" });
      });

    return () => controller.abort();
    // Depend on the two numbers, not on a `coordinates` object: an object
    // literal is a new reference on every render, which would re-fire the
    // effect forever.
  }, [latitude, longitude]);

  return state;
}
