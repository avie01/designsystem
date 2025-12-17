import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from '../src/components/Header/Header';
import NavigationRail from '../src/components/NavigationRail/NavigationRail';
import InternalReferrals from '../src/pages/InternalReferrals';

const InternalReferralsApp: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/referrals');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Navigation items matching the Build dashboard
  const navigationItems = [
    { id: 'dashboard', iconName: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'applications', iconName: 'document-tasks', label: 'Applications', path: '/applications' },
    { id: 'referrals', iconName: 'send', label: 'Internal Referrals', path: '/referrals' },
    { id: 'tasks', iconName: 'calendar', label: 'Tasks & Schedule', path: '/tasks' },
    { id: 'reports', iconName: 'chart-bar', label: 'Reports', path: '/reports' },
    { id: 'settings', iconName: 'settings', label: 'Settings', path: '/settings' },
  ];

  const handleNavigation = (path: string) => {
    setCurrentPath(path);
    // Handle actual navigation here
    if (path === '/dashboard') {
      window.location.href = '/council-dashboard.html';
    } else if (path === '/applications') {
      window.location.href = '/development-applications-dashboard.html';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#FAFAFA' }}>
      <Header 
        variant="build"
        userName="Sarah Chen"
        userRole="Planning Officer"
        showNotifications={true}
        notifications={[
          { id: '1', title: 'New referral assigned', message: 'DA/2024/0892 requires review', timestamp: '10 mins ago', read: false },
          { id: '2', title: 'Reminder: Response due', message: 'Heritage assessment due tomorrow', timestamp: '2 hours ago', read: false },
          { id: '3', title: 'Application updated', message: 'DA/2024/0875 has new documents', timestamp: '1 day ago', read: true },
        ]}
      />
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <NavigationRail 
          menuItems={navigationItems}
          collapsed={isNavCollapsed}
          onCollapseToggle={(collapsed) => setIsNavCollapsed(collapsed)}
          currentPath={currentPath}
          onNavigate={handleNavigation}
          position="left"
          showCollapseToggle={true}
        />
        
        <main style={{ 
          flex: 1, 
          overflow: 'auto',
          padding: '24px',
          background: '#FAFAFA'
        }}>
          <InternalReferrals />
        </main>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <InternalReferralsApp />
  </React.StrictMode>
);