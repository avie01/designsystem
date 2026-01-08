import React, { useState } from 'react';
import Icon from '../../Icon/Icon';
import FileType from '../../FileType/FileType';
import './Cards.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};



export interface CardsProps {
  /** Size variant - affects typography and spacing */
  size?: 'sm' | 'md' | 'lg' | 'small-grid';
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error colors */
  error?: boolean;
  /** Whether the card is selected (checkbox state) */
  selected?: boolean;
  /** Primary text content */
  title?: string;
  /** Secondary text content */
  subtitle?: string;
  /** Tag text to display */
  tag?: string;
  /** Whether to show the information icon */
  showInfoIcon?: boolean;
  /** Whether to show the ellipsis menu icon */
  showMenuIcon?: boolean;
  /** Callback when checkbox is clicked */
  onSelect?: (selected: boolean) => void;
  /** Callback when info icon is clicked */
  onInfoClick?: () => void;
  /** Callback when menu icon is clicked */
  onMenuClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /** ARIA label for screen readers */
  'aria-label'?: string;
  /** ARIA described by for additional context */
  'aria-describedby'?: string;
  /** Keyboard event handlers */
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

const Cards: React.FC<CardsProps> = ({
  size = 'md',
  disabled = false,
  error = false,
  selected = false,
  title = "Title - h4 - Primary",
  subtitle = "Body - body2 - Secondary",
  tag = "fA7985",
  showInfoIcon = true,
  showMenuIcon = true,
  onSelect,
  onInfoClick,
  onMenuClick,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyDown,
}) => {
  const [_isHovered, _setIsHovered] = useState(false);
  const [_isFocused, _setIsFocused] = useState(false);
  
  // Generate component classes
  const componentClasses = classNames(
    'cards-container',
    `cards-container--${size}`,
    selected && 'cards-container--selected',
    disabled && 'cards-container--disabled',
    error && 'cards-container--error',
    className
  );

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.(!selected);
    }
    if (e.key === 'Escape') {
      (e.currentTarget as HTMLElement).blur();
    }

    onKeyDown?.(e);
  };

  return (
    <div 
      className={componentClasses}
      style={style}
      role="article"
      aria-label={ariaLabel || `${title}${selected ? ', selected' : ''}`}
      aria-describedby={ariaDescribedBy}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && onSelect?.(!selected)}
      onKeyDown={handleKeyDown}
    >
      {/* Checkbox */}
      <div className="cards-container__checkbox">
        <input
          type="checkbox"
          checked={selected}
          aria-checked={selected}
          onChange={(e) => onSelect?.(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          disabled={disabled}
          aria-label={`Select ${title}`}
          aria-describedby={ariaDescribedBy}
        />
      </div>

      {/* FileType Icon */}
      <div className="cards-container__icon">
        <FileType type="folder" size={size === 'sm' ? 20 : size === 'lg' ? 28 : 24} />
      </div>

      {/* Text Content */}
      <div className="cards-container__content">
        <div className="cards-container__title">
          {title}
        </div>
        <div className="cards-container__subtitle">
          {subtitle}
        </div>
      </div>

      {/* Tag */}
      {tag && (
        <div className="cards-container__tag">
          {tag}
        </div>
      )}

      {/* Action Icons */}
      <div className="cards-container__actions">
        {/* Information Icon */}
        {showInfoIcon && (
          <button
            className="cards-container__action"
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick?.();
            }}
            disabled={disabled}
            aria-label={`More information about ${title}`}
            type="button"
          >
            <Icon name="information" size={16} />
          </button>
        )}

        {/* Menu Icon */}
        {showMenuIcon && (
          <button
            className="cards-container__action"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick?.();
            }}
            disabled={disabled}
            aria-label={`Options for ${title}`}
            type="button"
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Cards; 