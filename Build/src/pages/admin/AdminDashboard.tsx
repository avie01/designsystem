import React, { useState, useEffect, useCallback } from 'react';
import { useApplicationFilters, usePagination } from '../../hooks';
import Icon from '../../components/Icon/Icon';
import Table from '../../components/Table/Table';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Dropdown, { DropdownOption } from '../../components/Dropdown/Dropdown';
import Drawer from '../../components/Drawer/Drawer';
import ODLTheme from '../../styles/ODLTheme';
import { TableRowData } from '../../types/common';
import plannerTasksData from '../../data/plannerTasks.json';

/**
 * ADMIN DASHBOARD PAGE
 * This is a copy of ApplicationsPage but with Dashboard title
 * Uses ODL components with ONLY ODL Theme styling
 */

// Application status type
type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'on_hold' | 'expired';

// Application interface
interface Application extends TableRowData {
  id: string;
  bcNumber: string;
  projectName: string;
  applicant: string;
  applicantCompany?: string;
  propertyAddress: string;
  applicationType: 'new_building' | 'alteration' | 'demolition' | 'subdivision' | 'change_of_use';
  status: ApplicationStatus;
  dateSubmitted: Date;
  dateModified: Date;
  assignedOfficer?: string;
  estimatedValue: number;
  priority: 'urgent' | 'high' | 'normal' | 'low';
  completionPercentage: number;
  daysRemaining?: number;
  documents: number;
  comments: number;
}

// Convert planner tasks to application format
const sampleApplications: Application[] = plannerTasksData.tasks.map((task, index) => ({
  id: task.id,
  bcNumber: task.applicationId || `BC-2024-${String(index + 1).padStart(4, '0')}`,
  projectName: task.applicationTitle || task.title,
  applicant: task.assignee?.name?.split(' - ')[0] || 'Unknown',
  applicantCompany: task.tags?.includes('commercial') ? 'Commercial Development Corp' : undefined,
  propertyAddress: task.applicationTitle?.split(' - ')[1] || '123 Main Street',
  applicationType: task.type === 'assessment' || task.type === 'review' ? 'new_building' : 
                   task.type === 'inspection' ? 'alteration' : 
                   task.tags?.includes('subdivision') ? 'subdivision' :
                   task.tags?.includes('modification') ? 'alteration' :
                   task.tags?.includes('demolition') ? 'demolition' : 'new_building',
  status: task.status === 'pending' ? 'submitted' :
          task.status === 'in_progress' ? 'under_review' :
          task.status === 'completed' ? 'approved' :
          task.status === 'blocked' ? 'on_hold' : 'draft',
  dateSubmitted: new Date(task.createdDate),
  dateModified: new Date(task.dueDate),
  assignedOfficer: task.assignee?.name || undefined,
  estimatedValue: task.estimatedHours * 100000,
  priority: task.priority as 'urgent' | 'high' | 'normal' | 'low' || 'normal',
  completionPercentage: task.progress || 0,
  daysRemaining: Math.ceil((new Date(task.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
  documents: Math.floor(Math.random() * 30) + 5,
  comments: Math.floor(Math.random() * 15)
}));

interface AdminDashboardProps {
  onApplicationClick?: (bcNumber: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onApplicationClick }) => {
  const [applications] = useState<Application[]>(sampleApplications);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'kanban'>('list');
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [showNewApplicationDrawer, setShowNewApplicationDrawer] = useState(false);

  // Use custom hooks for filtering and pagination
  const { 
    filters, 
    filteredItems: filteredApplications, 
    setSearchQuery, 
    setStatusFilter, 
    setTypeFilter 
  } = useApplicationFilters(applications);

  const {
    paginatedItems: paginatedApplications,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    previousPage
  } = usePagination(filteredApplications, 10);

  // Status options for filter
  const statusOptions: DropdownOption[] = [
    { value: '', label: 'All Statuses' },
    { value: 'draft', label: 'Draft' },
    { value: 'submitted', label: 'Submitted' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'on_hold', label: 'On Hold' },
    { value: 'expired', label: 'Expired' }
  ];

  // Type options for filter
  const typeOptions: DropdownOption[] = [
    { value: '', label: 'All Types' },
    { value: 'new_building', label: 'New Building' },
    { value: 'alteration', label: 'Alteration' },
    { value: 'demolition', label: 'Demolition' },
    { value: 'subdivision', label: 'Subdivision' },
    { value: 'change_of_use', label: 'Change of Use' }
  ];

  const getApplicationTypeLabel = (type: Application['applicationType']) => {
    const labels = {
      new_building: 'New Building',
      alteration: 'Alteration',
      demolition: 'Demolition',
      subdivision: 'Subdivision',
      change_of_use: 'Change of Use'
    };
    return labels[type];
  };

  const getStatusColor = (status: ApplicationStatus): 'green' | 'yellow' | 'red' | 'blue' | 'grey' => {
    switch (status) {
      case 'approved': return 'green';
      case 'under_review': return 'yellow';
      case 'rejected': return 'red';
      case 'submitted': return 'blue';
      case 'on_hold': return 'yellow';
      case 'expired': return 'grey';
      case 'draft': return 'grey';
      default: return 'grey';
    }
  };

  const getPriorityColor = (priority: Application['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Summary stats
  const stats = [
    {
      title: 'Total Applications',
      value: applications.length.toString(),
      icon: 'document-multiple',
      trend: { value: 12, isPositive: true },
      comparison: 'vs last month',
      period: 'All time total',
      color: ODLTheme.colors.primary
    },
    {
      title: 'Under Review',
      value: applications.filter(a => a.status === 'under_review').length.toString(),
      icon: 'time',
      trend: { value: 8, isPositive: false },
      comparison: 'vs last week',
      period: 'Avg. 5 days processing',
      color: ODLTheme.colors.warning
    },
    {
      title: 'Approved This Month',
      value: applications.filter(a => a.status === 'approved').length.toString(),
      icon: 'checkmark-filled',
      trend: { value: 15, isPositive: true },
      comparison: 'vs last month',
      period: '67% approval rate',
      color: ODLTheme.colors.success
    },
    {
      title: 'Priority Cases',
      value: applications.filter(a => a.priority === 'urgent' || a.priority === 'high').length.toString(),
      icon: 'warning-alt',
      trend: { value: 5, isPositive: false },
      comparison: 'vs yesterday',
      period: 'Needs attention',
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
    <div className="flex flex-col h-full">
      {/* Page title */}
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Applications</h1>

      {/* Stats cards */}
      <div className="mb-6">
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
                  <p className="text-xs text-gray-600 mb-1">{stat.title}</p>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl font-semibold text-gray-900">
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
                    <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
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
                  <p className="text-sm font-medium text-gray-700 mb-1">{stat.comparison}</p>
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
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  value={filters.searchQuery}
                  onChange={(value) => setSearchQuery(value)}
                  placeholder="Search by BC number, project name, applicant, or address..."
                  hideLabel={true}
                  size="lg"
                />
              </div>
              <div className="flex gap-2 items-start">
                <div style={{ minWidth: '200px' }}>
                  <Dropdown
                    value={filters.statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    options={statusOptions}
                    placeholder="Select status"
                    hideLabel={true}
                    size="lg"
                  />
                </div>
                <div style={{ minWidth: '200px' }}>
                  <Dropdown
                    value={filters.typeFilter}
                    onChange={(value) => setTypeFilter(value)}
                    options={typeOptions}
                    placeholder="Select type"
                    hideLabel={true}
                    size="lg"
                  />
                </div>
                <div className="flex" style={{ height: '44px' }}>
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
                  <button
                    onClick={() => setViewMode('kanban')}
                    className={`px-3 border-b-2 ${viewMode === 'kanban' ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-600 hover:bg-gray-100 bg-gray-50 border-gray-300'} transition-colors`}
                    style={{ backgroundColor: viewMode === 'kanban' ? ODLTheme.colors.primary : ODLTheme.colors.surface, borderRadius: 0, height: '100%' }}
                    aria-label="Switch to kanban view"
                    aria-pressed={viewMode === 'kanban'}
                  >
                    <Icon name="task-complete" size={20} aria-hidden="true" />
                  </button>
                </div>
                <Button 
                  variant="primary" 
                  icon={<Icon name="add" size={20} />}
                  style={{ height: '44px', borderRadius: 0 }}
                  onClick={() => setShowNewApplicationDrawer(true)}
                >
                  New Application
                </Button>
              </div>
            </div>
          </div>

          {/* Applications table/grid/kanban */}
          <div className="overflow-hidden">
            {viewMode === 'list' ? (
              <Table
                data={paginatedApplications}
                columns={[
                  {
                    key: 'bcNumber',
                    header: 'BC Number',
                    sortable: true,
                    render: (item: Application) => (
                      <div 
                        className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                        onClick={() => onApplicationClick?.(item.bcNumber)}
                      >
                        {item.bcNumber}
                      </div>
                    ),
                  },
                  {
                    key: 'projectName',
                    header: 'Project',
                    sortable: true,
                    render: (item: Application) => (
                      <div>
                        <div className="font-medium text-gray-900">{item.projectName}</div>
                        <div className="text-xs text-gray-500">{item.propertyAddress}</div>
                      </div>
                    ),
                  },
                  {
                    key: 'applicant',
                    header: 'Applicant',
                    sortable: true,
                    render: (item: Application) => (
                      <div>
                        <div className="text-sm text-gray-900">{item.applicant}</div>
                        {item.applicantCompany && (
                          <div className="text-xs text-gray-500">{item.applicantCompany}</div>
                        )}
                      </div>
                    ),
                  },
                  {
                    key: 'type',
                    header: 'Type',
                    sortable: true,
                    render: (item: Application) => (
                      <span className="text-sm text-gray-700">
                        {getApplicationTypeLabel(item.applicationType)}
                      </span>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    sortable: true,
                    render: (item: Application) => (
                      <Chip
                        label={item.status.replace('_', ' ').toUpperCase()}
                        variant={getStatusColor(item.status)}
                        size="small"
                      />
                    ),
                  },
                  {
                    key: 'priority',
                    header: 'Priority',
                    sortable: true,
                    render: (item: Application) => (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    ),
                  },
                  {
                    key: 'progress',
                    header: 'Progress',
                    sortable: true,
                    render: (item: Application) => {
                      const [isVisible, setIsVisible] = React.useState(false);
                      const progressRef = React.useRef<HTMLDivElement>(null);
                      
                      React.useEffect(() => {
                        const observer = new IntersectionObserver(
                          ([entry]) => {
                            if (entry.isIntersecting && !isVisible) {
                              setIsVisible(true);
                            }
                          },
                          { threshold: 0.1 }
                        );
                        
                        if (progressRef.current) {
                          observer.observe(progressRef.current);
                        }
                        
                        return () => {
                          if (progressRef.current) {
                            observer.unobserve(progressRef.current);
                          }
                        };
                      }, [isVisible]);
                      
                      return (
                        <div className="flex items-center gap-2" ref={progressRef}>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden relative">
                            <div 
                              className={`h-2 rounded-full absolute top-0 left-0 transition-all ${
                                item.completionPercentage === 100 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                                item.completionPercentage >= 75 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                                item.completionPercentage >= 50 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                                'bg-gradient-to-r from-gray-400 to-gray-500'
                              }`}
                              style={{ 
                                width: isVisible ? `${item.completionPercentage}%` : '0%',
                                transition: isVisible ? 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                                boxShadow: item.completionPercentage > 0 ? '0 0 4px rgba(0,0,0,0.1)' : 'none'
                              }}
                            />
                            {/* Shimmer effect for active progress */}
                            {item.completionPercentage > 0 && item.completionPercentage < 100 && (
                              <div 
                                className="absolute top-0 left-0 h-full opacity-30"
                                style={{
                                  width: `${item.completionPercentage}%`,
                                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                                  animation: isVisible ? 'shimmer 2s infinite' : 'none'
                                }}
                              />
                            )}
                          </div>
                          <span className={`text-xs text-gray-600 min-w-[35px] transition-all duration-500 ${
                            isVisible ? 'opacity-100' : 'opacity-0'
                          }`}>
                            {item.completionPercentage}%
                          </span>
                        </div>
                      );
                    },
                  },
                  {
                    key: 'date',
                    header: 'Submitted',
                    sortable: true,
                    render: (item: Application) => (
                      <div className="text-sm text-gray-600">
                        {item.dateSubmitted.toLocaleDateString()}
                      </div>
                    ),
                  },
                  {
                    key: 'actions',
                    header: '',
                    render: () => (
                      <div className="flex items-center justify-end" style={{ gap: '16px' }}>
                        <button className="text-gray-400 hover:text-gray-600" aria-label="View application details">
                          <Icon name="view" size={18} aria-hidden="true" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600" aria-label="Edit application">
                          <Icon name="edit" size={18} aria-hidden="true" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600" aria-label="More actions">
                          <Icon name="overflow-menu-vertical" size={18} aria-hidden="true" />
                        </button>
                      </div>
                    ),
                  },
                ]}
              />
            ) : viewMode === 'grid' ? (
              // Grid view
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
                {paginatedApplications.map((app) => (
                  <div 
                    key={app.id} 
                    className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => onApplicationClick?.(app.bcNumber)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="font-medium text-blue-600">{app.bcNumber}</div>
                        <div className="text-sm text-gray-500">{getApplicationTypeLabel(app.applicationType)}</div>
                      </div>
                      <Chip
                        label={app.status.replace('_', ' ').toUpperCase()}
                        variant={getStatusColor(app.status)}
                        size="small"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{app.projectName}</h3>
                    <p className="text-sm text-gray-600 mb-3">{app.propertyAddress}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Applicant:</span>
                        <span className="text-gray-700">{app.applicant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Progress:</span>
                        <span className="text-gray-700">{app.completionPercentage}%</span>
                      </div>
                      {app.daysRemaining !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Days remaining:</span>
                          <span className={app.daysRemaining < 0 ? 'text-red-600 font-medium' : 'text-gray-700'}>
                            {app.daysRemaining < 0 ? `${Math.abs(app.daysRemaining)} overdue` : app.daysRemaining}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Icon name="document" size={14} />
                          {app.documents}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="chat" size={14} />
                          {app.comments}
                        </span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Kanban view - simplified version
              <div className="p-4 text-center text-gray-500">
                Kanban view coming soon...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* New Application Drawer */}
      <Drawer
        isOpen={showNewApplicationDrawer}
        onClose={() => setShowNewApplicationDrawer(false)}
        title="New Application"
      >
        <div className="p-4">
          <p>New application form would go here...</p>
        </div>
      </Drawer>
    </div>
  );
};

export default AdminDashboard;