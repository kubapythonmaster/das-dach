import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { assetUrl, homeHash, site } from "../config";

const links = [
  { id: "o-firmie", label: "O firmie" },
  { id: "uslugi", label: "Usługi" },
  { id: "realizacje", label: "Realizacje" },
  { id: "kontakt", label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const firstRef = useRef(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname, hash]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (open) firstRef.current?.focus();
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const current = (id) => pathname === "/" && hash === `#${id}`;

  return (
    <header className="header">
      <div className="wrap header-bar">
        <Link to="/" className="logo">
          <img className="logo-img" src={assetUrl("logo.png")} alt="" width="44" height="44" />
          <span>
            <strong>DAS DACH</strong>
            <small>dachy · blacha · ciesielstwo</small>
          </span>
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-lines" aria-hidden="true" />
          <span className="sr">{open ? "Zamknij menu" : "Otwórz menu"}</span>
        </button>
        <nav id="menu" className={open ? "nav open" : "nav"} aria-label="Główne">
          {links.map((link, index) => (
            <a
              key={link.id}
              ref={index === 0 ? firstRef : undefined}
              href={homeHash(link.id)}
              aria-current={current(link.id) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a className="nav-phone" href={site.phoneHref}>
            {site.phone}
          </a>
          <a className="nav-cta" href={site.phoneHref}>
            Zadzwoń
          </a>
        </nav>
      </div>
    </header>
  );
}
