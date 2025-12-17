import React, { useState } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';

export interface TableColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Display header for the column */
  header: string;
  /** Function to render the cell content */
  render: (item: T) => React.ReactNode;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Width of the column */
  width?: string;
  /** Whether to align text to the right */
  alignRight?: boolean;
}

export interface TableProps<T> {
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
  itemsPerPage?: number;
  /** Current page number */
  currentPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Callback when items per page changes */
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

function Table<T>({
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
  itemsPerPage = 10,
  currentPage = 1,
  onPageChange,
  onItemsPerPageChange,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [focusedRow, setFocusedRow] = useState<string | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(itemsPerPage);

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
      const selectedItems = data.filter((_, index) => 
        newSelected.has(getKey(data[index], index))
      );
      onRowSelect(selectedItems);
    }
  };

  const handleRowClick = (item: T) => {
    const key = getKey(item, data.indexOf(item));
    const isCurrentlySelected = selectedRows.has(key);
    handleRowSelect(item, !isCurrentlySelected);
  };

  const handleRowKeyDown = (item: T, event: React.KeyboardEvent) => {
    const key = getKey(item, data.indexOf(item));
    const currentIndex = sortedData.findIndex(row => getKey(row, data.indexOf(row)) === key);
    
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (selectable) {
          const isCurrentlySelected = selectedRows.has(key);
          handleRowSelect(item, !isCurrentlySelected);
        }
        if (onRowActivate) {
          onRowActivate(item);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (currentIndex < sortedData.length - 1) {
          const nextRow = sortedData[currentIndex + 1];
          const nextKey = getKey(nextRow, data.indexOf(nextRow));
          setFocusedRow(nextKey);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (currentIndex > 0) {
          const prevRow = sortedData[currentIndex - 1];
          const prevKey = getKey(prevRow, data.indexOf(prevRow));
          setFocusedRow(prevKey);
        }
        break;
      case 'Home':
        event.preventDefault();
        if (sortedData.length > 0) {
          const firstKey = getKey(sortedData[0], data.indexOf(sortedData[0]));
          setFocusedRow(firstKey);
        }
        break;
      case 'End':
        event.preventDefault();
        if (sortedData.length > 0) {
          const lastKey = getKey(sortedData[sortedData.length - 1], data.indexOf(sortedData[sortedData.length - 1]));
          setFocusedRow(lastKey);
        }
        break;
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = data.map((item, index) => getKey(item, index));
      setSelectedRows(new Set(allKeys));
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
    setSortConfig(prev => {
      if (prev?.key === columnKey) {
        return {
          key: columnKey,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const column = columns.find(col => col.key === sortConfig.key);
      if (!column) return 0;

      // Get the raw data values for better sorting
      let aValue: any, bValue: any;
      
      // Try to get raw data values first
      if (sortConfig.key in (a as any) && sortConfig.key in (b as any)) {
        aValue = (a as any)[sortConfig.key];
        bValue = (b as any)[sortConfig.key];
      } else {
        // Fallback to rendered content
        aValue = String(column.render(a));
        bValue = String(column.render(b));
      }

      // Handle different data types
      if (aValue instanceof Date && bValue instanceof Date) {
        // Date comparison
        if (sortConfig.direction === 'asc') {
          return aValue.getTime() - bValue.getTime();
        } else {
          return bValue.getTime() - aValue.getTime();
        }
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        // Number comparison
        if (sortConfig.direction === 'asc') {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      } else {
        // String comparison
        const aStr = String(aValue).toLowerCase();
        const bStr = String(bValue).toLowerCase();
        
        if (sortConfig.direction === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      }
    });
  }, [data, sortConfig, columns]);

  // Pagination logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / internalItemsPerPage);
  const startIndex = (internalCurrentPage - 1) * internalItemsPerPage;
  const endIndex = startIndex + internalItemsPerPage;
  const paginatedData = paginated ? sortedData.slice(startIndex, endIndex) : sortedData;

  // Handle page changes
  const handlePageChange = (page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setInternalCurrentPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  // Handle items per page changes
  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setInternalItemsPerPage(newItemsPerPage);
    setInternalCurrentPage(1); // Reset to first page
    if (onItemsPerPageChange) {
      onItemsPerPageChange(newItemsPerPage);
    }
  };

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table 
        className={clsx(
          'w-full border-collapse rounded-lg border border-gray-200',
          compact ? 'text-xs' : 'text-sm'
        )}
        role="grid"
        aria-label={ariaLabel || 'Data table'}
        aria-rowcount={sortedData.length}
        aria-colcount={columns.length + (selectable ? 1 : 0)}
      >
        <thead>
          <tr className={clsx(
            'bg-gray-50 border-b border-gray-200',
            compact ? 'h-10' : 'h-12'
          )}>
            {selectable && (
              <th className={clsx(
                'px-4 py-2 text-left font-medium text-gray-700',
                compact ? 'w-8' : 'w-10'
              )}>
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={input => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 text-[#0F62FE] bg-gray-100 border-gray-300 rounded focus:ring-[#0F62FE] focus:ring-2"
                />
              </th>
            )}
            {columns.map((column, colIndex) => (
              <th
                key={column.key}
                className={clsx(
                  'px-4 py-2 text-left font-medium text-gray-700',
                  column.alignRight && 'text-right',
                  column.sortable && 'cursor-pointer hover:bg-gray-100 transition-colors hover:text-[#0F62FE]',
                  column.width && `w-${column.width}`
                )}
                role="columnheader"
                aria-colindex={colIndex + (selectable ? 2 : 1)}
                aria-sort={column.sortable && sortConfig?.key === column.key 
                  ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending')
                  : undefined}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className={clsx(
                  'flex items-center gap-1',
                  column.alignRight && 'justify-end'
                )}>
                  {column.header}
                  {column.sortable && (
                    <Icon
                      name="arrow-up"
                      className={clsx(
                        'w-3 h-3 transition-transform',
                        sortConfig?.key === column.key 
                          ? 'text-[#0F62FE]' 
                          : 'text-gray-400',
                        sortConfig?.key === column.key && sortConfig.direction === 'desc' && 'rotate-180'
                      )}
                    />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => {
            const key = getKey(item, startIndex + index);
            const isSelected = selectedRows.has(key);
            const isEven = index % 2 === 0;

            return (
              <tr
                key={key}
                className={clsx(
                  'border-b border-gray-100 transition-colors duration-150',
                  compact ? 'h-10' : 'h-12',
                  hoverable && !isSelected && 'hover:bg-[#E0F3FE] hover:border-[#0F62FE]',
                  striped && isEven && !isSelected && 'bg-gray-50',
                  isSelected && 'bg-[#E0F3FE] border-[#0F62FE] border-l-4 border-l-[#0F62FE]',
                  bordered && 'border border-gray-200',
                  selectable && 'cursor-pointer hover:shadow-sm',
                  focusedRow === key && !isSelected && 'ring-2 ring-[#0F62FE] ring-inset'
                )}
                role="row"
                aria-rowindex={startIndex + index + 2} // +2 because of header row
                aria-selected={selectable ? isSelected : undefined}
                tabIndex={selectable ? 0 : undefined}
                onClick={() => selectable && handleRowClick(item)}
                onKeyDown={(e) => selectable && handleRowKeyDown(item, e)}
                onFocus={() => setFocusedRow(key)}
                onBlur={() => setFocusedRow(null)}
              >
                {selectable && (
                  <td className={clsx(
                    'px-4 py-2',
                    compact ? 'w-8' : 'w-10'
                  )}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleRowSelect(item, e.target.checked)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-4 h-4 text-[#0F62FE] bg-gray-100 border-gray-300 rounded focus:ring-[#0F62FE] focus:ring-2"
                    />
                  </td>
                )}
                {columns.map((column, colIndex) => (
                  <td
                    key={column.key}
                    className={clsx(
                      'px-4 py-2',
                      column.alignRight && 'text-right'
                    )}
                    role="gridcell"
                    aria-colindex={colIndex + (selectable ? 2 : 1)}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={internalItemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0F62FE]"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(internalCurrentPage - 1)}
              disabled={internalCurrentPage <= 1}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Icon name="arrow-left" className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (internalCurrentPage <= 3) {
                  pageNum = i + 1;
                } else if (internalCurrentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = internalCurrentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={clsx(
                      'px-3 py-1 text-sm rounded',
                      internalCurrentPage === pageNum
                        ? 'bg-[#0F62FE] text-white'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(internalCurrentPage + 1)}
              disabled={internalCurrentPage >= totalPages}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Table; 