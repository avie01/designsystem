import React from 'react';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';

export type TimelineItemStatus = 'completed' | 'current' | 'pending' | 'error';
export type TimelineOrientation = 'vertical' | 'horizontal';
export type TimelineSize = 'small' | 'medium' | 'large';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  status?: TimelineItemStatus;
  icon?: string;
  content?: React.ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: TimelineOrientation;
  size?: TimelineSize;
  showConnector?: boolean;
  alternating?: boolean;
  className?: string;
  onItemClick?: (item: TimelineItem, index: number) => void;
}

const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = 'vertical',
  size = 'medium',
  showConnector = true,
  alternating = false,
  className = '',
  onItemClick,
}) => {
  const { colors } = useTheme();

  const sizeConfig = {
    small: {
      dotSize: 12,
      iconSize: 14,
      fontSize: '12px',
      titleSize: '13px',
      gap: 16,
      connectorWidth: 2,
    },
    medium: {
      dotSize: 16,
      iconSize: 18,
      fontSize: '14px',
      titleSize: '15px',
      gap: 24,
      connectorWidth: 2,
    },
    large: {
      dotSize: 20,
      iconSize: 22,
      fontSize: '14px',
      titleSize: '16px',
      gap: 32,
      connectorWidth: 3,
    },
  };

  const config = sizeConfig[size];

  const getStatusColor = (status?: TimelineItemStatus) => {
    switch (status) {
      case 'completed':
        return colors.successMain;
      case 'current':
        return colors.primaryMain;
      case 'error':
        return colors.errorMain;
      case 'pending':
      default:
        return colors.grey500;
    }
  };

  const getStatusIcon = (status?: TimelineItemStatus) => {
    switch (status) {
      case 'completed':
        return 'checkmark';
      case 'current':
        return 'circle-solid';
      case 'error':
        return 'close';
      default:
        return null;
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
    gap: `${config.gap}px`,
    position: 'relative',
  };

  const renderVerticalItem = (item: TimelineItem, index: number) => {
    const isLast = index === items.length - 1;
    const statusColor = getStatusColor(item.status);
    const statusIcon = item.icon || getStatusIcon(item.status);
    const isAlternateRight = alternating && index % 2 === 1;

    return (
      <div
        key={item.id}
        style={{
          display: 'flex',
          flexDirection: isAlternateRight ? 'row-reverse' : 'row',
          gap: '16px',
          position: 'relative',
          cursor: onItemClick ? 'pointer' : 'default',
        }}
        onClick={() => onItemClick?.(item, index)}
        role={onItemClick ? 'button' : undefined}
        tabIndex={onItemClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onItemClick(item, index);
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${config.dotSize + 8}px`,
              height: `${config.dotSize + 8}px`,
              borderRadius: '50%',
              backgroundColor: item.status === 'current' ? `${statusColor}20` : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: `${config.dotSize}px`,
                height: `${config.dotSize}px`,
                borderRadius: '50%',
                backgroundColor: statusColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {statusIcon && (
                <Icon
                  name={statusIcon}
                  size={config.iconSize - 4}
                  color={colors.textInverse}
                />
              )}
            </div>
          </div>
          {showConnector && !isLast && (
            <div
              style={{
                width: `${config.connectorWidth}px`,
                flex: 1,
                minHeight: '40px',
                backgroundColor: colors.grey300,
                marginTop: '4px',
              }}
            />
          )}
        </div>

        <div
          style={{
            flex: 1,
            paddingBottom: isLast ? 0 : `${config.gap}px`,
            textAlign: isAlternateRight ? 'right' : 'left',
          }}
        >
          {(item.date || item.time) && (
            <div
              style={{
                fontSize: config.fontSize,
                color: colors.textSecondary,
                marginBottom: '4px',
                fontFamily: 'var(--font-family-noto)',
              }}
            >
              {item.date}
              {item.date && item.time && ' • '}
              {item.time}
            </div>
          )}
          <h4
            style={{
              margin: 0,
              fontSize: config.titleSize,
              fontWeight: 600,
              color: colors.textPrimary,
              fontFamily: 'var(--font-family-noto)',
            }}
          >
            {item.title}
          </h4>
          {item.description && (
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: config.fontSize,
                color: colors.textSecondary,
                lineHeight: 1.5,
                fontFamily: 'var(--font-family-noto)',
              }}
            >
              {item.description}
            </p>
          )}
          {item.content && (
            <div style={{ marginTop: '12px' }}>{item.content}</div>
          )}
        </div>
      </div>
    );
  };

  const renderHorizontalItem = (item: TimelineItem, index: number) => {
    const isLast = index === items.length - 1;
    const statusColor = getStatusColor(item.status);
    const statusIcon = item.icon || getStatusIcon(item.status);

    return (
      <div
        key={item.id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1,
          position: 'relative',
          cursor: onItemClick ? 'pointer' : 'default',
        }}
        onClick={() => onItemClick?.(item, index)}
        role={onItemClick ? 'button' : undefined}
        tabIndex={onItemClick ? 0 : undefined}
        onKeyDown={(e) => {
          if (onItemClick && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onItemClick(item, index);
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          {showConnector && index > 0 && (
            <div
              style={{
                height: `${config.connectorWidth}px`,
                flex: 1,
                backgroundColor: colors.grey300,
              }}
            />
          )}
          <div
            style={{
              width: `${config.dotSize + 8}px`,
              height: `${config.dotSize + 8}px`,
              borderRadius: '50%',
              backgroundColor: item.status === 'current' ? `${statusColor}20` : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: `${config.dotSize}px`,
                height: `${config.dotSize}px`,
                borderRadius: '50%',
                backgroundColor: statusColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {statusIcon && (
                <Icon
                  name={statusIcon}
                  size={config.iconSize - 4}
                  color={colors.textInverse}
                />
              )}
            </div>
          </div>
          {showConnector && !isLast && (
            <div
              style={{
                height: `${config.connectorWidth}px`,
                flex: 1,
                backgroundColor: colors.grey300,
              }}
            />
          )}
        </div>

        <div
          style={{
            textAlign: 'center',
            marginTop: '12px',
            maxWidth: '150px',
          }}
        >
          {(item.date || item.time) && (
            <div
              style={{
                fontSize: config.fontSize,
                color: colors.textSecondary,
                marginBottom: '4px',
                fontFamily: 'var(--font-family-noto)',
              }}
            >
              {item.date}
              {item.date && item.time && ' • '}
              {item.time}
            </div>
          )}
          <h4
            style={{
              margin: 0,
              fontSize: config.titleSize,
              fontWeight: 600,
              color: colors.textPrimary,
              fontFamily: 'var(--font-family-noto)',
            }}
          >
            {item.title}
          </h4>
          {item.description && (
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: config.fontSize,
                color: colors.textSecondary,
                lineHeight: 1.4,
                fontFamily: 'var(--font-family-noto)',
              }}
            >
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle} className={className} role="list" aria-label="Timeline">
      {items.map((item, index) =>
        orientation === 'vertical'
          ? renderVerticalItem(item, index)
          : renderHorizontalItem(item, index)
      )}
    </div>
  );
};

export default Timeline;
