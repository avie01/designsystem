import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Icon from '../components/Icon/Icon';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';
import Dropdown from '../components/Dropdown/Dropdown';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import './ListManagementTemplate.css';

// SearchBar component
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
  const [value, setValue] = useState('');

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch?.(e.target.value);
        }}
        aria-label={placeholder}
      />
      <div className="search-bar__icon">
        <Icon name="search" size={16} color="var(--odl-text-secondary)" />
      </div>
    </div>
  );
};

// Enhanced Table with selection
interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

interface TableRow {
  id: string | number;
  [key: string]: any;
}

interface EnhancedTableProps {
  columns: TableColumn[];
  data: TableRow[];
  selectable?: boolean;
  onSelectionChange?: (selected: Array<string | number>) => void;
  actions?: Array<{
    label: string;
    icon?: string;
    onClick: (row: TableRow) => void;
  }>;
}

const EnhancedTable: React.FC<EnhancedTableProps> = ({ 
  columns, 
  data, 
  selectable = false,
  onSelectionChange,
  actions 
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<Set<string | number>>(new Set());

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = () => {
    if (selected.size === data.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const allIds = data.map(row => row.id);
      setSelected(new Set(allIds));
      onSelectionChange?.(allIds);
    }
  };

  const handleSelectRow = (id: string | number) => {
    const newSelected = new Set(selected);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelected(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table className="enhanced-table">
      <thead className="enhanced-table__thead">
        <tr>
          {selectable && (
            <th className="enhanced-table__th enhanced-table__th--checkbox">
              <input
                type="checkbox"
                className="enhanced-table__checkbox"
                checked={selected.size === data.length && data.length > 0}
                onChange={handleSelectAll}
                aria-label="Select all rows"
              />
            </th>
          )}
          {columns.map(col => (
            <th 
              key={col.key} 
              className={`enhanced-table__th ${
                col.sortable ? 'enhanced-table__th--sortable' : ''
              }`}
              style={{ width: col.width }}
              onClick={() => col.sortable && handleSort(col.key)}
              onKeyDown={(e) => {
                if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSort(col.key);
                }
              }}
              tabIndex={col.sortable ? 0 : -1}
              aria-sort={
                col.sortable && sortKey === col.key 
                  ? sortOrder === 'asc' ? 'ascending' : 'descending'
                  : 'none'
              }
            >
              {col.label}
              {col.sortable && sortKey === col.key && (
                <Icon 
                  name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} 
                  size={12} 
                  className="enhanced-table__sort-icon"
                />
              )}
            </th>
          ))}
          {actions && <th className="enhanced-table__th">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr 
            key={row.id} 
            className={`enhanced-table__tr ${
              selected.has(row.id) ? 'enhanced-table__tr--selected' : ''
            }`}
          >
            {selectable && (
              <td className="enhanced-table__td">
                <input
                  type="checkbox"
                  className="enhanced-table__checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => handleSelectRow(row.id)}
                  aria-label={`Select row for ${Object.values(row)[0]}`}
                />
              </td>
            )}
            {columns.map(col => (
              <td key={col.key} className="enhanced-table__td">
                {row[col.key]}
              </td>
            ))}
            {actions && (
              <td className="enhanced-table__td">
                <div className="enhanced-table__actions">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      className="enhanced-table__action-button"
                      onClick={() => action.onClick(row)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          action.onClick(row);
                        }
                      }}
                      aria-label={`${action.label} ${Object.values(row)[0]}`}
                    >
                      {action.icon && <Icon name={action.icon} size={12} />}
                      {action.label}
                    </button>
                  ))}
                </div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Pagination component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      <button
        className="pagination__button"
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && currentPage > 1) {
            e.preventDefault();
            onPageChange(currentPage - 1);
          }
        }}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      
      {[...Array(Math.min(5, totalPages))].map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            className={`pagination__button ${
              currentPage === pageNum ? 'pagination__button--active' : ''
            }`}
            onClick={() => onPageChange(pageNum)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPageChange(pageNum);
              }
            }}
            aria-label={`Go to page ${pageNum}`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
          >
            {pageNum}
          </button>
        );
      })}
      
      {totalPages > 5 && (
        <>
          <span className="pagination__ellipsis" aria-hidden="true">...</span>
          <button
            className="pagination__button"
            onClick={() => onPageChange(totalPages)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPageChange(totalPages);
              }
            }}
            aria-label={`Go to page ${totalPages}`}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        className="pagination__button"
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && currentPage < totalPages) {
            e.preventDefault();
            onPageChange(currentPage + 1);
          }
        }}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>
      
      <span className="pagination__info" aria-live="polite">
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
};

// Main List Management Template
interface ListManagementTemplateProps {
  productVariant?: 'build' | 'connect' | 'keystone' | 'nexus' | 'regworks' | '3sixty' | 'custom';
  title?: string;
  entityName?: string;
}

const ListManagementTemplate: React.FC<ListManagementTemplateProps> = ({ 
  productVariant = 'build',
  title = 'Manage Items',
  entityName = 'items'
}) => {
  const [selectedItems, setSelectedItems] = useState<Array<string | number>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');


  // Sample data
  const allData = [
    { id: 1, name: 'Item Alpha', category: 'Category A', status: 'Active', created: '2024-01-15', owner: 'John Smith' },
    { id: 2, name: 'Item Beta', category: 'Category B', status: 'Inactive', created: '2024-01-14', owner: 'Sarah Johnson' },
    { id: 3, name: 'Item Gamma', category: 'Category A', status: 'Pending', created: '2024-01-13', owner: 'Mike Chen' },
    { id: 4, name: 'Item Delta', category: 'Category C', status: 'Active', created: '2024-01-12', owner: 'Emma Wilson' },
    { id: 5, name: 'Item Epsilon', category: 'Category B', status: 'Active', created: '2024-01-11', owner: 'David Brown' },
    { id: 6, name: 'Item Zeta', category: 'Category A', status: 'Inactive', created: '2024-01-10', owner: 'Lisa Anderson' },
    { id: 7, name: 'Item Eta', category: 'Category C', status: 'Pending', created: '2024-01-09', owner: 'Tom Harris' },
    { id: 8, name: 'Item Theta', category: 'Category B', status: 'Active', created: '2024-01-08', owner: 'Amy Taylor' }
  ];

  // Filter data based on search and status
  const filteredData = allData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (row: TableRow) => {
    console.log('Edit:', row);
  };

  const handleDelete = (row: TableRow) => {
    console.log('Delete:', row);
  };

  const handleBulkDelete = () => {
    console.log('Bulk delete:', selectedItems);
    setSelectedItems([]);
  };

  const handleExport = () => {
    console.log('Export data');
  };

  return (
    <div className="list-management-template">
      <Header 
        variant={productVariant}
        user={{ name: 'Scott Marshall', initials: 'SM' }}
        hasSearch={true}
        searchPlaceholder={`Search ${entityName}...`}
        backgroundColor="var(--odl-white)"
      />
      
      <main className="list-management-template__content">
        <DemoBreadcrumb componentName={title} />
        
        <header className="list-management-template__header">
          <div className="list-management-template__title-row">
            <h1 className="list-management-template__title">{title}</h1>
            <Button
              variant="primary"
              size="default"
              onClick={() => console.log('Add new')}
              aria-label={`Add new ${entityName.slice(0, -1)}`}
            >
              <Icon name="add" size={16} />
              Add New {entityName.slice(0, -1)}
            </Button>
          </div>
        </header>

        <div className="list-management-template__action-bar">
          <div className="list-management-template__left-actions">
            <SearchBar 
              placeholder={`Search ${entityName}...`}
              onSearch={setSearchTerm}
            />
            <Dropdown
              label="Status"
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
                { value: 'Pending', label: 'Pending' }
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ minWidth: '150px' }}
            />
          </div>
          <div className="list-management-template__right-actions">
            <Button
              variant="secondary"
              size="small"
              onClick={handleExport}
              aria-label="Export data"
            >
              <Icon name="download" size={16} />
              Export
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={() => window.location.reload()}
              aria-label="Refresh page"
            >
              <Icon name="renew" size={16} />
              Refresh
            </Button>
          </div>
        </div>

        {selectedItems.length > 0 && (
          <div className="list-management-template__bulk-actions" role="alert" aria-live="polite">
            <span className="list-management-template__bulk-text">
              {selectedItems.length} {entityName} selected
            </span>
            <div className="list-management-template__bulk-buttons">
              <Button
                variant="secondary"
                size="small"
                onClick={() => console.log('Bulk edit')}
                aria-label={`Edit ${selectedItems.length} selected ${entityName}`}
              >
                Edit Selected
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={handleBulkDelete}
                aria-label={`Delete ${selectedItems.length} selected ${entityName}`}
              >
                Delete Selected
              </Button>
              <Button
                variant="ghost"
                size="small"
                onClick={() => setSelectedItems([])}
                aria-label="Clear selection"
              >
                Clear Selection
              </Button>
            </div>
          </div>
        )}

        <div className="list-management-template__table-container">
          <EnhancedTable
            columns={[
              { key: 'name', label: 'Name', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'status', label: 'Status', sortable: true },
              { key: 'created', label: 'Created', sortable: true },
              { key: 'owner', label: 'Owner', sortable: true }
            ]}
            data={filteredData}
            selectable={true}
            onSelectionChange={setSelectedItems}
            actions={[
              { label: 'Edit', icon: 'edit', onClick: handleEdit },
              { label: 'Delete', icon: 'trash-can', onClick: handleDelete }
            ]}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredData.length / 10)}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <BackToTop />
    </div>
  );
};

export default ListManagementTemplate;