import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import NivoCharts from './NivoCharts';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof NivoCharts> = {
  title: 'Design System/Components/NivoCharts',
  component: NivoCharts,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Powerful charting components powered by Nivo. Supports bar, line, pie, radar, and heatmap charts with full theming support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'pie', 'radar', 'heatmap'],
      description: 'Type of chart to render',
    },
    height: {
      control: 'text',
      description: 'Chart height',
    },
    animate: {
      control: 'boolean',
      description: 'Enable animations',
    },
    legends: {
      control: 'boolean',
      description: 'Show legends',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const barData = [
  { month: 'Jan', sales: 120, expenses: 80, profit: 40 },
  { month: 'Feb', sales: 150, expenses: 90, profit: 60 },
  { month: 'Mar', sales: 180, expenses: 100, profit: 80 },
  { month: 'Apr', sales: 140, expenses: 85, profit: 55 },
  { month: 'May', sales: 200, expenses: 110, profit: 90 },
  { month: 'Jun', sales: 220, expenses: 120, profit: 100 },
];

const lineData = [
  {
    id: 'Revenue',
    data: [
      { x: 'Jan', y: 120 },
      { x: 'Feb', y: 150 },
      { x: 'Mar', y: 180 },
      { x: 'Apr', y: 140 },
      { x: 'May', y: 200 },
      { x: 'Jun', y: 220 },
    ],
  },
  {
    id: 'Costs',
    data: [
      { x: 'Jan', y: 80 },
      { x: 'Feb', y: 90 },
      { x: 'Mar', y: 100 },
      { x: 'Apr', y: 85 },
      { x: 'May', y: 110 },
      { x: 'Jun', y: 120 },
    ],
  },
];

const pieData = [
  { id: 'Desktop', label: 'Desktop', value: 45 },
  { id: 'Mobile', label: 'Mobile', value: 35 },
  { id: 'Tablet', label: 'Tablet', value: 15 },
  { id: 'Other', label: 'Other', value: 5 },
];

const radarData = [
  { category: 'Speed', frontend: 80, backend: 90, devops: 70 },
  { category: 'Reliability', frontend: 70, backend: 95, devops: 85 },
  { category: 'Scalability', frontend: 60, backend: 85, devops: 90 },
  { category: 'Security', frontend: 65, backend: 80, devops: 95 },
  { category: 'Usability', frontend: 95, backend: 60, devops: 50 },
];

const heatmapData = [
  { id: 'Mon', data: [{ x: '9am', y: 10 }, { x: '12pm', y: 25 }, { x: '3pm', y: 45 }, { x: '6pm', y: 30 }] },
  { id: 'Tue', data: [{ x: '9am', y: 15 }, { x: '12pm', y: 35 }, { x: '3pm', y: 50 }, { x: '6pm', y: 40 }] },
  { id: 'Wed', data: [{ x: '9am', y: 20 }, { x: '12pm', y: 40 }, { x: '3pm', y: 55 }, { x: '6pm', y: 35 }] },
  { id: 'Thu', data: [{ x: '9am', y: 12 }, { x: '12pm', y: 30 }, { x: '3pm', y: 48 }, { x: '6pm', y: 38 }] },
  { id: 'Fri', data: [{ x: '9am', y: 8 }, { x: '12pm', y: 28 }, { x: '3pm', y: 42 }, { x: '6pm', y: 25 }] },
];

export const BarChart: Story = {
  name: '01 Bar Chart',
  args: {
    type: 'bar',
    data: barData,
    keys: ['sales', 'expenses', 'profit'],
    indexBy: 'month',
    height: '400px',
  },
};

export const BarChartStacked: Story = {
  name: '02 Bar Chart (Stacked)',
  args: {
    type: 'bar',
    data: barData,
    keys: ['sales', 'expenses', 'profit'],
    indexBy: 'month',
    groupMode: 'stacked',
    height: '400px',
  },
};

export const BarChartHorizontal: Story = {
  name: '03 Bar Chart (Horizontal)',
  args: {
    type: 'bar',
    data: barData,
    keys: ['sales'],
    indexBy: 'month',
    layout: 'horizontal',
    height: '400px',
  },
};

export const LineChart: Story = {
  name: '04 Line Chart',
  args: {
    type: 'line',
    data: lineData,
    height: '400px',
  },
};

export const PieChart: Story = {
  name: '05 Pie Chart',
  args: {
    type: 'pie',
    data: pieData,
    height: '400px',
    innerRadius: 0,
  },
};

export const DonutChart: Story = {
  name: '06 Donut Chart',
  args: {
    type: 'pie',
    data: pieData,
    height: '400px',
    innerRadius: 0.6,
  },
};

export const RadarChart: Story = {
  name: '07 Radar Chart',
  args: {
    type: 'radar',
    data: radarData,
    keys: ['frontend', 'backend', 'devops'],
    indexBy: 'category',
    height: '450px',
  },
};

export const HeatmapChart: Story = {
  name: '08 Heatmap Chart',
  args: {
    type: 'heatmap',
    data: heatmapData,
    height: '350px',
  },
};

export const ChartWithoutLegends: Story = {
  name: '09 Chart Without Legends',
  args: {
    type: 'bar',
    data: barData,
    keys: ['sales', 'expenses'],
    indexBy: 'month',
    height: '400px',
    legends: false,
    margin: { top: 50, right: 30, bottom: 50, left: 60 },
  },
};

export const ChartWithoutAnimation: Story = {
  name: '10 Chart Without Animation',
  args: {
    type: 'bar',
    data: barData,
    keys: ['sales'],
    indexBy: 'month',
    height: '400px',
    animate: false,
  },
};

export const AllChartTypes: Story = {
  name: '11 All Chart Types',
  render: () => {
    const { colors } = useTheme();

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Bar Chart</h3>
          <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
            <NivoCharts
              type="bar"
              data={barData}
              keys={['sales', 'expenses', 'profit']}
              indexBy="month"
              height="300px"
            />
          </div>
        </div>

        <div>
          <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Line Chart</h3>
          <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
            <NivoCharts
              type="line"
              data={lineData}
              height="300px"
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Pie Chart</h3>
            <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
              <NivoCharts
                type="pie"
                data={pieData}
                height="300px"
                innerRadius={0}
              />
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Donut Chart</h3>
            <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
              <NivoCharts
                type="pie"
                data={pieData}
                height="300px"
                innerRadius={0.6}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
          <div>
            <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Radar Chart</h3>
            <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
              <NivoCharts
                type="radar"
                data={radarData}
                keys={['frontend', 'backend', 'devops']}
                indexBy="category"
                height="350px"
              />
            </div>
          </div>

          <div>
            <h3 style={{ margin: '0 0 16px 0', color: colors.textPrimary, fontSize: '16px', fontWeight: 600 }}>Heatmap Chart</h3>
            <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '16px', border: `1px solid ${colors.border}` }}>
              <NivoCharts
                type="heatmap"
                data={heatmapData}
                height="300px"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const DashboardExample: Story = {
  name: '12 Dashboard Example',
  render: () => {
    const { colors } = useTheme();

    const revenueData = [
      {
        id: 'This Year',
        data: [
          { x: 'Q1', y: 450 },
          { x: 'Q2', y: 520 },
          { x: 'Q3', y: 610 },
          { x: 'Q4', y: 720 },
        ],
      },
      {
        id: 'Last Year',
        data: [
          { x: 'Q1', y: 380 },
          { x: 'Q2', y: 420 },
          { x: 'Q3', y: 480 },
          { x: 'Q4', y: 550 },
        ],
      },
    ];

    const departmentData = [
      { id: 'Engineering', label: 'Engineering', value: 35 },
      { id: 'Sales', label: 'Sales', value: 25 },
      { id: 'Marketing', label: 'Marketing', value: 20 },
      { id: 'Operations', label: 'Operations', value: 15 },
      { id: 'HR', label: 'HR', value: 5 },
    ];

    const performanceData = [
      { month: 'Jan', completed: 45, pending: 12, cancelled: 3 },
      { month: 'Feb', completed: 52, pending: 8, cancelled: 5 },
      { month: 'Mar', completed: 61, pending: 15, cancelled: 2 },
      { month: 'Apr', completed: 48, pending: 10, cancelled: 4 },
      { month: 'May', completed: 58, pending: 7, cancelled: 3 },
      { month: 'Jun', completed: 65, pending: 9, cancelled: 1 },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h2 style={{ margin: 0, color: colors.textPrimary, fontSize: '20px', fontWeight: 600 }}>Analytics Dashboard</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '20px', border: `1px solid ${colors.border}` }}>
            <h3 style={{ margin: '0 0 4px 0', color: colors.textPrimary, fontSize: '14px', fontWeight: 600 }}>Revenue Comparison</h3>
            <p style={{ margin: '0 0 16px 0', color: colors.textSecondary, fontSize: '12px' }}>Quarterly revenue year-over-year</p>
            <NivoCharts
              type="line"
              data={revenueData}
              height="250px"
              margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
            />
          </div>

          <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '20px', border: `1px solid ${colors.border}` }}>
            <h3 style={{ margin: '0 0 4px 0', color: colors.textPrimary, fontSize: '14px', fontWeight: 600 }}>Team Distribution</h3>
            <p style={{ margin: '0 0 16px 0', color: colors.textSecondary, fontSize: '12px' }}>Headcount by department</p>
            <NivoCharts
              type="pie"
              data={departmentData}
              height="250px"
              innerRadius={0.5}
            />
          </div>
        </div>

        <div style={{ backgroundColor: colors.paper, borderRadius: '8px', padding: '20px', border: `1px solid ${colors.border}` }}>
          <h3 style={{ margin: '0 0 4px 0', color: colors.textPrimary, fontSize: '14px', fontWeight: 600 }}>Task Performance</h3>
          <p style={{ margin: '0 0 16px 0', color: colors.textSecondary, fontSize: '12px' }}>Monthly task completion metrics</p>
          <NivoCharts
            type="bar"
            data={performanceData}
            keys={['completed', 'pending', 'cancelled']}
            indexBy="month"
            height="300px"
            groupMode="stacked"
          />
        </div>
      </div>
    );
  },
};
