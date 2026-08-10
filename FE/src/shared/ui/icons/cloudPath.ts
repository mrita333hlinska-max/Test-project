/**
 * The cloud silhouette shared by every overcast and precipitation icon.
 *
 * It lives in its own module rather than inside one of the icon components
 * for two reasons. Practically, `react-refresh/only-export-components` (which
 * this repo's eslint config enables) forbids exporting a plain value from a
 * file that also exports components. Structurally, a shape reused by six
 * icons belongs to none of them.
 */
export const CLOUD_PATH =
  "M6.8 17h10.7a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.4-1.6A4.6 4.6 0 0 0 6.8 17z";
