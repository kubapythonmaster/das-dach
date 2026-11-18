import Seo from "../components/Seo";
import { homeHash, site } from "../config";

export default function Privacy() {
  return (
    <article className="page">
      <Seo
        title="Polityka prywatności | DAS DACH"
        description="Polityka prywatności strony DAS DACH. Kontakt telefoniczny i przez Facebooka. Strona nie prowadzi kont, newslettera ani analityki."
        path="/polityka-prywatnosci"
      />
      <div className="wrap prose privacy">
        <p className="kicker">Dokument</p>
        <h1>Polityka prywatności</h1>
        <p>Obowiązuje od 18 listopada 2026 r.</p>
        <h2>Kto prowadzi stronę</h2>
        <p>
          Stronę prowadzi DAS DACH — pokrycia dachowe, blacharstwo, ciesielstwo i budownictwo, Sadki / Śmielin. Kontakt: telefon{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
        <h2>Czego tu nie ma</h2>
        <p>
          Nie zakładamy kont, nie prowadzimy newslettera i nie podpinamy analityki ani reklam. Strona nie zapisuje ciasteczek śledzących. Nie sprzedajemy danych.
        </p>
        <h2>Telefon i Facebook</h2>
        <p>
          Numer {site.phone} otwiera połączenie w Twoim telefonie. Link do Facebooka prowadzi na profil{" "}
          <a href={site.facebook} target="_blank" rel="noreferrer">
            DAS DACH
          </a>
          . To osobny serwis, ze swoją polityką.
        </p>
        <h2>Formularz kontaktu</h2>
        <p>
          Formularz w sekcji <a href={homeHash("kontakt")}>kontaktu</a> niczego nie wysyła na serwer. Składa tekst do SMS-a albo na Facebooka.
        </p>
        <h2>Logi techniczne</h2>
        <p>
          Serwer hostingu może zapisać techniczny log połączenia: adres IP, datę, typ przeglądarki. Log służy do działania i bezpieczeństwa, nie do profilowania.
        </p>
      </div>
    </article>
  );
}
