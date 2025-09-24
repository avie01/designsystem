import React from 'react';
import './TwoColumnLayout.css';

interface TwoColumnLayoutProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  leftWidth?: '1/3' | '1/2' | '2/3';
  gap?: 'sm' | 'md' | 'lg';
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

const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  leftContent,
  rightContent,
  leftWidth = '1/2',
  gap = 'md',
  padding = true,
  size = 'md',
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel
}) => {
  const layoutClasses = [
    'two-column-layout',
    `two-column-layout--${size}`,
    padding && 'two-column-layout--padded',
    error && 'two-column-layout--error',
    disabled && 'two-column-layout--disabled',
    className
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'two-column-layout__container',
    `two-column-layout__container--gap-${gap}`,
    `two-column-layout__container--left-${leftWidth.replace('/', '-')}`
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={layoutClasses}
      aria-label={ariaLabel}
      role="region"
    >
      <div className={containerClasses}>
        <div className="two-column-layout__left">
          {leftContent}
        </div>
        <div className="two-column-layout__right">
          {rightContent}
        </div>
      </div>
    </div>
  );
};

export default TwoColumnLayout;