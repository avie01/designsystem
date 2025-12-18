import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

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
            <Icon
              name={isFolder ? 'folder' : 'document'}
              size={parseInt(ODLTheme.spacing[4])}
              color={isFolder ? ODLTheme.colors.warning : ODLTheme.colors.text.secondary}
              aria-hidden="true"
            />
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
              size={parseInt(ODLTheme.spacing[4])}
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
        width: `${280}px`,
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
          <Icon name="folder" size={parseInt(ODLTheme.spacing[4])} />
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
            size={parseInt(ODLTheme.spacing[4])}
            color={ODLTheme.colors.text.secondary}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
      
      {/* Tree Content */}
      <div
        style={{
          maxHeight: `${600}px`,
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