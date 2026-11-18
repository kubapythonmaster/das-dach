import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { routerBasename } from "./config";
import { paths } from "./data";

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter basename={routerBasename || undefined} location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );
  return { html, helmet: helmetContext.helmet };
}

export { paths };
