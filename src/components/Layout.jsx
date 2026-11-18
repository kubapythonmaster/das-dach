import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { site } from "../config";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <div className="site">
      <a className="skip" href="#tresc">
        Przejdź do treści
      </a>
      <Header />
      <main id="tresc">
        <Outlet />
      </main>
      <Footer />
      <a className="callbar" href={site.phoneHref}>
        <span>Zadzwoń</span>
        <strong>{site.phone}</strong>
      </a>
    </div>
  );
}
