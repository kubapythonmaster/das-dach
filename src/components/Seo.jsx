import { Helmet } from "react-helmet-async";
import { absUrl, site } from "../config";

export default function Seo({ title, description, path = "/", jsonLd, noindex = false }) {
  const full = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const url = absUrl(path);
  const image = absUrl("/og.jpg");
  const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <>
      <Helmet>
        <title>{full}</title>
        <meta name="description" content={description} />
        {noindex ? (
          <meta name="robots" content="noindex, follow" />
        ) : (
          <meta name="robots" content="index, follow, max-image-preview:large" />
        )}
        <meta name="author" content={site.name} />
        <meta name="geo.region" content="PL-12" />
        <meta name="geo.placename" content="Kraków" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content={site.name} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={full} />
        <meta property="og:description" content={description} />
        {site.url && <link rel="canonical" href={url} />}
        {site.url && <meta property="og:url" content={url} />}
        {site.url && <meta property="og:image" content={image} />}
        {site.url && <meta property="og:image:width" content="1200" />}
        {site.url && <meta property="og:image:height" content="630" />}
        {site.url && <meta property="og:image:alt" content="Realizacja dachu DAS DACH — pokrycia i blacharstwo" />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={full} />
        <meta name="twitter:description" content={description} />
        {site.url && <meta name="twitter:image" content={image} />}
        {site.url && <link rel="alternate" hrefLang="pl" href={url} />}
      </Helmet>
      {blocks.map((entry, index) => (
        <script
          key={`${Array.isArray(entry["@type"]) ? entry["@type"].join("-") : entry["@type"]}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
}
