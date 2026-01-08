import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ReactDOM from 'react-dom';
import AdaptiveList, { ViewType } from './AdaptiveList';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import IconButton from '../IconButton/IconButton';
import Checkbox from '../Checkbox/Checkbox';

const meta: Meta<typeof AdaptiveList> = {
  title: 'Design System/Components/AdaptiveList',
  component: AdaptiveList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    columns: {
      control: false,
      description: 'Column definitions for the list',
      table: {
        type: { summary: 'Column[]' },
      },
    },
    data: {
      control: false,
      description: 'Data rows to display in the list',
      table: {
        type: { summary: 'any[]' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether to show row selection checkboxes',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    bulkActions: {
      control: 'boolean',
      description: 'Whether to enable bulk actions for selected items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    paginated: {
      control: 'boolean',
      description: 'Whether to show pagination',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    viewType: {
      control: 'select',
      options: ['compact', 'comfortable', 'small-grid', 'large-grid', 'metadata', 'table'],
      description: 'The view type for displaying the list',
      table: {
        type: { summary: 'ViewType' },
        defaultValue: { summary: 'table' },
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
    documentId: 'A1691878'
  },
  {
    id: 2,
    name: 'Marketing Strategy 2025.docx',
    modifiedDate: '14-Dec-2024',
    modifiedBy: 'Jane Smith',
    documentId: 'A1691879'
  },
  {
    id: 3,
    name: 'Product Roadmap.xlsx',
    modifiedDate: '13-Dec-2024',
    modifiedBy: 'Bob Johnson',
    documentId: 'A1691880'
  },
  {
    id: 4,
    name: 'Employee Handbook.pdf',
    modifiedDate: '12-Dec-2024',
    modifiedBy: 'Alice Brown',
    documentId: 'A1691881'
  },
  {
    id: 5,
    name: 'Sales Presentation.pptx',
    modifiedDate: '11-Dec-2024',
    modifiedBy: 'Charlie Wilson',
    documentId: 'A1691882'
  },
  { id: 6, name: 'Budget Forecast.xlsx', modifiedDate: '10-Dec-2024', modifiedBy: 'David Lee', documentId: 'A1691883' },
  { id: 7, name: 'Project Timeline.pptx', modifiedDate: '09-Dec-2024', modifiedBy: 'Emma Davis', documentId: 'A1691884' },
  { id: 8, name: 'Contract Agreement.pdf', modifiedDate: '08-Dec-2024', modifiedBy: 'Frank Miller', documentId: 'A1691885' },
  { id: 9, name: 'Meeting Notes.docx', modifiedDate: '07-Dec-2024', modifiedBy: 'Grace Taylor', documentId: 'A1691886' },
  { id: 10, name: 'Technical Specs.pdf', modifiedDate: '06-Dec-2024', modifiedBy: 'Henry White', documentId: 'A1691887' },
  { id: 11, name: 'Training Manual.docx', modifiedDate: '05-Dec-2024', modifiedBy: 'Ivy Green', documentId: 'A1691888' },
  { id: 12, name: 'Expense Report.xlsx', modifiedDate: '04-Dec-2024', modifiedBy: 'Jack Black', documentId: 'A1691889' },
  { id: 13, name: 'Logo Design.png', modifiedDate: '03-Dec-2024', modifiedBy: 'Sarah Johnson', documentId: 'A1691890' },
  { id: 14, name: 'Website Backup.zip', modifiedDate: '02-Dec-2024', modifiedBy: 'Mike Wilson', documentId: 'A1691891' },
  { id: 15, name: 'Database Schema.sql', modifiedDate: '01-Dec-2024', modifiedBy: 'Lisa Brown', documentId: 'A1691892' },
];


const documentColumns = [
  {
    key: 'name',
    label: 'Name',
    width: '196px', // 246px - 50px
  },
  { key: 'modifiedDate', label: 'Modified Date', width: '130px' },
  { key: 'modifiedBy', label: 'Modified By', width: '140px' },
  {
    key: 'documentId',
    label: 'Id',
    width: '120px',
  },
  {
    key: 'actions',
    label: 'Action',
    width: '70px',
    alignRight: false,
    render: (item: any) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
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
      </div>
    ),
  },
];

const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onDownload,
  onClearSelection,
  onShare,
  onMove,
  onPublish,
  sortButtonRef,
  viewButtonRef,
  onSortClick,
  onViewClick,
  onRefreshClick,
  onSelectAll,
  allSelected,
  totalCount
}: {
  selectedCount: number;
  onDelete: () => void;
  onDownload: () => void;
  onClearSelection: () => void;
  onShare: () => void;
  onMove: () => void;
  onPublish: () => void;
  sortButtonRef?: React.RefObject<HTMLDivElement>;
  viewButtonRef?: React.RefObject<HTMLDivElement>;
  onSortClick?: () => void;
  onViewClick?: () => void;
  onRefreshClick?: () => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
  totalCount?: number;
}) => {
  return (
    <div
      className="adaptive-list-bulk-actions-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: 'white',
        borderBottom: '1px solid #D1D1D1',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            checked={allSelected || false}
            indeterminate={selectedCount > 0 && !allSelected}
            onChange={onSelectAll}
            aria-label="Select all items"
            size="md"
          />
          <span 
            style={{ 
              fontSize: '14px',
              fontWeight: 500,
              color: '#525965',
              cursor: 'pointer'
            }}
            onClick={onSelectAll}
          >
            Select all
          </span>
        </div>
        <Button
          variant="text"
          size="sm"
          onClick={onShare}
          icon={<Icon name="share" size={16} />}
        >
          Share
        </Button>
        <Button
          variant="text"
          size="sm"
          onClick={onMove}
          icon={<Icon name="folder-move-to" size={16} />}
        >
          Move
        </Button>
        <Button
          variant="text"
          size="sm"
          onClick={onDownload}
          icon={<Icon name="cloud-download" size={16} />}
        >
          Download
        </Button>
        <Button
          variant="text"
          size="sm"
          onClick={onPublish}
          icon={<Icon name="send" size={16} />}
        >
          Publish
        </Button>
        <Button
          variant="text"
          size="sm"
          onClick={onDelete}
          icon={<Icon name="trash-can" size={16} />}
        >
          Delete
        </Button>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div ref={sortButtonRef}>
          <IconButton
            icon="sort-remove"
            variant="ghost"
            size="medium"
            aria-label="Sort"
            menuIndicator={true}
            onClick={(e) => {
              e.stopPropagation();
              onSortClick?.();
            }}
          />
        </div>
        <div ref={viewButtonRef}>
          <IconButton
            icon="view"
            variant="ghost"
            size="medium"
            aria-label="View"
            menuIndicator={true}
            onClick={(e) => {
              e.stopPropagation();
              onViewClick?.();
            }}
          />
        </div>
        <IconButton
          icon="refresh"
          variant="ghost"
          size="medium"
          aria-label="Refresh"
          onClick={(e) => {
            e.stopPropagation();
            onRefreshClick?.();
          }}
        />
      </div>
    </div>
  );
};

// Dropdown Menu Component
const DropdownMenu = ({ 
  isOpen, 
  onClose, 
  position,
  children 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  position: { top: number; left: number };
  children: React.ReactNode;
}) => {
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

  const dropdownElement = (
    <div
      ref={dropdownRef}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        backgroundColor: 'white',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        minWidth: '180px',
        padding: '8px 0',
      }}
    >
      {children}
    </div>
  );

  return ReactDOM.createPortal(dropdownElement, document.body);
};

const MenuItem = ({ 
  onClick, 
  children,
  active = false
}: { 
  onClick: () => void; 
  children: React.ReactNode;
  active?: boolean;
}) => (
  <button
    onClick={onClick}
    style={{
      display: 'block',
      width: '100%',
      padding: '8px 16px',
      textAlign: 'left',
      background: active ? '#E8F0FE' : 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      color: active ? '#3560C1' : '#161616',
      fontWeight: active ? 600 : 400,
      transition: 'background-color 150ms ease',
    }}
    onMouseEnter={(e) => {
      if (!active) {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#F4F4F4';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
      }
    }}
  >
    {children}
  </button>
);

const AdaptiveListWithBulkActions = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['1']);
  const [sortDropdownOpen, setSortDropdownOpen] = React.useState(false);
  const [viewDropdownOpen, setViewDropdownOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0 });
  const [activeView, setActiveView] = React.useState<ViewType>('table');
  const sortButtonRef = React.useRef<HTMLDivElement>(null);
  const viewButtonRef = React.useRef<HTMLDivElement>(null);

  // Mapping between display names and ViewType values
  const viewTypeMap: { [key: string]: ViewType } = {
    'Compact': 'compact',
    'Comfortable': 'comfortable',
    'Small grid': 'small-grid',
    'Large grid': 'large-grid',
    'Metadata': 'metadata',
    'Table': 'table'
  };

  const displayNameMap: { [key in ViewType]: string } = {
    'compact': 'Compact',
    'comfortable': 'Comfortable',
    'small-grid': 'Small grid',
    'large-grid': 'Large grid',
    'metadata': 'Metadata',
    'table': 'Table'
  };

  React.useEffect(() => {
    // Add a style to remove table border for adaptive list
    const style = document.createElement('style');
    style.innerHTML = `
      .adaptive-list-container { border: none !important; }
      .adaptive-list-bulk-actions-bar button > span:first-child { margin-right: 0 !important; }
      .adaptive-list-bulk-actions-bar button svg { margin-right: 0 !important; }
      .adaptive-list-container thead th:first-child > * { visibility: hidden !important; }
      .adaptive-list-container .cards-container { border-bottom: none !important; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const handleShare = () => {
    console.log('Share items:', selectedKeys);
    alert(`Sharing ${selectedKeys.length} item(s)`);
  };

  const handleMove = () => {
    console.log('Move items:', selectedKeys);
    alert(`Moving ${selectedKeys.length} item(s)`);
  };

  const handlePublish = () => {
    console.log('Publish items:', selectedKeys);
    alert(`Publishing ${selectedKeys.length} item(s)`);
  };

  const handleSortClick = () => {
    if (sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setSortDropdownOpen(!sortDropdownOpen);
    setViewDropdownOpen(false);
  };

  const handleViewClick = () => {
    if (viewButtonRef.current) {
      const rect = viewButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
      });
    }
    setViewDropdownOpen(!viewDropdownOpen);
    setSortDropdownOpen(false);
  };

  const handleRefreshClick = () => {
    console.log('Refreshing list...');
    // Add refresh logic here
  };

  const handleSelectAll = () => {
    if (selectedKeys.length === documentData.length) {
      // If all are selected, deselect all
      setSelectedKeys([]);
    } else {
      // Select all items
      const allKeys = documentData.map(item => item.id.toString());
      setSelectedKeys(allKeys);
    }
  };

  const allSelected = selectedKeys.length === documentData.length && documentData.length > 0;

  return (
    <div style={{ border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
      <BulkActionsBar
        selectedCount={selectedKeys.length}
        onDelete={handleDelete}
        onDownload={handleDownload}
        onClearSelection={handleClearSelection}
        onShare={handleShare}
        onMove={handleMove}
        onPublish={handlePublish}
        sortButtonRef={sortButtonRef}
        viewButtonRef={viewButtonRef}
        onSortClick={handleSortClick}
        onViewClick={handleViewClick}
        onRefreshClick={handleRefreshClick}
        onSelectAll={handleSelectAll}
        allSelected={allSelected}
        totalCount={documentData.length}
      />
      <AdaptiveList
        data={documentData}
        columns={documentColumns}
        selectedKeys={selectedKeys}
        onRowSelect={handleRowSelect}
        getRowKey={(item) => item.id.toString()}
        className="adaptive-list-container"
        viewType={activeView}
        onViewTypeChange={setActiveView}
        selectable={true}
        showFileTypeIcon={true}
      />
      <DropdownMenu
        isOpen={sortDropdownOpen}
        onClose={() => setSortDropdownOpen(false)}
        position={dropdownPosition}
      >
        <MenuItem onClick={() => { console.log('Sort by Name'); setSortDropdownOpen(false); }}>
          Sort by Name
        </MenuItem>
        <MenuItem onClick={() => { console.log('Sort by Date'); setSortDropdownOpen(false); }}>
          Sort by Date
        </MenuItem>
        <MenuItem onClick={() => { console.log('Sort by Status'); setSortDropdownOpen(false); }}>
          Sort by Status
        </MenuItem>
        <MenuItem onClick={() => { console.log('Sort by Modified By'); setSortDropdownOpen(false); }}>
          Sort by Modified By
        </MenuItem>
      </DropdownMenu>
      
      <DropdownMenu
        isOpen={viewDropdownOpen}
        onClose={() => setViewDropdownOpen(false)}
        position={dropdownPosition}
      >
        <MenuItem 
          onClick={() => { 
            setActiveView('compact');
            console.log('Compact'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'compact'}
        >
          Compact
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            setActiveView('comfortable');
            console.log('Comfortable'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'comfortable'}
        >
          Comfortable
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            setActiveView('small-grid');
            console.log('Small grid'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'small-grid'}
        >
          Small grid
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            setActiveView('large-grid');
            console.log('Large grid'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'large-grid'}
        >
          Large grid
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            setActiveView('metadata');
            console.log('Metadata'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'metadata'}
        >
          Metadata
        </MenuItem>
        <MenuItem 
          onClick={() => { 
            setActiveView('table');
            console.log('Table'); 
            setViewDropdownOpen(false); 
          }}
          active={activeView === 'table'}
        >
          Table
        </MenuItem>
      </DropdownMenu>
    </div>
  );
};

export const Default: Story = {
  name: 'Default with Bulk Actions',
  render: () => <AdaptiveListWithBulkActions />,
};