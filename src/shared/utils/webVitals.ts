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
