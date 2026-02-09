import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import Maps from '../Maps/Maps';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta = {
  title: 'Design System/Components/Widgets',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'Ready for dev'],
};

export default meta;
type Story = StoryObj;

const GridStackStyles: React.FC<{ primaryColor: string; textPrimaryColor: string }> = ({ primaryColor, textPrimaryColor }) => (
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
      background: ${primaryColor} url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 32 32' fill='white'%3E%3Cpath d='M28 28H16v-2h10V16h2z'/%3E%3Cpath d='M4 4h12v2H6v10H4z'/%3E%3C/svg%3E") center center no-repeat !important;
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
      border: 2px solid ${primaryColor} !important;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
      transform: rotate(1deg) scale(1.01);
    }
    .grid-stack-item.ui-draggable-dragging > .ui-resizable-se,
    .grid-stack-item.gs-dragging > .ui-resizable-se {
      opacity: 1;
    }
  `}</style>
);

interface IconButtonConfig {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
}

interface DashboardWidgetProps {
  title: string;
  icon?: string;
  description?: string;
  iconButtons?: IconButtonConfig[];
  children: React.ReactNode;
  onRemove?: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, icon, description, iconButtons, children, onRemove }) => {
  const { colors } = useTheme();
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
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backgroundColor: colors.paper,
        cursor: 'move',
        borderRadius: '6px 6px 0 0',
      }} className="widget-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isHovered && <Icon name="draggable" size={18} color={colors.textPrimary} />}
            {icon && <Icon name={icon} size={18} color={colors.primaryMain} />}
            <span style={{ fontWeight: 600, fontSize: '18px', color: colors.textPrimary }}>{title}</span>
          </div>
          {description && (
            <span style={{ fontSize: '14px', color: colors.textSecondary, marginLeft: icon ? '26px' : isHovered ? '26px' : '0' }}>{description}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {iconButtons && iconButtons.map((btn, index) => (
            <IconButton
              key={index}
              icon={btn.icon}
              onClick={btn.onClick}
              title={btn.tooltip}
              aria-label={btn.tooltip || btn.icon}
              variant="disabled"
              size="small"
            />
          ))}
          {onRemove && (
            <IconButton
              icon="close"
              onClick={onRemove}
              aria-label="Remove widget"
              variant="disabled"
              size="small"
            />
          )}
        </div>
      </div>
      <div style={{ flex: 1, padding: '16px', overflow: 'auto', borderRadius: '0 0 6px 6px' }}>
        {children}
      </div>
    </div>
  );
};

export const Default: Story = {
  name: '01 Basic Grid',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInstance = useRef<GridStack | null>(null);

    useEffect(() => {
      if (!gridRef.current) return;

      gridInstance.current = GridStack.init({
        column: 12,
        cellHeight: 80,
        margin: 10,
        animate: true,
        float: false,
      }, gridRef.current);

      return () => {
        gridInstance.current?.destroy(false);
      };
    }, []);

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
            GridStack.js Basic Example
          </h1>
          <p style={{ margin: 0, color: colors.textSecondary }}>
            Drag and resize the widgets to rearrange the dashboard layout.
          </p>
        </div>

        <div ref={gridRef} className="grid-stack">
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Sales Overview" icon="chart-line">
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>$24,500</div>
                  <div>Total sales this month</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Active Users" icon="user-multiple">
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.successMain, marginBottom: '8px' }}>1,234</div>
                  <div>Currently online</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Pending Tasks" icon="calendar">
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.warningMain, marginBottom: '8px' }}>42</div>
                  <div>Tasks awaiting completion</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="0" gs-y="2" gs-w="6" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Recent Activity" icon="time">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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

          <div className="grid-stack-item" gs-x="6" gs-y="2" gs-w="6" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Quick Actions" icon="flash">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { label: 'New Project', icon: 'add', color: colors.primaryMain },
                    { label: 'Upload File', icon: 'upload', color: colors.successMain },
                    { label: 'Send Message', icon: 'email', color: colors.warningMain },
                    { label: 'View Reports', icon: 'chart-bar', color: colors.errorMain },
                  ].map((action, i) => (
                    <button key={i} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '16px',
                      backgroundColor: colors.grey300,
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}>
                      <Icon name={action.icon} size={24} color={action.color} />
                      <span style={{ fontSize: '13px', color: colors.textPrimary }}>{action.label}</span>
                    </button>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DynamicWidgets: Story = {
  name: '02 Dynamic Widgets',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInstance = useRef<GridStack | null>(null);
    const [widgetCount, setWidgetCount] = useState(0);

    useEffect(() => {
      if (!gridRef.current) return;

      gridInstance.current = GridStack.init({
        column: 12,
        cellHeight: 100,
        margin: 10,
        animate: true,
        float: true,
        removable: true,
      }, gridRef.current);

      return () => {
        gridInstance.current?.destroy(false);
      };
    }, []);

    const addWidget = () => {
      if (!gridInstance.current) return;

      const id = `widget-${widgetCount}`;
      setWidgetCount(prev => prev + 1);

      const widgetTypes = [
        { title: 'Stats Widget', icon: 'chart-line', w: 3, h: 2 },
        { title: 'Chart Widget', icon: 'chart-bar', w: 4, h: 3 },
        { title: 'List Widget', icon: 'list', w: 3, h: 2 },
        { title: 'Info Widget', icon: 'information', w: 2, h: 2 },
      ];

      const randomWidget = widgetTypes[Math.floor(Math.random() * widgetTypes.length)];

      const content = `
        <div style="height: 100%; display: flex; flex-direction: column; background: ${colors.paper}; border-radius: 8px; border: 1px solid ${colors.border}; overflow: hidden;">
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid ${colors.border}; background: ${colors.grey300}; cursor: move;">
            <span style="font-weight: 600; font-size: 18px; color: ${colors.textPrimary}">${randomWidget.title}</span>
            <button class="remove-widget" style="background: none; border: none; cursor: pointer; padding: 4px;">✕</button>
          </div>
          <div style="flex: 1; padding: 16px; display: flex; align-items: center; justify-content: center; color: ${colors.textSecondary};">
            Widget #${widgetCount + 1}
          </div>
        </div>
      `;

      gridInstance.current.addWidget({
        id,
        w: randomWidget.w,
        h: randomWidget.h,
        content,
      });
    };

    const clearAll = () => {
      gridInstance.current?.removeAll();
    };

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
              Dynamic Widget Management
            </h1>
            <p style={{ margin: 0, color: colors.textSecondary }}>
              Add, remove, and rearrange widgets dynamically. Float mode enabled.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="primary" onClick={addWidget}>
              <Icon name="add" size={16} /> Add Widget
            </Button>
            <Button variant="secondary" onClick={clearAll}>
              Clear All
            </Button>
          </div>
        </div>

        <div ref={gridRef} className="grid-stack" style={{ minHeight: '400px' }} />
      </div>
    );
  },
};

export const LockedWidgets: Story = {
  name: '03 Locked Widgets',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInstance = useRef<GridStack | null>(null);

    useEffect(() => {
      if (!gridRef.current) return;

      gridInstance.current = GridStack.init({
        column: 12,
        cellHeight: 80,
        margin: 10,
        animate: true,
      }, gridRef.current);

      return () => {
        gridInstance.current?.destroy(false);
      };
    }, []);

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
            Locked Widgets Example
          </h1>
          <p style={{ margin: 0, color: colors.textSecondary }}>
            Some widgets are locked (no drag/resize). Others can be freely moved.
          </p>
        </div>

        <div ref={gridRef} className="grid-stack">
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="12" gs-h="1" gs-no-resize="true" gs-no-move="true">
            <div className="grid-stack-item-content">
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                backgroundColor: colors.primaryMain,
                borderRadius: '8px',
                color: colors.textInverse,
              }}>
                <Icon name="lock" size={18} color={colors.textInverse} />
                <span style={{ marginLeft: '12px', fontWeight: 600 }}>This header widget is locked - cannot move or resize</span>
              </div>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="0" gs-y="1" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Moveable Widget 1" icon="drag-vertical">
                <div style={{ color: colors.textSecondary }}>This widget can be dragged and resized freely.</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="4" gs-y="1" gs-w="4" gs-h="2" gs-no-resize="true">
            <div className="grid-stack-item-content">
              <DashboardWidget title="No Resize Widget" icon="resize">
                <div style={{ color: colors.textSecondary }}>This widget can be moved but not resized.</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="1" gs-w="4" gs-h="2" gs-no-move="true">
            <div className="grid-stack-item-content">
              <DashboardWidget title="No Move Widget" icon="pin">
                <div style={{ color: colors.textSecondary }}>This widget can be resized but not moved.</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="0" gs-y="3" gs-w="6" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Moveable Widget 2" icon="drag-vertical">
                <div style={{ color: colors.textSecondary }}>Another freely moveable widget. Try dragging it around!</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="6" gs-y="3" gs-w="6" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Moveable Widget 3" icon="drag-vertical">
                <div style={{ color: colors.textSecondary }}>Yet another freely moveable widget.</div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const ResponsiveGrid: Story = {
  name: '04 Responsive Grid',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInstance = useRef<GridStack | null>(null);
    const [columnCount, setColumnCount] = useState(12);

    useEffect(() => {
      if (!gridRef.current) return;

      gridInstance.current = GridStack.init({
        column: columnCount,
        cellHeight: 80,
        margin: 10,
        animate: true,
      }, gridRef.current);

      return () => {
        gridInstance.current?.destroy(false);
      };
    }, []);

    useEffect(() => {
      if (gridInstance.current) {
        gridInstance.current.column(columnCount);
      }
    }, [columnCount]);

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
              Responsive Grid Columns
            </h1>
            <p style={{ margin: 0, color: colors.textSecondary }}>
              Change the number of columns to see how widgets adapt.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[4, 6, 8, 12].map((cols) => (
              <button
                key={cols}
                onClick={() => setColumnCount(cols)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: columnCount === cols ? colors.primaryMain : colors.paper,
                  color: columnCount === cols ? colors.textInverse : colors.textPrimary,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                {cols} cols
              </button>
            ))}
          </div>
        </div>

        <div ref={gridRef} className="grid-stack">
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="3" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget A" icon="apps">
                <div style={{ color: colors.textSecondary }}>3 columns wide</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="3" gs-y="0" gs-w="6" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget B" icon="apps">
                <div style={{ color: colors.textSecondary }}>6 columns wide</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="9" gs-y="0" gs-w="3" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget C" icon="apps">
                <div style={{ color: colors.textSecondary }}>3 columns wide</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="0" gs-y="2" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget D" icon="apps">
                <div style={{ color: colors.textSecondary }}>4 columns wide</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="4" gs-y="2" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget E" icon="apps">
                <div style={{ color: colors.textSecondary }}>4 columns wide</div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="2" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Widget F" icon="apps">
                <div style={{ color: colors.textSecondary }}>4 columns wide</div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DashboardExample: Story = {
  name: '05 Dashboard Example',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInstance = useRef<GridStack | null>(null);

    useEffect(() => {
      if (!gridRef.current) return;

      gridInstance.current = GridStack.init({
        column: 12,
        cellHeight: 70,
        margin: 12,
        animate: true,
        float: false,
      }, gridRef.current);

      return () => {
        gridInstance.current?.destroy(false);
      };
    }, []);

    const stats = [
      { label: 'Total Revenue', value: '$48,250', change: '+12.5%', trend: 'up', icon: 'wallet' },
      { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up', icon: 'user-multiple' },
      { label: 'Conversion Rate', value: '3.24%', change: '-2.1%', trend: 'down', icon: 'analytics' },
      { label: 'Avg. Session', value: '4m 32s', change: '+15%', trend: 'up', icon: 'time' },
    ];

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
            Analytics Dashboard
          </h1>
          <p style={{ margin: 0, color: colors.textSecondary }}>
            A complete dashboard example with various widget types. Drag to rearrange.
          </p>
        </div>

        <div ref={gridRef} className="grid-stack">
          {stats.map((stat, i) => (
            <div key={i} className="grid-stack-item" gs-x={i * 3} gs-y="0" gs-w="3" gs-h="2">
              <div className="grid-stack-item-content">
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '16px 20px',
                  backgroundColor: colors.paper,
                  borderRadius: '8px',
                  border: `1px solid ${colors.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Icon name={stat.icon} size={18} color={colors.primaryMain} />
                    <span style={{ fontSize: '13px', color: colors.textMuted }}>{stat.label}</span>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 600, color: colors.textPrimary, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: stat.trend === 'up' ? colors.successMain : colors.errorMain,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <Icon name={stat.trend === 'up' ? 'arrow-up' : 'arrow-down'} size={14} />
                    {stat.change} from last month
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="grid-stack-item" gs-x="0" gs-y="2" gs-w="8" gs-h="4">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Revenue Overview" icon="chart-line">
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'flex-end',
                  gap: '8px',
                  paddingBottom: '20px',
                }}>
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
              <DashboardWidget title="Recent Orders" icon="cart">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { id: '#12345', customer: 'John Doe', amount: '$125.00', status: 'Completed' },
                    { id: '#12346', customer: 'Jane Smith', amount: '$89.50', status: 'Processing' },
                    { id: '#12347', customer: 'Bob Johnson', amount: '$234.00', status: 'Pending' },
                  ].map((order, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '10px 12px',
                      backgroundColor: colors.grey300,
                      borderRadius: '6px',
                      gap: '12px',
                    }}>
                      <span style={{ fontWeight: 500, color: colors.primaryMain, fontSize: '13px' }}>{order.id}</span>
                      <span style={{ flex: 1, color: colors.textPrimary, fontSize: '13px' }}>{order.customer}</span>
                      <span style={{ color: colors.textPrimary, fontWeight: 500, fontSize: '13px' }}>{order.amount}</span>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: 500,
                        backgroundColor: order.status === 'Completed' ? colors.successMain : order.status === 'Processing' ? colors.warningMain : colors.grey300,
                        color: order.status === 'Pending' ? colors.textPrimary : colors.textInverse,
                      }}>
                        {order.status}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="6" gs-y="6" gs-w="6" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget title="Team Activity" icon="user-multiple">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Sarah Chen', action: 'Updated project roadmap', time: '5m ago', avatar: 'SC' },
                    { name: 'Mike Roberts', action: 'Closed 3 support tickets', time: '22m ago', avatar: 'MR' },
                    { name: 'Lisa Wong', action: 'Published new blog post', time: '1h ago', avatar: 'LW' },
                  ].map((activity, i) => (
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
                        {activity.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: colors.textPrimary, fontWeight: 500 }}>{activity.name}</div>
                        <div style={{ fontSize: '12px', color: colors.textMuted }}>{activity.action}</div>
                      </div>
                      <span style={{ fontSize: '11px', color: colors.textMuted }}>{activity.time}</span>
                    </div>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithIconButtons: Story = {
  name: '06 With Icon Buttons',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!gridRef.current) return;
      const grid = GridStack.init({
        column: 12,
        cellHeight: 80,
        margin: 8,
        float: true,
        disableOneColumnMode: true,
      }, gridRef.current);
      return () => grid.destroy(false);
    }, []);

    const iconButtonsConfig = [
      { icon: 'settings', onClick: () => alert('Settings clicked'), tooltip: 'Settings' },
      { icon: 'filter', onClick: () => alert('Filter clicked'), tooltip: 'Filter' },
      { icon: 'overflow-menu-vertical', onClick: () => alert('More options'), tooltip: 'More' },
    ];

    return (
      <div style={{ padding: '20px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <h1 style={{ color: colors.textPrimary, marginBottom: '20px' }}>Widgets with Icon Buttons</h1>
        <p style={{ color: colors.textSecondary, marginBottom: '20px' }}>Widgets can have icon buttons in the header for quick actions.</p>
        <div className="grid-stack" ref={gridRef}>
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Sales Overview"
                icon="chart-line"
                iconButtons={iconButtonsConfig}
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>$24,500</div>
                  <div>Monthly revenue</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Active Users"
                icon="user-multiple"
                iconButtons={[
                  { icon: 'add', onClick: () => alert('Add user'), tooltip: 'Add User' },
                  { icon: 'search', onClick: () => alert('Search'), tooltip: 'Search' },
                  { icon: 'download', onClick: () => alert('Export'), tooltip: 'Export' },
                ]}
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.successMain, marginBottom: '8px' }}>1,234</div>
                  <div>Online now</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Pending Tasks"
                icon="calendar"
                iconButtons={[
                  { icon: 'refresh', onClick: () => alert('Refresh'), tooltip: 'Refresh' },
                  { icon: 'view', onClick: () => alert('View all'), tooltip: 'View All' },
                  { icon: 'edit', onClick: () => alert('Edit'), tooltip: 'Edit' },
                ]}
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.warningMain, marginBottom: '8px' }}>42</div>
                  <div>Requires attention</div>
                </div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithDescription: Story = {
  name: '07 With Description',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!gridRef.current) return;
      const grid = GridStack.init({
        column: 12,
        cellHeight: 80,
        margin: 8,
        float: true,
        disableOneColumnMode: true,
      }, gridRef.current);
      return () => grid.destroy(false);
    }, []);

    return (
      <div style={{ padding: '20px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <h1 style={{ color: colors.textPrimary, marginBottom: '20px' }}>Widgets with Description</h1>
        <p style={{ color: colors.textSecondary, marginBottom: '20px' }}>Widgets can have a secondary description line under the title.</p>
        <div className="grid-stack" ref={gridRef}>
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="4" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Sales Overview"
                description="Monthly performance metrics"
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>$24,500</div>
                  <div>Total revenue this month</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="4" gs-y="0" gs-w="4" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Active Users"
                description="Real-time user activity"
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.successMain, marginBottom: '8px' }}>1,234</div>
                  <div>Currently online</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Pending Tasks"
                description="Tasks requiring your attention"
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.warningMain, marginBottom: '8px' }}>42</div>
                  <div>Due this week</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="0" gs-y="3" gs-w="6" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Recent Activity"
                description="Latest updates from your team"
                iconButtons={[
                  { icon: 'refresh', tooltip: 'Refresh' },
                  { icon: 'filter', tooltip: 'Filter' },
                  { icon: 'overflow-menu-vertical', tooltip: 'More' },
                ]}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { action: 'Created new project', user: 'John D.', time: '5m ago' },
                    { action: 'Completed task', user: 'Sarah M.', time: '12m ago' },
                    { action: 'Added comment', user: 'Mike R.', time: '1h ago' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: colors.grey300, borderRadius: '6px' }}>
                      <div>
                        <div style={{ fontWeight: 500, color: colors.textPrimary }}>{item.action}</div>
                        <div style={{ fontSize: '12px', color: colors.textMuted }}>{item.user}</div>
                      </div>
                      <span style={{ fontSize: '12px', color: colors.textMuted }}>{item.time}</span>
                    </div>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="6" gs-y="3" gs-w="6" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Quick Actions"
                description="Frequently used shortcuts"
                iconButtons={[
                  { icon: 'settings', tooltip: 'Configure' },
                ]}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    { label: 'New Project', icon: 'add' },
                    { label: 'Upload File', icon: 'upload' },
                    { label: 'Invite Team', icon: 'user-multiple' },
                    { label: 'Generate Report', icon: 'document' },
                  ].map((action, i) => (
                    <Button key={i} variant="secondary" size="md" style={{ justifyContent: 'flex-start', gap: '8px' }}>
                      <Icon name={action.icon} size={16} />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithMap: Story = {
  name: '08 With Map',
  render: () => {
    const { colors } = useTheme();
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!gridRef.current) return;
      const grid = GridStack.init({
        column: 12,
        cellHeight: 80,
        margin: 8,
        float: true,
        disableOneColumnMode: true,
      }, gridRef.current);
      return () => grid.destroy(false);
    }, []);

    return (
      <div style={{ padding: '20px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <GridStackStyles primaryColor={colors.primaryMain} textPrimaryColor={colors.textPrimary} />
        <h1 style={{ color: colors.textPrimary, marginBottom: '20px' }}>Widget with Map</h1>
        <p style={{ color: colors.textSecondary, marginBottom: '20px' }}>Widgets can contain interactive maps with fullscreen and layer controls.</p>
        <div className="grid-stack" ref={gridRef}>
          <div className="grid-stack-item" gs-x="0" gs-y="0" gs-w="8" gs-h="5">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Location Overview"
                description="Office locations worldwide"
                iconButtons={[
                  { icon: 'add', tooltip: 'Add Location' },
                  { icon: 'filter', tooltip: 'Filter' },
                  { icon: 'overflow-menu-vertical', tooltip: 'More' },
                ]}
              >
                <div style={{ margin: '-16px', marginTop: '0', height: 'calc(100% + 16px)' }}>
                  <Maps
                    longitude={150.8931}
                    latitude={-34.4278}
                    zoom={12}
                    height="100%"
                    showFullscreenControl={true}
                    showLayerControl={true}
                    markers={[
                      { id: '1', longitude: 150.8931, latitude: -34.4278, color: colors.primaryMain, popup: '<strong>HQ Office</strong><br/>Wollongong CBD' },
                      { id: '2', longitude: 150.9027, latitude: -34.4048, color: colors.successMain, popup: '<strong>Sales Office</strong><br/>North Wollongong' },
                      { id: '3', longitude: 150.8636, latitude: -34.4988, color: colors.warningMain, popup: '<strong>Warehouse</strong><br/>Port Kembla' },
                    ]}
                  />
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="0" gs-w="4" gs-h="2">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Total Locations"
                icon="location"
              >
                <div style={{ color: colors.textSecondary }}>
                  <div style={{ fontSize: '32px', fontWeight: 600, color: colors.primaryMain, marginBottom: '8px' }}>3</div>
                  <div>Active offices</div>
                </div>
              </DashboardWidget>
            </div>
          </div>

          <div className="grid-stack-item" gs-x="8" gs-y="2" gs-w="4" gs-h="3">
            <div className="grid-stack-item-content">
              <DashboardWidget
                title="Office List"
                icon="list"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { name: 'HQ Office', city: 'Wollongong CBD', status: 'Active' },
                    { name: 'Sales Office', city: 'North Wollongong', status: 'Active' },
                    { name: 'Warehouse', city: 'Port Kembla', status: 'Active' },
                  ].map((office, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '8px 12px',
                      backgroundColor: colors.grey300,
                      borderRadius: '6px',
                      gap: '12px',
                    }}>
                      <Icon name="location" size={16} color={colors.primaryMain} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: colors.textPrimary }}>{office.name}</div>
                        <div style={{ fontSize: '11px', color: colors.textMuted }}>{office.city}</div>
                      </div>
                      <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '10px',
                        fontWeight: 500,
                        backgroundColor: colors.successMain,
                        color: colors.textInverse,
                      }}>
                        {office.status}
                      </span>
                    </div>
                  ))}
                </div>
              </DashboardWidget>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
