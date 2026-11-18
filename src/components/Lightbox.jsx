import { useEffect, useRef } from "react";
import Photo from "./Photo";

export default function Lightbox({ photos, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const opened = useRef(false);

  useEffect(() => {
    if (index == null) {
      opened.current = false;
      return undefined;
    }
    if (!opened.current) closeRef.current?.focus();
    opened.current = true;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("lock");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("lock");
    };
  }, [index, onClose, onIndex, photos.length]);

  if (index == null) return null;
  const photo = photos[index];

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia">
      <div className="lb-top">
        <p>
          {index + 1} / {photos.length}
        </p>
        <button ref={closeRef} type="button" className="lb-close" onClick={onClose}>
          Zamknij
        </button>
      </div>
      <figure className="lb-figure">
        <Photo photo={photo} priority alt={photo.alt} />
        <figcaption>{photo.caption}</figcaption>
      </figure>
      <div className="lb-nav">
        <button type="button" onClick={() => onIndex((index - 1 + photos.length) % photos.length)}>
          Poprzednie
        </button>
        <button type="button" onClick={() => onIndex((index + 1) % photos.length)}>
          Następne
        </button>
      </div>
    </div>
  );
}
