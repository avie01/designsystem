import { useState } from 'react';
import AdvancedTable, { TableColumn } from './AdvancedTableStandalone';

// Define your data interface
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive';
  lastActive: string;
}

// Sample data
const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', department: 'Engineering', status: 'active', lastActive: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', department: 'Design', status: 'active', lastActive: '2024-01-14' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', department: 'Marketing', status: 'inactive', lastActive: '2024-01-10' },
  // Add more users as needed...
];

function UserTable() {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  // Define columns
  const columns: TableColumn<User>[] = [
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
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      )
    },
    {
      key: 'department',
      header: 'Department',
      sortable: true,
      render: (item) => <span>{item.department}</span>
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          item.status === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {item.status}
        </span>
      )
    },
    {
      key: 'lastActive',
      header: 'Last Active',
      sortable: true,
      render: (item) => <span className="text-sm text-gray-500">{item.lastActive}</span>
    }
  ];

  const handleRowSelect = (items: User[]) => {
    setSelectedUsers(items);
    console.log('Selected users:', items);
  };

  const handleRowActivate = (user: User) => {
    console.log('Viewing user:', user);
    alert(`Viewing details for ${user.name}`);
  };

  const handleExport = (data: User[], format: 'csv' | 'json') => {
    if (format === 'csv') {
      const csvContent = [
        ['ID', 'Name', 'Email', 'Department', 'Status', 'Last Active'],
        ...data.map(user => [
          user.id,
          user.name,
          user.email,
          user.department,
          user.status,
          user.lastActive
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      {selectedUsers.length > 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}

      <AdvancedTable
        data={users}
        columns={columns}
        title="Users"
        subtitle={`${users.length} users in the system`}
        selectable={true}
        onRowSelect={handleRowSelect}
        onRowActivate={handleRowActivate}
        paginated={true}
        itemsPerPage={10}
        showSearch={true}
        showColumnSelection={true}
        showExport={true}
        onExport={handleExport}
        striped={true}
        hoverable={true}
        getRowKey={(item) => item.id}
      />
    </div>
  );
}

export default UserTable; 