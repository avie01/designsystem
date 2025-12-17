import React, { useState } from 'react';
import { TableRowData, SortConfig } from '../../types/common';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};


export interface TableColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Display header for the column */
  label?: string;
  header?: string;
  /** Function to render the cell content */
  render?: (item: T) => React.ReactNode;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Width of the column */
  width?: string;
  /** Whether to align text to the right */
  alignRight?: boolean;
}

export interface TableProps<T extends TableRowData> {
  /** Array of data items */
  data: T[];
  /** Column definitions */
  columns: TableColumn<T>[];
  /** Whether to show row selection */
  selectable?: boolean;
  /** Callback when row is selected */
  onRowSelect?: (selectedItems: T[]) => void;
  /** Whether to show hover effects */
  hoverable?: boolean;
  /** Whether to show striped rows */
  striped?: boolean;
  /** Whether to show borders */
  bordered?: boolean;
  /** Whether to show compact spacing */
  compact?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Function to get unique key for each row */
  getRowKey?: (item: T) => string;
  /** Callback when row is activated (double-click or Enter key) */
  onRowActivate?: (item: T) => void;
  /** Table label for screen readers */
  'aria-label'?: string;
  /** Whether to show pagination */
  paginated?: boolean;
  /** Number of items per page */
  pageSize?: number;
  itemsPerPage?: number;
  /** Current page number */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when items per page changes */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  /** Table title to display in header */
  title?: string;
  /** Actions/icons to display in header */
  headerActions?: React.ReactNode;
}

function Table<T extends TableRowData>({
  data,
  columns,
  selectable = false,
  onRowSelect,
  hoverable = true,
  striped = true,
  bordered = false,
  compact = false,
  className,
  getRowKey,
  onRowActivate,
  'aria-label': ariaLabel,
  paginated = false,
  pageSize = 10,
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  onItemsPerPageChange,
  title,
  headerActions,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(pageSize || itemsPerPage);

  const getKey = (item: T, index: number) => {
    if (getRowKey) return getRowKey(item);
    return `row-${index}`;
  };

  const handleRowSelect = (item: T, checked: boolean) => {
    const key = getKey(item, data.indexOf(item));
    const newSelected = new Set(selectedRows);
    
    if (checked) {
      newSelected.add(key);
    } else {
      newSelected.delete(key);
    }
    
    setSelectedRows(newSelected);
    if (onRowSelect) {
      const selectedItems = data.filter((_, index) => newSelected.has(getKey(data[index], index)));
      onRowSelect(selectedItems);
    }
  };

  const handleRowClick = (item: T, index: number) => {
    const key = getKey(item, index);
    
    // Toggle selection when clicking on row
    if (selectable) {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }
      setSelectedRows(newSelected);
      
      if (onRowSelect) {
        const selectedItems = data.filter((item, idx) => 
          newSelected.has(getKey(item, idx))
        );
        onRowSelect(selectedItems);
      }
    }
    
    // Also call onRowActivate if provided
    if (onRowActivate) {
      onRowActivate(item);
    }
  };

  const handleRowKeyDown = (item: T, event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (onRowActivate) {
        onRowActivate(item);
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(data.map((item, index) => getKey(item, index)));
      setSelectedRows(allKeys);
      if (onRowSelect) {
        onRowSelect(data);
      }
    } else {
      setSelectedRows(new Set());
      if (onRowSelect) {
        onRowSelect([]);
      }
    }
  };

  const handleSort = (columnKey: string) => {
    const column = columns.find(col => col.key === columnKey);
    if (!column?.sortable) return;

    setSortConfig(current => {
      if (current?.key === columnKey) {
        if (current.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else {
          return null;
        }
      } else {
        return { key: columnKey, direction: 'asc' };
      }
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      // Always use the raw data values for sorting, not the rendered values
      const aValue = (a as any)[sortConfig.key];
      const bValue = (b as any)[sortConfig.key];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      
      // Convert to strings for comparison if needed
      const aStr = String(aValue);
      const bStr = String(bValue);
      
      // Try to parse as numbers if both look like numbers
      const aNum = Number(aStr);
      const bNum = Number(bStr);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // Otherwise compare as strings
      return sortConfig.direction === 'asc' 
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortConfig]);

  const handlePageChange = (page: number) => {
    setInternalCurrentPage(page);
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setInternalItemsPerPage(newItemsPerPage);
    setInternalCurrentPage(1);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const totalPages = Math.ceil(sortedData.length / internalItemsPerPage);
  const totalItems = sortedData.length;
  const startIndex = (internalCurrentPage - 1) * internalItemsPerPage;
  const endIndex = startIndex + internalItemsPerPage;
  const paginatedData = paginated ? sortedData.slice(startIndex, endIndex) : sortedData;

  const tableStyles = classNames(
    'min-w-full divide-y divide-odl-border',
    bordered ? 'border border-odl-border' : '',
    className
  );

  const rowStyles = (index: number, isSelected: boolean) => {
    const styles = [
      'transition-all duration-150 relative'
    ];
    
    if (isSelected) {
      styles.push('bg-odl-primary-light');
      // Using inset box-shadow for left border with ODL primary color
      styles.push('shadow-[inset_2px_0_0_0_#3560C1]');
    } else {
      if (hoverable) styles.push('hover:bg-odl-surface');
      if (striped && index % 2 === 1) styles.push('bg-gray-50');
    }
    
    if (selectable) styles.push('cursor-pointer');
    
    return classNames(...styles);
  };

  const cellStyles = classNames(
    compact ? 'px-2 py-1' : 'px-6 py-4',
    'whitespace-nowrap text-sm text-odl-text-primary'
  );

  return (
    <div className="overflow-hidden rounded-lg border border-odl-border">
      {(title || headerActions) && (
        <div className="px-6 py-3 bg-white border-b border-odl-border">
          <div className="flex items-center justify-between">
            <div className="text-left">
              {title && (
                <h3 className="text-lg font-semibold text-odl-text-primary">{title}</h3>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center space-x-2">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      <table className={classNames(tableStyles, 'table-fixed')} aria-label={ariaLabel}>
        <thead className="bg-odl-surface">
          <tr>
            {selectable && (
              <th scope="col" className={classNames(
                "relative px-6 py-3 w-12",
                bordered && "border-r border-gray-200"
              )}>
                <input
                  type="checkbox"
                  className="rounded border-odl-border text-odl-primary focus:ring-odl-primary"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
            )}
            {columns.map((column, columnIndex) => (
              <th
                key={column.key}
                scope="col"
                className={classNames(
                  'px-6 py-3 text-left text-sm font-medium text-odl-text-secondary uppercase tracking-wider whitespace-nowrap resize-x overflow-hidden',
                  column.sortable && 'cursor-pointer hover:bg-odl-background',
                  column.alignRight && 'text-right',
                  bordered && columnIndex < columns.length - 1 && 'border-r border-gray-200'
                )}
                onClick={() => column.sortable && handleSort(column.key)}
                style={{ width: column.width }}
              >
                <div className={classNames(
                  'flex items-center gap-1',
                  column.alignRight && 'justify-end'
                )}>
                  <span className="whitespace-nowrap">{column.label || column.header}</span>
                  {column.sortable && (
                    <span className="inline-block w-4">
                      {sortConfig?.key === column.key && (
                        <Icon
                          name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                          className="w-4 h-4"
                        />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-odl-border">
          {paginatedData.map((item, index) => {
            // Use the actual index from sortedData, not the paginated index
            const actualIndex = sortedData.indexOf(item);
            const key = getKey(item, actualIndex);
            const isSelected = selectedRows.has(key);
            
            return (
              <tr
                key={key}
                className={rowStyles(index, isSelected)}
                onClick={() => handleRowClick(item, actualIndex)}
                onKeyDown={(e) => handleRowKeyDown(item, e)}
                tabIndex={0}
                role="row"
                aria-selected={isSelected}
              >
                {selectable && (
                  <td className={classNames(
                    "whitespace-nowrap px-6",
                    compact ? 'py-1' : 'py-4',
                    bordered && "border-r border-gray-200"
                  )}>
                    <input
                      type="checkbox"
                      className="rounded border-odl-border text-odl-primary focus:ring-odl-primary"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(item, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map((column, columnIndex) => (
                  <td
                    key={column.key}
                    className={classNames(
                      cellStyles,
                      column.alignRight && 'text-right',
                      bordered && columnIndex < columns.length - 1 && 'border-r border-gray-200'
                    )}
                    style={{ width: column.width }}
                  >
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
      {paginated && totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '48px',
          padding: '0 24px',
          backgroundColor: 'white',
          borderTop: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`
        }}>
          {/* Left section: Items per page dropdown with "of X items" */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: ODLTheme.spacing[2],
            paddingRight: ODLTheme.spacing[6],
            borderRight: `${ODLTheme.borders.width.thin} solid #D1D1D1`
          }}>
            <div style={ODLTheme.formStyles.selectWrapper}>
              <select
                value={internalItemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                style={{
                  ...ODLTheme.formStyles.select,
                  paddingRight: '32px',
                  width: '66px',
                  textAlign: 'center',
                  fontSize: ODLTheme.typography.fontSize.sm,
                  fontFamily: ODLTheme.typography.fontFamily.sans,
                  border: 'none',
                  outline: 'none'
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <Icon 
                name="chevron-down" 
                size={12} 
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: ODLTheme.colors.text.secondary
                }}
              />
            </div>
            <span style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              fontFamily: ODLTheme.typography.fontFamily.sans
            }}>
              of {totalItems} items
            </span>
          </div>

          {/* Center section: Current page number */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '80px',
            paddingLeft: ODLTheme.spacing[6],
            paddingRight: ODLTheme.spacing[6]
          }}>
            <span style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.primary,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              fontFamily: ODLTheme.typography.fontFamily.sans
            }}>
              {internalCurrentPage}
            </span>
          </div>

          {/* Right section: Navigation arrows */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: ODLTheme.spacing[1],
            paddingLeft: ODLTheme.spacing[6]
          }}>
            <button
              onClick={() => handlePageChange(internalCurrentPage - 1)}
              disabled={internalCurrentPage === 1}
              style={{
                padding: ODLTheme.spacing[2],
                color: internalCurrentPage === 1 ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary,
                background: 'transparent',
                border: 'none',
                borderRadius: ODLTheme.borders.radius.base,
                cursor: internalCurrentPage === 1 ? 'not-allowed' : 'pointer',
                transition: ODLTheme.transitions.base,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Previous page"
              onMouseEnter={(e) => {
                if (internalCurrentPage !== 1) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon name="chevron-left" size={16} />
            </button>
            {/* Vertical separator between arrows */}
            <div style={{
              width: ODLTheme.borders.width.thin,
              height: '24px',
              backgroundColor: '#D1D1D1',
              margin: `0 ${ODLTheme.spacing[1]}`
            }} />
            <button
              onClick={() => handlePageChange(internalCurrentPage + 1)}
              disabled={internalCurrentPage === totalPages}
              style={{
                padding: ODLTheme.spacing[2],
                color: internalCurrentPage === totalPages ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary,
                background: 'transparent',
                border: 'none',
                borderRadius: ODLTheme.borders.radius.base,
                cursor: internalCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                transition: ODLTheme.transitions.base,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Next page"
              onMouseEnter={(e) => {
                if (internalCurrentPage !== totalPages) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Icon name="chevron-right" size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table; 