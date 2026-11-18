import { useEffect, useRef, useState } from "react";
import Photo from "./Photo";

export default function WorkSlider({ photos, onOpen }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [progress, setProgress] = useState(0);

  function sync() {
    const el = trackRef.current;
    if (!el) return;
    const max = Math.max(el.scrollWidth - el.clientWidth, 1);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
    setProgress(Math.min(1, el.scrollLeft / max));
  }

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return undefined;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [photos]);

  function move(dir) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".work-card");
    const step = card ? card.getBoundingClientRect().width + 16 : Math.min(el.clientWidth * 0.85, 420);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="work-slider">
      <div className="work-toolbar">
        <p className="work-hint">Przesuń w bok · kliknij zdjęcie</p>
        <div className="work-nav">
          <button type="button" className="work-btn" onClick={() => move(-1)} disabled={!canPrev} aria-label="Poprzednie">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="work-btn" onClick={() => move(1)} disabled={!canNext} aria-label="Następne">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div className="work-track" ref={trackRef}>
        {photos.map((photo, index) => (
          <figure key={photo.name} className="work-card">
            <button type="button" className="shot" onClick={() => onOpen(index)} aria-label={`Powiększ: ${photo.caption}`}>
              <Photo photo={photo} sizes="(max-width: 720px) 85vw, 420px" />
              <span className="work-index">{String(index + 1).padStart(2, "0")}</span>
            </button>
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="work-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${0.18 + progress * 0.82})` }} />
      </div>
    </div>
  );
}
