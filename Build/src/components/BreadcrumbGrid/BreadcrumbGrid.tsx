import React, { useState } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

export interface GridItem {
  id: string;
  label: string;
  type: 'folder' | 'file';
  icon?: string;
  size?: string;
  modified?: string;
  status?: 'draft' | 'review' | 'approved' | 'archived';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  owner?: string;
  tags?: string[];
  description?: string;
  fileCount?: number;
  lastAccessed?: string;
  sharedWith?: number;
  children?: GridItem[];
}

export interface BreadcrumbGridProps {
  data: GridItem[];
  onNavigate?: (path: GridItem[]) => void;
  onItemClick?: (item: GridItem) => void;
  gridColumns?: number;
  showDetails?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const BreadcrumbGrid: React.FC<BreadcrumbGridProps> = ({
  data,
  onNavigate,
  onItemClick,
  gridColumns = 6,
  showDetails = true,
  className = '',
  style
}) => {
  const [currentPath, setCurrentPath] = useState<GridItem[]>([
    { id: 'root', label: 'Home', type: 'folder' }
  ]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Get current folder contents
  const getCurrentItems = (): GridItem[] => {
    if (currentPath.length === 1) {
      return data;
    }
    
    let current = data;
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.find(item => item.id === currentPath[i].id);
      if (folder?.children) {
        current = folder.children;
      } else {
        return [];
      }
    }
    return current;
  };

  const handleItemClick = (item: GridItem) => {
    if (item.type === 'folder' && item.children) {
      const newPath = [...currentPath, item];
      setCurrentPath(newPath);
      onNavigate?.(newPath);
    } else {
      onItemClick?.(item);
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    onNavigate?.(newPath);
  };

  const currentItems = getCurrentItems();

  // Convert path to breadcrumb items - all except last should be clickable
  const breadcrumbItems = currentPath.map((item, index) => ({
    label: item.label,
    path: index < currentPath.length - 1 ? index.toString() : undefined // Only add path for non-current items
  }));

  // Use Carbon icons for all file types
  const getFileIcon = (item: GridItem): string => {
    if (item.icon) return item.icon;
    if (item.type === 'folder') return 'folder';
    
    const ext = item.label.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'doc':
      case 'docx':
      case 'docm':
      case 'dot':
      case 'odt': return 'document';
      case 'xls':
      case 'xlsx':
      case 'csv':
      case 'ods': return 'table';
      case 'ppt':
      case 'pps':
      case 'pot':
      case 'potx':
      case 'potm': return 'presentation-file';
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'bmp':
      case 'svg':
      case 'ai':
      case 'eps': return 'image';
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'mkv': return 'video';
      case 'mp3':
      case 'wav':
      case 'flac': return 'music';
      case 'html':
      case 'htm': return 'html';
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'css':
      case 'py':
      case 'java':
      case 'cpp': return 'code';
      case 'zip':
      case 'rar':
      case '7z':
      case 'tar':
      case 'gz': return 'archive';
      case 'eml':
      case 'msg': return 'email';
      case 'vcf': return 'user';
      default: return 'document';
    }
  };

  const getIconColor = (item: GridItem): string => {
    if (item.type === 'folder') return '#FF9800';
    
    const ext = item.label.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return '#DC2626';
      case 'doc':
      case 'docx': return '#2563EB';
      case 'xls':
      case 'xlsx': return '#10B981';
      case 'ppt':
      case 'pptx': return '#F59E0B';
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
      case 'svg': return '#8B5CF6';
      case 'mp4':
      case 'avi':
      case 'mov': return '#EC4899';
      case 'zip':
      case 'rar':
      case '7z': return '#6B7280';
      default: return ODLTheme.colors.grey400;
    }
  };

  return (
    <div
      className={className}
      style={{
        background: 'white',
        borderRadius: '8px',
        border: `1px solid ${ODLTheme.colors.grey200}`,
        padding: '20px',
        ...style
      }}
    >
      {/* Breadcrumb Navigation with folder info */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <Breadcrumb 
            items={breadcrumbItems} 
            onNavigate={(path) => handleBreadcrumbClick(parseInt(path))}
          />
          <div style={{ display: 'flex', gap: '16px', fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.textLight }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="folder" size={14} color={ODLTheme.colors.grey400} />
              {currentItems.filter(i => i.type === 'folder').length} folders
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Icon name="document" size={14} color={ODLTheme.colors.grey400} />
              {currentItems.filter(i => i.type === 'file').length} files
            </span>
          </div>
        </div>
      </div>

      {/* Grid View */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px',
          minHeight: '300px'
        }}
      >
        {currentItems.map((item) => {
          const isHovered = hoveredItem === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: showDetails ? '24px 20px' : '20px 16px',
                border: '1px solid #d1d1d1',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: isHovered ? '#f8f9fa' : 'white',
                transform: isHovered ? 'translateY(-2px)' : 'none',
                boxShadow: isHovered 
                  ? '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  : '0 1px 3px rgba(0, 0, 0, 0.08)',
                minHeight: showDetails ? '200px' : '160px',
                position: 'relative'
              }}
            >
              {/* Use Carbon icons for all file types */}
              <Icon
                name={getFileIcon(item)}
                size={showDetails ? 40 : 32}
                color={getIconColor(item)}
              />
              <span
                style={{
                  marginTop: '12px',
                  fontSize: ODLTheme.typography.fontSize.sm,
                  color: ODLTheme.colors.text,
                  textAlign: 'center',
                  wordBreak: 'break-word',
                  lineHeight: 1.3,
                  fontWeight: item.type === 'folder' ? 500 : 400,
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {item.label}
              </span>
              
              {/* Status Badge */}
              {item.status && (
                <span
                  style={{
                    marginTop: '8px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 500,
                    background: 
                      item.status === 'approved' ? '#DCFCE7' :
                      item.status === 'review' ? '#FEF3C7' :
                      item.status === 'draft' ? '#E0E7FF' :
                      '#F3F4F6',
                    color:
                      item.status === 'approved' ? '#166534' :
                      item.status === 'review' ? '#92400E' :
                      item.status === 'draft' ? '#312E81' :
                      '#6B7280'
                  }}
                >
                  {item.status}
                </span>
              )}

              {/* Priority Indicator */}
              {item.priority && item.priority !== 'low' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 
                      item.priority === 'urgent' ? '#DC2626' :
                      item.priority === 'high' ? '#F59E0B' :
                      '#3B82F6'
                  }}
                />
              )}

              {showDetails && (
                <div style={{ 
                  marginTop: '8px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '2px',
                  width: '100%'
                }}>
                  {/* File count for folders */}
                  {item.type === 'folder' && item.fileCount !== undefined && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: ODLTheme.colors.textLight,
                        textAlign: 'center'
                      }}
                    >
                      {item.fileCount} items
                    </span>
                  )}
                  
                  {/* Size for files */}
                  {item.size && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: ODLTheme.colors.textLight,
                        textAlign: 'center'
                      }}
                    >
                      {item.size}
                    </span>
                  )}
                  
                  {/* Modified date */}
                  {item.modified && (
                    <span
                      style={{
                        fontSize: '11px',
                        color: ODLTheme.colors.textLight,
                        textAlign: 'center'
                      }}
                    >
                      {item.modified}
                    </span>
                  )}
                  
                  {/* Owner */}
                  {item.owner && (
                    <span
                      style={{
                        fontSize: '10px',
                        color: ODLTheme.colors.primary,
                        textAlign: 'center',
                        fontWeight: 500
                      }}
                    >
                      {item.owner}
                    </span>
                  )}
                  
                  {/* Shared indicator - only show if shared with others */}
                  {item.sharedWith !== undefined && item.sharedWith > 0 && (
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#10B981',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '2px'
                      }}
                    >
                      <Icon name="user-multiple" size={10} color="#10B981" />
                      {item.sharedWith}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {currentItems.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px',
            color: ODLTheme.colors.textLight
          }}
        >
          <Icon name="folder-open" size={48} color={ODLTheme.colors.grey300} />
          <p style={{ marginTop: '16px', fontSize: ODLTheme.typography.fontSize.base }}>
            This folder is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default BreadcrumbGrid;