export default function Photo({ photo, priority = false, sizes, className, alt }) {
  if (!photo) return null;
  const jpg = photo.mid || photo.src;
  const webp = photo.midWebp || photo.webp;
  const resolvedSizes = sizes || "100vw";

  return (
    <picture>
      {webp && <source type="image/webp" srcSet={webp} sizes={resolvedSizes} />}
      <img
        className={className}
        src={jpg}
        alt={alt || photo.alt}
        width={photo.w}
        height={photo.h}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...{ fetchpriority: priority ? "high" : "low" }}
        style={photo.focus ? { objectPosition: photo.focus } : undefined}
      />
    </picture>
  );
}
