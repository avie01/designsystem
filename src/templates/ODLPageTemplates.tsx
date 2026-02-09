import React, { useState, useRef, useEffect } from 'react';
import ODLTheme from '../styles/ODLTheme';

// ODL Components
import A4Editor from '../components/A4Editor/A4Editor';
import Button from '../components/Button/ButtonTW';
// Import Button with icon support for BulkActionsBar
import ButtonComponent from '../components/Button/Button';
import Input from '../components/Input/Input';
import Dropdown from '../components/Dropdown/Dropdown';
import AdvancedTable, { TableColumn } from '../components/AdvancedTable/AdvancedTable';
import AdaptiveList, { ViewType } from '../components/AdaptiveList/AdaptiveList';
import Cards from '../components/CardComponents/Cards/CardsTW';
import Chip from '../components/Chip/ChipTW';
import Breadcrumb from '../components/Breadcrumb/BreadcrumbTW';
import SimpleTabs from '../components/SimpleTabs/SimpleTabs';
import Icon from '../components/Icon/Icon';
import Graph from '../components/Graph/Graph';
import AlertBanner from '../components/AlertBanner/AlertBanner';
import Accordion from '../components/Accordion/Accordion';
import NavigationRail from '../components/NavigationRail/NavigationRail';
import Header from '../components/Header/Header';
import Drawer from '../components/Drawer/Drawer';
import IconButton from '../components/IconButton/IconButton';
import Checkbox from '../components/Checkbox/Checkbox';
import PopupMenu, { PopupMenuItem } from '../components/PopupMenu/PopupMenu';
import UserAvatar from '../components/UserAvatar/UserAvatar';
import { useTheme } from '../../.storybook/theme-decorator';
import oiIcon from '../assets/oi.svg';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

/**
 * PURE ODL PAGE TEMPLATES
 * Templates built exclusively with ODL Design System components
 * No MUI dependencies - showcases native ODL component library
 */

// ============================================
// INLINE PANEL COMPONENT - For RightPanel pattern
// ============================================
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
        borderRight: `1px solid ${colors.default}`,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.2s ease-in-out',
      }}
    >
      {title && (
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
      )}
      <div style={{ flex: 1, overflow: title ? 'auto' : 'hidden' }}>
        {children}
      </div>
    </div>
  );
};

// ============================================
// AI ICON COMPONENT
// ============================================
const AIIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <img src={oiIcon} alt="Objective Intelligence" width={size} height={size} style={{ borderRadius: '4px' }} />
);

// ============================================
// AI CHAT MESSAGE INTERFACE
// ============================================
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// ============================================
// AI CHAT COMPONENT
// ============================================
interface AIChatPanelProps {
  onClose?: () => void;
}

const AIChatPanel: React.FC<AIChatPanelProps> = ({ onClose }) => {
  const { colors } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `That's a great question about "${userMessage}". Let me help you with that. This is a simulated response demonstrating the AI chat functionality.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    simulateAIResponse(inputValue.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          borderBottom: `1px solid ${colors.grey300}`,
          backgroundColor: colors.paper,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AIIcon size={36} />
          </div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Objective Intelligence</h3>
        </div>
        {onClose && (
          <IconButton icon="close" variant="ghost" size="small" onClick={onClose} aria-label="Close chat" />
        )}
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: 'flex',
              flexDirection: message.role === 'user' ? 'row-reverse' : 'row',
              gap: '12px',
              alignItems: 'flex-start',
            }}
          >
            {message.role === 'user' ? (
              <div style={{ flexShrink: 0 }}>
                <UserAvatar size="lg" user={{ name: 'User' }} showPopup={false} />
              </div>
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <AIIcon size={32} />
              </div>
            )}
            <div
              style={{
                maxWidth: '75%',
                padding: message.role === 'user' ? '12px 16px' : '0 16px 12px 0',
                borderRadius: message.role === 'user' ? '0px' : undefined,
                backgroundColor: message.role === 'user' ? colors.grey300 : undefined,
                borderLeft: message.role === 'user' ? `4px solid ${colors.grey500}` : undefined,
                color: colors.textPrimary,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span
                  style={{
                    color: colors.primaryNight,
                    fontFamily: 'var(--font-family-noto)',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '21px',
                  }}
                >
                  {message.role === 'user' ? 'User' : 'Objective Intelligence'}
                </span>
                <span
                  style={{
                    color: colors.grey700,
                    fontFamily: 'var(--font-family-noto)',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '21px',
                  }}
                >
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-family-noto)' }}>{message.content}</p>
              {message.role === 'assistant' && (
                <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                  <IconButton icon="copy" variant="ghost" size="small" aria-label="Copy response" title="Copy" />
                  <IconButton icon="restart" variant="ghost" size="small" aria-label="Regenerate response" title="Regenerate" />
                  <IconButton icon="thumbs-up" variant="ghost" size="small" aria-label="Good response" title="Good response" />
                  <IconButton icon="thumbs-down" variant="ghost" size="small" aria-label="Bad response" title="Bad response" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <AIIcon size={32} />
            </div>
            <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', backgroundColor: colors.grey100 }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textSecondary, animation: 'typing-dot 1.4s infinite ease-in-out' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textSecondary, animation: 'typing-dot 1.4s infinite ease-in-out', animationDelay: '0.2s' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textSecondary, animation: 'typing-dot 1.4s infinite ease-in-out', animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 16px',
          gap: '4px',
          alignSelf: 'stretch',
          borderTop: `1px solid ${colors.default}`,
        }}
        onKeyDown={handleKeyDown}
      >
        <Input
          value={inputValue}
          onChange={setInputValue}
          placeholder="Ask a question..."
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <IconButton
            icon="add"
            variant="ghost"
            aria-label="Add attachment"
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconButton
              icon="microphone"
              variant="ghost"
              aria-label="Voice input"
            />
            <IconButton
              icon="send"
              variant={inputValue.trim() && !isTyping ? 'primary' : 'disabled'}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.6; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

// ============================================
// APP SHELL WRAPPER - Reusable layout component
// ============================================
interface AppShellWrapperProps {
  children: React.ReactNode;
  currentPage?: string;
  pageTitle?: string;
  pageSubtitle?: string;
  showBreadcrumb?: boolean;
  showLeftPanel?: boolean;
  showRightPanel?: boolean;
  breadcrumbItems?: Array<{ label: string; path?: string }>;
  headerVariant?: 'build' | 'connect' | 'keystone' | 'nexus' | 'regworks' | '3sixty' | 'keyplan' | 'trapeze';
}

export const ODLAppShellWrapper: React.FC<AppShellWrapperProps> = ({
  children,
  currentPage = '/dashboard',
  pageTitle,
  pageSubtitle,
  showBreadcrumb = true,
  showLeftPanel = false,
  showRightPanel = true,
  breadcrumbItems,
  headerVariant = 'build',
}) => {
  const [currentPath, setCurrentPath] = useState(currentPage);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [openRightPanel, setOpenRightPanel] = useState<string | null>(null);

  // Left navigation menu items - main navigation
  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'projects', label: 'Projects', iconName: 'folder', path: '/projects', description: 'Manage projects' },
    { id: 'tasks', label: 'Tasks', iconName: 'calendar', path: '/tasks', description: 'View tasks' },
    { id: 'team', label: 'Team', iconName: 'user-multiple', path: '/team', description: 'Manage team' },
    { id: 'reports', label: 'Reports', iconName: 'chart-line', path: '/reports', description: 'View reports' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  // Right navigation menu items - contextual tools
  const rightMenuItems = [
    { id: 'ai-chat', label: 'Objective Intelligence', iconName: 'chat', path: '/ai-chat', description: 'Ask AI' },
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'profile', label: 'Profile', iconName: 'user', path: '/profile', description: 'Your profile' },
    { id: 'search', label: 'Search', iconName: 'search', path: '/search', description: 'Search content' },
    { id: 'filters', label: 'Filters', iconName: 'filter', path: '/filters', description: 'Apply filters' },
  ];

  // Right panel content based on selected item
  const rightPanelContent: Record<string, { title: string; content: React.ReactNode }> = {
    'ai-chat': {
      title: 'Objective Intelligence',
      content: <AIChatPanel onClose={() => setOpenRightPanel(null)} />,
    },
    notifications: {
      title: 'Notifications',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'New comment', desc: 'Sarah commented on your document', time: '5m ago' },
              { title: 'Task completed', desc: 'Project milestone achieved', time: '1h ago' },
              { title: 'System update', desc: 'New features available', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    profile: {
      title: 'Profile',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: ODLTheme.colors.primary, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 600 }}>JD</div>
            <h3 style={{ margin: '0 0 4px 0' }}>John Doe</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>john.doe@example.com</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Edit Profile</button>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Account Settings</button>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Sign Out</button>
          </div>
        </div>
      ),
    },
    search: {
      title: 'Search',
      content: (
        <div style={{ padding: '16px' }}>
          <input type="text" placeholder="Search..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '16px' }} />
          <div style={{ fontWeight: 500, marginBottom: '8px' }}>Recent Searches</div>
          <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#666' }}>
            <li>Project documents</li>
            <li>Team members</li>
            <li>Task reports</li>
          </ul>
        </div>
      ),
    },
    filters: {
      title: 'Filters',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Active</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Pending</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Completed</label>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Date Range</div>
            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>
      ),
    },
  };

  const getActiveLabel = () => {
    const item = leftMenuItems.find(m => m.path === currentPath);
    return item?.label || 'Dashboard';
  };

  const defaultBreadcrumb = [
    { label: 'Home', path: '/' },
    { label: getActiveLabel() },
  ];

  const handleRightNavigate = (path: string) => {
    const itemId = path.replace('/', '');
    if (openRightPanel === itemId) {
      setOpenRightPanel(null);
    } else {
      setOpenRightPanel(itemId);
    }
  };

  const currentPanelContent = openRightPanel ? rightPanelContent[openRightPanel] : null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white
    }}>
      {/* Header */}
      <Header variant={headerVariant} userName="John Doe" />

      {/* Main Layout with Navigation Rails */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{
          height: '100%',
          borderRight: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
          />
        </div>

        {/* Left Panel */}
        {showLeftPanel && (
          <div style={{
            width: '320px',
            height: '100%',
            borderRight: `1px solid ${ODLTheme.colors.border}`,
            backgroundColor: ODLTheme.colors.white,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              borderBottom: `1px solid ${ODLTheme.colors.border}`,
            }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: ODLTheme.colors.text.primary }}>
                {getActiveLabel()}
              </h2>
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
              <p style={{ margin: '0 0 12px 0', color: ODLTheme.colors.text.secondary }}>
                Select an item from the navigation to view details.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 500, color: ODLTheme.colors.text.primary }}>Item 1</div>
                  <div style={{ fontSize: '14px', color: ODLTheme.colors.text.secondary }}>Description for item 1</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 500, color: ODLTheme.colors.text.primary }}>Item 2</div>
                  <div style={{ fontSize: '14px', color: ODLTheme.colors.text.secondary }}>Description for item 2</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 500, color: ODLTheme.colors.text.primary }}>Item 3</div>
                  <div style={{ fontSize: '14px', color: ODLTheme.colors.text.secondary }}>Description for item 3</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: ODLTheme.spacing[6],
          background: ODLTheme.colors.white
        }}>
          {showBreadcrumb && (
            <Breadcrumb items={breadcrumbItems || defaultBreadcrumb} />
          )}

          {pageTitle && (
            <h1 style={{
              fontSize: ODLTheme.typography.fontSize['2xl'],
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: ODLTheme.colors.text.primary,
              margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
            }}>
              {pageTitle}
            </h1>
          )}

          {pageSubtitle && (
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.secondary,
              margin: `0 0 ${ODLTheme.spacing[6]} 0`
            }}>
              {pageSubtitle}
            </p>
          )}

          {/* Grey Outer Frame / White Inner Container Pattern */}
          <div style={{
            background: '#EDF1F5',
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            minHeight: '400px'
          }}>
            <div style={{
              background: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[6]
            }}>
              {children}
            </div>
          </div>
        </div>

        {/* Right Panel - InlinePanel + NavigationRail */}
        {showRightPanel && (
          <div style={{ display: 'flex', height: '100%' }}>
            {currentPanelContent && (
              <InlinePanel
                isOpen={!!openRightPanel}
                onClose={() => setOpenRightPanel(null)}
                title={openRightPanel === 'ai-chat' ? '' : currentPanelContent.title}
                width={openRightPanel === 'ai-chat' ? '380px' : '320px'}
              >
                {currentPanelContent.content}
              </InlinePanel>
            )}

            <NavigationRail
              menuItems={rightMenuItems}
              currentPath={openRightPanel ? `/${openRightPanel}` : ''}
              onNavigate={handleRightNavigate}
              collapsed={true}
              position="right"
              theme="light"
              showTooltips={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// DASHBOARD CONTENT (for use inside App Shell)
// ============================================
const DashboardContent: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' as const },
    { label: 'Active Projects', value: '56', change: '+5%', trend: 'up' as const },
    { label: 'Pending Tasks', value: '89', change: '-3%', trend: 'down' as const },
    { label: 'Revenue', value: '$12.5K', change: '+18%', trend: 'up' as const },
  ];

  const chartData = [
    { name: 'Jan', value: 400, target: 350 },
    { name: 'Feb', value: 300, target: 380 },
    { name: 'Mar', value: 500, target: 400 },
    { name: 'Apr', value: 450, target: 420 },
    { name: 'May', value: 600, target: 450 },
    { name: 'Jun', value: 550, target: 480 },
  ];

  const recentActivity = [
    { id: '1', title: 'New user registered', description: 'John Smith joined the platform', time: '2 min ago' },
    { id: '2', title: 'Project completed', description: 'Marketing Campaign Q1 finished', time: '1 hour ago' },
    { id: '3', title: 'Task assigned', description: 'Review design mockups', time: '3 hours ago' },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[4],
              boxShadow: ODLTheme.shadows.sm,
              border: `1px solid ${ODLTheme.colors.border}`,
            }}
          >
            <p style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {stat.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: ODLTheme.spacing[3] }}>
              <span style={{
                fontSize: ODLTheme.typography.fontSize['xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                color: ODLTheme.colors.text.primary
              }}>
                {stat.value}
              </span>
              <Chip
                label={stat.change}
                variant={stat.trend === 'up' ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[4],
          boxShadow: ODLTheme.shadows.sm,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.base,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Performance Overview
          </h3>
          <Graph
            type="area"
            data={chartData}
            dataKeys={['value', 'target']}
            xAxisKey="name"
            height={200}
          />
        </div>

        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[4],
          boxShadow: ODLTheme.shadows.sm,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.base,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Monthly Comparison
          </h3>
          <Graph
            type="bar"
            data={chartData}
            dataKeys={['value']}
            xAxisKey="name"
            height={200}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[4],
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
      }}>
        <h3 style={{
          fontSize: ODLTheme.typography.fontSize.base,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          marginBottom: ODLTheme.spacing[4]
        }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentActivity.map(item => (
            <Cards
              key={item.id}
              variant="outlined"
              title={item.title}
              subtitle={item.description}
              footer={<span style={{ fontSize: '12px', color: '#6b7280' }}>{item.time}</span>}
            />
          ))}
        </div>
      </div>
    </>
  );
};

// ============================================
// DASHBOARD TEMPLATE (Wrapped in App Shell)
// ============================================
export const ODLDashboardTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Dashboard"
      pageSubtitle="Welcome back! Here's what's happening with your projects."
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Dashboard' },
      ]}
    >
      <DashboardContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// STANDALONE DASHBOARD (without App Shell - for backwards compatibility)
// ============================================
export const ODLDashboardStandalone: React.FC = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' as const },
    { label: 'Active Projects', value: '56', change: '+5%', trend: 'up' as const },
    { label: 'Pending Tasks', value: '89', change: '-3%', trend: 'down' as const },
    { label: 'Revenue', value: '$12.5K', change: '+18%', trend: 'up' as const },
  ];

  const chartData = [
    { name: 'Jan', value: 400, target: 350 },
    { name: 'Feb', value: 300, target: 380 },
    { name: 'Mar', value: 500, target: 400 },
    { name: 'Apr', value: 450, target: 420 },
    { name: 'May', value: 600, target: 450 },
    { name: 'Jun', value: 550, target: 480 },
  ];

  const recentActivity = [
    { id: '1', title: 'New user registered', description: 'John Smith joined the platform', time: '2 min ago' },
    { id: '2', title: 'Project completed', description: 'Marketing Campaign Q1 finished', time: '1 hour ago' },
    { id: '3', title: 'Task assigned', description: 'Review design mockups', time: '3 hours ago' },
  ];

  return (
    <div style={{ padding: ODLTheme.spacing[6], backgroundColor: ODLTheme.colors.wave, minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: ODLTheme.spacing[6] }}>
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Dashboard' },
          ]}
        />
        <h1 style={{
          fontSize: ODLTheme.typography.fontSize['2xl'],
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.text.primary,
          marginTop: ODLTheme.spacing[4],
          marginBottom: ODLTheme.spacing[2]
        }}>
          Dashboard
        </h1>
        <p style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.base }}>
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[5],
              boxShadow: ODLTheme.shadows.base,
              border: `1px solid ${ODLTheme.colors.border}`,
              transition: ODLTheme.transitions.base,
            }}
          >
            <p style={{
              fontSize: ODLTheme.typography.fontSize.sm,
              color: ODLTheme.colors.text.secondary,
              marginBottom: ODLTheme.spacing[2]
            }}>
              {stat.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: ODLTheme.spacing[3] }}>
              <span style={{
                fontSize: ODLTheme.typography.fontSize['2xl'],
                fontWeight: ODLTheme.typography.fontWeight.bold,
                color: ODLTheme.colors.text.primary
              }}>
                {stat.value}
              </span>
              <Chip
                label={stat.change}
                variant={stat.trend === 'up' ? 'success' : 'error'}
                size="small"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: ODLTheme.spacing[4],
        marginBottom: ODLTheme.spacing[6]
      }}>
        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[5],
          boxShadow: ODLTheme.shadows.base,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Performance Overview
          </h3>
          <Graph
            type="area"
            data={chartData}
            dataKeys={['value', 'target']}
            xAxisKey="name"
            height={250}
          />
        </div>

        <div style={{
          backgroundColor: ODLTheme.colors.white,
          borderRadius: ODLTheme.borders.radius.md,
          padding: ODLTheme.spacing[5],
          boxShadow: ODLTheme.shadows.base,
          border: `1px solid ${ODLTheme.colors.border}`,
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: ODLTheme.spacing[4]
          }}>
            Monthly Comparison
          </h3>
          <Graph
            type="bar"
            data={chartData}
            dataKeys={['value']}
            xAxisKey="name"
            height={250}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        padding: ODLTheme.spacing[5],
        boxShadow: ODLTheme.shadows.base,
        border: `1px solid ${ODLTheme.colors.border}`,
      }}>
        <h3 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          marginBottom: ODLTheme.spacing[4]
        }}>
          Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentActivity.map(item => (
            <Cards
              key={item.id}
              variant="outlined"
              title={item.title}
              subtitle={item.description}
              footer={<span style={{ fontSize: '12px', color: '#6b7280' }}>{item.time}</span>}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// TABLE LIST TEMPLATE
// ============================================
interface Employee {
  [key: string]: string | number;
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
}

const TableContent: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Employee[]>([]);

  const employeeData: Employee[] = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', department: 'Engineering', role: 'Senior Developer', status: 'active', joinDate: '2023-01-15' },
    { id: '2', name: 'Michael Chen', email: 'michael@example.com', department: 'Design', role: 'UI/UX Designer', status: 'active', joinDate: '2023-03-22' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily@example.com', department: 'Marketing', role: 'Marketing Manager', status: 'pending', joinDate: '2024-01-08' },
    { id: '4', name: 'David Kim', email: 'david@example.com', department: 'Engineering', role: 'Developer', status: 'active', joinDate: '2023-06-10' },
    { id: '5', name: 'Lisa Thompson', email: 'lisa@example.com', department: 'HR', role: 'HR Specialist', status: 'inactive', joinDate: '2022-11-20' },
    { id: '6', name: 'James Wilson', email: 'james@example.com', department: 'Sales', role: 'Sales Rep', status: 'active', joinDate: '2023-09-05' },
    { id: '7', name: 'Anna Martinez', email: 'anna@example.com', department: 'Engineering', role: 'Tech Lead', status: 'active', joinDate: '2022-04-18' },
    { id: '8', name: 'Robert Brown', email: 'robert@example.com', department: 'Finance', role: 'Accountant', status: 'pending', joinDate: '2024-02-01' },
  ];

  const columns: TableColumn<Employee>[] = [
    {
      key: 'name',
      label: 'Employee',
      sortable: true,
      render: (item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: ODLTheme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: ODLTheme.colors.white,
            fontSize: ODLTheme.typography.fontSize.sm,
            fontWeight: ODLTheme.typography.fontWeight.medium
          }}>
            {item.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{item.name}</div>
            <div style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      sortable: true,
      render: (item) => <Chip label={item.department} variant="info" size="small" />
    },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (item) => (
        <Chip
          label={item.status}
          variant={item.status === 'active' ? 'success' : item.status === 'pending' ? 'warning' : 'error'}
          size="small"
        />
      )
    },
    { key: 'joinDate', label: 'Join Date', sortable: true },
  ];

  return (
    <>
      {/* Header with Action Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <div />
        <Button variant="primary" size="md" leftIcon="add">
          Add Employee
        </Button>
      </div>

      {/* Alert Banner */}
      {selectedRows.length > 0 && (
        <div style={{ marginBottom: ODLTheme.spacing[4] }}>
          <AlertBanner
            variant="info"
            dismissible
          >
            {`${selectedRows.length} employee(s) selected`}
          </AlertBanner>
        </div>
      )}

      {/* Table */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
        overflow: 'hidden'
      }}>
        <AdvancedTable
          data={employeeData}
          columns={columns}
          selectable
          onRowSelect={setSelectedRows}
          paginated
          itemsPerPage={5}
          showSearch
          showExport
          showColumnToggle
          getRowKey={(item) => item.id}
        />
      </div>
    </>
  );
};

export const ODLTablePageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/team"
      pageTitle="Employee Directory"
      pageSubtitle="Manage your team members and their permissions"
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Team', path: '/team' },
        { label: 'Employees' },
      ]}
    >
      <TableContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// FORM PAGE TEMPLATE
// ============================================
const FormContent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    bio: ''
  });

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'design', label: 'Design' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
  ];

  return (
    <>
      {/* Personal Information Section */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h2 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.primary,
          marginBottom: ODLTheme.spacing[4],
          paddingBottom: ODLTheme.spacing[2],
          borderBottom: `2px solid ${ODLTheme.colors.primaryLight}`
        }}>
          Personal Information
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: ODLTheme.spacing[4]
        }}>
          <Input
            label="First Name"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(val) => setFormData({ ...formData, firstName: val })}
            required
          />
          <Input
            label="Last Name"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(val) => setFormData({ ...formData, lastName: val })}
            required
          />
        </div>

        <div style={{ marginTop: ODLTheme.spacing[4] }}>
          <Input
            label="Email Address"
            type="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
            required
          />
        </div>
      </div>

      {/* Organization Section */}
      <div style={{ marginBottom: ODLTheme.spacing[8] }}>
        <h2 style={{
          fontSize: ODLTheme.typography.fontSize.lg,
          fontWeight: ODLTheme.typography.fontWeight.semibold,
          color: ODLTheme.colors.primary,
          marginBottom: ODLTheme.spacing[4],
          paddingBottom: ODLTheme.spacing[2],
          borderBottom: `2px solid ${ODLTheme.colors.primaryLight}`
        }}>
          Organization Details
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: ODLTheme.spacing[4]
        }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: ODLTheme.typography.fontSize.sm,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              marginBottom: ODLTheme.spacing[2],
              color: ODLTheme.colors.text.primary
            }}>
              Department
            </label>
            <Dropdown
              options={departmentOptions}
              value={formData.department}
              onChange={(val) => setFormData({ ...formData, department: val })}
              placeholder="Select department"
            />
          </div>
          <Input
            label="Role / Title"
            placeholder="e.g. Senior Developer"
            value={formData.role}
            onChange={(val) => setFormData({ ...formData, role: val })}
          />
        </div>

        <div style={{ marginTop: ODLTheme.spacing[4] }}>
          <Input
            label="Bio"
            type="textarea"
            placeholder="Brief description about the employee..."
            value={formData.bio}
            onChange={(val) => setFormData({ ...formData, bio: val })}
            rows={4}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        gap: ODLTheme.spacing[3],
        paddingTop: ODLTheme.spacing[4],
        borderTop: `1px solid ${ODLTheme.colors.border}`
      }}>
        <Button variant="secondary" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md">
          Save Employee
        </Button>
      </div>
    </>
  );
};

export const ODLFormPageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/team"
      pageTitle="Add New Employee"
      pageSubtitle="Fill out the form below to add a new team member"
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Team', path: '/team' },
        { label: 'Add Employee' },
      ]}
    >
      <FormContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// DETAIL PAGE TEMPLATE
// ============================================
const DetailContent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const project = {
    name: 'Website Redesign',
    status: 'In Progress',
    progress: 65,
    dueDate: '2024-03-15',
    team: ['Sarah J.', 'Michael C.', 'Emily R.'],
    description: 'Complete redesign of the company website with modern UI/UX principles and improved performance.',
  };

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ fontSize: ODLTheme.typography.fontSize.lg, marginBottom: ODLTheme.spacing[3] }}>Project Overview</h3>
          <p style={{ color: ODLTheme.colors.text.secondary, lineHeight: 1.6 }}>{project.description}</p>

          <div style={{ marginTop: ODLTheme.spacing[6] }}>
            <h4 style={{ marginBottom: ODLTheme.spacing[3] }}>Progress</h4>
            <div style={{
              height: '8px',
              backgroundColor: ODLTheme.colors.surface,
              borderRadius: ODLTheme.borders.radius.full,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${project.progress}%`,
                height: '100%',
                backgroundColor: ODLTheme.colors.primary,
                borderRadius: ODLTheme.borders.radius.full
              }} />
            </div>
            <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
              {project.progress}% Complete
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'tasks',
      label: 'Tasks',
      badge: '12',
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Active Tasks</h3>
          <Accordion
            items={[
              { id: 'task-1', title: 'Design homepage mockups', content: 'Create wireframes and high-fidelity mockups for the new homepage layout.' },
              { id: 'task-2', title: 'Implement responsive navigation', content: 'Build mobile-first responsive navigation component.' },
              { id: 'task-3', title: 'Setup CI/CD pipeline', content: 'Configure automated testing and deployment workflows.' },
            ]}
          />
        </div>
      )
    },
    {
      id: 'team',
      label: 'Team',
      badge: String(project.team.length),
      content: (
        <div style={{ padding: ODLTheme.spacing[4] }}>
          <h3 style={{ marginBottom: ODLTheme.spacing[4] }}>Team Members</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[3] }}>
            {project.team.map((member, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: ODLTheme.spacing[3],
                padding: ODLTheme.spacing[3],
                backgroundColor: ODLTheme.colors.surface,
                borderRadius: ODLTheme.borders.radius.md
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: ODLTheme.colors.primary,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: ODLTheme.colors.white,
                  fontWeight: ODLTheme.typography.fontWeight.medium
                }}>
                  {member.split(' ').map(n => n[0]).join('')}
                </div>
                <span style={{ fontWeight: ODLTheme.typography.fontWeight.medium }}>{member}</span>
              </div>
            ))}
          </div>
        </div>
      )
    },
  ];

  return (
    <>
      {/* Header with Status and Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: ODLTheme.spacing[3] }}>
          <Chip label={project.status} variant="info" size="small" />
          <span style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
            Due: {project.dueDate}
          </span>
        </div>
        <div style={{ display: 'flex', gap: ODLTheme.spacing[2] }}>
          <Button variant="ghost" size="sm" leftIcon="settings" onClick={() => setIsDrawerOpen(true)}>
            Settings
          </Button>
          <Button variant="secondary" size="sm" leftIcon="edit">
            Edit
          </Button>
          <Button variant="primary" size="sm" leftIcon="checkmark">
            Mark Complete
          </Button>
        </div>
      </div>

      {/* Tabs Content */}
      <div style={{
        backgroundColor: ODLTheme.colors.white,
        borderRadius: ODLTheme.borders.radius.md,
        boxShadow: ODLTheme.shadows.sm,
        border: `1px solid ${ODLTheme.colors.border}`,
        overflow: 'hidden'
      }}>
        <SimpleTabs tabs={tabs} />
      </div>

      {/* Settings Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Project Settings"
        position="right"
        width="400px"
        footer={
          <div style={{ display: 'flex', gap: ODLTheme.spacing[2], justifyContent: 'flex-end' }}>
            <Button variant="secondary" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: ODLTheme.spacing[4] }}>
          <Input
            label="Project Name"
            value={project.name}
            onChange={() => {}}
            placeholder="Enter project name"
            fullWidth
          />

          <Dropdown
            label="Status"
            options={[
              { value: 'planning', label: 'Planning' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'review', label: 'Review' },
              { value: 'completed', label: 'Completed' },
            ]}
            value="in-progress"
            onChange={() => {}}
            placeholder="Select status"
          />

          <Input
            label="Due Date"
            type="date"
            value={project.dueDate}
            onChange={() => {}}
            fullWidth
          />

          <Input
            label="Description"
            type="textarea"
            value={project.description}
            onChange={() => {}}
            rows={4}
            placeholder="Project description..."
            fullWidth
          />
        </div>
      </Drawer>
    </>
  );
};

export const ODLDetailPageTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/projects"
      pageTitle="Website Redesign"
      pageSubtitle="Complete redesign of the company website with modern UI/UX principles"
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Projects', path: '/projects' },
        { label: 'Website Redesign' },
      ]}
    >
      <DetailContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// CARDS GRID TEMPLATE
// ============================================
const CardsGridContent: React.FC = () => {
  const projects = [
    { id: '1', title: 'Project Alpha', description: 'Development project for new features', status: 'In Progress', category: 'Development' },
    { id: '2', title: 'Marketing Campaign', description: 'Q1 2024 marketing initiatives', status: 'Planning', category: 'Marketing' },
    { id: '3', title: 'User Research', description: 'Customer feedback analysis', status: 'Completed', category: 'Research' },
    { id: '4', title: 'Bug Fixes', description: 'Priority bug resolution sprint', status: 'In Progress', category: 'Development' },
    { id: '5', title: 'Design System', description: 'Component library updates', status: 'Review', category: 'Design' },
    { id: '6', title: 'Documentation', description: 'Technical docs update', status: 'Planning', category: 'Documentation' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'info';
      case 'Planning': return 'warning';
      case 'Review': return 'default';
      default: return 'default';
    }
  };

  return (
    <>
      {/* Header with Action Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: ODLTheme.spacing[4]
      }}>
        <Button variant="primary" size="md" leftIcon="add">
          New Project
        </Button>
      </div>

      {/* Filter Bar */}
      <div style={{
        display: 'flex',
        gap: ODLTheme.spacing[3],
        marginBottom: ODLTheme.spacing[4]
      }}>
        <Chip label="All" variant="default" size="small" />
        <Chip label="Development" variant="info" size="small" />
        <Chip label="Design" variant="info" size="small" />
        <Chip label="Marketing" variant="info" size="small" />
      </div>

      {/* Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: ODLTheme.spacing[4]
      }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              backgroundColor: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[5],
              boxShadow: ODLTheme.shadows.sm,
              border: `1px solid ${ODLTheme.colors.border}`,
              borderTop: `4px solid ${ODLTheme.colors.primary}`,
              cursor: 'pointer',
              transition: ODLTheme.transitions.base,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: ODLTheme.spacing[3] }}>
              <h3 style={{
                fontSize: ODLTheme.typography.fontSize.base,
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                color: ODLTheme.colors.text.primary
              }}>
                {project.title}
              </h3>
              <Chip label={project.status} variant={getStatusVariant(project.status) as any} size="small" />
            </div>
            <p style={{
              color: ODLTheme.colors.text.secondary,
              fontSize: ODLTheme.typography.fontSize.sm,
              marginBottom: ODLTheme.spacing[4]
            }}>
              {project.description}
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: ODLTheme.spacing[3],
              borderTop: `1px solid ${ODLTheme.colors.border}`
            }}>
              <Chip label={project.category} variant="default" size="small" />
              <Button variant="ghost" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const ODLCardsGridTemplate: React.FC = () => {
  return (
    <ODLAppShellWrapper
      currentPage="/projects"
      pageTitle="Projects"
      pageSubtitle="6 projects total"
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Projects' },
      ]}
    >
      <CardsGridContent />
    </ODLAppShellWrapper>
  );
};

// ============================================
// APP SHELL TEMPLATE (with Navigation Rails)
// ============================================
export const ODLAppShellTemplate: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [openRightPanel, setOpenRightPanel] = useState<string | null>(null);

  // Left navigation menu items - main navigation
  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'projects', label: 'Projects', iconName: 'folder', path: '/projects', description: 'Manage projects' },
    { id: 'tasks', label: 'Tasks', iconName: 'calendar', path: '/tasks', description: 'View tasks' },
    { id: 'team', label: 'Team', iconName: 'user-multiple', path: '/team', description: 'Manage team' },
    { id: 'reports', label: 'Reports', iconName: 'chart-line', path: '/reports', description: 'View reports' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  // Right navigation menu items - contextual tools
  const rightMenuItems = [
    { id: 'ai-chat', label: 'Objective Intelligence', iconName: 'chat', path: '/ai-chat', description: 'Ask AI' },
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'profile', label: 'Profile', iconName: 'user', path: '/profile', description: 'Your profile' },
    { id: 'search', label: 'Search', iconName: 'search', path: '/search', description: 'Search content' },
    { id: 'filters', label: 'Filters', iconName: 'filter', path: '/filters', description: 'Apply filters' },
  ];

  // Right panel content based on selected item
  const rightPanelContent: Record<string, { title: string; content: React.ReactNode }> = {
    'ai-chat': {
      title: 'Objective Intelligence',
      content: <AIChatPanel onClose={() => setOpenRightPanel(null)} />,
    },
    notifications: {
      title: 'Notifications',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'New comment', desc: 'Sarah commented on your document', time: '5m ago' },
              { title: 'Task completed', desc: 'Project milestone achieved', time: '1h ago' },
              { title: 'System update', desc: 'New features available', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{item.desc}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    profile: {
      title: 'Profile',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: ODLTheme.colors.primary, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 600 }}>JD</div>
            <h3 style={{ margin: '0 0 4px 0' }}>John Doe</h3>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>john.doe@example.com</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Edit Profile</button>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Account Settings</button>
            <button style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '6px', background: 'white', cursor: 'pointer', textAlign: 'left' }}>Sign Out</button>
          </div>
        </div>
      ),
    },
    search: {
      title: 'Search',
      content: (
        <div style={{ padding: '16px' }}>
          <input type="text" placeholder="Search..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '16px' }} />
          <div style={{ fontWeight: 500, marginBottom: '8px' }}>Recent Searches</div>
          <ul style={{ margin: 0, padding: '0 0 0 20px', color: '#666' }}>
            <li>Project documents</li>
            <li>Team members</li>
            <li>Task reports</li>
          </ul>
        </div>
      ),
    },
    filters: {
      title: 'Filters',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Active</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Pending</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><input type="checkbox" /> Completed</label>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Date Range</div>
            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>
      ),
    },
  };

  const getActiveLabel = () => {
    const item = leftMenuItems.find(m => m.path === currentPath);
    return item?.label || 'Dashboard';
  };

  const handleRightNavigate = (path: string) => {
    const itemId = path.replace('/', '');
    if (openRightPanel === itemId) {
      setOpenRightPanel(null);
    } else {
      setOpenRightPanel(itemId);
    }
  };

  const currentPanelContent = openRightPanel ? rightPanelContent[openRightPanel] : null;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white
    }}>
      {/* Header */}
      <Header variant="build" userName="John Doe" />

      {/* Main Layout with Navigation Rails */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{
          height: '100%',
          borderRight: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
          />
        </div>

        {/* Main Content Area with Content Border Pattern */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: ODLTheme.spacing[6],
          background: ODLTheme.colors.white
        }}>
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: getActiveLabel() },
            ]}
          />
          <h1 style={{
            fontSize: ODLTheme.typography.fontSize['2xl'],
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: ODLTheme.colors.text.primary,
            margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
          }}>
            {getActiveLabel()}
          </h1>
          <p style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: ODLTheme.colors.text.secondary,
            margin: `0 0 ${ODLTheme.spacing[6]} 0`
          }}>
            Page subtitle or description goes here
          </p>

          {/* Grey Outer Frame / White Inner Container Pattern */}
          <div style={{
            background: '#EDF1F5',
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            minHeight: '400px'
          }}>
            <div style={{
              background: ODLTheme.colors.white,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[6]
            }}>
              {/* Sample Dashboard Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: ODLTheme.spacing[6],
                marginBottom: ODLTheme.spacing[6]
              }}>
                {/* Card 1 - Recent Activity */}
                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                  boxShadow: ODLTheme.shadows.sm,
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[3] }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: ODLTheme.colors.primaryLight,
                        borderRadius: ODLTheme.borders.radius.md,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: ODLTheme.spacing[3]
                      }}>
                        <Icon name="notification" size={20} style={{ color: ODLTheme.colors.primary }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.lg,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          margin: 0
                        }}>
                          Recent Activity
                        </h3>
                        <div style={{ marginTop: ODLTheme.spacing[1] }}>
                          <Chip label="New" variant="success" size="small" />
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      color: ODLTheme.colors.text.secondary,
                      margin: 0
                    }}>
                      Stay updated with your latest activities and notifications
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: ODLTheme.spacing[4],
                    paddingTop: ODLTheme.spacing[4],
                    borderTop: `1px solid ${ODLTheme.colors.surface}`
                  }}>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary }}>
                      3 new items
                    </span>
                    <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                  </div>
                </div>

                {/* Card 2 - Quick Actions */}
                <div style={{
                  background: ODLTheme.colors.white,
                  border: `1px solid ${ODLTheme.colors.border}`,
                  borderRadius: ODLTheme.borders.radius.lg,
                  padding: ODLTheme.spacing[6],
                  boxShadow: ODLTheme.shadows.sm,
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: ODLTheme.spacing[3] }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: ODLTheme.colors.infoLight,
                        borderRadius: ODLTheme.borders.radius.md,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: ODLTheme.spacing[3]
                      }}>
                        <Icon name="lightning" size={20} style={{ color: ODLTheme.colors.info }} />
                      </div>
                      <div>
                        <h3 style={{
                          fontSize: ODLTheme.typography.fontSize.lg,
                          fontWeight: ODLTheme.typography.fontWeight.semibold,
                          color: ODLTheme.colors.text.primary,
                          margin: 0
                        }}>
                          Quick Actions
                        </h3>
                        <div style={{ marginTop: ODLTheme.spacing[1] }}>
                          <Chip label="Tools" variant="info" size="small" />
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      color: ODLTheme.colors.text.secondary,
                      margin: 0
                    }}>
                      Access frequently used tools and shortcuts
                    </p>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: ODLTheme.spacing[4],
                    paddingTop: ODLTheme.spacing[4],
                    borderTop: `1px solid ${ODLTheme.colors.surface}`
                  }}>
                    <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.tertiary }}>
                      5 shortcuts
                    </span>
                    <Icon name="arrow-right" size={16} style={{ color: ODLTheme.colors.primary }} />
                  </div>
                </div>
              </div>

              <p style={{ color: ODLTheme.colors.text.secondary, textAlign: 'center' }}>
                Content for "{getActiveLabel()}" - Use this template as a starting point for your application.
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - InlinePanel + NavigationRail */}
        <div style={{ display: 'flex', height: '100%' }}>
          {currentPanelContent && (
            <InlinePanel
              isOpen={!!openRightPanel}
              onClose={() => setOpenRightPanel(null)}
              title={openRightPanel === 'ai-chat' ? '' : currentPanelContent.title}
              width={openRightPanel === 'ai-chat' ? '380px' : '320px'}
            >
              {currentPanelContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={openRightPanel ? `/${openRightPanel}` : ''}
            onNavigate={handleRightNavigate}
            collapsed={true}
            position="right"
            theme="light"
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// ADAPTIVE LIST TEMPLATE
// ============================================
const BulkActionsBar = ({
  selectedCount,
  onDelete,
  onDownload,
  onClearSelection,
  onShare,
  onMove,
  onPublish,
  sortButtonRef,
  viewButtonRef,
  onSortClick,
  onViewClick,
  onRefreshClick,
  onSelectAll,
  allSelected,
  totalCount,
  sortMenuOpen,
  viewMenuOpen,
  sortMenuItems,
  viewMenuItems,
  onSortMenuClose,
  onViewMenuClose
}: {
  selectedCount: number;
  onDelete: () => void;
  onDownload: () => void;
  onClearSelection: () => void;
  onShare: () => void;
  onMove: () => void;
  onPublish: () => void;
  sortButtonRef?: React.RefObject<HTMLDivElement>;
  viewButtonRef?: React.RefObject<HTMLDivElement>;
  onSortClick?: () => void;
  onViewClick?: () => void;
  onRefreshClick?: () => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
  totalCount?: number;
  sortMenuOpen?: boolean;
  viewMenuOpen?: boolean;
  sortMenuItems?: PopupMenuItem[];
  viewMenuItems?: PopupMenuItem[];
  onSortMenuClose?: () => void;
  onViewMenuClose?: () => void;
}) => {
  const { colors } = useTheme();
  
  return (
    <div
      className="adaptive-list-bulk-actions-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        backgroundColor: colors.paper,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Checkbox
            checked={allSelected || false}
            indeterminate={selectedCount > 0 && !allSelected}
            onChange={onSelectAll}
            aria-label="Select all items"
            size="md"
          />
          <span 
            style={{ 
              fontSize: '14px',
              fontWeight: 500,
              color: colors.textSecondary,
              cursor: 'pointer'
            }}
            onClick={onSelectAll}
          >
            Select all
          </span>
        </div>
        <ButtonComponent
          variant="text"
          size="sm"
          onClick={onShare}
          icon={<Icon name="share" size={16} />}
        >
          Share
        </ButtonComponent>
        <ButtonComponent
          variant="text"
          size="sm"
          onClick={onMove}
          icon={<Icon name="folder-move-to" size={16} />}
        >
          Move
        </ButtonComponent>
        <ButtonComponent
          variant="text"
          size="sm"
          onClick={onDownload}
          icon={<Icon name="cloud-download" size={16} />}
        >
          Download
        </ButtonComponent>
        <ButtonComponent
          variant="text"
          size="sm"
          onClick={onPublish}
          icon={<Icon name="send" size={16} />}
        >
          Publish
        </ButtonComponent>
        <ButtonComponent
          variant="text"
          size="sm"
          onClick={onDelete}
          icon={<Icon name="trash-can" size={16} />}
        >
          Delete
        </ButtonComponent>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            ref={sortButtonRef}
            style={{ display: 'inline-block' }}
          >
            <IconButton
              icon="sort-remove"
              variant="ghost"
              size="medium"
              aria-label="Sort"
              menuIndicator={true}
              selected={sortMenuOpen}
              aria-expanded={sortMenuOpen}
              onClick={() => {
                onSortClick?.();
              }}
            />
          </div>
          {sortMenuItems && (
            <PopupMenu
              items={sortMenuItems}
              open={sortMenuOpen || false}
              onClose={onSortMenuClose || (() => {})}
              anchorEl={sortButtonRef?.current || null}
              align="right"
              size="md"
            />
          )}
        </div>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            ref={viewButtonRef}
            style={{ display: 'inline-block' }}
          >
            <IconButton
              icon="view"
              variant="ghost"
              size="medium"
              aria-label="View"
              menuIndicator={true}
              selected={viewMenuOpen}
              aria-expanded={viewMenuOpen}
              onClick={() => {
                onViewClick?.();
              }}
            />
          </div>
          {viewMenuItems && (
            <PopupMenu
              items={viewMenuItems}
              open={viewMenuOpen || false}
              onClose={onViewMenuClose || (() => {})}
              anchorEl={viewButtonRef?.current || null}
              align="right"
              size="md"
            />
          )}
        </div>
        <IconButton
          icon="refresh"
          variant="ghost"
          size="medium"
          aria-label="Refresh"
          onClick={onRefreshClick}
        />
      </div>
    </div>
  );
};

const AdaptiveListContent: React.FC = () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('table');
  
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const viewButtonRef = useRef<HTMLDivElement>(null);

  const documentData = [
    {
      id: 1,
      name: 'Q4 Financial Report.pdf',
      modifiedDate: '15-Dec-2024',
      modifiedBy: 'John Doe',
      documentId: 'A1691878'
    },
    {
      id: 2,
      name: 'Marketing Strategy 2025.docx',
      modifiedDate: '14-Dec-2024',
      modifiedBy: 'Jane Smith',
      documentId: 'A1691879'
    },
    {
      id: 3,
      name: 'Product Roadmap.xlsx',
      modifiedDate: '13-Dec-2024',
      modifiedBy: 'Bob Johnson',
      documentId: 'A1691880'
    },
    {
      id: 4,
      name: 'Employee Handbook.pdf',
      modifiedDate: '12-Dec-2024',
      modifiedBy: 'Alice Brown',
      documentId: 'A1691881'
    },
    {
      id: 5,
      name: 'Sales Presentation.pptx',
      modifiedDate: '11-Dec-2024',
      modifiedBy: 'Charlie Wilson',
      documentId: 'A1691882'
    },
    { id: 6, name: 'Budget Forecast.xlsx', modifiedDate: '10-Dec-2024', modifiedBy: 'David Lee', documentId: 'A1691883' },
    { id: 7, name: 'Project Timeline.pptx', modifiedDate: '09-Dec-2024', modifiedBy: 'Emma Davis', documentId: 'A1691884' },
    { id: 8, name: 'Contract Agreement.pdf', modifiedDate: '08-Dec-2024', modifiedBy: 'Frank Miller', documentId: 'A1691885' },
    { id: 9, name: 'Meeting Notes.docx', modifiedDate: '07-Dec-2024', modifiedBy: 'Grace Taylor', documentId: 'A1691886' },
    { id: 10, name: 'Technical Specs.pdf', modifiedDate: '06-Dec-2024', modifiedBy: 'Henry White', documentId: 'A1691887' },
  ];

  const documentColumns = [
    {
      key: 'name',
      label: 'Name',
      width: '196px',
    },
    { key: 'modifiedDate', label: 'Modified Date', width: '130px' },
    { key: 'modifiedBy', label: 'Modified By', width: '140px' },
    {
      key: 'documentId',
      label: 'Id',
      width: '120px',
    },
    {
      key: 'actions',
      label: 'Action',
      width: '70px',
      alignRight: false,
      render: (item: any) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'flex-start' }}>
          <Button variant="text" size="sm">
            <Icon name="cloud-download" size={16} />
          </Button>
          <Button variant="text" size="sm">
            <Icon name="overflow-menu-vertical" size={16} />
          </Button>
        </div>
      ),
    },
  ];

  const handleRowSelect = (selected: any[]) => {
    setSelectedKeys(selected.map(item => item.id.toString()));
  };

  const handleClearSelection = () => {
    setSelectedKeys([]);
  };

  const handleDelete = () => {
    console.log('Delete items:', selectedKeys);
    alert(`Deleting ${selectedKeys.length} item(s)`);
    setSelectedKeys([]);
  };

  const handleDownload = () => {
    console.log('Download items:', selectedKeys);
    alert(`Downloading ${selectedKeys.length} item(s)`);
  };

  const handleShare = () => {
    console.log('Share items:', selectedKeys);
    alert(`Sharing ${selectedKeys.length} item(s)`);
  };

  const handleMove = () => {
    console.log('Move items:', selectedKeys);
    alert(`Moving ${selectedKeys.length} item(s)`);
  };

  const handlePublish = () => {
    console.log('Publish items:', selectedKeys);
    alert(`Publishing ${selectedKeys.length} item(s)`);
  };

  const handleSortClick = () => {
    setSortMenuOpen((prev) => !prev);
    setViewMenuOpen(false);
  };

  const handleViewClick = () => {
    setViewMenuOpen((prev) => !prev);
    setSortMenuOpen(false);
  };

  const sortMenuItems: PopupMenuItem[] = [
    { id: 'name', label: 'Sort by Name', icon: 'sort-ascending', action: () => { console.log('Sort by Name'); setSortMenuOpen(false); } },
    { id: 'date', label: 'Sort by Date', icon: 'calendar', action: () => { console.log('Sort by Date'); setSortMenuOpen(false); } },
    { id: 'status', label: 'Sort by Status', icon: 'status', action: () => { console.log('Sort by Status'); setSortMenuOpen(false); } },
    { id: 'modified', label: 'Sort by Modified By', icon: 'user', action: () => { console.log('Sort by Modified By'); setSortMenuOpen(false); } },
  ];

  const viewMenuItems: PopupMenuItem[] = [
    { id: 'compact', label: 'Compact', icon: 'view', action: () => { setActiveView('compact'); console.log('Compact'); setViewMenuOpen(false); } },
    { id: 'comfortable', label: 'Comfortable', icon: 'view', action: () => { setActiveView('comfortable'); console.log('Comfortable'); setViewMenuOpen(false); } },
    { id: 'small-grid', label: 'Small grid', icon: 'grid', action: () => { setActiveView('small-grid'); console.log('Small grid'); setViewMenuOpen(false); } },
    { id: 'large-grid', label: 'Large grid', icon: 'grid', action: () => { setActiveView('large-grid'); console.log('Large grid'); setViewMenuOpen(false); } },
    { id: 'metadata', label: 'Metadata', icon: 'information', action: () => { setActiveView('metadata'); console.log('Metadata'); setViewMenuOpen(false); } },
    { id: 'table', label: 'Table', icon: 'table', action: () => { setActiveView('table'); console.log('Table'); setViewMenuOpen(false); } },
  ];

  const handleRefreshClick = () => {
    console.log('Refreshing list...');
  };

  const handleSelectAll = () => {
    if (selectedKeys.length === documentData.length) {
      setSelectedKeys([]);
    } else {
      const allKeys = documentData.map(item => item.id.toString());
      setSelectedKeys(allKeys);
    }
  };

  const allSelected = selectedKeys.length === documentData.length && documentData.length > 0;

  return (
    <>
      {/* Bulk Actions Bar and AdaptiveList */}
      <div style={{ border: '1px solid #E0E0E0', borderRadius: '8px', overflow: 'hidden' }}>
        <BulkActionsBar
          selectedCount={selectedKeys.length}
          onDelete={handleDelete}
          onDownload={handleDownload}
          onClearSelection={handleClearSelection}
          onShare={handleShare}
          onMove={handleMove}
          onPublish={handlePublish}
          sortButtonRef={sortButtonRef}
          viewButtonRef={viewButtonRef}
          onSortClick={handleSortClick}
          onViewClick={handleViewClick}
          onRefreshClick={handleRefreshClick}
          onSelectAll={handleSelectAll}
          allSelected={allSelected}
          totalCount={documentData.length}
          sortMenuOpen={sortMenuOpen}
          viewMenuOpen={viewMenuOpen}
          sortMenuItems={sortMenuItems}
          viewMenuItems={viewMenuItems}
          onSortMenuClose={() => setSortMenuOpen(false)}
          onViewMenuClose={() => setViewMenuOpen(false)}
        />
        <AdaptiveList
          data={documentData}
          columns={documentColumns}
          selectedKeys={selectedKeys}
          onRowSelect={handleRowSelect}
          getRowKey={(item) => item.id.toString()}
          className="adaptive-list-container"
          viewType={activeView}
          onViewTypeChange={setActiveView}
          selectable={true}
          showFileTypeIcon={true}
        />
      </div>
    </>
  );
};

export const ODLAdaptiveListTemplate: React.FC = () => {
  const { colors } = useTheme();
  const [currentPath, setCurrentPath] = useState('/documents');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openRightPanel, setOpenRightPanel] = useState<string | null>(null);
  const [panelWidth, setPanelWidth] = useState(280);
  const [isDragging, setIsDragging] = useState(false);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'documents', label: 'Documents', iconName: 'document', path: '/documents', description: 'Manage documents' },
    { id: 'projects', label: 'Projects', iconName: 'folder', path: '/projects', description: 'Manage projects' },
    { id: 'team', label: 'Team', iconName: 'user-multiple', path: '/team', description: 'Manage team' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  const rightMenuItems = [
    { id: 'ai-chat', label: 'Objective Intelligence', iconName: 'chat', path: '/ai-chat', description: 'Ask AI' },
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'profile', label: 'Profile', iconName: 'user', path: '/profile', description: 'Your profile' },
    { id: 'search', label: 'Search', iconName: 'search', path: '/search', description: 'Search content' },
    { id: 'filters', label: 'Filters', iconName: 'filter', path: '/filters', description: 'Apply filters' },
  ];

  const rightPanelContent: Record<string, { title: string; content: React.ReactNode }> = {
    'ai-chat': {
      title: 'Objective Intelligence',
      content: <AIChatPanel onClose={() => setOpenRightPanel(null)} />,
    },
    notifications: {
      title: 'Notifications',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'New comment', desc: 'Sarah commented on your document', time: '5m ago' },
              { title: 'Task completed', desc: 'Project milestone achieved', time: '1h ago' },
              { title: 'System update', desc: 'New features available', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
                <div style={{ fontWeight: 500, marginBottom: '4px', color: colors.textPrimary }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: colors.textSecondary }}>{item.desc}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    profile: {
      title: 'Profile',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: colors.primaryMain, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.textInverse, fontSize: '24px', fontWeight: 600 }}>JD</div>
            <h3 style={{ margin: '0 0 4px 0', color: colors.textPrimary }}>John Doe</h3>
            <p style={{ margin: 0, color: colors.textSecondary, fontSize: '14px' }}>john.doe@example.com</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button style={{ padding: '10px', border: `1px solid ${colors.border}`, borderRadius: '6px', background: colors.paper, cursor: 'pointer', textAlign: 'left', color: colors.textPrimary }}>Edit Profile</button>
            <button style={{ padding: '10px', border: `1px solid ${colors.border}`, borderRadius: '6px', background: colors.paper, cursor: 'pointer', textAlign: 'left', color: colors.textPrimary }}>Account Settings</button>
            <button style={{ padding: '10px', border: `1px solid ${colors.border}`, borderRadius: '6px', background: colors.paper, cursor: 'pointer', textAlign: 'left', color: colors.textPrimary }}>Sign Out</button>
          </div>
        </div>
      ),
    },
    search: {
      title: 'Search',
      content: (
        <div style={{ padding: '16px' }}>
          <input type="text" placeholder="Search..." style={{ width: '100%', padding: '10px 12px', border: `1px solid ${colors.border}`, borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '16px', backgroundColor: colors.paper, color: colors.textPrimary }} />
          <div style={{ fontWeight: 500, marginBottom: '8px', color: colors.textPrimary }}>Recent Searches</div>
          <ul style={{ margin: 0, padding: '0 0 0 20px', color: colors.textSecondary }}>
            <li>Project documents</li>
            <li>Team members</li>
            <li>Task reports</li>
          </ul>
        </div>
      ),
    },
    filters: {
      title: 'Filters',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px', color: colors.textPrimary }}>Status</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}><input type="checkbox" /> Active</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}><input type="checkbox" /> Pending</label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}><input type="checkbox" /> Completed</label>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: '8px', color: colors.textPrimary }}>Date Range</div>
            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: colors.paper, color: colors.textPrimary }}>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>
      ),
    },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setHasDragged(true);
      if (panelCollapsed) {
        setPanelCollapsed(false);
      }
      const railWidth = isNavCollapsed ? 56 : 200;
      const newWidth = e.clientX - railWidth;
      const clampedWidth = Math.max(200, Math.min(400, newWidth));
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
  }, [isDragging, isNavCollapsed, hasDragged, panelCollapsed]);

  const handleRightNavigate = (path: string) => {
    const itemId = path.replace('/', '');
    if (openRightPanel === itemId) {
      setOpenRightPanel(null);
    } else {
      setOpenRightPanel(itemId);
    }
  };

  const documentCategories = [
    { name: 'All Documents', count: 156, icon: 'document' },
    { name: 'Recent', count: 24, icon: 'time' },
    { name: 'Favorites', count: 12, icon: 'star' },
    { name: 'Shared with me', count: 38, icon: 'share' },
    { name: 'Archived', count: 45, icon: 'archive' },
  ];

  const documentTypes = [
    { name: 'PDFs', count: 42, color: '#E53935' },
    { name: 'Word Docs', count: 38, color: '#1E88E5' },
    { name: 'Spreadsheets', count: 31, color: '#43A047' },
    { name: 'Presentations', count: 25, color: '#FB8C00' },
    { name: 'Images', count: 20, color: '#8E24AA' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: colors.paper, cursor: isDragging ? 'col-resize' : 'default' }}>
      <Header variant="nexus" userName="John Doe" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            collapsed={isNavCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsNavCollapsed}
            showTooltips={true}
          />

          <div style={{ display: 'flex', height: '100%' }}>
            {!panelCollapsed && (
              <div style={{
                width: `${panelWidth}px`,
                height: '100%',
                backgroundColor: colors.paper,
                borderRight: `1px solid ${colors.default}`,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '16px',
                  borderBottom: `1px solid ${colors.grey300}`,
                }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600, color: colors.textPrimary }}>Documents</h3>
                  <p style={{ margin: 0, fontSize: '12px', color: colors.textMuted }}>Browse and filter your files</p>
                </div>

                <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>Categories</div>
                    {documentCategories.map((cat, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        backgroundColor: i === 0 ? colors.grey300 : 'transparent',
                      }}>
                        <Icon name={cat.icon} size={18} color={i === 0 ? colors.primaryMain : colors.textSecondary} />
                        <span style={{ flex: 1, fontSize: '14px', color: i === 0 ? colors.primaryMain : colors.textPrimary, fontWeight: i === 0 ? 500 : 400 }}>{cat.name}</span>
                        <span style={{ fontSize: '12px', color: colors.textMuted, backgroundColor: colors.grey300, padding: '2px 8px', borderRadius: '10px' }}>{cat.count}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>File Types</div>
                    {documentTypes.map((type, i) => (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '8px',
                        cursor: 'pointer',
                      }}>
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: type.color }} />
                        <span style={{ flex: 1, fontSize: '14px', color: colors.textPrimary }}>{type.name}</span>
                        <span style={{ fontSize: '12px', color: colors.textMuted }}>{type.count}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: colors.textMuted, textTransform: 'uppercase', marginBottom: '8px', padding: '0 8px' }}>Storage</div>
                    <div style={{ padding: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', color: colors.textPrimary }}>Used</span>
                        <span style={{ fontSize: '13px', color: colors.textMuted }}>4.2 GB / 10 GB</span>
                      </div>
                      <div style={{ height: '6px', backgroundColor: colors.grey300, borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: '42%', backgroundColor: colors.primaryMain, borderRadius: '3px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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

        <div style={{ flex: 1, overflow: 'auto', padding: ODLTheme.spacing[6], background: colors.paper }}>
          <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Documents', path: '/documents' }]} />

          <h1 style={{
            fontSize: ODLTheme.typography.fontSize['2xl'],
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: colors.textPrimary,
            margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
          }}>
            Document Management
          </h1>

          <p style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: colors.textSecondary,
            margin: `0 0 ${ODLTheme.spacing[6]} 0`
          }}>
            Manage and organize your documents with advanced filtering and view options
          </p>

          <div style={{
            background: colors.default,
            borderRadius: ODLTheme.borders.radius.lg,
            padding: ODLTheme.spacing[6],
            minHeight: '400px'
          }}>
            <div style={{
              background: colors.paper,
              borderRadius: ODLTheme.borders.radius.md,
              padding: ODLTheme.spacing[6]
            }}>
              <AdaptiveListContent />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {openRightPanel && rightPanelContent[openRightPanel] && (
            <InlinePanel
              isOpen={!!openRightPanel}
              onClose={() => setOpenRightPanel(null)}
              title={openRightPanel === 'ai-chat' ? '' : rightPanelContent[openRightPanel].title}
              width={openRightPanel === 'ai-chat' ? '380px' : '320px'}
            >
              {rightPanelContent[openRightPanel].content}
            </InlinePanel>
          )}

          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={openRightPanel ? `/${openRightPanel}` : ''}
            onNavigate={handleRightNavigate}
            collapsed={true}
            position="right"
            theme="light"
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// EDITOR PAGE TEMPLATE
// ============================================
export const ODLEditorPageTemplate: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/editor');
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [openRightPanel, setOpenRightPanel] = useState<string | null>(null);
  const [content, setContent] = useState(`
    <h1>Document Title</h1>
    <p>Start writing your document here. This editor provides a familiar word processor experience with automatic pagination.</p>
    <h2>Getting Started</h2>
    <p>Use the toolbar above to format your text, add headings, lists, and more. The document is displayed in A4 page format with proper margins.</p>
  `);
  const [zoom, setZoom] = useState(100);
  const zoomOptions = [50, 75, 100, 125, 150, 175, 200];

  // Left navigation menu items
  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'documents', label: 'Documents', iconName: 'document', path: '/documents', description: 'Manage documents' },
    { id: 'editor', label: 'Editor', iconName: 'edit', path: '/editor', description: 'Document editor' },
    { id: 'templates', label: 'Templates', iconName: 'template', path: '/templates', description: 'Document templates' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  // Right navigation menu items
  const rightMenuItems = [
    { id: 'comments', label: 'Comments', iconName: 'chat', path: '/comments', description: 'Document comments' },
    { id: 'history', label: 'History', iconName: 'time', path: '/history', description: 'Version history' },
    { id: 'share', label: 'Share', iconName: 'share', path: '/share', description: 'Share document' },
  ];

  // Right panel content for editor
  const rightPanelContent: Record<string, { title: string; content: React.ReactNode }> = {
    comments: {
      title: 'Comments',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { author: 'Sarah J.', text: 'Great introduction paragraph!', time: '2h ago' },
              { author: 'Michael C.', text: 'Can we add more details here?', time: '5h ago' },
              { author: 'Emily R.', text: 'Approved the changes.', time: '1d ago' },
            ].map((comment, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 500 }}>{comment.author}</span>
                  <span style={{ fontSize: '12px', color: '#999' }}>{comment.time}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>{comment.text}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '16px' }}>
            <textarea placeholder="Add a comment..." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' }} />
            <button style={{ marginTop: '8px', padding: '8px 16px', backgroundColor: ODLTheme.colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Post Comment</button>
          </div>
        </div>
      ),
    },
    history: {
      title: 'Version History',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { version: 'v3.0', date: 'Today, 2:30 PM', author: 'You', current: true },
              { version: 'v2.0', date: 'Yesterday, 4:15 PM', author: 'Sarah J.', current: false },
              { version: 'v1.0', date: 'Dec 12, 10:00 AM', author: 'Michael C.', current: false },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: item.current ? '#e3f2fd' : '#f5f5f5', borderRadius: '8px', border: item.current ? `2px solid ${ODLTheme.colors.primary}` : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600 }}>{item.version}</span>
                  {item.current && <span style={{ fontSize: '12px', color: ODLTheme.colors.primary, fontWeight: 500 }}>Current</span>}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>{item.date}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>by {item.author}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    share: {
      title: 'Share Document',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Share with people</div>
            <input type="email" placeholder="Enter email address..." style={{ width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>People with access</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'John Doe (You)', role: 'Owner' },
                { name: 'Sarah J.', role: 'Editor' },
                { name: 'Michael C.', role: 'Viewer' },
              ].map((person, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: '#f5f5f5', borderRadius: '6px' }}>
                  <span>{person.name}</span>
                  <span style={{ fontSize: '12px', color: '#666' }}>{person.role}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: '8px' }}>Get link</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value="https://docs.example.com/d/abc123" readOnly style={{ flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', backgroundColor: '#f5f5f5' }} />
              <button style={{ padding: '10px 16px', backgroundColor: ODLTheme.colors.primary, color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Copy</button>
            </div>
          </div>
        </div>
      ),
    },
  };

  const handleRightNavigate = (path: string) => {
    const itemId = path.replace('/', '');
    if (openRightPanel === itemId) {
      setOpenRightPanel(null);
    } else {
      setOpenRightPanel(itemId);
    }
  };

  const currentPanelContent = openRightPanel ? rightPanelContent[openRightPanel] : null;

  const ZoomDropdown = (
    <select
      className="a4-zoom-select"
      value={zoom}
      onChange={(e) => setZoom(Number(e.target.value))}
      aria-label="Zoom level"
    >
      {zoomOptions.map((value) => (
        <option key={value} value={value}>
          {value}%
        </option>
      ))}
    </select>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: ODLTheme.colors.white
    }}>
      {/* Header */}
      <Header variant="nexus" userName="John Doe" />

      {/* Main Layout with Navigation Rails */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Navigation Rail */}
        <div style={{
          height: '100%',
          borderRight: `1px solid ${ODLTheme.colors.border}`
        }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={(path) => setCurrentPath(path)}
            collapsed={isLeftCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsLeftCollapsed}
            showTooltips={true}
          />
        </div>

        {/* Main Content Area - A4Editor fills the space */}
        <div style={{
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: ODLTheme.colors.wave
        }}>
          <A4Editor
            initialContent={content}
            onUpdate={setContent}
            zoom={zoom}
            toolbarRight={ZoomDropdown}
            placeholder="Start writing your document..."
          />
        </div>

        {/* Right Panel - InlinePanel + NavigationRail */}
        <div style={{ display: 'flex', height: '100%' }}>
          {currentPanelContent && (
            <InlinePanel
              isOpen={!!openRightPanel}
              onClose={() => setOpenRightPanel(null)}
              title={openRightPanel === 'ai-chat' ? '' : currentPanelContent.title}
              width={openRightPanel === 'ai-chat' ? '380px' : '320px'}
            >
              {currentPanelContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={openRightPanel ? `/${openRightPanel}` : ''}
            onNavigate={handleRightNavigate}
            collapsed={true}
            position="right"
            theme="light"
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// ADAPTIVE DASHBOARD TEMPLATE - GridStack Layout
// ============================================
export const ODLAdaptiveDashboardTemplate: React.FC = () => {
  const { colors } = useTheme();
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [openRightPanel, setOpenRightPanel] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInstance = useRef<GridStack | null>(null);

  const leftMenuItems = [
    { id: 'dashboard', label: 'Dashboard', iconName: 'dashboard', path: '/dashboard', description: 'View your dashboard' },
    { id: 'analytics', label: 'Analytics', iconName: 'chart-line', path: '/analytics', description: 'View analytics' },
    { id: 'reports', label: 'Reports', iconName: 'document', path: '/reports', description: 'View reports' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'System settings' },
  ];

  const rightMenuItems = [
    { id: 'ai-chat', label: 'Objective Intelligence', iconName: 'chat', path: '/ai-chat', description: 'Ask AI' },
    { id: 'notifications', label: 'Notifications', iconName: 'notification', path: '/notifications', description: 'View notifications' },
    { id: 'settings', label: 'Settings', iconName: 'settings', path: '/settings', description: 'Settings' },
  ];

  const rightPanelContent: Record<string, { title: string; content: React.ReactNode }> = {
    'ai-chat': {
      title: 'Objective Intelligence',
      content: <AIChatPanel onClose={() => setOpenRightPanel(null)} />,
    },
    notifications: {
      title: 'Notifications',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { title: 'Dashboard updated', desc: 'Your dashboard layout has been saved', time: '2m ago' },
              { title: 'New data available', desc: 'Q4 metrics are now ready', time: '1h ago' },
              { title: 'Widget added', desc: 'Revenue chart added to dashboard', time: '3h ago' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '12px', backgroundColor: colors.grey300, borderRadius: '8px' }}>
                <div style={{ fontWeight: 500, marginBottom: '4px', color: colors.textPrimary }}>{item.title}</div>
                <div style={{ fontSize: '14px', color: colors.textSecondary }}>{item.desc}</div>
                <div style={{ fontSize: '12px', color: colors.textMuted, marginTop: '4px' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    settings: {
      title: 'Dashboard Settings',
      content: (
        <div style={{ padding: '16px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontWeight: 500, marginBottom: '8px', color: colors.textPrimary }}>Layout Options</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}>
                <input type="checkbox" defaultChecked /> Enable drag & drop
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}>
                <input type="checkbox" defaultChecked /> Enable resize
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: colors.textPrimary }}>
                <input type="checkbox" /> Lock layout
              </label>
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 500, marginBottom: '8px', color: colors.textPrimary }}>Grid Columns</div>
            <select style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${colors.border}`, backgroundColor: colors.paper, color: colors.textPrimary }}>
              <option>12 columns</option>
              <option>8 columns</option>
              <option>6 columns</option>
            </select>
          </div>
        </div>
      ),
    },
  };

  useEffect(() => {
    if (!gridRef.current) return;

    gridInstance.current = GridStack.init({
      column: 12,
      cellHeight: 80,
      margin: 12,
      animate: true,
      float: false,
    }, gridRef.current);

    return () => {
      gridInstance.current?.destroy(false);
    };
  }, []);

  const handleRightNavigate = (path: string) => {
    const itemId = path.replace('/', '');
    if (openRightPanel === itemId) {
      setOpenRightPanel(null);
    } else {
      setOpenRightPanel(itemId);
    }
  };

  const currentPanelContent = openRightPanel ? rightPanelContent[openRightPanel] : null;

  const DashboardWidget: React.FC<{ title: string; icon: string; children: React.ReactNode }> = ({ title, icon, children }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: colors.paper,
          borderRadius: '8px',
          border: `2px solid ${isHovered ? colors.primaryMain : 'transparent'}`,
          overflow: 'visible',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
          position: 'relative',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 16px',
          backgroundColor: colors.paper,
          cursor: 'move',
          borderRadius: '6px 6px 0 0',
        }}>
          {isHovered && <Icon name="draggable" size={18} color={colors.textPrimary} />}
          <Icon name={icon} size={18} color={colors.primaryMain} />
          <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>{title}</span>
        </div>
        <div style={{ flex: 1, padding: '16px', overflow: 'auto', borderRadius: '0 0 6px 6px' }}>
          {children}
        </div>
      </div>
    );
  };

  const GridStackStyles = () => (
    <style>{`
      .grid-stack-item-content {
        overflow: visible !important;
      }
      .grid-stack-item {
        overflow: visible !important;
      }
      .grid-stack-item > .ui-resizable-se,
      .grid-stack-item > .ui-resizable-handle {
        width: 32px !important;
        height: 32px !important;
        bottom: -4px !important;
        right: -4px !important;
        background: ${colors.primaryMain} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 32 32' fill='white'%3E%3Cpath d='M28 28H16v-2h10V16h2z'/%3E%3Cpath d='M4 4h12v2H6v10H4z'/%3E%3C/svg%3E") center center no-repeat !important;
        border-radius: 1000px !important;
        cursor: nwse-resize !important;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      .grid-stack-item:hover > .ui-resizable-se,
      .grid-stack-item:hover > .ui-resizable-handle {
        opacity: 1;
      }
      .grid-stack-item.ui-draggable-dragging .grid-stack-item-content > div,
      .grid-stack-item.gs-dragging .grid-stack-item-content > div {
        border: 2px solid ${colors.primaryMain} !important;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
        transform: rotate(1deg) scale(1.01);
      }
      .grid-stack-item.ui-draggable-dragging > .ui-resizable-se,
      .grid-stack-item.gs-dragging > .ui-resizable-se {
        opacity: 1;
      }
    `}</style>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: colors.paper }}>
      <Header variant="nexus" userName="John Doe" />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%', borderRight: `1px solid ${colors.border}` }}>
          <NavigationRail
            menuItems={leftMenuItems}
            currentPath={currentPath}
            onNavigate={setCurrentPath}
            collapsed={isNavCollapsed}
            position="left"
            theme="light"
            showHelpIcon={true}
            showCollapseToggle={true}
            onCollapseToggle={setIsNavCollapsed}
            showTooltips={true}
          />
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '24px', background: colors.default }}>
          <div style={{ marginBottom: '24px' }}>
            <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Dashboard', path: '/dashboard' }]} />
            <h1 style={{
              fontSize: ODLTheme.typography.fontSize['2xl'],
              fontWeight: ODLTheme.typography.fontWeight.semibold,
              color: colors.textPrimary,
              margin: `${ODLTheme.spacing[4]} 0 ${ODLTheme.spacing[2]} 0`
            }}>
              Adaptive Dashboard
            </h1>
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: colors.textSecondary,
              margin: 0
            }}>
              Drag and resize widgets to customize your dashboard layout
            </p>
          </div>

          <GridStackStyles />
          <div ref={gridRef} className="grid-stack">
            <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Total Revenue" icon="wallet">
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>$48,250</div>
                    <div style={{ fontSize: '14px', color: colors.successMain, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="arrow-up" size={14} /> +12.5% from last month
                    </div>
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="3" gs-y="0" gs-w="3" gs-h="2">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Active Users" icon="user-multiple">
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 600, color: colors.successMain, marginBottom: '8px' }}>2,847</div>
                    <div style={{ fontSize: '14px', color: colors.successMain, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="arrow-up" size={14} /> +8.2% from last month
                    </div>
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="6" gs-y="0" gs-w="3" gs-h="2">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Conversion Rate" icon="analytics">
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 600, color: colors.warningMain, marginBottom: '8px' }}>3.24%</div>
                    <div style={{ fontSize: '14px', color: colors.errorMain, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="arrow-down" size={14} /> -2.1% from last month
                    </div>
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="9" gs-y="0" gs-w="3" gs-h="2">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Avg. Session" icon="time">
                  <div>
                    <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>4m 32s</div>
                    <div style={{ fontSize: '14px', color: colors.successMain, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Icon name="arrow-up" size={14} /> +15% from last month
                    </div>
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="0" gs-y="2" gs-w="8" gs-h="4">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Revenue Overview" icon="chart-line">
                  <div style={{ height: '100%', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '20px' }}>
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((height, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${height}%`,
                          backgroundColor: colors.primaryMain,
                          borderRadius: '4px 4px 0 0',
                          opacity: 0.7 + (i * 0.025),
                        }}
                      />
                    ))}
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="8" gs-y="2" gs-w="4" gs-h="4">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Top Products" icon="star">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                      { name: 'Product Alpha', sales: 1234, progress: 85 },
                      { name: 'Product Beta', sales: 987, progress: 72 },
                      { name: 'Product Gamma', sales: 756, progress: 58 },
                      { name: 'Product Delta', sales: 543, progress: 45 },
                    ].map((product, i) => (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13px', color: colors.textPrimary }}>{product.name}</span>
                          <span style={{ fontSize: '12px', color: colors.textMuted }}>{product.sales} sales</span>
                        </div>
                        <div style={{ height: '6px', backgroundColor: colors.grey300, borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${product.progress}%`, backgroundColor: colors.primaryMain, borderRadius: '3px' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="0" gs-y="6" gs-w="6" gs-h="3">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Recent Activity" icon="time">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { action: 'New order received', time: '2 min ago', icon: 'cart' },
                      { action: 'User signup completed', time: '15 min ago', icon: 'user' },
                      { action: 'Report generated', time: '1 hour ago', icon: 'document' },
                      { action: 'Payment processed', time: '2 hours ago', icon: 'wallet' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', backgroundColor: colors.grey300, borderRadius: '6px' }}>
                        <Icon name={item.icon} size={16} color={colors.primaryMain} />
                        <span style={{ flex: 1, color: colors.textPrimary, fontSize: '14px' }}>{item.action}</span>
                        <span style={{ color: colors.textMuted, fontSize: '12px' }}>{item.time}</span>
                      </div>
                    ))}
                  </div>
                </DashboardWidget>
              </div>
            </div>

            <div className="grid-stack-item" gs-x="6" gs-y="6" gs-w="6" gs-h="3">
              <div className="grid-stack-item-content">
                <DashboardWidget title="Team Performance" icon="user-multiple">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { name: 'Sarah Chen', role: 'Sales Lead', score: 95, avatar: 'SC' },
                      { name: 'Mike Roberts', role: 'Support', score: 88, avatar: 'MR' },
                      { name: 'Lisa Wong', role: 'Marketing', score: 82, avatar: 'LW' },
                    ].map((member, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: colors.primaryMain,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: colors.textInverse,
                          fontSize: '12px',
                          fontWeight: 500,
                        }}>
                          {member.avatar}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', color: colors.textPrimary, fontWeight: 500 }}>{member.name}</div>
                          <div style={{ fontSize: '12px', color: colors.textMuted }}>{member.role}</div>
                        </div>
                        <div style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: member.score >= 90 ? colors.successMain : member.score >= 80 ? colors.warningMain : colors.grey300,
                          color: member.score >= 80 ? colors.textInverse : colors.textPrimary,
                          fontSize: '12px',
                          fontWeight: 500,
                        }}>
                          {member.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </DashboardWidget>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', height: '100%' }}>
          {currentPanelContent && (
            <InlinePanel
              isOpen={!!openRightPanel}
              onClose={() => setOpenRightPanel(null)}
              title={openRightPanel === 'ai-chat' ? '' : currentPanelContent.title}
              width={openRightPanel === 'ai-chat' ? '380px' : '320px'}
            >
              {currentPanelContent.content}
            </InlinePanel>
          )}

          <NavigationRail
            menuItems={rightMenuItems}
            currentPath={openRightPanel ? `/${openRightPanel}` : ''}
            onNavigate={handleRightNavigate}
            collapsed={true}
            position="right"
            theme="light"
            showTooltips={true}
          />
        </div>
      </div>
    </div>
  );
};

// Export all templates
export default {
  ODLDashboardTemplate,
  ODLTablePageTemplate,
  ODLFormPageTemplate,
  ODLDetailPageTemplate,
  ODLCardsGridTemplate,
  ODLAppShellTemplate,
  ODLAdaptiveListTemplate,
  ODLEditorPageTemplate,
  ODLAdaptiveDashboardTemplate,
};
