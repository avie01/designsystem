import React from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

export interface StatusCardProps {
  /** Icon name from Carbon icons */
  icon?: string;
  /** Main title/label */
  title: string;
  /** Large metric value to display */
  metric: string | number;
  /** Subtitle or description */
  subtitle?: string;
  /** Comparison value (e.g., "+12% vs last week") */
  comparison?: string;
  /** Trend direction for comparison */
  trend?: 'up' | 'down' | 'neutral';
  /** Color variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

const StatusCard: React.FC<StatusCardProps> = ({
  icon,
  title,
  metric,
  subtitle,
  comparison,
  trend,
  variant = 'default',
  onClick,
  className = '',
  style
}) => {
  // Color schemes for each variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #F0F6FF 0%, #E6F1FF 100%)',
          borderColor: '#3560C1',
          iconColor: '#3560C1',
          metricColor: '#3560C1'
        };
      case 'success':
        return {
          background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
          borderColor: '#5DA10C',
          iconColor: '#5DA10C',
          metricColor: '#166534'
        };
      case 'warning':
        return {
          background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
          borderColor: '#F59E0B',
          iconColor: '#D97706',
          metricColor: '#92400E'
        };
      case 'error':
        return {
          background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
          borderColor: '#DC2626',
          iconColor: '#DC2626',
          metricColor: '#991B1B'
        };
      case 'info':
        return {
          background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
          borderColor: '#2563EB',
          iconColor: '#2563EB',
          metricColor: '#1E40AF'
        };
      default:
        return {
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
          borderColor: ODLTheme.colors.grey200,
          iconColor: ODLTheme.colors.grey600,
          metricColor: ODLTheme.colors.text.primary
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Get trend icon and color
  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case 'up':
        return { icon: 'arrow-up', color: '#10B981' };
      case 'down':
        return { icon: 'arrow-down', color: '#EF4444' };
      case 'neutral':
        return { icon: 'subtract', color: '#6B7280' };
      default:
        return null;
    }
  };

  const trendInfo = getTrendIcon();

  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: variantStyles.background,
        border: `1px solid ${variantStyles.borderColor}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        ...style,
        ...(onClick && {
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        })
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        }
      }}
    >
      {/* Header with icon and title */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '12px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          flex: 1
        }}>
          {icon && (
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon name={icon} size={18} color={variantStyles.iconColor} />
            </div>
          )}
          <span style={{
            fontSize: ODLTheme.typography.fontSize.sm,
            fontWeight: ODLTheme.typography.fontWeight.medium,
            color: ODLTheme.colors.textLight,
            lineHeight: 1.2,
            letterSpacing: '0.02em'
          }}>
            {title}
          </span>
        </div>
      </div>

      {/* Metric value */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{
          fontSize: '32px',
          fontWeight: ODLTheme.typography.fontWeight.bold,
          color: variantStyles.metricColor,
          lineHeight: 1,
          letterSpacing: '-0.02em'
        }}>
          {metric}
        </div>
      </div>

      {/* Footer with subtitle and comparison */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        gap: '8px'
      }}>
        {subtitle && (
          <span style={{
            fontSize: ODLTheme.typography.fontSize.xs,
            color: ODLTheme.colors.textLight,
            flex: 1
          }}>
            {subtitle}
          </span>
        )}
        
        {comparison && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: ODLTheme.typography.fontSize.xs,
            fontWeight: ODLTheme.typography.fontWeight.medium,
            color: trendInfo?.color || ODLTheme.colors.textLight
          }}>
            {trendInfo && (
              <Icon name={trendInfo.icon} size={12} color={trendInfo.color} />
            )}
            <span>{comparison}</span>
          </div>
        )}
      </div>

      {/* Decorative element for visual interest */}
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.2)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default StatusCard;