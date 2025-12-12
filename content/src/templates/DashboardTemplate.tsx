import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import './DashboardTemplate.css';

// SimpleTabs component from TabsDemo
interface SimpleTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: string;
    content: React.ReactNode;
  }>;
  defaultTab?: string;
  variant?: 'default' | 'compact';
}

const SimpleTabs: React.FC<SimpleTabsProps> = ({ tabs, defaultTab, variant = 'default' }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  return (
    <div className="simple-tabs">
      <div className="simple-tabs__list">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`simple-tabs__tab ${
              variant === 'compact' ? 'simple-tabs__tab--compact' : ''
            } ${
              activeTab === tab.id ? 'simple-tabs__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveTab(tab.id);
              }
            }}
            aria-selected={activeTab === tab.id}
            role="tab"
            tabIndex={0}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            {tab.label}
            {activeTab === tab.id && <div className="simple-tabs__tab-indicator" />}
          </button>
        ))}
      </div>
      <div className="simple-tabs__panel" role="tabpanel">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// MetricCard component
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  color?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  color = '#0f62fe'
}) => {
  const getIconContainerClass = () => {
    if (changeType === 'positive') return 'metric-card__icon-container--success';
    if (changeType === 'negative') return 'metric-card__icon-container--error';
    return 'metric-card__icon-container--primary';
  };

  const getIconColor = () => {
    if (changeType === 'positive') return '#24a148';
    if (changeType === 'negative') return '#da1e28';
    return color;
  };

  return (
    <div className="metric-card">
      <div className="metric-card__header">
        <h3 className="metric-card__title">{title}</h3>
        {icon && (
          <div className={`metric-card__icon-container ${getIconContainerClass()}`}>
            <Icon name={icon} size={20} color={getIconColor()} />
          </div>
        )}
      </div>
      <div className="metric-card__value">{value}</div>
      {change && (
        <div className={`metric-card__change metric-card__change--${changeType}`}>
          {changeType === 'positive' && <Icon name="trending-up" size={16} />}
          {changeType === 'negative' && <Icon name="trending-down" size={16} />}
          {change}
        </div>
      )}
    </div>
  );
};

// DataTable component
interface DataTableProps {
  columns: Array<{
    key: string;
    label: string;
    sortable?: boolean;
  }>;
  data: Array<Record<string, any>>;
  onRowClick?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onRowClick }) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table className="data-table">
      <thead className="data-table__thead">
        <tr>
          {columns.map(col => (
            <th 
              key={col.key} 
              className={`data-table__th ${
                col.sortable ? 'data-table__th--sortable' : ''
              }`}
              onClick={() => col.sortable && handleSort(col.key)}
              onKeyDown={(e) => {
                if (col.sortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSort(col.key);
                }
              }}
              tabIndex={col.sortable ? 0 : -1}
              aria-sort={
                col.sortable && sortKey === col.key 
                  ? sortOrder === 'asc' ? 'ascending' : 'descending'
                  : 'none'
              }
            >
              {col.label}
              {col.sortable && sortKey === col.key && (
                <span className="data-table__sort-icon">
                  <Icon name={sortOrder === 'asc' ? 'chevron-up' : 'chevron-down'} size={12} />
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr 
            key={idx} 
            className={`data-table__tr ${
              onRowClick ? 'data-table__tr--clickable' : ''
            }`}
            onClick={() => onRowClick?.(row)}
            onKeyDown={(e) => {
              if (onRowClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onRowClick(row);
              }
            }}
            tabIndex={onRowClick ? 0 : -1}
            role={onRowClick ? 'button' : undefined}
            aria-label={onRowClick ? `View details for ${Object.values(row)[0]}` : undefined}
          >
            {columns.map(col => (
              <td key={col.key} className="data-table__td">
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Main Dashboard Template - standalone dashboard layout with metrics and activity
const DashboardTemplate: React.FC = () => {

  // Sample data
  const metrics = [
    { title: 'Total Revenue', value: '$45,231', change: '+12.5% from last month', changeType: 'positive' as const, icon: 'money', color: '#24a148' },
    { title: 'Active Users', value: '2,431', change: '+5.4% from last week', changeType: 'positive' as const, icon: 'user', color: '#0f62fe' },
    { title: 'Conversion Rate', value: '3.42%', change: '-0.8% from last month', changeType: 'negative' as const, icon: 'analytics', color: '#8a3ffc' },
    { title: 'Support Tickets', value: '43', change: '12 pending response', changeType: 'neutral' as const, icon: 'help', color: '#fa4d56' }
  ];

  const recentActivity = [
    { id: 1, user: 'John Smith', action: 'Created new project', time: '2 hours ago', status: 'Completed' },
    { id: 2, user: 'Sarah Johnson', action: 'Updated dashboard', time: '4 hours ago', status: 'In Progress' },
    { id: 3, user: 'Mike Chen', action: 'Submitted report', time: '6 hours ago', status: 'Pending' },
    { id: 4, user: 'Emma Wilson', action: 'Approved budget', time: '1 day ago', status: 'Completed' },
    { id: 5, user: 'David Brown', action: 'Scheduled meeting', time: '2 days ago', status: 'Scheduled' }
  ];

  const topPerformers = [
    { id: 1, name: 'Product A', sales: 1234, revenue: '$12,345', growth: '+15%' },
    { id: 2, name: 'Product B', sales: 987, revenue: '$9,876', growth: '+8%' },
    { id: 3, name: 'Product C', sales: 756, revenue: '$7,560', growth: '+22%' },
    { id: 4, name: 'Product D', sales: 543, revenue: '$5,432', growth: '-3%' },
    { id: 5, name: 'Product E', sales: 321, revenue: '$3,210', growth: '+5%' }
  ];

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: 'dashboard',
      content: (
        <DataTable
          columns={[
            { key: 'user', label: 'User', sortable: true },
            { key: 'action', label: 'Action', sortable: false },
            { key: 'time', label: 'Time', sortable: true },
            { key: 'status', label: 'Status', sortable: true }
          ]}
          data={recentActivity}
        />
      )
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: 'chart-line',
      content: (
        <DataTable
          columns={[
            { key: 'name', label: 'Product', sortable: true },
            { key: 'sales', label: 'Sales', sortable: true },
            { key: 'revenue', label: 'Revenue', sortable: true },
            { key: 'growth', label: 'Growth', sortable: true }
          ]}
          data={topPerformers}
        />
      )
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'document',
      content: (
        <div className="empty-state">
          <div className="empty-state__icon">
            <Icon name="document" size={48} color="var(--odl-border)" />
          </div>
          <h3 className="empty-state__title">No reports available</h3>
          <p className="empty-state__description">Reports will appear here once generated</p>
        </div>
      )
    }
  ];

  return (
    <div className="dashboard-template">
        <div className="dashboard-template__metrics-grid">
          {metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>

        <div className="dashboard-template__main-content">
          <SimpleTabs tabs={tabs} defaultTab="overview" />
        </div>
    </div>
  );
};

export default DashboardTemplate;