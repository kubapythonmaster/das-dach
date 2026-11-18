export default function Photo({ photo, priority = false, sizes, className, alt }) {
  if (!photo) return null;
  const srcSet = photo.w > 1000 ? `${photo.mid} 1000w, ${photo.src} ${photo.w}w` : undefined;
  return (
    <img
      className={className}
      src={photo.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
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
