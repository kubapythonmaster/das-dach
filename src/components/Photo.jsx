export default function Photo({ photo, priority = false, sizes, className, alt }) {
  if (!photo) return null;
  const hasMid = Boolean(photo.mid);
  const srcSet = hasMid ? `${photo.mid} 900w, ${photo.src} ${Math.max(photo.w, 1200)}w` : undefined;
  return (
    <img
      className={className}
      src={hasMid && !priority ? photo.mid : photo.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes || "100vw" : undefined}
      alt={alt || photo.alt}
      width={photo.w}
      height={photo.h}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchpriority={priority ? "high" : "auto"}
      style={photo.focus ? { objectPosition: photo.focus } : undefined}
    />
  );
}
