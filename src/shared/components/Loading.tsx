import { CSSProperties } from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  fullScreen?: boolean;
  text?: string;
}

/**
 * Loading Spinner Component
 * Optimizado para performance y accesibilidad
 */
export function LoadingSpinner({
  size = 'md',
  color = 'text-blue-600',
  fullScreen = false,
  text,
}: LoadingSpinnerProps) {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }[size];

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <svg
        className={`animate-spin ${sizeClass} ${color}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
}

/**
 * Skeleton Loading Component
 * Para layouts que mantienen estructura durante carga
 */
interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  width,
  height,
  variant = 'text',
  animation = 'pulse',
}: SkeletonProps) {
  const style: CSSProperties = {
    width,
    height,
  };

  const baseClass = 'bg-gray-200';
  const animationClass = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  }[animation];

  const variantClass = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  }[variant];

  return (
    <div
      className={`${baseClass} ${variantClass} ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

/**
 * Skeleton de Card
 */
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <Skeleton variant="rectangular" height={48} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <div className="flex gap-2 pt-4">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
}

/**
 * Skeleton de Lista
 */
export function ListSkeleton({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-lg">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="80%" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Suspense Fallback Component
 */
export function SuspenseFallback({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <LoadingSpinner size="lg" text={message} />
    </div>
  );
}

/**
 * Page Loading Component
 */
export function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <LoadingSpinner size="lg" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Cargando contenido
        </h2>
        <p className="text-gray-600">
          Por favor espera un momento...
        </p>
      </div>
    </div>
  );
}

/**
 * Button Loading State
 */
export function ButtonLoader({ text = 'Cargando...' }: { text?: string }) {
  return (
    <span className="flex items-center gap-2">
      <LoadingSpinner size="sm" color="text-white" />
      {text}
    </span>
  );
}
