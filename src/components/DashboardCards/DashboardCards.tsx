import React from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import FileType from '../FileType/FileType';
import IconButton from '../IconButton/IconButton';

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
  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const [isValueHovered, setIsValueHovered] = React.useState(false);
  const isClickable = !!onClick;

  // Base card styles with exact specifications
  const cardStyles: React.CSSProperties = {
    display: 'flex',
    width: '431.5px',
    height: '180px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '8px',
    border: isPressed ? '1px solid #3560C1' : '1px solid var(--grey-500-obj-light-deco, #D1D1D1)',
    backgroundColor: isPressed ? '#E0F3FE' : (isHovered ? '#e8e8e8' : ODLTheme.colors.white),
    padding: '12px',
    transition: 'all 0.2s ease-in-out',
    cursor: isClickable ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: ODLTheme.typography.fontFamily.sans,
    ...style
  };



  if (loading) {
    return (
      <div 
        className={className}
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
          <div 
            className="skeleton-box"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              overflow: 'hidden'
            }} />
          
          {/* Right side - IconButton skeleton */}
          <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[1] }}>
            <div 
              className="skeleton-box"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '100px',
                overflow: 'hidden'
              }} />
            {/* Additional actions skeleton if needed */}
            {actions && (
              <div 
                className="skeleton-box"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '100px',
                  overflow: 'hidden'
                }} />
            )}
          </div>
        </div>

        {/* Main value skeleton */}
        <div style={{
          marginBottom: variant === 'detailed' ? ODLTheme.spacing[3] : ODLTheme.spacing[2]
        }}>
          <div 
            className="skeleton-box"
            style={{
              fontSize: ODLTheme.typography.fontSize.md,
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              lineHeight: ODLTheme.typography.lineHeight.tight,
              marginBottom: '4px',
              height: '24px',
              borderRadius: '4px',
              width: '280px',
              overflow: 'hidden'
            }} />
          {/* Subtitle skeleton - matching the long description */}
          {subtitle && (
            <div>
              <div 
                className="skeleton-box"
                style={{
                  fontSize: ODLTheme.typography.fontSize.base,
                  lineHeight: ODLTheme.typography.lineHeight.normal,
                  height: '16px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  width: '100%',
                  overflow: 'hidden'
                }} />
              <div 
                className="skeleton-box"
                style={{
                  fontSize: ODLTheme.typography.fontSize.base,
                  lineHeight: ODLTheme.typography.lineHeight.normal,
                  height: '16px',
                  borderRadius: '4px',
                  marginBottom: '4px',
                  width: '100%',
                  overflow: 'hidden'
                }} />
              <div 
                className="skeleton-box"
                style={{
                  fontSize: ODLTheme.typography.fontSize.base,
                  lineHeight: ODLTheme.typography.lineHeight.normal,
                  height: '16px',
                  borderRadius: '4px',
                  width: '75%',
                  overflow: 'hidden'
                }} />
            </div>
          )}
        </div>

        {/* Modified information skeleton - Fixed at bottom */}
        <div 
          className="skeleton-box"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            fontSize: ODLTheme.typography.fontSize.base,
            lineHeight: ODLTheme.typography.lineHeight.normal,
            height: '14px',
            borderRadius: '4px',
            width: '320px',
            overflow: 'hidden'
          }} />
      </div>
    );
  }

  return (
    <div 
      className={className}
      style={cardStyles}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onKeyDown={(e) => {
        if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick?.();
        }
      }}
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
            color: isValueHovered ? '#0037B1' : ODLTheme.colors.text.primary,
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
            color: '#525965',
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
        color: '#707070',
        lineHeight: ODLTheme.typography.lineHeight.normal
      }}>
        fAF477726 • {modifiedText}
      </div>

      {/* Shimmer animation for loading */}
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
        }
      `}</style>
    </div>
  );
};

export default DashboardCards;