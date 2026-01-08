import React, { useState } from 'react';
import { TableRowData, SortConfig } from '../../types/common';
import Icon from '../Icon/Icon';
import Checkbox from '../Checkbox/Checkbox';
import FileType from '../FileType/FileType';
import { useTheme } from '../../../.storybook/theme-decorator';
import ODLTheme from '../../styles/ODLTheme';
import styles from './Table.module.css';

const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface TableColumn<T> {
  key: string;
  label?: string;
  header?: string;
  render?: (item: T) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  sortable?: boolean;
  width?: string;
  alignRight?: boolean;
}

export interface TableProps<T extends TableRowData> {
  data: T[];
  columns: TableColumn<T>[];
  selectable?: boolean;
  onRowSelect?: (selectedItems: T[]) => void;
  selectedKeys?: string[];
  bordered?: boolean;
  compact?: boolean;
  className?: string;
  getRowKey?: (item: T) => string;
  onRowActivate?: (item: T) => void;
  'aria-label'?: string;
  paginated?: boolean;
  pageSize?: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  title?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
  emptyMessage?: string;
  showFileTypeIcon?: boolean;
  bulkActions?: boolean;
}

function Table<T extends TableRowData>({
  data,
  columns,
  selectable = false,
  onRowSelect,
  selectedKeys,
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
  emptyMessage = 'No data available',
  showFileTypeIcon = false,
  bulkActions = false,
}: TableProps<T>) {
  const { colors, theme } = useTheme();
  const [hoveredRow, setHoveredRow] = React.useState<string | null>(null);
  const [internalSelectedRows, setInternalSelectedRows] = useState<Set<string>>(new Set());
  const isControlled = selectedKeys !== undefined;
  const selectedRows = isControlled ? new Set(selectedKeys) : internalSelectedRows;
  const setSelectedRows = isControlled ? () => {} : setInternalSelectedRows;
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [internalCurrentPage, setInternalCurrentPage] = useState(currentPage);
  const [internalItemsPerPage, setInternalItemsPerPage] = useState(pageSize || itemsPerPage);

  const actualCurrentPage = onPageChange ? currentPage : internalCurrentPage;
  const actualItemsPerPage = onItemsPerPageChange ? (pageSize || itemsPerPage) : internalItemsPerPage;
  const rowsPerPage = actualItemsPerPage;

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

  const getRowClasses = (isSelected: boolean) => {
    return classNames(
      styles.tableRow,
      isSelected && styles.tableRowSelected,
      onRowActivate && styles.tableRowClickable
    );
  };

  const getCellClasses = (column: TableColumn<T>) => {
    return classNames(
      styles.tableCell,
      compact && styles.tableCellCompact,
      column.alignRight && 'text-right'
    );
  };

  const totalColumns = columns.length + (selectable ? 1 : 0);

  const tableContainerStyle: React.CSSProperties = {
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    overflow: 'hidden'
  };

  const theadStyle: React.CSSProperties = {
    backgroundColor: colors.paper,
    borderBottom: `1px solid ${colors.border}`
  };

  const getRowStyle = (key: string, isSelected: boolean): React.CSSProperties => {
    const isHovered = hoveredRow === key;
    
    // Dynamic theme colors for selected rows
    const selectedBorderColor = theme === 'dark' ? '#A7C2FD' : (theme === 'highContrast' ? colors.primaryMain : colors.primaryMain);
    const selectedBackgroundColor = theme === 'dark' ? '#48494B' : (theme === 'highContrast' ? colors.selectedLight : colors.selectedLight);
    
    const backgroundColor = isSelected 
      ? (isHovered ? selectedBackgroundColor : selectedBackgroundColor)
      : (isHovered ? colors.surfaceHover : colors.paper);
    
    return {
      backgroundColor: backgroundColor,
      borderLeft: isSelected ? `4px solid ${selectedBorderColor}` : `4px solid ${backgroundColor}`,
      borderBottom: `1px solid ${colors.grey400}`,
      transition: 'background-color 150ms ease'
    };
  };

  const tableCellStyle: React.CSSProperties = {
    color: colors.textPrimary,
    borderRight: `1px solid ${colors.grey400}`
  };

  const [hoveredHeader, setHoveredHeader] = React.useState<string | null>(null);

  const getHeaderCellStyle = (columnKey: string, sortable: boolean, isLastColumn: boolean): React.CSSProperties => {
    const isHovered = hoveredHeader === columnKey && sortable;
    const headerBackground = isHovered ? colors.surfaceHover : 'transparent';
    
    return {
      color: colors.textSecondary,
      borderRight: isLastColumn ? 'none' : `1px solid ${colors.border}`,
      backgroundColor: headerBackground,
      transition: 'background-color 150ms ease'
    };
  };

  const paginationStyle: React.CSSProperties = {
    backgroundColor: colors.paper,
    borderTop: `1px solid ${colors.border}`
  };

  const paginationDividerStyle: React.CSSProperties = {
    backgroundColor: colors.border
  };

  return (
    <div className={classNames(styles.tableContainer, className)} style={tableContainerStyle}>
      {headerActions && (
        <div style={{ padding: '12px 16px', backgroundColor: colors.paper, borderBottom: `1px solid ${colors.border}` }}>
          {headerActions}
        </div>
      )}
      {children}
      <div className={styles.scrollContainer}>
        <table className={styles.table} aria-label={ariaLabel}>
          <colgroup>
            {selectable && <col style={{ width: '40px' }} />}
            {columns.map((column) => (
              <col key={column.key} style={column.width ? { width: column.width } : undefined} />
            ))}
          </colgroup>
          <thead className={styles.thead} style={theadStyle}>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell} style={{
                  backgroundColor: colors.paper,
                  paddingLeft: '18px'
                }}>
                  <Checkbox
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    indeterminate={selectedRows.size > 0 && selectedRows.size < paginatedData.length}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                    size="md"
                  />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={classNames(
                    styles.headerCell,
                    column.sortable && styles.headerCellSortable,
                    column.alignRight && 'text-right'
                  )}
                  style={getHeaderCellStyle(column.key, column.sortable || false, index === columns.length - 1)}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  onMouseEnter={() => setHoveredHeader(column.key)}
                  onMouseLeave={() => setHoveredHeader(null)}
                >
                  <div className={styles.headerCellContent}>
                    <div className={styles.sortableLabel}>
                      {column.renderHeader ? (
                        column.renderHeader()
                      ) : (
                        <span>{column.label || column.header}</span>
                      )}
                      {column.sortable && sortConfig?.key === column.key && (
                        <span className={styles.sortIndicator}>
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={totalColumns} className={styles.emptyState}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => {
                const key = getRowKey ? getRowKey(item) : index.toString();
                const isSelected = selectedRows.has(key);

                return (
                  <tr
                    key={key}
                    className={getRowClasses(isSelected)}
                    style={getRowStyle(key, isSelected)}
                    onClick={() => handleRowClick(item)}
                    onKeyDown={(e) => handleRowKeyDown(e, item)}
                    onMouseEnter={() => setHoveredRow(key)}
                    onMouseLeave={() => setHoveredRow(null)}
                    tabIndex={onRowActivate ? 0 : undefined}
                    role={onRowActivate ? "button" : undefined}
                    aria-selected={isSelected}
                  >
                    {selectable && (
                      <td className={styles.checkboxCell}>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectRow(item, index);
                          }}
                        >
                          <Checkbox
                            checked={isSelected}
                            onChange={() => handleSelectRow(item, index)}
                            aria-label={`Select row ${index + 1}`}
                            size="md"
                          />
                        </div>
                      </td>
                    )}
                    {columns.map((column) => (
                      <td key={column.key} className={getCellClasses(column)} style={tableCellStyle}>
                        {column.key === 'name' && showFileTypeIcon ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileType 
                              type={((item as any)[column.key] as string).split('.').pop()?.toLowerCase() || 'folder'} 
                              size={24}
                            />
                            {column.render ? column.render(item) : (item as any)[column.key]}
                          </div>
                        ) : (
                          column.render ? column.render(item) : (item as any)[column.key]
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {paginated && totalPages > 1 && (
        <div className={styles.pagination} style={paginationStyle}>
          <div className={styles.paginationSection}>
            <select
              value={actualItemsPerPage}
              onChange={handleItemsPerPageChange}
              className={styles.paginationSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className={styles.paginationDivider} style={paginationDividerStyle} />

          <div className={styles.paginationInfo} style={{ color: colors.textPrimary }}>
            {startIndex + 1}–{Math.min(endIndex, sortedData.length)} of {sortedData.length} items
          </div>

          <div className={styles.paginationSpacer} />

          <div className={styles.paginationNavSection}>
            <div className={styles.paginationDivider} style={paginationDividerStyle} />

            <div className={styles.pageDropdownSection}>
              <select
                value={actualCurrentPage}
                onChange={(e) => handlePageChange(parseInt(e.target.value))}
                className={styles.paginationSelect}
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <span className={styles.paginationLabel} style={{ color: colors.textPrimary }}>of {totalPages} pages</span>
            </div>

            <div className={styles.paginationDivider} style={paginationDividerStyle} />

            <button
              onClick={() => handlePageChange(actualCurrentPage - 1)}
              disabled={actualCurrentPage === 1}
              className={classNames(
                styles.paginationButton,
                actualCurrentPage === 1 ? styles.paginationButtonDisabled : styles.paginationButtonEnabled
              )}
              aria-label="Previous page"
            >
              <Icon
                name="chevron-left"
                size={16}
                color={actualCurrentPage === 1 ? colors.textDisabled : colors.textPrimary}
              />
            </button>

            <div className={styles.paginationDivider} style={paginationDividerStyle} />

            <button
              onClick={() => handlePageChange(actualCurrentPage + 1)}
              disabled={actualCurrentPage === totalPages}
              className={classNames(
                styles.paginationButton,
                actualCurrentPage === totalPages ? styles.paginationButtonDisabled : styles.paginationButtonEnabled
              )}
              aria-label="Next page"
            >
              <Icon
                name="chevron-right"
                size={16}
                color={actualCurrentPage === totalPages ? colors.textDisabled : colors.textPrimary}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Table };
export default Table;
