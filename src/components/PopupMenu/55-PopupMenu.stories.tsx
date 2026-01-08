import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PopupMenu from './PopupMenu';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';

const meta: Meta<typeof PopupMenu> = {
  title: 'Design System/Components/PopupMenu',
  component: PopupMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The PopupMenu component displays a contextual menu with interactive items. It supports various configurations including positioning, sizing, alignment, icons, and multi-select functionality.

## Features

- **Positioning**: Position relative to an anchor element or absolute coordinates
- **Sizing**: Small, medium, and large size variants
- **Alignment**: Left, center, or right alignment relative to anchor
- **Icons**: Optional icons for menu items with show/hide control
- **Multi-select**: Checkbox-based multi-selection mode
- **States**: Default, hover, active/pressed, disabled, and focus states
- **Accessibility**: Full keyboard navigation and ARIA support
- **Theming**: Dynamic theme support for light, dark, and high contrast modes`,
      },
    },
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Whether the menu is open',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the menu',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
      description: 'Alignment of the menu relative to anchor',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height of the menu in pixels',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width of the menu in pixels',
    },
    showIcons: {
      control: 'boolean',
      description: 'Whether to show icons in menu items',
    },
    multiSelect: {
      control: 'boolean',
      description: 'Enable multi-select mode with checkboxes',
    },
    selectedItems: {
      control: false,
      description: 'Array of selected item IDs (for controlled multi-select)',
    },
    onSelectionChange: {
      action: 'selectionChanged',
      description: 'Callback fired when selection changes in multi-select mode',
    },
    items: {
      control: false,
      description: 'Array of menu items to display',
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the menu should be closed',
    },
    anchorEl: {
      control: false,
      description: 'Element to anchor the menu to',
    },
    position: {
      control: false,
      description: 'Absolute position { top, left } for the menu',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PopupMenu>;

const sampleItems = [
  { id: '1', label: 'Cut', icon: 'cut', action: () => console.log('Cut clicked') },
  { id: '2', label: 'Copy', icon: 'copy', action: () => console.log('Copy clicked') },
  { id: '3', label: 'Paste', icon: 'paste', action: () => console.log('Paste clicked') },
  { id: 'divider-1', divider: true },
  { id: '4', label: 'Delete', icon: 'trash-can', action: () => console.log('Delete clicked') },
  { id: '5', label: 'Settings', icon: 'settings', disabled: true },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    open: true,
    position: { top: 100, left: 100 },
  },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    
    return (
      <>
        <div style={{ height: '400px', width: '600px', position: 'relative' }}>
          <Button onClick={() => setOpen(!open)}>Toggle Menu</Button>
          <PopupMenu {...args} open={open} onClose={() => setOpen(false)} />
        </div>
      </>
    );
  },
};

export const WithAnchorElement: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    return (
      <div style={{ height: '400px', width: '600px', position: 'relative', padding: '100px' }}>
        <div ref={anchorRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpen(!open)}>
            Open Menu
          </Button>
        </div>
        <PopupMenu
          items={sampleItems}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = useState(false);
    const [openMd, setOpenMd] = useState(false);
    const [openLg, setOpenLg] = useState(false);
    const smRef = useRef<HTMLDivElement>(null);
    const mdRef = useRef<HTMLDivElement>(null);
    const lgRef = useRef<HTMLDivElement>(null);
    
    return (
      <div style={{ display: 'flex', gap: '20px', padding: '50px' }}>
        <div ref={smRef} style={{ display: 'inline-block' }}>
          <Button size="sm" onClick={() => setOpenSm(!openSm)}>
            Small Menu
          </Button>
        </div>
        <div ref={mdRef} style={{ display: 'inline-block' }}>
          <Button size="md" onClick={() => setOpenMd(!openMd)}>
            Medium Menu
          </Button>
        </div>
        <div ref={lgRef} style={{ display: 'inline-block' }}>
          <Button size="lg" onClick={() => setOpenLg(!openLg)}>
            Large Menu
          </Button>
        </div>
        
        <PopupMenu
          items={sampleItems}
          open={openSm}
          onClose={() => setOpenSm(false)}
          anchorEl={smRef.current}
          size="sm"
        />
        <PopupMenu
          items={sampleItems}
          open={openMd}
          onClose={() => setOpenMd(false)}
          anchorEl={mdRef.current}
          size="md"
        />
        <PopupMenu
          items={sampleItems}
          open={openLg}
          onClose={() => setOpenLg(false)}
          anchorEl={lgRef.current}
          size="lg"
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    const stateItems = [
      { id: '1', label: 'Default State', icon: 'document', action: () => console.log('Default clicked') },
      { id: '2', label: 'Hover State', icon: 'edit', action: () => console.log('Hover clicked') },
      { id: '3', label: 'Active/Pressed State', icon: 'view', action: () => console.log('Active clicked') },
      { id: 'divider-1', divider: true },
      { id: '4', label: 'Disabled State', icon: 'settings', disabled: true },
      { id: '5', label: 'Focus State', icon: 'notification', action: () => console.log('Focus clicked') },
    ];
    
    return (
      <div style={{ height: '500px', width: '600px', position: 'relative', padding: '100px' }}>
        <div ref={anchorRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpen(!open)}>
            Show States Menu
          </Button>
        </div>
        <PopupMenu
          items={stateItems}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
        />
        <div style={{ marginTop: '300px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Menu Item States</h3>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
            <li><strong>Default:</strong> Normal state with transparent background</li>
            <li><strong>Hover:</strong> Background changes to #E8E8E8 on mouse hover</li>
            <li><strong>Active/Pressed:</strong> Background changes to #D1D1D1 with no border when clicked</li>
            <li><strong>Disabled:</strong> Reduced opacity and non-interactive</li>
            <li><strong>Focus:</strong> Outline appears when focused via keyboard navigation</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates all the different states of PopupMenu items: default, hover, active/pressed, disabled, and focus states.',
      },
    },
  },
};

export const Alignment: Story = {
  render: () => {
    const [openLeft, setOpenLeft] = useState(false);
    const [openCenter, setOpenCenter] = useState(false);
    const [openRight, setOpenRight] = useState(false);
    const leftRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);
    
    return (
      <div style={{ display: 'flex', gap: '20px', padding: '50px' }}>
        <div ref={leftRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpenLeft(!openLeft)}>
            Left Aligned
          </Button>
        </div>
        <div ref={centerRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpenCenter(!openCenter)}>
            Center Aligned
          </Button>
        </div>
        <div ref={rightRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpenRight(!openRight)}>
            Right Aligned
          </Button>
        </div>
        
        <PopupMenu
          items={sampleItems}
          open={openLeft}
          onClose={() => setOpenLeft(false)}
          anchorEl={leftRef.current}
          align="left"
        />
        <PopupMenu
          items={sampleItems}
          open={openCenter}
          onClose={() => setOpenCenter(false)}
          anchorEl={centerRef.current}
          align="center"
        />
        <PopupMenu
          items={sampleItems}
          open={openRight}
          onClose={() => setOpenRight(false)}
          anchorEl={rightRef.current}
          align="right"
        />
      </div>
    );
  },
};

export const WithSubmenus: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    const itemsWithSubmenus = [
      { id: '1', label: 'File', icon: 'document', subItems: [] },
      { id: '2', label: 'Edit', icon: 'edit', subItems: [] },
      { id: '3', label: 'View', icon: 'view', subItems: [] },
      { id: 'divider-1', divider: true },
      { id: '4', label: 'Tools', icon: 'tools', subItems: [] },
      { id: '5', label: 'Help', icon: 'help', action: () => console.log('Help clicked') },
    ];
    
    return (
      <div style={{ height: '400px', padding: '50px' }}>
        <div ref={anchorRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpen(!open)}>
            Menu with Submenus
          </Button>
        </div>
        <PopupMenu
          items={itemsWithSubmenus}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
        />
      </div>
    );
  },
};

export const LongList: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    const longItems = Array.from({ length: 20 }, (_, i) => ({
      id: `item-${i}`,
      label: `Menu Item ${i + 1}`,
      icon: i % 3 === 0 ? 'star' : i % 3 === 1 ? 'heart' : 'bookmark',
      action: () => console.log(`Item ${i + 1} clicked`),
    }));
    
    return (
      <div style={{ height: '400px', padding: '50px' }}>
        <div ref={anchorRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpen(!open)}>
            Long Menu List
          </Button>
        </div>
        <PopupMenu
          items={longItems}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
          maxHeight={300}
        />
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    
    const customIconItems = [
      { 
        id: '1', 
        label: 'Custom Icon 1', 
        icon: <Icon name="user" size={20} style={{ color: ODLTheme.colors.success }} />,
        action: () => console.log('Custom 1 clicked') 
      },
      { 
        id: '2', 
        label: 'Custom Icon 2', 
        icon: <Icon name="notification" size={20} style={{ color: ODLTheme.colors.warning }} />,
        action: () => console.log('Custom 2 clicked') 
      },
      { 
        id: '3', 
        label: 'Custom Icon 3', 
        icon: <Icon name="settings" size={20} style={{ color: ODLTheme.colors.primary }} />,
        action: () => console.log('Custom 3 clicked') 
      },
    ];
    
    return (
      <div style={{ height: '400px', padding: '50px' }}>
        <div ref={anchorRef} style={{ display: 'inline-block' }}>
          <Button onClick={() => setOpen(!open)}>
            Custom Icons Menu
          </Button>
        </div>
        <PopupMenu
          items={customIconItems}
          open={open}
          onClose={() => setOpen(false)}
          anchorEl={anchorRef.current}
        />
      </div>
    );
  },
};

export const PositionedMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    
    const handleContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      setPosition({ top: e.clientY, left: e.clientX });
      setOpen(true);
    };
    
    return (
      <div 
        style={{ 
          height: '400px', 
          width: '600px', 
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          cursor: 'context-menu'
        }}
        onContextMenu={handleContextMenu}
      >
        <p style={{ textAlign: 'center', color: '#666' }}>
          Right-click anywhere in this area<br />to open a context menu
        </p>
        <PopupMenu
          items={sampleItems}
          open={open}
          onClose={() => setOpen(false)}
          position={position}
        />
      </div>
    );
  },
};