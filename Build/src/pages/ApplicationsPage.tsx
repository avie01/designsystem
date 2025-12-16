import React, { useState, useEffect, useCallback } from 'react';
import { useApplicationFilters, usePagination } from '../hooks';
import Icon from '../components/Icon/Icon';
import Table from '../components/Table/Table';
import Chip from '../components/Chip/Chip';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Dropdown, { DropdownOption } from '../components/Dropdown/Dropdown';
import Drawer from '../components/Drawer/Drawer';
import ODLTheme from '../styles/ODLTheme';
import { TableRowData } from '../types/common';
import { governmentDocuments } from '../data/Building_constent_table';
import './ApplicationsPage.css';

// Amendment interface based on building consent data
interface Amendment extends TableRowData {
  id: string;
  bcNumber: string;
  title: string;
  owner: string;
  status: string;
  department: string;
  workflow: string;
  lastModified: string;
  classification: string;
  tags: string[];
}

// Convert building consent documents to amendments format
const sampleAmendments: Amendment[] = governmentDocuments.map((doc) => ({
  id: doc.id,
  bcNumber: doc.id,
  title: doc.title,
  owner: doc.owner,
  status: doc.status,
  department: doc.department,
  workflow: doc.workflow,
  lastModified: doc.lastModified,
  classification: doc.classification,
  tags: doc.tags
}));

interface ApplicationsPageProps {
  onApplicationClick?: (amendmentName: string) => void;
}

const ApplicationsPage: React.FC<ApplicationsPageProps> = ({ onApplicationClick }) => {
  const [amendments] = useState<Amendment[]>(sampleAmendments);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('list');
  const [selectedAmendments, setSelectedAmendments] = useState<Set<string>>(new Set());
  const [showNewAmendmentDrawer, setShowNewAmendmentDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  // Filter amendments based on search and filters
  const filteredAmendments = amendments.filter(amendment => {
    const matchesSearch = searchQuery === '' || 
      amendment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amendment.bcNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amendment.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      amendment.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || amendment.status === statusFilter;
    const matchesRole = roleFilter === '' || amendment.department === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  const {
    paginatedItems: paginatedAmendments,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage
  } = usePagination(filteredAmendments, 10);

  // Status options for filter - get unique statuses from data
  const uniqueStatuses = [...new Set(amendments.map(a => a.status))].sort();
  const statusOptions: DropdownOption[] = [
    { value: '', label: 'All Statuses' },
    ...uniqueStatuses.map(status => ({ value: status, label: status }))
  ];

  // Department options for filter - get unique departments from data  
  const uniqueDepartments = [...new Set(amendments.map(a => a.department))].sort();
  const roleOptions: DropdownOption[] = [
    { value: '', label: 'All Departments' },
    ...uniqueDepartments.map(dept => ({ value: dept, label: dept }))
  ];

  const getStatusColor = (status: string): 'green' | 'yellow' | 'red' | 'blue' | 'grey' => {
    switch (status.toLowerCase()) {
      case 'approved': return 'green';
      case 'draft': return 'yellow';
      case 'review': return 'blue';
      case 'in progress': return 'blue';
      default: return 'grey';
    }
  };

  const formatBoolean = (value: boolean | number) => {
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    return value.toString();
  };

  // Summary stats based on amendments
  const stats = [
    {
      title: 'Total Applications',
      value: amendments.length.toString(),
      icon: 'document-multiple',
      trend: { value: 12, isPositive: true },
      comparison: 'vs last month',
      period: 'All building consents',
      color: ODLTheme.colors.primary
    },
    {
      title: 'Under Review',
      value: amendments.filter(a => a.status === 'Under Review' || a.status === 'In Review').length.toString(),
      icon: 'time',
      trend: { value: 8, isPositive: false },
      comparison: 'vs last week',
      period: 'Currently reviewing',
      color: ODLTheme.colors.warning
    },
    {
      title: 'Approved',
      value: amendments.filter(a => a.status === 'Approved' || a.status === 'Issued').length.toString(),
      icon: 'checkmark-filled',
      trend: { value: 15, isPositive: true },
      comparison: 'vs last month',
      period: 'Completed applications',
      color: ODLTheme.colors.success
    },
    {
      title: 'High Priority',
      value: amendments.filter(a => a.classification === 'TOP SECRET' || a.classification === 'SECRET').length.toString(),
      icon: 'warning-alt',
      trend: { value: 5, isPositive: false },
      comparison: 'vs yesterday',
      period: 'Urgent attention needed',
      color: ODLTheme.colors.error
    }
  ];

  // Add shimmer animation style
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Stats cards */}
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-md transition-shadow"
              style={{
                background: `linear-gradient(135deg, ${stat.color}10, rgba(255, 255, 255, 1))`
              }}
            >
              {/* Header with icon */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary, marginBottom: '4px' }}>{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 style={{ fontSize: '24px', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                      {stat.value}
                    </h3>
                    {stat.trend && (
                      <span className={`text-xs font-medium flex items-center gap-1 ${
                        stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        <Icon 
                          name={stat.trend.isPositive ? 'arrow-up' : 'arrow-down'} 
                          size={12} 
                        />
                        {stat.trend.value}%
                      </span>
                    )}
                  </div>
                  {stat.period && (
                    <p style={{ fontSize: '12px', color: ODLTheme.colors.text.tertiary, marginTop: '4px' }}>{stat.period}</p>
                  )}
                </div>
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${stat.color}15` }}
                >
                  <Icon name={stat.icon as any} size={20} color={stat.color} />
                </div>
              </div>

              {/* Comparison info */}
              {stat.comparison && (
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p style={{ fontSize: '14px', fontWeight: 500, color: ODLTheme.colors.text.primary, marginBottom: '4px' }}>{stat.comparison}</p>
                  {stat.period && (
                    <p className={`text-xs ${stat.trend?.isPositive ? 'text-green-600' : 'text-gray-500'}`}>
                      {stat.period}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content area with gray background */}
      <div style={{ backgroundColor: ODLTheme.colors.surface, borderRadius: ODLTheme.spacing[4], padding: ODLTheme.spacing[4] }}>
        <div className="flex flex-col" style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
          {/* Filters and search */}
          <div className="mb-6">
            <div className="applications-filters">
              <div className="flex-1">
                <Input
                  value={searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  placeholder="Search by amendment name, step, or role..."
                  hideLabel={true}
                  size="lg"
                />
              </div>
              <div className="applications-controls">
                <div className="applications-controls__dropdown">
                  <Dropdown
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    options={statusOptions}
                    placeholder="Select status"
                    hideLabel={true}
                    size="lg"
                  />
                </div>
                <div className="applications-controls__dropdown">
                  <Dropdown
                    value={roleFilter}
                    onChange={(value) => setRoleFilter(value)}
                    options={roleOptions}
                    placeholder="Select role"
                    hideLabel={true}
                    size="lg"
                  />
                </div>
                <div className="applications-view-toggle applications-controls__item">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 border-b-2 ${viewMode === 'list' ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-600 hover:bg-gray-100 bg-gray-50 border-gray-300'} transition-colors`}
                    style={{ backgroundColor: viewMode === 'list' ? ODLTheme.colors.primary : ODLTheme.colors.surface, borderRadius: 0, height: '100%' }}
                    aria-label="Switch to list view"
                    aria-pressed={viewMode === 'list'}
                  >
                    <Icon name="list" size={20} aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-3 border-b-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-600 hover:bg-gray-100 bg-gray-50 border-gray-300'} transition-colors`}
                    style={{ backgroundColor: viewMode === 'grid' ? ODLTheme.colors.primary : ODLTheme.colors.surface, borderRadius: 0, height: '100%' }}
                    aria-label="Switch to grid view"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <Icon name="grid" size={20} aria-hidden="true" />
                  </button>
                </div>
                <Button 
                  variant="primary" 
                  icon={<Icon name="add" size={20} />}
                  style={{ height: '44px', borderRadius: 0 }}
                  onClick={() => setShowNewAmendmentDrawer(true)}
                  className="new-amendment-button applications-controls__item"
                  aria-label="Create new amendment"
                >
                  <span className="new-amendment-button__text">Add Amendment</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Amendments table/grid */}
          <div className="applications-table-container">
            {/* Desktop Table View */}
            <div className="applications-table">
              {viewMode === 'list' ? (
                <Table
                  data={paginatedAmendments}
                  columns={[
                  {
                    key: 'amendment',
                    header: 'Amendment',
                    sortable: true,
                    width: '25%',
                    render: (item: Amendment) => {
                      const parts = [item.title];
                      return (
                        <div 
                          className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer text-xs"
                          style={{ lineHeight: '1.3' }}
                          onClick={() => onApplicationClick?.(item.bcNumber)}
                        >
                          <div>{parts[0]}</div>
                          {parts[1] && <div style={{ color: ODLTheme.colors.text.secondary, fontWeight: 'normal' }}>{parts[1]}</div>}
                        </div>
                      );
                    },
                  },
                  {
                    key: 'role',
                    header: 'Role',
                    sortable: true,
                    width: '10%',
                    render: (item: Amendment) => (
                      <span style={{ fontSize: '12px', color: ODLTheme.colors.text.primary, whiteSpace: 'nowrap' }}>{item.owner}</span>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: true,
                    width: '8%',
                    render: (item: Amendment) => {
                      // Truncate long status names
                      const truncatedStatus = item.status.length > 15 
                        ? item.status.substring(0, 12) + '...' 
                        : item.status;
                      return (
                        <Chip
                          label={truncatedStatus}
                          variant={getStatusColor(item.status)}
                          size="small"
                          title={item.status} // Show full status on hover
                        />
                      );
                    },
                  },
                  {
                    key: 'step',
                    header: 'Step',
                    sortable: true,
                    width: '20%',
                    render: (item: Amendment) => (
                      <div style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary, lineHeight: '1.4', wordBreak: 'break-word' }}>
                        {item.workflow}
                      </div>
                    ),
                  },
                  {
                    key: 'managerApproval',
                    header: 'Approval',
                    sortable: true,
                    width: '12%',
                    render: (item: Amendment) => {
                      const value = item.classification;
                      if (typeof value === 'number' && value > 0) {
                        return (
                          <div className="flex items-center gap-1">
                            <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden relative" style={{ minWidth: '40px', maxWidth: '80px' }}>
                              <div 
                                className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                                style={{ 
                                  width: `${Math.min((value / 1000) * 100, 100)}%`,
                                  transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                              />
                            </div>
                            <span style={{ fontSize: '10px', color: ODLTheme.colors.text.secondary }}>
                              {value}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <span className={`text-xs ${value ? 'text-green-600' : 'text-gray-400'}`}>
                          {value ? '✓' : '-'}
                        </span>
                      );
                    },
                  },
                  {
                    key: 'sendToManager',
                    header: 'Manager',
                    sortable: true,
                    width: '8%',
                    render: (item: Amendment) => {
                      const hasHighPriority = item.classification === 'TOP SECRET' || item.classification === 'SECRET';
                      return hasHighPriority ? (
                        <span style={{ fontSize: '12px', color: ODLTheme.colors.warning, fontWeight: 500 }}>
                          High
                        </span>
                      ) : (
                        <span style={{ fontSize: '12px', color: ODLTheme.colors.text.tertiary }}>Normal</span>
                      );
                    },
                  },
                  {
                    key: 'comments',
                    header: 'Cmts',
                    sortable: true,
                    width: '6%',
                    render: (item: Amendment) => (
                      <span style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>{item.tags ? item.tags.length : 0}</span>
                    ),
                  },
                  {
                    key: 'checklist',
                    header: 'Check',
                    sortable: true,
                    width: '6%',
                    render: (item: Amendment) => {
                      const value = item.status === 'Approved';
                      if (value === null) {
                        return <span style={{ fontSize: '12px', color: ODLTheme.colors.text.tertiary }}>-</span>;
                      }
                      if (typeof value === 'number') {
                        return (
                          <span style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>{value}</span>
                        );
                      }
                      return (
                        <Icon 
                          name={value ? 'checkmark-filled' : 'close'} 
                          size={20} 
                          color={value ? ODLTheme.colors.success : ODLTheme.colors.error} 
                        />
                      );
                    },
                  },
                  {
                    key: 'actions',
                    header: '',
                    width: '5%',
                    render: () => (
                      <div className="flex items-center justify-end">
                        <button className="text-gray-400 hover:text-gray-600" aria-label="More actions">
                          <Icon name="overflow-menu-vertical" size={20} aria-hidden="true" />
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
              ) : null}
            </div>

            {/* Mobile Cards View */}
            <div className="applications-cards">
              {viewMode === 'list' ? (
                <div className="applications-cards__grid">
                  {paginatedAmendments.map((amendment) => {
                    const getCardStatusClass = (status: string) => {
                      switch (status.toLowerCase()) {
                        case 'approved': return 'applications-card--active';
                        case 'draft': return 'applications-card--pending';
                        case 'review': return 'applications-card--review';
                        case 'in progress': return 'applications-card--review';
                        default: return 'applications-card--pending';
                      }
                    };

                    return (
                      <div
                        key={amendment.id}
                        className={`applications-card ${getCardStatusClass(amendment.status)}`}
                        onClick={() => onApplicationClick?.(amendment.bcNumber)}
                      >
                        {/* Card Header */}
                        <div className="applications-card__header">
                          <h3 className="applications-card__title">
                            {amendment.title ? amendment.title.split(' – ')[0] : amendment.title}
                          </h3>
                          <div className="applications-card__status">
                            <Chip
                              label={amendment.status.length > 12 ? amendment.status.substring(0, 10) + '...' : amendment.status}
                              variant={getStatusColor(amendment.status)}
                              size="small"
                              title={amendment.status}
                            />
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="applications-card__content">
                          <div className="applications-card__row">
                            <span className="applications-card__label">Role:</span>
                            <span className="applications-card__value">{amendment.owner}</span>
                          </div>
                          <div className="applications-card__row">
                            <span className="applications-card__label">Workflow:</span>
                            <span className="applications-card__value" title={amendment.workflow || ''}>
                              {amendment.workflow && amendment.workflow.length > 50 ? amendment.workflow.substring(0, 47) + '...' : amendment.workflow || 'N/A'}
                            </span>
                          </div>
                          <div className="applications-card__row">
                            <span className="applications-card__label">Department:</span>
                            <span className="applications-card__value">
                              {amendment.department}
                            </span>
                          </div>
                          <div className="applications-card__row">
                            <span className="applications-card__label">Classification:</span>
                            <span className="applications-card__value">{amendment.classification}</span>
                          </div>
                          <div className="applications-card__row">
                            <span className="applications-card__label">Last Modified:</span>
                            <span className="applications-card__value">
                              {amendment.lastModified}
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="applications-card__actions">
                          <button
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              onApplicationClick?.(amendment.bcNumber);
                            }}
                          >
                            View Details
                          </button>
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="More actions"
                          >
                            <Icon name="overflow-menu-vertical" size={20} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : viewMode === 'grid' ? (
              // Grid view
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {paginatedAmendments.map((amendment) => (
                  <div 
                    key={amendment.id} 
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onApplicationClick?.(amendment.bcNumber)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 text-sm line-clamp-2">{amendment.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{amendment.department}</div>
                      </div>
                      <Chip
                        label={amendment.status}
                        variant={getStatusColor(amendment.status)}
                        size="small"
                      />
                    </div>
                    
                    <div className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {amendment.workflow}
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Owner:</span>
                        <span className="text-gray-700">
                          {amendment.owner}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Department:</span>
                        <span className="text-gray-700">{amendment.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Classification:</span>
                        <span className="text-gray-700">
                          {amendment.classification}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                      <div className="flex gap-3 text-xs text-gray-500">
                        {amendment.tags && amendment.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            <Icon name="tag" size={14} />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              ) : null}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="applications-pagination">
              <div className="applications-pagination__info">
                <span>
                  Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, filteredAmendments.length)} of {filteredAmendments.length} results
                </span>
              </div>
              <div className="applications-pagination__controls">
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={previousPage}
                  disabled={currentPage === 1}
                  icon={<Icon name="arrow-left" size={16} />}
                >
                  Previous
                </Button>
                <div className="applications-pagination__pages">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 text-sm rounded ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <Button
                  variant="tertiary"
                  size="small"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  iconPosition="right"
                  icon={<Icon name="arrow-right" size={16} />}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Amendment Drawer */}
      <Drawer
        isOpen={showNewAmendmentDrawer}
        onClose={() => setShowNewAmendmentDrawer(false)}
        title="New Amendment"
      >
        <div className="p-4">
          <p>New amendment form would go here...</p>
        </div>
      </Drawer>
    </div>
  );
};

export default ApplicationsPage;