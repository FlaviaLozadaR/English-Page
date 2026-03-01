/**
 * Performance Utilities - Optimización de rendimiento
 * Herramientas para mejorar Core Web Vitals y experiencia de usuario
 */

/**
 * Debounce - Retrasa la ejecución de una función
 * Útil para eventos que se disparan muchas veces (scroll, resize, input)
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function debounced(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Throttle - Limita la frecuencia de ejecución de una función
 * Garantiza que se ejecute máximo una vez cada X ms
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function throttled(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request Animation Frame Throttle
 * Optimiza eventos de scroll/resize usando requestAnimationFrame
 */
export function rafThrottle<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => void {
  let rafId: number | null = null;
  
  return function throttled(...args: Parameters<T>) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func(...args);
        rafId = null;
      });
    }
  };
}

/**
 * Preload de recursos críticos
 */
export function preloadResource(href: string, as: string, type?: string) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) link.type = type;
  document.head.appendChild(link);
}

/**
 * Prefetch de recursos que se usarán pronto
 */
export function prefetchResource(href: string) {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Preconnect a dominios externos
 */
export function preconnect(href: string, crossorigin = true) {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = href;
  if (crossorigin) link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
}

/**
 * DNS Prefetch para dominios externos
 */
export function dnsPrefetch(href: string) {
  const link = document.createElement('link');
  link.rel = 'dns-prefetch';
  link.href = href;
  document.head.appendChild(link);
}

/**
 * Lazy load de scripts externos
 */
export function loadScript(src: string, async = true, defer = false): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    
    document.body.appendChild(script);
  });
}

/**
 * Lazy load de CSS
 */
export function loadCSS(href: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load CSS: ${href}`));
    
    document.head.appendChild(link);
  });
}

/**
 * Detectar si el usuario tiene conexión lenta
 */
export function isSlowConnection(): boolean {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return false;
  
  // Slow 2G, 2G, 3G se consideran lentas
  const slowConnections = ['slow-2g', '2g', '3g'];
  return slowConnections.includes(connection.effectiveType);
}

/**
 * Detectar si el usuario tiene data saver activado
 */
export function isDataSaverEnabled(): boolean {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection?.saveData === true;
}

/**
 * Obtener tipo de conexión del usuario
 */
export function getConnectionType(): string {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  return connection?.effectiveType || 'unknown';
}

/**
 * Medir First Input Delay (FID)
 */
export function measureFID(callback: (value: number) => void) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        if (fidEntry.processingStart && fidEntry.startTime) {
          callback(fidEntry.processingStart - fidEntry.startTime);
        }
      }
    });
    
    observer.observe({ type: 'first-input', buffered: true });
  }
}

/**
 * Medir Cumulative Layout Shift (CLS)
 */
export function measureCLS(callback: (value: number) => void) {
  let clsValue = 0;
  
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShiftEntry = entry as any;
        if (!layoutShiftEntry.hadRecentInput) {
          clsValue += layoutShiftEntry.value;
        }
      }
      callback(clsValue);
    });
    
    observer.observe({ type: 'layout-shift', buffered: true });
  }
}

/**
 * Medir Largest Contentful Paint (LCP)
 */
export function measureLCP(callback: (value: number) => void) {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1] as any;
      callback(lastEntry.renderTime || lastEntry.loadTime);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
}

/**
 * Medir Time to First Byte (TTFB)
 */
export function measureTTFB(): number {
  const navigation = performance.getEntriesByType('navigation')[0] as any;
  return navigation?.responseStart - navigation?.requestStart || 0;
}

/**
 * Obtener todas las métricas de Web Vitals
 */
export interface WebVitalsMetrics {
  fid?: number;
  cls?: number;
  lcp?: number;
  ttfb: number;
  fcp?: number;
}

export function getWebVitals(): Promise<WebVitalsMetrics> {
  return new Promise((resolve) => {
    const metrics: WebVitalsMetrics = {
      ttfb: measureTTFB(),
    };
    
    let measurementsCompleted = 0;
    const totalMeasurements = 3;
    
    function checkCompletion() {
      measurementsCompleted++;
      if (measurementsCompleted >= totalMeasurements) {
        resolve(metrics);
      }
    }
    
    measureFID((value) => {
      metrics.fid = value;
      checkCompletion();
    });
    
    measureCLS((value) => {
      metrics.cls = value;
      checkCompletion();
    });
    
    measureLCP((value) => {
      metrics.lcp = value;
      checkCompletion();
    });
    
    // Timeout si las métricas no se completan en 10s
    setTimeout(() => resolve(metrics), 10000);
  });
}

/**
 * Optimizar imágenes según la conexión del usuario
 */
export function getOptimalImageQuality(): 'low' | 'medium' | 'high' {
  if (isDataSaverEnabled() || isSlowConnection()) {
    return 'low';
  }
  
  const connectionType = getConnectionType();
  if (connectionType === '4g') {
    return 'high';
  }
  
  return 'medium';
}

/**
 * Resource Hints Manager
 */
export class ResourceHintsManager {
  private static preloadedResources = new Set<string>();
  private static prefetchedResources = new Set<string>();
  
  static preload(href: string, as: string, type?: string) {
    if (!this.preloadedResources.has(href)) {
      preloadResource(href, as, type);
      this.preloadedResources.add(href);
    }
  }
  
  static prefetch(href: string) {
    if (!this.prefetchedResources.has(href)) {
      prefetchResource(href);
      this.prefetchedResources.add(href);
    }
  }
  
  static preloadFont(href: string) {
    this.preload(href, 'font', 'font/woff2');
  }
  
  static preloadImage(href: string) {
    this.preload(href, 'image');
  }
  
  static preloadStyle(href: string) {
    this.preload(href, 'style');
  }
  
  static preloadScript(href: string) {
    this.preload(href, 'script');
  }
}

/**
 * Idle Until Urgent Pattern
 * Ejecuta tareas cuando el navegador está idle
 */
export function idleUntilUrgent(callback: () => void, options?: IdleRequestOptions) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(callback, options);
  } else {
    // Fallback para navegadores que no soportan requestIdleCallback
    setTimeout(callback, 1);
  }
}

/**
 * Batch de operaciones del DOM
 * Agrupa múltiples lecturas/escrituras del DOM para evitar reflows
 */
export class DOMBatcher {
  private readQueue: Array<() => void> = [];
  private writeQueue: Array<() => void> = [];
  private scheduled = false;
  
  read(fn: () => void) {
    this.readQueue.push(fn);
    this.scheduleFlush();
  }
  
  write(fn: () => void) {
    this.writeQueue.push(fn);
    this.scheduleFlush();
  }
  
  private scheduleFlush() {
    if (!this.scheduled) {
      this.scheduled = true;
      requestAnimationFrame(() => this.flush());
    }
  }
  
  private flush() {
    // Ejecutar todas las lecturas primero
    this.readQueue.forEach(fn => fn());
    this.readQueue = [];
    
    // Luego todas las escrituras
    this.writeQueue.forEach(fn => fn());
    this.writeQueue = [];
    
    this.scheduled = false;
  }
}

export const domBatcher = new DOMBatcher();
