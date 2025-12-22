import React from 'react';
import Icon from '../../Icon/Icon';
import { ODLTheme } from '../../../styles/ODLTheme';
import { useTheme } from '../../../../.storybook/theme-decorator';

const ODLSpacing = ODLTheme.spacing;
const ODLTypography = ODLTheme.typography;

interface StatsCardProps {
  value: number | string;
  label: string;
  iconName?: string;
  iconColor?: string;
  iconBackground?: string;
  style?: React.CSSProperties;
  className?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the card is disabled */
  disabled?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  value,
  label,
  iconName = 'list',
  iconColor,
  iconBackground,
  style,
  className,
  size = 'md',
  disabled = false
}) => {
  const { colors } = useTheme();
  const cardStyles: React.CSSProperties = {
    backgroundColor: colors.paper,
    borderRadius: ODLTheme.borders.radius.base,
    padding: size === 'sm' ? ODLSpacing[3] : size === 'lg' ? ODLSpacing[6] : ODLSpacing[4],
    border: `1px solid ${colors.grey500}`,
    opacity: disabled ? 0.6 : 1,
    cursor: disabled ? 'not-allowed' : 'default',
    transition: 'all 0.2s ease',
    fontFamily: ODLTypography.fontFamily.sans,
    ...style
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: size === 'sm' ? ODLSpacing[2] : size === 'lg' ? ODLSpacing[4] : ODLSpacing[3],
    marginBottom: size === 'sm' ? ODLSpacing[1] : ODLSpacing[2],
  };

  const iconContainerStyles: React.CSSProperties = {
    width: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
    height: size === 'sm' ? '32px' : size === 'lg' ? '48px' : '40px',
    borderRadius: ODLTheme.borders.radius.sm,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: iconBackground || colors.selectedLight,
  };

  const valueStyles: React.CSSProperties = {
    fontSize: size === 'sm' ? ODLTypography.fontSize.lg : size === 'lg' ? '32px' : '24px',
    fontWeight: ODLTypography.fontWeight.bold,
    color: disabled ? colors.grey600 : colors.textPrimary,
    lineHeight: 1.2,
  };

  const labelStyles: React.CSSProperties = {
    fontSize: size === 'sm' ? ODLTypography.fontSize.sm : ODLTypography.fontSize.base,
    color: disabled ? colors.grey600 : colors.textSecondary,
    marginTop: ODLSpacing[1],
  };

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
  const defaultIconColor = disabled ? colors.grey600 : iconColor || colors.primaryMain;

  return (
    <div className={className} style={cardStyles}>
      <div style={headerStyles}>
        {iconName && (
          <div style={iconContainerStyles}>
            <Icon name={iconName} size={iconSize} color={defaultIconColor} />
          </div>
        )}
        <div>
          <div style={valueStyles}>{value}</div>
          <div style={labelStyles}>{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
