import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NavigationRail from '../NavigationRail/NavigationRail';
import Icon from '../Icon/Icon';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta = {
  title: 'Design System/Components/RightPanel',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'Ready for dev'],
};

export default meta;
type Story = StoryObj;

const defaultMenuItems = [
  {
    id: 'dashboard',
    iconName: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    description: 'Overview of your system metrics and key performance indicators',
  },
  {
    id: 'search',
    iconName: 'search',
    label: 'Search',
    path: '/search',
    description: 'Search and discover content across your organization',
  },
  {
    id: 'security',
    iconName: 'security',
    label: 'Security',
    path: '/security',
    description: 'Manage security settings and monitor system protection',
  },
  {
    id: 'messages',
    iconName: 'notification',
    label: 'Messages',
    path: '/messages',
    description: 'View and manage your messages and notifications',
  },
  {
    id: 'settings',
    iconName: 'settings',
    label: 'Settings',
    path: '/settings',
    description: 'Configure system preferences and user settings',
  },
];

const drawerContent: Record<string, { title: string; content: React.ReactNode }> = {
  dashboard: {
    title: 'Dashboard',
    content: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Dashboard Overview</h3>
        <p style={{ margin: '0 0 12px 0', color: '#666' }}>
          View your system metrics, KPIs, and recent activity all in one place.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontWeight: 500 }}>Active Users</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1976d2' }}>1,234</div>
          </div>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
            <div style={{ fontWeight: 500 }}>Total Sessions</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1976d2' }}>5,678</div>
          </div>
        </div>
      </div>
    ),
  },
  search: {
    title: 'Search',
    content: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Search Content</h3>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ marginTop: '16px' }}>
          <div style={{ fontWeight: 500, marginBottom: '8px' }}>Recent Searches</div>
          <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#666' }}>
            <li>User management</li>
            <li>Security settings</li>
            <li>API documentation</li>
          </ul>
        </div>
      </div>
    ),
  },
  security: {
    title: 'Security',
    content: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Security Status</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#e8f5e9', borderRadius: '8px', marginBottom: '12px' }}>
          <Icon name="checkmark-filled" size={20} color="#2e7d32" />
          <span style={{ color: '#2e7d32', fontWeight: 500 }}>System Secure</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>Firewall</span>
            <span style={{ color: '#2e7d32' }}>Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>SSL Certificate</span>
            <span style={{ color: '#2e7d32' }}>Valid</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <span>2FA</span>
            <span style={{ color: '#2e7d32' }}>Enabled</span>
          </div>
        </div>
      </div>
    ),
  },
  messages: {
    title: 'Messages',
    content: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Recent Messages</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { from: 'John Doe', message: 'Project update submitted', time: '5m ago' },
            { from: 'Jane Smith', message: 'Meeting scheduled for tomorrow', time: '1h ago' },
            { from: 'System', message: 'Backup completed successfully', time: '3h ago' },
          ].map((msg, i) => (
            <div key={i} style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontWeight: 500 }}>{msg.from}</span>
                <span style={{ fontSize: '12px', color: '#999' }}>{msg.time}</span>
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>{msg.message}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  settings: {
    title: 'Settings',
    content: (
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>Quick Settings</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Dark Mode', enabled: false },
            { label: 'Notifications', enabled: true },
            { label: 'Auto-save', enabled: true },
            { label: 'Analytics', enabled: false },
          ].map((setting, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>{setting.label}</span>
              <div style={{
                width: '40px',
                height: '22px',
                backgroundColor: setting.enabled ? '#1976d2' : '#ccc',
                borderRadius: '11px',
                position: 'relative',
                cursor: 'pointer'
              }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  left: setting.enabled ? '20px' : '2px',
                  transition: 'left 0.2s'
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

interface InlinePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string;
}

const InlinePanel: React.FC<InlinePanelProps> = ({ isOpen, onClose, title, children, width = '320px' }) => {
  const { colors } = useTheme();

  if (!isOpen) return null;

  return (
    <div
      style={{
        width,
        height: '100%',
        backgroundColor: colors.paper,
        borderLeft: `1px solid ${colors.grey300}`,
        borderRight: '1px solid #EDF1F5',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.2s ease-in-out',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: `1px solid ${colors.grey300}`,
        }}
      >
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: colors.textPrimary }}>{title}</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '4px',
            color: colors.textSecondary,
          }}
          aria-label="Close panel"
        >
          <Icon name="close" size={20} />
        </button>
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

export const Default: Story = {
  name: '01 Right Panel',
  render: () => {
    const [collapsed] = useState(true);
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const handleNavigate = (path: string) => {
      const itemId = path.replace('/', '');
      setCurrentPath(path);
      if (openDrawer === itemId) {
        setOpenDrawer(null);
      } else {
        setOpenDrawer(itemId);
      }
    };

    const handleCloseDrawer = () => {
      setOpenDrawer(null);
    };

    const currentDrawerContent = openDrawer ? drawerContent[openDrawer] : null;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>Main Content Area</h1>
          <p>Click on the navigation icons on the right to open the panel.</p>
          <p>The panel will appear directly beside the NavigationRail.</p>
          {openDrawer && (
            <p style={{ marginTop: '16px', color: '#1976d2' }}>
              Currently viewing: <strong>{openDrawer}</strong> panel
            </p>
          )}
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {currentDrawerContent && (
            <InlinePanel
              isOpen={!!openDrawer}
              onClose={handleCloseDrawer}
              title={currentDrawerContent.title}
              width="320px"
            >
              {currentDrawerContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            currentPath={currentPath}
            onNavigate={handleNavigate}
            menuItems={defaultMenuItems}
            collapsed={collapsed}
            position="right"
            showTooltips={true}
          />
        </div>
      </div>
    );
  },
};

export const ExpandableRail: Story = {
  name: '02 Expandable Rail',
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const handleNavigate = (path: string) => {
      const itemId = path.replace('/', '');
      setCurrentPath(path);
      if (openDrawer === itemId) {
        setOpenDrawer(null);
      } else {
        setOpenDrawer(itemId);
      }
    };

    const handleCloseDrawer = () => {
      setOpenDrawer(null);
    };

    const currentDrawerContent = openDrawer ? drawerContent[openDrawer] : null;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>Expandable Navigation Rail</h1>
          <p>This variant allows the navigation rail to be expanded/collapsed.</p>
          <p>Use the collapse toggle at the bottom of the rail to expand or collapse.</p>
          {openDrawer && (
            <p style={{ marginTop: '16px', color: '#1976d2' }}>
              Currently viewing: <strong>{openDrawer}</strong> panel
            </p>
          )}
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {currentDrawerContent && (
            <InlinePanel
              isOpen={!!openDrawer}
              onClose={handleCloseDrawer}
              title={currentDrawerContent.title}
              width="320px"
            >
              {currentDrawerContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            currentPath={currentPath}
            onNavigate={handleNavigate}
            menuItems={defaultMenuItems}
            collapsed={collapsed}
            position="right"
            showTooltips={true}
            showCollapseToggle={true}
            onCollapseToggle={(newCollapsed) => setCollapsed(newCollapsed)}
          />
        </div>
      </div>
    );
  },
};

export const WidePanel: Story = {
  name: '03 Wide Panel',
  render: () => {
    const [collapsed] = useState(true);
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const handleNavigate = (path: string) => {
      const itemId = path.replace('/', '');
      setCurrentPath(path);
      if (openDrawer === itemId) {
        setOpenDrawer(null);
      } else {
        setOpenDrawer(itemId);
      }
    };

    const handleCloseDrawer = () => {
      setOpenDrawer(null);
    };

    const currentDrawerContent = openDrawer ? drawerContent[openDrawer] : null;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>Wide Panel Variant</h1>
          <p>This variant uses a wider panel (480px) for more content space.</p>
          {openDrawer && (
            <p style={{ marginTop: '16px', color: '#1976d2' }}>
              Currently viewing: <strong>{openDrawer}</strong> panel
            </p>
          )}
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {currentDrawerContent && (
            <InlinePanel
              isOpen={!!openDrawer}
              onClose={handleCloseDrawer}
              title={currentDrawerContent.title}
              width="480px"
            >
              {currentDrawerContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            currentPath={currentPath}
            onNavigate={handleNavigate}
            menuItems={defaultMenuItems}
            collapsed={collapsed}
            position="right"
            showTooltips={true}
          />
        </div>
      </div>
    );
  },
};

export const WithHelpIcon: Story = {
  name: '04 With Help Icon',
  render: () => {
    const [collapsed] = useState(true);
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const handleNavigate = (path: string) => {
      const itemId = path.replace('/', '');
      setCurrentPath(path);
      if (openDrawer === itemId) {
        setOpenDrawer(null);
      } else {
        setOpenDrawer(itemId);
      }
    };

    const handleCloseDrawer = () => {
      setOpenDrawer(null);
    };

    const handleHelpClick = () => {
      if (openDrawer === 'help') {
        setOpenDrawer(null);
      } else {
        setOpenDrawer('help');
      }
    };

    const helpContent = {
      title: 'Help & Support',
      content: (
        <div style={{ padding: '16px' }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600 }}>How can we help?</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
              <Icon name="document" size={20} color="#1976d2" />
              <span>Documentation</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
              <Icon name="help" size={20} color="#1976d2" />
              <span>FAQ</span>
            </a>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px', textDecoration: 'none', color: 'inherit' }}>
              <Icon name="email" size={20} color="#1976d2" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      ),
    };

    const currentDrawerContent = openDrawer === 'help' ? helpContent : (openDrawer ? drawerContent[openDrawer] : null);

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
          <h1>With Help Icon</h1>
          <p>This variant includes a help icon at the bottom of the NavigationRail.</p>
          <p>Click on the help icon to open the help panel.</p>
          {openDrawer && (
            <p style={{ marginTop: '16px', color: '#1976d2' }}>
              Currently viewing: <strong>{openDrawer}</strong> panel
            </p>
          )}
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {currentDrawerContent && (
            <InlinePanel
              isOpen={!!openDrawer}
              onClose={handleCloseDrawer}
              title={currentDrawerContent.title}
              width="320px"
            >
              {currentDrawerContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            currentPath={currentPath}
            onNavigate={handleNavigate}
            menuItems={defaultMenuItems}
            collapsed={collapsed}
            position="right"
            showTooltips={true}
            showHelpIcon={true}
            onHelpClick={handleHelpClick}
          />
        </div>
      </div>
    );
  },
};
