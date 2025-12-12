import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

export interface ColumnDefinition {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  alignRight?: boolean;
}

export interface ColumnGroup {
  id: string;
  name: string;
  columns: ColumnDefinition[];
  expanded?: boolean;
}

export interface ColumnSelectionTreeProps {
  /** Array of column groups */
  groups: ColumnGroup[];
  /** Currently selected columns */
  selectedColumns: string[];
  /** Callback when column selection changes */
  onColumnSelectionChange: (selectedColumns: string[]) => void;
  /** Whether to show icons */
  showIcons?: boolean;
  /** Additional CSS classes */
  className?: string;
}

const ColumnSelectionTree: React.FC<ColumnSelectionTreeProps> = ({
  groups,
  selectedColumns,
  onColumnSelectionChange,
  showIcons = true,
  className,
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.filter(g => g.expanded).map(g => g.id))
  );

  const handleGroupToggle = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleColumnToggle = (columnKey: string) => {
    const newSelected = new Set(selectedColumns);
    if (newSelected.has(columnKey)) {
      newSelected.delete(columnKey);
    } else {
      newSelected.add(columnKey);
    }
    onColumnSelectionChange(Array.from(newSelected));
  };

  const handleSelectAllInGroup = (group: ColumnGroup) => {
    const groupColumnKeys = group.columns.map(col => col.key);
    const newSelected = new Set(selectedColumns);
    
    // Check if all columns in group are selected
    const allSelected = groupColumnKeys.every(key => newSelected.has(key));
    
    if (allSelected) {
      // Deselect all columns in group
      groupColumnKeys.forEach(key => newSelected.delete(key));
    } else {
      // Select all columns in group
      groupColumnKeys.forEach(key => newSelected.add(key));
    }
    
    onColumnSelectionChange(Array.from(newSelected));
  };

  const renderColumn = (column: ColumnDefinition, _groupId: string): React.ReactNode => {
    const isSelected = selectedColumns.includes(column.key);
    
    return (
      <div key={column.key} className="w-full">
        <button
          onClick={() => handleColumnToggle(column.key)}
          className={clsx(
            'w-full flex items-center px-3 py-1.5 text-sm transition-colors duration-200',
            'hover:bg-gray-100 rounded-md',
            isSelected && 'bg-blue-50 text-blue-700 font-medium',
            'ml-8'
          )}
        >
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleColumnToggle(column.key)}
              aria-label={`Select ${column.header} column`}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="flex-1 text-left">{column.header}</span>
            {column.sortable && (
              <Icon name="sort" className="w-3 h-3 ml-2 text-gray-400" />
            )}
          </div>
        </button>
      </div>
    );
  };

  const renderGroup = (group: ColumnGroup): React.ReactNode => {
    const isExpanded = expandedGroups.has(group.id);
    const groupColumnKeys = group.columns.map(col => col.key);
    const selectedInGroup = groupColumnKeys.filter(key => selectedColumns.includes(key));
    const allSelected = selectedInGroup.length === groupColumnKeys.length;
    const someSelected = selectedInGroup.length > 0 && selectedInGroup.length < groupColumnKeys.length;

    return (
      <div key={group.id} className="w-full">
        <div className="flex items-center">
          <button
            onClick={() => handleGroupToggle(group.id)}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
          >
            <Icon
              name={isExpanded ? 'chevron-down' : 'chevron-right'}
              className="w-4 h-4 mr-2 text-gray-500 transition-transform duration-200"
            />
            {showIcons && (
              <Icon name="folder" className="w-4 h-4 mr-2 text-gray-500" />
            )}
            <span className="flex-1 text-left">{group.name}</span>
            <span className="text-xs text-gray-500 ml-2">
              ({selectedInGroup.length}/{groupColumnKeys.length})
            </span>
          </button>
          
          <button
            onClick={() => handleSelectAllInGroup(group)}
            className="ml-2 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors duration-200"
            title={allSelected ? 'Deselect all' : 'Select all'}
          >
            {allSelected ? 'Deselect All' : someSelected ? 'Select All' : 'Select All'}
          </button>
        </div>
        
        {isExpanded && (
          <div className="mt-1 space-y-1">
            {group.columns.map(column => renderColumn(column, group.id))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={clsx('w-full border border-gray-200 rounded-lg bg-white', className)}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Column Selection</h3>
        <p className="text-sm text-gray-600 mt-1">
          Select columns to display in the table ({selectedColumns.length} selected)
        </p>
      </div>
      
      <div className="p-4">
        <nav className="w-full">
          <div className="flex flex-col space-y-2">
            {groups.map(group => renderGroup(group))}
          </div>
        </nav>
      </div>
      
      {selectedColumns.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedColumns.length} column{selectedColumns.length !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => onColumnSelectionChange([])}
              className="text-sm text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelectionTree; 