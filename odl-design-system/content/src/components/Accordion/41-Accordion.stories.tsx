import type { Meta, StoryObj } from '@storybook/react';
import Accordion from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Design System/Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
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
        icon: 'information',
      },
      {
        id: '2',
        title: 'How do I get started?',
        content: 'Simply install the package and import the components you need. Check out our documentation for detailed examples and API references.',
        icon: 'rocket',
      },
      {
        id: '3',
        title: 'Is it accessible?',
        content: 'Yes! All components follow WCAG 2.1 AA standards and include proper ARIA attributes, keyboard navigation, and screen reader support.',
        icon: 'accessibility',
      },
    ],
    allowMultiple: true,
    nested: true,
    showIcons: true,
    variant: 'default',
  },
};

export const SingleExpand: Story = {
  name: '02 Single Expand',
  args: {
    items: [
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
        defaultOpen: true,
      },
      {
        id: '3',
        title: 'Step 3: Start Building',
        content: 'Import components and start building your application.',
        icon: 'application',
      },
    ],
    allowMultiple: false,
    showIcons: true,
    variant: 'default',
  },
};

export const WithoutIcons: Story = {
  name: '03 Without Icons',
  args: {
    items: [
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
    ],
    allowMultiple: true,
    showIcons: false,
    variant: 'default',
  },
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
        icon: 'password',
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
        icon: 'building',
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
        icon: 'data-base',
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
