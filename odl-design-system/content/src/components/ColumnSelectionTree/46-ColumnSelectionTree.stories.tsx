import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ColumnSelectionTree, { ColumnGroup } from './ColumnSelectionTree';

const mockColumnGroups: ColumnGroup[] = [
  {
    id: 'property',
    name: 'Property Information',
    expanded: true,
    columns: [
      { key: 'address', header: 'Address', sortable: true },
      { key: 'lot', header: 'Lot Number', sortable: true },
      { key: 'plan', header: 'Plan Number', sortable: true },
      { key: 'area', header: 'Land Area', sortable: true, alignRight: true },
      { key: 'zone', header: 'Zoning', sortable: true },
    ],
  },
  {
    id: 'application',
    name: 'Application Details',
    expanded: false,
    columns: [
      { key: 'appNumber', header: 'Application Number', sortable: true },
      { key: 'appType', header: 'Application Type', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'lodgedDate', header: 'Lodged Date', sortable: true },
      { key: 'decisionDate', header: 'Decision Date', sortable: true },
    ],
  },
  {
    id: 'contact',
    name: 'Contact Information',
    expanded: false,
    columns: [
      { key: 'applicant', header: 'Applicant Name', sortable: true },
      { key: 'email', header: 'Email', sortable: false },
      { key: 'phone', header: 'Phone', sortable: false },
      { key: 'assignedOfficer', header: 'Assigned Officer', sortable: true },
    ],
  },
  {
    id: 'financial',
    name: 'Financial',
    expanded: false,
    columns: [
      { key: 'fees', header: 'Application Fees', sortable: true, alignRight: true },
      { key: 'paidAmount', header: 'Amount Paid', sortable: true, alignRight: true },
      { key: 'outstanding', header: 'Outstanding', sortable: true, alignRight: true },
    ],
  },
];

const meta: Meta<typeof ColumnSelectionTree> = {
  title: 'Design System/Components/ColumnSelectionTree',
  component: ColumnSelectionTree,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    showIcons: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ColumnSelectionTreeWithState = ({
  groups,
  initialSelected = [],
  showIcons = true,
}: {
  groups: ColumnGroup[];
  initialSelected?: string[];
  showIcons?: boolean;
}) => {
  const [selected, setSelected] = useState<string[]>(initialSelected);

  return (
    <ColumnSelectionTree
      groups={groups}
      selectedColumns={selected}
      onColumnSelectionChange={setSelected}
      showIcons={showIcons}
    />
  );
};

export const Default: Story = {
  render: () => (
    <ColumnSelectionTreeWithState
      groups={mockColumnGroups}
      initialSelected={['address', 'lot', 'appNumber', 'status']}
    />
  ),
};

export const NoneSelected: Story = {
  name: '02 None Selected',
  render: () => (
    <ColumnSelectionTreeWithState
      groups={mockColumnGroups}
      initialSelected={[]}
    />
  ),
};

export const AllSelected: Story = {
  render: () => (
    <ColumnSelectionTreeWithState
      groups={mockColumnGroups}
      initialSelected={mockColumnGroups.flatMap(g => g.columns.map(c => c.key))}
    />
  ),
};

export const WithoutIcons: Story = {
  name: '04 Without Icons',
  render: () => (
    <ColumnSelectionTreeWithState
      groups={mockColumnGroups}
      initialSelected={['address', 'appNumber']}
      showIcons={false}
    />
  ),
};

export const SingleGroup: Story = {
  render: () => (
    <ColumnSelectionTreeWithState
      groups={[mockColumnGroups[0]]}
      initialSelected={['address', 'lot']}
    />
  ),
};

export const AllExpanded: Story = {
  name: '06 All Expanded',
  render: () => (
    <ColumnSelectionTreeWithState
      groups={mockColumnGroups.map(g => ({ ...g, expanded: true }))}
      initialSelected={['address', 'appNumber', 'applicant', 'fees']}
    />
  ),
};
