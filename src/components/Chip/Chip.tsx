import React, { useState } from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';

// Define the base colors for each chip variant
const baseChipColors = {
  blue: { light: '#E5F5FE', dark: '#082A78' },
  pink: { light: '#F7E2F9', dark: '#9C27B0' },
  red: { light: '#F8E8EA', dark: '#C2185B' },
  orange: { light: '#FCEEDA', dark: '#C93713' },
  yellow: { light: '#FFFBCE', dark: '#A15202' },
  olive: { light: '#DAE3BF', dark: '#54622C' },
  mint: { light: '#D0FAF7', dark: '#1F787A' },
  brown: { light: '#E1D5C7', dark: '#4F3E34' },
  purple: { light: '#D6C8F6', dark: '#381A93' },
  green: { light: '#E4F7E4', dark: '#31622C' },
  neutral: { light: '#EDF1F5', dark: '#525965' },
};

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
  const { theme, colors } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [internalToggled, setInternalToggled] = useState(false);

  // Use controlled mode if toggled prop is provided, otherwise use internal state
  const isToggled = controlledToggled !== undefined ? controlledToggled : internalToggled;
  const isInteractive = clickable || toggle;

  // Get chip colors based on current theme mode
  const getChipColors = (chipVariant: string) => {
    const colorDef = baseChipColors[chipVariant as keyof typeof baseChipColors];
    
    if (!colorDef) {
      // Fallback for non-color variants
      return {
        bg: theme === 'dark' ? colors.surfaceDark : colors.surface,
        text: theme === 'dark' ? colors.textInverse : colors.textPrimary
      };
    }
    
    // High contrast mode - always use light background with black text
    if (theme === 'highContrast') {
      return {
        bg: colorDef.light,
        text: '#000000'
      };
    }
    
    // Light Mode: Light background + Dark text
    if (theme === 'light') {
      return {
        bg: colorDef.light,  // e.g., #E5F5FE
        text: colorDef.dark  // e.g., #082A78
      };
    }
    
    // Dark Mode: Dark background + Light text  
    return {
      bg: colorDef.dark,   // e.g., #082A78
      text: colorDef.light // e.g., #E5F5FE
    };
  };

  // Get variant-specific colors from theme
  const getVariantColors = () => {
    if (error) {
      return {
        backgroundColor: colors.errorLight,
        color: colors.textPrimary,
      };
    }
    
    // For toggled state, use specific active background with theme support
    if (isToggled && toggle) {
      // Theme-aware active background color
      const activeBackground = theme === 'dark' ? '#48494B' : (theme === 'highContrast' ? '#E0F3FE' : '#E0F3FE');
      const activeTextColor = theme === 'dark' ? '#E0F3FE' : (theme === 'highContrast' ? '#000000' : '#32373F');
      
      return { 
        backgroundColor: activeBackground,
        color: activeTextColor
      };
    }

    // Handle color variants with new theme-based colors
    if (['blue', 'pink', 'red', 'orange', 'yellow', 'olive', 'mint', 'brown', 'purple', 'green', 'neutral'].includes(variant)) {
      const chipColorSet = getChipColors(variant);
      return { 
        backgroundColor: chipColorSet.bg, 
        color: chipColorSet.text 
      };
    }

    // Handle other variants
    switch (variant) {
      case 'white':
        return { 
          backgroundColor: colors.paper, 
          color: colors.textPrimary,
          border: `1px solid ${colors.border}`
        };
      case 'success':
        return { backgroundColor: colors.successLight, color: colors.textPrimary };
      case 'warning':
        return { backgroundColor: colors.warningLight, color: colors.textPrimary };
      case 'info':
        return { backgroundColor: colors.infoLight, color: colors.textPrimary };
      default:
        return { backgroundColor: colors.surface, color: colors.textSecondary };
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
  
  // Get the actual text color from variant colors (includes toggle state)
  const variantColors = getVariantColors();
  const iconColor = disabled ? ODLTheme.colors.text.disabled : variantColors.color;

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