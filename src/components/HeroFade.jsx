import { useEffect, useState } from "react";
import Photo from "./Photo";

const DELAY = 5200;

export default function HeroFade({ slides }) {
  const [index, setIndex] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduce) return undefined;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, DELAY);
    return () => window.clearInterval(timer);
  }, [reduce, slides.length]);

  return (
    <div className="hero-bg" aria-hidden="true">
      {slides.map((photo, itemIndex) => {
        const near = Math.abs(itemIndex - index) <= 1 || (index === 0 && itemIndex === slides.length - 1);
        if (!near && itemIndex !== 0) {
          return <div key={photo.name} className="hero-slide" />;
        }
        return (
          <div key={photo.name} className={itemIndex === index ? "hero-slide is-active" : "hero-slide"}>
            <Photo photo={photo} priority={itemIndex === 0} quality="high" sizes="100vw" />
          </div>
        );
      })}
      <div className="hero-shade" />
    </div>
  );
}
