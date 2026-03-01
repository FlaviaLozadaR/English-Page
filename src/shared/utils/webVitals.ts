/**
 * Web Vitals Performance Monitor
 * Monitorea métricas de rendimiento de Core Web Vitals
 * 
 * Core Web Vitals:
 * - LCP (Largest Contentful Paint): < 2.5s (bueno)
 * - INP (Interaction to Next Paint): < 200ms (bueno) - Reemplaza FID
 * - CLS (Cumulative Layout Shift): < 0.1 (bueno)
 */

interface WebVitalsMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
}

export function reportWebVitals(onPerfEntry?: (metric: WebVitalsMetric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry as any);
      onINP(onPerfEntry as any); // INP reemplaza a FID desde 2024
      onFCP(onPerfEntry as any);
      onLCP(onPerfEntry as any);
      onTTFB(onPerfEntry as any);
    });
  }
}

/**
 * Función para registrar métricas de rendimiento en consola (solo desarrollo)
 */
export function logWebVitals() {
  if (import.meta.env.DEV) {
    reportWebVitals((metric) => {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
      });
    });
  }
}

/**
 * Función para enviar métricas a analytics (producción)
 */
export function sendWebVitalsToAnalytics() {
  if (import.meta.env.PROD) {
    reportWebVitals((metric) => {
      // Enviar a Google Analytics 4
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          event_category: 'Web Vitals',
          event_label: metric.rating,
          non_interaction: true,
        });
      }

      // También puedes enviar a tu propio endpoint
      if (navigator.sendBeacon) {
        const body = JSON.stringify({
          metric: metric.name,
          value: metric.value,
          rating: metric.rating,
          path: window.location.pathname,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        });
        
        navigator.sendBeacon('/api/analytics/web-vitals', body);
      }
    });
  }
}

/**
 * Monitor de performance avanzado
 */
export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map();
  
  static mark(name: string) {
    if ('performance' in window && performance.mark) {
      performance.mark(name);
    }
  }
  
  static measure(name: string, startMark: string, endMark?: string) {
    if ('performance' in window && performance.measure) {
      try {
        if (endMark) {
          performance.measure(name, startMark, endMark);
        } else {
          performance.measure(name, startMark);
        }
        
        const measures = performance.getEntriesByName(name, 'measure');
        if (measures.length > 0) {
          const duration = measures[measures.length - 1].duration;
          this.metrics.set(name, duration);
          
          if (import.meta.env.DEV) {
            console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
          }
          
          return duration;
        }
      } catch (error) {
        console.warn('Performance measurement failed:', error);
      }
    }
    return null;
  }
  
  static getMetrics() {
    return Object.fromEntries(this.metrics);
  }
  
  static clearMetrics() {
    if ('performance' in window && performance.clearMarks) {
      performance.clearMarks();
      performance.clearMeasures();
    }
    this.metrics.clear();
  }
}

/**
 * Resource timing analysis
 */
export function analyzeResourceTiming() {
  if (!('performance' in window)) return null;
  
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const analysis = {
    total: resources.length,
    byType: {} as Record<string, number>,
    slow: [] as Array<{ name: string; duration: number }>,
    totalSize: 0,
    totalDuration: 0,
  };
  
  resources.forEach(resource => {
    // Contar por tipo
    const type = resource.initiatorType;
    analysis.byType[type] = (analysis.byType[type] || 0) + 1;
    
    // Recursos lentos (>500ms)
    if (resource.duration > 500) {
      analysis.slow.push({
        name: resource.name,
        duration: resource.duration,
      });
    }
    
    // Tamaño total (si está disponible)
    if (resource.transferSize) {
      analysis.totalSize += resource.transferSize;
    }
    
    analysis.totalDuration += resource.duration;
  });
  
  return analysis;
}

/**
 * Long tasks observer
 */
export function observeLongTasks(callback: (entry: PerformanceEntry) => void) {
  if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('longtask')) {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        callback(entry);
        
        if (import.meta.env.DEV && entry.duration > 50) {
          console.warn(`[Long Task] Duration: ${entry.duration.toFixed(2)}ms`, entry);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
    return observer;
  }
  return null;
}
      // Enviar a Google Analytics, si está configurado
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', metric.name, {
          value: Math.round(metric.value),
          metric_rating: metric.rating,
          metric_delta: Math.round(metric.delta),
          metric_value: Math.round(metric.value),
        });
      }
      
      // O enviar a tu propio endpoint de analytics
      // fetch('/api/analytics', {
      //   method: 'POST',
      //   body: JSON.stringify(metric),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    });
  }
}
