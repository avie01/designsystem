import React, { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetKeys?: Array<string | number>;
  resetOnPropsChange?: boolean;
  isolate?: boolean;
  level?: 'page' | 'section' | 'component';
  fallbackMessage?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorCount: number;
}

// Default error fallback component
const DefaultErrorFallback: React.FC<{ 
  error: Error; 
  resetError: () => void;
  level?: 'page' | 'section' | 'component';
  message?: string;
}> = ({ error, resetError, level = 'component', message }) => {
  const getLevelClass = () => {
    switch (level) {
      case 'page':
        return styles['errorContainer--page'];
      case 'section':
        return styles['errorContainer--section'];
      default:
        return styles['errorContainer--component'];
    }
  };

  return (
    <div
      className={`${styles.errorContainer} ${getLevelClass()}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.errorContent}>
        <svg
          className={styles.errorIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        
        <h2 className={styles.errorTitle}>
          {message || 'Something went wrong'}
        </h2>
        
        <p className={styles.errorMessage}>
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className={styles.errorDetails}>
            <summary className={styles.errorSummary}>
              Error details
            </summary>
            <pre className={styles.errorStack}>
              {error.stack}
            </pre>
          </details>
        )}
        
        <button
          onClick={resetError}
          className={styles.retryButton}
          aria-label="Try again"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
    
    this.resetErrorBoundary = this.resetErrorBoundary.bind(this);
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { onError } = this.props;
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    
    // Call custom error handler if provided
    if (onError) {
      onError(error, errorInfo);
    }
    
    // Update state with error info
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;
    
    // Reset error boundary if resetKeys have changed
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some(
        (key, index) => key !== prevProps.resetKeys![index]
      );
      
      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }
    
    // Reset on any props change if configured
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary();
    }
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error } = this.state;
    const { 
      children, 
      fallback: FallbackComponent = DefaultErrorFallback,
      isolate = true,
      level = 'component',
      fallbackMessage
    } = this.props;

    if (hasError && error) {
      // If isolate is false, re-throw the error to let parent boundary handle it
      if (!isolate) {
        throw error;
      }

      return (
        <FallbackComponent 
          error={error} 
          resetError={this.resetErrorBoundary}
          level={level}
          message={fallbackMessage}
        />
      );
    }

    return children;
  }
}

// Hook to use with error boundaries
export const useErrorHandler = () => {
  return (error: Error) => {
    throw error;
  };
};

// HOC to wrap components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

export default ErrorBoundary;
export type { ErrorBoundaryProps, ErrorBoundaryState };