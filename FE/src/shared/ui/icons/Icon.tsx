import type { ReactNode } from "react";

/**
 * Shared chrome for every icon in the set: one grid, one stroke weight, one
 * set of caps and joins.
 *
 * This wrapper is the reason splitting the icons into separate files is safe.
 * Without it, twelve files would each carry their own copy of `viewBox`,
 * `stroke-width` and `stroke-linecap`, and within a month one of them would
 * drift and render visibly heavier than its neighbours.
 *
 * `stroke="currentColor"` makes an icon inherit the colour of the text around
 * it, so no icon needs a colour prop.
 */
export type IconProps = {
  className?: string;
};

type IconWrapperProps = IconProps & {
  children: ReactNode;
};

export function Icon({ className = "size-5", children }: IconWrapperProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      // An icon is decoration. The accessible name belongs on the button or
      // the label that contains it, otherwise a screen reader announces the
      // picture instead of the action.
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}
