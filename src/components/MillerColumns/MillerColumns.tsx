import React, { useState } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';

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
}

const MillerColumns: React.FC<MillerColumnsProps> = ({
  data,
  onSelect,
  maxColumns = 4,
  columnWidth = 250,
  height = 400,
  showIcons = true,
  className = '',
  style
}) => {
  const [selectedPath, setSelectedPath] = useState<MillerNode[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleItemClick = (item: MillerNode, columnIndex: number) => {
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

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        background: ODLTheme.colors.grey100,
        borderRadius: '8px',
        overflow: 'hidden',
        border: `1px solid ${ODLTheme.colors.grey200}`,
        height,
        ...style
      }}
    >
      {columnsData.map((columnItems, columnIndex) => (
        <div
          key={columnIndex}
          style={{
            width: columnWidth,
            minWidth: columnWidth,
            background: 'white',
            borderRight: columnIndex < columnsData.length - 1 ? `1px solid ${ODLTheme.colors.grey200}` : 'none',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {columnItems.map((item) => {
            const isSelected = selectedPath[columnIndex]?.id === item.id;
            const isHovered = hoveredItem === `${columnIndex}-${item.id}`;
            const hasChildren = item.children && item.children.length > 0;
            
            return (
              <div
                key={item.id}
                onClick={() => handleItemClick(item, columnIndex)}
                onMouseEnter={() => setHoveredItem(`${columnIndex}-${item.id}`)}
                onMouseLeave={() => setHoveredItem(null)}
                style={{
                  padding: '10px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: isSelected
                    ? ODLTheme.colors.primary
                    : isHovered
                      ? ODLTheme.colors.grey50
                      : 'transparent',
                  color: isSelected ? 'white' : ODLTheme.colors.text.primary,
                  transition: 'all 0.15s ease',
                  borderBottom: `1px solid ${ODLTheme.colors.grey100}`,
                  fontSize: ODLTheme.typography.fontSize.base
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {showIcons && (
                    // Use Carbon icons for small sizes (< 24px)
                    <Icon
                      name={item.icon || (item.type === 'file' ? 'document' : 'folder')}
                      size={16}
                      color={isSelected ? 'white' : item.type === 'file' ? ODLTheme.colors.grey400 : '#FF9800'}
                    />
                  )}
                  <span style={{ 
                    fontWeight: isSelected ? 500 : 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.label}
                  </span>
                </div>
                {hasChildren && (
                  <Icon
                    name="chevron-right"
                    size={14}
                    color={isSelected ? 'white' : ODLTheme.colors.grey400}
                  />
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