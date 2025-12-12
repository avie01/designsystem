import type { Meta, StoryObj } from '@storybook/react';
import YellowFolder from './YellowFolder';

const meta: Meta<typeof YellowFolder> = {
  title: 'Components/Display/YellowFolder',
  component: YellowFolder,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 128, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 36,
  },
};

export const Small: Story = {
  args: {
    size: 24,
  },
};

export const Large: Story = {
  args: {
    size: 64,
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 96,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <YellowFolder size={16} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>16px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <YellowFolder size={24} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>24px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <YellowFolder size={36} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>36px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <YellowFolder size={48} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>48px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <YellowFolder size={64} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>64px</div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
      <YellowFolder size={32} />
      <div>
        <div style={{ fontWeight: 500, fontSize: '14px' }}>Documents</div>
        <div style={{ fontSize: '12px', color: '#666' }}>24 files</div>
      </div>
    </div>
  ),
};
