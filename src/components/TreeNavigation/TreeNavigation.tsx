import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import FileType from '../FileType/FileType';
import { useTheme } from '../../../.storybook/theme-decorator';
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
  const { colors, theme } = useTheme();
  const [localExpandedIds, setLocalExpandedIds] = useState<Set<string>>(new Set(expandedNodeIds));
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  const handleNodeClick = (node: TreeNode, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (node.children && node.children.length > 0) {
      // Toggle expansion for folders
      const newExpanded = new Set(localExpandedIds);
      if (newExpanded.has(node.id)) {
        newExpanded.delete(node.id);
        setActiveNodeId(null); // Remove active state when collapsing
      } else {
        newExpanded.add(node.id);
        setActiveNodeId(node.id); // Set as active when expanding
      }
      setLocalExpandedIds(newExpanded);
    } else {
      // For files, set as active
      setActiveNodeId(node.id);
    }
    
    onNodeSelect?.(node);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = localExpandedIds.has(node.id);
    const isSelected = selectedNodeId === node.id || activeNodeId === node.id;
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
              ? (theme === 'dark' ? '#1B2E4A' : '#E0F3FE')
              : isHovered 
                ? colors.grey300
                : 'transparent',
            borderLeft: isSelected ? `4px solid ${colors.primaryMain}` : '4px solid transparent',
            color: isSelected ? colors.primaryNight : colors.textPrimary,
            transition: ODLTheme.transitions.fast,
            fontSize: ODLTheme.typography.fontSize.base,
          }}
          onClick={(e) => handleNodeClick(node, e)}
          onMouseEnter={() => setHoveredNodeId(node.id)}
          onMouseLeave={() => setHoveredNodeId(null)}
        >
          {/* Chevron for expandable items */}
          {hasChildren && (
            <div style={{ marginRight: ODLTheme.spacing[2] }}>
              <Icon
                name={isExpanded ? 'caret-down' : 'caret-right'}
                size={16}
                color={colors.grey700}
              />
            </div>
          )}
          
          {/* Folder/File Icon */}
          <div style={{ marginRight: ODLTheme.spacing[2], display: 'flex', alignItems: 'center' }}>
            <FileType type={isFolder ? 'folder' : 'doc'} size={20} />
          </div>
          
          {/* Label */}
          <span
            style={{
              fontWeight: 400,
              flex: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {node.label}
          </span>
        </div>
        
        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div>
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
        backgroundColor: colors.paper,
        border: `${ODLTheme.borders.width.thin} solid ${colors.grey400}`,
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
          borderBottom: `${ODLTheme.borders.width.thin} solid ${colors.grey400}`,
          backgroundColor: colors.background,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[2] }}>
          <FileType type="folder" size={20} />
          <span
            style={{
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              color: colors.textPrimary,
            }}
          >
            {title}
          </span>
        </div>
        {showFilter && (
          <Icon
            name="filter"
            size={18}
            color={colors.textSecondary}
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
              color: colors.textTertiary,
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