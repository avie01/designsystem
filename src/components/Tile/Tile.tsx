import React, { useState } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';

export type TileSize = 'small' | 'medium' | 'large';
export type TileVariant = 'default' | 'outlined' | 'filled' | 'list';

export interface TileProps {
  /** Title text */
  title: string;
  /** Optional description text */
  description?: string;
  /** Icon name to display */
  icon?: string;
  /** Custom icon element (overrides icon prop) */
  customIcon?: React.ReactNode;
  /** Tile size */
  size?: TileSize;
  /** Tile variant */
  variant?: TileVariant;
  /** Whether the tile is selected */
  selected?: boolean;
  /** Whether the tile is disabled */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Badge count to display */
  badge?: number | string;
  /** Whether to show the tile in a horizontal layout */
  horizontal?: boolean;
  /** Show chevron arrow on the right (useful for list variant) */
  showChevron?: boolean;
  /** Right-side content (overrides chevron) */
  rightContent?: React.ReactNode;
}

const Tile: React.FC<TileProps> = ({
  title,
  description,
  icon,
  customIcon,
  size = 'medium',
  variant = 'default',
  selected = false,
  disabled = false,
  onClick,
  className = '',
  badge,
  horizontal = false,
  showChevron = false,
  rightContent,
}) => {
  const isListVariant = variant === 'list';
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeConfig = {
    small: {
      padding: '12px',
      iconSize: 24,
      titleSize: '13px',
      descSize: '11px',
      minWidth: '80px',
      minHeight: '80px',
      gap: '8px',
    },
    medium: {
      padding: '16px',
      iconSize: 32,
      titleSize: '14px',
      descSize: '12px',
      minWidth: '120px',
      minHeight: '120px',
      gap: '12px',
    },
    large: {
      padding: '20px',
      iconSize: 40,
      titleSize: '16px',
      descSize: '13px',
      minWidth: '160px',
      minHeight: '160px',
      gap: '16px',
    },
  };

  const config = sizeConfig[size];

  const getBackgroundColor = () => {
    if (disabled) return colors.surfaceHover;
    if (isPressed) return colors.primaryPressed || colors.grey400;
    if (selected) return colors.selectedLight || `${colors.primaryMain}15`;
    if (isHovered) return colors.surfaceHover;
    if (variant === 'filled') return colors.grey100;
    if (isListVariant) return colors.background;
    return colors.background;
  };

  const getBorderColor = () => {
    if (isListVariant) {
      if (selected) return colors.primaryMain;
      return 'transparent';
    }
    if (disabled) return colors.grey300;
    if (selected) return colors.primaryMain;
    if (isHovered) return colors.grey500;
    if (variant === 'outlined' || variant === 'default') return colors.border;
    return 'transparent';
  };

  const isHorizontalLayout = horizontal || isListVariant;

  const buttonStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isHorizontalLayout ? 'row' : 'column',
    alignItems: isHorizontalLayout ? 'center' : 'center',
    justifyContent: isHorizontalLayout ? 'flex-start' : 'center',
    gap: config.gap,
    padding: isListVariant ? '12px 16px' : config.padding,
    minWidth: isHorizontalLayout ? '200px' : config.minWidth,
    minHeight: isHorizontalLayout ? 'auto' : config.minHeight,
    width: isListVariant ? '100%' : undefined,
    backgroundColor: getBackgroundColor(),
    border: `1px solid ${getBorderColor()}`,
    borderRadius: isListVariant ? '4px' : '8px',
    borderBottom: isListVariant && !selected ? `1px solid ${colors.border}` : undefined,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    fontFamily: 'var(--font-family-noto)',
    textAlign: isHorizontalLayout ? 'left' : 'center',
    position: 'relative',
    boxShadow: selected && !isListVariant ? `0 0 0 2px ${colors.primaryMain}` : 'none',
  };

  const iconContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: isListVariant ? `${config.iconSize + 8}px` : `${config.iconSize + 16}px`,
    height: isListVariant ? `${config.iconSize + 8}px` : `${config.iconSize + 16}px`,
    borderRadius: isListVariant ? '4px' : '8px',
    backgroundColor: isListVariant ? 'transparent' : (selected ? `${colors.primaryMain}20` : colors.grey100),
    flexShrink: 0,
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontSize: config.titleSize,
    fontWeight: 600,
    color: disabled ? colors.textDisabled : colors.textPrimary,
    lineHeight: 1.3,
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    fontSize: config.descSize,
    fontWeight: 400,
    color: disabled ? colors.textDisabled : colors.textSecondary,
    lineHeight: 1.4,
  };

  const badgeStyle: React.CSSProperties = {
    position: 'absolute',
    top: '8px',
    right: '8px',
    minWidth: '20px',
    height: '20px',
    padding: '0 6px',
    borderRadius: '10px',
    backgroundColor: colors.primaryMain,
    color: colors.textInverse,
    fontSize: '11px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      setIsPressed(false);
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      style={buttonStyle}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {badge !== undefined && !isListVariant && <span style={badgeStyle}>{badge}</span>}

      {(icon || customIcon) && (
        <div style={iconContainerStyle}>
          {customIcon || (
            <Icon
              name={icon!}
              size={isListVariant ? config.iconSize - 4 : config.iconSize}
              color={selected ? colors.primaryMain : colors.textSecondary}
            />
          )}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          alignItems: isHorizontalLayout ? 'flex-start' : 'center',
          flex: isListVariant ? 1 : undefined,
        }}
      >
        <h4 style={titleStyle}>{title}</h4>
        {description && <p style={descriptionStyle}>{description}</p>}
      </div>

      {isListVariant && (rightContent || showChevron || badge !== undefined) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginLeft: 'auto',
            flexShrink: 0,
          }}
        >
          {badge !== undefined && (
            <span
              style={{
                minWidth: '20px',
                height: '20px',
                padding: '0 6px',
                borderRadius: '10px',
                backgroundColor: colors.primaryMain,
                color: colors.textInverse,
                fontSize: '11px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {badge}
            </span>
          )}
          {rightContent}
          {showChevron && !rightContent && (
            <Icon
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </div>
      )}

      {!isListVariant && (rightContent || showChevron) && isHorizontalLayout && (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {rightContent}
          {showChevron && !rightContent && (
            <Icon
              name="chevron-right"
              size={20}
              color={colors.textSecondary}
            />
          )}
        </div>
      )}
    </button>
  );
};

export default Tile;
