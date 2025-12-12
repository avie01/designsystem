import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Cards from './Cards';

const meta: Meta<typeof Cards> = {
  title: 'Components/Cards',
  component: Cards,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Cards component with checkbox selection, multiple states, and action buttons. Designed for file and folder representation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting typography and spacing',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state - affects colors and interaction',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'Error state - uses error colors',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected (checkbox state)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    title: {
      control: 'text',
      description: 'Primary text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Title - h4 - Primary' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Secondary text content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Body - body2 - Secondary' },
      },
    },
    tag: {
      control: 'text',
      description: 'Tag text to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'fA7985' },
      },
    },
    showInfoIcon: {
      control: 'boolean',
      description: 'Whether to show the information icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    showMenuIcon: {
      control: 'boolean',
      description: 'Whether to show the ellipsis menu icon',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    onSelect: {
      description: 'Callback when checkbox is clicked',
      table: {
        type: { summary: '(selected: boolean) => void' },
      },
    },
    onInfoClick: {
      description: 'Callback when info icon is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onMenuClick: {
      description: 'Callback when menu icon is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default card
export const Default: Story = {
  args: {
    title: 'Project Documentation',
    subtitle: 'Updated 2 hours ago',
    tag: 'v2.1.0',
  },
};

// All States showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Card States</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Cards
            title="Default State"
            subtitle="This is the default card state"
            tag="Default"
          />
          <Cards
            title="Selected State"
            subtitle="This card is selected"
            tag="Selected"
            selected={true}
          />
          <Cards
            title="Disabled State"
            subtitle="This card is disabled"
            tag="Disabled"
            disabled={true}
          />
          <Cards
            title="Error State"
            subtitle="This card has an error"
            tag="Error"
            error={true}
          />
          <Cards
            title="Selected + Disabled"
            subtitle="This card is selected and disabled"
            tag="Multi"
            selected={true}
            disabled={true}
          />
          <Cards
            title="Error + Selected"
            subtitle="This card has error and is selected"
            tag="Multi"
            error={true}
            selected={true}
          />
        </div>
      </div>
    </div>
  ),
};

// Size variations
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Card Sizes</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Cards
            size="sm"
            title="Small Card"
            subtitle="Size: sm - Compact spacing"
            tag="Small"
          />
          <Cards
            size="md"
            title="Medium Card"
            subtitle="Size: md - Default spacing"
            tag="Medium"
          />
          <Cards
            size="lg"
            title="Large Card"
            subtitle="Size: lg - Generous spacing"
            tag="Large"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive features
export const InteractiveFeatures: Story = {
  render: () => {
    const [selected1, setSelected1] = React.useState(false);
    const [selected2, setSelected2] = React.useState(true);
    const [selected3, setSelected3] = React.useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Interactive Cards</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Cards
              title="Click to select"
              subtitle="Try clicking the checkbox or the card"
              tag="Interactive"
              selected={selected1}
              onSelect={setSelected1}
              onInfoClick={() => alert('Info clicked!')}
              onMenuClick={() => alert('Menu clicked!')}
            />
            <Cards
              title="Pre-selected card"
              subtitle="This card starts selected"
              tag="Selected"
              selected={selected2}
              onSelect={setSelected2}
              onInfoClick={() => alert('Info clicked!')}
              onMenuClick={() => alert('Menu clicked!')}
            />
            <Cards
              title="Without action icons"
              subtitle="No info or menu icons"
              tag="Minimal"
              selected={selected3}
              onSelect={setSelected3}
              showInfoIcon={false}
              showMenuIcon={false}
            />
          </div>
        </div>
      </div>
    );
  },
};

// Icon variations
export const IconVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Icon Configurations</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Cards
            title="All icons visible"
            subtitle="Info and menu icons shown"
            tag="Full"
            showInfoIcon={true}
            showMenuIcon={true}
          />
          <Cards
            title="Info icon only"
            subtitle="Only information icon visible"
            tag="Info"
            showInfoIcon={true}
            showMenuIcon={false}
          />
          <Cards
            title="Menu icon only"
            subtitle="Only menu icon visible"
            tag="Menu"
            showInfoIcon={false}
            showMenuIcon={true}
          />
          <Cards
            title="No action icons"
            subtitle="Clean card without icons"
            tag="Clean"
            showInfoIcon={false}
            showMenuIcon={false}
          />
        </div>
      </div>
    </div>
  ),
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    const [selectedFiles, setSelectedFiles] = React.useState<number[]>([1, 3]);

    const files = [
      { id: 1, title: 'Design System.fig', subtitle: 'Modified by Sarah Chen', tag: 'v3.2.1' },
      { id: 2, title: 'Component Library', subtitle: 'Updated yesterday', tag: 'Latest' },
      { id: 3, title: 'User Research Notes.docx', subtitle: 'Shared by Mike Davis', tag: 'Draft' },
      { id: 4, title: 'Q4 Analytics Report.pdf', subtitle: 'Created 3 days ago', tag: 'Final' },
      { id: 5, title: 'Sprint Planning.xlsx', subtitle: 'Last edited 1 hour ago', tag: 'WIP' },
    ];

    const toggleSelection = (id: number) => {
      setSelectedFiles(prev =>
        prev.includes(id)
          ? prev.filter(fileId => fileId !== id)
          : [...prev, id]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>File Manager Example</h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', color: '#525252' }}>
            {selectedFiles.length} file(s) selected
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {files.map(file => (
              <Cards
                key={file.id}
                title={file.title}
                subtitle={file.subtitle}
                tag={file.tag}
                selected={selectedFiles.includes(file.id)}
                onSelect={() => toggleSelection(file.id)}
                onInfoClick={() => alert(`Info for ${file.title}`)}
                onMenuClick={() => alert(`Menu for ${file.title}`)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Accessibility example
export const AccessibilityFocus: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Accessibility Features</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#525252' }}>
          Cards are fully keyboard accessible. Try tabbing through and using Space/Enter to select.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Cards
            title="Keyboard Accessible"
            subtitle="Press Tab to focus, Space to select"
            tag="A11y"
            aria-label="Accessible card with keyboard support"
            aria-describedby="card-help-text"
          />
          <Cards
            title="Screen Reader Friendly"
            subtitle="Includes proper ARIA labels"
            tag="ARIA"
            aria-label="Card with screen reader support"
          />
          <Cards
            title="Focus Indicators"
            subtitle="Clear focus states for keyboard users"
            tag="Focus"
          />
        </div>
        <p id="card-help-text" style={{ marginTop: '16px', fontSize: '12px', color: '#8D8D8D' }}>
          Use arrow keys to navigate between cards, Space or Enter to select/deselect
        </p>
      </div>
    </div>
  ),
};

// Edge cases
export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Edge Cases</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Cards
            title="Very long title that might overflow the available space in the card component"
            subtitle="Similarly long subtitle text that could potentially wrap to multiple lines depending on the container width"
            tag="LongTextExample"
          />
          <Cards
            title=""
            subtitle=""
            tag=""
          />
          <Cards
            title="No subtitle or tag"
            subtitle=""
            tag=""
          />
          <Cards
            title="特殊字符 & émojis 🎨"
            subtitle="Testing unicode support 中文"
            tag="UTF-8"
          />
        </div>
      </div>
    </div>
  ),
};

// Playground
export const Playground: Story = {
  args: {
    title: 'Playground Card',
    subtitle: 'Experiment with props',
    tag: 'v1.0',
    size: 'md',
    disabled: false,
    error: false,
    selected: false,
    showInfoIcon: true,
    showMenuIcon: true,
  },
};