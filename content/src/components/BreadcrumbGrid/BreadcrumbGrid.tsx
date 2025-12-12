import React, { useState } from 'react';
import ODLTheme from '../../styles/ODLTheme';
import Icon from '../Icon/Icon';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import styles from './BreadcrumbGrid.module.css';

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
  gridColumns: _gridColumns = 6,
  showDetails = true,
  className = '',
  style
}) => {
  const [currentPath, setCurrentPath] = useState<GridItem[]>([
    { id: 'root', label: 'Home', type: 'folder' }
  ]);

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

  const breadcrumbItems = currentPath.map((item, index) => ({
    label: item.label,
    path: index < currentPath.length - 1 ? index.toString() : undefined
  }));

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

  const getStatusClass = (status: string): string => {
    switch (status) {
      case 'approved': return styles.statusApproved;
      case 'review': return styles.statusReview;
      case 'draft': return styles.statusDraft;
      case 'archived': return styles.statusArchived;
      default: return '';
    }
  };

  const getPriorityClass = (priority: string): string => {
    switch (priority) {
      case 'urgent': return styles.priorityUrgent;
      case 'high': return styles.priorityHigh;
      case 'medium': return styles.priorityMedium;
      default: return '';
    }
  };

  return (
    <div
      className={`${styles.container} ${className}`}
      style={style}
    >
      <div className={styles.breadcrumbSection}>
        <div className={styles.breadcrumbRow}>
          <Breadcrumb
            items={breadcrumbItems}
            onNavigate={(path) => handleBreadcrumbClick(parseInt(path))}
          />
          <div className={styles.stats}>
            <span className={styles.statItem}>
              <Icon name="folder" size={14} color={ODLTheme.colors.grey400} />
              {currentItems.filter(i => i.type === 'folder').length} folders
            </span>
            <span className={styles.statItem}>
              <Icon name="document" size={14} color={ODLTheme.colors.grey400} />
              {currentItems.filter(i => i.type === 'file').length} files
            </span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {currentItems.map((item) => {
          const gridItemClass = [
            styles.gridItem,
            showDetails ? styles.gridItemDetailed : styles.gridItemCompact
          ].join(' ');

          const labelClass = [
            styles.itemLabel,
            item.type === 'folder' ? styles.itemLabelFolder : ''
          ].filter(Boolean).join(' ');

          return (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={gridItemClass}
            >
              <Icon
                name={getFileIcon(item)}
                size={showDetails ? 40 : 32}
                color={getIconColor(item)}
              />
              <span className={labelClass}>
                {item.label}
              </span>

              {item.status && (
                <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                  {item.status}
                </span>
              )}

              {item.priority && item.priority !== 'low' && (
                <div className={`${styles.priorityIndicator} ${getPriorityClass(item.priority)}`} />
              )}

              {showDetails && (
                <div className={styles.detailsContainer}>
                  {item.type === 'folder' && item.fileCount !== undefined && (
                    <span className={styles.detailText}>
                      {item.fileCount} items
                    </span>
                  )}

                  {item.size && (
                    <span className={styles.detailText}>
                      {item.size}
                    </span>
                  )}

                  {item.modified && (
                    <span className={styles.detailText}>
                      {item.modified}
                    </span>
                  )}

                  {item.owner && (
                    <span className={styles.ownerText}>
                      {item.owner}
                    </span>
                  )}

                  {item.sharedWith !== undefined && item.sharedWith > 0 && (
                    <span className={styles.sharedText}>
                      <Icon name="user-multiple" size={10} color="#047857" />
                      {item.sharedWith}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {currentItems.length === 0 && (
        <div className={styles.emptyState}>
          <Icon name="folder-open" size={48} color={ODLTheme.colors.grey300} />
          <p className={styles.emptyText}>
            This folder is empty
          </p>
        </div>
      )}
    </div>
  );
};

export default BreadcrumbGrid;
