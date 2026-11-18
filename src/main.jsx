import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { routerBasename } from "./config";
import "@fontsource/oswald/latin-500.css";
import "@fontsource/oswald/latin-ext-500.css";
import "@fontsource/oswald/latin-600.css";
import "@fontsource/oswald/latin-ext-600.css";
import "@fontsource/oswald/latin-700.css";
import "@fontsource/oswald/latin-ext-700.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-ext-400.css";
import "@fontsource/figtree/latin-500.css";
import "@fontsource/figtree/latin-ext-500.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-ext-600.css";
import "@fontsource/figtree/latin-700.css";
import "@fontsource/figtree/latin-ext-700.css";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={routerBasename || undefined}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
