import type { Meta, StoryObj } from '@storybook/react';
import DesignPrinciples from './DesignPrinciples';

const meta: Meta<typeof DesignPrinciples> = {
  title: 'ODL Design System/Design Principles',
  component: DesignPrinciples,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Core principles that guide the ODL Design System. These principles ensure consistency, accessibility, and quality across all components and interactions.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Principles: Story = {
  name: 'Design Principles',
  args: {}
};