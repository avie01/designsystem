import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import AdvancedTable, { TableColumn } from './AdvancedTable';
import Chip from '../Chip/Chip';
import Icon from '../Icon/Icon';
import { TableRowData } from '../../types/common';

interface Employee extends TableRowData {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  projects: number;
  performance: number;
  salary: number;
}

interface Project extends TableRowData {
  id: string;
  name: string;
  client: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  budget: number;
  completion: number;
}

const employeeData: Employee[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    status: 'active',
    lastActive: '2024-01-15 14:30',
    projects: 5,
    performance: 95,
    salary: 120000
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
    performance: 88,
    salary: 95000
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
    performance: 92,
    salary: 105000
  },
  ...Array.from({ length: 47 }, (_, i) => ({
    id: String(i + 4),
    name: `Employee ${i + 4}`,
    email: `employee${i + 4}@company.com`,
    department: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'][i % 5],
    role: ['Developer', 'Designer', 'Manager', 'Representative', 'Specialist'][i % 5],
    status: ['active', 'inactive', 'pending'][i % 3] as 'active' | 'inactive' | 'pending',
    lastActive: `2024-01-${String(15 - (i % 10)).padStart(2, '0')} ${String(10 + (i % 8)).padStart(2, '0')}:${String(30 + (i % 30)).padStart(2, '0')}`,
    projects: (i % 5) + 1,
    performance: 70 + (i % 30),
    salary: 60000 + (i * 1000)
  }))
];

const projectData: Project[] = [
  {
    id: 'PRJ-001',
    name: 'Website Redesign',
    client: 'Acme Corp',
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    budget: 50000,
    completion: 65
  },
  {
    id: 'PRJ-002',
    name: 'Mobile App Development',
    client: 'TechStart Inc',
    status: 'in-progress',
    priority: 'critical',
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: 150000,
    completion: 35
  },
  {
    id: 'PRJ-003',
    name: 'Brand Identity',
    client: 'NewBrand LLC',
    status: 'completed',
    priority: 'medium',
    startDate: '2023-11-01',
    endDate: '2024-01-15',
    budget: 30000,
    completion: 100
  },
  ...Array.from({ length: 17 }, (_, i) => ({
    id: `PRJ-${String(i + 4).padStart(3, '0')}`,
    name: `Project ${i + 4}`,
    client: `Client ${i + 4}`,
    status: ['planning', 'in-progress', 'completed', 'on-hold'][i % 4] as 'planning' | 'in-progress' | 'completed' | 'on-hold',
    priority: ['low', 'medium', 'high', 'critical'][i % 4] as 'low' | 'medium' | 'high' | 'critical',
    startDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-01`,
    endDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-28`,
    budget: (i + 1) * 10000,
    completion: (i * 5) % 100
  }))
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Design System/Components/AdvancedTable',
  component: AdvancedTable,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Feature-rich data table component with sorting, filtering, pagination, search, column visibility, bulk actions, and export functionality. Supports custom rendering, row selection, and accessibility features.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '24px', width: '100%', maxWidth: 'none' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    data: {
      control: false,
      description: 'Array of data items to display',
      table: {
        disable: true,
        type: { summary: 'T[]' },
      },
    },
    columns: {
      control: false,
      description: 'Column definitions',
      table: {
        disable: true,
        type: { summary: 'TableColumn<T>[]' },
      },
    },
    selectable: {
      disable: true,
      control: 'boolean',
      description: 'Enable row selection',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    paginated: {
      control: 'boolean',
      description: 'Enable pagination',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
      table: {
        disable: true,
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    showSearch: {
      control: 'boolean',
      description: 'Show search input',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showExport: {
      control: 'boolean',
      description: 'Show export buttons',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showColumnToggle: {
      control: 'boolean',
      description: 'Show column visibility toggle',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const employeeColumns: TableColumn<Employee>[] = [
  {
    key: 'id',
    header: 'ID',
    label: 'ID',
    sortable: true,
    render: (item) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.id}</span>
  },
  {
    key: 'name',
    header: 'Name',
    label: 'Employee Name',
    sortable: true,
    render: (item) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '4px 0' }}>
        <div style={{
          width: '24px',
          height: '24px',
          backgroundColor: '#3560C1',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px'
        }}>
          <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 500, color: '#1f2937', fontSize: '12px', lineHeight: '1.2' }}>{item.name}</div>
          <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.2' }}>{item.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'department',
    header: 'Department',
    label: 'Department',
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
    label: 'Role',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    label: 'Status',
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
    label: 'Active Projects',
    sortable: true,
    alignRight: true,
    render: (item) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Icon name="folder" size={16} style={{ marginRight: '4px', color: '#9ca3af' }} />
        <span>{item.projects}</span>
      </div>
    )
  },
  {
    key: 'performance',
    header: 'Performance',
    label: 'Performance Score',
    sortable: true,
    alignRight: true,
    render: (item) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div style={{
          width: '60px',
          height: '6px',
          backgroundColor: '#e5e7eb',
          borderRadius: '3px',
          marginRight: '8px',
          overflow: 'hidden'
        }}>
          <div
            style={{
              width: `${item.performance}%`,
              height: '100%',
              backgroundColor: item.performance >= 90 ? '#10b981' : item.performance >= 70 ? '#f59e0b' : '#ef4444',
              borderRadius: '3px'
            }}
          />
        </div>
        <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.performance}%</span>
      </div>
    )
  }
];

export const Default: Story = {
  name: '01 Default',
  render: () => {
    const columns: TableColumn<Employee>[] = employeeColumns;

    return (
      <AdvancedTable
        data={employeeData}
        columns={columns}
        title="Team Members"
        subtitle={`${employeeData.length} employees across all departments`}
        paginated={true}
        itemsPerPage={10}
        showSearch={true}
        showExport={true}
        showColumnToggle={true}
        aria-label="Employee directory table"
      />
    );
  },
};

export const WithSelection: Story = {
  name: '02 With Selection',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<Employee[]>([]);

    return (
      <div>
        {selectedItems.length > 0 && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '6px'
          }}>
            <strong>{selectedItems.length}</strong> employee{selectedItems.length !== 1 ? 's' : ''} selected
          </div>
        )}
        <AdvancedTable
          data={employeeData}
          columns={employeeColumns}
          title="Selectable Employee Table"
          selectable={true}
          onRowSelect={setSelectedItems}
          paginated={true}
          itemsPerPage={10}
        />
      </div>
    );
  },
};

export const WithBulkActions: Story = {
  name: '03 With Bulk Actions',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<Employee[]>([]);

    return (
      <div>
        {selectedItems.length > 0 && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '6px'
          }}>
            <strong>{selectedItems.length}</strong> employee{selectedItems.length !== 1 ? 's' : ''} selected
            <button
              onClick={() => alert(`Exporting ${selectedItems.length} employees`)}
              style={{marginLeft: '12px', padding: '6px 12px', cursor: 'pointer'}}
            >
              Export
            </button>
          </div>
        )}
        <AdvancedTable
          data={employeeData}
          columns={employeeColumns}
          title="Employee Management"
          subtitle="Select employees to perform bulk actions"
          selectable={true}
          onRowSelect={setSelectedItems}
          paginated={true}
          itemsPerPage={10}
        />
      </div>
    );
  },
};

export const ProjectsTable: Story = {
  name: '04 Projects Table',
  render: () => {
    const columns: TableColumn<Project>[] = [
      {
        key: 'id',
        header: 'Project ID',
        label: 'Project ID',
        sortable: true,
        render: (item) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.id}</span>
      },
      {
        key: 'name',
        header: 'Project Name',
        label: 'Project Name',
        sortable: true,
      },
      {
        key: 'client',
        header: 'Client',
        label: 'Client Name',
        sortable: true,
      },
      {
        key: 'status',
        header: 'Status',
        label: 'Project Status',
        sortable: true,
        render: (item) => {
          const variantMap = {
            'planning': 'default' as const,
            'in-progress': 'info' as const,
            'completed': 'success' as const,
            'on-hold': 'warning' as const
          };
          return <Chip label={item.status} variant={variantMap[item.status]} size="sm" />;
        }
      },
      {
        key: 'priority',
        header: 'Priority',
        label: 'Priority Level',
        sortable: true,
        render: (item) => {
          const variantMap = {
            'low': 'default' as const,
            'medium': 'warning' as const,
            'high': 'error' as const,
            'critical': 'error' as const
          };
          return <Chip label={item.priority} variant={variantMap[item.priority]} size="sm" />;
        }
      },
      {
        key: 'budget',
        header: 'Budget',
        label: 'Project Budget',
        sortable: true,
        alignRight: true,
        render: (item) => `$${item.budget.toLocaleString()}`
      },
      {
        key: 'completion',
        header: 'Progress',
        label: 'Completion Percentage',
        sortable: true,
        render: (item) => (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              height: '8px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              marginRight: '8px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  width: `${item.completion}%`,
                  height: '100%',
                  backgroundColor: '#3b82f6',
                  borderRadius: '4px'
                }}
              />
            </div>
            <span style={{ fontSize: '12px', minWidth: '40px' }}>{item.completion}%</span>
          </div>
        )
      }
    ];

    return (
      <AdvancedTable
        data={projectData}
        columns={columns}
        title="Active Projects"
        subtitle={`${projectData.length} projects in portfolio`}
        paginated={true}
        itemsPerPage={10}
        showSearch={true}
        showExport={true}
      />
    );
  },
};

export const CompactTable: Story = {
  render: () => (
    <AdvancedTable
      data={employeeData}
      columns={employeeColumns}
      title="Compact View"
      compact={true}
      paginated={true}
      itemsPerPage={15}
    />
  ),
};

export const WithoutPagination: Story = {
  name: '06 Without Pagination',
  render: () => {
    const limitedData = employeeData.slice(0, 10);

    return (
      <AdvancedTable
        data={limitedData}
        columns={employeeColumns}
        title="All Employees"
        subtitle="Showing all employees without pagination"
        paginated={false}
      />
    );
  },
};

export const CustomExport: Story = {
  name: '07 Custom Export',
  render: () => {
    const handleExport = (data: Employee[], format: 'csv' | 'json') => {
      console.log(`Custom export handler: ${format}`, data);
      alert(`Custom export: ${data.length} items in ${format.toUpperCase()} format\n\nCheck console for data.`);
    };

    return (
      <AdvancedTable
        data={employeeData}
        columns={employeeColumns}
        title="Custom Export Handler"
        subtitle="Uses custom export function"
        onExport={handleExport}
        showExport={true}
        exportFormats={['csv', 'json']}
        paginated={true}
        itemsPerPage={10}
      />
    );
  },
};

export const ClickableRows: Story = {
  name: '08 Clickable Rows',
  render: () => {
    const handleRowActivate = (item: Employee) => {
      alert(`Opening details for ${item.name}\n\nEmail: ${item.email}\nDepartment: ${item.department}\nRole: ${item.role}`);
    };

    return (
      <AdvancedTable
        data={employeeData}
        columns={employeeColumns}
        title="Clickable Rows"
        subtitle="Click any row to view details"
        onRowActivate={handleRowActivate}
        paginated={true}
        itemsPerPage={10}
      />
    );
  },
};

export const MinimalFeatures: Story = {
  name: '09 Minimal Features',
  render: () => (
    <AdvancedTable
      data={employeeData.slice(0, 5)}
      columns={employeeColumns}
      showSearch={false}
      showExport={false}
      showColumnSelection={false}
      paginated={false}
      bordered={true}
    />
  ),
};

export const AllFeaturesEnabled: Story = {
  name: '10 All Features Enabled',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<Employee[]>([]);

    return (
      <div>
        {selectedItems.length > 0 && (
          <div style={{
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '6px'
          }}>
            <strong>{selectedItems.length}</strong> employee{selectedItems.length !== 1 ? 's' : ''} selected
          </div>
        )}
        <AdvancedTable
          data={employeeData}
          columns={employeeColumns}
          title="Full-Featured Employee Table"
          subtitle="All features enabled including search, filter, export, and pagination"
          selectable={true}
          onRowSelect={setSelectedItems}
          onRowActivate={(item) => console.log('Row activated:', item)}
          hoverable={true}
          striped={true}
          paginated={true}
          itemsPerPage={10}
          showSearch={true}
          showExport={true}
          showColumnSelection={true}
          exportFormats={['csv', 'json']}
          getRowKey={(item) => item.id}
          aria-label="Comprehensive employee management table"
        />
      </div>
    );
  },
};

export const ResizableColumns: Story = {
  name: '11 Resizable Columns',
  render: () => {
    const resizableColumns: TableColumn<Employee>[] = [
      {
        key: 'id',
        header: 'ID',
        label: 'ID',
        sortable: true,
        width: 80,
        minWidth: 60,
        render: (item) => <span style={{ fontFamily: 'monospace', fontSize: '12px' }}>{item.id}</span>
      },
      {
        key: 'name',
        header: 'Name',
        label: 'Employee Name',
        sortable: true,
        width: 250,
        minWidth: 150,
        render: (item) => (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '4px 0' }}>
            <div style={{
              width: '24px',
              height: '24px',
              backgroundColor: '#3560C1',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: '2px'
            }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'white' }}>
                {item.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontWeight: 500, color: '#1f2937', fontSize: '12px', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.email}</div>
            </div>
          </div>
        )
      },
      {
        key: 'department',
        header: 'Department',
        label: 'Department',
        sortable: true,
        width: 150,
        minWidth: 100,
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
        label: 'Role',
        sortable: true,
        width: 180,
        minWidth: 100,
      },
      {
        key: 'status',
        header: 'Status',
        label: 'Status',
        sortable: true,
        width: 120,
        minWidth: 80,
        render: (item) => (
          <Chip
            label={item.status}
            variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
            size="sm"
          />
        )
      },
      {
        key: 'performance',
        header: 'Performance',
        label: 'Performance Score',
        sortable: true,
        alignRight: true,
        width: 150,
        minWidth: 100,
        render: (item) => (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div style={{
              width: '60px',
              height: '6px',
              backgroundColor: '#e5e7eb',
              borderRadius: '3px',
              marginRight: '8px',
              overflow: 'hidden'
            }}>
              <div
                style={{
                  width: `${item.performance}%`,
                  height: '100%',
                  backgroundColor: item.performance >= 90 ? '#10b981' : item.performance >= 70 ? '#f59e0b' : '#ef4444',
                  borderRadius: '3px'
                }}
              />
            </div>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>{item.performance}%</span>
          </div>
        )
      }
    ];

    return (
      <div>
        <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fef3c7', border: '1px solid #f59e0b', borderRadius: '6px' }}>
          <strong>Tip:</strong> MUI DataGrid supports column resizing with column dividers
        </div>
        <AdvancedTable
          data={employeeData}
          columns={resizableColumns}
          title="Resizable Columns Table"
          subtitle="Columns are resizable using MUI DataGrid's built-in column resizing"
          paginated={true}
          itemsPerPage={10}
          showSearch={true}
          showExport={true}
        />
      </div>
    );
  },
};

export const Playground: Story = {
  name: '12 Playground',
  render: () => {
    const [selectedItems, setSelectedItems] = useState<Employee[]>([]);

    return (
      <div>
        <AdvancedTable
          data={employeeData}
          columns={employeeColumns}
          title="Employee Directory"
          subtitle="Interactive playground for testing table features"
          selectable={true}
          onRowSelect={setSelectedItems}
          paginated={true}
          itemsPerPage={10}
          showSearch={true}
          showExport={true}
          showColumnSelection={true}
        />
        {selectedItems.length > 0 && (
          <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h4>Selected Employees:</h4>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {selectedItems.map(item => (
                <li key={item.id}>{item.name} - {item.department}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
};
