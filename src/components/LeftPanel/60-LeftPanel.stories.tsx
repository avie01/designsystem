import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import NavigationRail from '../NavigationRail/NavigationRail';
import Icon from '../Icon/Icon';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta = {
  title: 'Design System/Components/LeftPanel',
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
    id: 'documents',
    iconName: 'document',
    label: 'Documents',
    path: '/documents',
    description: 'View and manage your documents',
  },
  {
    id: 'projects',
    iconName: 'folder',
    label: 'Projects',
    path: '/projects',
    description: 'Manage your projects and tasks',
  },
  {
    id: 'team',
    iconName: 'user-multiple',
    label: 'Team',
    path: '/team',
    description: 'View and manage team members',
  },
  {
    id: 'settings',
    iconName: 'settings',
    label: 'Settings',
    path: '/settings',
    description: 'Configure system preferences and user settings',
  },
];

interface LeftPanelContainerProps {
  title: string;
  children: React.ReactNode;
  width?: string;
}

const LeftPanelContainer: React.FC<LeftPanelContainerProps> = ({ title, children, width = '320px' }) => {
  const { colors } = useTheme();

  return (
    <div
      style={{
        width,
        height: '100%',
        backgroundColor: colors.paper,
        borderLeft: `1px solid ${colors.default}`,
        borderRight: `1px solid ${colors.default}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
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
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
};

const DashboardContent: React.FC = () => {
  const { colors } = useTheme();
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Dashboard Overview</h3>
      <p style={{ margin: '0 0 12px 0', color: colors.textSecondary }}>
        View your system metrics, KPIs, and recent activity all in one place.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
          <div style={{ fontWeight: 500, color: colors.textPrimary }}>Active Users</div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: colors.primaryMain }}>1,234</div>
        </div>
        <div style={{ padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
          <div style={{ fontWeight: 500, color: colors.textPrimary }}>Total Sessions</div>
          <div style={{ fontSize: '24px', fontWeight: 600, color: colors.primaryMain }}>5,678</div>
        </div>
      </div>
    </div>
  );
};

const DocumentsContent: React.FC = () => {
  const { colors } = useTheme();
  const docs = [
    { name: 'Project Proposal.pdf', date: '2 hours ago', icon: 'document' },
    { name: 'Meeting Notes.docx', date: 'Yesterday', icon: 'document' },
    { name: 'Budget Report.xlsx', date: '3 days ago', icon: 'document' },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Recent Documents</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {docs.map((doc, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
            <Icon name={doc.icon} size={20} color={colors.primaryMain} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: colors.textPrimary }}>{doc.name}</div>
              <div style={{ fontSize: '12px', color: colors.textMuted }}>{doc.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProjectsContent: React.FC = () => {
  const { colors } = useTheme();
  const projects = [
    { name: 'Website Redesign', progress: 75, status: 'In Progress' },
    { name: 'Mobile App', progress: 45, status: 'In Progress' },
    { name: 'API Integration', progress: 90, status: 'Review' },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Active Projects</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {projects.map((project, i) => (
          <div key={i} style={{ padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 500, color: colors.textPrimary }}>{project.name}</span>
              <span style={{ fontSize: '12px', color: colors.primaryMain }}>{project.status}</span>
            </div>
            <div style={{ height: '6px', backgroundColor: colors.border, borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${project.progress}%`, backgroundColor: colors.primaryMain, borderRadius: '3px' }} />
            </div>
            <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>{project.progress}% complete</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TeamContent: React.FC = () => {
  const { colors } = useTheme();
  const members = [
    { name: 'John Doe', role: 'Project Manager', status: 'online' },
    { name: 'Jane Smith', role: 'Developer', status: 'online' },
    { name: 'Bob Johnson', role: 'Designer', status: 'away' },
    { name: 'Alice Brown', role: 'QA Engineer', status: 'offline' },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Team Members</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {members.map((member, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: colors.primaryMain,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.textInverse,
              fontWeight: 500,
              fontSize: '14px'
            }}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, color: colors.textPrimary }}>{member.name}</div>
              <div style={{ fontSize: '12px', color: colors.textMuted }}>{member.role}</div>
            </div>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: member.status === 'online' ? colors.successMain : member.status === 'away' ? colors.warningMain : colors.grey600
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsContent: React.FC = () => {
  const { colors } = useTheme();
  const settings = [
    { label: 'Dark Mode', enabled: false },
    { label: 'Notifications', enabled: true },
    { label: 'Auto-save', enabled: true },
    { label: 'Analytics', enabled: false },
  ];
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Quick Settings</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {settings.map((setting, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
            <span style={{ color: colors.textPrimary }}>{setting.label}</span>
            <div style={{
              width: '40px',
              height: '22px',
              backgroundColor: setting.enabled ? colors.primaryMain : colors.grey600,
              borderRadius: '11px',
              position: 'relative',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '18px',
                height: '18px',
                backgroundColor: colors.paper,
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
  );
};

const HelpContent: React.FC = () => {
  const { colors } = useTheme();
  return (
    <div style={{ padding: '16px' }}>
      <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>How can we help?</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px', textDecoration: 'none', color: colors.textPrimary }}>
          <Icon name="document" size={20} color={colors.primaryMain} />
          <span>Documentation</span>
        </a>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px', textDecoration: 'none', color: colors.textPrimary }}>
          <Icon name="help" size={20} color={colors.primaryMain} />
          <span>FAQ</span>
        </a>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px', textDecoration: 'none', color: colors.textPrimary }}>
          <Icon name="email" size={20} color={colors.primaryMain} />
          <span>Contact Support</span>
        </a>
      </div>
    </div>
  );
};

const panelContent: Record<string, { title: string; Content: React.FC }> = {
  dashboard: { title: 'Dashboard', Content: DashboardContent },
  documents: { title: 'Documents', Content: DocumentsContent },
  projects: { title: 'Projects', Content: ProjectsContent },
  team: { title: 'Team', Content: TeamContent },
  settings: { title: 'Settings', Content: SettingsContent },
  help: { title: 'Help & Support', Content: HelpContent },
};

export const Default: Story = {
  name: '01 Left Panel',
  render: () => {
    const { colors } = useTheme();
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const currentPanel = panelContent[currentPath.replace('/', '')] || panelContent.dashboard;
    const { Content } = currentPanel;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={defaultMenuItems}
            collapsed={true}
            position="left"
            showTooltips={true}
          />

          <LeftPanelContainer title={currentPanel.title} width="320px">
            <Content />
          </LeftPanelContainer>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: colors.default }}>
          <h1 style={{ color: colors.textPrimary }}>Main Content Area</h1>
          <p style={{ color: colors.textSecondary }}>Click on the navigation icons on the left to change the panel content.</p>
          <p style={{ color: colors.textSecondary }}>The left panel always remains visible.</p>
          <p style={{ marginTop: '16px', color: colors.primaryMain }}>
            Currently viewing: <strong>{currentPath.replace('/', '')}</strong> panel
          </p>
        </div>
      </div>
    );
  },
};

export const ExpandableRail: Story = {
  name: '02 Expandable Rail',
  render: () => {
    const { colors } = useTheme();
    const [collapsed, setCollapsed] = useState(true);
    const [currentPath, setCurrentPath] = useState('/dashboard');
    const [panelWidth, setPanelWidth] = useState(320);
    const [isDragging, setIsDragging] = useState(false);
    const [panelCollapsed, setPanelCollapsed] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);

    const currentPanel = panelContent[currentPath.replace('/', '')] || panelContent.dashboard;
    const { Content } = currentPanel;

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setHasDragged(false);
    };

    React.useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        setHasDragged(true);
        if (panelCollapsed) {
          setPanelCollapsed(false);
        }
        const railWidth = collapsed ? 56 : 200;
        const newWidth = e.clientX - railWidth;
        const clampedWidth = Math.max(200, Math.min(600, newWidth));
        setPanelWidth(clampedWidth);
      };

      const handleMouseUp = () => {
        if (isDragging && !hasDragged) {
          setPanelCollapsed((prev) => !prev);
        }
        setIsDragging(false);
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDragging, collapsed, hasDragged, panelCollapsed]);

    return (
      <div style={{ height: '100vh', display: 'flex', cursor: isDragging ? 'col-resize' : 'default' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={defaultMenuItems}
            collapsed={collapsed}
            position="left"
            showTooltips={true}
            showCollapseToggle={true}
            onCollapseToggle={(newCollapsed) => setCollapsed(newCollapsed)}
          />

          <div style={{ display: 'flex', height: '100%' }}>
            {!panelCollapsed && (
              <LeftPanelContainer title={currentPanel.title} width={`${panelWidth}px`}>
                <Content />
              </LeftPanelContainer>
            )}

            <div
              onMouseDown={handleMouseDown}
              style={{
                width: '17.2px',
                height: '100%',
                backgroundColor: colors.paper,
                borderRight: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: panelCollapsed ? 'pointer' : 'col-resize',
                userSelect: 'none',
                transition: isDragging ? 'none' : 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.backgroundColor = colors.grey300;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDragging) {
                  e.currentTarget.style.backgroundColor = colors.paper;
                }
              }}
            >
              <Icon name="draggable" size={16} color={colors.textPrimary} />
            </div>
          </div>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: colors.default }}>
          <h1 style={{ color: colors.textPrimary }}>Expandable Navigation Rail</h1>
          <p style={{ color: colors.textSecondary }}>This variant allows the navigation rail to be expanded/collapsed.</p>
          <p style={{ color: colors.textSecondary }}>Use the collapse toggle at the bottom of the rail to expand or collapse.</p>
          <p style={{ color: colors.textSecondary }}>Drag the handle on the right edge of the panel to resize it.</p>
          <p style={{ color: colors.textSecondary }}>Click the drag handle to collapse/expand the left panel.</p>
          <p style={{ marginTop: '16px', color: colors.primaryMain }}>
            Currently viewing: <strong>{currentPath.replace('/', '')}</strong> panel
          </p>
          <p style={{ color: colors.textMuted }}>
            Panel width: <strong>{panelCollapsed ? 'Collapsed' : `${panelWidth}px`}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const WidePanel: Story = {
  name: '03 Wide Panel',
  render: () => {
    const { colors } = useTheme();
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const currentPanel = panelContent[currentPath.replace('/', '')] || panelContent.dashboard;
    const { Content } = currentPanel;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={defaultMenuItems}
            collapsed={true}
            position="left"
            showTooltips={true}
          />

          <LeftPanelContainer title={currentPanel.title} width="480px">
            <Content />
          </LeftPanelContainer>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: colors.default }}>
          <h1 style={{ color: colors.textPrimary }}>Wide Panel Variant</h1>
          <p style={{ color: colors.textSecondary }}>This variant uses a wider panel (480px) for more content space.</p>
          <p style={{ marginTop: '16px', color: colors.primaryMain }}>
            Currently viewing: <strong>{currentPath.replace('/', '')}</strong> panel
          </p>
        </div>
      </div>
    );
  },
};

export const WithHelpIcon: Story = {
  name: '04 With Help Icon',
  render: () => {
    const { colors } = useTheme();
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const currentPanel = panelContent[currentPath.replace('/', '')] || panelContent.dashboard;
    const { Content } = currentPanel;

    const handleHelpClick = () => {
      setCurrentPath('/help');
    };

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={defaultMenuItems}
            collapsed={true}
            position="left"
            showTooltips={true}
            showHelpIcon={true}
            onHelpClick={handleHelpClick}
          />

          <LeftPanelContainer title={currentPanel.title} width="320px">
            <Content />
          </LeftPanelContainer>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: colors.default }}>
          <h1 style={{ color: colors.textPrimary }}>With Help Icon</h1>
          <p style={{ color: colors.textSecondary }}>This variant includes a help icon at the bottom of the NavigationRail.</p>
          <p style={{ color: colors.textSecondary }}>Click on the help icon to view help content in the panel.</p>
          <p style={{ marginTop: '16px', color: colors.primaryMain }}>
            Currently viewing: <strong>{currentPath.replace('/', '')}</strong> panel
          </p>
        </div>
      </div>
    );
  },
};

export const NarrowPanel: Story = {
  name: '05 Narrow Panel',
  render: () => {
    const { colors } = useTheme();
    const [currentPath, setCurrentPath] = useState('/dashboard');

    const currentPanel = panelContent[currentPath.replace('/', '')] || panelContent.dashboard;
    const { Content } = currentPanel;

    return (
      <div style={{ height: '100vh', display: 'flex' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            menuItems={defaultMenuItems}
            collapsed={true}
            position="left"
            showTooltips={true}
          />

          <LeftPanelContainer title={currentPanel.title} width="280px">
            <Content />
          </LeftPanelContainer>
        </div>

        <div style={{ flex: 1, padding: '20px', backgroundColor: colors.default }}>
          <h1 style={{ color: colors.textPrimary }}>Narrow Panel Variant</h1>
          <p style={{ color: colors.textSecondary }}>This variant uses a narrower panel (280px) for compact layouts.</p>
          <p style={{ marginTop: '16px', color: colors.primaryMain }}>
            Currently viewing: <strong>{currentPath.replace('/', '')}</strong> panel
          </p>
        </div>
      </div>
    );
  },
};
