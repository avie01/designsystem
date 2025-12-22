import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';

const ODLSpacing = ODLTheme.spacing;
const ODLTypography = ODLTheme.typography;

export interface MillerNode {
  id: string;
  label: string;
  children?: MillerNode[];
  icon?: string;
  type?: 'folder' | 'file';
}

export interface MillerColumnsProps {
  data: MillerNode[];
  onSelect?: (path: MillerNode[]) => void;
  maxColumns?: number;
  columnWidth?: number;
  height?: number;
  showIcons?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether items are disabled */
  disabled?: boolean;
}

const MillerColumns: React.FC<MillerColumnsProps> = ({
  data,
  onSelect,
  maxColumns = 4,
  columnWidth = 250,
  height = 400,
  showIcons = true,
  className = '',
  style,
  size = 'md',
  disabled = false
}) => {
  const { colors } = useTheme();
  const [selectedPath, setSelectedPath] = useState<MillerNode[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .miller-item:hover:not(.miller-item--disabled) {
        background-color: ${colors.grey400} !important;
      }
      .miller-item:focus-visible {
        outline: 2px solid ${colors.primaryMain} !important;
        outline-offset: 2px !important;
      }
      .miller-item--selected {
        background-color: ${colors.selectedLight} !important;
        border-left: 4px solid ${colors.primaryMain} !important;
      }
      .miller-item--selected:hover {
        background-color: ${colors.grey400} !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;
    
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

  const handleItemClick = (item: MillerNode, columnIndex: number) => {
    if (disabled) return;
    const newPath = [...selectedPath.slice(0, columnIndex), item];
    setSelectedPath(newPath);
    onSelect?.(newPath);
  };

  const getColumnsData = (): MillerNode[][] => {
    const columns: MillerNode[][] = [data];
    
    for (let i = 0; i < selectedPath.length && i < maxColumns - 1; i++) {
      const selected = selectedPath[i];
      if (selected?.children && selected.children.length > 0) {
        columns.push(selected.children);
      }
    }
    
    return columns;
  };

  const columnsData = getColumnsData();

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    backgroundColor: colors.paper,
    borderRadius: ODLTheme.borders.radius.base,
    overflow: 'hidden',
    border: `1px solid ${colors.grey400}`,
    height,
    fontFamily: ODLTypography.fontFamily.sans,
    ...style
  };

  return (
    <div
      className={className}
      style={containerStyles}
    >
      {columnsData.map((columnItems, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            width: columnWidth,
            minWidth: columnWidth,
            backgroundColor: colors.paper,
            borderRight: columnIndex < columnsData.length - 1 ? `1px solid ${colors.grey400}` : 'none',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {columnItems.map((item, index) => {
            const isSelected = selectedPath[columnIndex]?.id === item.id;
            const isHovered = hoveredItem === `${columnIndex}-${item.id}`;
            const hasChildren = item.children && item.children.length > 0;
            const isLastItem = index === columnItems.length - 1;
            
            const itemStyles: React.CSSProperties = {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              borderBottom: isLastItem ? 'none' : `1px solid ${colors.grey400}`,
              borderLeft: isSelected ? `4px solid ${colors.primaryMain}` : '4px solid transparent',
              cursor: disabled ? 'not-allowed' : 'pointer',
              fontSize: size === 'sm' ? ODLTypography.fontSize.sm : size === 'lg' ? ODLTypography.fontSize.md : ODLTypography.fontSize.base,
              fontWeight: ODLTypography.fontWeight.normal,
              color: disabled ? colors.grey600 : colors.textPrimary,
              transition: 'all 0.2s ease',
              boxSizing: 'border-box',
              paddingLeft: isSelected ? '16px' : '16px', // 20px - 4px for border compensation
              paddingRight: '16px',
              paddingTop: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
              paddingBottom: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['4'] : ODLSpacing['3'],
              minHeight: size === 'sm' ? '30px' : size === 'lg' ? '52px' : '42px',
              backgroundColor: disabled ? 'transparent' : isSelected ? colors.selectedLight : 'transparent',
            };
            
            return (
              <div
                key={item.id}
                className={`miller-item ${isSelected ? 'miller-item--selected' : ''} ${disabled ? 'miller-item--disabled' : ''}`}
                style={itemStyles}
                onClick={() => handleItemClick(item, columnIndex)}
                onMouseEnter={() => !disabled && setHoveredItem(`${columnIndex}-${item.id}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  flex: 1,
                  overflow: 'hidden'
                }}>
                  {showIcons && (
                    <span 
                      style={{
                        color: disabled ? colors.grey600 : isSelected ? colors.primaryMain : colors.textSecondary,
                        display: 'inline-flex',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                        flexShrink: 0,
                        marginRight: size === 'sm' ? ODLSpacing['1'] : size === 'lg' ? ODLSpacing['3'] : ODLSpacing['2'],
                      }}
                    >
                      <Icon
                        name={item.icon || (item.type === 'file' ? 'document' : 'folder')}
                        size={size === 'sm' ? parseInt(ODLTypography.fontSize.sm) : 
                              size === 'lg' ? parseInt(ODLTypography.fontSize.md) : 
                              20}
                      />
                    </span>
                  )}
                  <span style={{ 
                    fontWeight: ODLTypography.fontWeight.normal,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1
                  }}>
                    {item.label}
                  </span>
                </div>
                {hasChildren && (
                  <span
                    style={{
                      color: disabled ? colors.grey600 : colors.textSecondary,
                      display: 'inline-flex',
                      alignItems: 'center',
                      verticalAlign: 'middle',
                      flexShrink: 0,
                    }}
                  >
                    <Icon
                      name="chevron-right"
                      size={size === 'sm' ? parseInt(ODLTypography.fontSize.xs) :
                            size === 'lg' ? parseInt(ODLTypography.fontSize.base) :
                            20}
                    />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MillerColumns;