import React from 'react';
import { cn } from '../../../utils/classNames';

export interface CardsProps {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'stat' | 'image';
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card content */
  content?: React.ReactNode;
  /** Footer content */
  footer?: React.ReactNode;
  /** Card image (for image variant) */
  image?: string;
  /** Image alt text */
  imageAlt?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether card is selected */
  selected?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Icon to display (for stat variant) */
  icon?: React.ReactNode;
  /** Custom header content */
  header?: React.ReactNode;
  /** Whether to show hover effects */
  hoverable?: boolean;
}

const Cards: React.FC<CardsProps> = ({
  variant = 'default',
  title,
  subtitle,
  content,
  footer,
  image,
  imageAlt,
  onClick,
  selected = false,
  className,
  icon,
  header,
  hoverable = !!onClick,
}) => {
  // Base card styles
  const baseStyles = cn(
    'bg-white rounded-lg overflow-hidden',
    'transition-all duration-200',
    hoverable && 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
    selected && 'ring-2 ring-odl-primary ring-offset-2',
    onClick && 'cursor-pointer'
  );

  // Variant-specific styles
  const variantStyles: Record<NonNullable<typeof variant>, string> = {
    default: 'shadow-sm border border-odl-border',
    elevated: 'shadow-lg',
    outlined: 'border-2 border-odl-border',
    stat: 'shadow-sm border border-odl-border p-6',
    image: 'shadow-md',
  };

  // Stat card variant
  if (variant === 'stat') {
    return (
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          className
        )}
        onClick={onClick}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {title && (
              <p className="text-sm text-odl-text-secondary font-medium mb-1">
                {title}
              </p>
            )}
            {content && (
              <p className="text-2xl font-bold text-odl-text-primary">
                {content}
              </p>
            )}
            {footer && (
              <p className="text-sm text-odl-text-tertiary mt-2">
                {footer}
              </p>
            )}
          </div>
          {icon && (
            <div className="ml-4 flex-shrink-0">
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Image card variant
  if (variant === 'image' && image) {
    return (
      <div
        className={cn(
          baseStyles,
          variantStyles[variant],
          className
        )}
        onClick={onClick}
      >
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={image}
            alt={imageAlt || title}
            className="w-full h-48 object-cover"
          />
        </div>
        {(title || subtitle || content || footer) && (
          <div className="p-6">
            {(title || subtitle) && (
              <div className="mb-4">
                {title && (
                  <h3 className="text-lg font-semibold text-odl-text-primary">
                    {title}
                  </h3>
                )}
                {subtitle && (
                  <p className="text-sm text-odl-text-secondary mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
            {content && (
              <div className="text-odl-text-secondary">
                {content}
              </div>
            )}
            {footer && (
              <div className="mt-4 pt-4 border-t border-odl-border">
                {footer}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Default card layout
  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant as keyof typeof variantStyles],
        (variant === 'default' || variant === 'elevated' || variant === 'outlined' || variant === 'image') && 'p-6',
        className
      )}
      onClick={onClick}
    >
      {header && (
        <div className="mb-4 pb-4 border-b border-odl-border -mx-6 px-6 -mt-6 pt-6">
          {header}
        </div>
      )}
      
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-odl-text-primary">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-odl-text-secondary mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      
      {content && (
        <div className="text-odl-text-secondary">
          {content}
        </div>
      )}
      
      {footer && (
        <div className="mt-4 pt-4 border-t border-odl-border">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Cards;