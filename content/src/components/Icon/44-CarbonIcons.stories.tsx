import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as CarbonIcons from '@carbon/icons-react';

// Group icons by category
const iconCategories = {
  'Common Actions': [
    'Add', 'Subtract', 'Close', 'Checkmark', 'Edit', 'Delete', 'Save', 'Download',
    'Upload', 'Copy', 'Cut', 'Paste', 'Undo', 'Redo', 'Refresh', 'Reset'
  ],
  'Navigation': [
    'ChevronUp', 'ChevronDown', 'ChevronLeft', 'ChevronRight', 'ArrowUp', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'Home', 'Menu', 'OverflowMenuHorizontal', 'OverflowMenuVertical'
  ],
  'Status & Alerts': [
    'CheckmarkFilled', 'CloseFilled', 'WarningAlt', 'WarningAltFilled', 'Information',
    'InformationFilled', 'Help', 'HelpFilled', 'Error', 'ErrorFilled', 'CheckmarkOutline'
  ],
  'User & Account': [
    'User', 'UserAvatar', 'UserAvatarFilled', 'UserAdmin', 'UserMultiple', 'Login', 'Logout',
    'UserProfile', 'UserRole', 'UserSettings', 'Group'
  ],
  'Files & Documents': [
    'Document', 'DocumentAdd', 'DocumentDownload', 'DocumentExport', 'DocumentImport',
    'Folder', 'FolderAdd', 'FolderOpen', 'Archive', 'Attachment', 'DocumentPdf', 'DocumentView'
  ],
  'Communication': [
    'Email', 'EmailNew', 'Chat', 'Forum', 'Send', 'SendAlt', 'SendFilled', 'Phone',
    'PhoneFilled', 'Notification', 'NotificationFilled', 'NotificationNew'
  ],
  'Data & Analytics': [
    'ChartBar', 'ChartLine', 'ChartLineData', 'ChartPie', 'Analytics', 'Dashboard',
    'Report', 'ReportData', 'DataTable', 'TableOfContents', 'Growth'
  ],
  'Media': [
    'Play', 'PlayFilled', 'Pause', 'PauseFilled', 'Stop', 'StopFilled', 'SkipForward',
    'SkipBack', 'VolumeUp', 'VolumeDown', 'VolumeMute', 'Microphone', 'Video', 'Camera'
  ],
  'Time & Calendar': [
    'Time', 'TimeFilled', 'Calendar', 'CalendarAdd', 'Event', 'EventSchedule', 'Timer',
    'Alarm', 'AlarmAdd', 'Recently'
  ],
  'Settings & Tools': [
    'Settings', 'SettingsAdjust', 'Tools', 'Wrench', 'Build', 'Configure', 'Filter',
    'Search', 'ZoomIn', 'ZoomOut', 'View', 'ViewFilled', 'ViewOff'
  ],
  'E-commerce': [
    'ShoppingCart', 'ShoppingCartFilled', 'Purchase', 'Currency', 'CurrencyDollar',
    'Wallet', 'Receipt', 'Tag', 'TagEdit', 'Store'
  ],
  'Development': [
    'Code', 'Terminal', 'Application', 'Api', 'Branch', 'Fork', 'Merge', 'Commit',
    'Compare', 'DataBase', 'Debug', 'Deploy', 'Development'
  ],
  'Misc & Objects': [
    'Star', 'StarFilled', 'StarHalf', 'Favorite', 'FavoriteFilled', 'Heart', 'HeartFilled',
    'Bookmark', 'BookmarkFilled', 'Pin', 'PinFilled', 'Location', 'LocationFilled'
  ],
  'Logos': [
    'LogoGithub', 'LogoTwitter', 'LogoLinkedin', 'LogoFacebook', 'LogoInstagram',
    'LogoYoutube', 'LogoSlack', 'LogoSkype'
  ]
};

const meta: Meta = {
  title: 'Design System/Components/CarbonIcons',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Complete catalog of Carbon Design System icons used in ODL components. Click any icon to copy its import name.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [16, 20, 24, 32],
      description: 'Icon size in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 20 },
      },
    },
    color: {
      control: 'color',
      description: 'Icon color',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#161616' },
      },
    },
    category: {
      control: 'select',
      options: Object.keys(iconCategories),
      description: 'Filter by category',
      table: {
        type: { summary: 'string' },
      },
    },
    search: {
      control: 'text',
      description: 'Search icons by name',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<{
  size: number;
  color: string;
  category?: string;
  search?: string;
}>;

// Helper component to display icons
const IconDisplay: React.FC<{
  iconName: string;
  size: number;
  color: string;
}> = ({ iconName, size, color }) => {
  const Icon = (CarbonIcons as any)[iconName];

  if (!Icon) return null;

  const handleClick = () => {
    navigator.clipboard.writeText(iconName);
    const notification = document.createElement('div');
    notification.textContent = `Copied: ${iconName}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #24A148;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 14px;
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        padding: '16px',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '120px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#F4F4F4';
        e.currentTarget.style.borderColor = '#3560C1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = '#E0E0E0';
      }}
    >
      <Icon size={size} fill={color} />
      <span style={{ fontSize: '12px', color: '#525252', textAlign: 'center' }}>
        {iconName}
      </span>
    </div>
  );
};

// Main story - All Icons Grid
export const AllIcons: Story = {
  name: '01 All Icons',
  args: {
    size: 20,
    color: '#161616',
  },
  render: ({ size, color, category, search }) => {
    // Get all icons to display
    let iconsToShow: string[] = [];

    if (category && iconCategories[category as keyof typeof iconCategories]) {
      iconsToShow = iconCategories[category as keyof typeof iconCategories];
    } else if (!category) {
      // Show all icons from all categories
      iconsToShow = Object.values(iconCategories).flat();
    }

    // Filter by search term if provided
    if (search) {
      iconsToShow = iconsToShow.filter(name =>
        name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      <>
        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
        <div style={{ marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', color: '#525252' }}>
            Click any icon to copy its import name. Showing {iconsToShow.length} icons.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px',
          }}
        >
          {iconsToShow.map((iconName) => (
            <IconDisplay
              key={iconName}
              iconName={iconName}
              size={size}
              color={color}
            />
          ))}
        </div>
      </>
    );
  },
};

// Categorized View
export const CategorizedView: Story = {
  name: '02 Categorized View',
  args: {
    size: 20,
    color: '#161616',
  },
  render: ({ size, color }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {Object.entries(iconCategories).map(([category, icons]) => (
        <div key={category}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '16px',
            color: '#161616'
          }}>
            {category}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '12px',
            }}
          >
            {icons.map((iconName) => (
              <IconDisplay
                key={iconName}
                iconName={iconName}
                size={size}
                color={color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Icon Sizes Comparison
export const IconSizes: Story = {
  name: '03 Icon Sizes',
  render: () => {
    const sizes = [16, 20, 24, 32, 48];
    const sampleIcons = ['User', 'Settings', 'Search', 'Notification', 'Calendar'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sampleIcons.map(iconName => {
          const Icon = (CarbonIcons as any)[iconName];
          if (!Icon) return null;

          return (
            <div key={iconName} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              padding: '16px',
              border: '1px solid #E0E0E0',
              borderRadius: '4px',
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: 500,
                minWidth: '100px',
                color: '#161616'
              }}>
                {iconName}
              </span>
              {sizes.map(size => (
                <div
                  key={size}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Icon size={size} />
                  <span style={{ fontSize: '11px', color: '#8D8D8D' }}>
                    {size}px
                  </span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  },
};

// Color Variations
export const ColorVariations: Story = {
  name: '04 Color Variations',
  render: () => {
    const colors = {
      'Primary': '#3560C1',
      'Success': '#24A148',
      'Error': '#DA1E28',
      'Warning': '#F1C21B',
      'Info': '#0F62FE',
      'Text Primary': '#161616',
      'Text Secondary': '#525252',
      'Text Tertiary': '#8D8D8D',
    };

    const sampleIcons = ['CheckmarkFilled', 'WarningAltFilled', 'InformationFilled', 'CloseFilled'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {Object.entries(colors).map(([colorName, colorValue]) => (
          <div key={colorName} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            padding: '16px',
            border: '1px solid #E0E0E0',
            borderRadius: '4px',
          }}>
            <div style={{ minWidth: '150px' }}>
              <span style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
                {colorName}
              </span>
              <br />
              <span style={{ fontSize: '11px', color: '#8D8D8D' }}>
                {colorValue}
              </span>
            </div>
            {sampleIcons.map(iconName => {
              const Icon = (CarbonIcons as any)[iconName];
              if (!Icon) return null;

              return (
                <div
                  key={iconName}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Icon size={24} fill={colorValue} />
                  <span style={{ fontSize: '11px', color: '#8D8D8D' }}>
                    {iconName.replace('Filled', '')}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  },
};

// Commonly Used Icons
export const CommonlyUsed: Story = {
  name: '05 Commonly Used',
  args: {
    size: 24,
    color: '#161616',
  },
  render: ({ size, color }) => {
    const commonIcons = [
      'Add', 'Close', 'Checkmark', 'Edit', 'Delete', 'Search', 'Filter',
      'Download', 'Upload', 'Settings', 'User', 'Calendar', 'Time', 'Notification',
      'ChevronDown', 'ChevronRight', 'ArrowRight', 'Menu', 'Help', 'Information'
    ];

    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#161616' }}>
            Most Commonly Used Icons in ODL
          </h3>
          <p style={{ fontSize: '14px', color: '#525252', marginTop: '8px' }}>
            These icons are frequently used across ODL components.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: '16px',
          }}
        >
          {commonIcons.map((iconName) => (
            <IconDisplay
              key={iconName}
              iconName={iconName}
              size={size}
              color={color}
            />
          ))}
        </div>
      </div>
    );
  },
};