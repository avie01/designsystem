import React, { useMemo } from 'react';
import Table from '../../Table/Table';
import Chip from '../../Chip/Chip';
import Icon from '../../Icon/Icon';
import Button from '../../Button/Button';
import { governmentDocuments, getDocumentStats } from '../../../data/Building_constent_table';
import { usePageManager } from '../PageManagerContext';

interface TableLayoutProps {
  showFilters?: boolean;
  showSearch?: boolean;
  showExport?: boolean;
}

const TableLayout: React.FC<TableLayoutProps> = ({
  showFilters = true,
  showSearch = true,
  showExport = true,
}) => {
  const { tableFilter, setTableFilter } = usePageManager();

  // Filter documents based on current filter
  const filteredDocuments = useMemo(() => {
    if (!tableFilter) return governmentDocuments;
    
    return governmentDocuments.filter(doc => {
      if (tableFilter.classification && doc.classification !== tableFilter.classification) {
        return false;
      }
      if (tableFilter.department && doc.department !== tableFilter.department) {
        return false;
      }
      return true;
    });
  }, [tableFilter]);

  // Get document statistics
  const stats = getDocumentStats();

  const columns = [
    {
      key: 'id',
      header: 'ID',
      render: (item: typeof governmentDocuments[0]) => (
        <span className="font-mono text-sm">{item.id}</span>
      ),
      width: '100px',
    },
    {
      key: 'title',
      header: 'Document Title',
      render: (item: typeof governmentDocuments[0]) => (
        <div>
          <div className="font-medium text-gray-900">{item.title}</div>
          <div className="text-xs text-gray-500">{item.agency}</div>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'classification',
      header: 'Classification',
      render: (item: typeof governmentDocuments[0]) => {
        const getClassificationColor = (classification: string) => {
          switch (classification) {
            case 'TOP SECRET':
              return 'danger';
            case 'SECRET':
              return 'warning';
            case 'CONFIDENTIAL':
              return 'info';
            case 'UNCLASSIFIED':
              return 'success';
            default:
              return 'secondary';
          }
        };
        
        return (
          <Chip
            label={item.classification}
            variant={getClassificationColor(item.classification) as any}
            size="sm"
          />
        );
      },
      sortable: true,
    },
    {
      key: 'department',
      header: 'Department',
      render: (item: typeof governmentDocuments[0]) => (
        <span className="text-sm">{item.department}</span>
      ),
      sortable: true,
    },
    {
      key: 'dateCreated',
      header: 'Date Created',
      render: (item: typeof governmentDocuments[0]) => (
        <span className="text-sm text-gray-600">
          {new Date(item.dateCreated as string | number | Date).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'lastModified',
      header: 'Last Modified',
      render: (item: typeof governmentDocuments[0]) => (
        <span className="text-sm text-gray-600">
          {new Date(item.lastModified as string | number | Date).toLocaleDateString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item: typeof governmentDocuments[0]) => {
        const getStatusColor = (status: string) => {
          switch (status) {
            case 'Active':
              return 'text-green-600 bg-green-50';
            case 'Under Review':
              return 'text-orange-600 bg-orange-50';
            case 'Archived':
              return 'text-gray-600 bg-gray-50';
            case 'Pending Approval':
              return 'text-blue-600 bg-blue-50';
            default:
              return 'text-gray-600 bg-gray-50';
          }
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
            {item.status}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item: typeof governmentDocuments[0]) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => console.log('View', item.id)}
            aria-label={`View ${item.title}`}
          >
            <Icon name="view" className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => console.log('Edit', item.id)}
            aria-label={`Edit ${item.title}`}
          >
            <Icon name="edit" className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => console.log('Download', item.id)}
            aria-label={`Download ${item.title}`}
          >
            <Icon name="download" className="w-4 h-4" />
          </Button>
        </div>
      ),
      width: '150px',
    },
  ];

  return (
    <div className="p-6">
      {/* Filters and Actions Bar */}
      {(showFilters || showSearch || showExport) && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showFilters && (
                <>
                  {/* Classification Filter */}
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={tableFilter?.classification || ''}
                    onChange={(e) => setTableFilter(
                      e.target.value 
                        ? { ...tableFilter, classification: e.target.value }
                        : null
                    )}
                  >
                    <option value="">All Classifications</option>
                    {stats.byClassification.map(item => (
                      <option key={item.classification} value={item.classification}>
                        {item.classification} ({item.count})
                      </option>
                    ))}
                  </select>

                  {/* Department Filter */}
                  <select
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={tableFilter?.department || ''}
                    onChange={(e) => setTableFilter(
                      e.target.value 
                        ? { ...tableFilter, department: e.target.value }
                        : null
                    )}
                  >
                    <option value="">All Departments</option>
                    {stats.byDepartment.map(item => (
                      <option key={item.department} value={item.department}>
                        {item.department} ({item.count})
                      </option>
                    ))}
                  </select>

                  {tableFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setTableFilter(null)}
                    >
                      Clear Filters
                    </Button>
                  )}
                </>
              )}

              {showSearch && (
                <div className="relative">
                  <Icon name="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    className="pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            {showExport && (
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">
                  <Icon name="export" className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="primary" size="sm">
                  <Icon name="add" className="w-4 h-4 mr-2" />
                  New Document
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500">Total Documents</div>
        </div>
        {stats.byClassification.map(item => (
          <div key={item.classification} className="bg-white rounded-lg border border-gray-200 p-3">
            <div className="text-2xl font-bold text-gray-900">{item.count}</div>
            <div className="text-xs text-gray-500">{item.classification}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <Table
          data={filteredDocuments}
          columns={columns}
          hoverable
          striped
          paginated
          itemsPerPage={10}
          selectable
          onRowSelect={(selected) => console.log('Selected:', selected)}
          aria-label="Government documents table"
        />
      </div>
    </div>
  );
};

export default TableLayout;