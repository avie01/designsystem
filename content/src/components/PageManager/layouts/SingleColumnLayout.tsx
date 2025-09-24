import React from 'react';
import './SingleColumnLayout.css';

interface SingleColumnLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  padding?: boolean;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label */
  'aria-label'?: string;
}

const SingleColumnLayout: React.FC<SingleColumnLayoutProps> = ({
  children,
  maxWidth = 'xl',
  padding = true,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const layoutClasses = [
    'single-column-layout',
    `single-column-layout--${size}`,
    padding && 'single-column-layout--padded',
    error && 'single-column-layout--error',
    disabled && 'single-column-layout--disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'single-column-layout__container',
    `single-column-layout__container--${maxWidth}`
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={layoutClasses}
      aria-label={ariaLabel}
      role="region"
    >
      <div className={containerClasses}>
        {children}
      </div>
    </div>
  );
};

export default SingleColumnLayout;