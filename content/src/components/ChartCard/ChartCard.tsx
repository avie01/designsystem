import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';

export interface ChartCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  change?: {
    value: number;
    percentage: number;
    trend: 'up' | 'down' | 'neutral';
  };
  timeframe?: string;
  chart?: React.ReactNode;
  sparklineData?: number[];
  type?: 'line' | 'bar' | 'area';
  color?: string;
  icon?: string;
  actions?: {
    onViewDetails?: () => void;
    onExport?: () => void;
    onRefresh?: () => void;
  };
  onSave?: (saved: boolean) => void;
  saved?: boolean;
  className?: string;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  value,
  change,
  timeframe,
  chart,
  sparklineData,
  type = 'line',
  color = '#3560C1',
  icon,
  actions,
  onSave,
  saved = false,
  className = '',
}) => {
  const [isSaved, setIsSaved] = useState(saved);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    onSave?.(newSaved);
  };

  const getTrendColor = () => {
    if (!change) return '#525252';
    switch (change.trend) {
      case 'up': return '#198038'; // Darker green for WCAG AA (4.5:1 contrast)
      case 'down': return '#A21920'; // Darker red for WCAG AA (4.5:1 contrast)
      case 'neutral': return '#6F6F6F'; // Darker gray for WCAG AA (4.5:1 contrast)
      default: return '#525252';
    }
  };

  const getTrendIcon = () => {
    if (!change) return null;
    switch (change.trend) {
      case 'up': return 'arrow-up';
      case 'down': return 'arrow-down';
      case 'neutral': return 'subtract';
      default: return null;
    }
  };

  // Simple sparkline chart generator
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length === 0) return null;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 100;
    const height = 40;
    
    const points = sparklineData.map((val, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    }).join(' ');

    if (type === 'line') {
      return (
        <svg width="100%" height={height} style={{ display: 'block' }} role="presentation" aria-hidden="true">
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    } else if (type === 'bar') {
      const barWidth = width / sparklineData.length;
      return (
        <svg width="100%" height={height} style={{ display: 'block' }} role="presentation" aria-hidden="true">
          {sparklineData.map((val, i) => {
            const barHeight = ((val - min) / range) * height;
            const x = i * barWidth + barWidth * 0.1;
            const y = height - barHeight;
            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={barWidth * 0.8}
                height={barHeight}
                fill={color}
                opacity={0.7}
              />
            );
          })}
        </svg>
      );
    } else if (type === 'area') {
      const areaPoints = `0,${height} ${points} ${width},${height}`;
      return (
        <svg width="100%" height={height} style={{ display: 'block' }} role="presentation" aria-hidden="true">
          <polygon
            points={areaPoints}
            fill={color}
            opacity="0.1"
          />
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
  };

  return (
    <div 
      className={className}
      style={{
        backgroundColor: isHovered ? '#f8f8f8' : '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        transition: 'all 0.2s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '16px',
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {icon && (
              <Icon name={icon} size={20} color={color} />
            )}
            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#161616',
              margin: 0,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              {title}
            </h3>
          </div>
          {subtitle && (
            <p style={{
              fontSize: '12px',
              color: '#6F6F6F', // Darker gray for WCAG AA (4.5:1 contrast)
              margin: '4px 0 0 0',
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          aria-label={isSaved ? "Remove from saved charts" : "Save chart"}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name={isSaved ? "bookmark-filled" : "bookmark"}
            size={20}
            color={isSaved ? "#3560C1" : "#6F6F6F"}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Value and Change */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          color: '#161616',
          lineHeight: '1',
          marginBottom: '8px',
        }}>
          {value}
        </div>
        
        {change && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              backgroundColor: change.trend === 'up' ? '#DEFBE6' : change.trend === 'down' ? '#FFD7D9' : '#F4F4F4',
              borderRadius: '12px',
            }}>
              {getTrendIcon() && (
                <Icon name={getTrendIcon()!} size={12} color={getTrendColor()} aria-hidden="true" />
              )}
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '600',
                color: getTrendColor(),
              }}>
                {change.percentage > 0 ? '+' : ''}{change.percentage}%
              </span>
            </div>
            <span style={{
              fontSize: '12px',
              color: '#6F6F6F', // Darker gray for WCAG AA (4.5:1 contrast)
            }}>
              {change.value > 0 ? '+' : ''}{change.value} from {timeframe || 'last period'}
            </span>
          </div>
        )}
      </div>

      {/* Chart Area */}
      {(chart || sparklineData) && (
        <div
          style={{
            marginBottom: '16px',
            minHeight: '60px',
            position: 'relative',
          }}
          role="img"
          aria-label={`Chart showing ${title} data trend`}
        >
          {chart || renderSparkline()}
        </div>
      )}

      {/* Timeframe Badge */}
      {timeframe && !change && (
        <div style={{ 
          marginBottom: '16px',
        }}>
          <span style={{
            padding: '4px 12px',
            backgroundColor: '#F4F4F4',
            color: '#525252',
            borderRadius: '16px',
            fontSize: '12px',
            fontWeight: '500',
          }}>
            {timeframe}
          </span>
        </div>
      )}

      {/* Action Buttons */}
      {actions && (
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          paddingTop: '16px',
          borderTop: '1px solid #e0e0e0',
        }}>
          {actions.onViewDetails && (
            <Button
              variant="ghost"
              size="small"
              onClick={actions.onViewDetails}
              style={{ flex: 1 }}
            >
              View Details
            </Button>
          )}
          {actions.onExport && (
            <Button
              variant="secondary"
              size="small"
              onClick={actions.onExport}
              aria-label="Export data"
              icon={<Icon name="download" size={16} aria-hidden="true" />}
            >
              Export
            </Button>
          )}
          {actions.onRefresh && (
            <Button
              variant="secondary"
              size="small"
              onClick={actions.onRefresh}
              aria-label="Refresh data"
              icon={<Icon name="renew" size={16} aria-hidden="true" />}
            >
              Refresh
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ChartCard;