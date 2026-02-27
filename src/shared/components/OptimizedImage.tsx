import { ImgHTMLAttributes, useState } from 'react';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  lowQualitySrc?: string; // Imagen de baja calidad para Progressive Loading
}

/**
 * Componente de imagen optimizada con lazy loading y progressive loading
 * Mejora el rendimiento y Core Web Vitals (LCP)
 */
export function OptimizedImage({
  src,
  alt,
  fallback = '/placeholder.png',
  lowQualitySrc,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(lowQualitySrc || src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    if (lowQualitySrc && imgSrc === lowQualitySrc) {
      // Cargar imagen de alta calidad después de que la de baja calidad se cargue
      setImgSrc(src);
    }
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      onLoad={handleLoad}
      onError={handleError}
      className={`transition-opacity duration-300 ${
        isLoading ? 'opacity-50' : 'opacity-100'
      } ${className}`}
      {...props}
    />
  );
}
