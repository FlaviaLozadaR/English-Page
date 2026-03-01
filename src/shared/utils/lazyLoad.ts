import { lazy, ComponentType, LazyExoticComponent } from 'react';

/**
 * Retry logic for lazy-loaded components
 * Reintenta cargar componentes que fallan (útil cuando hay updates durante navegación)
 */
function retry<T extends ComponentType<any>>(
  fn: () => Promise<{ default: T }>,
  retriesLeft = 3,
  interval = 1000
): Promise<{ default: T }> {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        setTimeout(() => {
          if (retriesLeft === 1) {
            reject(error);
            return;
          }

          // Retry with exponential backoff
          retry(fn, retriesLeft - 1, interval * 2).then(resolve, reject);
        }, interval);
      });
  });
}

/**
 * Lazy load con retry automático
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(() => retry(componentImport));
}

/**
 * Preload de un componente lazy antes de que se necesite
 * Útil para prefetch de rutas
 */
export function preloadComponent<T extends ComponentType<any>>(
  lazyComponent: LazyExoticComponent<T>
): void {
  const component = lazyComponent as any;
  if (component._payload && component._payload._status === -1) {
    component._payload._result();
  }
}

/**
 * Named lazy imports for better debugging
 * Comentado temporalmente - usar imports directos en router
 */
// export const lazyLoadPages = {
//   Home: lazyWithRetry(() => import('@/pages/home')),
//   Grammar: lazyWithRetry(() => import('@/pages/Grammar.page')),
//   Reading: lazyWithRetry(() => import('@/pages/Reading.page')),
//   Vocabulary: lazyWithRetry(() => import('@/pages/Vocabulary.page')),
//   Practice: lazyWithRetry(() => import('@/pages/Practice.page')),
//   Quiz: lazyWithRetry(() => import('@/pages/Quiz.page')),
// };

/**
 * Prefetch de rutas al hacer hover sobre links
 */
export function prefetchRoute(componentImport: () => Promise<any>): void {
  componentImport().catch(() => {
    // Silently fail prefetch
  });
}

/**
 * Route prefetching on link hover
 * Hook para usar con react-router
 */
export function usePrefetchRoute() {
  const handleMouseEnter = (componentImport: () => Promise<any>) => {
    prefetchRoute(componentImport);
  };

  return { handleMouseEnter };
}
