import React, { useState } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';
import TreeNavigation, { TreeNode } from '../TreeNavigation/TreeNavigation';

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

  return (
    <div
      id="dual-pane-container"
      className={className}
      style={{
        display: 'flex',
        height: '600px',
        background: ODLTheme.colors.grey100,
        borderRadius: '8px',
        border: `1px solid ${ODLTheme.colors.grey200}`,
        overflow: 'hidden',
        position: 'relative',
        userSelect: isResizing ? 'none' : 'auto',
        ...style
      }}
    >
      {/* Left Pane - Tree Navigation */}
      <div
        style={{
          width: `${leftPaneWidth}%`,
          minWidth: '200px',
          background: ODLTheme.colors.grey50,
          borderRight: `1px solid ${ODLTheme.colors.grey200}`,
          overflowY: 'auto',
          overflowX: 'hidden'
        }}
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
        onMouseDown={handleMouseDown}
        style={{
          width: '4px',
          background: isResizing ? ODLTheme.colors.primary : ODLTheme.colors.grey200,
          cursor: 'col-resize',
          transition: 'background 0.2s ease',
          position: 'relative',
          zIndex: 10
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = ODLTheme.colors.grey300;
        }}
        onMouseLeave={(e) => {
          if (!isResizing) {
            e.currentTarget.style.background = ODLTheme.colors.grey200;
          }
        }}
      />

      {/* Right Pane - Detail View */}
      <div
        style={{
          flex: 1,
          background: 'white',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {selectedNode ? (
          <>
            {/* Header */}
            <div
              style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${ODLTheme.colors.grey200}`,
                background: 'white'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Icon
                  name={getFileIcon(selectedNode)}
                  size={24}
                  color={selectedNode.type === 'folder' ? '#FF9800' : ODLTheme.colors.grey500}
                />
                <h2
                  style={{
                    margin: 0,
                    fontSize: '20px',
                    fontWeight: 600,
                    color: ODLTheme.colors.text
                  }}
                >
                  {selectedNode.label}
                </h2>
              </div>

              {/* Metadata */}
              {showMetadata && selectedNode.metadata && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '12px',
                    marginTop: '16px'
                  }}
                >
                  {Object.entries(selectedNode.metadata).map(([key, value]) => (
                    <div key={key}>
                      <div
                        style={{
                          fontSize: '11px',
                          color: ODLTheme.colors.textLight,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          marginBottom: '4px'
                        }}
                      >
                        {key.replace(/_/g, ' ')}
                      </div>
                      <div
                        style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          color: ODLTheme.colors.text,
                          fontWeight: 500
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div style={{ padding: '24px', flex: 1 }}>
              {selectedNode.content ? (
                selectedNode.content
              ) : (
                <div
                  style={{
                    color: ODLTheme.colors.textLight,
                    fontSize: ODLTheme.typography.fontSize.base,
                    lineHeight: 1.6
                  }}
                >
                  {selectedNode.type === 'folder' ? (
                    <div>
                      <p>This folder contains {selectedNode.children?.length || 0} items.</p>
                      {selectedNode.children && selectedNode.children.length > 0 && (
                        <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
                          {selectedNode.children.map((child: any) => (
                            <li key={child.id} style={{ marginBottom: '8px' }}>
                              <Icon
                                name={getFileIcon(child)}
                                size={14}
                                color={child.type === 'folder' ? '#FF9800' : ODLTheme.colors.grey400}
                                style={{ marginRight: '8px', verticalAlign: 'middle' }}
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: ODLTheme.colors.textLight
            }}
          >
            <Icon name="document-blank" size={48} color={ODLTheme.colors.grey300} />
            <p style={{ marginTop: '16px', fontSize: ODLTheme.typography.fontSize.base }}>
              Select an item to view details
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DualPaneExplorer;