import React, { useState } from 'react';
import AdvancedTable, { TableColumn } from './AdvancedTable';
import Chip from '../Chip/Chip';
import Icon from '../Icon/Icon';
import { TableRowData } from '../../types/common';

// Sample data interface
interface SampleData extends TableRowData {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  projects: number;
  performance: number;
}

// Sample data
const sampleData: SampleData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    lastActive: '2024-01-15 14:30',
    projects: 5,
    performance: 95
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'Design',
    role: 'UI/UX Designer',
    status: 'active',
    lastActive: '2024-01-15 12:45',
    projects: 3,
    performance: 88
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    department: 'Marketing',
    role: 'Marketing Manager',
    status: 'pending',
    lastActive: '2024-01-14 16:20',
    projects: 2,
    performance: 92
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    status: 'active',
    lastActive: '2024-01-15 10:15',
    projects: 4,
    performance: 87
  },
  {
    id: '5',
    name: 'Lisa Wang',
    email: 'lisa.wang@company.com',
    department: 'Sales',
    role: 'Sales Representative',
    status: 'inactive',
    lastActive: '2024-01-10 09:30',
    projects: 1,
    performance: 75
  },
  // Add more sample data...
  ...Array.from({ length: 45 }, (_, i) => ({
    id: String(i + 6),
    name: `User ${i + 6}`,
    email: `user${i + 6}@company.com`,
    department: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'][i % 5],
    role: ['Developer', 'Designer', 'Manager', 'Representative', 'Specialist'][i % 5],
    status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
    lastActive: `2024-01-${String(15 - (i % 10)).padStart(2, '0')} ${String(10 + (i % 8)).padStart(2, '0')}:${String(30 + (i % 30)).padStart(2, '0')}`,
    projects: (i % 5) + 1,
    performance: 70 + (i % 30)
  }))
];

const AdvancedTableExample: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<SampleData[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  // Column definitions
  const columns: TableColumn<SampleData>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      render: (item) => <span className="text-sm font-mono">{item.id}</span>
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      render: (item) => (
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-blue-600">
              {item.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (item) => (
        <Chip
          label={item.department}
          variant="info"
          size="sm"
        />
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: (item) => <span className="text-sm">{item.role}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => (
        <Chip
          label={item.status}
          variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
          size="sm"
        />
      )
    },
    {
      key: 'projects',
      header: 'Projects',
      sortable: true,
      alignRight: true,
      render: (item) => (
        <div className="flex items-center justify-end">
          <Icon name="folder" className="w-4 h-4 text-gray-400 mr-1" />
          <span className="text-sm">{item.projects}</span>
        </div>
      )
    },
    {
      key: 'performance',
      header: 'Performance',
      sortable: true,
      alignRight: true,
      render: (item) => (
        <div className="flex items-center justify-end">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${item.performance}%` }}
            />
          </div>
          <span className="text-sm text-gray-600">{item.performance}%</span>
        </div>
      )
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
      render: (item) => (
        <div className="text-sm text-gray-500">
          {new Date(item.lastActive).toLocaleDateString()}
          <br />
          <span className="text-xs">
            {new Date(item.lastActive).toLocaleTimeString()}
          </span>
        </div>
      )
    }
  ];

  const handleRowSelect = (items: SampleData[]) => {
    setSelectedItems(items);
    console.log('Selected items:', items);
  };

  const handleRowActivate = (item: SampleData) => {
    console.log('Activated item:', item);
    // You could open a modal, navigate to detail page, etc.
    alert(`Viewing details for ${item.name}`);
  };

  const handleExport = (data: SampleData[], format: 'csv' | 'json') => {
    console.log(`Exporting ${data.length} items in ${format} format`);
    // Implement your export logic here
    if (format === 'csv') {
      const csvContent = [
        ['ID', 'Name', 'Email', 'Department', 'Role', 'Status', 'Projects', 'Performance', 'Last Active'],
        ...data.map(item => [
          item.id,
          item.name,
          item.email,
          item.department,
          item.role,
          item.status,
          item.projects,
          item.performance,
          item.lastActive
        ])
      ].map(row => row.join(',')).join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users-export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Advanced Table Example</h1>
        <p className="text-gray-600">
          A comprehensive, reusable table component with sorting, filtering, pagination, and more.
        </p>
      </div>

      {selectedItems.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Icon name="info" className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <button
              onClick={() => setSelectedItems([])}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}

      <AdvancedTable
        data={sampleData}
        columns={columns}
        title="Team Members"
        subtitle={`${sampleData.length} team members across all departments`}
        selectable={true}
        onRowSelect={handleRowSelect}
        onRowActivate={handleRowActivate}
        paginated={true}
        itemsPerPage={10}
        showColumnSelection={true}
        showSearch={true}
        showExport={true}
        onExport={handleExport}
        filters={filters}
        onFiltersChange={setFilters}
        compact={false}
        striped={true}
        hoverable={true}
        bordered={false}
        getRowKey={(item) => String(item.id)}
        aria-label="Team members table with sorting, filtering, and selection capabilities"
      />
    </div>
  );
};

export default AdvancedTableExample; 