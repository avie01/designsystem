# AdvancedTable - Standalone Version

## 🚀 Copy & Paste Ready!

This is a **completely self-contained** table component that you can copy directly into any React project. No external dependencies required!

## 📁 Files to Copy

Just copy these files to your project:

```
AdvancedTable/
├── AdvancedTableStandalone.tsx  # Main component (self-contained)
├── StandaloneExample.tsx        # Usage example
└── STANDALONE_README.md         # This file
```

## ✅ Requirements

- React 18+ 
- Tailwind CSS (for styling)
- TypeScript (optional but recommended)

## 🎯 Quick Start

1. **Copy the files** to your project's `src/components/` folder
2. **Import and use**:

```tsx
import React from 'react';
import AdvancedTable, { TableColumn } from './AdvancedTableStandalone';

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

// Use it!
function MyPage() {
  return (
    <div className="p-6">
      <AdvancedTable
        data={users}
        columns={columns}
        title="Users"
        selectable={true}
        paginated={true}
        showSearch={true}
        showExport={true}
      />
    </div>
  );
}
```

## ✨ Features Included

- ✅ **Sorting** - Click column headers
- ✅ **Pagination** - 5, 10, 25, 50, 100 items per page
- ✅ **Search** - Global search across all data
- ✅ **Row Selection** - Single/multi-select with checkboxes
- ✅ **Column Selection** - Show/hide columns
- ✅ **Export** - Download as CSV
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - Keyboard navigation & screen readers

## 🎨 Customization

```tsx
<AdvancedTable
  data={users}
  columns={columns}
  title="My Table"
  subtitle="Optional subtitle"
  selectable={true}           // Enable row selection
  paginated={true}            // Enable pagination
  itemsPerPage={25}          // Items per page
  showSearch={true}          // Show search box
  showColumnSelection={true} // Show column picker
  showExport={true}          // Show export button
  striped={true}             // Alternating row colors
  hoverable={true}           // Hover effects
  compact={false}            // Compact spacing
  bordered={false}           // Table borders
/>
```

## 🔧 Advanced Usage

### Custom Cell Rendering
```tsx
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
```

### Row Actions
```tsx
const handleRowActivate = (user: User) => {
  // Open modal, navigate, etc.
  console.log('Clicked user:', user);
};

<AdvancedTable
  data={users}
  columns={columns}
  onRowActivate={handleRowActivate}
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
```

## 🎯 That's It!

- **No dependencies** to install
- **No configuration** needed
- **Just copy and use** in any React project
- **Fully typed** with TypeScript
- **Beautiful design** with Tailwind CSS

## 🐛 Troubleshooting

**Q: Icons don't look right**
A: The component uses emoji icons by default. You can replace them with your own icon library.

**Q: Styling looks wrong**
A: Make sure Tailwind CSS is installed and configured in your project.

**Q: TypeScript errors**
A: The component is fully typed. Make sure your data interface matches your actual data structure.

## 📄 License

MIT License - Use freely in any project! 