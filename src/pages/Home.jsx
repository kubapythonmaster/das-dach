import { useState } from "react";
import BandCta from "../components/BandCta";
import HeroFade from "../components/HeroFade";
import Lightbox from "../components/Lightbox";
import Photo from "../components/Photo";
import Seo from "../components/Seo";
import WorkSlider from "../components/WorkSlider";
import { site } from "../config";
import { businessLd, faqs, faqLd, gallery, photos, services, websiteLd } from "../data";

const heroSlides = [photos.domGotowy, photos.taras, photos.kominCegla];

export default function Home() {
  const [open, setOpen] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0].nav);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);

  function submit(event) {
    event.preventDefault();
    setCopied(false);
    if (!name.trim() || !message.trim()) {
      setError("Wpisz imię i kilka słów o dachu albo robocie.");
      setDraft("");
      return;
    }
    const text = [
      `Dzień dobry, tu ${name.trim()}.`,
      `Chodzi o: ${service}.`,
      message.trim(),
      phone.trim() ? `Mój numer: ${phone.trim()}.` : "",
    ]
      .filter(Boolean)
      .join(" ");
    setError("");
    setDraft(text);
    if (window.matchMedia("(pointer: coarse)").matches) {
      window.location.href = `${site.sms}?&body=${encodeURIComponent(text)}`;
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
    } catch {
      setCopied(false);
      setError("Nie udało się skopiować. Zaznacz tekst poniżej i skopiuj ręcznie.");
    }
  }

  return (
    <>
      <Seo
        title="DAS DACH | Pokrycia dachowe, blacharstwo i ciesielstwo — Sadki"
        description="Profesjonalne wykonawstwo pokryć dachowych, blacharstwo, ciesielstwo i budownictwo. Sadki / Śmielin. Tel. 451 610 110."
        path="/"
        jsonLd={[businessLd(), websiteLd(), faqLd(faqs)]}
      />

      <section className="hero">
        <HeroFade slides={heroSlides} />
        <div className="wrap hero-copy">
          <p className="kicker">Śmielin · Sadki · gwarancja jakości</p>
          <h1>
            DAS DACH
            <span>Pokrycia. Blacha. Budowa.</span>
          </h1>
          <p className="lead">
            Profesjonalne wykonawstwo pokryć dachowych, blacharstwo, ciesielstwo i budownictwo.
          </p>
          <div className="actions">
            <a className="btn" href={site.phoneHref}>
              Zadzwoń: {site.phone}
            </a>
            <a className="btn btn-ghost" href={site.facebook} target="_blank" rel="noreferrer">
              Facebook DAS DACH
            </a>
          </div>
        </div>
        <a className="scroll-hint" href="#o-firmie" aria-label="Przewiń w dół">
          <span className="scroll-mouse" aria-hidden="true">
            <span className="scroll-wheel" />
          </span>
        </a>
      </section>

      <section className="section about" id="o-firmie" aria-labelledby="o-firmie-title">
        <div className="wrap about-split">
          <figure className="about-media">
            <Photo photo={photos.kominRabek} sizes="(max-width: 900px) 100vw, 48vw" />
            <figcaption>Obróbka komina na rąbek — detal, od którego zależy szczelność</figcaption>
          </figure>
          <div className="about-copy">
            <p className="kicker">O firmie</p>
            <h2 id="o-firmie-title">Dążymy do perfekcji na każdym dachu.</h2>
            <p>
              DAS DACH to firma dekarska i budowlana ze Śmielina. Od skomplikowanych inwestycji po mniejsze zlecenia — pokrycia, blacharstwo, ciesielstwo i budowa domów.
            </p>
            <p>
              Pracujemy pod konkretny budynek. Pokazujemy realizacje, mówimy wprost o zakresie. Jesteśmy w Ogólnopolskim Cechu Dekarzy, Blacharzy i Cieśli oraz w Polskim Stowarzyszeniu Dekarzy.
            </p>
            <ul className="about-points">
              <li>
                <strong>Zakres</strong>
                <span>Pokrycia · blacharstwo · ciesielstwo · budowa</span>
              </li>
              <li>
                <strong>Baza</strong>
                <span>Sadki · Śmielin · kujawsko-pomorskie</span>
              </li>
              <li>
                <strong>Kontakt</strong>
                <span>{site.owner} · {site.phone}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section band" id="uslugi" aria-labelledby="uslugi-title">
        <div className="wrap">
          <div className="section-head center-head">
            <p className="kicker">Usługi</p>
            <h2 id="uslugi-title">Kategorie robót</h2>
            <p>Wybierz zakres — od pokrycia i blachy po więźbę, budowę i naprawy.</p>
          </div>
          <div className="svc-cats">
            {services.map((item, index) => (
              <article key={item.slug} className="svc-cat" id={item.slug}>
                <div className="svc-cat-media">
                  <Photo photo={item.photo} sizes="(max-width: 700px) 100vw, 360px" />
                  <span className="svc-cat-n">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="svc-cat-copy">
                  <h3>{item.nav}</h3>
                  <p>{item.summary}</p>
                  <ul className="svc-cat-points">
                    {item.blocks
                      .filter((block) => block.type === "ul")
                      .flatMap((block) => block.items)
                      .slice(0, 3)
                      .map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                  </ul>
                  <a className="svc-call" href={site.phoneHref}>
                    Zapytaj o {item.nav.toLowerCase()}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section partners" id="wspolpraca" aria-labelledby="partners-title">
        <div className="wrap">
          <div className="partners-intro">
            <p className="kicker">Zaufanie</p>
            <h2 id="partners-title">Współpracujemy solidnie</h2>
            <p>Materiały i przynależność branżowa — jakość, nie hasła.</p>
          </div>
          <ul className="partner-rail">
            <li>
              <span className="partner-mark" aria-hidden="true">
                <svg viewBox="0 0 48 32" fill="none">
                  <path d="M4 22 L24 6 L44 22" stroke="currentColor" strokeWidth="2.2" />
                  <path d="M10 22 V28 H38 V22" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </span>
              <div>
                <p className="partner-label">Producent</p>
                <strong>BudMat</strong>
                <span>Blachodachówka i pokrycia — stała współpraca przy dachach klientów.</span>
              </div>
            </li>
            <li>
              <span className="partner-mark" aria-hidden="true">
                <svg viewBox="0 0 48 32" fill="none">
                  <circle cx="24" cy="16" r="11" stroke="currentColor" strokeWidth="2.2" />
                  <path d="M18 17 L22 21 L31 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="partner-label">Stowarzyszenie</p>
                <strong>PSD</strong>
                <span>Polskie Stowarzyszenie Dekarzy — oddział kujawsko-pomorski.</span>
              </div>
            </li>
            <li>
              <span className="partner-mark" aria-hidden="true">
                <svg viewBox="0 0 48 32" fill="none">
                  <path d="M8 24 L24 8 L40 24 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
                  <path d="M24 14 V24" stroke="currentColor" strokeWidth="2.2" />
                </svg>
              </span>
              <div>
                <p className="partner-label">Cech</p>
                <strong>WIECHA</strong>
                <span>Ogólnopolski Cech Dekarzy, Blacharzy i Cieśli.</span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className="section work-section" id="realizacje" aria-labelledby="realizacje-title">
        <div className="wrap">
          <div className="section-head work-head">
            <div>
              <p className="kicker">Realizacje</p>
              <h2 id="realizacje-title">Nasze realizacje</h2>
            </div>
            <p>Dachy, kominy i konstrukcje z ostatnich zleceń. Kliknij, żeby powiększyć.</p>
          </div>
        </div>
        <WorkSlider photos={gallery} onOpen={setOpen} />
      </section>

      <BandCta
        id="cta-kontakt"
        kicker="Gotowi do startu"
        title="Umów pomiar albo wycenę."
        text="Sadki / Śmielin i okolice. Napisz ze zdjęciem na Facebooku albo zadzwoń od razu."
        photo={photos.domGotowy}
        href={site.phoneHref}
        label={`Zadzwoń: ${site.phone}`}
        secondaryHref={site.facebook}
        secondaryLabel="Facebook"
      />

      <section className="section band" id="faq" aria-labelledby="faq-title">
        <div className="wrap faq-wrap">
          <div className="section-head center-head">
            <p className="kicker">Pytania</p>
            <h2 id="faq-title">Najczęstsze pytania</h2>
          </div>
          {faqs.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section contact" id="kontakt" aria-labelledby="kontakt-title">
        <div className="wrap contact-grid">
          <div className="contact-copy">
            <p className="kicker">Kontakt</p>
            <h2 id="kontakt-title">Zadzwoń.</h2>
            <a className="phone-xl" href={site.phoneHref}>
              {site.phone}
            </a>
            <p className="contact-lead">
              Napisz na Facebooku ze zdjęciem dachu albo projektu. Jak nie odbieramy — jesteśmy na budowie. Oddzwonimy.
            </p>
            <div className="contact-actions">
              <a className="btn" href={site.phoneHref}>
                Zadzwoń teraz
              </a>
              <a className="btn btn-ghost" href={site.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
            <p className="contact-note">Sadki · Śmielin · kujawsko-pomorskie</p>
          </div>
          <form className="form" onSubmit={submit} noValidate>
            <h3>Albo napisz tu</h3>
            <p className="quiet">Składamy tekst do SMS-a albo do skopiowania na Facebooka. Nic nie leci na serwer.</p>
            <label className="field">
              Imię
              <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
            </label>
            <label className="field">
              Telefon
              <input value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" />
            </label>
            <label className="field">
              Usługa
              <select value={service} onChange={(event) => setService(event.target.value)}>
                {services.map((item) => (
                  <option key={item.slug}>{item.nav}</option>
                ))}
                <option>Nie wiem — proszę doradzić</option>
              </select>
            </label>
            <label className="field">
              Co jest do zrobienia
              <textarea
                rows={4}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Np. wymiana pokrycia, komin na rąbek, więźba…"
              />
            </label>
            {error && <p className="form-error">{error}</p>}
            <button className="btn" type="submit">
              Złóż wiadomość
            </button>
            {draft && (
              <div className="draft" aria-live="polite">
                <p>{draft}</p>
                <div className="actions">
                  <button type="button" className="btn btn-ghost" onClick={copy}>
                    {copied ? "Skopiowane" : "Kopiuj treść"}
                  </button>
                  <a className="btn btn-ghost" href={`${site.sms}?&body=${encodeURIComponent(draft)}`}>
                    Otwórz SMS
                  </a>
                  <a className="btn btn-ghost" href={site.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </div>
              </div>
            )}
          </form>
        </div>
      </section>

      <Lightbox photos={gallery} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </>
  );
}
