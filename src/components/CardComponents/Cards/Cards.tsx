import React, { useState } from 'react';
import IconButton from '../../IconButton/IconButton';
import FileType, { FileTypeVariant } from '../../FileType/FileType';
import Checkbox from '../../Checkbox/Checkbox';
import Icon from '../../Icon/Icon';
import Chip from '../../Chip/Chip';
import './Cards.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};



export interface CardsProps {
  /** Card type variant - affects layout and styling */
  type?: 'compact' | 'comfortable' | 'metadata';
  /** Whether to show the icon gutter (FileType icon) */
  iconGutter?: boolean;
  /** Icons to display in the gutter between FileType and text content */
  gutterIcons?: string[];
  /** File type to display in the icon gutter */
  fileType?: FileTypeVariant;
  /** Whether to show extension and file size text next to title */
  extensionSize?: boolean;
  /** Whether to show metadata card with chips section */
  showMetadata?: boolean;
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
  type = 'comfortable',
  iconGutter = true,
  gutterIcons = [],
  fileType = 'folder',
  extensionSize = false,
  showMetadata = false,
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
    `cards-container--${type}`,
    selected && 'cards-container--selected',
    disabled && 'cards-container--disabled',
    error && 'cards-container--error',
    showMetadata && 'cards-container--with-metadata',
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
      <div className="cards-container__checkbox" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={onSelect}
          disabled={disabled}
          size="md"
          id={`card-checkbox-${title?.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </div>

      {/* Yellow Folder Icon */}
      {iconGutter && (
        <div className="cards-container__icon">
          <FileType type={fileType} size={type === 'compact' ? 24 : 36} />
        </div>
      )}

      {/* Gutter Icons */}
      {iconGutter && gutterIcons.length > 0 && (
        <div className="cards-container__gutter-icons">
          {gutterIcons.map((iconName, index) => (
            <Icon
              key={index}
              name={iconName}
              size={12}
              color="#525965"
            />
          ))}
        </div>
      )}

      {/* Text Content */}
      <div className="cards-container__content">
        <div className="cards-container__title-row">
          <div className="cards-container__title">
            {title}
          </div>
          {extensionSize && (
            <div className="cards-container__extension-size">
              .pdf (9.8kb)
            </div>
          )}
        </div>
        {type !== 'compact' && (
          <div className="cards-container__subtitle">
            {subtitle}
          </div>
        )}
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
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon="information"
              variant="ghost"
              size="medium"
              onClick={onInfoClick}
              disabled={disabled}
              aria-label={`More information about ${title}`}
            />
          </div>
        )}

        {/* Menu Icon */}
        {showMenuIcon && (
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon="overflow-menu-vertical"
              variant="ghost"
              size="medium"
              onClick={onMenuClick}
              disabled={disabled}
              aria-label={`Options for ${title}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const CardsWithMetadata: React.FC<CardsProps> = (props) => {
  return (
    <>
      <Cards {...props} />
      {props.showMetadata && (
        <div className="cards-container__metadata-chips-section">
          <div className="cards-container__metadata-chips">
            <Chip 
              label="creation date: 18 Dec 2024, 16:11:23"
              variant="white"
              size="sm"
            />
            <Chip 
              label="date updated: 21 Oct 2025, 16:00:24"
              variant="white"
              size="sm"
            />
            <Chip 
              label="Last updater: betaadmin1"
              variant="white"
              size="sm"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CardsWithMetadata; 