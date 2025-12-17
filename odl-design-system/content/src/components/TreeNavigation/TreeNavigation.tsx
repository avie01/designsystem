import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

// Custom Folder Icon - filled version
const FolderIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V13C1 13.2652 1.10536 13.5196 1.29289 13.7071C1.48043 13.8946 1.73478 14 2 14H14C14.2652 14 14.5196 13.8946 14.7071 13.7071C14.8946 13.5196 15 13.2652 15 13V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4H8L6.295 2.295C6.20197 2.20142 6.09134 2.12717 5.96948 2.07654C5.84763 2.02591 5.71696 1.9999 5.585 2H2Z" fill={ODLTheme.colors.warning}/>
  </svg>
);

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  children?: TreeNode[];
  path?: string;
  type?: 'folder' | 'file';
}

export interface TreeNavigationProps {
  title?: string;
  nodes: TreeNode[];
  onNodeSelect?: (node: TreeNode) => void;
  selectedNodeId?: string;
  expandedNodeIds?: string[];
  showFilter?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hideScrollbar?: boolean;
}

const TreeNavigation: React.FC<TreeNavigationProps> = ({
  title = 'Global folder',
  nodes,
  onNodeSelect,
  selectedNodeId,
  expandedNodeIds = [],
  showFilter = true,
  className = '',
  style,
  hideScrollbar = false,
}) => {
  const [localExpandedIds, setLocalExpandedIds] = useState<Set<string>>(new Set(expandedNodeIds));
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const handleNodeClick = (node: TreeNode, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (node.children && node.children.length > 0) {
      // Toggle expansion for folders
      const newExpanded = new Set(localExpandedIds);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
      } else {
        newExpanded.add(node.id);
      }
      setLocalExpandedIds(newExpanded);
    }
    
    onNodeSelect?.(node);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = localExpandedIds.has(node.id);
    const isSelected = selectedNodeId === node.id;
    const isHovered = hoveredNodeId === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isFolder = node.type === 'folder' || hasChildren;

    return (
      <div key={node.id}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
            paddingLeft: `${parseInt(ODLTheme.spacing[3]) + level * parseInt(ODLTheme.spacing[5])}px`,
            cursor: 'pointer',
            backgroundColor: isSelected 
              ? ODLTheme.colors.primaryLight
              : isHovered 
                ? ODLTheme.colors.surface 
                : 'transparent',
            color: isSelected ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
            transition: ODLTheme.transitions.fast,
            fontSize: ODLTheme.typography.fontSize.base,
          }}
          onClick={(e) => handleNodeClick(node, e)}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {/* Folder/File Icon */}
          <div style={{ marginRight: ODLTheme.spacing[2], display: 'flex', alignItems: 'center' }}>
            {isFolder ? (
              <FolderIcon size={16} />
            ) : (
              <Icon
                name="document"
                size={16}
                color={ODLTheme.colors.text.secondary}
              />
            )}
          </div>
          
          {/* Label */}
          <span
            style={{
              fontWeight: isSelected ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.label}
          </span>
          
          {/* Chevron for expandable items */}
          {hasChildren && (
            <Icon
              name="chevron-right"
              size={16}
              color={ODLTheme.colors.text.tertiary}
              style={{
                marginLeft: ODLTheme.spacing[2],
                transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: ODLTheme.transitions.transform,
              }}
            />
          )}
        </div>
        
        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div style={{ 
            borderLeft: level > 0 ? `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}` : 'none',
            marginLeft: level > 0 ? ODLTheme.spacing[5] : '0',
          }}>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: ODLTheme.colors.white,
        border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
        borderRadius: ODLTheme.borders.radius.md,
        overflow: 'hidden',
        width: '280px',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
          borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
          backgroundColor: ODLTheme.colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
          <FolderIcon size={18} />
          <span
            style={{
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              color: ODLTheme.colors.text.primary,
            }}
          >
            {title}
          </span>
        </div>
        {showFilter && (
          <Icon
            name="filter"
            size={18}
            color={ODLTheme.colors.text.secondary}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      
      {/* Tree Content */}
      <div
        style={{
          maxHeight: '600px',
          overflowY: hideScrollbar ? 'hidden' : 'auto',
          overflowX: 'hidden',
        }}
      >
        {nodes.map(node => renderNode(node))}
        
        {nodes.length === 0 && (
          <div
            style={{
              padding: ODLTheme.spacing[6],
              textAlign: 'center',
              color: ODLTheme.colors.text.tertiary,
              fontSize: ODLTheme.typography.fontSize.base,
              fontFamily: ODLTheme.typography.fontFamily.sans,
            }}
          >
            No items to display
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNavigation;