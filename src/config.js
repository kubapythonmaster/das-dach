/**
 * Po podpięciu domeny:
 * VITE_SITE_URL=https://twoja-domena.pl
 */
export const site = {
  name: "DAS DACH",
  url: (import.meta.env.VITE_SITE_URL || "").replace(/\/$/, ""),
  phone: "451 610 110",
  phoneHref: "tel:+48451610110",
  sms: "sms:+48451610110",
  facebook: "https://www.facebook.com/profile.php?id=61551009793413",
  city: "Sadki",
  region: "województwo kujawsko-pomorskie",
  place: "Śmielin / Sadki",
  owner: "Daniel Siembrzuch",
};

export const assetBase = import.meta.env.BASE_URL || "/";
export const routerBasename = assetBase.replace(/\/$/, "");

export function assetUrl(path = "") {
  const clean = String(path).replace(/^\//, "");
  return `${assetBase}${clean}`;
}

export function absUrl(path = "/") {
  if (!site.url) return path.startsWith("/") ? path : `/${path}`;
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${suffix}`;
}

export function homeHash(id) {
  return `${assetBase}#${id}`;
}
