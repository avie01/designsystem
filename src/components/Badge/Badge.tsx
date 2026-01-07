import React from 'react';
import './Badge.css';

export type BadgeVariant = 
  | 'brown-dark'
  | 'blue-dark'
  | 'pink-dark'
  | 'red-dark'
  | 'orange-dark'
  | 'yellow-dark'
  | 'olive-dark'
  | 'green-dark'
  | 'mint-dark'
  | 'purple-dark';

export interface BadgeProps {
  /** The value to display in the badge */
  value?: string | number;
  /** Color variant of the badge */
  variant?: BadgeVariant;
  /** Additional CSS classes */
  className?: string;
  /** ARIA label for accessibility */
  'aria-label'?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

const Badge: React.FC<BadgeProps> = ({
  value = 12,
  variant = 'blue-dark',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': dataTestId = 'badge'
}) => {
  const badgeClasses = [
    'odl-badge',
    `odl-badge--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <span 
      className={badgeClasses}
      aria-label={ariaLabel || `Badge with value ${value}`}
      data-testid={dataTestId}
    >
      {value}
    </span>
  );
};

export default Badge;