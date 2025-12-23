import React, { useState } from 'react';
import { useTheme } from '../../../../.storybook/theme-decorator';
import IconButton from '../../IconButton/IconButton';
import FileType, { FileTypeVariant } from '../../FileType/FileType';
import Checkbox from '../../Checkbox/Checkbox';
import Icon from '../../Icon/Icon';
import Chip from '../../Chip/Chip';
import UserAvatar from '../../UserAvatar/UserAvatar';
import buildIcon from '../../../assets/build-icon.svg';
import './Cards.css';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};



export interface CardsProps {
  /** Card type variant - affects layout and styling */
  type?: 'compact' | 'comfortable' | 'metadata' | 'user' | 'workspace' | 'build' | '3Sixty';
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
  /** Additional subtitle for 3Sixty type - appears below subtitle */
  subtitle2?: string;
  /** Tag text to display */
  tag?: string;
  /** Top secondary text (for build type) - appears above title */
  topText?: string;
  /** Bottom secondary text (for build type) - appears below subtitle */
  bottomText?: string;
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
  /** Callback when edit hover action is clicked */
  onEditClick?: () => void;
  /** Callback when text selection hover action is clicked */
  onTextSelectionClick?: () => void;
  /** Callback when copy hover action is clicked */
  onCopyClick?: () => void;
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
  /** External hover state for synchronized hover with metadata section */
  externalHoverState?: boolean;
  /** Mouse enter handler */
  onMouseEnter?: () => void;
  /** Mouse leave handler */
  onMouseLeave?: () => void;
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
  subtitle2,
  tag = "fA7985",
  topText,
  bottomText,
  showInfoIcon = true,
  showMenuIcon = true,
  onSelect,
  onInfoClick,
  onMenuClick,
  onEditClick,
  onTextSelectionClick,
  onCopyClick,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyDown,
  externalHoverState,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [_isFocused, _setIsFocused] = useState(false);
  
  // Use external hover state if provided, otherwise use internal state
  const effectiveHoverState = externalHoverState !== undefined ? externalHoverState : isHovered;
  
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
    } else if (effectiveHoverState && !disabled) {
      backgroundColor = colors.grey400;
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
        case 'user':
          return {
            padding: `${colors.spacing[3]} ${colors.spacing[2]} ${colors.spacing[3]} ${colors.spacing[4]}`,
            gap: colors.spacing[3],
            maxHeight: '70px',
          };
        case 'workspace':
          return {
            padding: `${colors.spacing[3]} ${colors.spacing[2]} ${colors.spacing[3]} ${colors.spacing[4]}`,
            gap: colors.spacing[3],
            maxHeight: '70px',
          };
        case 'build':
          return {
            padding: `${colors.spacing[3]} ${colors.spacing[2]} ${colors.spacing[3]} ${colors.spacing[3]}`,
            gap: colors.spacing[3],
          };
        case 'metadata':
          return {
            padding: `12px 8px 0px 16px`,
            gap: colors.spacing[3],
          };
        case 'comfortable':
        case '3Sixty':
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
      ...(type === 'metadata' ? {
        borderTop: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
        borderBottom: 'none',
        borderLeft: selected ? `4px solid ${colors.primaryMain}` : `1px solid ${borderColor}`,
      } : {
        border: `1px solid ${borderColor}`,
        borderLeft: selected ? `4px solid ${colors.primaryMain}` : `1px solid ${borderColor}`,
      }),
      paddingLeft: type === 'build' ? 
        (selected ? `calc(${colors.spacing[3]} - 3px)` : colors.spacing[3]) :
        type === 'metadata' ?
        (selected ? '13px' : '16px') :
        (selected ? `calc(${colors.spacing[4]} - 3px)` : colors.spacing[4]),
      borderRadius: '0px',
      transition: 'all 0.2s ease',
      fontFamily: '"Noto Sans", sans-serif',
      display: 'flex',
      width: '100%',
      alignItems: type === 'build' ? 'flex-start' : 'center',
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
    if (disabled || type === 'build') return;
    
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
      onMouseEnter={() => {
        if (!disabled) {
          setIsHovered(true);
          onMouseEnter?.();
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
    >
      {/* Checkbox */}
      {type !== 'build' && (
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
      )}

      {/* FileType Icon */}
      {iconGutter && (
        <div className="cards-container__icon" style={{ alignSelf: type === 'build' ? 'flex-start' : 'center' }}>
          {type === 'user' ? (
            <UserAvatar
              user={{
                name: title || "User",
              }}
              size="lg"
              showPopup={false}
              disabled={disabled}
            />
          ) : type === 'workspace' ? (
            <UserAvatar
              user={{
                name: title === "North Shire City Council" ? "North Shire" : title || "User",
              }}
              size="lg"
              showPopup={false}
              disabled={disabled}
            />
          ) : type === 'build' ? (
            <img 
              src={buildIcon} 
              alt="Build icon"
              style={{
                width: 44,
                height: 44,
                borderRadius: '4px',
                opacity: disabled ? 0.5 : 1,
                marginTop: 0
              }}
            />
          ) : (
            <FileType 
              type={fileType} 
              size={type === 'compact' ? 24 : 36} 
            />
          )}
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
      <div className="cards-container__content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '-2px', minWidth: 0, overflow: 'hidden' }}>
        {/* Top text for build type */}
        {type === 'build' && topText && (
          <div 
            className="cards-container__top-text"
            style={{
              fontSize: '12px',
              color: disabled ? colors.textDisabled : colors.textSecondary,
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginBottom: '2px'
            }}
          >
            {topText}
          </div>
        )}
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
        {/* Second subtitle for 3Sixty type */}
        {type === '3Sixty' && subtitle2 && (
          <div 
            className="cards-container__subtitle2"
            style={{
              fontSize: '14px',
              color: disabled ? colors.textDisabled : colors.textSecondary,
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {subtitle2}
          </div>
        )}
        {/* Bottom text for build type */}
        {type === 'build' && bottomText && (
          <div 
            className="cards-container__bottom-text"
            style={{
              fontSize: '12px',
              color: disabled ? colors.textDisabled : colors.textSecondary,
              lineHeight: '1.5',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              marginTop: '2px'
            }}
          >
            {bottomText}
          </div>
        )}
      </div>

      {/* Tag - hidden on hover/active for specific card types */}
      {tag && type !== 'workspace' && (
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
            flexShrink: 0,
            alignSelf: type === 'build' ? 'flex-start' : 'center',
            marginTop: type === 'build' ? '4px' : 0,
            display: ((effectiveHoverState || selected) && (type === 'compact' || type === 'comfortable' || type === 'metadata')) ? 'none' : 'block'
          }}
        >
          {tag}
        </div>
      )}

      {/* Action Icons - shown on hover/active for specific card types */}
      {(effectiveHoverState || selected) && (type === 'compact' || type === 'comfortable' || type === 'metadata') && (
        <div className="cards-container__hover-actions" style={{ display: 'flex', gap: colors.spacing[1], alignSelf: 'center' }}>
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon="edit"
              variant="ghost"
              size="medium"
              onClick={onEditClick || (() => alert('Edit action'))}
              disabled={disabled}
              aria-label="Edit"
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon="text"
              variant="ghost"
              size="medium"
              onClick={onTextSelectionClick || (() => alert('Text selection action'))}
              disabled={disabled}
              aria-label="Text selection"
            />
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <IconButton
              icon="copy"
              variant="ghost"
              size="medium"
              onClick={onCopyClick || (() => alert('Copy action'))}
              disabled={disabled}
              aria-label="Copy"
            />
          </div>
        </div>
      )}

      {/* Action Icons */}
      <div className="cards-container__actions" style={{ alignSelf: type === 'build' ? 'flex-start' : 'center' }}>
        {/* Information Icon */}
        {showInfoIcon && type !== 'user' && type !== 'workspace' && type !== 'build' && (
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
              icon={type === 'workspace' ? "star" : "overflow-menu-vertical"}
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
  const [isHovered, setIsHovered] = useState(false);
  
  // Get the same background logic as the main card
  const getMetadataBackground = () => {
    let backgroundColor = colors.paper;
    let borderColor = colors.border;

    if (props.disabled) {
      backgroundColor = colors.grey300;
    } else if (props.selected) {
      backgroundColor = colors.selectedLight;
      borderColor = colors.primaryMain;
    } else if (isHovered && !props.disabled) {
      backgroundColor = colors.grey400;
    } else if (props.error) {
      borderColor = colors.errorMain;
    }

    return { backgroundColor, borderColor };
  };

  const metadataStyles = getMetadataBackground();
  
  return (
    <>
      <Cards 
        {...props} 
        externalHoverState={isHovered}
        onMouseEnter={() => !props.disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {props.showMetadata && (
        <div 
          className="cards-container__metadata-chips-section"
          style={{
            backgroundColor: metadataStyles.backgroundColor,
            borderTop: 'none',
            borderRight: `1px solid ${metadataStyles.borderColor}`,
            borderBottom: `1px solid ${metadataStyles.borderColor}`,
            borderLeft: props.selected ? `4px solid ${colors.primaryMain}` : `1px solid ${metadataStyles.borderColor}`,
            padding: `12px ${colors.spacing[4]} ${colors.spacing[2]} ${colors.spacing[4]}`,
            paddingLeft: props.selected ? `calc(${colors.spacing[4]} - 3px)` : colors.spacing[4],
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