import type { Meta, StoryObj } from '@storybook/react';
import Treemap, { TreemapNode } from './Treemap';

const meta: Meta<typeof Treemap> = {
  title: 'Components/DataVisualization/Treemap',
  component: Treemap,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible treemap visualization component for displaying hierarchical data with proportional rectangles. Supports multiple color schemes, custom labels, and interactive hover states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of tree nodes with id, name, value, and optional color',
      control: 'object',
    },
    colorScheme: {
      description: 'Color scheme for the treemap',
      control: 'select',
      options: ['default', 'heat', 'cool', 'rainbow'],
    },
    showLabels: {
      description: 'Whether to show node labels',
      control: 'boolean',
    },
    showValues: {
      description: 'Whether to show node values',
      control: 'boolean',
    },
    height: {
      description: 'Height of the treemap in pixels',
      control: { type: 'range', min: 200, max: 800, step: 50 },
    },
    onClick: {
      description: 'Callback fired when a node is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const projectBudgetData: TreemapNode[] = [
  { id: '1', name: 'Engineering', value: 450000 },
  { id: '2', name: 'Marketing', value: 280000 },
  { id: '3', name: 'Sales', value: 320000 },
  { id: '4', name: 'Operations', value: 180000 },
  { id: '5', name: 'R&D', value: 220000 },
  { id: '6', name: 'HR', value: 120000 },
  { id: '7', name: 'Finance', value: 150000 },
  { id: '8', name: 'Legal', value: 90000 },
];

const salesData: TreemapNode[] = [
  { id: '1', name: 'North America', value: 5200000 },
  { id: '2', name: 'Europe', value: 3800000 },
  { id: '3', name: 'Asia Pacific', value: 4100000 },
  { id: '4', name: 'Latin America', value: 1200000 },
  { id: '5', name: 'Middle East', value: 980000 },
  { id: '6', name: 'Africa', value: 650000 },
];

const storageData: TreemapNode[] = [
  { id: '1', name: 'Documents', value: 45.2 },
  { id: '2', name: 'Videos', value: 128.7 },
  { id: '3', name: 'Photos', value: 67.3 },
  { id: '4', name: 'Music', value: 23.8 },
  { id: '5', name: 'Applications', value: 89.5 },
  { id: '6', name: 'System Files', value: 34.6 },
  { id: '7', name: 'Downloads', value: 12.9 },
  { id: '8', name: 'Other', value: 18.4 },
];

const trafficSourceData: TreemapNode[] = [
  { id: '1', name: 'Organic Search', value: 42500 },
  { id: '2', name: 'Direct', value: 28300 },
  { id: '3', name: 'Social Media', value: 19800 },
  { id: '4', name: 'Referral', value: 15600 },
  { id: '5', name: 'Email', value: 12400 },
  { id: '6', name: 'Paid Search', value: 9800 },
  { id: '7', name: 'Display Ads', value: 5200 },
  { id: '8', name: 'Affiliate', value: 3800 },
  { id: '9', name: 'Other', value: 2600 },
];

const customColorData: TreemapNode[] = [
  { id: '1', name: 'Critical', value: 45, color: '#DC2626' },
  { id: '2', name: 'High', value: 78, color: '#EA580C' },
  { id: '3', name: 'Medium', value: 132, color: '#F59E0B' },
  { id: '4', name: 'Low', value: 89, color: '#84CC16' },
  { id: '5', name: 'Info', value: 56, color: '#0EA5E9' },
];

const smallDataset: TreemapNode[] = [
  { id: '1', name: 'Category A', value: 60 },
  { id: '2', name: 'Category B', value: 25 },
  { id: '3', name: 'Category C', value: 15 },
];

const largeDataset: TreemapNode[] = Array.from({ length: 20 }, (_, i) => ({
  id: `item-${i + 1}`,
  name: `Item ${i + 1}`,
  value: Math.floor(Math.random() * 10000) + 1000,
}));

export const Default: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const SalesRegions: Story = {
  args: {
    data: salesData,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const HeatMapScheme: Story = {
  args: {
    data: storageData,
    colorScheme: 'heat',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const CoolScheme: Story = {
  args: {
    data: trafficSourceData,
    colorScheme: 'cool',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const RainbowScheme: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'rainbow',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const CustomColors: Story = {
  args: {
    data: customColorData,
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const LabelsOnly: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: true,
    showValues: false,
    height: 400,
  },
};

export const ValuesOnly: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: false,
    showValues: true,
    height: 400,
  },
};

export const NoLabels: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: false,
    showValues: false,
    height: 400,
  },
};

export const WithClickHandler: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 400,
    onClick: (node) => {
      console.log('Node clicked:', node);
      alert(`Clicked: ${node.name} - Value: ${node.value}`);
    },
  },
};

export const TallLayout: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 600,
  },
};

export const ShortLayout: Story = {
  args: {
    data: projectBudgetData,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 250,
  },
};

export const SmallDataset: Story = {
  args: {
    data: smallDataset,
    colorScheme: 'default',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};

export const LargeDataset: Story = {
  args: {
    data: largeDataset,
    colorScheme: 'rainbow',
    showLabels: true,
    showValues: true,
    height: 500,
  },
};

export const StorageUsage: Story = {
  args: {
    data: storageData,
    colorScheme: 'cool',
    showLabels: true,
    showValues: true,
    height: 400,
  },
};
