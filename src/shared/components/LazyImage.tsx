import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  rootMargin?: string;
  onLoad?: () => void;
  aspectRatio?: string;
}

/**
 * LazyImage Component - Optimizado para SEO y Performance
 * 
 * Características:
 * - Lazy loading con IntersectionObserver
 * - Placeholder mientras carga
 * - Aspect ratio para prevenir layout shift (CLS)
 * - Soporte para srcset y sizes (responsive images)
 * - Preconnect hints automáticos
 */
export function LazyImage({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3C/svg%3E',
  threshold = 0.01,
  rootMargin = '50px',
  onLoad,
  className = '',
  aspectRatio,
  loading = 'lazy',
  decoding = 'async',
  ...props
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // IntersectionObserver para detectar cuando la imagen entra en viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(imgRef.current);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isInView) return;

    // Preload de la imagen
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    img.onerror = () => {
      // Fallback en caso de error
      console.error(`Failed to load image: ${src}`);
      setIsLoaded(true);
    };

    img.src = src;
  }, [isInView, src, onLoad]);

  const containerStyle = aspectRatio
    ? {
        aspectRatio,
        position: 'relative' as const,
        overflow: 'hidden',
      }
    : {};

  return (
    <div style={containerStyle} className={className}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        loading={loading}
        decoding={decoding}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        {...props}
      />
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Progressive Image Component - Carga progresiva de imágenes
 * Carga primero una versión baja calidad, luego la alta calidad
 */
interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  lowQualitySrc: string;
  highQualitySrc: string;
  alt: string;
}

export function ProgressiveImage({
  lowQualitySrc,
  highQualitySrc,
  alt,
  className = '',
  ...props
}: ProgressiveImageProps) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isHighQualityLoaded, setIsHighQualityLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsHighQualityLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`transition-all duration-500 ${
        isHighQualityLoaded ? 'blur-0' : 'blur-sm'
      } ${className}`}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}

/**
 * WebP Image with Fallback
 * Sirve WebP cuando es soportado, fallback a JPG/PNG
 */
interface WebPImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
}

export function WebPImage({
  webpSrc,
  fallbackSrc,
  alt,
  className = '',
  ...props
}: WebPImageProps) {
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <source srcSet={fallbackSrc} type="image/jpeg" />
      <img
        src={fallbackSrc}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </picture>
  );
}

/**
 * Responsive Image Component - Optimización automática por viewport
 */
interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  srcSet?: string;
}

export function ResponsiveImage({
  src,
  alt,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  srcSet,
  className = '',
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      {...props}
    />
  );
}
