import React, { useState, useMemo } from 'react';

// Standalone utility function (replaces clsx)
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Standalone Icon component
const Icon = ({ name, className = "", ...props }: { name: string; className?: string; [key: string]: unknown }) => {
  const iconMap: { [key: string]: string } = {
    'search': '🔍',
    'arrow-up': '↑',
    'arrow-down': '↓',
    'arrow-left': '←',
    'arrow-right': '→',
    'column-insert': '📊',
    'download': '⬇️',
    'close': '✕',
    'folder': '📁',
    'info': 'ℹ️'
  };
  
  return (
    <span className={className} {...props}>
      {iconMap[name] || '•'}
    </span>
  );
};

// Standalone Button component
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick,
  disabled = false,
  icon,
  className = "",
  ...props 
}: {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  className?: string;
  [key: string]: unknown;
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500"
  };
  
  const sizeClasses = {
    small: "px-3 py-1.5 text-sm",
    medium: "px-4 py-2 text-sm",
    large: "px-6 py-3 text-base"
  };
  
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], disabledClasses, className)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <Icon name={icon} className="mr-2 w-4 h-4" />}
      {children}
    </button>
  );
};


// Standalone Modal component
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md' 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}) => {
  if (!isOpen) return null;
  
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl"
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={cn("bg-white rounded-lg shadow-xl mx-4", sizeClasses[size])}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

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
  /** Whether the column is visible by default */
  visible?: boolean;
  /** Filter options for this column */
  filterOptions?: string[];
}

export interface AdvancedTableProps<T> {
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
  /** Callback for export functionality */
  onExport?: (data: T[], format: 'csv' | 'json') => void;
  /** Custom filters */
  filters?: {
    [key: string]: string;
  };
  /** Callback when filters change */
  onFiltersChange?: (filters: { [key: string]: string }) => void;
}

function AdvancedTable<T extends Record<string, any>>({
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
  showSearch = true,
  showExport = true,
  onExport,
  filters = {},
}: AdvancedTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [focusedRow, setFocusedRow] = useState<string | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(itemsPerPage);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    columns.filter(col => col.visible !== false).map(col => col.key)
  );

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
          const itemValue = (item as any)[key];
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    // Apply sorting
    if (sortConfig) {
      filteredData = [...filteredData].sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];
        
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
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

  return (
    <div className={cn('bg-white rounded-lg shadow-sm', className)}>
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
                  <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              )}
              {showColumnSelection && (
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => setShowColumnModal(true)}
                  icon="column-insert"
                >
                  Columns
                </Button>
              )}
              {showExport && onExport && (
                <div className="relative">
                  <Button
                    variant="secondary"
                    size="small"
                    icon="download"
                    onClick={() => onExport(processedData, 'csv')}
                  >
                    Export
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table
          className={cn(
            'w-full',
            compact ? 'text-xs' : 'text-xs',
            bordered && 'border border-gray-200'
          )}
          aria-label={ariaLabel}
        >
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === data.length && data.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                    column.alignRight && 'text-right',
                    column.sortable && 'cursor-pointer hover:bg-gray-100',
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.header}</span>
                    {column.sortable && sortConfig?.key === column.key && (
                      <Icon
                        name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                        className="w-4 h-4"
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((item, index) => {
              const rowKey = getKey(item, startIndex + index);
              const isSelected = selectedRows.has(rowKey);
              const isFocused = focusedRow === rowKey;

              return (
                <tr
                  key={rowKey}
                  className={cn(
                    hoverable && 'hover:bg-gray-50',
                    striped && index % 2 === 0 && 'bg-gray-50',
                    isSelected && 'bg-blue-50',
                    isFocused && 'ring-2 ring-blue-500',
                    'transition-colors duration-150'
                  )}
                  onClick={() => handleRowClick(item)}
                  onKeyDown={(e) => handleRowKeyDown(item, e)}
                  onFocus={() => setFocusedRow(rowKey)}
                  onBlur={() => setFocusedRow(null)}
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
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                  )}
                  {visibleColumns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-6 py-4',
                        column.alignRight && 'text-right',
                        compact ? 'py-2' : 'py-4'
                      )}
                    >
                      {column.render(item)}
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
        <div className="flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Show</span>
              <select
                value={internalItemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-700">entries</span>
            </div>
            <span className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => handlePageChange(internalCurrentPage - 1)}
              disabled={internalCurrentPage === 1}
              icon="arrow-left"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={page === internalCurrentPage ? 'primary' : 'secondary'}
                    size="small"
                    onClick={() => handlePageChange(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="secondary"
              size="small"
              onClick={() => handlePageChange(internalCurrentPage + 1)}
              disabled={internalCurrentPage === totalPages}
              icon="arrow-right"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Column Selection Modal */}
      {showColumnModal && (
        <Modal
          isOpen={showColumnModal}
          onClose={() => setShowColumnModal(false)}
          title="Select Columns to Display"
          size="md"
        >
          <div className="grid grid-cols-1 gap-4">
            {columns.map((column) => (
              <div key={column.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">{column.header}</span>
                <button
                  onClick={() => {
                    if (selectedColumns.includes(column.key)) {
                      setSelectedColumns(prev => prev.filter(c => c !== column.key));
                    } else {
                      setSelectedColumns(prev => [...prev, column.key]);
                    }
                  }}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    selectedColumns.includes(column.key) ? 'bg-blue-600' : 'bg-gray-200'
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                      selectedColumns.includes(column.key) ? 'translate-x-6' : 'translate-x-1'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <Button
              variant="secondary"
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
        </Modal>
      )}
    </div>
  );
}

export default AdvancedTable; 