import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';
import PopupMenu, { PopupMenuItem } from '../PopupMenu/PopupMenu';
import { ODLTheme } from '../../styles/ODLTheme';
import './IconButton.css';

export interface IconButtonProps {
  /** The name of the Carbon icon to display */
  icon: string;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'destructive';
  /** Button size */
  size?: 'xs' | 'small' | 'medium' | 'large';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Whether the button is in error state */
  error?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional CSS classes */
  className?: string;
  /** Whether to show loading state */
  loading?: boolean;
  /** Additional inline styles (for edge cases only) */
  style?: React.CSSProperties;
  /** Whether the button is selected/active */
  selected?: boolean;
  /** Custom hover background color (for ghost variant) */
  customHoverBg?: string;
  /** ARIA label for accessibility - required for icon-only buttons */
  'aria-label': string;
  /** ARIA pressed state for toggle buttons */
  'aria-pressed'?: boolean;
  /** ARIA expanded state for dropdown triggers */
  'aria-expanded'?: boolean;
  /** Tooltip text to display on hover */
  title?: string;
  /** Whether to show a menu indicator (chevron-down icon) */
  menuIndicator?: boolean;
  /** Menu items for popup menu */
  menuItems?: PopupMenuItem[];
  /** Menu alignment relative to button */
  menuAlign?: 'left' | 'right' | 'center';
  /** Menu size */
  menuSize?: 'sm' | 'md' | 'lg';
  /** Callback when menu closes */
  onMenuClose?: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'primary',
  size = 'large',
  disabled = false,
  error = false,
  onClick,
  type = 'button',
  className,
  loading = false,
  style,
  selected = false,
  customHoverBg,
  'aria-label': ariaLabel,
  'aria-pressed': ariaPressed,
  'aria-expanded': ariaExpanded,
  title,
  menuIndicator = false,
  menuItems,
  menuAlign = 'left',
  menuSize = 'md',
  onMenuClose,
}) => {
  const { colors } = useTheme();
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Size-based dimensions
  const getSizeDimensions = () => {
    switch (size) {
      case 'xs':
        return { 
          width: menuIndicator ? '44px' : '28px', 
          height: '28px', 
          padding: '6px', 
          iconSize: 16 
        };
      case 'small':
        return { 
          width: menuIndicator ? '48px' : '32px', 
          height: '32px', 
          padding: '8px', 
          iconSize: 16 
        };
      case 'medium':
        return { 
          width: menuIndicator ? '56px' : '36px', 
          height: '36px', 
          padding: '8px', 
          iconSize: 20 
        };
      case 'large':
      default:
        return { 
          width: menuIndicator ? '64px' : '44px', 
          height: '44px', 
          padding: '10px', 
          iconSize: 20 
        };
    }
  };

  const sizeDimensions = getSizeDimensions();

  // Get button colors based on variant
  const getButtonColors = () => {
    const buttonColors = {
      primary: {
        background: colors.primaryMain,
        color: colors.textInverse,
        hover: colors.primaryHover,
        active: colors.primaryPressed,
        border: 'transparent'
      },
      secondary: {
        background: colors.paper,
        color: colors.primaryMain,
        hover: colors.grey400,
        active: colors.grey500,
        hoverColor: colors.primaryMain,
        activeColor: colors.primaryMain,
        border: colors.primaryMain
      },
      tertiary: {
        background: colors.secondaryLight,
        color: colors.textSecondary,
        hover: colors.secondaryMain,
        active: colors.secondaryDark,
        border: 'transparent'
      },
      disabled: {
        background: 'transparent',
        color: colors.textPrimary,
        hover: customHoverBg || colors.grey400,
        active: colors.grey500,
        hoverColor: colors.primaryMain,
        activeColor: colors.primaryMain,
        border: 'transparent'
      },
      destructive: {
        background: colors.errorMain,
        color: colors.textInverse,
        hover: '#C53030',
        active: '#A53030',
        border: 'transparent'
      }
    };
    return buttonColors[variant] || buttonColors.disabled;
  };

  // Handle custom hover background for disabled variant
  useEffect(() => {
    if (variant === 'disabled' && customHoverBg && buttonRef.current) {
      buttonRef.current.style.setProperty('--custom-hover-bg', customHoverBg);
    }
  }, [variant, customHoverBg]);

  // Handle keyboard events for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(true);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsPressed(false);
    }
  };

  // Handle click with menu support
  const handleClick = () => {
    if (disabled) return;
    
    if (menuItems && menuItems.length > 0) {
      setMenuOpen(!menuOpen);
    } else {
      onClick?.();
    }
  };

  // Handle menu close
  const handleMenuClose = () => {
    setMenuOpen(false);
    onMenuClose?.();
  };

  const isDisabled = disabled || loading;
  const buttonColors = getButtonColors();

  // Get the appropriate color for the current state
  const getCurrentColor = () => {
    if (!buttonColors) return colors.textDisabled;
    if (isDisabled) return colors.textDisabled;
    if (isPressed && !isDisabled && buttonColors.activeColor) return buttonColors.activeColor;
    if (isHovered && !isDisabled && buttonColors.hoverColor) return buttonColors.hoverColor;
    if (selected && buttonColors.activeColor) return buttonColors.activeColor;
    return buttonColors.color;
  };

  // Build styles with size-based specifications
  const buttonStyles: React.CSSProperties = {
    display: 'flex',
    width: sizeDimensions.width,
    height: sizeDimensions.height,
    padding: sizeDimensions.padding,
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: isDisabled ? 'transparent' : 
                    (isPressed && !isDisabled) ? (buttonColors?.active || 'transparent') :
                    (isHovered && !isDisabled) ? (buttonColors?.hover || 'transparent') :
                    selected ? (buttonColors?.active || 'transparent') :
                    (buttonColors?.background || 'transparent'),
    color: getCurrentColor(),
    border: `1px solid ${isDisabled ? 'transparent' : (buttonColors?.border || 'transparent')}`,
    borderRadius: '100px',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
    position: 'relative',
    fontFamily: ODLTheme.typography.fontFamily.sans,
    fontSize: '0',
    lineHeight: '1',
    boxSizing: 'border-box',
    ...style,
  };

  // Focus styles
  const focusStyles = {
    boxShadow: `0 0 0 2px ${colors.primaryMain}33`,
  };

  return (
    <>
    <button
      ref={buttonRef}
      type={type}
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      onMouseEnter={() => !isDisabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => !isDisabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => !isDisabled && setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onFocus={(e) => {
        if (!isDisabled) {
          Object.assign(e.target.style, focusStyles);
        }
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = 'none';
      }}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      aria-expanded={menuItems && menuItems.length > 0 ? menuOpen : ariaExpanded}
      aria-disabled={isDisabled}
      title={title || ariaLabel}
      style={buttonStyles}
    >
      {loading ? (
        <svg 
          width={sizeDimensions.iconSize}
          height={sizeDimensions.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            animation: 'spin 1s linear infinite',
          }}
        >
          <circle 
            style={{ opacity: 0.25 }}
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="4"
          />
          <path 
            style={{ opacity: 0.75 }}
            fill="currentColor" 
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          <Icon 
            name={icon}
            width={sizeDimensions.iconSize}
            height={sizeDimensions.iconSize}
            aria-hidden="true"
          />
          {menuIndicator && (
            <Icon 
              name="chevron-down"
              width={sizeDimensions.iconSize}
              height={sizeDimensions.iconSize}
              aria-hidden="true"
            />
          )}
        </>
      )}
    </button>
    
    {menuItems && menuItems.length > 0 && (
      <PopupMenu
        items={menuItems}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorEl={buttonRef.current}
        align={menuAlign}
        size={menuSize}
      />
    )}
    </>
  );
};

export default IconButton;