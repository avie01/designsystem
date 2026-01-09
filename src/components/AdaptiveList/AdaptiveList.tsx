import React, { useState } from 'react';
import Table, { TableProps } from '../Table/Table';
import Cards from '../CardComponents/Cards/Cards';
import ThumbnailCards from '../ThumbnailCards/ThumbnailCards';
import PopupMenu, { PopupMenuItem } from '../PopupMenu/PopupMenu';

export type ViewType = 'compact' | 'comfortable' | 'small-grid' | 'large-grid' | 'metadata' | 'table';

export interface AdaptiveListProps<T> extends TableProps<T> {
  /** The view type for displaying the list */
  viewType?: ViewType;
  /** Callback when view type changes */
  onViewTypeChange?: (viewType: ViewType) => void;
  /** Menu items for each row/card */
  getMenuItems?: (item: T) => PopupMenuItem[];
  /** Callback when menu item is clicked */
  onMenuAction?: (action: string, item: T) => void;
}

function AdaptiveList<T extends Record<string, any>>({
  viewType = 'table',
  onViewTypeChange,
  selectable = true,
  data,
  selectedKeys,
  onRowSelect,
  getRowKey,
  getMenuItems,
  onMenuAction,
  ...tableProps
}: AdaptiveListProps<T>) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);

  // Handle menu open/close
  const handleMenuClick = (event: React.MouseEvent, item: T) => {
    event.stopPropagation();
    const key = getRowKey ? getRowKey(item) : item.id.toString();
    
    if (menuOpen === key) {
      setMenuOpen(null);
      setMenuPosition(null);
    } else {
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: rect.left
      });
      setMenuOpen(key);
    }
  };

  const handleMenuClose = () => {
    setMenuOpen(null);
    setMenuPosition(null);
  };

  const handleMenuAction = (action: string, item: T) => {
    onMenuAction?.(action, item);
    handleMenuClose();
  };

  // AdaptiveList wraps Table with default bulk actions configuration
  // Different view types can be handled here in the future
  
  // Render cards for compact, comfortable, metadata, small-grid, and large-grid views
  if (viewType === 'compact' || viewType === 'comfortable' || viewType === 'metadata' || viewType === 'small-grid' || viewType === 'large-grid') {
    const handleCardSelect = (item: any, selected: boolean) => {
      const key = getRowKey ? getRowKey(item) : item.id.toString();
      let newSelectedKeys: string[];
      
      if (selected) {
        newSelectedKeys = selectedKeys ? [...selectedKeys, key] : [key];
      } else {
        newSelectedKeys = selectedKeys ? selectedKeys.filter(k => k !== key) : [];
      }
      
      // Convert keys back to items for onRowSelect callback
      const selectedItems = data.filter((dataItem: any) => {
        const dataKey = getRowKey ? getRowKey(dataItem) : dataItem.id.toString();
        return newSelectedKeys.includes(dataKey);
      });
      
      onRowSelect?.(selectedItems);
    };

    // Use grid layout for small-grid view with ThumbnailCards
    if (viewType === 'small-grid') {
      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
          gap: '16px',
          padding: '16px'
        }}>
          {data.map((item: any) => {
            const key = getRowKey ? getRowKey(item) : item.id.toString();
            const isSelected = selectedKeys?.includes(key) || false;
            // Remove file extension from title for small-grid view
            const titleWithoutExtension = item.name?.replace(/\.[^/.]+$/, '') || item.name;
            
            return (
              <ThumbnailCards
                key={key}
                size="small"
                fileType={item.name?.split('.').pop()?.toLowerCase() || 'folder'}
                selected={isSelected}
                checked={isSelected}
                title={titleWithoutExtension}
                onCheckboxChange={(checked) => handleCardSelect(item, checked)}
                onIconClick={() => console.log('Menu clicked for:', item)}
              />
            );
          })}
        </div>
      );
    }

    // Use grid layout for large-grid view with ThumbnailCards
    if (viewType === 'large-grid') {
      return (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(272px, 1fr))', 
            gap: '24px',
            padding: '24px'
          }}>
            {data.map((item: any) => {
              const key = getRowKey ? getRowKey(item) : item.id.toString();
              const isSelected = selectedKeys?.includes(key) || false;
              // Remove file extension from title for large-grid view
              const titleWithoutExtension = item.name?.replace(/\.[^/.]+$/, '') || item.name;
              
              return (
                <ThumbnailCards
                  key={key}
                  size="large"
                  fileType={item.name?.split('.').pop()?.toLowerCase() || 'folder'}
                  selected={isSelected}
                  checked={isSelected}
                  title={titleWithoutExtension}
                  onCheckboxChange={(checked) => handleCardSelect(item, checked)}
                  onIconClick={(event) => handleMenuClick(event, item)}
                />
              );
            })}
          </div>
          
          {/* PopupMenu for large grid view */}
          {menuOpen && menuPosition && getMenuItems && (
            <PopupMenu
              items={getMenuItems(data.find((item: T) => {
                const key = getRowKey ? getRowKey(item) : item.id.toString();
                return key === menuOpen;
              })!).map((menuItem) => ({
                ...menuItem,
                action: () => handleMenuAction(menuItem.id, data.find((item: T) => {
                  const key = getRowKey ? getRowKey(item) : item.id.toString();
                  return key === menuOpen;
                })!)
              }))}
              open={true}
              onClose={handleMenuClose}
              position={menuPosition}
            />
          )}
        </>
      );
    }

    return (
      <>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {data.map((item: any) => {
            const key = getRowKey ? getRowKey(item) : item.id.toString();
            const isSelected = selectedKeys?.includes(key) || false;
            
            return (
              <Cards
                key={key}
                type={viewType}
                iconGutter={true}
                fileType={item.name?.split('.').pop()?.toLowerCase() || 'folder'}
                selected={isSelected}
                title={item.name}
                subtitle={`${item.modifiedBy} • ${item.modifiedDate}`}
                tag={item.documentId}
                onSelect={(selected) => handleCardSelect(item, selected)}
                showMenuIcon={true}
                onMenuClick={(event) => handleMenuClick(event, item)}
                extensionSize={viewType === 'metadata'}
                showMetadata={viewType === 'metadata'}
              />
            );
          })}
        </div>
        
        {/* PopupMenu for card views */}
        {menuOpen && menuPosition && getMenuItems && (
          <PopupMenu
            items={getMenuItems(data.find((item: T) => {
              const key = getRowKey ? getRowKey(item) : item.id.toString();
              return key === menuOpen;
            })!).map((menuItem) => ({
              ...menuItem,
              action: () => handleMenuAction(menuItem.id, data.find((item: T) => {
                const key = getRowKey ? getRowKey(item) : item.id.toString();
                return key === menuOpen;
              })!)
            }))}
            open={true}
            onClose={handleMenuClose}
            position={menuPosition}
          />
        )}
      </>
    );
  }
  
  // Default table view
  return (
    <Table
      {...tableProps}
      data={data}
      selectedKeys={selectedKeys}
      onRowSelect={onRowSelect}
      getRowKey={getRowKey}
      bulkActions={true}
      selectable={selectable}
      paginated={true}
      pageSize={tableProps.pageSize || 5}
      compact={viewType === 'compact'}
    />
  );
}

export { AdaptiveList };
export default AdaptiveList;