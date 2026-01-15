import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import List, { ListItem } from './List';
import { PopupMenuItem } from '../PopupMenu/PopupMenu';

const meta: Meta<typeof List> = {
  title: 'Design System/Components/List',
  component: List,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL List component supporting flat and hierarchical data structures with selection and expansion capabilities. Fully accessible and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  args: {
    size: 'md',
    selectable: true,
    multiSelect: false,
    hierarchical: false,
    showExpandIcons: true,
  },
  argTypes: {
    items: {
      control: false,
      description: 'Array of list items',
      table: {
        type: { summary: 'ListItem[]' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the list',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether the list allows selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    multiSelect: {
      control: 'boolean',
      description: 'Whether the list allows multiple selection',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hierarchical: {
      control: 'boolean',
      description: 'Whether to show hierarchical items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showExpandIcons: {
      control: 'boolean',
      description: 'Whether to show expand/collapse icons for hierarchical items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onItemClick: {
      control: false,
      table: {
        disable: true,
      },
    },
    onSelectionChange: {
      control: false,
      table: {
        disable: true,
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    renderItem: {
      control: false,
      table: {
        disable: true,
      },
    },
    ariaLabel: {
      control: false,
      table: {
        disable: true,
      },
    },
    showCheckboxes: {
      control: 'boolean',
      description: 'Whether to show checkboxes for multi-select mode',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showBadges: {
      control: 'boolean',
      description: 'Whether to show badges for items with badge values',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    draggable: {
      control: 'boolean',
      description: 'Whether the list items are draggable for reordering',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onReorder: {
      control: false,
      description: 'Callback when items are reordered via drag and drop',
      table: {
        type: { summary: '(reorderedItems: ListItem[]) => void' },
      },
    },
    withActions: {
      control: 'boolean',
      description: 'Whether to show action menu buttons on list items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: ListItem[] = [
  { id: '1', label: 'Dashboard', icon: 'dashboard' },
  { id: '2', label: 'Projects', icon: 'folder' },
  { id: '3', label: 'Tasks', icon: 'task' },
  { id: '4', label: 'Settings', icon: 'settings' },
  { id: '5', label: 'Help', icon: 'help' },
];

const itemsWithCaptions: ListItem[] = [
  { id: '1', label: 'Inbox', caption: '12 new messages', icon: 'email' },
  { id: '2', label: 'Drafts', caption: '3 items', icon: 'document' },
  { id: '3', label: 'Sent', caption: '45 items', icon: 'send' },
  { id: '4', label: 'Trash', caption: 'Empty', icon: 'trash-can' },
];

const itemsWithBadges: ListItem[] = [
  { id: '1', label: 'Notifications', icon: 'notification', badgeValue: 5, badgeVariant: 'red-dark' },
  { id: '2', label: 'Messages', icon: 'email', badgeValue: 12, badgeVariant: 'blue-dark' },
  { id: '3', label: 'Updates', icon: 'renew', badgeValue: 3, badgeVariant: 'green-dark' },
  { id: '4', label: 'Tasks', icon: 'task', badgeValue: 8, badgeVariant: 'orange-dark' },
  { id: '5', label: 'Alerts', icon: 'warning', badgeValue: 2, badgeVariant: 'yellow-dark' },
];

const hierarchicalItems: ListItem[] = [
  {
    id: '1',
    label: 'Projects',
    icon: 'folder',
    children: [
      { id: '1-1', label: 'Website Redesign', icon: 'document' },
      { id: '1-2', label: 'Mobile App', icon: 'document' },
      { id: '1-3', label: 'API Development', icon: 'document' },
    ],
  },
  {
    id: '2',
    label: 'Documents',
    icon: 'folder',
    children: [
      { id: '2-1', label: 'Reports', icon: 'chart-bar' },
      { id: '2-2', label: 'Presentations', icon: 'presentation-file' },
      {
        id: '2-3',
        label: 'Contracts',
        icon: 'document-signed',
        children: [
          { id: '2-3-1', label: 'Q1 2024', icon: 'document' },
          { id: '2-3-2', label: 'Q2 2024', icon: 'document' },
        ],
      },
    ],
  },
  {
    id: '3',
    label: 'Media',
    icon: 'folder',
    children: [
      { id: '3-1', label: 'Images', icon: 'image' },
      { id: '3-2', label: 'Videos', icon: 'video' },
    ],
  },
];

const itemsWithDisabled: ListItem[] = [
  { id: '1', label: 'Active Item', icon: 'checkmark' },
  { id: '2', label: 'Disabled Item', icon: 'close', disabled: true },
  { id: '3', label: 'Another Active Item', icon: 'checkmark' },
];

const itemsWithSelection: ListItem[] = [
  { id: '1', label: 'Selected by default', icon: 'checkmark', selected: true },
  { id: '2', label: 'Not selected', icon: 'folder' },
  { id: '3', label: 'Also selected', icon: 'checkmark', selected: true },
  { id: '4', label: 'Not selected', icon: 'folder' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    size: 'md',
  },
};

export const Sizes: Story = {
  name: '02 Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
        <div style={{ maxWidth: '300px' }}>
          <List items={basicItems} size="sm" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
        <div style={{ maxWidth: '300px' }}>
          <List items={basicItems} size="md" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
        <div style={{ maxWidth: '400px' }}>
          <List items={itemsWithCaptions} size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const WithCaptions: Story = {
  args: {
    items: itemsWithCaptions,
    size: 'lg',
  },
};

export const Hierarchical: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={hierarchicalItems} hierarchical={true} />
    </div>
  ),
};

export const MultipleSelection: Story = {
  name: '05 Multiple Selection',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Multiple Selection with Checkboxes
      </h4>
      <List items={basicItems} multiSelect={true} showCheckboxes={true} />
    </div>
  ),
};

export const SingleSelection: Story = {
  name: '06 Single Selection',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Single Selection (Default)
      </h4>
      <List items={basicItems} multiSelect={false} />
    </div>
  ),
};

export const WithDisabledItems: Story = {
  name: '07 With Disabled Items',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={itemsWithDisabled} />
    </div>
  ),
};

export const WithDefaultSelection: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <List items={itemsWithSelection} multiSelect={true} />
    </div>
  ),
};

export const NonSelectable: Story = {
  name: '09 Non Selectable',
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
        Non-Selectable List
      </h4>
      <List items={basicItems} selectable={false} />
    </div>
  ),
};

export const FileExplorer: Story = {
  name: '10 File Explorer',
  render: () => {
    const fileItems: ListItem[] = [
      {
        id: 'root',
        label: 'My Documents',
        icon: 'folder',
        children: [
          {
            id: 'projects',
            label: 'Projects',
            icon: 'folder',
            children: [
              { id: 'proj1', label: 'project-plan.pdf', icon: 'document-pdf' },
              { id: 'proj2', label: 'budget.xlsx', icon: 'document-excel' },
            ],
          },
          {
            id: 'images',
            label: 'Images',
            icon: 'folder',
            children: [
              { id: 'img1', label: 'screenshot.png', icon: 'image' },
              { id: 'img2', label: 'logo.svg', icon: 'image' },
            ],
          },
          { id: 'readme', label: 'README.md', icon: 'document' },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: '500px', background: 'white', padding: '16px', borderRadius: '8px' }}>
        <List items={fileItems} hierarchical={true} size="md" />
      </div>
    );
  },
};

export const NavigationMenu: Story = {
  name: '11 Navigation Menu',
  render: () => {
    const navItems: ListItem[] = [
      {
        id: 'analytics',
        label: 'Analytics',
        icon: 'chart-line',
        children: [
          { id: 'overview', label: 'Overview', icon: 'dashboard' },
          { id: 'reports', label: 'Reports', icon: 'chart-bar' },
          { id: 'insights', label: 'Insights', icon: 'light-bulb' },
        ],
      },
      {
        id: 'users',
        label: 'Users',
        icon: 'user-multiple',
        children: [
          { id: 'all-users', label: 'All Users', icon: 'user' },
          { id: 'teams', label: 'Teams', icon: 'group' },
          { id: 'permissions', label: 'Permissions', icon: 'locked' },
        ],
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: 'settings',
        children: [
          { id: 'general', label: 'General', icon: 'settings-adjust' },
          { id: 'security', label: 'Security', icon: 'security' },
          { id: 'integrations', label: 'Integrations', icon: 'plug' },
        ],
      },
    ];

    return (
      <div style={{ maxWidth: '350px', background: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <List items={navItems} hierarchical={true} />
      </div>
    );
  },
};

export const Playground: Story = {
  name: '12 Playground',
  args: {
    items: basicItems,
    size: 'md',
    selectable: true,
    multiSelect: false,
    hierarchical: false,
    showExpandIcons: true,
  },
};

export const WithBadges: Story = {
  name: '13 With Badges',
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>List with Badges</h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Badge values can be displayed to the right of list items to show counts or status indicators.
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List items={itemsWithBadges} showBadges={true} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>List with Badges and Captions</h4>
          <div style={{ maxWidth: '400px' }}>
            <List
              items={[
                { id: '1', label: 'Inbox', caption: 'New messages', icon: 'email', badgeValue: 24, badgeVariant: 'blue-dark' },
                { id: '2', label: 'Priority', caption: 'High priority items', icon: 'flag', badgeValue: 3, badgeVariant: 'red-dark' },
                { id: '3', label: 'Archive', caption: 'Archived items', icon: 'folder', badgeValue: 156 },
              ]}
              size="lg"
              showBadges={true}
            />
          </div>
        </div>
      </div>
    );
  },
};

export const ThemeSupport: Story = {
  name: '14 Theme Support',
  render: () => {
    const themeItems: ListItem[] = [
      { id: '1', label: 'Primary Action', icon: 'star', selected: true },
      { id: '2', label: 'Secondary Action', icon: 'settings' },
      { id: '3', label: 'Disabled Option', icon: 'close', disabled: true },
      {
        id: '4',
        label: 'Nested Options',
        icon: 'folder',
        children: [
          { id: '4-1', label: 'Sub Option 1', icon: 'document' },
          { id: '4-2', label: 'Sub Option 2', icon: 'document' },
        ]
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            The List component automatically adapts to the current theme
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Try switching between Light, Dark, and High Contrast themes using the toolbar above
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List items={themeItems} hierarchical={true} multiSelect={true} showCheckboxes={true} />
          </div>
        </div>
      </div>
    );
  },
};

export const DraggableReorder: Story = {
  name: '15 Draggable - Reorder',
  render: () => {
    const [orderedItems, setOrderedItems] = React.useState<ListItem[]>([
      { id: '1', label: 'First Item', icon: 'document' },
      { id: '2', label: 'Second Item', icon: 'folder' },
      { id: '3', label: 'Third Item', icon: 'image' },
      { id: '4', label: 'Fourth Item', icon: 'video' },
      { id: '5', label: 'Fifth Item', icon: 'music' },
    ]);

    const handleReorder = (newItems: ListItem[]) => {
      setOrderedItems(newItems);
      console.log('New order:', newItems.map(item => item.label));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Draggable List - Reorder Items
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Drag items using the handle icon on the left to reorder them.
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List
              items={orderedItems}
              draggable={true}
              onReorder={handleReorder}
              selectable={false}
            />
          </div>
        </div>
        <div style={{ padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px', maxWidth: '400px' }}>
          <strong>Current Order:</strong>
          <ol style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
            {orderedItems.map((item, index) => (
              <li key={item.id}>{item.label}</li>
            ))}
          </ol>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `The draggable prop enables drag-and-drop reordering of list items.

Key props:
- **draggable**: Enables drag-and-drop reorder mode
- **onReorder**: Callback fired when items are reordered, receives the new items array

A drag handle icon appears on the left side of each item when draggable is enabled.`,
      },
    },
  },
};

export const DraggableWithSelection: Story = {
  name: '16 Draggable with Selection',
  render: () => {
    const [orderedItems, setOrderedItems] = React.useState<ListItem[]>([
      { id: '1', label: 'Task: Review PRs', icon: 'task' },
      { id: '2', label: 'Task: Update docs', icon: 'document' },
      { id: '3', label: 'Task: Fix bugs', icon: 'warning' },
      { id: '4', label: 'Task: Write tests', icon: 'checkmark' },
      { id: '5', label: 'Task: Deploy', icon: 'rocket' },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Draggable List with Selection
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Combine drag-and-drop reordering with item selection.
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List
              items={orderedItems}
              draggable={true}
              onReorder={setOrderedItems}
              selectable={true}
              multiSelect={true}
              showCheckboxes={true}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Draggable lists can be combined with selection features including multi-select with checkboxes.',
      },
    },
  },
};

export const DraggableSizes: Story = {
  name: '17 Draggable Sizes',
  render: () => {
    const smallItems: ListItem[] = [
      { id: 's1', label: 'Small Item 1', icon: 'star' },
      { id: 's2', label: 'Small Item 2', icon: 'heart' },
      { id: 's3', label: 'Small Item 3', icon: 'bookmark' },
    ];

    const mediumItems: ListItem[] = [
      { id: 'm1', label: 'Medium Item 1', icon: 'folder' },
      { id: 'm2', label: 'Medium Item 2', icon: 'document' },
      { id: 'm3', label: 'Medium Item 3', icon: 'image' },
    ];

    const largeItems: ListItem[] = [
      { id: 'l1', label: 'Large Item 1', caption: 'With description text', icon: 'dashboard' },
      { id: 'l2', label: 'Large Item 2', caption: 'Another description', icon: 'settings' },
      { id: 'l3', label: 'Large Item 3', caption: 'More details here', icon: 'user' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
          <div style={{ maxWidth: '300px' }}>
            <List items={smallItems} size="sm" draggable={true} selectable={false} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
          <div style={{ maxWidth: '350px' }}>
            <List items={mediumItems} size="md" draggable={true} selectable={false} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
          <div style={{ maxWidth: '400px' }}>
            <List items={largeItems} size="lg" draggable={true} selectable={false} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Draggable lists work with all size variants. The drag handle icon scales appropriately.',
      },
    },
  },
};

export const WithActions: Story = {
  name: '18 With Actions',
  render: () => {
    const createActions = (itemLabel: string): PopupMenuItem[] => [
      { id: 'edit', label: 'Edit', icon: 'edit', action: () => console.log(`Edit ${itemLabel}`) },
      { id: 'duplicate', label: 'Duplicate', icon: 'copy', action: () => console.log(`Duplicate ${itemLabel}`) },
      { id: 'share', label: 'Share', icon: 'share', action: () => console.log(`Share ${itemLabel}`) },
      { id: 'divider', label: '', divider: true },
      { id: 'delete', label: 'Delete', icon: 'trash-can', action: () => console.log(`Delete ${itemLabel}`) },
    ];

    const itemsWithActions: ListItem[] = [
      { id: '1', label: 'Project Alpha', icon: 'folder', actions: createActions('Project Alpha') },
      { id: '2', label: 'Project Beta', icon: 'folder', actions: createActions('Project Beta') },
      { id: '3', label: 'Project Gamma', icon: 'folder', actions: createActions('Project Gamma') },
      { id: '4', label: 'Project Delta', icon: 'folder', actions: createActions('Project Delta') },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            List with Action Menus
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Each list item has an overflow menu button on the right side with contextual actions.
          </p>
          <div style={{ maxWidth: '400px' }}>
            <List
              items={itemsWithActions}
              withActions={true}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `The withActions prop enables action menus on list items.

Key props:
- **withActions**: Enables action menu buttons on list items
- **item.actions**: Array of PopupMenuItem objects defining the menu options

Each item displays an overflow menu icon (⋮) on the right side. Clicking it opens a popup menu with the defined actions.`,
      },
    },
  },
};

export const WithActionsAndSelection: Story = {
  name: '19 With Actions and Selection',
  render: () => {
    const createActions = (itemLabel: string): PopupMenuItem[] => [
      { id: 'view', label: 'View Details', icon: 'view', action: () => console.log(`View ${itemLabel}`) },
      { id: 'edit', label: 'Edit', icon: 'edit', action: () => console.log(`Edit ${itemLabel}`) },
      { id: 'download', label: 'Download', icon: 'download', action: () => console.log(`Download ${itemLabel}`) },
    ];

    const documentsWithActions: ListItem[] = [
      { id: '1', label: 'Annual Report 2024.pdf', icon: 'document-pdf', actions: createActions('Annual Report') },
      { id: '2', label: 'Budget Spreadsheet.xlsx', icon: 'document-excel', actions: createActions('Budget Spreadsheet') },
      { id: '3', label: 'Presentation.pptx', icon: 'presentation-file', actions: createActions('Presentation') },
      { id: '4', label: 'Meeting Notes.docx', icon: 'document', actions: createActions('Meeting Notes') },
      { id: '5', label: 'Project Plan.md', icon: 'document', actions: createActions('Project Plan') },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Document List with Actions and Multi-Select
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Combine action menus with selection for a full-featured document management interface.
          </p>
          <div style={{ maxWidth: '450px' }}>
            <List
              items={documentsWithActions}
              withActions={true}
              multiSelect={true}
              showCheckboxes={true}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Action menus can be combined with multi-select checkboxes for document management interfaces.',
      },
    },
  },
};

export const WithActionsSizes: Story = {
  name: '20 With Actions - Sizes',
  render: () => {
    const createActions = (): PopupMenuItem[] => [
      { id: 'edit', label: 'Edit', icon: 'edit', action: () => {} },
      { id: 'delete', label: 'Delete', icon: 'trash-can', action: () => {} },
    ];

    const smallItems: ListItem[] = [
      { id: 's1', label: 'Small Item 1', icon: 'star', actions: createActions() },
      { id: 's2', label: 'Small Item 2', icon: 'heart', actions: createActions() },
    ];

    const mediumItems: ListItem[] = [
      { id: 'm1', label: 'Medium Item 1', icon: 'folder', actions: createActions() },
      { id: 'm2', label: 'Medium Item 2', icon: 'document', actions: createActions() },
    ];

    const largeItems: ListItem[] = [
      { id: 'l1', label: 'Large Item 1', caption: 'With description', icon: 'dashboard', actions: createActions() },
      { id: 'l2', label: 'Large Item 2', caption: 'Another description', icon: 'settings', actions: createActions() },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
          <div style={{ maxWidth: '300px' }}>
            <List items={smallItems} size="sm" withActions={true} selectable={false} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
          <div style={{ maxWidth: '350px' }}>
            <List items={mediumItems} size="md" withActions={true} selectable={false} />
          </div>
        </div>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
          <div style={{ maxWidth: '400px' }}>
            <List items={largeItems} size="lg" withActions={true} selectable={false} />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Action menu buttons scale appropriately with all list size variants.',
      },
    },
  },
};

export const WithActionsComplete: Story = {
  name: '21 With Actions - Complete Example',
  render: () => {
    const [orderedItems, setOrderedItems] = React.useState<ListItem[]>([
      {
        id: '1',
        label: 'Design System Components',
        icon: 'folder',
        actions: [
          { id: 'open', label: 'Open', icon: 'folder', action: () => console.log('Open folder') },
          { id: 'rename', label: 'Rename', icon: 'edit', action: () => console.log('Rename') },
          { id: 'share', label: 'Share', icon: 'share', action: () => console.log('Share') },
          { id: 'divider', label: '', divider: true },
          { id: 'delete', label: 'Delete', icon: 'trash-can', action: () => console.log('Delete') },
        ],
      },
      {
        id: '2',
        label: 'API Documentation',
        icon: 'document',
        actions: [
          { id: 'view', label: 'View', icon: 'view', action: () => console.log('View') },
          { id: 'download', label: 'Download', icon: 'download', action: () => console.log('Download') },
          { id: 'print', label: 'Print', icon: 'printer', action: () => console.log('Print') },
        ],
      },
      {
        id: '3',
        label: 'Meeting Recording',
        icon: 'video',
        actions: [
          { id: 'play', label: 'Play', icon: 'play', action: () => console.log('Play') },
          { id: 'download', label: 'Download', icon: 'download', action: () => console.log('Download') },
          { id: 'transcript', label: 'View Transcript', icon: 'document', action: () => console.log('Transcript') },
        ],
      },
      {
        id: '4',
        label: 'Project Timeline',
        icon: 'chart-bar',
        actions: [
          { id: 'export', label: 'Export', icon: 'export', action: () => console.log('Export') },
          { id: 'duplicate', label: 'Duplicate', icon: 'copy', action: () => console.log('Duplicate') },
        ],
      },
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            Complete Example: Draggable List with Actions
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Combining drag-and-drop reordering with contextual action menus.
          </p>
          <div style={{ maxWidth: '450px' }}>
            <List
              items={orderedItems}
              withActions={true}
              draggable={true}
              onReorder={setOrderedItems}
              selectable={true}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'A complete example combining draggable reordering, action menus, and selection for a full-featured list component.',
      },
    },
  },
};
