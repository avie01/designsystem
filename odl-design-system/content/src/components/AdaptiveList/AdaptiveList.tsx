import React from 'react';
import Table, { TableProps } from '../Table/Table';
import Cards from '../CardComponents/Cards/Cards';

export type ViewType = 'compact' | 'comfortable' | 'small-grid' | 'large-grid' | 'metadata' | 'table' | 'accordion';

export interface AdaptiveListProps<T> extends TableProps<T> {
  /** The view type for displaying the list */
  viewType?: ViewType;
  /** Callback when view type changes */
  onViewTypeChange?: (viewType: ViewType) => void;
}

function AdaptiveList<T extends Record<string, any>>({
  viewType = 'table',
  onViewTypeChange,
  selectable = true,
  data,
  selectedKeys,
  onRowSelect,
  getRowKey,
  ...tableProps
}: AdaptiveListProps<T>) {
  // AdaptiveList wraps Table with default bulk actions configuration
  // Different view types can be handled here in the future
  
  // Render cards for compact, comfortable, metadata, and small-grid views
  if (viewType === 'compact' || viewType === 'comfortable' || viewType === 'metadata' || viewType === 'small-grid') {
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

    // Use grid layout for small-grid view
    if (viewType === 'small-grid') {
      return (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '16px',
          padding: '16px'
        }}>
          {data.map((item: any) => {
            const key = getRowKey ? getRowKey(item) : item.id.toString();
            const isSelected = selectedKeys?.includes(key) || false;
            // Remove file extension from title for small-grid view
            const titleWithoutExtension = item.name?.replace(/\.[^/.]+$/, '') || item.name;
            
            return (
              <Cards
                key={key}
                size="small-grid"
                selected={isSelected}
                title={titleWithoutExtension}
                subtitle=""
                tag=""
                onSelect={(selected) => handleCardSelect(item, selected)}
                showMenuIcon={false}
                onMenuClick={() => console.log('Menu clicked for:', item)}
              />
            );
          })}
        </div>
      );
    }

    return (
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
              onMenuClick={() => console.log('Menu clicked for:', item)}
              extensionSize={viewType === 'metadata'}
              showMetadata={viewType === 'metadata'}
            />
          );
        })}
      </div>
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