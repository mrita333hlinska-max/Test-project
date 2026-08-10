/**
 * Public API of the `header` widget.
 *
 * Only `Header` leaves the slice. `Breadcrumbs`, `NavDrawer` and
 * `buildBreadcrumbs` are internals — nothing outside is allowed to reach past
 * this file and import them directly, which is what keeps the widget free to
 * be rearranged without breaking its callers.
 */
export { Header } from "./ui/Header";
