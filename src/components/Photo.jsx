export default function Photo({ photo, priority = false, sizes, className, alt, quality = "auto" }) {
  if (!photo) return null;
  const high = quality === "high" || priority;
  const hasMid = Boolean(photo.mid);
  const srcSet = !high && hasMid ? `${photo.mid} 900w, ${photo.src} ${Math.max(photo.w, 1200)}w` : undefined;
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes || "100vw" : undefined}
      alt={alt || photo.alt}
      width={photo.w}
      height={photo.h}
      loading={priority || high ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : "auto"}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
