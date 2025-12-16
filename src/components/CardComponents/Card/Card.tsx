import React from 'react';
import './Card.css';

export interface CardProps {
  /** Content of the card */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the card should have hover effects */
  hoverable?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Border style */
  bordered?: boolean;
  /** Shadow depth */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** ARIA label for clickable cards - required for accessibility when onClick is provided */
  ariaLabel?: string;
}

/**
 * Simple Card component for ODL
 * A versatile container component for grouping related content
 */
const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  style,
  padding = 'lg',
  bordered = true,
  shadow = 'md',
  ariaLabel
}) => {
  // Warn if onClick without ariaLabel in development
  React.useEffect(() => {
    if (process.env.NODE_ENV === 'development' && onClick && !ariaLabel) {
      console.warn('Card: When onClick is provided, ariaLabel should also be provided for accessibility');
    }
  }, [onClick, ariaLabel]);

  const cardClasses = [
    'odl-card',
    `odl-card-padding-${padding}`,
    `odl-card-shadow-${shadow}`,
    bordered && 'odl-card-bordered',
    hoverable && 'odl-card-hoverable',
    onClick && 'odl-card-clickable',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      style={style}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? ariaLabel : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;