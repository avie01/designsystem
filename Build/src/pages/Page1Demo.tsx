import React, { useState } from 'react';
import Header from '../components/Header/Header';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import ODLTheme from '../styles/ODLTheme';
import Icon from '../components/Icon/Icon';

const Page1Demo: React.FC = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Navigation items for the left rail
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard' as const,
      onClick: () => console.log('Dashboard clicked')
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: 'document' as const,
      onClick: () => console.log('Applications clicked')
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: 'task' as const,
      onClick: () => console.log('Tasks clicked')
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'report' as const,
      onClick: () => console.log('Reports clicked')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings' as const,
      onClick: () => console.log('Settings clicked')
    }
  ];

  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: ODLTheme.colors.grey100
    }}>
      {/* Green Header Bar */}
      <Header 
        variant="Build"
        userName="John Doe"
        userAvatar="/path/to/avatar.jpg"
        onSearch={(query) => console.log('Search:', query)}
        onNotificationClick={() => console.log('Notifications clicked')}
        showSearch={true}
      />

      {/* Main Layout Container */}
      <div style={{ 
        display: 'flex',
        flex: 1,
        background: ODLTheme.colors.grey50, // Light grey background
        position: 'relative'
      }}>
        {/* Left Navigation Rail */}
        <div style={{
          width: isNavCollapsed ? '64px' : '240px',
          background: 'white',
          transition: 'width 0.3s ease',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          borderRight: `1px solid ${ODLTheme.colors.grey200}`,
          boxShadow: '2px 0 4px rgba(0, 0, 0, 0.05)'
        }}>
          {/* Navigation Header */}
          <div style={{
            padding: '20px',
            borderBottom: `1px solid ${ODLTheme.colors.grey200}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            {!isNavCollapsed && (
              <span style={{
                color: ODLTheme.colors.text,
                fontSize: ODLTheme.typography.fontSize.base,
                fontWeight: 600
              }}>
                Navigation
              </span>
            )}
            <button
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon 
                name={isNavCollapsed ? 'chevron-right' : 'chevron-left'} 
                size={20} 
                color={ODLTheme.colors.grey600} 
              />
            </button>
          </div>

          {/* Navigation Items */}
          <nav style={{ flex: 1, padding: '12px 0' }}>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={item.onClick}
                style={{
                  width: '100%',
                  padding: isNavCollapsed ? '12px' : '12px 20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: ODLTheme.colors.text,
                  fontSize: ODLTheme.typography.fontSize.sm,
                  transition: 'all 0.2s ease',
                  justifyContent: isNavCollapsed ? 'center' : 'flex-start'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = ODLTheme.colors.grey50;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon name={item.icon} size={20} color={ODLTheme.colors.grey600} />
                {!isNavCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <main style={{
          flex: 1,
          padding: '32px',
          overflow: 'auto'
        }}>
          {/* H1 Header Text */}
          <h1 style={{
            color: ODLTheme.colors.text,
            fontSize: '32px',
            fontWeight: 600,
            marginBottom: '24px',
            marginTop: 0
          }}>
            Page Title
          </h1>

          {/* Content Wrapper - ODL Content Border Pattern */}
          <div style={{
            background: '#EDF1F5', // Grey outer frame
            borderRadius: '16px',
            padding: '24px',
            minHeight: 'calc(100vh - 250px)'
          }}>
            {/* Inner Content Area */}
            <div style={{
              background: 'white', // White inner container
              borderRadius: '8px',
              padding: '24px',
              minHeight: 'calc(100vh - 330px)'
            }}>
              {/* Page Content */}
              <h2 style={{
                marginTop: 0,
                marginBottom: '16px',
                fontSize: '24px',
                fontWeight: 600,
                color: ODLTheme.colors.text
              }}>
                Content Section
              </h2>
              <p style={{
                margin: 0,
                fontSize: ODLTheme.typography.fontSize.base,
                color: ODLTheme.colors.textLight,
                lineHeight: 1.6
              }}>
                This template demonstrates the standard ODL page layout with:
              </p>
              <ul style={{
                marginTop: '16px',
                paddingLeft: '24px',
                color: ODLTheme.colors.textLight,
                lineHeight: 1.8
              }}>
                <li>Header component (Build variant with green theme)</li>
                <li>Primary navigation rail on the left side</li>
                <li>Content border wrapper pattern (grey outer frame with white inner container)</li>
                <li>Proper spacing and visual hierarchy</li>
                <li>Responsive collapsible navigation</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page1Demo;