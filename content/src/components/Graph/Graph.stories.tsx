import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Graph from './Graph';

const meta: Meta<typeof Graph> = {
  title: 'Components/DataVisualization/Graph',
  component: Graph,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Graph component built on Recharts. Supports multiple chart types including line, area, bar, pie, radar, scatter, composed, radial, and treemap. Fully customizable with animations, grid, legend, and tooltip support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['line', 'area', 'bar', 'pie', 'radar', 'scatter', 'composed', 'radial', 'treemap'],
      description: 'Type of chart to display',
      table: {
        type: { summary: 'string' },
      },
    },
    width: {
      control: 'text',
      description: 'Width of the chart',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '100%' },
      },
    },
    height: {
      control: 'number',
      description: 'Height of the chart',
      table: {
        type: { summary: 'string | number' },
        defaultValue: { summary: '400' },
      },
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showLegend: {
      control: 'boolean',
      description: 'Show legend',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show tooltip on hover',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    stacked: {
      control: 'boolean',
      description: 'Stack multiple data series (bar/area)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    curved: {
      control: 'boolean',
      description: 'Use curved lines (line/area)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    gradient: {
      control: 'boolean',
      description: 'Use gradient fill (area)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const monthlyData = [
  { name: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },
  { name: 'Feb', revenue: 3800, expenses: 2100, profit: 1700 },
  { name: 'Mar', revenue: 5100, expenses: 2800, profit: 2300 },
  { name: 'Apr', revenue: 4600, expenses: 2200, profit: 2400 },
  { name: 'May', revenue: 6200, expenses: 3100, profit: 3100 },
  { name: 'Jun', revenue: 5800, expenses: 2900, profit: 2900 },
  { name: 'Jul', revenue: 7200, expenses: 3400, profit: 3800 },
  { name: 'Aug', revenue: 6800, expenses: 3200, profit: 3600 },
  { name: 'Sep', revenue: 7600, expenses: 3600, profit: 4000 },
  { name: 'Oct', revenue: 8200, expenses: 3800, profit: 4400 },
  { name: 'Nov', revenue: 9100, expenses: 4200, profit: 4900 },
  { name: 'Dec', revenue: 10200, expenses: 4600, profit: 5600 },
];

const categoryData = [
  { name: 'Design', value: 450 },
  { name: 'Development', value: 780 },
  { name: 'Marketing', value: 320 },
  { name: 'Sales', value: 560 },
  { name: 'Support', value: 290 },
];

const performanceData = [
  { subject: 'Performance', value: 85, benchmark: 75 },
  { subject: 'Accessibility', value: 92, benchmark: 80 },
  { subject: 'SEO', value: 78, benchmark: 70 },
  { subject: 'Best Practices', value: 88, benchmark: 82 },
  { subject: 'PWA', value: 72, benchmark: 68 },
];

const scatterData = [
  { x: 100, y: 200 },
  { x: 120, y: 100 },
  { x: 170, y: 300 },
  { x: 140, y: 250 },
  { x: 150, y: 400 },
  { x: 110, y: 280 },
  { x: 180, y: 350 },
  { x: 200, y: 450 },
  { x: 190, y: 380 },
  { x: 160, y: 320 },
];

export const LineChart: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses'],
    xAxisKey: 'name',
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Monthly Revenue vs Expenses</h3>
      <Graph {...args} />
    </div>
  ),
};

export const LineChartMultiSeries: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses', 'profit'],
    xAxisKey: 'name',
    height: 400,
    yAxisLabel: 'Amount ($)',
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Financial Overview</h3>
      <Graph {...args} />
    </div>
  ),
};

export const BarChart: Story = {
  args: {
    type: 'bar',
    data: categoryData,
    dataKeys: ['value'],
    xAxisKey: 'name',
    height: 400,
    yAxisLabel: 'Hours',
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Time by Department</h3>
      <Graph {...args} />
    </div>
  ),
};

export const BarChartStacked: Story = {
  args: {
    type: 'bar',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses'],
    xAxisKey: 'name',
    height: 400,
    stacked: true,
    yAxisLabel: 'Amount ($)',
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Stacked Revenue & Expenses</h3>
      <Graph {...args} />
    </div>
  ),
};

export const AreaChart: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses'],
    xAxisKey: 'name',
    height: 400,
    gradient: false,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Revenue Trend</h3>
      <Graph {...args} />
    </div>
  ),
};

export const AreaChartWithGradient: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    dataKeys: ['revenue', 'profit'],
    xAxisKey: 'name',
    height: 400,
    gradient: true,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Revenue & Profit with Gradient</h3>
      <Graph {...args} />
    </div>
  ),
};

export const AreaChartStacked: Story = {
  args: {
    type: 'area',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses', 'profit'],
    xAxisKey: 'name',
    height: 400,
    stacked: true,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Stacked Financial Data</h3>
      <Graph {...args} />
    </div>
  ),
};

export const PieChart: Story = {
  args: {
    type: 'pie',
    data: categoryData,
    dataKeys: ['value'],
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Department Distribution</h3>
      <Graph {...args} />
    </div>
  ),
};

export const RadarChart: Story = {
  args: {
    type: 'radar',
    data: performanceData,
    dataKeys: ['value', 'benchmark'],
    xAxisKey: 'subject',
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Performance Metrics</h3>
      <Graph {...args} />
    </div>
  ),
};

export const ScatterChart: Story = {
  args: {
    type: 'scatter',
    data: scatterData,
    dataKeys: ['x', 'y'],
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Data Distribution</h3>
      <Graph {...args} />
    </div>
  ),
};

export const ComposedChart: Story = {
  args: {
    type: 'composed',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses', 'profit'],
    xAxisKey: 'name',
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Combined Chart Types</h3>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#525252' }}>
        Bar: Revenue | Line: Expenses | Area: Profit
      </p>
      <Graph {...args} />
    </div>
  ),
};

export const RadialBarChart: Story = {
  args: {
    type: 'radial',
    data: categoryData,
    dataKeys: ['value'],
    height: 400,
  },
  render: (args) => (
    <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 600 }}>Radial Progress</h3>
      <Graph {...args} />
    </div>
  ),
};

export const AllChartTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Line Chart</h4>
        <Graph type="line" data={monthlyData} dataKeys={['revenue', 'expenses']} xAxisKey="name" height={300} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Bar Chart</h4>
        <Graph type="bar" data={categoryData} dataKeys={['value']} xAxisKey="name" height={300} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Area Chart</h4>
        <Graph type="area" data={monthlyData} dataKeys={['revenue']} xAxisKey="name" height={300} gradient={true} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Pie Chart</h4>
        <Graph type="pie" data={categoryData} dataKeys={['value']} height={300} />
      </div>
    </div>
  ),
};

export const CompactCharts: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Revenue</h4>
        <Graph
          type="line"
          data={monthlyData}
          dataKeys={['revenue']}
          xAxisKey="name"
          height={120}
          showLegend={false}
          showGrid={false}
        />
      </div>

      <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Distribution</h4>
        <Graph
          type="pie"
          data={categoryData.slice(0, 4)}
          dataKeys={['value']}
          height={120}
          showTooltip={true}
        />
      </div>

      <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Expenses</h4>
        <Graph
          type="bar"
          data={monthlyData.slice(0, 6)}
          dataKeys={['expenses']}
          xAxisKey="name"
          height={120}
          showLegend={false}
        />
      </div>

      <div style={{ background: 'white', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Profit Trend</h4>
        <Graph
          type="area"
          data={monthlyData.slice(0, 6)}
          dataKeys={['profit']}
          xAxisKey="name"
          height={120}
          gradient={true}
          showLegend={false}
        />
      </div>
    </div>
  ),
};

export const CustomizationOptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>With Grid</h4>
        <Graph type="line" data={monthlyData} dataKeys={['revenue']} xAxisKey="name" height={250} showGrid={true} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Without Grid</h4>
        <Graph type="line" data={monthlyData} dataKeys={['revenue']} xAxisKey="name" height={250} showGrid={false} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>No Animation</h4>
        <Graph type="bar" data={categoryData} dataKeys={['value']} xAxisKey="name" height={250} animated={false} />
      </div>

      <div style={{ background: 'white', padding: '24px', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Linear (Not Curved)</h4>
        <Graph type="line" data={monthlyData} dataKeys={['revenue']} xAxisKey="name" height={250} curved={false} />
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    type: 'line',
    data: monthlyData,
    dataKeys: ['revenue', 'expenses'],
    xAxisKey: 'name',
    height: 400,
    animated: true,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    stacked: false,
    curved: true,
    gradient: false,
  },
};
