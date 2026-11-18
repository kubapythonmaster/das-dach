import Photo from "./Photo";

export default function HeroFade({ slides }) {
  const photo = slides[0];
  if (!photo) return null;

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-slide is-active">
        <Photo photo={photo} priority sizes="100vw" />
      </div>
      <div className="hero-shade" />
    </div>
  );
}
