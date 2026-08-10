/**
 * Public API of the `weather` feature.
 *
 * The header renders `<WeatherBadge />` and knows nothing else: not the hook,
 * not the Open-Meteo client, not the WMO code table. Swapping the provider
 * tomorrow touches only files inside this slice.
 *
 * Why `features` and not `widgets`: the header widget uses this, and a widget
 * may not import another widget — same layer. Anything the header composes
 * has to live strictly below it.
 */
export { WeatherBadge } from "./ui/WeatherBadge";
