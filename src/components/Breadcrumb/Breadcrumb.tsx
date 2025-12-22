import React from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import './Breadcrumb.css';
import Icon from '../Icon/Icon';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Simple chevron icon component
const ChevronIcon: React.FC<{ className?: string; color?: string }> = ({ className, color }) => (
  <svg
    className={className || 'breadcrumb__separator-icon'}
    fill="none"
    stroke={color || "currentColor"}
    viewBox="0 0 24 24"
    style={{
      width: '12px',
      height: '12px',
      color: color || 'currentColor',
    }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

// Preset separator styles
const SEPARATOR_STYLES: { [key: string]: string | React.ReactNode } = {
  chevron: <ChevronIcon />,
  slash: '/',
  arrow: '→',
  pipe: '|',
  doubleChevron: '»',
  dot: '•',
  colon: ':',
  dash: '−',
};

// Preset spacing variants
const SPACING_VARIANTS: { [key: string]: { gap: string; padding: string } } = {
  compact: { gap: '4px', padding: '4px 0' },
  comfortable: { gap: '8px', padding: '8px 0' },
  spacious: { gap: '12px', padding: '12px 0' },
};

// Preset color schemes
const COLOR_SCHEMES: { [key: string]: string } = {
  light: 'breadcrumb--light',
  dark: 'breadcrumb--dark',
  primary: 'breadcrumb--primary',
};

// Icon size presets based on breadcrumb size
const ICON_SIZES: { [key: string]: number } = {
  small: 14,
  default: 16,
  large: 18,
};

// Icon style variants (for Carbon icons)
const ICON_STYLES: { [key: string]: { filled?: boolean; outline?: boolean } } = {
  outline: { outline: true },
  filled: { filled: true },
  default: {},
};

export interface BreadcrumbItem {
  label: string;
  path?: string;
  /** Icon to display - can be a Carbon icon name string (e.g., 'cloud') or a React component (e.g., <Cloud />) */
  icon?: React.ReactNode | string;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Callback when breadcrumb item is clicked */
  onNavigate?: (path: string) => void;
  /** Separator between breadcrumb items */
  separator?: string | React.ReactNode;
  /** Preset separator style: 'chevron', 'slash', 'arrow', 'pipe', 'doubleChevron', 'dot', 'colon', 'dash' */
  separatorStyle?: keyof typeof SEPARATOR_STYLES;
  /** Size variant: 'small', 'default', 'large' */
  size?: 'small' | 'default' | 'large';
  /** Spacing variant: 'compact', 'comfortable', 'spacious' */
  spacing?: keyof typeof SPACING_VARIANTS;
  /** Color scheme: 'light', 'dark', 'primary' */
  colorScheme?: keyof typeof COLOR_SCHEMES;
  /** Icon size - auto-scales with breadcrumb size, or specify custom number */
  iconSize?: 'auto' | number;
  /** Icon style variant: 'outline', 'filled', 'default' */
  iconStyle?: keyof typeof ICON_STYLES;
  /** Show separator between items */
  showSeparator?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  onNavigate,
  separator,
  separatorStyle = 'chevron',
  size = 'default',
  spacing = 'comfortable',
  colorScheme,
  iconSize = 'auto',
  iconStyle = 'default',
  showSeparator = true,
  className,
  style,
}) => {
  const { colors } = useTheme();
  const handleClick = (item: BreadcrumbItem) => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  // Use explicit separator prop if provided, otherwise use separatorStyle
  const resolvedSeparator = separator !== undefined 
    ? separator 
    : separatorStyle === 'chevron' 
      ? <ChevronIcon color={colors.textMuted} />
      : SEPARATOR_STYLES[separatorStyle];

  const sizeClass = size !== 'default' ? `breadcrumb--${size}` : '';
  const colorSchemeClass = colorScheme ? COLOR_SCHEMES[colorScheme] : '';
  const spacingStyles = SPACING_VARIANTS[spacing];

  // Resolve icon size
  const resolvedIconSize = iconSize === 'auto' ? ICON_SIZES[size] : (typeof iconSize === 'number' ? iconSize : ICON_SIZES.default);
  const iconStyleProps = ICON_STYLES[iconStyle];

  // Get dynamic styles based on theme and color scheme
  const getDynamicStyles = () => {
    const baseFontSize = {
      small: colors.fontSize?.xs || '12px',
      default: colors.fontSize?.sm || '14px',
      large: colors.fontSize?.base || '16px'
    };

    let breadcrumbColor = colors.textSecondary;
    let backgroundColor = 'transparent';
    let breadcrumbPadding = `${colors.spacing[2]} ${colors.spacing[3]}`;

    // Apply color scheme overrides
    if (colorScheme === 'dark') {
      backgroundColor = colors.grey300;
      breadcrumbColor = colors.textPrimary;
      breadcrumbPadding = colors.spacing[2];
    } else if (colorScheme === 'primary') {
      backgroundColor = colors.secondaryLight;
      breadcrumbColor = colors.primaryMain;
      breadcrumbPadding = colors.spacing[2];
    }

    return {
      display: 'flex',
      alignItems: 'center',
      gap: spacingStyles.gap,
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: baseFontSize[size],
      color: breadcrumbColor,
      backgroundColor,
      padding: breadcrumbPadding,
      borderRadius: backgroundColor !== 'transparent' ? '4px' : '0',
      ...style,
    };
  };

  return (
    <nav
      className={classNames('breadcrumb', sizeClass, colorSchemeClass, className)}
      style={getDynamicStyles()}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && showSeparator && (
            typeof resolvedSeparator === 'string' ? (
              <span 
                className="breadcrumb__separator"
                style={{
                  color: colors.textMuted,
                  margin: `0 ${colors.spacing[2]}`,
                }}
              >
                {resolvedSeparator}
              </span>
            ) : (
              <span style={{ color: colors.textMuted }}>
                {resolvedSeparator}
              </span>
            )
          )}
          <div 
            className="breadcrumb__item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: colors.spacing[1],
            }}
          >
            {item.icon && (
              <span 
                className="breadcrumb__icon"
                style={{
                  width: `${resolvedIconSize}px`,
                  height: `${resolvedIconSize}px`,
                  flexShrink: 0,
                  color: colors.textSecondary,
                }}
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<any>, {
                      size: resolvedIconSize,
                      ...iconStyleProps,
                    })
                  : typeof item.icon === 'string'
                  ? <Icon name={item.icon} size={resolvedIconSize} color={colors.textSecondary} {...iconStyleProps} />
                  : item.icon}
              </span>
            )}
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                className="breadcrumb__link"
                aria-current={index === items.length - 1 ? 'page' : undefined}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: colorScheme === 'primary' ? colors.primaryMain : colors.primaryMain,
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  position: 'relative',
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primaryLight;
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = colorScheme === 'primary' ? colors.primaryMain : colors.primaryMain;
                  e.currentTarget.style.textDecoration = 'none';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.outline = `2px solid ${colors.primaryMain}`;
                  e.currentTarget.style.outlineOffset = '2px';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.outline = 'none';
                }}
              >
                {item.label}
              </button>
            ) : (
              <span 
                className={classNames(
                  'breadcrumb__text',
                  index === items.length - 1 && 'breadcrumb__text--current'
                )}
                style={{
                  color: index === items.length - 1 ? colors.textPrimary : colors.textSecondary,
                  fontWeight: index === items.length - 1 ? 500 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb; 