import type { ReactNode } from "react";

/**
 * Hand-rolled stroke icons on a 24x24 grid.
 *
 * They are plain SVG on purpose: an icon package would pull a runtime and a
 * second styling opinion into a project whose whole point is that Tailwind is
 * the only styling system. `stroke="currentColor"` means an icon inherits its
 * colour from the text around it, so it needs no colour prop.
 *
 * Every icon is `aria-hidden` — an icon is decoration. The accessible name
 * belongs on the button or the label that contains it, otherwise a screen
 * reader announces the picture instead of the action.
 */
export type IconProps = {
  className?: string;
};

function Icon({ className = "size-5", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

/** Shared cloud silhouette, reused by every overcast/precipitation icon. */
const CLOUD_PATH =
  "M6.8 17h10.7a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.4-1.6A4.6 4.6 0 0 0 6.8 17z";

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M9.5 5.5l6 6.5-6 6.5" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4a7.6 7.6 0 1 0 10.2 10.2z" />
    </Icon>
  );
}

export function PartlyCloudyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="8.5" cy="7.5" r="2.6" />
      <path d="M8.5 2.4v1.4M3.4 7.5h1.4M4.9 3.9l1 1M12.1 3.9l-1 1" />
      <path d={CLOUD_PATH} />
    </Icon>
  );
}

export function CloudIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
    </Icon>
  );
}

export function FogIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M5.5 20h6M14 20h4.5M8 22.5h9" />
    </Icon>
  );
}

export function DrizzleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9.5 19.5v1.3M13 19.5v1.3M16.5 19.5v1.3" />
    </Icon>
  );
}

export function RainIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9.2 19.3l-1 3M12.8 19.3l-1 3M16.4 19.3l-1 3" />
    </Icon>
  );
}

export function SnowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M9 19.4v2.8M7.8 20.1l2.4 1.4M10.2 20.1l-2.4 1.4M15 19.4v2.8M13.8 20.1l2.4 1.4M16.2 20.1l-2.4 1.4" />
    </Icon>
  );
}

export function ThunderstormIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d={CLOUD_PATH} />
      <path d="M13.2 18.6l-2.6 3.1h3l-2.2 2.2" />
    </Icon>
  );
}
