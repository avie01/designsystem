import React, { useState } from 'react';
import { useTheme } from '../../../../.storybook/theme-decorator';
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
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [_isFocused, _setIsFocused] = useState(false);
  
  // Get theme-based dynamic styles
  const getDynamicStyles = () => {
    let backgroundColor = colors.paper;
    let borderColor = colors.border;
    let textColor = colors.textPrimary;

    if (disabled) {
      backgroundColor = colors.grey300;
      textColor = colors.textDisabled;
    } else if (selected) {
      backgroundColor = colors.selectedLight;
      borderColor = colors.primaryMain;
    } else if (isHovered && !disabled) {
      backgroundColor = colors.surfaceHover;
    } else if (error) {
      borderColor = colors.errorMain;
    }

    // Get spacing based on type
    const getSpacing = () => {
      switch (type) {
        case 'compact':
          return {
            padding: colors.spacing[2],
            gap: colors.spacing[2],
            minHeight: '40px',
          };
        case 'comfortable':
        case 'metadata':
        default:
          return {
            padding: `${colors.spacing[3]} ${colors.spacing[2]} ${colors.spacing[3]} ${colors.spacing[4]}`,
            gap: colors.spacing[3],
          };
      }
    };

    return {
      ...getSpacing(),
      backgroundColor,
      color: textColor,
      border: `1px solid ${borderColor}`,
      borderBottom: type === 'metadata' ? 'none' : `1px solid ${borderColor}`,
      borderLeft: selected ? `4px solid ${colors.primaryMain}` : `1px solid ${borderColor}`,
      paddingLeft: selected ? `calc(${colors.spacing[4]} - 3px)` : colors.spacing[4],
      borderRadius: '0px',
      transition: 'all 0.2s ease',
      fontFamily: '"Noto Sans", sans-serif',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      cursor: 'pointer',
      boxSizing: 'border-box' as const,
      ...style,
    };
  };

  // Generate component classes (keeping for animations and CSS-based interactions)
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
      style={getDynamicStyles()}
      role="article"
      aria-label={ariaLabel || `${title}${selected ? ', selected' : ''}`}
      aria-describedby={ariaDescribedBy}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Checkbox */}
      <div className="cards-container__checkbox">
        <Checkbox
          checked={selected}
          onChange={onSelect}
          disabled={disabled}
          size="md"
          id={`card-checkbox-${title?.replace(/\s+/g, '-').toLowerCase()}`}
          aria-label={`Select ${title}`}
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
              color={disabled ? colors.textDisabled : colors.textSecondary}
            />
          ))}
        </div>
      )}

      {/* Text Content */}
      <div className="cards-container__content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: colors.spacing[1], minWidth: 0, overflow: 'hidden' }}>
        <div className="cards-container__title-row" style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
          <div 
            className="cards-container__title"
            style={{ 
              fontSize: type === 'compact' ? '12px' : '14px',
              fontWeight: 600,
              color: disabled ? colors.textDisabled : colors.textPrimary,
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            {title}
          </div>
          {extensionSize && (
            <div 
              className="cards-container__extension-size"
              style={{
                fontSize: '12px',
                color: disabled ? colors.textDisabled : colors.textSecondary,
                lineHeight: '1.5',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              .pdf (9.8kb)
            </div>
          )}
        </div>
        {type !== 'compact' && (
          <div 
            className="cards-container__subtitle"
            style={{
              fontSize: '14px',
              color: disabled ? colors.textDisabled : colors.textSecondary,
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Tag */}
      {tag && (
        <div 
          className="cards-container__tag"
          style={{
            backgroundColor: disabled ? colors.grey200 : colors.grey300,
            color: disabled ? colors.textDisabled : colors.textPrimary,
            padding: `${colors.spacing[1]} ${colors.spacing[2]}`,
            borderRadius: '4px',
            fontSize: type === 'compact' ? '11px' : '12px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            border: `1px solid ${disabled ? colors.textDisabled : colors.border}`,
            flexShrink: 0
          }}
        >
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
  const { colors } = useTheme();
  
  return (
    <>
      <Cards {...props} />
      {props.showMetadata && (
        <div 
          className="cards-container__metadata-chips-section"
          style={{
            backgroundColor: colors.paper,
            border: `1px solid ${colors.border}`,
            borderTop: 'none',
            padding: `0 ${colors.spacing[4]} ${colors.spacing[2]} ${colors.spacing[4]}`,
            marginTop: '-12px',
            transition: 'all 0.2s ease'
          }}
        >
          <div 
            className="cards-container__metadata-chips"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: colors.spacing[2]
            }}
          >
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