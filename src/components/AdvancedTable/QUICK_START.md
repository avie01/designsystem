# Quick Start Guide - AdvancedTable Component

## 1. Copy the Component Files

Copy these files to your project:

```
AdvancedTable/
├── AdvancedTable.tsx      # Main component
├── index.ts              # Export file
├── README.md             # Full documentation
├── AdvancedTableExample.tsx  # Usage example
└── QUICK_START.md        # This file
```

## 2. Install Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "clsx": "^2.0.0"
  }
}
```

## 3. Basic Implementation

```tsx
import React from 'react';
import AdvancedTable, { TableColumn } from './AdvancedTable';

// Define your data
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', department: 'Engineering' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', department: 'Design' },
];

// Define columns
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (item) => <span className="font-medium">{item.name}</span>
  },
  {
    key: 'email',
    header: 'Email',
    render: (item) => <span>{item.email}</span>
  },
  {
    key: 'department',
    header: 'Department',
    sortable: true,
    render: (item) => <span>{item.department}</span>
  }
];

// Use the component
function MyPage() {
  return (
    <div className="p-6">
      <AdvancedTable
        data={users}
        columns={columns}
        title="Users"
        subtitle="Manage your team members"
        selectable={true}
        paginated={true}
        itemsPerPage={10}
        showSearch={true}
        showColumnSelection={true}
        showExport={true}
      />
    </div>
  );
}
```

## 4. Add Optional Features

### Row Selection
```tsx
const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

<AdvancedTable
  data={users}
  columns={columns}
  selectable={true}
  onRowSelect={setSelectedUsers}
/>
```

### Export Functionality
```tsx
const handleExport = (data: User[], format: 'csv' | 'json') => {
  if (format === 'csv') {
    const csvContent = data.map(user => 
      `${user.name},${user.email},${user.department}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users.csv';
    a.click();
  }
};

<AdvancedTable
  data={users}
  columns={columns}
  showExport={true}
  onExport={handleExport}
/>
```

### Row Actions
```tsx
const handleRowActivate = (user: User) => {
  // Open user details modal
  console.log('Viewing user:', user);
};

<AdvancedTable
  data={users}
  columns={columns}
  onRowActivate={handleRowActivate}
/>
```

## 5. Custom Styling

```tsx
<AdvancedTable
  data={users}
  columns={columns}
  compact={true}        // Tighter spacing
  striped={true}        // Alternating row colors
  hoverable={true}      // Hover effects
  bordered={true}       // Table borders
  className="shadow-lg" // Custom CSS classes
/>
```

## 6. Advanced Column Rendering

```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (item) => (
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-sm font-medium text-blue-600">
            {item.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-sm text-gray-500">{item.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <span className={`px-2 py-1 rounded-full text-xs ${
        item.status === 'active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {item.status}
      </span>
    )
  }
];
```

## 7. That's It!

Your table now has:
- ✅ Sorting (click column headers)
- ✅ Pagination (configurable items per page)
- ✅ Search (global search across all data)
- ✅ Column selection (show/hide columns)
- ✅ Row selection (single/multi-select)
- ✅ Export functionality (CSV/JSON)
- ✅ Responsive design
- ✅ Accessibility features

## Need More Help?

- Check the full `README.md` for detailed API documentation
- Look at `AdvancedTableExample.tsx` for complete examples
- The component is fully typed with TypeScript for better development experience

## Troubleshooting

**Q: I get import errors for Icon/Chip/Button/Modal**
A: These are optional dependencies. You can either:
1. Copy those components to your project
2. Remove the imports and modify the component to not use them
3. Replace them with your own icon/button components

**Q: The table doesn't look right**
A: Make sure you have Tailwind CSS installed and configured in your project.

**Q: Sorting doesn't work**
A: Make sure your column has `sortable: true` and the data is properly typed.

**Q: Export doesn't work**
A: Implement the `onExport` callback function to handle the export logic. 