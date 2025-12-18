import React from 'react';
import ODLTheme from '../../../styles/ODLTheme';
import Icon from '../../Icon/Icon';

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
          background: `linear-gradient(135deg, ${ODLTheme.colors.primary}15 0%, ${ODLTheme.colors.primary}08 100%)`,
          borderColor: ODLTheme.colors.primary,
          iconColor: ODLTheme.colors.primary,
          metricColor: ODLTheme.colors.primary
        };
      case 'success':
        return {
          background: `linear-gradient(135deg, ${ODLTheme.colors.success}15 0%, ${ODLTheme.colors.success}08 100%)`,
          borderColor: ODLTheme.colors.success,
          iconColor: ODLTheme.colors.success,
          metricColor: ODLTheme.colors.success
        };
      case 'warning':
        return {
          background: `linear-gradient(135deg, ${ODLTheme.colors.warning}15 0%, ${ODLTheme.colors.warning}08 100%)`,
          borderColor: ODLTheme.colors.warning,
          iconColor: ODLTheme.colors.warning,
          metricColor: ODLTheme.colors.warning
        };
      case 'error':
        return {
          background: `linear-gradient(135deg, ${ODLTheme.colors.error}15 0%, ${ODLTheme.colors.error}08 100%)`,
          borderColor: ODLTheme.colors.error,
          iconColor: ODLTheme.colors.error,
          metricColor: ODLTheme.colors.error
        };
      case 'info':
        return {
          background: `linear-gradient(135deg, ${ODLTheme.colors.info}15 0%, ${ODLTheme.colors.info}08 100%)`,
          borderColor: ODLTheme.colors.info,
          iconColor: ODLTheme.colors.info,
          metricColor: ODLTheme.colors.info
        };
      default:
        return {
          background: `linear-gradient(135deg, ${ODLTheme.colors.background} 0%, ${ODLTheme.colors.surface} 100%)`,
          borderColor: ODLTheme.colors.border,
          iconColor: ODLTheme.colors.text.secondary,
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
        return { icon: 'arrow-up', color: ODLTheme.colors.success };
      case 'down':
        return { icon: 'arrow-down', color: ODLTheme.colors.error };
      case 'neutral':
        return { icon: 'subtract', color: ODLTheme.colors.text.secondary };
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
        borderRadius: ODLTheme.borders.radius.lg,
        padding: ODLTheme.spacing[5],
        cursor: onClick ? 'pointer' : 'default',
        transition: ODLTheme.transitions.base,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: ODLTheme.shadows.sm,
        ...style
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = ODLTheme.shadows.md;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
        }
      }}
    >
      {/* Header with icon and title */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: ODLTheme.spacing[3]
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: ODLTheme.spacing[2],
          flex: 1
        }}>
          {icon && (
            <div style={{
              width: `${ODLTheme.spacing[8]}px`,
              height: `${ODLTheme.spacing[8]}px`,
              borderRadius: ODLTheme.borders.radius.md,
              background: 'rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Icon name={icon} size={16} color={variantStyles.iconColor} />
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
      <div style={{ marginBottom: ODLTheme.spacing[2] }}>
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
        gap: ODLTheme.spacing[2]
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
            gap: ODLTheme.spacing[1],
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
        top: `-${ODLTheme.spacing[5]}px`,
        right: `-${ODLTheme.spacing[5]}px`,
        width: `${ODLTheme.spacing[20]}px`,
        height: `${ODLTheme.spacing[20]}px`,
        borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.15)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default StatusCard;