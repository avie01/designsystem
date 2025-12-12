import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import styles from './ChartCard.module.css';

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

  const handleSave = () => {
    const newSaved = !isSaved;
    setIsSaved(newSaved);
    onSave?.(newSaved);
  };

  const getTrendColor = () => {
    if (!change) return '#525252';
    switch (change.trend) {
      case 'up': return '#198038';
      case 'down': return '#A21920';
      case 'neutral': return '#6F6F6F';
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

  const getChangeBadgeClass = () => {
    if (!change) return styles.changeBadge;
    switch (change.trend) {
      case 'up': return `${styles.changeBadge} ${styles.changeBadgeUp}`;
      case 'down': return `${styles.changeBadge} ${styles.changeBadgeDown}`;
      case 'neutral': return `${styles.changeBadge} ${styles.changeBadgeNeutral}`;
      default: return styles.changeBadge;
    }
  };

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
        <svg width="100%" height={height} className={styles.sparkline} role="presentation" aria-hidden="true">
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
        <svg width="100%" height={height} className={styles.sparkline} role="presentation" aria-hidden="true">
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
        <svg width="100%" height={height} className={styles.sparkline} role="presentation" aria-hidden="true">
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
    <div className={`${styles.chartCard} ${className}`}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <div className={styles.titleRow}>
            {icon && (
              <Icon name={icon} size={20} color={color} />
            )}
            <h3 className={styles.title}>{title}</h3>
          </div>
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>

        <button
          onClick={handleSave}
          aria-label={isSaved ? "Remove from saved charts" : "Save chart"}
          className={styles.saveButton}
        >
          <Icon
            name={isSaved ? "bookmark-filled" : "bookmark"}
            size={20}
            color={isSaved ? "#3560C1" : "#6F6F6F"}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className={styles.valueSection}>
        <div className={styles.value}>{value}</div>

        {change && (
          <div className={styles.changeContainer}>
            <div className={getChangeBadgeClass()}>
              {getTrendIcon() && (
                <Icon name={getTrendIcon()!} size={12} color={getTrendColor()} aria-hidden="true" />
              )}
              <span
                className={styles.changePercentage}
                style={{ color: getTrendColor() }}
              >
                {change.percentage > 0 ? '+' : ''}{change.percentage}%
              </span>
            </div>
            <span className={styles.changeText}>
              {change.value > 0 ? '+' : ''}{change.value} from {timeframe || 'last period'}
            </span>
          </div>
        )}
      </div>

      {(chart || sparklineData) && (
        <div
          className={styles.chartArea}
          role="img"
          aria-label={`Chart showing ${title} data trend`}
        >
          {chart || renderSparkline()}
        </div>
      )}

      {timeframe && !change && (
        <div className={styles.timeframeBadge}>
          <span className={styles.timeframeLabel}>{timeframe}</span>
        </div>
      )}

      {actions && (
        <div className={styles.actionsContainer}>
          {actions.onViewDetails && (
            <Button
              variant="ghost"
              size="small"
              onClick={actions.onViewDetails}
              className={styles.actionButton}
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
