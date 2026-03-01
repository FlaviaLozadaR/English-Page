import { Component, ReactNode, ErrorInfo } from 'react';
import { trackError } from '../utils/analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary Component
 * Captura errores de React y previene que la app crashee
 * Mejora UX y ayuda con SEO (evita páginas blancas)
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Track error in analytics
    trackError(error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Send error to monitoring service (e.g., Sentry)
    if (import.meta.env.PROD && typeof window !== 'undefined') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Ups! Algo salió mal
            </h1>
            
            <p className="text-gray-600 mb-6">
              Lo sentimos, ha ocurrido un error inesperado. Nuestro equipo ha sido notificado
              y estamos trabajando para solucionarlo.
            </p>

            {import.meta.env.DEV && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700 mb-2">
                  Ver detalles del error (solo en desarrollo)
                </summary>
                <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-40">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.resetError}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Intentar de nuevo
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Error Fallback Component - Reutilizable
 */
export function ErrorFallback({ 
  error, 
  resetError 
}: { 
  error: Error; 
  resetError: () => void;
}) {
  return (
    <div className="min-h-[400px] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-4">
          <div className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Error al cargar el contenido
        </h3>
        
        <p className="text-sm text-gray-600 mb-4">
          {error.message || 'Ha ocurrido un error inesperado'}
        </p>

        <button
          onClick={resetError}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}
