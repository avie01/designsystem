import React, { useEffect } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import { ODLTheme } from '../../styles/ODLTheme';
import Checkbox from '../Checkbox/Checkbox';
import IconButton from '../IconButton/IconButton';
import Icon from '../Icon/Icon';
import FileType, { FileTypeVariant } from '../FileType/FileType';
import './ThumbnailCards.css';

export type ThumbnailCardSize = 'small' | 'medium' | 'large';
export type ThumbnailCardVariant = 'file' | 'link';

export interface ThumbnailCardsProps {
  /** Size variant of the thumbnail card */
  size?: ThumbnailCardSize;
  /** Card variant: 'file' for documents, 'link' for web links */
  variant?: ThumbnailCardVariant;
  /** Thumbnail image source */
  thumbnailSrc?: string;
  /** Title of the card */
  title?: string;
  /** URL for link variant (displayed as subtitle and used for navigation) */
  url?: string;
  /** File type for the icon next to title (used in file variant) */
  fileType?: FileTypeVariant;
  /** Additional CSS classes */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Whether the card is selected */
  selected?: boolean;
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Whether the card is in loading state */
  loading?: boolean;
  /** Whether the checkbox is checked */
  checked?: boolean;
  /** Checkbox change handler */
  onCheckboxChange?: (checked: boolean) => void;
  /** Icon name for the ghost icon button */
  iconName?: string;
  /** Icon button click handler */
  onIconClick?: () => void;
  /** Whether to show the checkbox (default: true) */
  showCheckbox?: boolean;
}

const ThumbnailCards: React.FC<ThumbnailCardsProps> = ({
  size = 'large',
  variant = 'file',
  thumbnailSrc,
  title = 'Document Title',
  url,
  fileType = 'folder',
  className = '',
  onClick,
  selected = false,
  disabled = false,
  loading = false,
  checked = false,
  onCheckboxChange,
  iconName = 'overflow-menu-vertical',
  onIconClick,
  showCheckbox = true,
}) => {
  const { colors } = useTheme();
  // Size configurations
  const sizeConfig = {
    small: {
      width: '180px',
      height: '248px',
      padding: '16px',
      gap: '8px',
      thumbnailSize: '148px',
      titleFontSize: '14px',
    },
    medium: {
      width: '226px',
      height: '310px',
      padding: '16px',
      gap: '9px',
      thumbnailSize: '194px',
      titleFontSize: '15px',
    },
    large: {
      width: '272px',
      height: '372px',
      padding: '16px',
      gap: '10px',
      thumbnailSize: '240px',
      titleFontSize: '16px',
    },
  };

  const config = sizeConfig[size];

  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: config.width,
    height: config.height,
    padding: config.padding,
    gap: '4px',
    borderRadius: '4px',
    border: `1px solid ${colors.border}`,
    boxShadow: selected ? `inset 0 0 0 2px ${colors.primaryMain}` : 'none',
    background: loading
      ? colors.paper || '#FFFFFF'
      : disabled 
        ? colors.surfaceHover 
        : selected 
          ? colors.selectedLight
          : colors.background,
    cursor: loading || disabled ? 'not-allowed' : (onClick ? 'pointer' : 'default'),
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
  };

  const hoverStyle: React.CSSProperties = {
    ...cardStyle,
    border: selected 
      ? `2px solid ${colors.primaryMain}` 
      : `1px solid ${colors.grey500}`,
    background: colors.surfaceHover,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // Inject dynamic theme colors for loading state skeleton elements
  useEffect(() => {
    // Calculate skeleton colors based on theme
    const skeletonBase = colors.grey300 || colors.surface || '#F5F5F5';
    const skeletonHighlight = colors.grey400 || colors.surfaceHover || '#E8E8E8';
    const loadingBg = colors.paper || '#FFFFFF';
    
    // Set CSS custom properties for theme-aware loading state
    const root = document.documentElement;
    root.style.setProperty('--thumbnail-loading-bg', loadingBg);
    root.style.setProperty('--thumbnail-skeleton-base', skeletonBase);
    root.style.setProperty('--thumbnail-skeleton-highlight', skeletonHighlight);
    
    // Determine if we're in dark mode for shimmer effect
    const paperColor = typeof colors.paper === 'string' ? colors.paper : '#FFFFFF';
    const isDark = paperColor.toLowerCase().startsWith('#') && 
                   parseInt(paperColor.slice(1), 16) < 0x808080;
    const shimmerOpacity = isDark ? 0.3 : 0.8;
    
    // Update shimmer overlay color
    const styleId = 'thumbnail-loading-shimmer';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      .thumbnail-card--loading::after {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, ${shimmerOpacity}) 50%,
          transparent 100%
        ) !important;
      }
      .thumbnail-card--loading .ghost.sizer {
        background: linear-gradient(
          90deg,
          ${skeletonBase} 0%,
          ${skeletonHighlight} 50%,
          ${skeletonBase} 100%
        ) !important;
        background-size: 200% 100% !important;
      }
    `;
  }, [colors]);

  const thumbnailStyle: React.CSSProperties = {
    width: config.thumbnailSize,
    height: variant === 'link' ? '100%' : (size === 'small' ? '120px' : size === 'medium' ? '180px' : '240px'),
    borderRadius: '4px',
    backgroundColor: colors.surfaceHover,
    backgroundImage: thumbnailSrc ? `url(${thumbnailSrc})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    flexShrink: variant === 'link' ? 1 : 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: colors.textMuted,
    marginLeft: '0',
    marginRight: '0',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: '4px',
  };

  const imageContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: variant === 'link' ? 'stretch' : 'center',
    width: '100%',
    marginBottom: variant === 'link' ? '8px' : '16px',
    flex: variant === 'link' ? 1 : undefined,
    minHeight: 0,
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    textAlign: 'left',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: '16px', // base size
    fontWeight: 500, // medium
    color: disabled ? colors.textDisabled : colors.textPrimary,
    margin: 0,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const handleClick = () => {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled && !loading && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // Loading state
  if (loading) {
    return (
      <div
        style={cardStyle}
        className={className}
        role="article"
        aria-label={`Loading ${title}...`}
      >
        {/* Header with skeleton elements */}
        <div style={headerStyle}>
          {showCheckbox && (
            <div
              className="skeleton-box"
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '4px',
              }}
            />
          )}
          <div
            className="skeleton-box"
            style={{
              width: size === 'small' ? '28px' : size === 'large' ? '44px' : '36px',
              height: size === 'small' ? '28px' : size === 'large' ? '44px' : '36px',
              borderRadius: '100px',
              marginLeft: showCheckbox ? 0 : 'auto',
            }}
          />
        </div>

        {/* Image skeleton */}
        <div style={imageContainerStyle}>
          <div 
            className="skeleton-box"
            style={{
              ...thumbnailStyle,
              backgroundColor: colors.surfaceHover,
              borderRadius: '4px',
            }} 
          />
        </div>

        {/* Content skeleton */}
        <div style={contentStyle}>
          <div 
            className="skeleton-box"
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '4px',
              flexShrink: 0,
            }} 
          />
          <div 
            className="skeleton-box"
            style={{
              height: '20px',
              borderRadius: '4px',
              flex: 1,
            }} 
          />
        </div>

        {/* Shimmer animation styles */}
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -468px 0;
            }
            100% {
              background-position: 468px 0;
            }
          }
          
          .skeleton-box {
            background-image: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 468px 104px;
            animation: shimmer 1.5s infinite;
            overflow: hidden;
          }
        `}</style>
      </div>
    );
  }

  // Generate component classes
  const componentClasses = [
    className,
    loading ? 'thumbnail-card--loading' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      style={isHovered && !disabled && !loading ? hoverStyle : cardStyle}
      className={componentClasses}
      onMouseEnter={() => !loading && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
      aria-label={`${title}${selected ? ', selected' : ''}${disabled ? ', disabled' : ''}${loading ? ', loading' : ''}`}
      aria-describedby={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-content`}
    >
      {/* Header with Checkbox and Icon Button */}
      <div style={headerStyle}>
        {loading ? (
          <>
            {showCheckbox && <div className="ghost sizer" style={{ width: '24px', height: '24px' }}></div>}
            <div className="ghost sizer" style={{ width: '32px', height: '32px', marginLeft: showCheckbox ? 0 : 'auto' }}></div>
          </>
        ) : (
          <>
            {showCheckbox && (
              <Checkbox
                checked={checked || selected}
                onChange={onCheckboxChange}
                disabled={disabled}
                size="lg"
                aria-label={`Select ${title}`}
              />
            )}
            <IconButton
              icon={iconName}
              variant="ghost"
              size={size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'}
              onClick={onIconClick}
              disabled={disabled}
              aria-label={`More options for ${title}`}
              style={!showCheckbox ? { marginLeft: 'auto' } : undefined}
            />
          </>
        )}
      </div>

      {/* Image Container */}
      <div style={imageContainerStyle}>
        {loading ? (
          <div className="ghost sizer" style={{ 
            width: config.thumbnailSize, 
            height: size === 'small' ? '120px' : size === 'medium' ? '180px' : '240px' 
          }}></div>
        ) : (
          <div style={thumbnailStyle}>
            {!thumbnailSrc && variant === 'link' ? (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: '4px' }}
                role="img"
                aria-label="Website preview"
              >
                <rect width="100" height="100" fill="#F8F9FA"/>
                <rect x="5" y="5" width="90" height="12" fill="#E9ECEF" rx="2"/>
                <circle cx="12" cy="11" r="3" fill="#DEE2E6"/>
                <circle cx="22" cy="11" r="3" fill="#DEE2E6"/>
                <circle cx="32" cy="11" r="3" fill="#DEE2E6"/>
                <rect x="40" y="8" width="50" height="6" fill="#DEE2E6" rx="3"/>
                <rect x="5" y="22" width="90" height="73" fill="#FFFFFF" stroke="#E9ECEF" strokeWidth="1"/>
                <rect x="10" y="30" width="35" height="20" fill="#E9ECEF" rx="2"/>
                <rect x="50" y="30" width="40" height="4" fill="#DEE2E6" rx="1"/>
                <rect x="50" y="38" width="35" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="50" y="44" width="30" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="58" width="80" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="65" width="75" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="72" width="70" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="82" width="25" height="8" fill={colors.primaryMain || '#4A90E2'} rx="2"/>
              </svg>
            ) : !thumbnailSrc ? (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: '4px' }}
                role="img"
                aria-label="Document preview"
              >
                <rect width="100" height="100" fill="#F8F9FA"/>
                <rect x="10" y="15" width="80" height="3" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="22" width="70" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="27" width="75" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="32" width="65" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="37" width="80" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="42" width="60" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="50" width="75" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="55" width="70" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="60" width="65" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="65" width="80" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="70" width="55" height="2" fill="#E9ECEF" rx="1"/>
                <rect x="10" y="78" width="30" height="8" fill="#DEE2E6" rx="2"/>
                <rect x="45" y="78" width="25" height="8" fill="#DEE2E6" rx="2"/>
              </svg>
            ) : null}
          </div>
        )}
      </div>

      {/* Content Below Image */}
      <div
        id={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-content`}
        style={variant === 'link' ? { ...contentStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '4px' } : contentStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={onClick && !disabled && !loading ? 0 : -1}
        role={onClick ? 'button' : undefined}
        aria-disabled={disabled || loading}
        aria-label={onClick ? `Open ${title}` : undefined}
      >
        {loading ? (
          <>
            <div className="ghost sizer" style={{ width: '24px', height: '24px' }}></div>
            <div className="ghost sizer" style={{ width: '150px', height: '16px' }}></div>
          </>
        ) : variant === 'link' ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
              <Icon name="link" size={20} color={colors.primaryMain} aria-hidden="true" />
              <h4 style={titleStyle} id={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</h4>
            </div>
            {url && (
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: colors.textSecondary,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%',
                  fontFamily: 'var(--font-family-noto)',
                }}
              >
                {url}
              </p>
            )}
          </>
        ) : (
          <>
            <FileType type={fileType} size={24} aria-hidden="true" />
            <h4 style={titleStyle} id={`thumbnail-${title?.replace(/\s+/g, '-').toLowerCase()}-title`}>{title}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default ThumbnailCards;