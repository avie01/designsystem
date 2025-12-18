import React from 'react';
import './Breadcrumb.css';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Preset separator styles
const SEPARATOR_STYLES: { [key: string]: string | React.ReactNode } = {
  chevron: <Icon name="chevron-right" size={parseInt(ODLTheme.spacing[4])} className="breadcrumb__separator-icon" aria-hidden="true" />,
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
  compact: { gap: ODLTheme.spacing[1], padding: `${ODLTheme.spacing[1]} 0` },
  comfortable: { gap: ODLTheme.spacing[2], padding: `${ODLTheme.spacing[2]} 0` },
  spacious: { gap: ODLTheme.spacing[3], padding: `${ODLTheme.spacing[3]} 0` },
};

// Preset color schemes
const COLOR_SCHEMES: { [key: string]: string } = {
  light: 'breadcrumb--light',
  dark: 'breadcrumb--dark',
  primary: 'breadcrumb--primary',
};

// Icon size presets based on breadcrumb size
const ICON_SIZES: { [key: string]: number } = {
  small: parseInt(ODLTheme.spacing[3]),
  default: parseInt(ODLTheme.spacing[4]),
  large: parseInt(ODLTheme.spacing[4]),
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
  /** Aria label for the navigation landmark - defaults to 'Breadcrumb' */
  ariaLabel?: string;
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
  ariaLabel = 'Breadcrumb',
}) => {
  const handleClick = (item: BreadcrumbItem) => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  // Use explicit separator prop if provided, otherwise use separatorStyle
  const resolvedSeparator = separator !== undefined ? separator : SEPARATOR_STYLES[separatorStyle];

  const sizeClass = size !== 'default' ? `breadcrumb--${size}` : '';
  const colorSchemeClass = colorScheme ? COLOR_SCHEMES[colorScheme] : '';
  const spacingStyles = SPACING_VARIANTS[spacing];

  // Resolve icon size
  const resolvedIconSize = iconSize === 'auto' ? ICON_SIZES[size] : (typeof iconSize === 'number' ? iconSize : ICON_SIZES.default);
  const iconStyleProps = ICON_STYLES[iconStyle];

  return (
    <nav
      className={classNames('breadcrumb', sizeClass, colorSchemeClass, className)}
      style={{
        gap: spacingStyles.gap,
        padding: spacingStyles.padding,
        ...style,
      }}
      aria-label={ariaLabel}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && showSeparator && (
            typeof resolvedSeparator === 'string' ? (
              <span className="breadcrumb__separator">{resolvedSeparator}</span>
            ) : (
              resolvedSeparator
            )
          )}
          <div className="breadcrumb__item">
            {item.icon && (
              <span className="breadcrumb__icon">
                {React.isValidElement(item.icon)
                  ? React.cloneElement(item.icon as React.ReactElement<any>, {
                      size: resolvedIconSize,
                      ...iconStyleProps,
                    })
                  : typeof item.icon === 'string'
                  ? <Icon name={item.icon} size={resolvedIconSize} {...iconStyleProps} />
                  : item.icon}
              </span>
            )}
            {item.path && onNavigate ? (
              <button
                onClick={() => handleClick(item)}
                className="breadcrumb__link"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </button>
            ) : (
              <span className={classNames(
                'breadcrumb__text',
                index === items.length - 1 && 'breadcrumb__text--current'
              )}>
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