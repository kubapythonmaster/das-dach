import Photo from "./Photo";

export default function BandCta({
  id,
  kicker,
  title,
  text,
  photo,
  href,
  label,
  secondaryHref,
  secondaryLabel,
  align = "left",
}) {
  return (
    <section className={`band-cta band-cta--${align}`} id={id} aria-labelledby={id ? `${id}-title` : undefined}>
      <div className="band-cta-media" aria-hidden="true">
        <Photo photo={photo} sizes="100vw" />
        <div className="band-cta-shade" />
      </div>
      <div className="wrap band-cta-copy">
        {kicker && <p className="kicker">{kicker}</p>}
        <h2 id={id ? `${id}-title` : undefined}>{title}</h2>
        {text && <p>{text}</p>}
        <div className="actions">
          <a className="btn" href={href}>
            {label}
          </a>
          {secondaryHref && secondaryLabel && (
            <a className="btn btn-ghost" href={secondaryHref} target={secondaryHref.startsWith("http") ? "_blank" : undefined} rel={secondaryHref.startsWith("http") ? "noreferrer" : undefined}>
              {secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
