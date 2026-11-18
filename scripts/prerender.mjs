import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

function loadSiteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, "");
  if (!existsSync(".env")) return "";
  for (const line of readFileSync(".env", "utf8").split(/\r?\n/)) {
    const match = line.match(/^VITE_SITE_URL=(.*)$/);
    if (match) return match[1].trim().replace(/^["']|["']$/g, "").replace(/\/$/, "");
  }
  return "";
}

const siteUrl = loadSiteUrl();
const basePath = (process.env.BASE_PATH || "/").replace(/\/$/, "");
const template = readFileSync("dist/index.html", "utf8");
const serverEntry = pathToFileURL(path.resolve("dist/server/entry-server.js")).href;
const { render, paths } = await import(serverEntry);

function routerPath(route) {
  if (!basePath) return route;
  if (route === "/") return `${basePath}/`;
  return `${basePath}${route}`;
}

function page(route) {
  const { html, helmet } = render(routerPath(route));
  const title = helmet?.title?.toString?.() || "";
  const meta = helmet?.meta?.toString?.() || "";
  const link = helmet?.link?.toString?.() || "";
  let out = template;
  if (title.includes("<title")) out = out.replace(/<title>[\s\S]*?<\/title>/i, title);
  if (meta.includes("description")) {
    out = out.replace(/<meta\s+name="description"[\s\S]*?>/i, "");
  }
  out = out.replace("<!--ssr-head-->", `${meta}\n${link}`);
  out = out.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  return out;
}

function writePage(route, file) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, page(route));
  console.log("page", route, "->", file);
}

for (const route of paths) {
  const file = route === "/" ? path.resolve("dist/index.html") : path.resolve("dist", `.${route}`, "index.html");
  writePage(route, file);
}

writePage("/nie-ma-takiej-strony", path.resolve("dist/404.html"));

const body = paths
  .map((route) => {
    const loc = route === "/" ? `${siteUrl}/` : `${siteUrl}${route}`;
    return `  <url><loc>${loc}</loc></url>`;
  })
  .join("\n");

if (siteUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  writeFileSync("dist/sitemap.xml", sitemap);
  writeFileSync("dist/robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
  console.log("sitemap", siteUrl);
} else {
  writeFileSync("dist/robots.txt", "User-agent: *\nAllow: /\n");
  console.log("brak VITE_SITE_URL — sitemap pominięta");
}
