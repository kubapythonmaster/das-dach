import { useState } from "react";
import HeroFade from "../components/HeroFade";
import Lightbox from "../components/Lightbox";
import Photo from "../components/Photo";
import Seo from "../components/Seo";
import WorkSlider from "../components/WorkSlider";
import { site } from "../config";
import { businessLd, faqs, faqLd, gallery, photos, services, websiteLd } from "../data";

const heroSlides = [
  photos.domGotowy,
  photos.blachodachowka,
  photos.kominRabek,
  photos.rabekPanel,
  photos.dachKominy,
  photos.taras,
];

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
            <h2 id="uslugi-title">Co robimy</h2>
            <p>Pokrycia, blacha, więźba i budowa — kliknij pozycję, żeby zobaczyć zakres.</p>
          </div>
          <div className="svc-list">
            {services.map((item, index) => (
              <details key={item.slug} className="svc-row" id={item.slug}>
                <summary>
                  <span className="svc-n">{String(index + 1).padStart(2, "0")}</span>
                  <span className="svc-main">
                    <span className="svc-name">{item.nav}</span>
                    <span className="svc-sum">{item.summary}</span>
                  </span>
                </summary>
                <div className="svc-body">
                  <div className="svc-body-text">
                    <p>{item.lead}</p>
                    {item.blocks.some((block) => block.type === "ul") && (
                      <ul className="ticks">
                        {item.blocks
                          .filter((block) => block.type === "ul")
                          .flatMap((block) => block.items)
                          .map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                      </ul>
                    )}
                    <a className="svc-call" href={site.phoneHref}>
                      Zadzwoń: {site.phone}
                    </a>
                  </div>
                  <figure className="svc-body-photo">
                    <Photo photo={item.photo} sizes="(max-width: 900px) 100vw, 280px" />
                  </figure>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="machine" id="blacharstwo-highlight" style={{ "--machine": `url(${photos.rabekPanel.src})` }} aria-labelledby="highlight-title">
        <div className="wrap machine-grid">
          <div className="machine-copy">
            <p className="kicker">Blacharstwo · rąbek · kominy</p>
            <h2 id="highlight-title">Obróbki, które zamykają dach.</h2>
            <p>
              Kominy na rąbek, rynny i detale przy ścianie. To tu wychodzi różnica między dachem „ładnym ze zdjęcia” a dachem, który nie przecieka po pierwszej zimie.
            </p>
            <a className="btn" href={site.phoneHref}>
              Zadzwoń: {site.phone}
            </a>
          </div>
          <ul className="spec">
            <li>
              <span>Pokrycia</span>
              <strong>blacha · rąbek · gont</strong>
            </li>
            <li>
              <span>Blacharstwo</span>
              <strong>kominy · rynny · obróbki</strong>
            </li>
            <li>
              <span>Ciesielstwo</span>
              <strong>więźba · deskowanie</strong>
            </li>
            <li>
              <span>Budowa</span>
              <strong>domy · garaże</strong>
            </li>
            <li>
              <span>Serwis</span>
              <strong>naprawy · hydroizolacja</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="section partners" id="wspolpraca" aria-labelledby="partners-title">
        <div className="wrap">
          <div className="section-head center-head">
            <p className="kicker">Zaufanie</p>
            <h2 id="partners-title">Współpracujemy solidnie</h2>
            <p>Materiały i przynależność branżowa — jakość, nie hasła.</p>
          </div>
          <ul className="partner-grid">
            <li>
              <strong>BudMat</strong>
              <span>Blachodachówka i pokrycia — stała współpraca przy dachach klientów.</span>
            </li>
            <li>
              <strong>PSD</strong>
              <span>Polskie Stowarzyszenie Dekarzy — oddział kujawsko-pomorski.</span>
            </li>
            <li>
              <strong>WIECHA</strong>
              <span>Ogólnopolski Cech Dekarzy, Blacharzy i Cieśli.</span>
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
