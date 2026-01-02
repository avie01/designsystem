import React, { useState } from 'react';
import { TableRowData, SortConfig } from '../../types/common';
import Icon from '../Icon/Icon';
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
}: TableProps<T>) {
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

  return (
    <div className={classNames(styles.tableContainer, className)}>
      {headerActions && (
        <div style={{ padding: '12px 16px', backgroundColor: 'white', borderBottom: '1px solid var(--odl-border, #e0e0e0)' }}>
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
          <thead className={styles.thead}>
            <tr>
              {selectable && (
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                    onChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={classNames(
                    styles.headerCell,
                    column.sortable && styles.headerCellSortable,
                    column.alignRight && 'text-right'
                  )}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
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
                    onClick={() => handleRowClick(item)}
                    onKeyDown={(e) => handleRowKeyDown(e, item)}
                    tabIndex={onRowActivate ? 0 : undefined}
                    role={onRowActivate ? "button" : undefined}
                    aria-selected={isSelected}
                  >
                    {selectable && (
                      <td className={styles.checkboxCell}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
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
                    {columns.map((column) => (
                      <td key={column.key} className={getCellClasses(column)}>
                        {column.render ? column.render(item) : (item as any)[column.key]}
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
        <div className={styles.pagination}>
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

          <div className={styles.paginationDivider} />

          <div className={styles.paginationInfo}>
            {startIndex + 1}–{Math.min(endIndex, sortedData.length)} of {sortedData.length} items
          </div>

          <div className={styles.paginationSpacer} />

          <div className={styles.paginationNavSection}>
            <div className={styles.paginationDivider} />

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
              <span className={styles.paginationLabel}>of {totalPages} pages</span>
            </div>

            <div className={styles.paginationDivider} />

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
                color={actualCurrentPage === 1 ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary}
              />
            </button>

            <div className={styles.paginationDivider} />

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
                color={actualCurrentPage === totalPages ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.primary}
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
