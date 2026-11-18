export default function Photo({ photo, priority = false, sizes, className, alt, quality = "auto" }) {
  if (!photo) return null;
  const high = quality === "high" || priority;
  const jpg = high ? photo.src : photo.mid || photo.src;
  const webp = high ? photo.webp || photo.midWebp : photo.midWebp || photo.webp;
  const srcSetJpg = photo.mid && photo.src ? `${photo.mid} 800w, ${photo.src} ${Math.max(photo.w, 1200)}w` : undefined;
  const srcSetWebp =
    photo.midWebp && photo.webp ? `${photo.midWebp} 800w, ${photo.webp} ${Math.max(photo.w, 1200)}w` : undefined;
  const resolvedSizes = sizes || "100vw";

  return (
    <picture>
      {webp && (
        <source
          type="image/webp"
          srcSet={high ? webp : srcSetWebp || webp}
          sizes={!high && srcSetWebp ? resolvedSizes : undefined}
        />
      )}
      <img
        className={className}
        src={jpg}
        srcSet={!high ? srcSetJpg : undefined}
        sizes={!high && srcSetJpg ? resolvedSizes : undefined}
        alt={alt || photo.alt}
        width={photo.w}
        height={photo.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        // React 18: lowercase attribute
        {...{ fetchpriority: priority ? "high" : "low" }}
        style={photo.focus ? { objectPosition: photo.focus } : undefined}
      />
    </picture>
  );
}
