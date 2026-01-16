import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useRef, useState } from 'react';
import { GridStack } from 'gridstack';
import 'gridstack/dist/gridstack.min.css';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta = {
  title: 'Design System/Components/GridStack',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs', 'Ready for dev'],
};

export default meta;
type Story = StoryObj;

interface DashboardWidgetProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  onRemove?: () => void;
}

const DashboardWidget: React.FC<DashboardWidgetProps> = ({ title, icon, children, onRemove }) => {
  const { colors } = useTheme();

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.paper,
      borderRadius: '8px',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: `1px solid ${colors.border}`,
        backgroundColor: colors.grey300,
        cursor: 'move',
      }} className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <Icon name={icon} size={18} color={colors.primaryMain} />}
          <span style={{ fontWeight: 600, fontSize: '14px', color: colors.textPrimary }}>{title}</span>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="close" size={16} color={colors.textMuted} />
          </button>
        )}
      </div>
      <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
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
            <span style="font-weight: 600; font-size: 14px; color: ${colors.textPrimary}">${randomWidget.title}</span>
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

export const WidgetStates: Story = {
  name: '06 Widget States',
  render: () => {
    const { colors } = useTheme();

    interface StateWidgetProps {
      title: string;
      state: 'default' | 'hover' | 'dragging' | 'locked' | 'disabled';
      icon?: string;
      children: React.ReactNode;
    }

    const StateWidget: React.FC<StateWidgetProps> = ({ title, state, icon, children }) => {
      const getStateStyles = () => {
        switch (state) {
          case 'hover':
            return {
              border: `2px solid ${colors.primaryMain}`,
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
              transform: 'translateY(-2px)',
            };
          case 'dragging':
            return {
              border: `2px dashed ${colors.primaryMain}`,
              boxShadow: `0 8px 24px rgba(0, 0, 0, 0.2)`,
              transform: 'rotate(2deg) scale(1.02)',
              opacity: 0.9,
            };
          case 'locked':
            return {
              border: `1px solid ${colors.border}`,
              backgroundColor: colors.grey300,
            };
          case 'disabled':
            return {
              border: `1px solid ${colors.border}`,
              opacity: 0.5,
              pointerEvents: 'none' as const,
            };
          default:
            return {
              border: `1px solid ${colors.border}`,
            };
        }
      };

      const getHeaderStyles = () => {
        switch (state) {
          case 'hover':
            return {
              backgroundColor: colors.primaryMain,
              color: colors.textInverse,
            };
          case 'dragging':
            return {
              backgroundColor: colors.primaryMain,
              color: colors.textInverse,
            };
          case 'locked':
            return {
              backgroundColor: colors.grey300,
              cursor: 'not-allowed',
            };
          case 'disabled':
            return {
              backgroundColor: colors.grey300,
              cursor: 'not-allowed',
            };
          default:
            return {
              backgroundColor: colors.grey300,
              cursor: 'move',
            };
        }
      };

      const stateStyles = getStateStyles();
      const headerStyles = getHeaderStyles();

      return (
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: state === 'locked' ? colors.grey300 : colors.paper,
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          ...stateStyles,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: `1px solid ${colors.border}`,
            ...headerStyles,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {icon && (
                <Icon
                  name={icon}
                  size={18}
                  color={state === 'hover' || state === 'dragging' ? colors.textInverse : state === 'disabled' ? colors.textMuted : colors.primaryMain}
                />
              )}
              <span style={{
                fontWeight: 600,
                fontSize: '14px',
                color: state === 'hover' || state === 'dragging' ? colors.textInverse : state === 'disabled' ? colors.textMuted : colors.textPrimary
              }}>
                {title}
              </span>
            </div>
            {state === 'locked' && (
              <Icon name="lock" size={16} color={colors.textMuted} />
            )}
            {state === 'dragging' && (
              <Icon name="draggable" size={16} color={colors.textInverse} />
            )}
          </div>
          <div style={{
            flex: 1,
            padding: '16px',
            overflow: 'auto',
            color: state === 'disabled' ? colors.textMuted : colors.textPrimary,
          }}>
            {children}
          </div>
          <div style={{
            padding: '8px 16px',
            borderTop: `1px solid ${colors.border}`,
            backgroundColor: state === 'locked' || state === 'disabled' ? colors.grey300 : colors.paper,
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: state === 'hover' ? colors.primaryMain :
                     state === 'dragging' ? colors.warningMain :
                     state === 'locked' ? colors.textMuted :
                     state === 'disabled' ? colors.textMuted :
                     colors.textSecondary,
            }}>
              {state === 'default' && 'Default State'}
              {state === 'hover' && 'Hover State'}
              {state === 'dragging' && 'Dragging State'}
              {state === 'locked' && 'Locked State'}
              {state === 'disabled' && 'Disabled State'}
            </span>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: '24px', backgroundColor: colors.default, minHeight: '100vh' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: 600, color: colors.textPrimary }}>
            Widget States
          </h1>
          <p style={{ margin: 0, color: colors.textSecondary }}>
            Visual representation of different widget states in the GridStack layout.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          <div style={{ height: '220px' }}>
            <StateWidget title="Default Widget" state="default" icon="dashboard">
              <div style={{ color: colors.textSecondary }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>This is the default widget state.</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
                  <li>Normal border appearance</li>
                  <li>Standard background color</li>
                  <li>Cursor shows as "move"</li>
                  <li>Ready for interaction</li>
                </ul>
              </div>
            </StateWidget>
          </div>

          <div style={{ height: '220px' }}>
            <StateWidget title="Hover Widget" state="hover" icon="cursor-1">
              <div style={{ color: colors.textSecondary }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Widget appearance on mouse hover.</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
                  <li>Primary color border</li>
                  <li>Elevated shadow effect</li>
                  <li>Slight upward lift</li>
                  <li>Header highlights</li>
                </ul>
              </div>
            </StateWidget>
          </div>

          <div style={{ height: '220px' }}>
            <StateWidget title="Dragging Widget" state="dragging" icon="move">
              <div style={{ color: colors.textSecondary }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Widget appearance while being dragged.</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
                  <li>Dashed border indicator</li>
                  <li>Strong shadow effect</li>
                  <li>Slight rotation</li>
                  <li>Reduced opacity</li>
                </ul>
              </div>
            </StateWidget>
          </div>

          <div style={{ height: '220px' }}>
            <StateWidget title="Locked Widget" state="locked" icon="lock">
              <div style={{ color: colors.textSecondary }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Widget that cannot be moved or resized.</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
                  <li>Lock icon displayed</li>
                  <li>Muted background</li>
                  <li>Cursor not-allowed</li>
                  <li>Position is fixed</li>
                </ul>
              </div>
            </StateWidget>
          </div>

          <div style={{ height: '220px' }}>
            <StateWidget title="Disabled Widget" state="disabled" icon="view-off">
              <div>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Widget that is completely disabled.</p>
                <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px' }}>
                  <li>Reduced opacity (50%)</li>
                  <li>No pointer events</li>
                  <li>Muted colors</li>
                  <li>Non-interactive</li>
                </ul>
              </div>
            </StateWidget>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: colors.textPrimary }}>
            State Transitions
          </h2>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '24px',
            backgroundColor: colors.paper,
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            overflowX: 'auto',
          }}>
            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 8px',
                borderRadius: '8px',
                backgroundColor: colors.paper,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="dashboard" size={24} color={colors.primaryMain} />
              </div>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>Default</span>
            </div>

            <Icon name="arrow-right" size={20} color={colors.textMuted} />

            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 8px',
                borderRadius: '8px',
                backgroundColor: colors.paper,
                border: `2px solid ${colors.primaryMain}`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="cursor-1" size={24} color={colors.primaryMain} />
              </div>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>Hover</span>
            </div>

            <Icon name="arrow-right" size={20} color={colors.textMuted} />

            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 8px',
                borderRadius: '8px',
                backgroundColor: colors.paper,
                border: `2px dashed ${colors.primaryMain}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                transform: 'rotate(2deg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="move" size={24} color={colors.primaryMain} />
              </div>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>Dragging</span>
            </div>

            <Icon name="arrow-right" size={20} color={colors.textMuted} />

            <div style={{ textAlign: 'center', minWidth: '100px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 8px',
                borderRadius: '8px',
                backgroundColor: colors.paper,
                border: `1px solid ${colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon name="checkmark" size={24} color={colors.successMain} />
              </div>
              <span style={{ fontSize: '12px', color: colors.textSecondary }}>Dropped</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '32px' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 600, color: colors.textPrimary }}>
            State Properties
          </h2>
          <div style={{
            backgroundColor: colors.paper,
            borderRadius: '8px',
            border: `1px solid ${colors.border}`,
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ backgroundColor: colors.grey300 }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>State</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>Border</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>Shadow</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>Cursor</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>Interaction</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '12px 16px', color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textSecondary }} />
                      Default
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>1px solid</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>None</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>move</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>Drag & Resize</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.primaryMain }} />
                      Hover
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>2px solid primary</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>Elevated (4px)</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>grab</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>Ready to drag</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.warningMain }} />
                      Dragging
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>2px dashed primary</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>Strong (8px)</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>grabbing</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>Being moved</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', color: colors.textPrimary, borderBottom: `1px solid ${colors.border}` }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.textMuted }} />
                      Locked
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>1px solid</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>None</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>not-allowed</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary, borderBottom: `1px solid ${colors.border}` }}>View only</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 16px', color: colors.textPrimary }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.grey600 }} />
                      Disabled
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary }}>1px solid (50% opacity)</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary }}>None</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary }}>default</td>
                  <td style={{ padding: '12px 16px', color: colors.textSecondary }}>None</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  },
};
