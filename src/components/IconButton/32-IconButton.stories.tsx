import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import IconButton from './IconButton';
import Icon from '../Icon/Icon';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof IconButton> = {
  title: 'Design System/Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL IconButton component - a button containing only an icon. Perfect for toolbars, headers, and compact interfaces. Fully accessible with required aria-label support.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    icon: {
      control: 'text',
      description: 'The name of the Carbon icon to display',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive'],
      description: 'Button variant style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large'],
      description: 'Button size',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'large' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'ARIA label for accessibility - required for icon-only buttons',
      table: {
        type: { summary: 'string' },
      },
    },
    menuIndicator: {
      control: 'boolean',
      description: 'Whether to show a menu indicator (chevron-down icon)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic icon button
export const Default: Story = {
  args: {
    icon: 'add',
    'aria-label': 'Add item',
    variant: 'primary',
  },
};

// All variants showcase
export const AllVariants: Story = {
  name: '02 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>IconButton Variants</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="add" variant="primary" aria-label="Add item" />
          <IconButton icon="edit" variant="secondary" aria-label="Edit item" />
          <IconButton icon="settings" variant="tertiary" aria-label="Open settings" />
          <IconButton icon="search" variant="ghost" aria-label="Search" />
          <IconButton icon="delete" variant="destructive" aria-label="Delete item" />
        </div>
      </div>
    </div>
  ),
};

// All sizes
export const Sizes: Story = {
  name: '03 Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>IconButton Sizes</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <IconButton icon="add" size="xs" aria-label="Add item" />
          <IconButton icon="add" size="small" aria-label="Add item" />
          <IconButton icon="add" size="medium" aria-label="Add item" />
          <IconButton icon="add" size="large" aria-label="Add item" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Size Labels</h4>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <IconButton icon="add" size="xs" aria-label="Add item" />
            <div style={{ fontSize: '12px', marginTop: '4px', color: '#6C757D' }}>xs (28px)</div>
            <div style={{ fontSize: '12px', color: '#6C757D' }}>Icon: 16px</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton icon="add" size="small" aria-label="Add item" />
            <div style={{ fontSize: '12px', marginTop: '4px', color: '#6C757D' }}>small (32px)</div>
            <div style={{ fontSize: '12px', color: '#6C757D' }}>Icon: 16px</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton icon="add" size="medium" aria-label="Add item" />
            <div style={{ fontSize: '12px', marginTop: '4px', color: '#6C757D' }}>medium (36px)</div>
            <div style={{ fontSize: '12px', color: '#6C757D' }}>Icon: 20px</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <IconButton icon="add" size="large" aria-label="Add item" />
            <div style={{ fontSize: '12px', marginTop: '4px', color: '#6C757D' }}>large (44px)</div>
            <div style={{ fontSize: '12px', color: '#6C757D' }}>Icon: 20px</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Common actions
export const CommonActions: Story = {
  name: '04 Common Actions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>File Actions</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton icon="add" variant="primary" aria-label="Add file" />
          <IconButton icon="edit" variant="secondary" aria-label="Edit file" />
          <IconButton icon="copy" variant="tertiary" aria-label="Copy file" />
          <IconButton icon="download" variant="ghost" aria-label="Download file" />
          <IconButton icon="delete" variant="destructive" aria-label="Delete file" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Navigation Actions</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton icon="chevron-left" variant="ghost" aria-label="Go back" />
          <IconButton icon="chevron-right" variant="ghost" aria-label="Go forward" />
          <IconButton icon="home" variant="ghost" aria-label="Go to home" />
          <IconButton icon="refresh" variant="ghost" aria-label="Refresh page" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Media Controls</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton icon="play" variant="primary" aria-label="Play" />
          <IconButton icon="pause" variant="secondary" aria-label="Pause" />
          <IconButton icon="stop" variant="tertiary" aria-label="Stop" />
          <IconButton icon="skip-forward" variant="ghost" aria-label="Next track" />
          <IconButton icon="skip-back" variant="ghost" aria-label="Previous track" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Interface Controls</h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <IconButton icon="settings" variant="ghost" aria-label="Open settings" />
          <IconButton icon="filter" variant="ghost" aria-label="Filter results" />
          <IconButton icon="search" variant="ghost" aria-label="Search" />
          <IconButton icon="menu" variant="ghost" aria-label="Open menu" />
          <IconButton icon="close" variant="ghost" aria-label="Close" />
          <IconButton icon="maximize" variant="ghost" aria-label="Maximize" />
          <IconButton icon="minimize" variant="ghost" aria-label="Minimize" />
        </div>
      </div>
    </div>
  ),
};

// States
export const States: Story = {
  name: '05 States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Disabled State</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="add" variant="primary" disabled aria-label="Add item" />
          <IconButton icon="edit" variant="secondary" disabled aria-label="Edit item" />
          <IconButton icon="settings" variant="tertiary" disabled aria-label="Open settings" />
          <IconButton icon="delete" variant="destructive" disabled aria-label="Delete item" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Loading State</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="add" variant="primary" loading aria-label="Adding item" />
          <IconButton icon="save" variant="secondary" loading aria-label="Saving changes" />
          <IconButton icon="upload" variant="tertiary" loading aria-label="Uploading file" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Selected/Active State</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="favorite" variant="ghost" selected aria-label="Favorited" />
          <IconButton icon="bookmark" variant="ghost" selected aria-label="Bookmarked" />
          <IconButton icon="star" variant="ghost" selected aria-label="Starred" />
        </div>
      </div>
    </div>
  ),
};

// Toolbar examples
export const ToolbarExamples: Story = {
  name: '06 Toolbar Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Editor Toolbar</h4>
        <div style={{ display: 'flex', gap: '4px', padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '8px', border: '1px solid #E9ECEF' }}>
          <IconButton icon="text-bold" variant="ghost" size="large" aria-label="Bold text" />
          <IconButton icon="text-italic" variant="ghost" size="large" aria-label="Italic text" />
          <IconButton icon="text-underline" variant="ghost" size="large" aria-label="Underline text" />
          <div style={{ width: '1px', height: '44px', backgroundColor: '#E9ECEF', margin: '0 4px' }} />
          <IconButton icon="text-align-left" variant="ghost" size="large" aria-label="Align left" />
          <IconButton icon="text-align-center" variant="ghost" size="large" aria-label="Align center" />
          <IconButton icon="text-align-right" variant="ghost" size="large" aria-label="Align right" />
          <div style={{ width: '1px', height: '44px', backgroundColor: '#E9ECEF', margin: '0 4px' }} />
          <IconButton icon="list" variant="ghost" size="large" aria-label="Bullet list" />
          <IconButton icon="list-numbered" variant="ghost" size="large" aria-label="Numbered list" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Application Header</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #E9ECEF' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <IconButton icon="menu" variant="ghost" size="large" aria-label="Open menu" />
            <span style={{ fontWeight: 600, fontSize: '16px' }}>Application Name</span>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <IconButton icon="search" variant="ghost" size="large" aria-label="Search" />
            <IconButton icon="notification" variant="ghost" size="large" aria-label="Notifications" />
            <IconButton icon="settings" variant="ghost" size="large" aria-label="Settings" />
            <IconButton icon="user" variant="ghost" size="large" aria-label="User profile" />
          </div>
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Data Table Actions</h4>
        <div style={{ display: 'flex', gap: '8px', padding: '8px', backgroundColor: '#F8F9FA', borderRadius: '8px', border: '1px solid #E9ECEF' }}>
          <IconButton icon="add" variant="primary" size="large" aria-label="Add row" />
          <IconButton icon="edit" variant="secondary" size="large" aria-label="Edit selected" />
          <IconButton icon="delete" variant="destructive" size="large" aria-label="Delete selected" />
          <div style={{ width: '1px', height: '44px', backgroundColor: '#E9ECEF', margin: '0 8px' }} />
          <IconButton icon="filter" variant="ghost" size="large" aria-label="Filter data" />
          <IconButton icon="settings" variant="ghost" size="large" aria-label="Column settings" />
          <IconButton icon="download" variant="ghost" size="large" aria-label="Export data" />
        </div>
      </div>
    </div>
  ),
};

// Accessibility examples
export const AccessibilityExamples: Story = {
  name: '07 Accessibility Examples',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Good Accessibility Practices</h4>
        <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '16px' }}>All IconButtons have descriptive aria-label attributes that explain the action, not just the icon name.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="save" variant="primary" aria-label="Save document" title="Save document" />
          <IconButton icon="edit" variant="secondary" aria-label="Edit user profile" title="Edit user profile" />
          <IconButton icon="delete" variant="destructive" aria-label="Delete selected items" title="Delete selected items" />
          <IconButton icon="download" variant="ghost" aria-label="Download report as PDF" title="Download report as PDF" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Toggle States</h4>
        <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '16px' }}>For toggle buttons, use aria-pressed to indicate state.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="favorite" variant="ghost" aria-label="Add to favorites" aria-pressed={false} title="Add to favorites" />
          <IconButton icon="favorite" variant="ghost" selected aria-label="Remove from favorites" aria-pressed={true} title="Remove from favorites" />
          <IconButton icon="bookmark" variant="ghost" aria-label="Bookmark this page" aria-pressed={false} title="Bookmark this page" />
          <IconButton icon="bookmark" variant="ghost" selected aria-label="Remove bookmark" aria-pressed={true} title="Remove bookmark" />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Dropdown Triggers</h4>
        <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '16px' }}>For buttons that trigger dropdowns, use aria-expanded.</p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton icon="chevron-down" variant="ghost" aria-label="Show user menu" aria-expanded={false} title="Show user menu" />
          <IconButton icon="chevron-up" variant="ghost" aria-label="Hide user menu" aria-expanded={true} title="Hide user menu" />
          <IconButton icon="overflow-menu-horizontal" variant="ghost" aria-label="Show actions menu" aria-expanded={false} title="Show actions menu" />
        </div>
      </div>
    </div>
  ),
};

// Custom styling examples
export const CustomStyling: Story = {
  name: '08 Custom Styling',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Custom Colors</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton 
            icon="notification" 
            variant="ghost" 
            aria-label="Notifications" 
            customHoverBg="#FFF3CD"
            style={{ color: '#856404' }}
          />
          <IconButton 
            icon="chat" 
            variant="ghost" 
            aria-label="Messages" 
            customHoverBg="#D4EDDA"
            style={{ color: '#155724' }}
          />
          <IconButton 
            icon="help" 
            variant="ghost" 
            aria-label="Help" 
            customHoverBg="#CCE7FF"
            style={{ color: '#0066CC' }}
          />
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Custom Shapes</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <IconButton 
            icon="add" 
            variant="primary" 
            aria-label="Add item" 
            style={{ borderRadius: '50%' }}
          />
          <IconButton 
            icon="settings" 
            variant="secondary" 
            aria-label="Settings" 
            style={{ borderRadius: '4px' }}
          />
          <IconButton 
            icon="search" 
            variant="tertiary" 
            aria-label="Search" 
            style={{ borderRadius: '20px' }}
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  name: '09 Playground',
  args: {
    icon: 'add',
    'aria-label': 'Add item',
    variant: 'primary',
    size: 'large',
    disabled: false,
    loading: false,
    selected: false,
    onClick: () => alert('IconButton clicked!'),
  },
};

// IconButtons with Menu functionality
export const WithMenu: Story = {
  name: '10 With Menu',
  render: () => {
    const { colors } = useTheme();
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
    
    const menuOptions = [
      { value: 'edit', label: 'Edit', icon: <Icon name="edit" size={16} color={colors.textPrimary} /> },
      { value: 'copy', label: 'Copy', icon: <Icon name="copy" size={16} color={colors.textPrimary} /> },
      { value: 'share', label: 'Share', icon: <Icon name="share" size={16} color={colors.textPrimary} /> },
      { value: 'delete', label: 'Delete', icon: <Icon name="delete" size={16} color={colors.textPrimary} /> },
    ];

    const toggleMenu = (menuId: number) => {
      setOpenMenuId(openMenuId === menuId ? null : menuId);
      setHoveredMenuItem(null); // Reset hover state when toggling menu
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            IconButton with Dropdown Menu
          </h4>
          <p style={{ fontSize: '14px', color: '#6C757D', marginBottom: '16px' }}>
            Ghost variant IconButtons that trigger dropdown menus when clicked
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gap: '16px',
            maxWidth: '600px'
          }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div key={item} style={{ position: 'relative' }}>
                <IconButton
                  icon="overflow-menu-vertical"
                  variant="ghost"
                  size="medium"
                  aria-label={`Open menu for item ${item}`}
                  aria-expanded={openMenuId === item}
                  onClick={() => toggleMenu(item)}
                  selected={openMenuId === item}
                  menuIndicator={item >= 6} // Show menu indicator on second line (items 6-10)
                />
                
                {openMenuId === item && (
                  <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div
                      style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'transparent',
                        zIndex: 999,
                      }}
                      onClick={() => setOpenMenuId(null)}
                    />
                    
                    {/* Dropdown Menu */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: colors.paper,
                        border: `1px solid ${colors.border}`,
                        borderRadius: '4px',
                        boxShadow: '0px 3px 6px -4px rgba(0, 0, 0, 0.12), 0px 6px 16px 0px rgba(0, 0, 0, 0.08), 0px 9px 28px 8px rgba(0, 0, 0, 0.05)',
                        zIndex: 1000,
                        minWidth: '160px',
                        maxHeight: '20rem',
                        overflowY: 'auto',
                      }}
                    >
                      {menuOptions.map((option, index) => {
                        const menuItemKey = `${item}-${option.value}`;
                        const isHovered = hoveredMenuItem === menuItemKey;
                        
                        return (
                          <div
                            key={option.value}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '8px 12px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              color: colors.textPrimary,
                              backgroundColor: isHovered ? colors.surfaceHover : 'transparent',
                              borderBottom: index < menuOptions.length - 1 ? `1px solid ${colors.border}` : 'none',
                              transition: 'background-color 0.15s ease',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                            }}
                            onMouseEnter={() => setHoveredMenuItem(menuItemKey)}
                            onMouseLeave={() => setHoveredMenuItem(null)}
                            onClick={() => {
                              console.log(`${option.label} clicked for item ${item}`);
                              setOpenMenuId(null);
                              setHoveredMenuItem(null);
                            }}
                          >
                            {option.icon}
                            {option.label}
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            backgroundColor: colors.grey100, 
            borderRadius: '8px', 
            fontSize: '14px' 
          }}>
            <strong>Try it:</strong> Click any of the menu icons above to open the dropdown menu. 
            The menu will close when you click an option or click outside the menu area.
          </div>
        </div>
      </div>
    );
  },
};