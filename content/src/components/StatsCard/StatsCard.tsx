import React from 'react';
import Icon from '../Icon/Icon';
import styles from './StatsCard.module.css';

interface StatsCardProps {
  value: number | string;
  label: string;
  iconName?: string;
  iconColor?: string;
  iconBackground?: string;
  style?: React.CSSProperties;
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  iconName = 'list',
  iconColor = '#0284c7',
  iconBackground = '#e0f2fe',
  style,
  className
}) => {
  return (
    <div className={`${styles.card} ${className || ''}`} style={style}>
      <div className={styles.header}>
        {iconName && (
          <div
            className={styles.iconContainer}
            style={{ backgroundColor: iconBackground }}
          >
            <Icon name={iconName} size={20} color={iconColor} />
          </div>
        )}
        <div>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
