import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { site } from "../config";

export default function NotFound() {
  return (
    <article className="page">
      <Seo
        title="Tej strony nie ma | DAS DACH"
        description="Adres nie pasuje do żadnej podstrony DAS DACH. Wróć do usług albo zadzwoń: 451 610 110."
        noindex
      />
      <div className="wrap narrow">
        <p className="kicker">404</p>
        <h1>Tej strony nie ma.</h1>
        <p className="lead">Adres się nie zgadza. Wróć na stronę główną albo zadzwoń.</p>
        <div className="actions">
          <Link className="btn" to="/">
            Strona główna
          </Link>
          <a className="btn btn-ghost" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </div>
    </article>
  );
}
