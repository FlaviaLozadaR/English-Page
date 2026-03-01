/**
 * Google Analytics 4 Configuration
 * SEO y tracking de analytics mejorado
 */

// Tu Google Analytics Measurement ID
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Reemplazar con tu ID real

interface GAEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

/**
 * Inicializar Google Analytics 4
 */
export function initGA() {
  if (typeof window === 'undefined' || import.meta.env.DEV) return;

  // Cargar script de GA4
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Inicializar gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
    // Configuración de privacidad
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });
}

/**
 * Track de pageview (para SPAs)
 */
export function trackPageView(url: string, title?: string) {
  if (typeof window === 'undefined' || import.meta.env.DEV) return;
  
  if ((window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      page_title: title || document.title,
    });
  }
}

/**
 * Track de eventos personalizados
 */
export function trackEvent({ action, category, label, value }: GAEvent) {
  if (typeof window === 'undefined' || import.meta.env.DEV) {
    console.log('[GA Event]', { action, category, label, value });
    return;
  }
  
  if ((window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * Track de búsquedas internas
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultsCount,
  });
}

/**
 * Track de ejercicios completados
 */
export function trackExerciseCompleted(exerciseType: string, score: number) {
  trackEvent({
    action: 'exercise_completed',
    category: 'learning',
    label: exerciseType,
    value: score,
  });
}

/**
 * Track de quiz iniciado
 */
export function trackQuizStarted(quizName: string) {
  trackEvent({
    action: 'quiz_started',
    category: 'engagement',
    label: quizName,
  });
}

/**
 * Track de quiz completado
 */
export function trackQuizCompleted(quizName: string, score: number) {
  trackEvent({
    action: 'quiz_completed',
    category: 'learning',
    label: quizName,
    value: score,
  });
}

/**
 * Track de tiempo en página
 */
export function trackTimeOnPage() {
  const startTime = Date.now();
  
  const sendTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000); // en segundos
    
    trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: window.location.pathname,
      value: timeSpent,
    });
  };
  
  // Enviar cuando el usuario sale de la página
  window.addEventListener('beforeunload', sendTimeOnPage);
  
  // También enviar cada 30 segundos
  const interval = setInterval(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    if (timeSpent % 30 === 0) { // Cada 30 segundos
      trackEvent({
        action: 'time_checkpoint',
        category: 'engagement',
        label: window.location.pathname,
        value: timeSpent,
      });
    }
  }, 1000);
  
  return () => {
    clearInterval(interval);
    window.removeEventListener('beforeunload', sendTimeOnPage);
  };
}

/**
 * Track de scroll depth
 */
export function trackScrollDepth() {
  let maxScroll = 0;
  const milestones = [25, 50, 75, 100];
  const reached = new Set<number>();
  
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    const scrollPercent = ((scrollTop + windowHeight) / documentHeight) * 100;
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${milestone}%`,
            value: milestone,
          });
        }
      });
    }
  };
  
  // Throttle del evento scroll
  let ticking = false;
  const throttledScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };
  
  window.addEventListener('scroll', throttledScroll, { passive: true });
  
  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
}

/**
 * Track de outbound links
 */
export function trackOutboundLink(url: string) {
  trackEvent({
    action: 'outbound_link',
    category: 'engagement',
    label: url,
  });
}

/**
 * Track de errores de JavaScript
 */
export function trackError(error: Error, errorInfo?: any) {
  if (typeof window === 'undefined' || import.meta.env.DEV) {
    console.error('[Error]', error, errorInfo);
    return;
  }
  
  if ((window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: error.message,
      fatal: false,
    });
  }
}

/**
 * Configurar tracking automático de SPAs
 */
export function setupSPATracking() {
  // Track initial page
  trackPageView(window.location.pathname + window.location.search);
  
  // Track scroll depth
  const unsubscribeScroll = trackScrollDepth();
  
  // Track time on page
  const unsubscribeTime = trackTimeOnPage();
  
  return () => {
    unsubscribeScroll();
    unsubscribeTime();
  };
}

// Extender el tipo Window para TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
