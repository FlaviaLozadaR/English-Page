import { useEffect, useState, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook para detectar cuando un elemento es visible en viewport
 * Útil para lazy loading, animaciones, infinite scroll, etc.
 * 
 * @param threshold - Porcentaje de visibilidad requerido (0-1)
 * @param rootMargin - Margen alrededor del viewport
 * @param root - Elemento contenedor (null = viewport)
 * @param freezeOnceVisible - Si true, deja de observar después de ser visible una vez
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0,
  rootMargin = '0px',
  root = null,
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [RefObject<T>, boolean, IntersectionObserverEntry | null] {
  const elementRef = useRef<T>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const frozen = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Si ya fue visible y está congelado, no hacer nada
    if (frozen.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setEntry(entry);
        setIsIntersecting(entry.isIntersecting);

        if (entry.isIntersecting && freezeOnceVisible) {
          frozen.current = true;
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, freezeOnceVisible]);

  return [elementRef, isIntersecting, entry];
}

/**
 * Hook simplificado para lazy loading
 */
export function useLazyLoad<T extends Element = HTMLElement>(
  options?: UseIntersectionObserverProps
) {
  const [ref, isVisible] = useIntersectionObserver<T>({
    threshold: 0.01,
    rootMargin: '50px',
    freezeOnceVisible: true,
    ...options,
  });

  return { ref, isVisible };
}

/**
 * Hook para animaciones al entrar en viewport
 */
export function useAnimateOnView<T extends Element = HTMLElement>(
  options?: UseIntersectionObserverProps
) {
  const [ref, isVisible, entry] = useIntersectionObserver<T>({
    threshold: 0.1,
    ...options,
  });

  return {
    ref,
    isVisible,
    intersectionRatio: entry?.intersectionRatio ?? 0,
  };
}

/**
 * Hook para infinite scroll
 */
export function useInfiniteScroll<T extends Element = HTMLElement>(
  callback: () => void,
  options?: UseIntersectionObserverProps
) {
  const [ref, isVisible] = useIntersectionObserver<T>({
    threshold: 1.0,
    rootMargin: '100px',
    ...options,
  });

  useEffect(() => {
    if (isVisible) {
      callback();
    }
  }, [isVisible, callback]);

  return ref;
}
