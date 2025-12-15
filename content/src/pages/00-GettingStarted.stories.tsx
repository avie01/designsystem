import type { Meta, StoryObj } from '@storybook/react';
import GettingStarted from './GettingStarted';

const meta: Meta<typeof GettingStarted> = {
  title: 'ODL Design System/Getting Started',
  component: GettingStarted,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Welcome to the ODL Design System! This page provides a comprehensive guide to getting started with the component library, using components in Claude Code, and understanding our design tokens and component organization.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Home: Story = {
  name: 'Getting Started',
  args: {}
};
