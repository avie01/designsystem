import React, { useState, useMemo, useEffect, useCallback } from 'react';
import clsx from 'clsx';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { TableRowData, SortConfig } from '../../types/common';
import ODLTheme from '../../styles/ODLTheme';

export interface TableColumn<T> {
  /** Unique key for the column */
  key: string;
  /** Display header for the column */
  header?: string;
  label?: string;
  /** Function to render the cell content */
  render?: (item: T) => React.ReactNode;
  /** Whether the column is sortable */
  sortable?: boolean;
  /** Whether the column is filterable */
  filterable?: boolean;
  /** Width of the column */
  width?: string;
  /** Minimum width of the column when resizing */
  minWidth?: number;
  /** Maximum width of the column when resizing */
  maxWidth?: number;
  /** Whether the column is resizable */
  resizable?: boolean;
  /** Whether to align text to the right */
  alignRight?: boolean;
  /** Whether the column is visible by default */
  visible?: boolean;
  /** Filter options for this column */
  filterOptions?: string[];
}

export interface AdvancedTableProps<T extends TableRowData> {
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
  /** Table title */
  title?: string;
  /** Table subtitle */
  subtitle?: string;
  /** Whether to show column selection */
  showColumnSelection?: boolean;
  /** Whether to show search/filter */
  showSearch?: boolean;
  /** Whether to show export options */
  showExport?: boolean;
  /** Export formats to show */
  exportFormats?: ('csv' | 'json')[];
  /** Whether to show column toggle */
  showColumnToggle?: boolean;
  /** Whether to show bulk actions */
  showBulkActions?: boolean;
  /** Bulk actions configuration */
  bulkActions?: Array<{
    label: string;
    action: (selectedItems: T[]) => void;
    variant?: 'primary' | 'secondary' | 'destructive';
    icon?: string;
  }>;
  /** Callback for export functionality */
  onExport?: (data: T[], format: 'csv' | 'json') => void;
  /** Custom filters */
  filters?: {
    [key: string]: string;
  };
  /** Callback when filters change */
  onFiltersChange?: (filters: { [key: string]: string }) => void;
  /** Enable column resizing globally */
  resizableColumns?: boolean;
  /** Callback when column widths change */
  onColumnResize?: (columnKey: string, width: number) => void;
}

function AdvancedTable<T extends TableRowData>({
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
  title,
  subtitle,
  showColumnSelection = true,
  showColumnToggle = true,
  showSearch = true,
  showExport = true,
  showBulkActions = false,
  bulkActions = [],
  exportFormats = ['csv', 'json'],
  onExport,
  filters = {},
  resizableColumns = false,
  onColumnResize,
}: AdvancedTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  // const [focusedRow, setFocusedRow] = useState<string | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(itemsPerPage);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.filter(col => col.visible !== false).map(col => col.key)
  );

  // Column resize state
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(() => {
    const widths: { [key: string]: number } = {};
    columns.forEach(col => {
      if (col.width) {
        const parsed = parseInt(col.width, 10);
        widths[col.key] = isNaN(parsed) ? 150 : parsed;
      }
    });
    return widths;
  });
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);

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

  const handleRowClick = (item: T, rowKey: string) => {
    // Toggle selection on row click
    if (selectable) {
      const newSelected = new Set(selectedRows);
      if (newSelected.has(rowKey)) {
        newSelected.delete(rowKey);
      } else {
        newSelected.add(rowKey);
      }
      setSelectedRows(newSelected);
      
      if (onRowSelect) {
        const selectedItems = data.filter((d, idx) => newSelected.has(getKey(d, idx)));
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
        return {
          key: columnKey,
          direction: current.direction === 'asc' ? 'desc' : 'asc'
        };
      }
      return { key: columnKey, direction: 'asc' };
    });
  };

  // Column resize handlers
  const handleResizeStart = (columnKey: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const column = columns.find(col => col.key === columnKey);
    if (!column) return;

    const currentWidth = columnWidths[columnKey] || 150;
    setResizingColumn(columnKey);
    setResizeStartX(e.clientX);
    setResizeStartWidth(currentWidth);
  };

  const handleResizeMove = useCallback((e: MouseEvent) => {
    if (!resizingColumn) return;

    const column = columns.find(col => col.key === resizingColumn);
    if (!column) return;

    const diff = e.clientX - resizeStartX;
    const newWidth = Math.max(
      column.minWidth || 50,
      Math.min(column.maxWidth || 800, resizeStartWidth + diff)
    );

    setColumnWidths(prev => ({
      ...prev,
      [resizingColumn]: newWidth
    }));
  }, [resizingColumn, resizeStartX, resizeStartWidth, columns]);

  const handleResizeEnd = useCallback(() => {
    if (resizingColumn && onColumnResize) {
      onColumnResize(resizingColumn, columnWidths[resizingColumn] || 150);
    }
    setResizingColumn(null);
  }, [resizingColumn, columnWidths, onColumnResize]);

  // Add/remove mouse event listeners for resize
  useEffect(() => {
    if (resizingColumn) {
      document.addEventListener('mousemove', handleResizeMove);
      document.addEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [resizingColumn, handleResizeMove, handleResizeEnd]);

  // Check if a column is resizable
  const isColumnResizable = (column: TableColumn<T>) => {
    if (column.resizable !== undefined) return column.resizable;
    return resizableColumns;
  };

  // Get column width style
  const getColumnWidth = (column: TableColumn<T>) => {
    if (columnWidths[column.key]) {
      return `${columnWidths[column.key]}px`;
    }
    return column.width || 'auto';
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let filteredData = data;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter(item => {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Apply custom filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredData = filteredData.filter(item => {
          const itemValue = item[key];
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortConfig) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
        // Handle null/undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        
        // Convert to comparable values
        const aCompare = String(aValue).toLowerCase();
        const bCompare = String(bValue).toLowerCase();
        
        if (aCompare < bCompare) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aCompare > bCompare) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filteredData;
  }, [data, searchTerm, filters, sortConfig]);

  // Pagination
  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / internalItemsPerPage);
  const startIndex = (internalCurrentPage - 1) * internalItemsPerPage;
  const endIndex = startIndex + internalItemsPerPage;
  const currentData = processedData.slice(startIndex, endIndex);

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

  const visibleColumns = columns.filter(col => selectedColumns.includes(col.key));

  // Handle Escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showColumnModal) {
        setShowColumnModal(false);
      }
    };

    if (showColumnModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showColumnModal]);

  // Default export function
  const handleExport = (format: 'csv' | 'json') => {
    if (onExport) {
      onExport(processedData, format);
    } else {
      // Default export implementation
      if (format === 'csv') {
        const csvContent = [
          // Header row
          visibleColumns.map(col => col.label || col.header).join(','),
          // Data rows
          ...processedData.map(item => 
            visibleColumns.map(col => {
              const value = col.render ? col.render(item) : (item as any)[col.key];
              return typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : String(value);
            }).join(',')
          )
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table-data.csv';
        a.click();
        URL.revokeObjectURL(url);
      } else if (format === 'json') {
        const jsonContent = JSON.stringify(processedData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'table-data.json';
        a.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const selectedItems = processedData.filter((_, index) => 
    selectedRows.has(getKey(processedData[index], index))
  );

  return (
    <div className={clsx('bg-white rounded-lg shadow-sm border border-gray-200', className)}>
      {/* Bulk Actions Bar */}
      {showBulkActions && selectedRows.size > 0 && bulkActions && bulkActions.length > 0 && (
        <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {selectedRows.size} item{selectedRows.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              {bulkActions.map((bulkAction, index) => (
                <Button
                  key={index}
                  variant={bulkAction.variant || 'secondary'}
                  size="small"
                  onClick={() => bulkAction.action(selectedItems)}
                >
                  {bulkAction.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="small"
                onClick={() => handleSelectAll(false)}
              >
                Clear Selection
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table Header */}
      {(title || subtitle || showSearch || showColumnSelection || showExport) && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
            </div>
            <div className="flex items-center space-x-3">
              {showSearch && (
                <div className="relative">
                  <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder="Search..."
                    aria-label="Search table"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-100 border-0 border-b-2 border-gray-300 rounded-none focus:outline-none focus:border-blue-500 focus:bg-white hover:bg-white hover:border-gray-400 transition-all duration-200 text-sm"
                    style={{ backgroundColor: '#f5f5f5' }}
                  />
                </div>
              )}
              {(showColumnSelection || showColumnToggle) && (
                <button
                  onClick={() => setShowColumnModal(true)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                  title="Columns"
                >
                  <Icon name="column" size={20} />
                </button>
              )}
              {showExport && (
                <>
                  <button
                    onClick={() => handleExport('csv')}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                    title="Export CSV"
                  >
                    <Icon name="download" size={20} />
                  </button>
                  {exportFormats.includes('json') && (
                    <button
                      onClick={() => handleExport('json')}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
                      title="Export JSON"
                    >
                      <Icon name="code" size={20} />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className={clsx(
            'w-full table-fixed',
            compact ? 'text-xs' : 'text-xs',
            bordered && 'border border-gray-200'
          )}
          aria-label={ariaLabel}
        >
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left w-12">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {visibleColumns.map((column, colIndex) => (
                <th
                  key={column.key}
                  className={clsx(
                    'px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap relative',
                    column.alignRight ? 'text-right' : 'text-left',
                    column.sortable && 'cursor-pointer hover:bg-gray-100'
                  )}
                  style={{
                    width: getColumnWidth(column),
                    minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
                    maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
                  }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className={clsx(
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
                  {/* Resize handle */}
                  {isColumnResizable(column) && colIndex < visibleColumns.length - 1 && (
                    <div
                      className={clsx(
                        'absolute top-0 right-0 w-1 h-full cursor-col-resize group',
                        resizingColumn === column.key ? 'bg-blue-500' : 'hover:bg-blue-400'
                      )}
                      style={{
                        transform: 'translateX(50%)',
                        zIndex: 10,
                      }}
                      onMouseDown={(e) => handleResizeStart(column.key, e)}
                    >
                      <div
                        className="absolute inset-y-0 -left-1 -right-1 hover:bg-blue-400/20"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => {
              const rowKey = getKey(item, startIndex + index);
              const isSelected = selectedRows.has(rowKey);

              return (
                <tr
                  key={rowKey}
                  className={clsx(
                    'transition-all duration-150 relative',
                    isSelected && 'bg-blue-50 shadow-[inset_2px_0_0_0_rgb(59,130,246)]',
                    !isSelected && hoverable && 'hover:bg-gray-50',
                    !isSelected && striped && index % 2 === 1 && 'bg-gray-50',
                    selectable && 'cursor-pointer'
                  )}
                  onClick={() => handleRowClick(item, rowKey)}
                  onKeyDown={(e) => handleRowKeyDown(item, e)}
                  tabIndex={0}
                  role="button"
                  aria-selected={isSelected}
                >
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => handleRowSelect(item, e.target.checked)}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Select row ${startIndex + index + 1}`}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className={clsx(
                        'px-6 py-4 text-sm',
                        column.alignRight && 'text-right',
                        compact ? 'py-2' : 'py-4'
                      )}
                      style={{
                        width: getColumnWidth(column),
                        minWidth: column.minWidth ? `${column.minWidth}px` : undefined,
                        maxWidth: column.maxWidth ? `${column.maxWidth}px` : undefined,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
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

      {/* Pagination Controls */}
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
                aria-label="Items per page"
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

      {/* Column Selection Modal - ODL Theme */}
      {showColumnModal && (
        <>
          {/* Overlay */}
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowColumnModal(false);
              }
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              animation: 'fadeIn 0.2s ease',
              padding: '2rem'
            }}
          >
            {/* Modal Content */}
            <div
              style={{
                maxWidth: '600px',
                width: '90%',
                backgroundColor: 'white',
                borderRadius: '8px',
                border: `2px solid ${ODLTheme.colors.primary}`,
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '90vh',
                animation: 'slideUp 0.3s ease',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  padding: '24px 32px',
                  borderBottom: `1px solid ${ODLTheme.colors.border}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <h2
                    style={{
                      fontSize: ODLTheme.typography.fontSize.lg,
                      fontWeight: 600,
                      color: ODLTheme.colors.text.primary,
                      margin: 0,
                      lineHeight: 1.2
                    }}
                  >
                    Select Columns to Display
                  </h2>
                </div>
                <button
                  onClick={() => setShowColumnModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    color: ODLTheme.colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = ODLTheme.colors.text.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                  }}
                  aria-label="Close modal"
                >
                  <svg 
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body */}
              <div
                style={{
                  flex: 1,
                  padding: '32px',
                  overflowY: 'auto',
                  color: ODLTheme.colors.text.primary,
                  fontSize: ODLTheme.typography.fontSize.sm
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {columns.map((column) => (
                    <div
                      key={column.key}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        backgroundColor: ODLTheme.colors.background,
                        borderRadius: '6px',
                        border: `1px solid ${ODLTheme.colors.border}`,
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        if (selectedColumns.includes(column.key)) {
                          setSelectedColumns(prev => prev.filter(c => c !== column.key));
                        } else {
                          setSelectedColumns(prev => [...prev, column.key]);
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                        e.currentTarget.style.borderColor = ODLTheme.colors.primary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.background;
                        e.currentTarget.style.borderColor = ODLTheme.colors.border;
                      }}
                    >
                      <span
                        style={{
                          fontSize: ODLTheme.typography.fontSize.sm,
                          fontWeight: 500,
                          color: ODLTheme.colors.text.primary
                        }}
                      >
                        {column.label || column.header}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedColumns.includes(column.key)) {
                            setSelectedColumns(prev => prev.filter(c => c !== column.key));
                          } else {
                            setSelectedColumns(prev => [...prev, column.key]);
                          }
                        }}
                        style={{
                          position: 'relative',
                          display: 'inline-flex',
                          height: '24px',
                          width: '44px',
                          alignItems: 'center',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          border: 'none',
                          backgroundColor: selectedColumns.includes(column.key) ? ODLTheme.colors.primary : '#CBD5E0',
                          padding: 0
                        }}
                        aria-label={`Toggle ${column.label || column.header}`}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            height: '18px',
                            width: '18px',
                            transform: selectedColumns.includes(column.key) ? 'translateX(23px)' : 'translateX(3px)',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            transition: 'transform 0.3s ease',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                          }}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  padding: '24px 32px',
                  borderTop: `1px solid ${ODLTheme.colors.border}`,
                  backgroundColor: '#EDF1F5',
                  borderBottomLeftRadius: '6px',
                  borderBottomRightRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Button
                  variant="ghost"
                  onClick={() => setShowColumnModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowColumnModal(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes slideUp {
              from {
                transform: translateY(20px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
}

export default AdvancedTable; 