import type { Meta, StoryObj } from '@storybook/react';
import Table from './Table';
import React from 'react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A powerful data table component with sorting, filtering, pagination, and selection capabilities.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Whether to show striped rows',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether rows have hover effects',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show borders',
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use compact spacing',
    },
    sortable: {
      control: 'boolean',
      description: 'Whether columns are sortable',
    },
    selectable: {
      control: 'boolean',
      description: 'Whether rows are selectable',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Pending', joinDate: '2023-05-12' },
];

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'joinDate', label: 'Join Date', sortable: true },
];

// Basic table
export const Default: Story = {
  args: {
    data: sampleData,
    columns: columns,
  },
};

// Striped table
export const Striped: Story = {
  args: {
    data: sampleData,
    columns: columns,
    striped: true,
  },
};

// Hoverable rows
export const Hoverable: Story = {
  args: {
    data: sampleData,
    columns: columns,
    hoverable: true,
  },
};

// Bordered table
export const Bordered: Story = {
  args: {
    data: sampleData,
    columns: columns,
    bordered: true,
  },
};

// Compact table
export const Compact: Story = {
  args: {
    data: sampleData,
    columns: columns,
    compact: true,
  },
};

// Sortable columns
export const Sortable: Story = {
  render: () => {
    const [data, setData] = React.useState(sampleData);
    const [sortConfig, setSortConfig] = React.useState<{
      key: string;
      direction: 'asc' | 'desc';
    } | null>(null);

    const handleSort = (key: string) => {
      let direction: 'asc' | 'desc' = 'asc';
      if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key, direction });

      const sorted = [...data].sort((a, b) => {
        const aValue = a[key as keyof typeof a];
        const bValue = b[key as keyof typeof b];
        
        if (aValue < bValue) {
          return direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
      
      setData(sorted);
    };

    return (
      <Table
        data={data}
        columns={columns}
        sortable
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    );
  },
};

// Selectable rows
export const Selectable: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = React.useState<number[]>([]);

    const handleSelectRow = (id: number) => {
      setSelectedRows(prev =>
        prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
      );
    };

    const handleSelectAll = () => {
      setSelectedRows(
        selectedRows.length === sampleData.length ? [] : sampleData.map(row => row.id)
      );
    };

    return (
      <>
        <div style={{ marginBottom: '1rem' }}>
          Selected: {selectedRows.length} row(s)
        </div>
        <Table
          data={sampleData}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
        />
      </>
    );
  },
};

// With pagination
export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;
    
    const paginatedData = sampleData.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    
    const totalPages = Math.ceil(sampleData.length / itemsPerPage);

    return (
      <>
        <Table data={paginatedData} columns={columns} />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, sampleData.length)} of{' '}
            {sampleData.length} entries
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                background: 'white',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  background: currentPage === page ? '#3b82f6' : 'white',
                  color: currentPage === page ? 'white' : 'black',
                  cursor: 'pointer',
                }}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                background: 'white',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  },
};

// Custom cell rendering
export const CustomCellRendering: Story = {
  args: {
    data: sampleData,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      {
        key: 'status',
        label: 'Status',
        render: (value: string) => (
          <span
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '12px',
              fontWeight: 500,
              background:
                value === 'Active'
                  ? '#d4f4dd'
                  : value === 'Inactive'
                  ? '#fecaca'
                  : '#fef3c7',
              color:
                value === 'Active'
                  ? '#1e7e34'
                  : value === 'Inactive'
                  ? '#dc2626'
                  : '#f59e0b',
            }}
          >
            {value}
          </span>
        ),
      },
      { key: 'joinDate', label: 'Join Date' },
    ],
  },
};

// Empty state
export const EmptyState: Story = {
  args: {
    data: [],
    columns: columns,
    emptyMessage: 'No data available',
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    data: [],
    columns: columns,
    loading: true,
  },
};