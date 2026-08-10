import type { ComponentType } from "react";
import type { IconProps } from "@/shared/ui";
import {
  CloudIcon,
  DrizzleIcon,
  FogIcon,
  MoonIcon,
  PartlyCloudyIcon,
  RainIcon,
  SnowIcon,
  SunIcon,
  ThunderstormIcon,
} from "@/shared/ui";
import { HOME_LOCATION, HOME_LOCATION_LABEL } from "../config/location";
import type { WeatherCondition } from "../lib/weatherCondition";
import { CONDITION_LABEL } from "../lib/weatherCondition";
import { useWeather } from "../model/useWeather";

const CONDITION_ICON: Record<WeatherCondition, ComponentType<IconProps>> = {
  clear: SunIcon,
  "partly-cloudy": PartlyCloudyIcon,
  overcast: CloudIcon,
  fog: FogIcon,
  drizzle: DrizzleIcon,
  rain: RainIcon,
  snow: SnowIcon,
  thunderstorm: ThunderstormIcon,
};

/**
 * Fixed width on every branch. A badge that is 0px wide while loading and
 * 84px wide afterwards shoves the breadcrumbs sideways the moment the request
 * lands — layout shift the user reads as the page being broken.
 */
const SHELL = "flex h-9 w-[5.25rem] items-center justify-end gap-1.5 text-sm";

export function WeatherBadge() {
  const state = useWeather(HOME_LOCATION);

  if (state.status === "loading") {
    return (
      <div className={SHELL} aria-hidden="true">
        <span className="size-5 animate-pulse rounded-full bg-line" />
        <span className="h-4 w-9 animate-pulse rounded bg-line" />
      </div>
    );
  }

  // Weather is decoration. If it fails, the header keeps its shape and says
  // nothing — a portfolio visitor should never be shown our error handling.
  if (state.status === "error") {
    return <div className={SHELL} aria-hidden="true" />;
  }

  const { condition, isDay, temperatureCelsius } = state.weather;
  const ConditionIcon = condition === "clear" && !isDay ? MoonIcon : CONDITION_ICON[condition];
  const degrees = Math.round(temperatureCelsius);

  return (
    <p className={SHELL} title={`${CONDITION_LABEL[condition]} in ${HOME_LOCATION_LABEL}`}>
      {/*
        The spoken version, and not an `aria-label` on the <p>: ARIA forbids
        naming role="paragraph", so the label would be silently dropped and a
        screen reader would announce a bare "25 °C" with no idea what it means.
        A visually-hidden span always works, on any element.
      */}
      <span className="sr-only">
        {`${HOME_LOCATION_LABEL}: ${CONDITION_LABEL[condition]}, ${degrees} degrees Celsius`}
      </span>
      <ConditionIcon className="size-5 text-accent" />
      <span aria-hidden="true" className="tabular-nums text-ink-muted">
        {degrees}&#8201;&deg;C
      </span>
    </p>
  );
}
