import React, { useState } from 'react';
import { TableRowData, SortConfig } from '../../types/common';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';
import styles from './Table.module.css';

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
  /** Children to render below header */
  children?: React.ReactNode;
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
  headerActions,
  children,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(pageSize || itemsPerPage);

  // Actual values to use (prefer props over internal state)
  const actualCurrentPage = onPageChange ? currentPage : internalCurrentPage;
  const actualItemsPerPage = onItemsPerPageChange ? (pageSize || itemsPerPage) : internalItemsPerPage;

  // Calculate rows per page
  const rowsPerPage = actualItemsPerPage;

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof T];
      const bValue = b[sortConfig.key as keyof T];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (actualCurrentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = paginated ? sortedData.slice(startIndex, endIndex) : sortedData;

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prevConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const allKeys = new Set(paginatedData.map((item, index) => 
        getRowKey ? getRowKey(item) : index.toString()
      ));
      setSelectedRows(allKeys);
      onRowSelect?.(paginatedData);
    }
  };

  const handleSelectRow = (item: T, index: number) => {
    const key = getRowKey ? getRowKey(item) : index.toString();
    const newSelected = new Set(selectedRows);
    
    if (newSelected.has(key)) {
      newSelected.delete(key);
    } else {
      newSelected.add(key);
    }
    
    setSelectedRows(newSelected);
    
    const selectedItems = paginatedData.filter((dataItem, dataIndex) => {
      const dataKey = getRowKey ? getRowKey(dataItem) : dataIndex.toString();
      return newSelected.has(dataKey);
    });
    
    onRowSelect?.(selectedItems);
  };

  const handlePageChange = (newPage: number) => {
    if (onPageChange) {
      onPageChange(newPage);
    } else {
      setInternalCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    } else {
      setInternalItemsPerPage(newItemsPerPage);
      setInternalCurrentPage(1);
    }
    if (onPageChange) {
      onPageChange(1);
    }
  };

  const handleRowClick = (item: T) => {
    if (onRowActivate) {
      onRowActivate(item);
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, item: T) => {
    if (e.key === 'Enter' && onRowActivate) {
      e.preventDefault();
      onRowActivate(item);
    }
  };

  // Determine table styles
  const tableStyles = classNames(
    'min-w-full divide-y divide-odl-border',
    className
  );

  const rowStyles = (index: number, isSelected: boolean) => {
    const styles = [
      'transition-all duration-150 relative'
    ];
    
    if (hoverable) {
      styles.push('hover:bg-odl-surface');
    }
    
    if (striped && index % 2 === 0) {
      styles.push('bg-gray-50');
    }
    
    if (isSelected) {
      styles.push('bg-blue-50');
    }
    
    if (onRowActivate) {
      styles.push('cursor-pointer');
    }
    
    return classNames(...styles);
  };

  const cellStyles = classNames(
    compact ? 'px-2 py-1' : 'px-6 py-4',
    'text-sm text-odl-text-primary'
  );

  return (
    <div className={`overflow-hidden border border-odl-border ${styles.tableContainer}`}>
      {headerActions && (
        <div className="px-3 py-3 bg-white border-b border-odl-border">
          {headerActions}
        </div>
      )}
      {children}
      <div className={styles.scrollContainer}>
        <table className={classNames(tableStyles, styles.table)} aria-label={ariaLabel}>
          <colgroup>
            {selectable && <col style={{ width: '50px' }} />}
            {columns.map((column) => (
              <col key={column.key} />
            ))}
          </colgroup>
          <thead className="bg-white">
            <tr>
              {selectable && (
                <th scope="col" className={classNames(
                  "relative px-6 py-3",
                  bordered && "border-r border-gray-200"
                )}>
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={classNames(
                    'text-left text-sm font-semibold text-odl-text-secondary',
                    column.alignRight && 'text-right',
                    styles.headerCell
                  )}
                >
                  <div className={styles.headerCellContent}>
                    <div
                      className={classNames(
                        "flex items-center gap-1",
                        column.sortable && 'cursor-pointer hover:bg-odl-background',
                        styles.sortableLabel
                      )}
                      onClick={column.sortable ? () => handleSort(column.key) : undefined}
                    >
                      <span>{column.label || column.header}</span>
                      {column.sortable && sortConfig?.key === column.key && (
                        <Icon
                          name={sortConfig.direction === 'asc' ? 'chevron-up' : 'chevron-down'}
                          size={12}
                          color={ODLTheme.colors.text.secondary}
                        />
                      )}
                      {column.sortable && !sortConfig?.key && (
                        <span className="inline-block w-4"></span>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        <tbody className="bg-white divide-y divide-odl-border">
          {paginatedData.map((item, index) => {
            const key = getRowKey ? getRowKey(item) : index.toString();
            const isSelected = selectedRows.has(key);
            
            return (
              <tr
                key={key}
                className={rowStyles(index, isSelected)}
                onClick={() => handleRowClick(item)}
                onKeyDown={(e) => handleRowKeyDown(e, item)}
                tabIndex={onRowActivate ? 0 : undefined}
                role={onRowActivate ? "button" : undefined}
                aria-selected={isSelected}
              >
                {selectable && (
                  <td className={classNames(
                    "px-6",
                    bordered && "border-r border-gray-200"
                  )}>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectRow(item, index);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Select row ${index + 1}`}
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
                  >
                    {column.render ? column.render(item) : (item as any)[column.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      
      {paginated && totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0',
          backgroundColor: 'white',
          borderTop: `1px solid ${ODLTheme.colors.border}`,
          height: '48px'
        }}>
          {/* Items per page section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: '8px',
            height: '100%'
          }}>
            <select
              value={actualItemsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: '4px 20px 4px 8px',
                border: 'none',
                fontSize: '14px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                appearance: 'none',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 6L0 0H10L5 6Z' fill='%2332373F'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 4px center',
                backgroundSize: '10px'
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Vertical divider */}
          <div style={{
            width: '1px',
            height: '48px',
            backgroundColor: ODLTheme.colors.border
          }} />

          {/* Items range */}
          <div style={{
            padding: '0 24px',
            fontSize: '14px',
            color: ODLTheme.colors.text.primary
          }}>
            {startIndex + 1}–{Math.min(endIndex, sortedData.length)} of {sortedData.length} items
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Page selector section */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%'
          }}>
            {/* Vertical divider */}
            <div style={{
              width: '1px',
              height: '48px',
              backgroundColor: ODLTheme.colors.border
            }} />

            {/* Page dropdown */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              gap: '8px'
            }}>
              <select
                value={actualCurrentPage}
                onChange={(e) => handlePageChange(parseInt(e.target.value))}
                style={{
                  padding: '4px 20px 4px 8px',
                  border: 'none',
                  fontSize: '14px',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 6L0 0H10L5 6Z' fill='%2332373F'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 4px center',
                  backgroundSize: '10px'
                }}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span style={{ fontSize: '14px', color: ODLTheme.colors.text.primary }}>
                of {totalPages} pages
              </span>
            </div>

            {/* Vertical divider */}
            <div style={{
              width: '1px',
              height: '48px',
              backgroundColor: ODLTheme.colors.border
            }} />

            {/* Navigation buttons */}
            <button
              onClick={() => handlePageChange(actualCurrentPage - 1)}
              disabled={actualCurrentPage === 1}
              style={{
                padding: '0 16px',
                height: '48px',
                border: 'none',
                background: 'none',
                cursor: actualCurrentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: actualCurrentPage === 1 ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Previous page"
            >
              <Icon 
                name="page-first" 
                size={16} 
                color={actualCurrentPage === 1 ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary}
              />
            </button>

            {/* Vertical divider */}
            <div style={{
              width: '1px',
              height: '48px',
              backgroundColor: ODLTheme.colors.border
            }} />

            <button
              onClick={() => handlePageChange(actualCurrentPage + 1)}
              disabled={actualCurrentPage === totalPages}
              style={{
                padding: '0 16px',
                height: '48px',
                border: 'none',
                background: 'none',
                cursor: actualCurrentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: actualCurrentPage === totalPages ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Next page"
            >
              <Icon 
                name="page-last" 
                size={16} 
                color={actualCurrentPage === totalPages ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Also export the pure component for flexibility
export { Table };

// Default export for simpler imports
export default Table;