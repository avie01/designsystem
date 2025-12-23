import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Design System/Components/Chips & Tags',
  component: Chip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Chip component for tags, categories, and status indicators. Features all color variants with proper theme support including light, dark, and high contrast modes. Uses ODL Typography (base, font-weight: 500) and proper spacing.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The text content to display in the chip',
    },
    variant: {
      control: 'select',
      options: ['blue', 'pink', 'red', 'orange', 'yellow', 'olive', 'mint', 'brown', 'purple', 'green', 'success', 'error', 'warning', 'info', 'neutral'],
      description: 'Color variant of the chip',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the chip',
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip is clickable',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the chip is disabled',
    },
    iconName: {
      control: 'text',
      description: 'Carbon icon name to display',
    },
    showDocumentIcon: {
      control: 'boolean',
      description: 'Show document icon',
    },
    showInfoIcon: {
      control: 'boolean',
      description: 'Show info icon',
    },
    toggle: {
      control: 'boolean',
      description: 'Whether the chip can be toggled on/off',
    },
    toggled: {
      control: 'boolean',
      description: 'Whether the chip is currently toggled on (controlled mode)',
    },
    onToggle: {
      action: 'onToggle',
      description: 'Callback when chip toggle state changes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColorVariants: Story = {
  name: '01 All Color Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Chip Color Palette
        </h4>
        <p style={{ marginBottom: '24px', fontSize: '14px', opacity: 0.7 }}>
          Try switching between Light, Dark, and High Contrast themes using the toolbar above to see dynamic color adaptation.
        </p>
        
        {/* Color Chips Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Blue</label>
            <Chip label="Blue Chip" variant="blue" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Pink</label>
            <Chip label="Pink Chip" variant="pink" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Red</label>
            <Chip label="Red Chip" variant="red" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Orange</label>
            <Chip label="Orange Chip" variant="orange" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Yellow</label>
            <Chip label="Yellow Chip" variant="yellow" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Olive</label>
            <Chip label="Olive Chip" variant="olive" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Mint</label>
            <Chip label="Mint Chip" variant="mint" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Brown</label>
            <Chip label="Brown Chip" variant="brown" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Purple</label>
            <Chip label="Purple Chip" variant="purple" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Green</label>
            <Chip label="Green Chip" variant="green" />
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          System Status Colors
        </h4>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '16px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Success</label>
            <Chip label="Success" variant="success" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Warning</label>
            <Chip label="Warning" variant="warning" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Error</label>
            <Chip label="Error" variant="error" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Info</label>
            <Chip label="Info" variant="info" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>Neutral</label>
            <Chip label="Neutral" variant="neutral" />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
            <label style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8 }}>White</label>
            <Chip label="White" variant="white" />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SizeVariants: Story = {
  name: '02 Size Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small (sm)</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Height: 24px, Padding: 4px 8px, Font: 14px/500</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Small Blue" variant="blue" size="sm" />
          <Chip label="Small Pink" variant="pink" size="sm" />
          <Chip label="Small Green" variant="green" size="sm" />
          <Chip label="Small Orange" variant="orange" size="sm" />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (md) - Default</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Height: 28px, Padding: 4px 12px, Font: 16px/500</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Medium Blue" variant="blue" size="md" />
          <Chip label="Medium Pink" variant="pink" size="md" />
          <Chip label="Medium Green" variant="green" size="md" />
          <Chip label="Medium Orange" variant="orange" size="md" />
        </div>
      </div>
      
      <div>
        <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large (lg)</h4>
        <p style={{ fontSize: '12px', color: '#6C757D', marginBottom: '16px' }}>Height: 32px, Padding: 8px 16px, Font: 18px/500</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Large Blue" variant="blue" size="lg" />
          <Chip label="Large Pink" variant="pink" size="lg" />
          <Chip label="Large Green" variant="green" size="lg" />
          <Chip label="Large Orange" variant="orange" size="lg" />
        </div>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  name: '03 Chips with Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Document & Info Icons
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Chip label="Document" variant="blue" showDocumentIcon />
          <Chip label="Information" variant="info" showInfoIcon />
          <Chip label="PDF File" variant="red" showDocumentIcon />
          <Chip label="Help Topic" variant="purple" showInfoIcon />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Custom Carbon Icons
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Chip label="Settings" variant="olive" iconName="settings" />
          <Chip label="Download" variant="green" iconName="download" />
          <Chip label="Upload" variant="orange" iconName="upload" />
          <Chip label="User" variant="pink" iconName="user" />
          <Chip label="Calendar" variant="yellow" iconName="calendar" />
          <Chip label="Star" variant="purple" iconName="star" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Status with Icons
        </h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Chip label="Completed" variant="success" iconName="checkmark-filled" />
          <Chip label="In Progress" variant="warning" iconName="pending" />
          <Chip label="Failed" variant="error" iconName="error-filled" />
          <Chip label="Archived" variant="mint" iconName="archive" />
        </div>
      </div>
    </div>
  ),
};

export const InteractiveChips: Story = {
  name: '04 Interactive & Clickable',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Clickable Tags
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
          These chips are clickable and show hover effects
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip 
            label="React" 
            variant="blue" 
            clickable 
            onClick={() => alert('React clicked!')} 
          />
          <Chip 
            label="TypeScript" 
            variant="purple" 
            clickable 
            onClick={() => alert('TypeScript clicked!')} 
          />
          <Chip 
            label="Design System" 
            variant="green" 
            clickable 
            onClick={() => alert('Design System clicked!')} 
          />
          <Chip 
            label="Storybook" 
            variant="pink" 
            clickable 
            onClick={() => alert('Storybook clicked!')} 
          />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Filter Tags
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="All Items" variant="neutral" clickable />
          <Chip label="Documents" variant="blue" clickable iconName="document" />
          <Chip label="Images" variant="orange" clickable iconName="image" />
          <Chip label="Videos" variant="red" clickable iconName="video" />
          <Chip label="Archives" variant="brown" clickable iconName="archive" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Disabled State
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Disabled" variant="blue" disabled />
          <Chip label="Disabled Clickable" variant="green" disabled clickable />
          <Chip label="Disabled with Icon" variant="orange" disabled iconName="settings" />
        </div>
      </div>
    </div>
  ),
};

export const TagCollections: Story = {
  name: '05 Tag Collections',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Project Categories
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Frontend" variant="blue" />
          <Chip label="Backend" variant="green" />
          <Chip label="Database" variant="purple" />
          <Chip label="DevOps" variant="orange" />
          <Chip label="Testing" variant="mint" />
          <Chip label="Documentation" variant="olive" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Priority Levels
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="Critical" variant="error" iconName="warning-filled" />
          <Chip label="High" variant="orange" iconName="arrow-up" />
          <Chip label="Medium" variant="yellow" iconName="dot-mark" />
          <Chip label="Low" variant="olive" iconName="arrow-down" />
          <Chip label="Optional" variant="neutral" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Technology Stack
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label="React" variant="blue" size="sm" />
          <Chip label="Node.js" variant="green" size="sm" />
          <Chip label="PostgreSQL" variant="purple" size="sm" />
          <Chip label="Docker" variant="mint" size="sm" />
          <Chip label="AWS" variant="orange" size="sm" />
          <Chip label="TypeScript" variant="blue" size="sm" />
          <Chip label="GraphQL" variant="pink" size="sm" />
          <Chip label="Redis" variant="red" size="sm" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          File Types
        </h4>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip label=".pdf" variant="red" showDocumentIcon size="sm" />
          <Chip label=".docx" variant="blue" showDocumentIcon size="sm" />
          <Chip label=".xlsx" variant="green" showDocumentIcon size="sm" />
          <Chip label=".jpg" variant="orange" iconName="image" size="sm" />
          <Chip label=".mp4" variant="purple" iconName="video" size="sm" />
          <Chip label=".zip" variant="brown" iconName="archive" size="sm" />
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveLayout: Story = {
  name: '06 Responsive Chip Layout',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Responsive Grid Layout
        </h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
          Chips automatically wrap to new lines as space becomes constrained
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          flexWrap: 'wrap',
          maxWidth: '600px',
          border: '1px dashed currentColor',
          padding: '16px',
          borderRadius: '4px',
          opacity: 0.5
        }}>
          <Chip label="React Development" variant="blue" />
          <Chip label="TypeScript" variant="purple" />
          <Chip label="Component Library" variant="green" />
          <Chip label="Design System" variant="pink" />
          <Chip label="Accessibility" variant="mint" />
          <Chip label="Documentation" variant="olive" />
          <Chip label="Testing" variant="orange" />
          <Chip label="Performance" variant="yellow" />
          <Chip label="Code Review" variant="brown" />
          <Chip label="Deployment" variant="red" />
        </div>
      </div>
    </div>
  ),
};

export const ToggleChips: Story = {
  name: '07 Toggle Chips (White)',
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>(['React', 'TypeScript']);
    
    const toggleTag = (tag: string) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
            White Toggle Chips
          </h4>
          <p style={{ marginBottom: '16px', fontSize: '14px', opacity: 0.7 }}>
            Click to toggle on/off. White chips with border that turn blue when selected.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['React', 'TypeScript', 'JavaScript', 'Node.js', 'GraphQL', 'CSS', 'HTML'].map(tag => (
              <Chip
                key={tag}
                label={tag}
                variant="white"
                toggle
                toggled={selectedTags.includes(tag)}
                onToggle={() => toggleTag(tag)}
              />
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
            White Toggle with Icons
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip label="Documents" variant="white" toggle showDocumentIcon />
            <Chip label="Settings" variant="white" toggle iconName="settings" />
            <Chip label="Notifications" variant="white" toggle iconName="notification" />
            <Chip label="Favorites" variant="white" toggle iconName="star" />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
            Different Sizes
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Chip label="Small" variant="white" size="sm" toggle />
            <Chip label="Medium" variant="white" size="md" toggle />
            <Chip label="Large" variant="white" size="lg" toggle />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
            Disabled States
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip label="Disabled Off" variant="white" toggle disabled />
            <Chip label="Disabled On" variant="white" toggle toggled disabled />
          </div>
        </div>
      </div>
    );
  },
};

export const ThemeShowcase: Story = {
  name: '08 Theme Adaptation',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>
          Dynamic Theme Support
        </h4>
        <p style={{ marginBottom: '24px', fontSize: '14px', opacity: 0.7 }}>
          Switch between Light, Dark, and High Contrast themes using the toolbar above. 
          Notice how chip backgrounds and text colors adapt automatically for optimal contrast and accessibility.
        </p>
        
        <div style={{ marginBottom: '24px' }}>
          <h5 style={{ fontSize: '14px', fontWeight: 500, marginBottom: '12px' }}>Color Adaptation Rules:</h5>
          <ul style={{ fontSize: '13px', lineHeight: 1.5, opacity: 0.8, margin: 0, paddingLeft: '20px' }}>
            <li><strong>Light Mode:</strong> Light background colors with dark text</li>
            <li><strong>Dark Mode:</strong> Dark background colors with light text</li>
            <li><strong>High Contrast:</strong> Same as light mode for maximum accessibility</li>
          </ul>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
          gap: '12px'
        }}>
          <Chip label="Blue" variant="blue" />
          <Chip label="Pink" variant="pink" />
          <Chip label="Red" variant="red" />
          <Chip label="Orange" variant="orange" />
          <Chip label="Yellow" variant="yellow" />
          <Chip label="Olive" variant="olive" />
          <Chip label="Mint" variant="mint" />
          <Chip label="Brown" variant="brown" />
          <Chip label="Purple" variant="purple" />
          <Chip label="Green" variant="green" />
          <Chip label="White" variant="white" />
        </div>
      </div>
    </div>
  ),
};

export const Default: Story = {
  name: '09 Default Example',
  args: {
    label: 'Design System',
    variant: 'blue',
    size: 'md',
    clickable: false,
    disabled: false,
  },
};