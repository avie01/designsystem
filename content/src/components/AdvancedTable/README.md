# AdvancedTable Component

A comprehensive, reusable table component with advanced features like sorting, filtering, pagination, column selection, and export functionality.

## Features

- ✅ **Sortable columns** - Click column headers to sort
- ✅ **Row selection** - Single and multi-select with checkboxes
- ✅ **Pagination** - Configurable items per page with navigation
- ✅ **Search/Filter** - Global search across all data
- ✅ **Column selection** - Show/hide columns via modal
- ✅ **Export functionality** - Export data to CSV/JSON
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Accessibility** - Full keyboard navigation and screen reader support
- ✅ **Customizable styling** - Striped rows, hover effects, compact mode
- ✅ **TypeScript support** - Fully typed with generics

## Quick Start

```tsx
import AdvancedTable, { TableColumn } from './AdvancedTable';

// Define your data interface
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  status: 'active' | 'inactive';
}

// Define your columns
const columns: TableColumn<User>[] = [
  {
    key: 'id',
    header: 'ID',
    sortable: true,
    render: (item) => <span>{item.id}</span>
  },
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (item) => <span className="font-medium">{item.name}</span>
  },
  {
    key: 'department',
    header: 'Department',
    sortable: true,
    render: (item) => <span>{item.department}</span>
  }
];

// Use the component
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
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `T[]` | - | Array of data items |
| `columns` | `TableColumn<T>[]` | - | Column definitions |
| `selectable` | `boolean` | `false` | Whether to show row selection |
| `onRowSelect` | `(items: T[]) => void` | - | Callback when rows are selected |
| `hoverable` | `boolean` | `true` | Whether to show hover effects |
| `striped` | `boolean` | `true` | Whether to show striped rows |
| `bordered` | `boolean` | `false` | Whether to show borders |
| `compact` | `boolean` | `false` | Whether to use compact spacing |
| `paginated` | `boolean` | `false` | Whether to show pagination |
| `itemsPerPage` | `number` | `10` | Number of items per page |
| `title` | `string` | - | Table title |
| `subtitle` | `string` | - | Table subtitle |
| `showSearch` | `boolean` | `true` | Whether to show search input |
| `showColumnSelection` | `boolean` | `true` | Whether to show column selection |
| `showExport` | `boolean` | `true` | Whether to show export button |
| `onExport` | `(data: T[], format: string) => void` | - | Export callback |

### Column Definition

```tsx
interface TableColumn<T> {
  key: string;                    // Unique column identifier
  header: string;                 // Column header text
  render: (item: T) => React.ReactNode;  // Cell render function
  sortable?: boolean;             // Whether column is sortable
  width?: string;                 // Column width
  alignRight?: boolean;           // Right-align text
  visible?: boolean;              // Whether column is visible by default
  filterOptions?: string[];       // Filter options for this column
}
```

## Examples

### Basic Table

```tsx
const columns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    render: (item) => <span>{item.name}</span>
  },
  {
    key: 'email',
    header: 'Email',
    render: (item) => <span>{item.email}</span>
  }
];

<AdvancedTable
  data={users}
  columns={columns}
  title="Users"
/>
```

### Table with Selection and Actions

```tsx
const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

const handleRowSelect = (users: User[]) => {
  setSelectedUsers(users);
};

const handleRowActivate = (user: User) => {
  // Open user details modal
  openUserModal(user);
};

<AdvancedTable
  data={users}
  columns={columns}
  selectable={true}
  onRowSelect={handleRowSelect}
  onRowActivate={handleRowActivate}
  title="Users"
  subtitle={`${users.length} users found`}
/>
```

### Table with Export

```tsx
const handleExport = (data: User[], format: 'csv' | 'json') => {
  if (format === 'csv') {
    // Generate CSV content
    const csvContent = data.map(user => 
      `${user.name},${user.email}`
    ).join('\n');
    
    // Download file
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

### Custom Cell Rendering

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
      <Chip 
        label={item.status} 
        variant={item.status === 'active' ? 'success' : 'error'} 
        size="small" 
      />
    )
  }
];
```

### Table with Custom Styling

```tsx
<AdvancedTable
  data={users}
  columns={columns}
  compact={true}
  striped={true}
  hoverable={true}
  bordered={true}
  className="shadow-lg"
/>
```

## Styling

The component uses Tailwind CSS classes and can be customized with:

- `className` prop for additional CSS classes
- `compact` prop for tighter spacing
- `striped` prop for alternating row colors
- `hoverable` prop for hover effects
- `bordered` prop for table borders

## Accessibility

The component includes:

- Keyboard navigation (Tab, Enter, Space)
- Screen reader support with ARIA labels
- Focus management
- Semantic HTML structure

## Dependencies

The component requires these dependencies:

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "clsx": "^2.0.0"
  }
}
```

And these optional components (if you want all features):

```tsx
import Icon from '../Icon/Icon';
import Chip from '../Chip/Chip';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
```

## Migration from Basic Table

If you're migrating from a basic table component:

1. Replace your table with `AdvancedTable`
2. Convert your column definitions to use the `TableColumn` interface
3. Add the `render` function to each column
4. Configure the features you need (pagination, selection, etc.)

## Performance

The component is optimized for:

- Large datasets with pagination
- Efficient re-rendering with React.memo
- Debounced search input
- Virtual scrolling for very large datasets (planned)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use in your projects! 