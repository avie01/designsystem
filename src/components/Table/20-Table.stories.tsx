import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import Chip from '../Chip/Chip';
import Input from '../Input/Input';
import Button from '../Button/Button';

const meta: Meta<typeof Table> = {
  title: 'Design System/Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      description: 'Column definitions for the table',
      table: {
        type: { summary: 'Column[]' },
      },
    },
    data: {
      control: false,
      description: 'Data rows to display in the table',
      table: {
        type: { summary: 'any[]' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether to show row selection checkboxes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    compact: {
      control: 'boolean',
      description: 'Whether to use compact row spacing',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    paginated: {
      control: 'boolean',
      description: 'Whether to show pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    emptyMessage: {
      control: 'text',
      description: 'Message to show when table has no data',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'No data available' },
      },
    },
    headerActions: {
      control: false,
      description: 'Custom header actions (search, filter icons)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const documentData = [
  {
    id: 1,
    name: 'Q4 Financial Report.pdf',
    modifiedDate: '15-Dec-2024',
    modifiedBy: 'John Doe',
    status: 'Approved'
  },
  {
    id: 2,
    name: 'Marketing Strategy 2025.docx',
    modifiedDate: '14-Dec-2024',
    modifiedBy: 'Jane Smith',
    status: 'Draft'
  },
  {
    id: 3,
    name: 'Product Roadmap.xlsx',
    modifiedDate: '13-Dec-2024',
    modifiedBy: 'Bob Johnson',
    status: 'In Review'
  },
  {
    id: 4,
    name: 'Employee Handbook.pdf',
    modifiedDate: '12-Dec-2024',
    modifiedBy: 'Alice Brown',
    status: 'Approved'
  },
  {
    id: 5,
    name: 'Sales Presentation.pptx',
    modifiedDate: '11-Dec-2024',
    modifiedBy: 'Charlie Wilson',
    status: 'Draft'
  },
];

const getStatusVariant = (status: string): 'green' | 'yellow' | 'blue' | 'neutral' => {
  switch (status) {
    case 'Approved':
      return 'green';
    case 'In Review':
      return 'yellow';
    case 'Draft':
      return 'blue';
    default:
      return 'neutral';
  }
};

const Tooltip = ({ children, label }: { children: React.ReactNode; label: string }) => {
  const [show, setShow] = React.useState(false);
  const [position, setPosition] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 4,
        left: rect.left + rect.width / 2,
      });
    }
    setShow(true);
  };

  const tooltipElement = show ? (
    <div
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        transform: 'translate(-50%, -100%)',
        padding: '4px 8px',
        backgroundColor: '#161616',
        color: '#FFFFFF',
        fontSize: '12px',
        fontFamily: '"Noto Sans", sans-serif',
        borderRadius: '4px',
        whiteSpace: 'nowrap',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {label}
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      style={{ display: 'inline-flex' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {tooltipElement && ReactDOM.createPortal(tooltipElement, document.body)}
    </div>
  );
};

const documentColumns = [
  {
    key: 'name',
    label: 'Name',
    width: '250px',
  },
  { key: 'modifiedDate', label: 'Modified Date', width: '130px' },
  { key: 'modifiedBy', label: 'Modified By', width: '140px' },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (item: any) => (
      <Chip
        label={item.status}
        variant={getStatusVariant(item.status)}
        size="sm"
      />
    ),
  },
  {
    key: 'actions',
    label: 'Action',
    width: '70px',
    alignRight: true,
    render: (item: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
        <Tooltip label="Download">
          <IconButton
            icon="cloud-download"
            variant="ghost"
            size="small"
            aria-label="Download"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Download clicked for:', item);
            }}
          />
        </Tooltip>
        <Tooltip label="More actions">
          <IconButton
            icon="overflow-menu-vertical"
            variant="ghost"
            size="small"
            aria-label="More actions"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Menu clicked for:', item);
            }}
          />
        </Tooltip>
      </div>
    ),
  },
];


const FilterBar = () => {
  const [searchExpanded, setSearchExpanded] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (searchExpanded && searchContainerRef.current) {
      const input = searchContainerRef.current.querySelector('input');
      if (input) {
        input.focus();
      }
    }
  }, [searchExpanded]);

  const handleSearchClick = () => {
    setSearchExpanded(true);
  };

  const handleCloseSearch = () => {
    setSearchExpanded(false);
    setSearchValue('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {searchExpanded ? (
        <div ref={searchContainerRef} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Input
            type="search"
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search..."
            size="sm"
            icon={<Icon name="search" size={16} color="#525252" />}
            iconRight={
              <IconButton
                icon="close"
                variant="ghost"
                size="small"
                aria-label="Close search"
                onClick={handleCloseSearch}
              />
            }
            aria-label="Search table"
          />
        </div>
      ) : (
        <IconButton
          icon="search"
          variant="ghost"
          size="medium"
          aria-label="Search"
          onClick={handleSearchClick}
        />
      )}
    </div>
  );
};

export const Default: Story = {
  name: 'Default',
  render: () => <FilterableTable />,
};

export const Sortable: Story = {
  name: 'Sortable Columns',
  args: {
    data: documentData,
    columns: documentColumns.map(col =>
      col.key !== 'actions' ? { ...col, sortable: true } : col
    ),
  },
};

const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onDownload,
  onClearSelection
}: {
  selectedCount: number;
  onDelete: () => void;
  onDownload: () => void;
  onClearSelection: () => void;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: 'white',
        borderBottom: '1px solid #D1D1D1',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#161616' }}>
          {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
        </span>
        <Button
          variant="text"
          size="sm"
          onClick={onClearSelection}
        >
          Clear selection
        </Button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDownload}
          icon={<Icon name="cloud-download" size={16} />}
        >
          Download
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onDelete}
          icon={<Icon name="trash-can" size={16} />}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

const SelectableTable = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([]);

  const handleRowSelect = (selected: any[]) => {
    setSelectedKeys(selected.map(item => item.id.toString()));
    console.log('Selected:', selected);
  };

  const handleClearSelection = () => {
    setSelectedKeys([]);
  };

  const handleDelete = () => {
    console.log('Delete items:', selectedKeys);
    alert(`Deleting ${selectedKeys.length} item(s)`);
  };

  const handleDownload = () => {
    console.log('Download items:', selectedKeys);
    alert(`Downloading ${selectedKeys.length} item(s)`);
  };

  return (
    <div style={{ border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
      {selectedKeys.length > 0 && (
        <BulkActionsBar
          selectedCount={selectedKeys.length}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onClearSelection={handleClearSelection}
        />
      )}
      <Table
        data={documentData}
        columns={documentColumns}
        selectable={true}
        selectedKeys={selectedKeys}
        onRowSelect={handleRowSelect}
        getRowKey={(item) => item.id.toString()}
      />
    </div>
  );
};

export const WithSelection: Story = {
  name: 'Row Selection',
  render: () => <SelectableTable />,
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    data: [],
    columns: documentColumns,
    emptyMessage: 'No documents found',
  },
};

export const FullFeatured: Story = {
  name: 'Full Featured',
  args: {
    data: [
      ...documentData,
      { id: 6, name: 'Budget Forecast.xlsx', modifiedDate: '10-Dec-2024', modifiedBy: 'David Lee', status: 'Approved' },
      { id: 7, name: 'Project Timeline.pptx', modifiedDate: '09-Dec-2024', modifiedBy: 'Emma Davis', status: 'In Review' },
      { id: 8, name: 'Contract Agreement.pdf', modifiedDate: '08-Dec-2024', modifiedBy: 'Frank Miller', status: 'Draft' },
      { id: 9, name: 'Meeting Notes.docx', modifiedDate: '07-Dec-2024', modifiedBy: 'Grace Taylor', status: 'Approved' },
      { id: 10, name: 'Technical Specs.pdf', modifiedDate: '06-Dec-2024', modifiedBy: 'Henry White', status: 'In Review' },
      { id: 11, name: 'Training Manual.docx', modifiedDate: '05-Dec-2024', modifiedBy: 'Ivy Green', status: 'Approved' },
      { id: 12, name: 'Expense Report.xlsx', modifiedDate: '04-Dec-2024', modifiedBy: 'Jack Black', status: 'Draft' },
    ],
    columns: documentColumns.map(col =>
      col.key !== 'actions' ? { ...col, sortable: true } : col
    ),
    selectable: true,
    paginated: true,
    pageSize: 5,
    headerActions: <FilterBar />,
    onRowSelect: (selected) => console.log('Selected:', selected),
    onRowActivate: (row) => console.log('Row activated:', row),
  },
};

const StatusFilterDropdown = ({
  isOpen,
  onClose,
  selectedFilters,
  onFilterChange,
  position
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  position: { top: number; left: number };
}) => {
  const statuses = ['Approved', 'In Review', 'Draft'];
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCheckboxChange = (status: string) => {
    if (selectedFilters.includes(status)) {
      onFilterChange(selectedFilters.filter(f => f !== status));
    } else {
      onFilterChange([...selectedFilters, status]);
    }
  };

  const handleClearAll = () => {
    onFilterChange([]);
  };

  const dropdownElement = (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: 'white',
        border: '2px solid #3560C1',
        borderRadius: '2px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        minWidth: '180px',
        padding: '8px 0',
      }}
    >
      <div style={{ padding: '4px 16px 8px 16px', borderBottom: '1px solid #E0E0E0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#525252' }}>Filter by</span>
        {selectedFilters.length > 0 && (
          <button
            onClick={handleClearAll}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '11px',
              color: '#3560C1',
              cursor: 'pointer',
              padding: '2px 4px',
            }}
          >
            Clear all
          </button>
        )}
      </div>
      {statuses.map((status) => (
        <label
          key={status}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#161616',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLLabelElement).style.backgroundColor = '#F4F4F4';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLLabelElement).style.backgroundColor = 'transparent';
          }}
        >
          <input
            type="checkbox"
            checked={selectedFilters.includes(status)}
            onChange={() => handleCheckboxChange(status)}
            style={{
              width: '16px',
              height: '16px',
              cursor: 'pointer',
              accentColor: '#3560C1',
            }}
          />
          <span>{status}</span>
        </label>
      ))}
    </div>
  );

  return ReactDOM.createPortal(dropdownElement, document.body);
};

const FilterableTable = () => {
  const [statusFilters, setStatusFilters] = React.useState<string[]>([]);
  const [filterDropdownOpen, setFilterDropdownOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });
  const filterButtonRef = React.useRef<HTMLButtonElement>(null);

  const allData = [
    ...documentData,
    { id: 6, name: 'Budget Forecast.xlsx', modifiedDate: '10-Dec-2024', modifiedBy: 'David Lee', status: 'Approved' },
    { id: 7, name: 'Project Timeline.pptx', modifiedDate: '09-Dec-2024', modifiedBy: 'Emma Davis', status: 'In Review' },
    { id: 8, name: 'Contract Agreement.pdf', modifiedDate: '08-Dec-2024', modifiedBy: 'Frank Miller', status: 'Draft' },
    { id: 9, name: 'Meeting Notes.docx', modifiedDate: '07-Dec-2024', modifiedBy: 'Grace Taylor', status: 'Approved' },
    { id: 10, name: 'Technical Specs.pdf', modifiedDate: '06-Dec-2024', modifiedBy: 'Henry White', status: 'In Review' },
  ];

  const filteredData = statusFilters.length > 0
    ? allData.filter(item => statusFilters.includes(item.status))
    : allData;

  const handleFilterClick = () => {
    if (filterButtonRef.current) {
      const rect = filterButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  const filterableColumns = [
    {
      key: 'name',
      label: 'Name',
      width: '250px',
      sortable: true,
    },
    { key: 'modifiedDate', label: 'Modified Date', width: '130px', sortable: true },
    { key: 'modifiedBy', label: 'Modified By', width: '140px', sortable: true },
    {
      key: 'status',
      label: 'Status',
      width: '150px',
      sortable: true,
      renderHeader: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Status</span>
          <button
            ref={filterButtonRef}
            onClick={(e) => {
              e.stopPropagation();
              handleFilterClick();
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '4px',
              position: 'relative',
            }}
            aria-label="Filter status"
          >
            <Icon name="filter" size={16} color="#525252" />
            {statusFilters.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#3560C1',
                  borderRadius: '50%',
                }}
              />
            )}
          </button>
        </div>
      ),
      render: (item: any) => (
        <Chip
          label={item.status}
          variant={getStatusVariant(item.status)}
          size="sm"
        />
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      width: '70px',
      alignRight: true,
      render: (item: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-end' }}>
          <Tooltip label="Download">
            <IconButton
              icon="cloud-download"
              variant="ghost"
              size="small"
              aria-label="Download"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Download clicked for:', item);
              }}
            />
          </Tooltip>
          <Tooltip label="More actions">
            <IconButton
              icon="overflow-menu-vertical"
              variant="ghost"
              size="small"
              aria-label="More actions"
              onClick={(e) => {
                e.stopPropagation();
                console.log('Menu clicked for:', item);
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        data={filteredData}
        columns={filterableColumns}
        headerActions={<FilterBar />}
        onRowActivate={(row) => console.log('Row activated:', row)}
      />
      <StatusFilterDropdown
        isOpen={filterDropdownOpen}
        onClose={() => setFilterDropdownOpen(false)}
        selectedFilters={statusFilters}
        onFilterChange={setStatusFilters}
        position={dropdownPosition}
      />
    </>
  );
};

