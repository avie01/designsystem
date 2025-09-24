import React from 'react';
import Icon from '../../Icon/Icon';
import Table from '../../Table/Table';
import Chip from '../../Chip/Chip';
import Tabs from '../../Tabs/Tabs';
import Popover from '../../Popover/Popover';
import Button from '../../Button/Button';
import { governmentDocuments, getDocumentStats } from '../../../data/Building_constent_table';
import { usePageManager } from '../PageManagerContext';
import './DashboardLayout.css';

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
}

interface DashboardLayoutProps {
  stats?: StatCard[];
  onNavigate?: (path: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ stats, onNavigate }) => {
  const { securityAlerts, recentActivities } = usePageManager();
  const docStats = getDocumentStats();

  const defaultStats: StatCard[] = stats || [
    {
      title: 'Total Documents',
      value: docStats.total.toLocaleString(),
      icon: 'document',
      trend: { value: 12, isPositive: true },
      color: 'blue',
    },
    {
      title: 'In Progress',
      value: docStats.byStatus.find(s => s.status === 'In Progress')?.count || 0,
      icon: 'document-tasks',
      trend: { value: 5, isPositive: true },
      color: 'green',
    },
    {
      title: 'Under Review',
      value: docStats.byStatus.find(s => s.status === 'Under Review')?.count || 0,
      icon: 'view',
      trend: { value: 8, isPositive: false },
      color: 'orange',
    },
    {
      title: 'Inspections Today',
      value: '12',
      icon: 'checkmark-filled',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'dashboard-layout__stat-card--blue',
      green: 'dashboard-layout__stat-card--green',
      orange: 'dashboard-layout__stat-card--orange',
      red: 'dashboard-layout__stat-card--orange', // Reuse orange for red
      purple: 'dashboard-layout__stat-card--purple',
    };
    return colors[color] || colors.blue;
  };

  const getIconColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'dashboard-layout__stat-icon--blue',
      green: 'dashboard-layout__stat-icon--green',
      orange: 'dashboard-layout__stat-icon--orange',
      red: 'dashboard-layout__stat-icon--orange', // Reuse orange for red
      purple: 'dashboard-layout__stat-icon--purple',
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="dashboard-layout">
      {/* Stats Grid - Responsive 1024px optimized */}
      <div className="dashboard-layout__stats">
        <div className="dashboard-layout__stats-grid">
          {defaultStats.map((stat, index) => (
            <div
              key={index}
              className={`dashboard-layout__stat-card ${getColorClasses(stat.color)}`}
            >
              <div className="dashboard-layout__stat-header">
                <Icon 
                  name={stat.icon} 
                  className={`dashboard-layout__stat-icon ${getIconColorClasses(stat.color)}`}
                />
                {stat.trend && (
                  <div className={`dashboard-layout__stat-trend ${
                    stat.trend.isPositive ? 'dashboard-layout__stat-trend--positive' : 'dashboard-layout__stat-trend--negative'
                  }`}>
                    <Icon 
                      name={stat.trend.isPositive ? 'arrow-up' : 'arrow-down'} 
                      size={16}
                      style={{ marginRight: '4px' }}
                    />
                    <span>{stat.trend.value}%</span>
                  </div>
                )}
              </div>
              <h3 className="dashboard-layout__stat-value">{stat.value}</h3>
              <p className="dashboard-layout__stat-title">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main content area - ODL compliant */}
      <div className="dashboard-layout__main">
        <div className="dashboard-layout__content">
          {/* Activity Feed - Responsive 1024px optimized */}
          <div className="dashboard-layout__activity-grid">
            {/* Left column - Since you were here */}
            <div className="dashboard-layout__activity-card dashboard-layout__activity-left">
              <h3 className="dashboard-layout__section-title">
                <Icon name="time" className="dashboard-layout__section-title-icon" />
                Since you were here
              </h3>
          <div className="space-y-3">
            {recentActivities.slice(0, 5).map(activity => {
              const getIconColor = () => {
                switch(activity.color) {
                  case 'green': return 'text-green-600';
                  case 'blue': return 'text-blue-600';
                  case 'orange': return 'text-orange-600';
                  case 'yellow': return 'text-yellow-600';
                  case 'purple': return 'text-purple-600';
                  default: return 'text-gray-600';
                }
              };

              const formatTimeAgo = (date: Date) => {
                const now = new Date();
                const diff = now.getTime() - date.getTime();
                const hours = Math.floor(diff / 3600000);
                
                if (hours < 1) {
                  const minutes = Math.floor(diff / 60000);
                  return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
                } else if (hours < 24) {
                  return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
                } else {
                  const days = Math.floor(hours / 24);
                  return `${days} day${days !== 1 ? 's' : ''} ago`;
                }
              };

              return (
                <div 
                  key={activity.id} 
                  className="p-3  border border-gray-200 bg-white hover:bg-gray-100 hover:border-gray-300 hover:shadow-md cursor-pointer transition-all duration-200"
                  onClick={() => console.log('Activity clicked:', activity.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && console.log('Activity clicked:', activity.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <Icon 
                        name={activity.icon || 'information'}
                        className={`w-5 h-5 ${getIconColor()}`}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-900">{activity.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">
                          {formatTimeAgo(activity.timestamp)}
                        </span>
                        {activity.user && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">by {activity.user}</span>
                          </>
                        )}
                        {activity.relatedItem && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                              {activity.relatedItem}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {recentActivities.length > 5 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium group">
                View all {recentActivities.length} updates <span className="text-blue-600 group-hover:text-blue-700">→</span>
              </button>
            </div>
          )}
        </div>

            {/* Right column - Stacked cards */}
            <div className="dashboard-layout__activity-right" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--odl-spacing-4)' }}>
              {/* Your Day Card with Tabs */}
              <div className="dashboard-layout__activity-card">
              <Tabs
                tabs={[
                  {
                    id: 'your-day',
                    label: 'Your Day',
                    content: (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Today - {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                          <button className="text-xs text-blue-600 hover:text-blue-700">View full calendar →</button>
                        </div>
                        
                        {/* Today's Schedule */}
                        <ul className="space-y-2 list-none p-0 m-0 -mx-4">
                          <li>
                            <Popover
                              trigger={
                                <div className="flex items-start p-3 px-4 bg-blue-50 hover:bg-blue-100 cursor-pointer transition-all duration-200 w-full">
                                  <input type="checkbox" className="mt-1 mr-3" />
                                  <div className="flex-1 flex items-start justify-between">
                                    <div>
                                      <div className="font-medium text-sm text-gray-900">
                                        9:00 AM - Planning Review
                                      </div>
                                      <div className="text-xs text-gray-600 mt-0.5">
                                        BC-2024-0523 • With Sarah Mitchell
                                      </div>
                                    </div>
                                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded ml-auto">Meeting</span>
                                  </div>
                                </div>
                              }
                              content={
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Planning Review Meeting</h4>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex items-start">
                                      <Icon name="time" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Time</p>
                                        <p className="text-gray-600">9:00 AM - 10:00 AM</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="document" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Application</p>
                                        <p className="text-gray-600">BC-2024-0523 - Riverside Commercial Complex</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="user-multiple" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Attendees</p>
                                        <p className="text-gray-600">Sarah Mitchell, John Smith, Emily Chen</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="link" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Location</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-700">Join Teams Meeting</a>
                                      </div>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-gray-200">
                                      <p className="font-medium text-gray-700 mb-1">Agenda</p>
                                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                        <li>Review site plans</li>
                                        <li>Discuss environmental impact</li>
                                        <li>Address compliance concerns</li>
                                      </ul>
                                    </div>
                                    <div className="dashboard-layout__button-group">
                                      <Button variant="primary" size="small">View Application</Button>
                                      <Button variant="secondary" size="small">Reschedule</Button>
                                    </div>
                                  </div>
                                </div>
                              }
                            position="right"
                            align="start"
                          />
                          </li>
                          
                          <li>
                            <Popover
                            trigger={
                              <div className="flex items-start p-3 px-4 bg-green-50 hover:bg-green-100 cursor-pointer transition-all duration-200 w-full">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div className="flex-1 flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">
                                      11:00 AM - Site Inspection
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      Riverside Complex • 23 River Road, Auckland
                                    </div>
                                  </div>
                                  <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded ml-auto">Inspection</span>
                                </div>
                              </div>
                            }
                              content={
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Site Inspection</h4>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex items-start">
                                      <Icon name="time" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Time</p>
                                        <p className="text-gray-600">11:00 AM - 12:30 PM</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="location" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Address</p>
                                        <p className="text-gray-600">23 River Road, Auckland</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-700">Get directions</a>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="checkmark-outline" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Inspection Type</p>
                                        <p className="text-gray-600">Foundation & Structural</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="user" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Contact</p>
                                        <p className="text-gray-600">John Smith - 027 123 4567</p>
                                      </div>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-gray-200">
                                      <p className="font-medium text-gray-700 mb-1">Checklist</p>
                                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                        <li>Foundation depth verification</li>
                                        <li>Steel reinforcement placement</li>
                                        <li>Concrete quality assessment</li>
                                        <li>Drainage system check</li>
                                      </ul>
                                    </div>
                                    <div className="dashboard-layout__button-group">
                                      <Button variant="primary" size="small">Start Inspection</Button>
                                      <Button variant="secondary" size="small">View Checklist</Button>
                                    </div>
                                  </div>
                                </div>
                              }
                            position="right"
                            align="start"
                          />
                          </li>
                          
                          <li>
                            <Popover
                            trigger={
                              <div className="flex items-start p-3 px-4 bg-purple-50 hover:bg-purple-100 cursor-pointer transition-all duration-200 w-full">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div className="flex-1 flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">
                                      2:00 PM - Document Review
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      3 applications pending review
                                    </div>
                                  </div>
                                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-600 rounded ml-auto">Review</span>
                                </div>
                              </div>
                            }
                              content={
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Document Review Session</h4>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex items-start">
                                      <Icon name="time" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Time</p>
                                        <p className="text-gray-600">2:00 PM - 3:30 PM</p>
                                      </div>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-gray-200">
                                      <p className="font-medium text-gray-700 mb-2">Applications to Review</p>
                                      <div className="space-y-2">
                                        <div className="p-2 bg-gray-50 rounded">
                                          <p className="font-medium text-gray-800">BC-2024-0412</p>
                                          <p className="text-gray-600">Main Street Renovation</p>
                                          <p className="text-orange-600">Priority: High</p>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                          <p className="font-medium text-gray-800">BC-2024-0367</p>
                                          <p className="text-gray-600">Oak Drive Subdivision</p>
                                          <p className="text-red-600">Priority: Urgent</p>
                                        </div>
                                        <div className="p-2 bg-gray-50 rounded">
                                          <p className="font-medium text-gray-800">BC-2024-0289</p>
                                          <p className="text-gray-600">Warehouse Demolition</p>
                                          <p className="text-gray-600">Priority: Normal</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="dashboard-layout__button-group">
                                      <Button variant="primary" size="small">Start Review</Button>
                                      <Button variant="secondary" size="small">View All</Button>
                                    </div>
                                  </div>
                                </div>
                              }
                            position="right"
                            align="start"
                          />
                          </li>
                          
                          <li>
                            <Popover
                            trigger={
                              <div className="flex items-start p-3 px-4 bg-orange-50 hover:bg-orange-100 cursor-pointer transition-all duration-200 w-full">
                                <input type="checkbox" className="mt-1 mr-3" />
                                <div className="flex-1 flex items-start justify-between">
                                  <div>
                                    <div className="font-medium text-sm text-gray-900">
                                      4:00 PM - Final Inspection
                                    </div>
                                    <div className="text-xs text-gray-600 mt-0.5">
                                      Main Street Renovation • 45 Main Street, Wellington
                                    </div>
                                  </div>
                                  <span className="text-xs px-2 py-1 bg-orange-100 text-orange-600 rounded ml-auto">Inspection</span>
                                </div>
                              </div>
                            }
                              content={
                                <div>
                                  <h4 className="font-semibold text-sm text-gray-900 mb-2">Final Inspection</h4>
                                  <div className="space-y-2 text-xs">
                                    <div className="flex items-start">
                                      <Icon name="time" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Time</p>
                                        <p className="text-gray-600">4:00 PM - 5:00 PM</p>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="location" className="w-4 h-4 text-gray-400 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Address</p>
                                        <p className="text-gray-600">45 Main Street, Wellington</p>
                                        <a href="#" className="text-blue-600 hover:text-blue-700">Get directions</a>
                                      </div>
                                    </div>
                                    <div className="flex items-start">
                                      <Icon name="warning" className="w-4 h-4 text-orange-500 mr-2 mt-0.5" />
                                      <div>
                                        <p className="font-medium text-gray-700">Status</p>
                                        <p className="text-orange-600">Previous issues to verify</p>
                                      </div>
                                    </div>
                                    <div className="pt-2 mt-2 border-t border-gray-200">
                                      <p className="font-medium text-gray-700 mb-1">Previous Issues</p>
                                      <ul className="list-disc list-inside text-gray-600 space-y-0.5">
                                        <li>Fire exit signage incomplete</li>
                                        <li>Handrail height non-compliant</li>
                                        <li>Emergency lighting not tested</li>
                                      </ul>
                                    </div>
                                    <div className="pt-2">
                                      <p className="font-medium text-gray-700 mb-1">Notes</p>
                                      <p className="text-gray-600">Contractor confirmed all issues have been addressed. Verify compliance before issuing certificate.</p>
                                    </div>
                                    <div className="dashboard-layout__button-group">
                                      <Button variant="primary" size="small">View History</Button>
                                      <Button variant="secondary" size="small">Previous Report</Button>
                                    </div>
                                  </div>
                                </div>
                              }
                                      position="right"
                            align="start"
                          />
                          </li>
                        </ul>
                        
                        {/* Tomorrow Preview */}
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600 mb-2">Tomorrow: 2 meetings, 1 inspection</p>
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View tomorrow's schedule →</button>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: 'week',
                    label: 'This Week',
                    content: (
                      <div className="py-4">
                        <div className="text-center text-gray-500">
                          <Icon name="calendar" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-sm">Week view coming soon</p>
                          <p className="text-xs mt-2">See all your upcoming events for the week</p>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: 'tasks',
                    label: 'Tasks',
                    content: (
                      <div className="py-4">
                        <div className="space-y-2">
                          <div className="p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <div className="flex items-start">
                              <input type="checkbox" className="mt-1 mr-2" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Review BC-2024-0523 documentation</p>
                                <p className="text-xs text-gray-600">Due today at 5:00 PM</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                            <div className="flex items-start">
                              <input type="checkbox" className="mt-1 mr-2" />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">Complete site inspection report</p>
                                <p className="text-xs text-gray-600">Due tomorrow</p>
                              </div>
                            </div>
                          </div>
                          <div className="p-2 bg-gray-50 border border-gray-200 rounded">
                            <div className="flex items-start">
                              <input type="checkbox" className="mt-1 mr-2" checked />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 line-through">Submit compliance review</p>
                                <p className="text-xs text-gray-600">Completed</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                          <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">View all tasks →</button>
                        </div>
                      </div>
                    )
                  },
                  {
                    id: 'compliance',
                    label: 'Compliance',
                    content: (
                      <div>
                        <ul className="space-y-2 list-none p-0 m-0 -mx-4">
                          {securityAlerts.slice(0, 5).map(alert => (
                            <li key={alert.id}>
                              <div 
                                className={`p-2 px-4 cursor-pointer transition-all duration-200 ${
                                  alert.severity === 'critical' ? 'bg-red-50 hover:bg-red-100' :
                                  alert.severity === 'high' ? 'bg-orange-50 hover:bg-orange-100' :
                                  alert.severity === 'medium' ? 'bg-yellow-50 hover:bg-yellow-100' :
                                  'bg-gray-50 hover:bg-gray-100'
                                }`}
                                onClick={() => console.log('Security alert clicked:', alert.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === 'Enter' && console.log('Security alert clicked:', alert.id)}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex items-start flex-1 min-w-0">
                                    <input type="checkbox" className="mt-1 mr-3" />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <div>
                                          <h4 className="font-medium text-sm text-gray-900">{alert.title}</h4>
                                          <p className="text-xs text-gray-600 mt-0.5">{alert.description}</p>
                                          {alert.bcNumber && (
                                            <span className="text-xs font-semibold text-blue-600">{alert.bcNumber}</span>
                                          )}
                                        </div>
                                        <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
                                          alert.status === 'resolved' ? 'bg-green-100 text-green-700' :
                                          alert.status === 'investigating' ? 'bg-orange-100 text-orange-700' :
                                          'bg-red-100 text-red-700'
                                        }`}>
                                          {alert.status}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {securityAlerts.length > 5 && (
                          <div className="mt-3 pt-2 border-t border-gray-200">
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium group">
                              View all {securityAlerts.length} compliance alerts <span className="text-blue-600 group-hover:text-blue-700">→</span>
                            </button>
                          </div>
                        )}
                      </div>
                    )
                  }
                ]}
                variant="default"
              />
              </div>
            </div>
          </div>

          {/* Recent Documents Table - Responsive 1024px optimized */}
          <div className="dashboard-layout__table-container">
            <div className="dashboard-layout__table-header">
              <h3 className="dashboard-layout__section-title">
                <Icon name="document" className="dashboard-layout__section-title-icon" />
                Recent Documents
              </h3>
            </div>
            <div className="dashboard-layout__table-content">
              <Table
          data={governmentDocuments}
          columns={[
            {
              key: 'title',
              header: 'Document Title',
              render: (item: typeof governmentDocuments[0]) => (
                <div>
                  <div 
                    style={{ 
                      fontWeight: 500, 
                      color: 'rgb(53, 96, 193)', 
                      textDecoration: 'underline transparent', 
                      transition: 'text-decoration-color 0.2s',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      if (onNavigate) {
                        onNavigate('/editing');
                      }
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.textDecorationColor = 'rgb(53, 96, 193)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.textDecorationColor = 'transparent' }}
                  >
                    {item.title}
                  </div>
                  <div className="text-xs text-gray-500">{item.agency} • {item.department}</div>
                </div>
              ),
            },
            {
              key: 'classification',
              header: 'Classification',
              render: (item: typeof governmentDocuments[0]) => {
                const getClassificationColor = (classification: string): 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' => {
                  switch (classification) {
                    case 'TOP SECRET':
                      return 'error';
                    case 'SECRET':
                      return 'warning';
                    case 'CONFIDENTIAL':
                      return 'info';
                    case 'RESTRICTED':
                      return 'warning';
                    default:
                      return 'secondary';
                  }
                };
                
                return (
                  <Chip
                    label={item.classification}
                    variant={getClassificationColor(item.classification)}
                    size="small"
                  />
                );
              },
            },
            {
              key: 'status',
              header: 'Status',
              render: (item: typeof governmentDocuments[0]) => {
                const getStatusColor = (status: string) => {
                  switch (status) {
                    case 'Active':
                      return 'text-green-600 bg-green-50';
                    case 'Under Review':
                      return 'text-orange-600 bg-orange-50';
                    case 'Archived':
                      return 'text-gray-600 bg-gray-50';
                    case 'Pending Approval':
                      return 'text-blue-600 bg-blue-50';
                    default:
                      return 'text-gray-600 bg-gray-50';
                  }
                };
                
                return (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                );
              },
            },
            {
              key: 'lastModified',
              header: 'Last Modified',
              render: (item: typeof governmentDocuments[0]) => (
                <span className="text-sm text-gray-600">
                  {new Date(item.lastModified).toLocaleDateString()}
                </span>
              ),
            },
          ]}
          hoverable
          striped
              aria-label="Recent government documents"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;