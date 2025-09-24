import React from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

interface StatsCardProps {
  /** The main number/value to display */
  value: number | string;
  /** The label describing what the value represents */
  label: string;
  /** Icon name from the Carbon icon set */
  iconName?: string;
  /** Icon color */
  iconColor?: string;
  /** Background color for the icon container */
  iconBackground?: string;
  /** Optional custom styling */
  style?: React.CSSProperties;
  /** Optional className */
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
  const styles = {
    card: {
      backgroundColor: ODLTheme.colors.white,
      borderRadius: ODLTheme.borders.radius.md,
      padding: ODLTheme.spacing[4],
      border: '1px solid #f5f5f5',
      ...style
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: ODLTheme.spacing[3],
      marginBottom: ODLTheme.spacing[2]
    },
    iconContainer: {
      width: '40px',
      height: '40px',
      borderRadius: ODLTheme.borders.radius.sm,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: iconBackground
    },
    value: {
      fontSize: ODLTheme.typography.fontSize['2xl'],
      fontWeight: ODLTheme.typography.fontWeight.bold,
      color: ODLTheme.colors.text.primary
    },
    label: {
      fontSize: ODLTheme.typography.fontSize.sm,
      color: ODLTheme.colors.text.secondary
    }
  };

  return (
    <div style={styles.card} className={className}>
      <div style={styles.header}>
        {iconName && (
          <div style={styles.iconContainer}>
            <Icon name={iconName} size={20} color={iconColor} />
          </div>
        )}
        <div>
          <div style={styles.value}>{value}</div>
          <div style={styles.label}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;