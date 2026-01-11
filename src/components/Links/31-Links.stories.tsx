import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Links from './Links';
import { useTheme } from '../../../.storybook/theme-decorator';

const meta: Meta<typeof Links> = {
  title: 'Design System/Components/Links',
  component: Links,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A links component for showing navigation hierarchy. Supports text and separators with various styles.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    items: {
      description: 'Array of link items with label and optional path',
      table: {
        type: {
          summary: 'LinkItem[]',
          detail: `interface LinkItem {
  label: string;
  path?: string;
  icon?: React.ReactNode | string;
}`
        },
        category: 'Data',
        disable: true,
      },
    },
    separatorStyle: {
      control: 'select',
      options: ['chevron', 'slash', 'arrow', 'pipe', 'dot', 'colon', 'dash'],
      description: 'Preset separator style',
      table: {
        type: { summary: 'chevron | slash | arrow | pipe | dot | colon | dash' },
        defaultValue: { summary: 'chevron' },
        category: 'Appearance',
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator (overrides separatorStyle)',
      table: {
        type: { summary: 'string | React.ReactNode' },
        category: 'Appearance',
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'Size variant of the links (typography sizes)',
      table: {
        type: { summary: 'xs | sm | base | md | lg | xl | 2xl | 3xl | 4xl' },
        defaultValue: { summary: 'base' },
        category: 'Appearance',
      },
    },
    fontWeight: {
      control: 'select',
      options: [400, 500, 600, 800],
      description: 'Font weight of the links',
      table: {
        type: { summary: '400 | 500 | 600 | 800' },
        defaultValue: { summary: '400' },
        category: 'Appearance',
      },
    },
    linkType: {
      control: 'select',
      options: ['default', 'list', 'public', 'popup'],
      description: 'Link type variant',
      table: {
        type: { summary: 'default | list | public | popup' },
        defaultValue: { summary: 'default' },
        category: 'Appearance',
      },
    },
    spacing: {
      control: 'select',
      options: ['compact', 'comfortable', 'spacious'],
      description: 'Spacing preset between items',
      table: {
        type: { summary: 'compact | comfortable | spacious' },
        defaultValue: { summary: 'comfortable' },
        category: 'Appearance',
      },
    },
    colorScheme: {
      control: 'select',
      options: [undefined, 'light', 'dark', 'primary'],
      description: 'Color scheme variant',
      table: {
        type: { summary: 'light | dark | primary' },
        category: 'Appearance',
      },
    },
    showSeparator: {
      control: 'boolean',
      description: 'Show separators between items',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Appearance',
      },
    },
    iconSize: {
      control: { type: 'select', options: ['auto', 12, 14, 16, 18, 20] },
      description: 'Icon size - "auto" scales with links size, or specify pixel value',
      table: {
        type: { summary: 'auto | number' },
        defaultValue: { summary: 'auto' },
        category: 'Icons',
      },
    },
    iconStyle: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Icon style variant for Carbon icons',
      table: {
        type: { summary: 'default | outline | filled' },
        defaultValue: { summary: 'default' },
        category: 'Icons',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Text and Separator
export const TextAndSeparator: Story = {
  name: '01 Text and Separator',
  args: {
    items: [
      { label: 'Home', path: '/' },
    ],
    onNavigate: (path) => console.log('Link clicked:', path),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic links with text labels and separator styles. Use separatorStyle prop to choose from: chevron, slash, arrow, pipe, dot, colon, or dash.',
      },
    },
  },
};

// 2. Types
export const Types: Story = {
  name: '02 Types',
  render: () => {
    const { colors } = useTheme();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[6] || '24px' }}>
        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Size Variations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Links
              items={[
                { label: 'Extra Small', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="xs"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Small', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="sm"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Base', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="base"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Medium', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="md"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Large', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="lg"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Extra Large', path: '/' },
                { label: 'Link', path: '/link' },
              ]}
              size="xl"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Font Weight Variations</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Links
              items={[
                { label: 'Font Weight 400', path: '/' },
                { label: 'Normal', path: '/normal' },
              ]}
              fontWeight={400}
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Font Weight 500', path: '/' },
                { label: 'Medium', path: '/medium' },
              ]}
              fontWeight={500}
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Font Weight 600', path: '/' },
                { label: 'Semibold', path: '/semibold' },
              ]}
              fontWeight={600}
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Font Weight 800', path: '/' },
                { label: 'Extra Bold', path: '/extrabold' },
              ]}
              fontWeight={800}
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: colors.spacing[3] || '12px', fontSize: colors.fontSize?.sm || '14px', fontWeight: 600, color: colors.textPrimary }}>Link Types</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: colors.spacing[3] || '12px' }}>
            <Links
              items={[
                { label: 'Default Link', path: '/' },
                { label: 'Example', path: '/example' },
              ]}
              linkType="default"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'List Link', path: '/' },
                { label: 'Example', path: '/example' },
              ]}
              linkType="list"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Public Facing', path: '/' },
                { label: 'Example', path: '/example' },
              ]}
              linkType="public"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
            <Links
              items={[
                { label: 'Popup Link', path: '/' },
                { label: 'Example', path: '/example' },
              ]}
              linkType="popup"
              onNavigate={(path) => console.log('Link clicked:', path)}
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different types and variations of links component including size variations, font weights, and link types.',
      },
    },
  },
};
