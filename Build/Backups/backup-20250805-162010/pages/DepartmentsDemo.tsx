import React from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import Table from '../components/Table/Table';
import DemoNavigation from '../components/DemoNavigation';
import Icon from '../components/Icon/Icon';

const DepartmentsDemo: React.FC = () => {
  // Sample departments data (20 departments)
  const departments = [
    { id: 'DEPT-001', name: 'Intelligence', director: 'Sarah Johnson', documents: 15, activeWorkflows: 8, clearanceLevel: 'TS/SCI', lastActivity: '2024-12-15 14:30' },
    { id: 'DEPT-002', name: 'Defense', director: 'Michael Chen', documents: 12, activeWorkflows: 6, clearanceLevel: 'TS/SCI', lastActivity: '2024-12-14 09:15' },
    { id: 'DEPT-003', name: 'Finance', director: 'Emily Rodriguez', documents: 10, activeWorkflows: 4, clearanceLevel: 'SECRET', lastActivity: '2024-12-13 16:45' },
    { id: 'DEPT-004', name: 'Cybersecurity', director: 'David Wilson', documents: 8, activeWorkflows: 5, clearanceLevel: 'TS/SCI', lastActivity: '2024-12-12 11:20' },
    { id: 'DEPT-005', name: 'Foreign Affairs', director: 'Lisa Thompson', documents: 14, activeWorkflows: 7, clearanceLevel: 'SECRET', lastActivity: '2024-12-11 13:55' },
    { id: 'DEPT-006', name: 'Internal Affairs', director: 'Robert Davis', documents: 6, activeWorkflows: 3, clearanceLevel: 'CONFIDENTIAL', lastActivity: '2024-12-10 08:30' },
    { id: 'DEPT-007', name: 'Technology', director: 'Jennifer Lee', documents: 11, activeWorkflows: 6, clearanceLevel: 'SECRET', lastActivity: '2024-12-09 15:10' },
    { id: 'DEPT-008', name: 'Communications', director: 'Alex Martinez', documents: 7, activeWorkflows: 4, clearanceLevel: 'CONFIDENTIAL', lastActivity: '2024-12-08 12:45' },
    { id: 'DEPT-009', name: 'Logistics', director: 'Maria Garcia', documents: 9, activeWorkflows: 5, clearanceLevel: 'SECRET', lastActivity: '2024-12-07 10:20' },
    { id: 'DEPT-010', name: 'Research & Development', director: 'James Brown', documents: 13, activeWorkflows: 8, clearanceLevel: 'TS/SCI', lastActivity: '2024-12-06 14:15' },
    { id: 'DEPT-011', name: 'Human Resources', director: 'Amanda White', documents: 5, activeWorkflows: 2, clearanceLevel: 'CONFIDENTIAL', lastActivity: '2024-12-05 09:30' },
    { id: 'DEPT-012', name: 'Legal Affairs', director: 'Kevin Johnson', documents: 8, activeWorkflows: 4, clearanceLevel: 'SECRET', lastActivity: '2024-12-04 16:00' },
    { id: 'DEPT-013', name: 'Operations', director: 'Rachel Green', documents: 16, activeWorkflows: 9, clearanceLevel: 'TS/SCI', lastActivity: '2024-12-03 11:45' },
    { id: 'DEPT-014', name: 'Strategic Planning', director: 'Thomas Anderson', documents: 10, activeWorkflows: 5, clearanceLevel: 'SECRET', lastActivity: '2024-12-02 13:20' },
    { id: 'DEPT-015', name: 'Emergency Response', director: 'Nicole Taylor', documents: 7, activeWorkflows: 4, clearanceLevel: 'CONFIDENTIAL', lastActivity: '2024-12-01 08:15' },
    { id: 'DEPT-016', name: 'International Relations', director: 'Christopher Lee', documents: 12, activeWorkflows: 6, clearanceLevel: 'SECRET', lastActivity: '2024-11-30 15:30' },
    { id: 'DEPT-017', name: 'Compliance', director: 'Stephanie Clark', documents: 6, activeWorkflows: 3, clearanceLevel: 'CONFIDENTIAL', lastActivity: '2024-11-29 12:10' },
    { id: 'DEPT-018', name: 'Analytics', director: 'Daniel Moore', documents: 9, activeWorkflows: 5, clearanceLevel: 'SECRET', lastActivity: '2024-11-28 09:45' },
    { id: 'DEPT-019', name: 'Procurement', director: 'Jessica Hall', documents: 11, activeWorkflows: 7, clearanceLevel: 'SECRET', lastActivity: '2024-11-27 14:20' },
    { id: 'DEPT-020', name: 'Policy Development', director: 'Ryan Miller', documents: 8, activeWorkflows: 4, clearanceLevel: 'SECRET', lastActivity: '2024-11-26 11:35' }
  ];

  const columns = [
    { 
      key: 'id', 
      header: 'Department ID', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.id}</span>
    },
    { 
      key: 'name', 
      header: 'Department Name', 
      sortable: true,
      render: (item: any) => <span className="text-sm font-medium">{item.name}</span>
    },
    { 
      key: 'director', 
      header: 'Director', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.director}</span>
    },
    { 
      key: 'documents', 
      header: 'Documents', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.documents}</span>
    },
    { 
      key: 'activeWorkflows', 
      header: 'Active Workflows', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.activeWorkflows}</span>
    },
    { 
      key: 'clearanceLevel', 
      header: 'Clearance Level', 
      sortable: true,
      render: (item: any) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded whitespace-nowrap overflow-hidden`}>
          <span className="truncate">{item.clearanceLevel}</span>
        </span>
      )
    },
    { 
      key: 'lastActivity', 
      header: 'Last Activity', 
      sortable: true,
      render: (item: any) => <span className="text-sm">{item.lastActivity}</span>
    }
  ];

  return (
    <PageTemplate
      title="Departments"
      subtitle="Active government departments and their status"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Departments' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={false}
    >
      <DemoNavigation title="Departments" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
            <p className="text-gray-600 mt-1">All {departments.length} active government departments</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="user" className="w-6 h-6 text-purple-600" />
            <span className="text-lg font-semibold text-purple-600">{departments.length}</span>
          </div>
        </div>

        {/* Department Table */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Department Management</h3>
            <p className="text-sm text-gray-600 mt-1">All active departments with their directors, document counts, and workflow status</p>
          </div>
          <div className="overflow-x-auto">
            <Table
              data={departments}
              columns={columns}
              compact={true}
              selectable={true}
              paginated={true}
              itemsPerPage={25}
              onRowSelect={(selectedItems: any) => console.log('Selected items:', selectedItems)}
            />
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default DepartmentsDemo; 