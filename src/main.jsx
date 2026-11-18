import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { routerBasename } from "./config";
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
