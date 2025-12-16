import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types
export interface Alert {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  type: 'update' | 'schedule' | 'maintenance' | 'announcement';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
  source: string;
  read: boolean;
}

export interface SecurityAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedSystems: string[];
  timestamp: Date;
  status: 'new' | 'investigating' | 'resolved';
  assignedTo?: string;
  bcNumber?: string;
}

export interface TableFilter {
  classification?: string;
  department?: string;
}

export interface RecentActivity {
  id: string;
  type: 'consent_approved' | 'document_uploaded' | 'inspection_completed' | 'comment_added' | 'status_changed' | 'deadline_approaching' | 'team_update';
  title: string;
  description: string;
  timestamp: Date;
  relatedItem?: string;
  user?: string;
  icon?: string;
  color?: string;
}

// Context interface
interface PageManagerContextType {
  // UI State
  leftCollapsed: boolean;
  setLeftCollapsed: (collapsed: boolean) => void;
  expandedFolders: Set<string>;
  setExpandedFolders: (folders: Set<string>) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  
  // Data State
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  securityAlerts: SecurityAlert[];
  setSecurityAlerts: (alerts: SecurityAlert[]) => void;
  recentActivities: RecentActivity[];
  setRecentActivities: (activities: RecentActivity[]) => void;
  
  // Table State
  tableFilter: TableFilter | null;
  setTableFilter: (filter: TableFilter | null) => void;
  
  // Actions
  dismissAlert: (alertId: string) => void;
  markAlertAsRead: (alertId: string) => void;
  markNotificationAsRead: (notificationId: string) => void;
  resolveSecurityAlert: (alertId: string) => void;
  toggleFolder: (folderId: string) => void;
}

// Context creation
const PageManagerContext = createContext<PageManagerContextType | undefined>(undefined);

// Provider component
export const PageManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // UI State
  const [leftCollapsed, setLeftCollapsed] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Data State - Initialize with building consent related alerts
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'Consent Expiring Soon',
      message: 'Building consent BC-2024-0145 expires in 7 days - 45 Main Street',
      type: 'warning',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'Missing Documentation',
      message: 'Fire safety report required for BC-2024-0289 - Commercial Plaza',
      type: 'error',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '3',
      title: 'Consent Approved',
      message: 'Resource consent RC-2024-0367 approved for subdivision at Oak Drive',
      type: 'success',
      timestamp: new Date(Date.now() - 7200000),
      read: false,
    },
    {
      id: '4',
      title: 'Inspection Scheduled',
      message: 'Foundation inspection for 45 Main Street tomorrow at 10am',
      type: 'info',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'n1',
      type: 'update',
      title: 'Building Code Update',
      message: 'New earthquake resilience standards effective from February 1st',
      timestamp: new Date(),
      priority: 'high',
      source: 'Building Standards',
      read: false,
    },
    {
      id: 'n2',
      type: 'schedule',
      title: 'Council Meeting',
      message: 'Planning committee meeting Tuesday 2pm - Resource consent reviews',
      timestamp: new Date(Date.now() - 86400000),
      priority: 'medium',
      source: 'Planning Department',
      read: false,
    },
    {
      id: 'n3',
      type: 'announcement',
      title: 'Fee Schedule Change',
      message: 'Building consent fees updated for 2024. View new schedule online.',
      timestamp: new Date(Date.now() - 172800000),
      priority: 'low',
      source: 'Finance Department',
      read: true,
    },
    {
      id: 'n4',
      type: 'maintenance',
      title: 'Online Portal Upgrade',
      message: 'Consent portal will be offline Saturday 3am-5am for upgrades',
      timestamp: new Date(Date.now() - 259200000),
      priority: 'medium',
      source: 'IT Services',
      read: false,
    },
  ]);

  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>([
    {
      id: 's1',
      severity: 'critical',
      title: 'Non-Compliant Structure',
      description: 'Unauthorized building work detected at 23 River Road - immediate stop work notice issued',
      affectedSystems: ['Building Compliance', 'Enforcement'],
      timestamp: new Date(),
      status: 'investigating',
      assignedTo: 'Compliance Team',
      bcNumber: 'BC-2024-0523',
    },
    {
      id: 's2',
      severity: 'high',
      title: 'Heritage Zone Violation',
      description: 'Unpermitted alterations to listed heritage building at 15 Queen Street',
      affectedSystems: ['Heritage Protection', 'Planning'],
      timestamp: new Date(Date.now() - 3600000),
      status: 'new',
      assignedTo: 'Heritage Officer',
      bcNumber: 'HC-2024-0156',
    },
    {
      id: 's3',
      severity: 'medium',
      title: 'Expired Trade License',
      description: 'Electrical contractor working with expired license on Commercial Plaza project',
      affectedSystems: ['Contractor Licensing', 'Building Inspections'],
      timestamp: new Date(Date.now() - 7200000),
      status: 'investigating',
      assignedTo: 'Licensing Department',
      bcNumber: 'BC-2024-0412',
    },
    {
      id: 's4',
      severity: 'low',
      title: 'Document Access Issue',
      description: 'Restricted consent documents accessed by unauthorized staff member',
      affectedSystems: ['Document Management', 'Access Control'],
      timestamp: new Date(Date.now() - 86400000),
      status: 'resolved',
      assignedTo: 'IT Security',
      bcNumber: 'BC-2024-0387',
    },
  ]);

  const [tableFilter, setTableFilter] = useState<TableFilter | null>(null);

  // Recent activities - simulating changes since yesterday
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 'ra1',
      type: 'consent_approved',
      title: 'Building Consent Approved',
      description: 'BC-2024-0367 for Oak Drive subdivision has been approved by the planning committee',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      relatedItem: 'BC-2024-0367',
      user: 'Sarah Mitchell',
      icon: 'checkmark-filled',
      color: 'green'
    },
    {
      id: 'ra2',
      type: 'document_uploaded',
      title: 'New Documents Uploaded',
      description: '3 new structural plans uploaded for BC-2024-0412 - Commercial Plaza',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      relatedItem: 'BC-2024-0412',
      user: 'Mike Chen',
      icon: 'upload',
      color: 'blue'
    },
    {
      id: 'ra3',
      type: 'inspection_completed',
      title: 'Foundation Inspection Complete',
      description: 'Final foundation inspection passed for 45 Main Street development',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      relatedItem: 'BC-2024-0145',
      user: 'Tom Wilson',
      icon: 'search-locate',
      color: 'green'
    },
    {
      id: 'ra4',
      type: 'comment_added',
      title: 'New Comment on RC-2024-0289',
      description: 'Fire Chief added requirements for additional emergency access routes',
      timestamp: new Date(Date.now() - 28800000), // 8 hours ago
      relatedItem: 'RC-2024-0289',
      user: 'Fire Chief Roberts',
      icon: 'chat',
      color: 'orange'
    },
    {
      id: 'ra5',
      type: 'deadline_approaching',
      title: 'Consent Expiry Warning',
      description: 'BC-2024-0198 will expire in 3 days - Riverside Apartments',
      timestamp: new Date(Date.now() - 32400000), // 9 hours ago
      relatedItem: 'BC-2024-0198',
      icon: 'warning',
      color: 'yellow'
    },
    {
      id: 'ra6',
      type: 'status_changed',
      title: 'Status Updated to Under Review',
      description: 'Heritage building alteration permit HC-2024-0056 now under review',
      timestamp: new Date(Date.now() - 36000000), // 10 hours ago
      relatedItem: 'HC-2024-0056',
      user: 'Heritage Officer',
      icon: 'renew',
      color: 'purple'
    },
    {
      id: 'ra7',
      type: 'team_update',
      title: 'New Inspector Assigned',
      description: 'John Parker assigned as lead inspector for waterfront development project',
      timestamp: new Date(Date.now() - 43200000), // 12 hours ago
      user: 'Admin',
      icon: 'user-follow',
      color: 'blue'
    }
  ]);

  // Actions
  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const markAlertAsRead = (alertId: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, read: true } : alert
      )
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const resolveSecurityAlert = (alertId: string) => {
    setSecurityAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
      )
    );
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const value: PageManagerContextType = {
    // UI State
    leftCollapsed,
    setLeftCollapsed,
    expandedFolders,
    setExpandedFolders,
    selectedCategory,
    setSelectedCategory,
    
    // Data State
    alerts,
    setAlerts,
    notifications,
    setNotifications,
    securityAlerts,
    setSecurityAlerts,
    recentActivities,
    setRecentActivities,
    
    // Table State
    tableFilter,
    setTableFilter,
    
    // Actions
    dismissAlert,
    markAlertAsRead,
    markNotificationAsRead,
    resolveSecurityAlert,
    toggleFolder,
  };

  return (
    <PageManagerContext.Provider value={value}>
      {children}
    </PageManagerContext.Provider>
  );
};

// Hook to use the context
export const usePageManager = () => {
  const context = useContext(PageManagerContext);
  if (context === undefined) {
    throw new Error('usePageManager must be used within a PageManagerProvider');
  }
  return context;
};