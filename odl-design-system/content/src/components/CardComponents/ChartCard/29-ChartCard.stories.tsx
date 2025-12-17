import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ChartCard from './ChartCard';
import Graph from '../../Graph/Graph';

const meta: Meta<typeof ChartCard> = {
  title: 'Design System/Components/ChartCard',
  component: ChartCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL ChartCard component for displaying key metrics with charts. Supports sparklines, custom charts, trend indicators, and action buttons. Perfect for dashboards and analytics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Primary value to display',
      table: {
        disable: true,
        type: { summary: 'string | number' },
      },
    },
    timeframe: {
      control: 'text',
      description: 'Time period label',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['line', 'bar', 'area'],
      description: 'Sparkline chart type',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'line' },
      },
    },
    color: {
      control: 'color',
      description: 'Chart color',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: '#3560C1' },
      },
    },
    icon: {
      control: 'text',
      description: 'Carbon icon name',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
    saved: {
      control: 'boolean',
      description: 'Initial saved state',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sparklineDataRevenue = [4200, 3800, 5100, 4600, 6200, 5800, 7200, 6800, 7600, 8200, 9100, 10200];
const sparklineDataUsers = [1200, 1450, 1380, 1590, 1720, 1680, 1890, 2100, 2250, 2400, 2580, 2750];
const sparklineDataConversion = [2.4, 2.1, 2.8, 2.5, 3.1, 2.9, 3.4, 3.2, 3.6, 3.8, 4.2, 4.6];
const sparklineDataOrders = [145, 138, 162, 155, 178, 172, 195, 188, 205, 218, 232, 248];

const monthlyData = [
  { name: 'Jan', value: 4200 },
  { name: 'Feb', value: 3800 },
  { name: 'Mar', value: 5100 },
  { name: 'Apr', value: 4600 },
  { name: 'May', value: 6200 },
  { name: 'Jun', value: 5800 },
];

export const Default: Story = {
  name: '01 Default',
  args: {
    title: 'Total Revenue',
    value: '$124,592',
    sparklineData: sparklineDataRevenue,
    type: 'line',
    change: {
      value: 8420,
      percentage: 12.5,
      trend: 'up',
    },
    timeframe: 'last 30 days',
  },
};

export const WithLineSparkline: Story = {
  name: '02 With Line Sparkline',
  args: {
    title: 'Monthly Revenue',
    subtitle: 'All products',
    value: '$124,592',
    sparklineData: sparklineDataRevenue,
    type: 'line',
    color: '#3560C1',
    change: {
      value: 8420,
      percentage: 12.5,
      trend: 'up',
    },
    timeframe: 'last 30 days',
    icon: 'currency',
  },
};

export const WithBarSparkline: Story = {
  name: '03 With Bar Sparkline',
  args: {
    title: 'New Customers',
    subtitle: 'Registered users',
    value: '2,750',
    sparklineData: sparklineDataUsers,
    type: 'bar',
    color: '#198038',
    change: {
      value: 170,
      percentage: 6.6,
      trend: 'up',
    },
    timeframe: 'this month',
    icon: 'user-multiple',
  },
};

export const WithAreaSparkline: Story = {
  name: '04 With Area Sparkline',
  args: {
    title: 'Conversion Rate',
    subtitle: 'E-commerce',
    value: '4.6%',
    sparklineData: sparklineDataConversion,
    type: 'area',
    color: '#8A3FFC',
    change: {
      value: 0.8,
      percentage: 21.1,
      trend: 'up',
    },
    timeframe: 'last quarter',
    icon: 'chart-line',
  },
};

export const WithCustomChart: Story = {
  name: '05 With Custom Chart',
  args: {
    title: 'Monthly Sales',
    subtitle: 'Product performance',
    value: '$45,890',
    chart: (
      <Graph
        type="bar"
        data={monthlyData}
        dataKeys={['value']}
        xAxisKey="name"
        height={150}
        showGrid={false}
        showLegend={false}
      />
    ),
    change: {
      value: 3240,
      percentage: 7.8,
      trend: 'up',
    },
    timeframe: 'last 6 months',
    icon: 'shopping-cart',
  },
};

export const WithCustomAreaChart: Story = {
  name: '06 With Custom Area Chart',
  args: {
    title: 'Website Traffic',
    subtitle: 'Unique visitors',
    value: '156,432',
    chart: (
      <Graph
        type="area"
        data={monthlyData}
        dataKeys={['value']}
        xAxisKey="name"
        height={120}
        showGrid={false}
        showLegend={false}
        gradient={true}
      />
    ),
    change: {
      value: 12340,
      percentage: 8.6,
      trend: 'up',
    },
    timeframe: 'last 6 months',
    icon: 'analytics',
  },
};

export const TrendIndicators: Story = {
  name: '07 Trend Indicators',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
      <ChartCard
        title="Revenue"
        value="$124,592"
        sparklineData={sparklineDataRevenue}
        type="line"
        color="#3560C1"
        change={{
          value: 8420,
          percentage: 12.5,
          trend: 'up',
        }}
        timeframe="last month"
        icon="currency"
      />

      <ChartCard
        title="Expenses"
        value="$89,234"
        sparklineData={[5200, 4800, 5100, 4600, 5200, 4800, 5200, 5800, 5600, 5200, 4900, 4600]}
        type="area"
        color="#FA4D56"
        change={{
          value: -2340,
          percentage: -5.2,
          trend: 'down',
        }}
        timeframe="last month"
        icon="finance"
      />

      <ChartCard
        title="Net Profit"
        value="$35,358"
        sparklineData={[2800, 2400, 3100, 2600, 3200, 2800, 3400, 3200, 3600, 3800, 4200, 4600]}
        type="line"
        color="#198038"
        change={{
          value: 0,
          percentage: 0,
          trend: 'neutral',
        }}
        timeframe="last month"
        icon="chart-line"
      />
    </div>
  ),
};

export const WithActionButtons: Story = {
  name: '08 With Action Buttons',
  args: {
    title: 'Total Orders',
    subtitle: 'All channels',
    value: '248',
    sparklineData: sparklineDataOrders,
    type: 'bar',
    color: '#0F62FE',
    change: {
      value: 16,
      percentage: 6.9,
      trend: 'up',
    },
    timeframe: 'this week',
    icon: 'shopping-bag',
    actions: {
      onViewDetails: () => alert('View details clicked'),
      onExport: () => alert('Export clicked'),
      onRefresh: () => alert('Refresh clicked'),
    },
  },
};

export const Dashboard: Story = {
  name: '09 Dashboard',
  render: () => {
    const [saved1, setSaved1] = React.useState(false);
    const [saved2, setSaved2] = React.useState(true);
    const [saved3, setSaved3] = React.useState(false);
    const [saved4, setSaved4] = React.useState(false);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <ChartCard
          title="Total Revenue"
          subtitle="All products"
          value="$124,592"
          sparklineData={sparklineDataRevenue}
          type="line"
          color="#3560C1"
          change={{
            value: 8420,
            percentage: 12.5,
            trend: 'up',
          }}
          timeframe="last 30 days"
          icon="currency"
          saved={saved1}
          onSave={setSaved1}
        />

        <ChartCard
          title="Active Users"
          subtitle="Monthly active"
          value="2,750"
          sparklineData={sparklineDataUsers}
          type="area"
          color="#198038"
          change={{
            value: 170,
            percentage: 6.6,
            trend: 'up',
          }}
          timeframe="this month"
          icon="user-multiple"
          saved={saved2}
          onSave={setSaved2}
        />

        <ChartCard
          title="Conversion Rate"
          subtitle="E-commerce"
          value="4.6%"
          sparklineData={sparklineDataConversion}
          type="line"
          color="#8A3FFC"
          change={{
            value: 0.8,
            percentage: 21.1,
            trend: 'up',
          }}
          timeframe="last quarter"
          icon="chart-line"
          saved={saved3}
          onSave={setSaved3}
        />

        <ChartCard
          title="Total Orders"
          subtitle="All channels"
          value="248"
          sparklineData={sparklineDataOrders}
          type="bar"
          color="#0F62FE"
          change={{
            value: 16,
            percentage: 6.9,
            trend: 'up',
          }}
          timeframe="this week"
          icon="shopping-bag"
          saved={saved4}
          onSave={setSaved4}
        />
      </div>
    );
  },
};

export const DifferentSizes: Story = {
  name: '10 Different Sizes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Compact Card</h4>
        <div style={{ maxWidth: '300px' }}>
          <ChartCard
            title="Revenue"
            value="$124.5K"
            sparklineData={sparklineDataRevenue}
            type="line"
            color="#3560C1"
            change={{
              value: 8420,
              percentage: 12.5,
              trend: 'up',
            }}
            timeframe="last month"
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium Card</h4>
        <div style={{ maxWidth: '400px' }}>
          <ChartCard
            title="Active Users"
            subtitle="Monthly active users"
            value="2,750"
            sparklineData={sparklineDataUsers}
            type="area"
            color="#198038"
            change={{
              value: 170,
              percentage: 6.6,
              trend: 'up',
            }}
            timeframe="this month"
            icon="user-multiple"
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Full Width Card with Custom Chart</h4>
        <ChartCard
          title="Sales Performance"
          subtitle="All regions and products"
          value="$156,432"
          chart={
            <Graph
              type="area"
              data={monthlyData}
              dataKeys={['value']}
              xAxisKey="name"
              height={200}
              showGrid={true}
              showLegend={false}
              gradient={true}
            />
          }
          change={{
            value: 12340,
            percentage: 8.6,
            trend: 'up',
          }}
          timeframe="last 6 months"
          icon="chart-area"
          actions={{
            onViewDetails: () => alert('View details'),
            onExport: () => alert('Export data'),
          }}
        />
      </div>
    </div>
  ),
};

export const MinimalCards: Story = {
  name: '11 Minimal Cards',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
      <ChartCard
        title="Revenue"
        value="$124K"
        timeframe="MTD"
      />

      <ChartCard
        title="Users"
        value="2,750"
        timeframe="Active"
      />

      <ChartCard
        title="Rate"
        value="4.6%"
        timeframe="Conversion"
      />

      <ChartCard
        title="Orders"
        value="248"
        timeframe="Weekly"
      />
    </div>
  ),
};

export const FullFeatured: Story = {
  name: '12 Full Featured',
  render: () => {
    const [saved, setSaved] = React.useState(false);

    return (
      <div style={{ maxWidth: '500px' }}>
        <ChartCard
          title="Total Revenue"
          subtitle="All products and services"
          value="$124,592"
          chart={
            <Graph
              type="area"
              data={monthlyData}
              dataKeys={['value']}
              xAxisKey="name"
              height={180}
              showGrid={true}
              showLegend={false}
              gradient={true}
            />
          }
          change={{
            value: 8420,
            percentage: 12.5,
            trend: 'up',
          }}
          timeframe="last 6 months"
          icon="currency"
          saved={saved}
          onSave={setSaved}
          actions={{
            onViewDetails: () => alert('Viewing detailed revenue report'),
            onExport: () => alert('Exporting revenue data'),
            onRefresh: () => alert('Refreshing data'),
          }}
        />
      </div>
    );
  },
};

export const ColorVariations: Story = {
  name: '13 Color Variations',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      <ChartCard
        title="Blue"
        value="$45,890"
        sparklineData={sparklineDataRevenue}
        type="line"
        color="#3560C1"
        change={{ value: 3240, percentage: 7.8, trend: 'up' }}
      />

      <ChartCard
        title="Green"
        value="2,340"
        sparklineData={sparklineDataUsers}
        type="area"
        color="#198038"
        change={{ value: 140, percentage: 6.4, trend: 'up' }}
      />

      <ChartCard
        title="Purple"
        value="3.8%"
        sparklineData={sparklineDataConversion}
        type="line"
        color="#8A3FFC"
        change={{ value: 0.4, percentage: 11.8, trend: 'up' }}
      />

      <ChartCard
        title="Orange"
        value="$23,450"
        sparklineData={sparklineDataOrders}
        type="bar"
        color="#FF832B"
        change={{ value: -1240, percentage: -5.0, trend: 'down' }}
      />
    </div>
  ),
};

export const Playground: Story = {
  name: '14 Playground',
  args: {
    title: 'Total Revenue',
    subtitle: 'All products',
    value: '$124,592',
    sparklineData: sparklineDataRevenue,
    type: 'line',
    color: '#3560C1',
    icon: 'currency',
    change: {
      value: 8420,
      percentage: 12.5,
      trend: 'up',
    },
    timeframe: 'last 30 days',
    saved: false,
  },
};
