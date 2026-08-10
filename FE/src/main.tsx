import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import { App } from "@/app";

const rootElement = document.getElementById("root");

// The non-null assertion this replaces (`getElementById("root")!`) is a lie to
// the compiler: it silences the check without making the value any safer. If
// index.html ever loses the div, this says so instead of throwing
// "Cannot read properties of null" from somewhere inside React.
if (!rootElement) {
  throw new Error('index.html is missing <div id="root">');
}

// main.tsx sits outside the layer system on purpose — it is the Vite
// entrypoint, the same kind of file as index.html. Its only job is to bind
// the app to the real browser: the DOM node and the real URL.
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
