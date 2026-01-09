import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Design System/Components/Icon/New Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Testing the 300 new Carbon icons that were added to the design system.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Sample of new icons from different categories
const newIcons = [
  // AI & Machine Learning
  'ai-generate',
  'ai-launch',
  'ai-recommend',
  
  // User & Identity
  'user-avatar',
  'user-admin',
  'person-favorite',
  
  // Weather & Environment
  'earth-americas',
  'moonrise',
  'palm-tree',
  
  // Data & Analytics
  'chart-bubble',
  'chart-candlestick',
  'business-metrics',
  
  // Communication & Social
  'chat-bot',
  'calls-incoming',
  'logo-snapchat',
  
  // Security & Privacy
  'encryption',
  'hardware-security-module',
  'document-security',
  
  // Files & Storage
  'document-pdf',
  'document-video',
  'archive',
  
  // Transportation & Travel
  'car',
  'bus',
  'airport-location',
  
  // Business & Finance
  'currency-dollar',
  'finance',
  'receipt',
  
  // Health & Medical
  'hospital',
  'health-cross',
  'crop-health',
  
  // Sports & Gaming
  'basketball',
  'trophy',
  'game-console',
  
  // Status & Indicators
  'checkmark-filled',
  'battery-warning',
  'event-warning',
  
  // Tools & Utilities
  'filter-edit',
  'calendar-settings',
  'build-tool',
  
  // Media & Content
  'camera-action',
  'audio-console',
  'image-search',
];

export const NewIconShowcase: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '16px',
      padding: '20px',
      maxWidth: '800px'
    }}>
      {newIcons.map((iconName) => (
        <div 
          key={iconName}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '12px',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            textAlign: 'center',
            backgroundColor: '#fafafa'
          }}
        >
          <Icon name={iconName} size={32} />
          <span style={{ 
            fontSize: '12px', 
            marginTop: '8px',
            wordBreak: 'break-word'
          }}>
            {iconName}
          </span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A showcase of 45 newly added Carbon icons from various categories including AI, User Identity, Weather, Data Analytics, and more.',
      },
    },
  },
};

export const CategoryPreview: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>New Icon Categories</h2>
      
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '500' }}>AI & Machine Learning</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['ai-generate', 'ai-launch', 'ai-recommend'].map(icon => (
            <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name={icon} size={20} />
              <span style={{ fontSize: '14px' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '500' }}>Currency & Finance</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['currency-dollar', 'currency-euro', 'currency-yen', 'finance', 'receipt'].map(icon => (
            <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name={icon} size={20} />
              <span style={{ fontSize: '14px' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '500' }}>Advanced Charts</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['chart-bubble', 'chart-candlestick', 'chart-bullet', 'chart-area-smooth'].map(icon => (
            <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name={icon} size={20} />
              <span style={{ fontSize: '14px' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '500' }}>Enhanced Security</h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['encryption', 'hardware-security-module', 'document-security'].map(icon => (
            <div key={icon} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Icon name={icon} size={20} />
              <span style={{ fontSize: '14px' }}>{icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px', marginTop: '20px' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '16px', fontWeight: '500' }}>✨ What's New</h4>
        <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
          <li>300 additional Carbon Design System icons</li>
          <li>17 different categories including AI, Finance, Health, Sports, and more</li>
          <li>Enhanced security, development, and communication icon sets</li>
          <li>Advanced chart and visualization icons</li>
          <li>All icons follow Carbon Design System standards</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'A categorized preview of the new icon additions, organized by functional area.',
      },
    },
  },
};

export const TestSpecificIcons: Story = {
  render: () => {
    const testIcons = [
      '4-k',
      'earth-filled',
      'chat-bot',
      'trophy-filled',
      'user-avatar-filled',
      'anchor',
      'bring-forward'
    ];
    
    return (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '16px' }}>Testing Specific New Icons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {testIcons.map((iconName) => (
            <div 
              key={iconName}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            >
              <Icon name={iconName} size={24} />
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{iconName}</span>
              <span style={{ fontSize: '12px', color: '#666', marginLeft: 'auto' }}>
                New icon from 300 additions
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};