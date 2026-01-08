import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import AdaptiveList, { ViewType } from './AdaptiveList';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import Chip from '../Chip/Chip';
import IconButton from '../IconButton/IconButton';
import Checkbox from '../Checkbox/Checkbox';
import PopupMenu, { PopupMenuItem } from '../PopupMenu/PopupMenu';
import { useTheme } from '../../../.storybook/theme-decorator';

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
  totalCount,
  sortMenuOpen,
  viewMenuOpen
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
  onSortClick?: (e?: React.MouseEvent) => void;
  onViewClick?: (e?: React.MouseEvent) => void;
  onRefreshClick?: () => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
  totalCount?: number;
  sortMenuOpen?: boolean;
  viewMenuOpen?: boolean;
}) => {
  const { colors } = useTheme();
  
  return (
    <div
      className="adaptive-list-bulk-actions-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: colors.paper,
        borderBottom: `1px solid ${colors.border}`,
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
              color: colors.textSecondary,
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
        <div ref={sortButtonRef} style={{ display: 'inline-block' }}>
          <IconButton
            icon="sort-remove"
            variant="ghost"
            size="medium"
            aria-label="Sort"
            menuIndicator={true}
            selected={sortMenuOpen}
            aria-expanded={sortMenuOpen}
            onClick={(e) => {
              e.stopPropagation();
              onSortClick?.(e);
            }}
          />
        </div>
        <div ref={viewButtonRef} style={{ display: 'inline-block' }}>
          <IconButton
            icon="view"
            variant="ghost"
            size="medium"
            aria-label="View"
            menuIndicator={true}
            selected={viewMenuOpen}
            aria-expanded={viewMenuOpen}
            onClick={(e) => {
              e.stopPropagation();
              onViewClick?.(e);
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


const AdaptiveListWithBulkActions = () => {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>(['1']);
  const [sortMenuOpen, setSortMenuOpen] = React.useState(false);
  const [viewMenuOpen, setViewMenuOpen] = React.useState(false);
  const [activeView, setActiveView] = React.useState<ViewType>('table');
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLDivElement>(null);

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

  const handleSortClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSortMenuOpen((prev) => !prev);
    setViewMenuOpen(false);
  };

  const handleViewClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setViewMenuOpen((prev) => !prev);
    setSortMenuOpen(false);
  };

  const sortMenuItems: PopupMenuItem[] = [
    { id: 'name', label: 'Sort by Name', icon: 'sort-ascending', action: () => { console.log('Sort by Name'); setSortMenuOpen(false); } },
    { id: 'date', label: 'Sort by Date', icon: 'calendar', action: () => { console.log('Sort by Date'); setSortMenuOpen(false); } },
    { id: 'status', label: 'Sort by Status', icon: 'status', action: () => { console.log('Sort by Status'); setSortMenuOpen(false); } },
    { id: 'modified', label: 'Sort by Modified By', icon: 'user', action: () => { console.log('Sort by Modified By'); setSortMenuOpen(false); } },
  ];

  const viewMenuItems: PopupMenuItem[] = [
    { id: 'compact', label: 'Compact', icon: 'view', action: () => { setActiveView('compact'); console.log('Compact'); setViewMenuOpen(false); } },
    { id: 'comfortable', label: 'Comfortable', icon: 'view', action: () => { setActiveView('comfortable'); console.log('Comfortable'); setViewMenuOpen(false); } },
    { id: 'small-grid', label: 'Small grid', icon: 'grid', action: () => { setActiveView('small-grid'); console.log('Small grid'); setViewMenuOpen(false); } },
    { id: 'large-grid', label: 'Large grid', icon: 'grid', action: () => { setActiveView('large-grid'); console.log('Large grid'); setViewMenuOpen(false); } },
    { id: 'metadata', label: 'Metadata', icon: 'information', action: () => { setActiveView('metadata'); console.log('Metadata'); setViewMenuOpen(false); } },
    { id: 'table', label: 'Table', icon: 'table', action: () => { setActiveView('table'); console.log('Table'); setViewMenuOpen(false); } },
  ];

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
        sortMenuOpen={sortMenuOpen}
        viewMenuOpen={viewMenuOpen}
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
      <PopupMenu
        items={sortMenuItems}
        open={sortMenuOpen}
        onClose={() => setSortMenuOpen(false)}
        anchorEl={sortButtonRef.current}
        align="left"
        size="md"
      />
      <PopupMenu
        items={viewMenuItems}
        open={viewMenuOpen}
        onClose={() => setViewMenuOpen(false)}
        anchorEl={viewButtonRef.current}
        align="left"
        size="md"
      />
    </div>
  );
};

export const Default: Story = {
  name: 'Default with Bulk Actions',
  render: () => <AdaptiveListWithBulkActions />,
};