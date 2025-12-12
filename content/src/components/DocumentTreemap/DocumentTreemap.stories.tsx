import type { Meta, StoryObj } from '@storybook/react';
import DocumentTreemap from './DocumentTreemap';

const meta: Meta<typeof DocumentTreemap> = {
  title: 'Components/DataVisualization/DocumentTreemap',
  component: DocumentTreemap,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A treemap visualization for displaying document distribution by classification and department. Features clickable nodes for filtering and automatic color-coding based on security classification levels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Array of documents with classification, department, and status',
      control: 'object',
    },
    onNodeClick: {
      description: 'Callback fired when a classification or department node is clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleDocuments = [
  { id: '1', classification: 'TOP SECRET', department: 'Defense', status: 'active' },
  { id: '2', classification: 'TOP SECRET', department: 'Defense', status: 'active' },
  { id: '3', classification: 'TOP SECRET', department: 'Intelligence', status: 'active' },
  { id: '4', classification: 'SECRET', department: 'Defense', status: 'active' },
  { id: '5', classification: 'SECRET', department: 'Intelligence', status: 'active' },
  { id: '6', classification: 'SECRET', department: 'Intelligence', status: 'active' },
  { id: '7', classification: 'SECRET', department: 'Foreign Affairs', status: 'active' },
  { id: '8', classification: 'SECRET', department: 'Foreign Affairs', status: 'active' },
  { id: '9', classification: 'SECRET', department: 'Foreign Affairs', status: 'active' },
  { id: '10', classification: 'CONFIDENTIAL', department: 'Defense', status: 'active' },
  { id: '11', classification: 'CONFIDENTIAL', department: 'Defense', status: 'active' },
  { id: '12', classification: 'CONFIDENTIAL', department: 'Intelligence', status: 'active' },
  { id: '13', classification: 'CONFIDENTIAL', department: 'Intelligence', status: 'active' },
  { id: '14', classification: 'CONFIDENTIAL', department: 'Foreign Affairs', status: 'active' },
  { id: '15', classification: 'CONFIDENTIAL', department: 'Foreign Affairs', status: 'active' },
];

const largeDataset = [
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `ts-${i}`,
    classification: 'TOP SECRET',
    department: ['Defense', 'Intelligence', 'Cyber'][i % 3],
    status: 'active',
  })),
  ...Array.from({ length: 40 }, (_, i) => ({
    id: `s-${i}`,
    classification: 'SECRET',
    department: ['Defense', 'Intelligence', 'Foreign Affairs', 'Treasury'][i % 4],
    status: 'active',
  })),
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `c-${i}`,
    classification: 'CONFIDENTIAL',
    department: ['Defense', 'Intelligence', 'Foreign Affairs', 'Treasury', 'Commerce'][i % 5],
    status: 'active',
  })),
];

export const Default: Story = {
  args: {
    data: sampleDocuments,
  },
};

export const WithClickHandler: Story = {
  args: {
    data: sampleDocuments,
    onNodeClick: (node) => {
      console.log('Node clicked:', node);
      alert(`Clicked: ${node.classification || 'All'}${node.department ? ` - ${node.department}` : ''}`);
    },
  },
};

export const LargeDataset: Story = {
  args: {
    data: largeDataset,
  },
};

export const SmallDataset: Story = {
  args: {
    data: [
      { id: '1', classification: 'TOP SECRET', department: 'Defense', status: 'active' },
      { id: '2', classification: 'SECRET', department: 'Intelligence', status: 'active' },
      { id: '3', classification: 'CONFIDENTIAL', department: 'Foreign Affairs', status: 'active' },
    ],
  },
};

export const SingleClassification: Story = {
  args: {
    data: [
      { id: '1', classification: 'SECRET', department: 'Defense', status: 'active' },
      { id: '2', classification: 'SECRET', department: 'Defense', status: 'active' },
      { id: '3', classification: 'SECRET', department: 'Intelligence', status: 'active' },
      { id: '4', classification: 'SECRET', department: 'Intelligence', status: 'active' },
      { id: '5', classification: 'SECRET', department: 'Foreign Affairs', status: 'active' },
    ],
  },
};

export const DepartmentHeavy: Story = {
  args: {
    data: [
      ...Array.from({ length: 2 }, (_, i) => ({
        id: `ts-${i}`,
        classification: 'TOP SECRET',
        department: 'Defense',
        status: 'active',
      })),
      ...Array.from({ length: 8 }, (_, i) => ({
        id: `s-${i}`,
        classification: 'SECRET',
        department: ['Defense', 'Intelligence', 'Foreign Affairs', 'Treasury'][i % 4],
        status: 'active',
      })),
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `c-${i}`,
        classification: 'CONFIDENTIAL',
        department: ['Defense', 'Intelligence', 'Foreign Affairs', 'Treasury', 'Commerce', 'Energy', 'Homeland'][i % 7],
        status: 'active',
      })),
    ],
  },
};
