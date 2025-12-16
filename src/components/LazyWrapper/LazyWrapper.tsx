import React, { Suspense, ComponentType } from 'react';

// Loading spinner component with accessibility support
const LoadingSpinner: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => (
  <div className="flex items-center justify-center h-64" role="status" aria-live="polite">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
      <span className="sr-only">Loading content...</span>
    </div>
    <p className="ml-3 text-sm text-gray-600">{message}</p>
  </div>
);

// Error boundary for lazy loading failures
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class LazyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Lazy loading error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;
      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} />;
      }
      
      return (
        <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
          <div className="text-red-500 mb-2">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Failed to load component</h2>
          <p className="text-sm text-gray-600 mb-4">Please try refreshing the page.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for lazy loading with error boundary
export function withLazyLoading<P extends object>(
  Component: ComponentType<P>,
  options?: {
    loadingMessage?: string;
    errorFallback?: ComponentType<{ error: Error }>;
  }
): ComponentType<P> {
  const LazyComponent: React.FC<P> = (props) => (
    <LazyErrorBoundary fallback={options?.errorFallback}>
      <Suspense fallback={<LoadingSpinner message={options?.loadingMessage} />}>
        <Component {...props} />
      </Suspense>
    </LazyErrorBoundary>
  );

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;
  
  return LazyComponent as ComponentType<P>;
}

// Utility function to create lazy components with consistent error handling
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    loadingMessage?: string;
    errorFallback?: ComponentType<{ error: Error }>;
  }
): ComponentType<P> {
  const LazyComponent = React.lazy(importFn);
  return withLazyLoading(LazyComponent, options) as ComponentType<P>;
}

// Export components for direct use
export { LoadingSpinner, LazyErrorBoundary };