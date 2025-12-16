import React, { useState } from 'react';
import Icon from '../Icon/Icon';
import TreeNavigation, { TreeNode } from '../TreeNavigation/TreeNavigation';
import styles from './DualPaneExplorer.module.css';

export interface ExplorerNode extends TreeNode {
  content?: React.ReactNode;
  metadata?: {
    size?: string;
    modified?: string;
    created?: string;
    author?: string;
    version?: string;
    [key: string]: any;
  };
}

export interface DualPaneExplorerProps {
  data: ExplorerNode[];
  defaultSelectedId?: string;
  splitPosition?: number;
  showMetadata?: boolean;
  treeTitle?: string;
  onNodeSelect?: (node: ExplorerNode) => void;
  className?: string;
  style?: React.CSSProperties;
}

const DualPaneExplorer: React.FC<DualPaneExplorerProps> = ({
  data,
  defaultSelectedId,
  splitPosition = 30,
  showMetadata = true,
  treeTitle = 'Explorer',
  onNodeSelect,
  className = '',
  style
}) => {
  const [selectedNode, setSelectedNode] = useState<ExplorerNode | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>(defaultSelectedId || '');
  const [isResizing, setIsResizing] = useState(false);
  const [leftPaneWidth, setLeftPaneWidth] = useState(splitPosition);

  const findNode = (nodes: ExplorerNode[], id: string): ExplorerNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children as ExplorerNode[], id);
        if (found) return found;
      }
    }
    return null;
  };

  const handleNodeSelect = (node: TreeNode) => {
    const explorerNode = findNode(data, node.id);
    if (explorerNode) {
      setSelectedNode(explorerNode);
      setSelectedNodeId(node.id);
      onNodeSelect?.(explorerNode);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const container = document.getElementById('dual-pane-container');
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

      if (newWidth >= 20 && newWidth <= 60) {
        setLeftPaneWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const getFileIcon = (node: ExplorerNode): string => {
    if (node.icon) return node.icon;
    if (node.type === 'folder') return 'folder';

    const ext = node.label.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md': return 'document-blank';
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx': return 'code';
      case 'json': return 'json';
      case 'css':
      case 'scss': return 'color-palette';
      case 'html': return 'html';
      case 'pdf': return 'document-pdf';
      case 'png':
      case 'jpg':
      case 'svg': return 'image';
      default: return 'document';
    }
  };

  const containerClasses = [
    styles.container,
    isResizing ? styles.containerResizing : '',
    className
  ].filter(Boolean).join(' ');

  const resizerClasses = [
    styles.resizer,
    isResizing ? styles.resizerActive : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      id="dual-pane-container"
      className={containerClasses}
      style={style}
    >
      {/* Left Pane - Tree Navigation */}
      <div
        className={styles.leftPane}
        style={{ width: `${leftPaneWidth}%` }}
      >
        <TreeNavigation
          title={treeTitle}
          nodes={data}
          onNodeSelect={handleNodeSelect}
          selectedNodeId={selectedNodeId}
          showFilter={false}
          style={{ border: 'none', borderRadius: 0, height: '100%' }}
        />
      </div>

      {/* Resizer */}
      <div
        className={resizerClasses}
        onMouseDown={handleMouseDown}
      />

      {/* Right Pane - Detail View */}
      <div className={styles.rightPane}>
        {selectedNode ? (
          <>
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <Icon
                  name={getFileIcon(selectedNode)}
                  size={24}
                  color={selectedNode.type === 'folder' ? '#FF9800' : '#6f6f6f'}
                />
                <h2 className={styles.title}>
                  {selectedNode.label}
                </h2>
              </div>

              {/* Metadata */}
              {showMetadata && selectedNode.metadata && (
                <div className={styles.metadataGrid}>
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key}>
                      <div className={styles.metadataLabel}>
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div className={styles.metadataValue}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className={styles.contentArea}>
              {selectedNode.content ? (
                selectedNode.content
              ) : (
                <div className={styles.defaultContent}>
                  {selectedNode.type === 'folder' ? (
                    <div>
                      <p>This folder contains {selectedNode.children?.length || 0} items.</p>
                      {selectedNode.children && selectedNode.children.length > 0 && (
                        <ul className={styles.childrenList}>
                          {selectedNode.children.map((child: any) => (
                            <li key={child.id} className={styles.childItem}>
                              <Icon
                                name={getFileIcon(child)}
                                size={14}
                                color={child.type === 'folder' ? '#FF9800' : '#a8a8a8'}
                                className={styles.childIcon}
                              />
                              {child.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <p>Select this item to view its contents.</p>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Icon name="document-blank" size={48} color="#c6c6c6" />
            <p className={styles.emptyText}>
              Select an item to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DualPaneExplorer;
