import React, { useState } from 'react';
import { useTheme, themeColors } from '../../../.storybook/theme-decorator';
import { ODLTheme } from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface ChipProps {
  /** Size variant - affects typography and spacing */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state - affects colors and interaction */
  disabled?: boolean;
  /** Error state - uses error colors */
  error?: boolean;
  /** The text content to display */
  label: string;
  /** The color variant of the chip */
  variant?: 'blue' | 'pink' | 'red' | 'orange' | 'yellow' | 'olive' | 'mint' | 'brown' | 'purple' | 'green' | 'success' | 'error' | 'warning' | 'info' | 'neutral' | 'white';
  /** Whether to show the document icon */
  showDocumentIcon?: boolean;
  /** Whether to show the info icon */
  showInfoIcon?: boolean;
  /** Custom icon name from Carbon library */
  iconName?: string;
  /** Whether the chip is clickable */
  clickable?: boolean;
  /** Callback when chip is clicked */
  onClick?: () => void;
  /** Whether the chip can be toggled on/off */
  toggle?: boolean;
  /** Whether the chip is currently toggled on (for controlled mode) */
  toggled?: boolean;
  /** Callback when chip toggle state changes */
  onToggle?: (toggled: boolean) => void;
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

const Chip: React.FC<ChipProps> = ({
  size = 'md',
  disabled = false,
  error = false,
  label,
  variant = 'neutral',
  showDocumentIcon = false,
  showInfoIcon = false,
  iconName,
  clickable = false,
  onClick,
  toggle = false,
  toggled: controlledToggled,
  onToggle,
  className = "",
  style,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  onKeyDown,
}) => {
  const { colors, theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [internalToggled, setInternalToggled] = useState(false);
  
  // Use controlled mode if toggled prop is provided, otherwise use internal state
  const isToggled = controlledToggled !== undefined ? controlledToggled : internalToggled;
  const isInteractive = clickable || toggle;

  // Get contrasting text color based on current theme
  const getContrastingTextColor = (chipVariant: string) => {
    if (theme === 'light') {
      // In light mode, use dark mode chip colors for text
      switch (chipVariant) {
        case 'blue': return themeColors.dark.chipBlue;
        case 'pink': return themeColors.dark.chipPink;
        case 'red': return themeColors.dark.chipRed;
        case 'orange': return themeColors.dark.chipOrange;
        case 'yellow': return themeColors.dark.chipYellow;
        case 'olive': return themeColors.dark.chipOlive;
        case 'mint': return themeColors.dark.chipMint;
        case 'brown': return themeColors.dark.chipBrown;
        case 'purple': return themeColors.dark.chipPurple;
        case 'green': return themeColors.dark.chipGreen;
        case 'white': return '#525965';
        default: return ODLTheme.colors.text.primary;
      }
    } else if (theme === 'dark') {
      // In dark mode, use light mode chip colors for text
      switch (chipVariant) {
        case 'blue': return themeColors.light.chipBlue;
        case 'pink': return themeColors.light.chipPink;
        case 'red': return themeColors.light.chipRed;
        case 'orange': return themeColors.light.chipOrange;
        case 'yellow': return themeColors.light.chipYellow;
        case 'olive': return themeColors.light.chipOlive;
        case 'mint': return themeColors.light.chipMint;
        case 'brown': return themeColors.light.chipBrown;
        case 'purple': return themeColors.light.chipPurple;
        case 'green': return themeColors.light.chipGreen;
        case 'white': return '#525965';
        default: return ODLTheme.colors.text.inverse;
      }
    } else {
      // High contrast mode - use high contrast colors for text
      return ODLTheme.colors.text.primary;
    }
  };

  // Get variant-specific colors from theme
  const getVariantColors = () => {
    if (error) {
      return {
        backgroundColor: colors.errorLight,
        color: ODLTheme.colors.text.primary,
      };
    }
    
    // For toggled state, return inverted colors
    if (isToggled && toggle) {
      switch (variant) {
        case 'blue':
          return { backgroundColor: colors.primaryMain, color: '#FFFFFF' };
        case 'pink':
          return { backgroundColor: '#E91E63', color: '#FFFFFF' };
        case 'red':
          return { backgroundColor: '#D32F2F', color: '#FFFFFF' };
        case 'orange':
          return { backgroundColor: '#F57C00', color: '#FFFFFF' };
        case 'yellow':
          return { backgroundColor: '#FBC02D', color: '#000000' };
        case 'olive':
          return { backgroundColor: '#689F38', color: '#FFFFFF' };
        case 'mint':
          return { backgroundColor: '#00897B', color: '#FFFFFF' };
        case 'brown':
          return { backgroundColor: '#6D4C41', color: '#FFFFFF' };
        case 'purple':
          return { backgroundColor: '#7B1FA2', color: '#FFFFFF' };
        case 'green':
          return { backgroundColor: colors.successMain, color: '#FFFFFF' };
        case 'white':
          return { backgroundColor: '#E0F3FE', color: '#32373f' };
        case 'success':
          return { backgroundColor: colors.successMain, color: '#FFFFFF' };
        case 'warning':
          return { backgroundColor: colors.warningMain, color: '#000000' };
        case 'info':
          return { backgroundColor: colors.primaryMain, color: '#FFFFFF' };
        case 'neutral':
        default:
          return { backgroundColor: colors.primaryMain, color: '#FFFFFF' };
      }
    }

    switch (variant) {
      case 'blue':
        return { backgroundColor: colors.chipBlue, color: getContrastingTextColor('blue') };
      case 'pink':
        return { backgroundColor: colors.chipPink, color: getContrastingTextColor('pink') };
      case 'red':
        return { backgroundColor: colors.chipRed, color: getContrastingTextColor('red') };
      case 'orange':
        return { backgroundColor: colors.chipOrange, color: getContrastingTextColor('orange') };
      case 'yellow':
        return { backgroundColor: colors.chipYellow, color: getContrastingTextColor('yellow') };
      case 'olive':
        return { backgroundColor: colors.chipOlive, color: getContrastingTextColor('olive') };
      case 'mint':
        return { backgroundColor: colors.chipMint, color: getContrastingTextColor('mint') };
      case 'brown':
        return { backgroundColor: colors.chipBrown, color: getContrastingTextColor('brown') };
      case 'purple':
        return { backgroundColor: colors.chipPurple, color: getContrastingTextColor('purple') };
      case 'green':
        return { backgroundColor: colors.chipGreen, color: getContrastingTextColor('green') };
      case 'white':
        return { 
          backgroundColor: colors.chipWhite, 
          color: '#525965',
          border: '1px solid #D1D1D1'
        };
      case 'success':
        return { backgroundColor: colors.successLight, color: ODLTheme.colors.text.primary };
      case 'warning':
        return { backgroundColor: colors.warningLight, color: ODLTheme.colors.text.primary };
      case 'info':
        return { backgroundColor: colors.info, color: ODLTheme.colors.text.primary };
      case 'neutral':
      default:
        return { backgroundColor: ODLTheme.colors.surface, color: ODLTheme.colors.text.primary };
    }
  };

  // Get ODL-compliant styles based on size and theme
  const getODLStyles = () => {
    const { backgroundColor, color, border } = getVariantColors();
    
    // Use ODL Typography and Spacing
    const sizeConfig = {
      sm: {
        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
        fontSize: ODLTheme.typography.fontSize.sm,
        gap: ODLTheme.spacing[1],
        iconSize: 12,
        height: '24px',
      },
      md: {
        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[3]}`,
        fontSize: ODLTheme.typography.fontSize.base,
        gap: ODLTheme.spacing[2],
        iconSize: 16,
        height: '28px',
      },
      lg: {
        padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
        fontSize: ODLTheme.typography.fontSize.md,
        gap: ODLTheme.spacing[2],
        iconSize: 20,
        height: '32px',
      },
    };

    const config = sizeConfig[size];

    return {
      // Layout & Display
      display: 'inline-flex',
      alignItems: 'center',
      gap: config.gap,
      padding: (isToggled && toggle) ? '4px 6px' : config.padding,
      height: config.height,
      
      // Typography (ODL Typography base/medium)
      fontFamily: ODLTheme.typography.fontFamily.sans,
      fontSize: config.fontSize,
      fontWeight: ODLTheme.typography.fontWeight.medium, // 500
      lineHeight: ODLTheme.typography.lineHeight.snug,
      
      // Colors
      backgroundColor: backgroundColor,
      color: disabled ? ODLTheme.colors.text.disabled : color,
      
      // Border & Shape
      borderRadius: ODLTheme.borders.radius.base, // 4px
      border: border || 'none',
      
      // Interaction
      cursor: isInteractive && !disabled ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : (isInteractive && isHovered && !disabled ? 0.8 : 1),
      transition: ODLTheme.transitions.base,
      
      // Text behavior
      whiteSpace: 'nowrap' as const,
      
      // Custom overrides
      ...style,
      
      // Icon size for child components
      '--chip-icon-size': `${config.iconSize}px`,
    } as React.CSSProperties & { '--chip-icon-size': string };
  };

  // Handle keyboard navigation with ODL interaction patterns
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
    if (e.key === 'Escape') {
      (e.currentTarget as HTMLElement).blur();
    }

    onKeyDown?.(e);
  };

  const handleClick = () => {
    if (disabled) return;
    
    if (toggle) {
      // Handle toggle mode
      const newToggleState = !isToggled;
      if (controlledToggled === undefined) {
        // Uncontrolled mode - update internal state
        setInternalToggled(newToggleState);
      }
      onToggle?.(newToggleState);
    } else if (clickable && onClick) {
      // Handle regular click mode
      onClick();
    }
  };

  const chipStyles = getODLStyles();
  const iconSize = chipStyles['--chip-icon-size'] ? parseInt(chipStyles['--chip-icon-size']) : 16;
  
  // Use contrasting color for icons (same as text)
  const getIconColor = () => {
    if (disabled) return ODLTheme.colors.text.disabled;
    if (error) return ODLTheme.colors.text.primary;
    
    // For non-error states, use the same contrasting color logic as text
    return getContrastingTextColor(variant);
  };
  
  const iconColor = getIconColor();

  return (
    <span
      className={className}
      style={chipStyles}
      role={toggle ? 'switch' : (clickable ? 'button' : 'status')}
      aria-label={ariaLabel || `${label} chip${isInteractive ? ', clickable' : ''}${toggle ? `, ${isToggled ? 'on' : 'off'}` : ''}`}
      aria-describedby={ariaDescribedBy}
      aria-checked={toggle ? isToggled : undefined}
      tabIndex={disabled ? -1 : isInteractive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Document icon */}
      {showDocumentIcon && (
        <Icon 
          name="document" 
          size={iconSize}
          color={iconColor}
        />
      )}
      
      {/* Custom icon */}
      {iconName && !showDocumentIcon && (
        <Icon 
          name={iconName} 
          size={iconSize}
          color={iconColor}
        />
      )}
      
      {/* Label text - using ODL Typography */}
      <span>{label}</span>
      
      {/* Info icon */}
      {showInfoIcon && (
        <Icon 
          name="information" 
          size={iconSize}
          color={iconColor}
        />
      )}
      
      {/* Close icon - shows when toggled */}
      {isToggled && toggle && (
        <Icon 
          name="close" 
          size={20}
          color={iconColor}
          style={{ marginLeft: '-2px' }}
        />
      )}
    </span>
  );
};

export default Chip; 