import React from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';

const ODLSpacing = ODLTheme.spacing;

interface StatsGridProps {
  /** Child elements (typically StatsCard components) */
  children: React.ReactNode;
  /** Number of columns (auto-fit with minmax by default) */
  columns?: number;
  /** Minimum column width for auto-fit */
  minColumnWidth?: string;
  /** Gap between grid items */
  gap?: string;
  /** Optional custom styling */
  style?: React.CSSProperties;
  /** Optional className */
  className?: string;
}

const StatsGrid: React.FC<StatsGridProps> = ({
  children,
  columns,
  minColumnWidth = '200px',
  gap = ODLSpacing[4],
  style,
  className
}) => {
  const { colors } = useTheme();
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: columns 
      ? `repeat(${columns}, 1fr)` 
      : `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
    gap: gap,
    marginBottom: ODLSpacing[4],
    ...style
  };

  return (
    <div style={gridStyle} className={className}>
      {children}
    </div>
  );
};

export default StatsGrid;