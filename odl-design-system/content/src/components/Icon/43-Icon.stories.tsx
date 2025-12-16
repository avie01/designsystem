import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Icon from './Icon';
import Button from '../Button/Button';
import { carbonIconMapping } from '../../utils/carbonIconMap';

/**
 * Icon Component
 * 
 * The Icon component provides access to the entire Carbon Design System icon library
 * with lazy loading and dynamic imports for optimal performance.
 * 
 * ## Usage Guidelines
 * 
 * ### DO's:
 * - Use semantic icon names that describe the action or content
 * - Provide alt text for accessibility when icons convey meaning
 * - Use consistent icon sizes within the same context
 * - Test icons at different sizes to ensure clarity
 * 
 * ### DON'Ts:
 * - Don't use icons as the only means of conveying information
 * - Don't mix icon styles (outlined vs filled) in the same UI section
 * - Don't use decorative icons without proper ARIA attributes
 * - Never pass React elements/JSX as props
 * 
 * ## Icon Naming
 * 
 * Icons can be referenced using multiple naming conventions:
 * - kebab-case: `chevron-down`, `user-avatar`
 * - PascalCase: `ChevronDown`, `UserAvatar`
 * - lowercase: `home`, `settings`, `search`
 * 
 * The component automatically handles conversion between formats.
 */
const meta: Meta<typeof Icon> = {
  title: 'Design System/Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Icon component provides a unified interface for using Carbon Design System icons
throughout your application. It features:

- **200+ icons** from Carbon Design System
- **Lazy loading** for optimal bundle size
- **Multiple size presets** (small, medium, large, or custom)
- **Color customization** via props
- **Accessibility support** with proper ARIA labels
- **Click handling** for interactive icons
- **Automatic fallbacks** for missing icons
        `
      }
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(carbonIconMapping).sort(),
      description: 'The name of the Carbon icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'settings' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 16, 20, 24, 32, 48],
      description: 'Size preset or numeric pixel value',
      table: {
        type: { summary: '"small" | "medium" | "large" | number' },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: 'color',
      description: 'Icon color (CSS color value)',
      table: {
        type: { summary: 'string' },
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Click handler for interactive icons',
    },
    alt: {
      control: 'text',
      description: 'Accessibility label for the icon',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Additional CSS classes',
    },
    width: {
      control: 'number',
      description: 'Custom width in pixels',
      table: {
        type: { summary: 'number | string' },
      },
    },
    height: {
      control: 'number',
      description: 'Custom height in pixels',
      table: {
        type: { summary: 'number | string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default icon
export const Default: Story = {
  args: {
    name: 'settings',
    size: 24,
  },
};

// Size variations
export const Sizes: Story = {
  name: '02 Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="user" size="small" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Small (16px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="user" size="medium" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Medium (24px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="user" size="large" />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Large (32px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="user" size={48} />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Custom (48px)</p>
      </div>
    </div>
  ),
};

// Color variations
export const Colors: Story = {
  name: '03 Colors',
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <Icon name="warning" size={24} color="#f59e0b" />
      <Icon name="checkmark-filled" size={24} color="#10b981" />
      <Icon name="error" size={24} color="#ef4444" />
      <Icon name="information" size={24} color="#3b82f6" />
      <Icon name="favorite-filled" size={24} color="#ec4899" />
    </div>
  ),
};

// Interactive icons
export const Interactive: Story = {
  name: '04 Interactive',
  render: () => {
    const handleClick = (iconName: string) => {
      alert(`Clicked ${iconName} icon`);
    };

    return (
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Icon
          name="edit"
          size={20}
          onClick={() => handleClick('edit')}
          alt="Edit item"
          color="#3b82f6"
        />
        <Icon
          name="delete"
          size={20}
          onClick={() => handleClick('delete')}
          alt="Delete item"
          color="#ef4444"
        />
        <Icon
          name="save"
          size={20}
          onClick={() => handleClick('save')}
          alt="Save changes"
          color="#10b981"
        />
        <Icon
          name="share"
          size={20}
          onClick={() => handleClick('share')}
          alt="Share content"
          color="#8b5cf6"
        />
      </div>
    );
  },
};

// Icons in buttons
export const InButtons: Story = {
  name: '05 In Buttons',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary">
        <Icon name="add" size={16} color="white" />
        <span style={{ marginLeft: '8px' }}>Add Item</span>
      </Button>
      <Button variant="secondary">
        <Icon name="download" size={16} />
        <span style={{ marginLeft: '8px' }}>Download</span>
      </Button>
      <Button variant="danger">
        <Icon name="trash-can" size={16} color="white" />
        <span style={{ marginLeft: '8px' }}>Delete</span>
      </Button>
      <Button variant="ghost">
        <Icon name="settings" size={16} />
        <span style={{ marginLeft: '8px' }}>Settings</span>
      </Button>
    </div>
  ),
};

// Common UI icons
export const CommonIcons: Story = {
  name: '06 Common Icons',
  render: () => {
    const iconGroups = {
      'Navigation': ['home', 'arrow-left', 'arrow-right', 'chevron-down', 'chevron-up', 'menu', 'close'],
      'Actions': ['add', 'edit', 'delete', 'save', 'download', 'upload', 'share', 'copy'],
      'Status': ['checkmark', 'close', 'warning', 'error', 'information', 'help'],
      'User': ['user', 'user-avatar', 'user-multiple', 'login', 'logout'],
      'Files': ['document', 'folder', 'attachment', 'image', 'pdf'],
      'Communication': ['email', 'chat', 'notification', 'send'],
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {Object.entries(iconGroups).map(([category, icons]) => (
          <div key={category}>
            <h4 style={{ marginBottom: '1rem', color: '#374151', fontSize: '14px', fontWeight: 600 }}>
              {category}
            </h4>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {icons.map(iconName => (
                <div
                  key={iconName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    minWidth: '80px',
                    backgroundColor: '#fff',
                  }}
                >
                  <Icon name={iconName} size={20} />
                  <span style={{ marginTop: '8px', fontSize: '11px', color: '#6b7280' }}>
                    {iconName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// Icon gallery - Browse all available icons
export const IconGallery: Story = {
  name: '07 Icon Gallery',
  render: () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    
    // Categorize icons
    const categorizedIcons = React.useMemo(() => {
      const categories: Record<string, string[]> = {
        'all': [],
        'arrows': [],
        'user': [],
        'file': [],
        'chart': [],
        'communication': [],
        'status': [],
        'action': [],
        'other': [],
      };

      Object.keys(carbonIconMapping).forEach(iconName => {
        categories.all.push(iconName);
        
        if (iconName.includes('arrow') || iconName.includes('chevron')) {
          categories.arrows.push(iconName);
        } else if (iconName.includes('user') || iconName.includes('person')) {
          categories.user.push(iconName);
        } else if (iconName.includes('document') || iconName.includes('file') || iconName.includes('folder')) {
          categories.file.push(iconName);
        } else if (iconName.includes('chart') || iconName.includes('graph') || iconName.includes('analytics')) {
          categories.chart.push(iconName);
        } else if (iconName.includes('email') || iconName.includes('chat') || iconName.includes('send')) {
          categories.communication.push(iconName);
        } else if (iconName.includes('warning') || iconName.includes('error') || iconName.includes('success') || iconName.includes('checkmark')) {
          categories.status.push(iconName);
        } else if (['add', 'edit', 'delete', 'save', 'copy', 'cut', 'paste'].some(action => iconName.includes(action))) {
          categories.action.push(iconName);
        } else {
          categories.other.push(iconName);
        }
      });

      return categories;
    }, []);

    const filteredIcons = React.useMemo(() => {
      const icons = categorizedIcons[selectedCategory] || categorizedIcons.all;
      if (!searchTerm) return icons;
      
      return icons.filter(iconName => 
        iconName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [searchTerm, selectedCategory, categorizedIcons]);

    return (
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        {/* Search and filter controls */}
        <div style={{ marginBottom: '2rem' }}>
          <input
            type="text"
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: '14px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          />
          
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {Object.keys(categorizedIcons).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '6px 12px',
                  fontSize: '13px',
                  border: '1px solid',
                  borderColor: selectedCategory === category ? '#3b82f6' : '#d1d5db',
                  borderRadius: '6px',
                  backgroundColor: selectedCategory === category ? '#eff6ff' : '#fff',
                  color: selectedCategory === category ? '#3b82f6' : '#6b7280',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
              >
                {category} ({categorizedIcons[category].length})
              </button>
            ))}
          </div>
        </div>

        {/* Icons grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
          gap: '1rem',
        }}>
          {filteredIcons.map(iconName => (
            <div
              key={iconName}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px 8px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => navigator.clipboard.writeText(iconName)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#fff';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
              title={`Click to copy: ${iconName}`}
            >
              <Icon name={iconName} size={24} />
              <span style={{ 
                marginTop: '8px', 
                fontSize: '11px', 
                color: '#6b7280',
                textAlign: 'center',
                wordBreak: 'break-word',
              }}>
                {iconName}
              </span>
            </div>
          ))}
        </div>

        {filteredIcons.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#6b7280',
          }}>
            No icons found matching "{searchTerm}"
          </div>
        )}

        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          fontSize: '13px',
          color: '#6b7280',
        }}>
          <strong>Tip:</strong> Click any icon to copy its name to clipboard. 
          Use the copied name in the <code style={{ 
            backgroundColor: '#e5e7eb', 
            padding: '2px 6px',
            borderRadius: '4px',
          }}>name</code> prop.
        </div>
      </div>
    );
  },
};

// Icon with loading states
export const LoadingStates: Story = {
  name: '08 Loading States',
  render: () => {
    const [loading, setLoading] = React.useState(false);
    const [iconName, setIconName] = React.useState('download');

    const handleLoadNewIcon = () => {
      setLoading(true);
      // Simulate loading a new icon
      setTimeout(() => {
        const icons = ['upload', 'refresh', 'sync', 'cloud-download'];
        setIconName(icons[Math.floor(Math.random() * icons.length)]);
        setLoading(false);
      }, 1000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ 
          minHeight: '60px', 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {loading ? (
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '4px',
              backgroundColor: '#e5e7eb',
              animation: 'pulse 1.5s ease-in-out infinite',
            }} />
          ) : (
            <Icon name={iconName} size={32} />
          )}
        </div>
        <button
          onClick={handleLoadNewIcon}
          style={{
            padding: '8px 16px',
            fontSize: '14px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
        >
          Load Random Icon
        </button>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>
          Current: {iconName}
        </p>
      </div>
    );
  },
};

// Accessibility example
export const Accessibility: Story = {
  name: '09 Accessibility',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: 600 }}>
          Icons with Semantic Meaning
        </h4>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '1rem' }}>
          Always provide alt text when icons convey important information
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Icon name="warning" size={24} color="#f59e0b" alt="Warning: Action required" />
          <Icon name="checkmark-filled" size={24} color="#10b981" alt="Success: Operation completed" />
          <Icon name="error" size={24} color="#ef4444" alt="Error: Failed to save" />
        </div>
      </div>

      <div>
        <h4 style={{ marginBottom: '1rem', fontSize: '14px', fontWeight: 600 }}>
          Decorative Icons
        </h4>
        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '1rem' }}>
          Decorative icons should have empty alt text or aria-hidden
        </p>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="star" size={16} alt="" />
            <span>Featured Item</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="calendar" size={16} alt="" />
            <span>March 15, 2024</span>
          </div>
        </div>
      </div>
    </div>
  ),
};