import React, { useEffect } from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import { ODLTheme } from '../../styles/ODLTheme';
import FileType from '../FileType/FileType';
import IconButton from '../IconButton/IconButton';
import './DashboardCards.css';

export interface DashboardCardProps {
  /** Main value or metric to display */
  value: string | number;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Optional icon name from Carbon icons */
  icon?: string;
  /** Card variant style */
  variant?: 'default' | 'compact' | 'detailed';
  /** Additional actions or buttons */
  actions?: React.ReactNode;
  /** Click handler for the entire card */
  onClick?: () => void;
  /** Whether the card is in loading state */
  loading?: boolean;
  /** Custom modification text */
  modifiedText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const DashboardCards: React.FC<DashboardCardProps> = ({
  value,
  subtitle,
  icon,
  variant = 'default',
  actions,
  onClick,
  loading = false,
  modifiedText = 'Modified on 10 Feb 2026 by Andrew Miralles',
  className = '',
  style
}) => {
  const { colors } = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isValueHovered, setIsValueHovered] = React.useState(false);
  const isClickable = !!onClick;

  // Inject dynamic theme colors for loading state skeleton elements
  useEffect(() => {
    // Calculate skeleton colors based on theme
    const skeletonBase = colors.grey300 || colors.surface || '#F5F5F5';
    const skeletonHighlight = colors.grey400 || colors.surfaceHover || '#E8E8E8';
    const loadingBg = colors.paper || '#FFFFFF';
    
    // Set CSS custom properties for theme-aware loading state
    const root = document.documentElement;
    root.style.setProperty('--dashboard-loading-bg', loadingBg);
    root.style.setProperty('--dashboard-skeleton-base', skeletonBase);
    root.style.setProperty('--dashboard-skeleton-highlight', skeletonHighlight);
    
    // Determine if we're in dark mode for shimmer effect
    const paperColor = typeof colors.paper === 'string' ? colors.paper : '#FFFFFF';
    const isDark = paperColor.toLowerCase().startsWith('#') && 
                   parseInt(paperColor.slice(1), 16) < 0x808080;
    const shimmerOpacity = isDark ? 0.3 : 0.8;
    
    // Update shimmer overlay color
    const styleId = 'dashboard-loading-shimmer';
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = `
      .dashboard-card--loading::after {
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, ${shimmerOpacity}) 50%,
          transparent 100%
        ) !important;
      }
      .dashboard-card--loading .ghost.sizer {
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

  // Base card styles with exact specifications
  const cardStyles: React.CSSProperties = {
    display: 'flex',
    width: '431.5px',
    height: '180px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    border: isPressed ? `1px solid ${colors.primaryMain}` : `1px solid ${colors.border}`,
    backgroundColor: loading
      ? colors.paper || '#FFFFFF'
      : isPressed ? colors.selectedLight : (isHovered ? colors.surfaceHover : colors.background),
    padding: '12px',
    transition: 'all 0.2s ease-in-out',
    cursor: loading ? 'not-allowed' : (isClickable ? 'pointer' : 'default'),
    position: 'relative',
    overflow: 'hidden',
    fontFamily: ODLTheme.typography.fontFamily.sans,
    ...style
  };



  // Generate component classes
  const componentClasses = [
    className,
    loading ? 'dashboard-card--loading' : '',
  ].filter(Boolean).join(' ');

  if (loading) {
    return (
      <div 
        className={componentClasses}
        style={{
          ...cardStyles
        }}
      >
        {/* Header with icon and actions - ghost animation */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: variant === 'compact' ? ODLTheme.spacing[2] : ODLTheme.spacing[3],
          width: '100%'
        }}>
          {/* Left side - FileType skeleton */}
          <div className="ghost sizer" style={{
            width: '36px',
            height: '36px',
            borderRadius: '4px'
          }} />
          
          {/* Right side - IconButton skeleton */}
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <div className="ghost sizer" style={{
              width: '36px',
              height: '36px',
              borderRadius: '100px'
            }} />
            {/* Additional actions skeleton if needed */}
            {actions && (
              <div className="ghost sizer" style={{
                width: '36px',
                height: '36px',
                borderRadius: '100px'
              }} />
            )}
          </div>
        </div>

        {/* Main value skeleton */}
        <div style={{
          marginBottom: variant === 'detailed' ? ODLTheme.spacing[3] : ODLTheme.spacing[2]
        }}>
          <div className="ghost sizer" style={{
            height: '24px',
            borderRadius: '4px',
            width: '280px',
            lineHeight: '24px'
          }} />
          {/* Subtitle skeleton - matching the long description */}
          {subtitle && (
            <div>
              <div className="ghost sizer" style={{
                height: '16px',
                borderRadius: '4px',
                marginBottom: '4px',
                width: '100%',
                lineHeight: '16px'
              }} />
              <div className="ghost sizer" style={{
                height: '16px',
                borderRadius: '4px',
                marginBottom: '4px',
                width: '100%',
                lineHeight: '16px'
              }} />
              <div className="ghost sizer" style={{
                height: '16px',
                borderRadius: '4px',
                width: '75%',
                lineHeight: '16px'
              }} />
            </div>
          )}
        </div>

        {/* Modified information skeleton - Fixed at bottom */}
        <div className="ghost sizer" style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          height: '14px',
          borderRadius: '4px',
          width: '320px',
          lineHeight: '14px'
        }} />
      </div>
    );
  }

  // Don't make the card a button if it contains interactive children (IconButton, actions)
  // This prevents nested interactive controls accessibility violation
  const hasInteractiveChildren = true; // Always has IconButton
  const shouldBeButton = isClickable && !loading && !hasInteractiveChildren;

  return (
    <div 
      className={componentClasses}
      style={cardStyles}
      onClick={loading ? undefined : onClick}
      onMouseEnter={() => !loading && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !loading && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        // Only handle keyboard if card is clickable and event didn't come from interactive child
        if (isClickable && !loading && (e.key === 'Enter' || e.key === ' ') && 
            !(e.target as HTMLElement).closest('button, [role="button"]')) {
          e.preventDefault();
          onClick?.();
        }
      }}
      role={shouldBeButton ? 'button' : undefined}
      tabIndex={shouldBeButton ? 0 : undefined}
      aria-label={isClickable && !loading ? `Dashboard card: ${value}` : undefined}
    >
      {/* Header with icon and actions */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: variant === 'compact' ? ODLTheme.spacing[2] : ODLTheme.spacing[3],
        width: '100%'
      }}>
        {/* Left side - FileType */}
        <FileType type="folder" size={36} />
        
        {/* Right side - IconButton and additional actions */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <IconButton 
            icon="overflow-menu-horizontal"
            variant="ghost"
            size="medium"
            aria-label="More options"
          />
          {actions}
        </div>
      </div>

      {/* Main value */}
      <div style={{
        marginBottom: variant === 'detailed' ? ODLTheme.spacing[3] : ODLTheme.spacing[2]
      }}>
        <div 
          style={{
            fontSize: ODLTheme.typography.fontSize.md,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: isValueHovered ? colors.primaryHover : colors.textPrimary,
            lineHeight: ODLTheme.typography.lineHeight.tight,
            marginBottom: '4px',
            transition: 'color 0.2s ease-in-out',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setIsValueHovered(true)}
          onMouseLeave={() => setIsValueHovered(false)}
        >
          {value}
        </div>
        {subtitle && (
          <div style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: colors.textSecondary,
            lineHeight: ODLTheme.typography.lineHeight.normal
          }}>
            {subtitle}
          </div>
        )}
      </div>

      {/* Modified information - Fixed at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        right: '12px',
        fontSize: ODLTheme.typography.fontSize.base,
        color: colors.textMuted,
        lineHeight: ODLTheme.typography.lineHeight.normal
      }}>
        fAF477726 • {modifiedText}
      </div>

    </div>
  );
};

export default DashboardCards;