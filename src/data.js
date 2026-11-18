import { absUrl, assetUrl, site } from "./config";

function shot(name, w, h, alt, caption, tags, focus = "center") {
  const mid = assetUrl(`photos/${name}-m.jpg`);
  const midWebp = assetUrl(`photos/${name}-m.webp`);
  return {
    name,
    src: mid,
    mid,
    webp: midWebp,
    midWebp,
    w,
    h,
    alt,
    caption,
    tags,
    focus,
  };
}

export const photos = {
  domGotowy: shot(
    "dom-gotowy",
    1024,
    768,
    "Dom z nowym antracytowym dachem z blachodachówki",
    "Gotowe pokrycie — czysta linia dachu i kominów.",
    ["pokrycia", "blacharstwo"],
    "center 40%"
  ),
  blachodachowka: shot(
    "dach-blachodachowka",
    768,
    1024,
    "Montaż blachodachówki na domu z rusztowaniem",
    "Blachodachówka w trakcie montażu. Rusztowanie i dokładne obróbki.",
    ["pokrycia"],
    "center 35%"
  ),
  kominRabek: shot(
    "komin-rabek",
    722,
    960,
    "Obróbka blacharska komina na rąbek stojący",
    "Komin na rąbek — szczelna obróbka blacharska.",
    ["blacharstwo", "kominy"],
    "center 30%"
  ),
  dachKominy: shot(
    "dach-kominy",
    720,
    960,
    "Dach z kominami w trakcie krycia blachą",
    "Krycie dachu i kominy. Membrana, łaty, blacha.",
    ["pokrycia", "blacharstwo"],
    "center 40%"
  ),
  rabekPole: shot(
    "rabek-pole",
    768,
    1024,
    "Dach na rąbek z widokiem na pola",
    "Nowy dach na rąbek. Prosta linia, trwałe pokrycie.",
    ["pokrycia", "rabek"],
    "center 45%"
  ),
  kominCegla: shot(
    "komin-cegla",
    1024,
    768,
    "Obróbka komina ceglanego przy dachówce",
    "Detal przy kominie — tu decyduje szczelność.",
    ["blacharstwo", "kominy"],
    "center"
  ),
  taras: shot(
    "taras-drewno",
    1024,
    768,
    "Drewniana konstrukcja tarasu z ozdobnymi słupami",
    "Ciesielstwo — taras i konstrukcja drewniana pod dach.",
    ["ciesielstwo"],
    "center 45%"
  ),
};

export const gallery = [
  photos.blachodachowka,
  photos.kominCegla,
  photos.rabekPole,
  photos.dachKominy,
  photos.taras,
];

export const services = [
  {
    slug: "pokrycia-dachowe",
    nav: "Pokrycia dachowe",
    summary: "Nowe dachy i wymiana pokryć. Blachodachówka, trapez, rąbek, gont.",
    lead: "Kryjemy dachy od więźby po gotowe pokrycie. Remontujemy stare dachy i wymieniamy pokrycia na nowe — pod konkretny budynek, nie pod katalogowy pakiet.",
    photo: photos.blachodachowka,
    blocks: [
      {
        type: "ul",
        items: [
          "Wymiana i montaż pokryć dachowych",
          "Blachodachówka i blacha trapezowa",
          "Panele na rąbek stojący",
          "Gonty bitumiczne i papa termozgrzewalna",
          "Deskowanie, foliowanie, papowanie",
          "Okna i wyłazy dachowe",
        ],
      },
    ],
  },
  {
    slug: "blacharstwo",
    nav: "Blacharstwo",
    summary: "Obróbki, kominy, orynnowanie. Detale, które trzymają szczelność.",
    lead: "Blacharstwo to nie dodatek — to miejsce, gdzie dach albo trzyma, albo przecieka. Robimy obróbki kominów, rynny i detale pod pokrycie.",
    photo: photos.kominRabek,
    blocks: [
      {
        type: "ul",
        items: [
          "Obróbki blacharskie kominów (w tym na rąbek)",
          "Montaż orynnowania",
          "Obróbki przyścienne i koszowe",
          "Parapety i elementy blaszane",
          "Naprawy przecieków przy kominach i przejściach",
        ],
      },
    ],
  },
  {
    slug: "ciesielstwo",
    nav: "Ciesielstwo",
    summary: "Więźba, deskowanie, konstrukcje drewniane pod dach i taras.",
    lead: "Stawiamy i naprawiamy więźby dachowe, deskujemy i przygotowujemy konstrukcję pod pokrycie. Robimy też elementy ciesielskie przy budynku — solidnie, pod pomiar.",
    photo: photos.taras,
    blocks: [
      {
        type: "ul",
        items: [
          "Montaż więźby dachowej",
          "Deskowanie dachu",
          "Naprawy i wzmocnienia konstrukcji",
          "Konstrukcje drewniane tarasów i zadaszeń",
          "Przygotowanie pod pokrycie i obróbki",
        ],
      },
    ],
  },
  {
    slug: "budownictwo",
    nav: "Budownictwo",
    summary: "Domy od podstaw, garaże, budynki gospodarcze — od fundamentów w górę.",
    lead: "Budujemy domy i obiekty gospodarcze. Od fundamentów, murów i stropów po kominy, izolacje i drenaże. Dach domykamy własną ekipą dekarską.",
    photo: photos.domGotowy,
    blocks: [
      {
        type: "ul",
        items: [
          "Fundamenty, mury, stropy",
          "Kominy ceglane i systemowe",
          "Izolacje, drenaże, ocieplenie fundamentów",
          "Garaże i budynki gospodarcze",
          "Mury oporowe",
        ],
      },
    ],
  },
  {
    slug: "naprawy-dachow",
    nav: "Naprawy dachów",
    summary: "Remonty, hydroizolacja, serwis kominów i pokryć.",
    lead: "Naprawiamy przecieki, wymieniamy zużyte fragmenty pokrycia i porządkujemy obróbki. Hydroizolacja i serwis — żeby dach znów był szczelny, nie „na chwilę”.",
    photo: photos.kominCegla,
    blocks: [
      {
        type: "ul",
        items: [
          "Naprawa dachów i kominów",
          "Uszczelnianie przecieków",
          "Hydroizolacja",
          "Wymiana uszkodzonych elementów pokrycia",
          "Przeglądy przed sezonem",
        ],
      },
    ],
  },
];

export const faqs = [
  {
    q: "Czym się zajmujecie?",
    a: "Pokrycia dachowe, blacharstwo, ciesielstwo i budownictwo. Od więźby i krycia dachu po obróbki kominów, rynny oraz budowę domów i garaży.",
  },
  {
    q: "Gdzie działacie?",
    a: "Baza to Sadki / Śmielin (kujawsko-pomorskie). Dojazd ustalamy pod konkretne zlecenie — napisz lub zadzwoń z lokalizacją.",
  },
  {
    q: "Czy robicie same obróbki blacharskie?",
    a: "Tak. Kominy na rąbek, orynnowanie, obróbki przy ścianach i koszach — osobno albo w pakiecie z pokryciem.",
  },
  {
    q: "Czy stawiacie więźbę?",
    a: "Tak. Montujemy więźbę, deskujemy, układamy membranę i dopiero potem kryjemy. Konstrukcja i pokrycie mogą iść w jednej ekipie.",
  },
  {
    q: "Jak zamówić wycenę?",
    a: "Najszybciej telefon 451 610 110. Możesz też napisać na Facebooku i wrzucić zdjęcie dachu albo projektu — od tego zaczynamy rozmowę.",
  },
  {
    q: "Czy jesteście w cechu dekarzy?",
    a: "Tak. Jesteśmy w Ogólnopolskim Cechu Dekarzy, Blacharzy i Cieśli (WIECHA) oraz w Polskim Stowarzyszeniu Dekarzy — oddział kujawsko-pomorski.",
  },
];

export const paths = ["/", "/polityka-prywatnosci"];

export function businessLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": site.url ? `${site.url}/#business` : undefined,
    name: site.name,
    description:
      "Profesjonalne wykonawstwo pokryć dachowych, blacharstwo, ciesielstwo i budownictwo. Sadki / Śmielin, kujawsko-pomorskie. Tel. 451 610 110.",
    telephone: "+48451610110",
    sameAs: [site.facebook],
    areaServed: [
      { "@type": "Place", name: "Sadki" },
      { "@type": "Place", name: "Śmielin" },
      { "@type": "AdministrativeArea", name: "województwo kujawsko-pomorskie" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sadki",
      addressRegion: "kujawsko-pomorskie",
      addressCountry: "PL",
    },
    priceRange: "$$",
    currenciesAccepted: "PLN",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Usługi DAS DACH",
      itemListElement: services.map((item) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.nav,
          description: item.lead,
        },
      })),
    },
  };
  if (site.url) {
    data.url = site.url;
    data.image = absUrl("/og.jpg");
    data.logo = absUrl("/logo.png");
  } else {
    delete data["@id"];
  }
  return data;
}

export function websiteLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    inLanguage: "pl-PL",
    description:
      "Pokrycia dachowe, blacharstwo, ciesielstwo i budownictwo — DAS DACH, Sadki. Tel. 451 610 110.",
  };
  if (site.url) {
    data.url = site.url;
    data.publisher = { "@id": `${site.url}/#business` };
  }
  return data;
}

export function faqLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
