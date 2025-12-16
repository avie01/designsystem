import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

export interface TreeNode {
  id: string;
  label: string;
  path?: string;
  icon?: string;
  children?: TreeNode[];
  disabled?: boolean;
  expanded?: boolean;
}

export interface TreeNavigationProps {
  /** Array of tree nodes */
  nodes: TreeNode[];
  /** Current active path */
  currentPath?: string;
  /** Callback when navigation occurs */
  onNavigate?: (path: string) => void;
  /** Whether to show icons */
  showIcons?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Whether to allow multiple expanded nodes */
  allowMultipleExpanded?: boolean;
  /** Initial expanded state */
  initiallyExpanded?: string[];
}

const TreeNavigation: React.FC<TreeNavigationProps> = ({
  nodes,
  currentPath,
  onNavigate,
  showIcons = true,
  className,
  allowMultipleExpanded = false,
  initiallyExpanded = [],
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(initiallyExpanded)
  );

  const handleNodeClick = (node: TreeNode) => {
    if (node.disabled) return;

    if (node.children && node.children.length > 0) {
      // Toggle expansion
      setExpandedNodes(prev => {
        const newSet = new Set(prev);
        if (newSet.has(node.id)) {
          newSet.delete(node.id);
        } else {
          if (!allowMultipleExpanded) {
            newSet.clear();
          }
          newSet.add(node.id);
        }
        return newSet;
      });
    } else if (node.path && onNavigate) {
      // Navigate to path
      onNavigate(node.path);
    }
  };

  const renderNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const isActive = currentPath === node.path;
    const hasChildren = node.children && node.children.length > 0;
    const isClickable = node.path || hasChildren;

    return (
      <div key={node.id} className="w-full">
        <button
          onClick={() => handleNodeClick(node)}
          disabled={node.disabled}
          className={clsx(
            'w-full flex items-center px-3 py-2 text-sm transition-colors duration-200',
            'hover:bg-gray-100 rounded-md',
            isActive && 'bg-blue-50 text-blue-700 font-medium',
            node.disabled && 'opacity-50 cursor-not-allowed',
            !isClickable && 'cursor-default',
            level > 0 && 'ml-4'
          )}
          style={{ paddingLeft: `${level * 16 + 12}px` }}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'chevron-down' : 'chevron-right'}
              className="w-4 h-4 mr-2 text-gray-500 transition-transform duration-200"
            />
          )}
          
          {showIcons && node.icon && !hasChildren && (
            <Icon
              name={node.icon}
              className="w-4 h-4 mr-2 text-gray-500"
            />
          )}
          
          <span className="flex-1 text-left">{node.label}</span>
        </button>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={clsx('w-full', className)}>
      <div className="flex flex-col space-y-1">
        {nodes.map(node => renderNode(node))}
      </div>
    </nav>
  );
};

export default TreeNavigation; 