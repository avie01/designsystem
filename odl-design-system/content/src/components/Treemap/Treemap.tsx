import React, { useMemo } from 'react';
import ODLTheme from '../../styles/ODLTheme';

export interface TreemapNode {
  id: string;
  name: string;
  value: number;
  color?: string;
  children?: TreemapNode[];
}

export interface TreemapProps {
  data: TreemapNode[];
  valueField?: string;
  colorScheme?: 'default' | 'heat' | 'cool' | 'rainbow';
  showLabels?: boolean;
  showValues?: boolean;
  onClick?: (node: TreemapNode) => void;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

const Treemap: React.FC<TreemapProps> = ({
  data,
  colorScheme = 'default',
  showLabels = true,
  showValues = true,
  onClick,
  height = 400,
  className = '',
  style
}) => {
  const [hoveredNode, setHoveredNode] = React.useState<string | null>(null);

  // Color schemes using ODLTheme colors
  const getColorForNode = (node: TreemapNode, index: number): string => {
    if (node.color) return node.color;

    const chartColors = ODLTheme.colors.charts;
    const schemes = {
      default: [
        chartColors.blue,
        chartColors.emerald,
        chartColors.violet,
        chartColors.rose,
        chartColors.amber,
        chartColors.cyan,
        chartColors.indigo,
        chartColors.lime,
        chartColors.orange
      ],
      heat: [
        '#FEF3C7',
        '#FDE68A',
        '#FCD34D',
        '#FBBF24',
        chartColors.amber,
        '#D97706',
        '#92400E'
      ],
      cool: [
        '#DBEAFE',
        '#BFDBFE',
        '#93C5FD',
        '#60A5FA',
        chartColors.blue,
        '#2563EB',
        '#1D4ED8'
      ],
      rainbow: [
        chartColors.rose,
        chartColors.orange,
        chartColors.amber,
        chartColors.lime,
        chartColors.emerald,
        chartColors.cyan,
        chartColors.indigo,
        chartColors.violet,
        chartColors.pink
      ]
    };

    const colors = schemes[colorScheme] || schemes.default;
    return colors[index % colors.length];
  };

  // Calculate total value
  const totalValue = useMemo(() => {
    return data.reduce((sum, node) => sum + node.value, 0);
  }, [data]);

  // Simple treemap layout algorithm
  const calculateLayout = (
    nodes: TreemapNode[],
    x: number,
    y: number,
    width: number,
    height: number
  ): Array<TreemapNode & { x: number; y: number; width: number; height: number }> => {
    if (nodes.length === 0) return [];

    const totalValue = nodes.reduce((sum, node) => sum + node.value, 0);
    const result: Array<TreemapNode & { x: number; y: number; width: number; height: number }> = [];
    
    let currentX = x;
    let currentY = y;
    const isHorizontal = width > height;

    nodes.forEach((node, _index) => {
      const ratio = node.value / totalValue;
      
      if (isHorizontal) {
        const nodeWidth = width * ratio;
        result.push({
          ...node,
          x: currentX,
          y: currentY,
          width: nodeWidth,
          height: height
        });
        currentX += nodeWidth;
      } else {
        const nodeHeight = height * ratio;
        result.push({
          ...node,
          x: currentX,
          y: currentY,
          width: width,
          height: nodeHeight
        });
        currentY += nodeHeight;
      }
    });

    return result;
  };

  const layoutNodes = calculateLayout(data, 0, 0, 100, 100);

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  const getTextColor = (bgColor: string): string => {
    // Simple contrast calculation
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? ODLTheme.colors.text.primary : ODLTheme.colors.background;
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: ODLTheme.colors.background,
        borderRadius: ODLTheme.borders.radius.md,
        border: `1px solid ${ODLTheme.colors.border}`,
        overflow: 'hidden',
        boxShadow: ODLTheme.shadows.sm,
        ...style
      }}
    >
      {layoutNodes.map((node, index) => {
        const isHovered = hoveredNode === node.id;
        const bgColor = getColorForNode(node, index);
        const textColor = getTextColor(bgColor);
        const percentage = ((node.value / totalValue) * 100).toFixed(1);
        
        return (
          <div
            key={node.id}
            onClick={() => onClick?.(node)}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            style={{
              position: 'absolute',
              left: `${node.x}%`,
              top: `${node.y}%`,
              width: `${node.width}%`,
              height: `${node.height}%`,
              background: `linear-gradient(135deg, ${bgColor} 0%, ${bgColor}dd 100%)`,
              border: '0.5px solid rgba(255, 255, 255, 0.3)',
              cursor: onClick ? 'pointer' : 'default',
              transition: 'all 0.3s ease',
              transform: isHovered ? 'scale(0.98)' : 'scale(1)',
              opacity: isHovered ? 0.95 : 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: ODLTheme.spacing[3],
              boxSizing: 'border-box',
              boxShadow: isHovered 
                ? 'inset 0 2px 8px rgba(0, 0, 0, 0.15)' 
                : 'inset 0 1px 2px rgba(0, 0, 0, 0.05)'
            }}
          >
            {/* Only show content if box is large enough */}
            {node.width > 10 && node.height > 10 && (
              <>
                {showLabels && (
                  <div
                    style={{
                      fontSize: node.width > 20 ? '15px' : '12px',
                      fontWeight: 600,
                      color: textColor,
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '90%',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                      letterSpacing: '0.3px'
                    }}
                  >
                    {node.name}
                  </div>
                )}
                {showValues && node.width > 15 && node.height > 15 && (
                  <div
                    style={{
                      fontSize: node.width > 20 ? '20px' : '14px',
                      fontWeight: 700,
                      color: textColor,
                      opacity: 0.95,
                      marginTop: '6px',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    {formatValue(node.value)}
                  </div>
                )}
                {node.width > 20 && node.height > 20 && (
                  <div
                    style={{
                      fontSize: '12px',
                      color: textColor,
                      opacity: 0.85,
                      marginTop: '4px',
                      padding: '2px 8px',
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(4px)'
                    }}
                  >
                    {percentage}%
                  </div>
                )}
              </>
            )}
            
            {/* Tooltip for small boxes */}
            {isHovered && (node.width <= 10 || node.height <= 10) && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.9)',
                  color: ODLTheme.colors.background,
                  padding: `${ODLTheme.spacing[2]}px ${ODLTheme.spacing[3]}px`,
                  borderRadius: ODLTheme.borders.radius.sm,
                  fontSize: ODLTheme.typography.fontSize.xs,
                  whiteSpace: 'nowrap',
                  zIndex: 1000,
                  marginBottom: ODLTheme.spacing[1]
                }}
              >
                <div style={{ fontWeight: 600 }}>{node.name}</div>
                <div>{formatValue(node.value)} ({percentage}%)</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Treemap;