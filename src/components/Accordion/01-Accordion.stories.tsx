import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs', 'Ready for dev'],
  args: {
    allowMultiple: true,
    nested: false,
    showIcons: false,
    variant: 'default',
    size: 'medium',
    color: 'primary',
    expandPosition: 'right',
  },
  argTypes: {
    items: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Array of accordion items with title, content, and optional children',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be open simultaneously',
    },
    nested: {
      control: 'boolean',
      description: 'Enable nested accordion items',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons for accordion items',
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'filled'],
      description: 'Visual variant of the accordion',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Typography size for the accordion labels',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Text color for the accordion labels',
    },
    expandPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the expand/collapse icon',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    items: [
      {
        id: '1',
        title: 'What is the ODL Design System?',
        content: 'The ODL Design System is a comprehensive library of reusable components designed to create consistent and accessible user interfaces.',
        icon: 'checkmark',
      },
      {
        id: '2',
        title: 'How do I get started?',
        content: 'Simply install the package and import the components you need. Check out our documentation for detailed examples and API references.',
        icon: 'checkmark',
      },
      {
        id: '3',
        title: 'Is it accessible?',
        content: 'Yes! All components follow WCAG 2.1 AA standards and include proper ARIA attributes, keyboard navigation, and screen reader support.',
        icon: 'checkmark',
      },
    ],
    allowMultiple: true,
    nested: true,
    showIcons: false,
    variant: 'default',
  },
};

export const SingleExpand: Story = {
  name: '02 Single Expand',
  render: () => (
    <Accordion
      items={[
        {
          id: '1',
          title: 'Step 1: Installation',
          content: 'Run npm install @odl/design-system to install the package.',
          icon: 'download',
        },
        {
          id: '2',
          title: 'Step 2: Configuration',
          content: 'Import the CSS file and configure your theme settings.',
          icon: 'settings',
        },
        {
          id: '3',
          title: 'Step 3: Start Building',
          content: 'Import components and start building your application.',
          icon: 'build',
        },
      ]}
      allowMultiple={false}
      showIcons={true}
      variant="default"
    />
  ),
};

export const WithoutIcons: Story = {
  args: {
    allowMultiple: true,
    nested: true,
    showIcons: true
  },

  name: '03 Without Icons',

  render: () => (
    <Accordion
      items={[
        {
          id: '1',
          title: 'Privacy Policy',
          content: 'We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data.',
        },
        {
          id: '2',
          title: 'Terms of Service',
          content: 'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.',
        },
        {
          id: '3',
          title: 'Cookie Policy',
          content: 'We use cookies to improve your browsing experience. By continuing to use our site, you accept our use of cookies.',
        },
      ]}
      allowMultiple={true}
      showIcons={false}
      variant="default"
    />
  )
};

export const BorderedVariant: Story = {
  name: '04 Bordered Variant',
  args: {
    items: [
      {
        id: '1',
        title: 'Account Settings',
        content: 'Manage your account preferences and personal information.',
        icon: 'user',
      },
      {
        id: '2',
        title: 'Notifications',
        content: 'Configure how and when you receive notifications.',
        icon: 'notification',
      },
      {
        id: '3',
        title: 'Security',
        content: 'Update your password and manage two-factor authentication.',
        icon: 'locked',
      },
    ],
    allowMultiple: true,
    showIcons: true,
    variant: 'bordered',
  },
};

export const FilledVariant: Story = {
  name: '05 Filled Variant',
  args: {
    items: [
      {
        id: '1',
        title: 'Basic Plan',
        content: 'Perfect for individuals and small teams getting started. Includes up to 5 users and 10GB storage.',
        icon: 'star',
        defaultOpen: true,
      },
      {
        id: '2',
        title: 'Pro Plan',
        content: 'For growing teams that need more power. Includes up to 25 users and 100GB storage.',
        icon: 'star-filled',
      },
      {
        id: '3',
        title: 'Enterprise Plan',
        content: 'For large organizations with advanced needs. Unlimited users, storage, and premium support.',
        icon: 'enterprise',
      },
    ],
    allowMultiple: false,
    showIcons: true,
    variant: 'filled',
  },
};

export const NestedAccordion: Story = {
  name: '06 Nested Accordion',
  args: {
    items: [
      {
        id: '1',
        title: 'Frontend Development',
        icon: 'application',
        children: [
          {
            id: '1-1',
            title: 'React',
            content: 'A JavaScript library for building user interfaces.',
          },
          {
            id: '1-2',
            title: 'Vue',
            content: 'The Progressive JavaScript Framework.',
          },
          {
            id: '1-3',
            title: 'Angular',
            content: 'Platform for building mobile and desktop web applications.',
          },
        ],
      },
      {
        id: '2',
        title: 'Backend Development',
        icon: 'server',
        children: [
          {
            id: '2-1',
            title: 'Node.js',
            content: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
          },
          {
            id: '2-2',
            title: 'Python',
            content: 'A versatile programming language for backend development.',
          },
        ],
      },
      {
        id: '3',
        title: 'Database',
        icon: 'data-base',
        children: [
          {
            id: '3-1',
            title: 'PostgreSQL',
            content: 'A powerful, open source object-relational database system.',
          },
          {
            id: '3-2',
            title: 'MongoDB',
            content: 'A document-based NoSQL database.',
          },
        ],
      },
    ],
    allowMultiple: true,
    nested: true,
    showIcons: true,
    variant: 'default',
  },
};

export const DeepNesting: Story = {
  name: '07 Deep Nesting',
  args: {
    items: [
      {
        id: '1',
        title: 'Documentation',
        icon: 'document',
        children: [
          {
            id: '1-1',
            title: 'Getting Started',
            content: 'Learn the basics of the ODL Design System.',
            children: [
              {
                id: '1-1-1',
                title: 'Installation',
                content: 'Step-by-step installation guide.',
              },
              {
                id: '1-1-2',
                title: 'First Steps',
                content: 'Create your first component.',
              },
            ],
          },
          {
            id: '1-2',
            title: 'Advanced Topics',
            children: [
              {
                id: '1-2-1',
                title: 'Theming',
                content: 'Customize the design system to match your brand.',
              },
              {
                id: '1-2-2',
                title: 'Accessibility',
                content: 'Building accessible applications.',
              },
            ],
          },
        ],
      },
    ],
    allowMultiple: true,
    nested: true,
    showIcons: true,
    variant: 'default',
  },
};

export const LongContent: Story = {
  name: '08 Long Content',
  args: {
    items: [
      {
        id: '1',
        title: 'Introduction to Component Libraries',
        content: 'Component libraries have revolutionized the way we build user interfaces. They provide a consistent set of building blocks that developers can use to construct complex applications efficiently. The ODL Design System takes this concept further by not only providing components but also ensuring they meet accessibility standards, follow best practices, and integrate seamlessly with modern development workflows. By using a component library, teams can focus on solving business problems rather than reinventing common UI patterns.',
        icon: 'document',
      },
      {
        id: '2',
        title: 'Benefits of Design Systems',
        content: 'Design systems bring numerous benefits to organizations of all sizes. They ensure consistency across products, reduce development time by providing pre-built components, improve accessibility by baking in best practices, facilitate collaboration between designers and developers, and make it easier to maintain and scale applications over time. When everyone uses the same components, bugs get fixed once and the improvements propagate throughout all applications.',
        icon: 'checkmark',
      },
    ],
    allowMultiple: true,
    showIcons: true,
    variant: 'default',
  },
};

export const SizeVariants: Story = {
  name: '09 Size Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large Size (Default)</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>lg typography, semibold (600) weight</p>
        <Accordion
          items={[
            {
              id: '1',
              title: 'Large Size Example',
              content: 'This is the large size with lg typography and semibold (600) font weight.',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          size="large"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium Size</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>md typography, semibold (600) weight</p>
        <Accordion
          items={[
            {
              id: '2',
              title: 'Medium Size Example',
              content: 'This is the medium size with md typography and semibold (600) font weight.',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          size="medium"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small Size</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>base typography, bold (700) weight</p>
        <Accordion
          items={[
            {
              id: '3',
              title: 'Small Size Example',
              content: 'This is the small size with base typography and bold (700) font weight.',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          size="small"
        />
      </div>
    </div>
  ),
};

export const ColorVariants: Story = {
  name: '10 Color Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Primary Color</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Text color: #32373f</p>
        <Accordion
          items={[
            {
              id: '1',
              title: 'Primary Color Example',
              content: 'This accordion uses the primary text color (#32373f).',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          color="primary"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Secondary Color</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Text color: #525965</p>
        <Accordion
          items={[
            {
              id: '2',
              title: 'Secondary Color Example',
              content: 'This accordion uses the secondary text color (#525965).',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          color="secondary"
        />
      </div>
    </div>
  ),
};

export const ExpandIconPosition: Story = {
  name: '11 Expand Icon Position',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Left Position</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Expand icon positioned to the left of the label</p>
        <Accordion
          items={[
            {
              id: '1',
              title: 'Left Expand Icon Example',
              content: 'The expand/collapse icon is positioned to the left of the accordion label.',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          expandPosition="left"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Right Position (Default)</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Expand icon positioned to the right of the label</p>
        <Accordion
          items={[
            {
              id: '2',
              title: 'Right Expand Icon Example',
              content: 'The expand/collapse icon is positioned to the right of the accordion label (default behavior).',
            },
          ]}
          allowMultiple={true}
          showIcons={false}
          variant="default"
          expandPosition="right"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Left Position with Icon</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Expand icon positioned to the left of the label with item icon</p>
        <Accordion
          items={[
            {
              id: '3',
              title: 'Left Expand Icon with Icon Example',
              content: 'The expand/collapse icon is positioned to the left of the accordion label, and the item has its own icon.',
              icon: 'settings',
            },
          ]}
          allowMultiple={true}
          showIcons={true}
          variant="default"
          expandPosition="left"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Right Position with Icon</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Expand icon positioned to the right of the label with item icon</p>
        <Accordion
          items={[
            {
              id: '4',
              title: 'Right Expand Icon with Icon Example',
              content: 'The expand/collapse icon is positioned to the right of the accordion label, and the item has its own icon.',
              icon: 'settings',
            },
          ]}
          allowMultiple={true}
          showIcons={true}
          variant="default"
          expandPosition="right"
        />
      </div>
    </div>
  ),
};

export const ThemeSupport: Story = {
  name: '12 ThemeSupport',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Theme Adaptive Accordion
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
          Try switching between Light, Dark, and High Contrast themes using the toolbar above
        </p>
        <Accordion
          items={[
            {
              id: '1',
              title: 'Theme Support Example',
              content: 'This accordion adapts to light, dark, and high contrast themes automatically.',
              icon: 'settings',
            },
            {
              id: '2',
              title: 'Dynamic Colors',
              content: 'All colors, backgrounds, and borders adjust based on the current theme.',
              icon: 'palette',
              defaultOpen: true,
            },
            {
              id: '3',
              title: 'Accessibility Compliant',
              content: 'Maintains proper contrast ratios across all theme variants.',
              icon: 'checkmark',
            },
          ]}
          allowMultiple={true}
          showIcons={true}
          variant="default"
        />
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          Multiple Variants
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            items={[
              {
                id: '4',
                title: 'Default Variant',
                content: 'Default accordion variant with theme colors.',
              },
            ]}
            variant="default"
            showIcons={false}
          />
          <Accordion
            items={[
              {
                id: '5',
                title: 'Bordered Variant',
                content: 'Bordered accordion variant with theme colors.',
              },
            ]}
            variant="bordered"
            showIcons={false}
          />
          <Accordion
            items={[
              {
                id: '6',
                title: 'Filled Variant',
                content: 'Filled accordion variant with theme colors.',
                defaultOpen: true,
              },
            ]}
            variant="filled"
            showIcons={false}
          />
        </div>
      </div>
    </div>
  ),
};
