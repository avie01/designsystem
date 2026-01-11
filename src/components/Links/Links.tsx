import React from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import './Links.css';
import Icon from '../Icon/Icon';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Simple chevron icon component
const ChevronIcon: React.FC<{ className?: string; color?: string }> = ({ className, color }) => (
  <svg
    className={className || 'links__separator-icon'}
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
  light: 'links--light',
  dark: 'links--dark',
  primary: 'links--primary',
};

// Icon size presets based on links size
const ICON_SIZES: { [key: string]: number } = {
  xs: 12,
  sm: 14,
  base: 16,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  // Legacy support
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

export interface LinkItem {
  label: string;
  path?: string;
  /** Icon to display - can be a Carbon icon name string (e.g., 'cloud') or a React component (e.g., <Cloud />) */
  icon?: React.ReactNode | string;
}

export interface LinksProps {
  /** Array of link items */
  items: LinkItem[];
  /** Callback when link item is clicked */
  onNavigate?: (path: string) => void;
  /** Separator between link items */
  separator?: string | React.ReactNode;
  /** Preset separator style: 'chevron', 'slash', 'arrow', 'pipe', 'dot', 'colon', 'dash' */
  separatorStyle?: keyof typeof SEPARATOR_STYLES;
  /** Size variant: 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl' */
  size?: 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /** Font weight: 400, 500, 600, 800 */
  fontWeight?: 400 | 500 | 600 | 800;
  /** Link type variant: 'default' | 'list' | 'public' | 'popup' */
  linkType?: 'default' | 'list' | 'public' | 'popup';
  /** Spacing variant: 'compact', 'comfortable', 'spacious' */
  spacing?: keyof typeof SPACING_VARIANTS;
  /** Color scheme: 'light', 'dark', 'primary' */
  colorScheme?: keyof typeof COLOR_SCHEMES;
  /** Icon size - auto-scales with links size, or specify custom number */
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

const Links: React.FC<LinksProps> = ({
  items,
  onNavigate,
  separator,
  separatorStyle = 'chevron',
  size = 'base',
  fontWeight = 400,
  linkType = 'default',
  spacing = 'comfortable',
  colorScheme,
  iconSize = 'auto',
  iconStyle = 'default',
  showSeparator = true,
  className,
  style,
}) => {
  const { colors } = useTheme();
  const handleClick = (item: LinkItem) => {
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

  const sizeClass = size !== 'base' ? `links--${size}` : '';
  const colorSchemeClass = colorScheme ? COLOR_SCHEMES[colorScheme] : '';
  const linkTypeClass = `links--${linkType}`;
  const spacingStyles = SPACING_VARIANTS[spacing];

  // Resolve icon size
  const resolvedIconSize = iconSize === 'auto' ? (ICON_SIZES[size] || ICON_SIZES.base) : (typeof iconSize === 'number' ? iconSize : ICON_SIZES.base);
  const iconStyleProps = ICON_STYLES[iconStyle];

  // Default color: #32373f (use dynamic theme if available, otherwise fallback)
  const defaultLinksColor = (colors as any).textPrimaryNight || '#32373f';
  
  // Get effective color based on link type
  const getLinkColor = () => {
    if (linkType === 'public') {
      return colors.primaryMain || '#3560C1';
    }
    return defaultLinksColor;
  };
  
  const effectiveLinkColor = getLinkColor();

  // Get effective font weight based on link type
  const effectiveFontWeight = linkType === 'list' ? 600 : fontWeight;

  // Get dynamic styles based on theme and color scheme
  const getDynamicStyles = () => {
    // Map typography sizes to font sizes
    const fontSizeMap: { [key: string]: string } = {
      xs: colors.fontSize?.xs || '11px',
      sm: colors.fontSize?.sm || '12px',
      base: colors.fontSize?.base || '14px',
      md: colors.fontSize?.md || '16px',
      lg: colors.fontSize?.lg || '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '40px',
      // Legacy support
      small: colors.fontSize?.xs || '12px',
      default: colors.fontSize?.sm || '14px',
      large: colors.fontSize?.base || '16px',
    };

    const baseFontSize = fontSizeMap[size] || fontSizeMap.base;
    
    let linksColor = defaultLinksColor;
    let backgroundColor = 'transparent';
    let linksPadding = `${colors.spacing[2]} ${colors.spacing[3]}`;

    // Apply color scheme overrides
    if (colorScheme === 'dark') {
      backgroundColor = colors.grey300;
      linksColor = colors.textPrimary;
      linksPadding = colors.spacing[2];
    } else if (colorScheme === 'primary') {
      backgroundColor = colors.secondaryLight;
      linksColor = colors.primaryMain;
      linksPadding = colors.spacing[2];
    }

    return {
      display: 'flex',
      alignItems: 'center',
      gap: spacingStyles.gap,
      fontFamily: '"Noto Sans", sans-serif',
      fontSize: baseFontSize,
      fontWeight: effectiveFontWeight,
      color: linksColor,
      backgroundColor,
      padding: linksPadding,
      borderRadius: backgroundColor !== 'transparent' ? '4px' : '0',
      ...style,
    };
  };

  return (
    <nav
      className={classNames('links', sizeClass, colorSchemeClass, linkTypeClass, className)}
      style={getDynamicStyles()}
      aria-label="Links"
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && showSeparator && (
            typeof resolvedSeparator === 'string' ? (
              <span 
                className="links__separator"
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
            className="links__item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: colors.spacing[1],
            }}
          >
            {item.icon && (
              <span 
                className="links__icon"
                style={{
                  width: `${resolvedIconSize}px`,
                  height: `${resolvedIconSize}px`,
                  flexShrink: 0,
                  color: defaultLinksColor,
                }}
              >
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<any>, {
                      size: resolvedIconSize,
                      ...iconStyleProps,
                    })
                  : typeof item.icon === 'string'
                  ? <Icon name={item.icon} size={resolvedIconSize} color={defaultLinksColor} {...iconStyleProps} />
                  : item.icon}
              </span>
            )}
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                className="links__link"
                aria-current={index === items.length - 1 ? 'page' : undefined}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  color: index === items.length - 1 
                    ? colors.textPrimary 
                    : (colorScheme === 'primary' ? colors.primaryMain : effectiveLinkColor),
                  cursor: 'pointer',
                  fontSize: 'inherit',
                  fontFamily: 'inherit',
                  fontWeight: effectiveFontWeight,
                  textDecoration: 'none',
                  transition: 'color 0.15s ease',
                  position: 'relative',
                  borderRadius: '2px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = colors.primaryHover;
                  if (linkType !== 'list') {
                    e.currentTarget.style.textDecoration = 'underline';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = index === items.length - 1 
                    ? colors.textPrimary 
                    : (colorScheme === 'primary' ? colors.primaryMain : effectiveLinkColor);
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
                  'links__text',
                  index === items.length - 1 && 'links__text--current'
                )}
                style={{
                  color: index === items.length - 1 ? colors.textPrimary : effectiveLinkColor,
                  fontWeight: effectiveFontWeight,
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

export default Links;
