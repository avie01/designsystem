import React from 'react';
import Icon from '../Icon/Icon';
import Graph from '../Graph/Graph';
import ODLTheme from '../../styles/ODLTheme';

export interface InlineMetricCardProps {
  /** Main metric label */
  label: string;
  /** Large metric value to display */
  value: string | number;
  /** Optional icon name */
  icon?: string;
  /** Icon color */
  iconColor?: string;
  /** Optional trend indicator */
  trend?: string;
  /** Trend color */
  trendColor?: string;
  /** Optional sparkline data */
  sparklineData?: any[];
  /** Sparkline data key */
  sparklineKey?: string;
  /** Sparkline chart type */
  sparklineType?: 'line' | 'area' | 'bar';
  /** Sparkline color */
  sparklineColor?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional styles */
  style?: React.CSSProperties;
}

const InlineMetricCard: React.FC<InlineMetricCardProps> = ({
  label,
  value,
  icon,
  iconColor = ODLTheme.colors.primary,
  trend,
  trendColor = ODLTheme.colors.success,
  sparklineData,
  sparklineKey = 'value',
  sparklineType = 'line',
  sparklineColor = ODLTheme.colors.primary,
  onClick,
  style
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: ODLTheme.spacing[3],
        background: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ...style
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = ODLTheme.shadows.sm;
        }
      }}
      onMouseLeave={(e) => {
        if (onClick) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }
      }}
    >
      {/* Icon */}
      {icon && (
        <div style={{ marginRight: ODLTheme.spacing[3] }}>
          <Icon name={icon} size={20} style={{ color: iconColor }} />
        </div>
      )}
      
      {/* Main content */}
      <div style={{ flex: 1 }}>
        <div style={{ 
          fontSize: ODLTheme.typography.fontSize.xs, 
          color: ODLTheme.colors.text.secondary 
        }}>
          {label}
        </div>
        <div style={{ 
          fontSize: ODLTheme.typography.fontSize.xl, 
          fontWeight: ODLTheme.typography.fontWeight.semibold, 
          color: ODLTheme.colors.text.primary,
          lineHeight: 1.2
        }}>
          {value}
        </div>
        {trend && (
          <div style={{ 
            fontSize: ODLTheme.typography.fontSize.xs,
            color: trendColor,
            fontWeight: ODLTheme.typography.fontWeight.medium
          }}>
            {trend}
          </div>
        )}
      </div>

      {/* Sparkline */}
      {sparklineData && (
        <div style={{ 
          width: '80px', 
          height: '40px',
          marginLeft: ODLTheme.spacing[2]
        }}>
          <Graph
            type={sparklineType}
            data={sparklineData}
            dataKeys={[sparklineKey]}
            xAxisKey="name"
            height={40}
            showLegend={false}
            showGrid={false}
            showTooltip={false}
            colors={[sparklineColor]}
            gradient={sparklineType === 'area'}
          />
        </div>
      )}
    </div>
  );
};

export default InlineMetricCard;