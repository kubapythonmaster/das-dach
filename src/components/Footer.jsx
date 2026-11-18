import { Link } from "react-router-dom";
import { assetUrl, homeHash, site } from "../config";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div className="footer-brand-block">
          <p className="footer-brand">
            <img src={assetUrl("logo.png")} alt="" width="40" height="40" />
            <span>DAS DACH</span>
          </p>
          <p className="footer-tag">
            Profesjonalne wykonawstwo pokryć dachowych, blacharstwo, ciesielstwo i budownictwo. Sadki / Śmielin.
          </p>
          <a className="footer-phone" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
        <nav className="footer-nav" aria-label="Stopka">
          <div>
            <p className="footer-label">Na stronie</p>
            <ul>
              <li>
                <a href={homeHash("o-firmie")}>O firmie</a>
              </li>
              <li>
                <a href={homeHash("uslugi")}>Usługi</a>
              </li>
              <li>
                <a href={homeHash("realizacje")}>Realizacje</a>
              </li>
              <li>
                <a href={homeHash("kontakt")}>Kontakt</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-label">Kontakt</p>
            <ul>
              <li>
                <a href={site.phoneHref}>Zadzwoń</a>
              </li>
              <li>
                <a href={site.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
              <li>
                <Link to="/polityka-prywatnosci">Polityka prywatności</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} DAS DACH</p>
        <p className="footer-credit">
          Strona wykonana przez{" "}
          <a href="https://nocturagency.pl" target="_blank" rel="noreferrer">
            Noctura
          </a>
        </p>
      </div>
    </footer>
  );
}
