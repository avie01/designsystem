import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import PageTemplate from './PageTemplate';
import NavigationRail from '../NavigationRail/NavigationRail';
import Icon from '../Icon/Icon';

const meta: Meta<typeof PageTemplate> = {
  title: 'Components/PageTemplate',
  component: PageTemplate,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    showNavRail: {
      control: 'boolean',
    },
    brandColor: {
      control: 'color',
    },
    headerColor: {
      control: 'color',
    },
    navRailColor: {
      control: 'color',
    },
    backgroundColor: {
      control: 'color',
    },
    containerColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMenuItems = [
  { 
    id: 'dashboard', 
    iconName: 'dashboard', 
    label: 'Dashboard', 
    path: '/',
    description: 'Overview of your system metrics'
  },
  { 
    id: 'analytics', 
    iconName: 'analytics', 
    label: 'Analytics', 
    path: '/analytics',
    description: 'View detailed analytics and reporting'
  },
  { 
    id: 'settings', 
    iconName: 'settings', 
    label: 'Settings', 
    path: '/settings',
    description: 'Configure system preferences'
  },
];

const sampleNavRail = (
  <NavigationRail
    currentPath="/"
    menuItems={sampleMenuItems}
    onNavigate={(path) => console.log('Navigate to:', path)}
    collapsed={true}
    showTooltips={true}
  />
);

export const Default: Story = {
  args: {
    title: 'H1',
    subtitle: 'Page subtitle',
    brandColor: '#ff0000',
    headerColor: '#2a7d2a',
    navRailColor: '#dc0016',
    backgroundColor: '#3560c1',
    containerColor: '#f3ad2e',
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Welcome to the Page Template</h2>
        <p className="text-gray-600">
          This template matches the Figma design with customizable colors:
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="font-semibold">Brand Color</span>
            </div>
            <p className="text-gray-600">Top strip - can be changed</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-green-600 rounded"></div>
              <span className="font-semibold">Header Area</span>
            </div>
            <p className="text-gray-600">Red + green header section</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              <span className="font-semibold">Nav Rail</span>
            </div>
            <p className="text-gray-600">Left side navigation</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              <span className="font-semibold">Background</span>
            </div>
            <p className="text-gray-600">Main content background</p>
          </div>
        </div>
      </div>
    ),
    navRail: sampleNavRail,
  },
};

export const WithoutNavRail: Story = {
  args: {
    title: 'Full Width Page',
    subtitle: 'This page uses the full width without navigation rail',
    showNavRail: false,
    children: (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Full Width Content</h2>
        <p className="text-gray-600">
          This page template can be used without the navigation rail for full-width layouts.
        </p>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Content Area</h3>
          <p className="text-gray-600">
            The content area uses the exact colors and styling from the Figma design:
          </p>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Background: #3560c1 (Primary Main Obj Blue)</li>
            <li>• Container: #f3ad2e (Warning Main Obj Trapeze)</li>
            <li>• Inner container: White with rounded corners</li>
            <li>• Typography: Noto Sans SemiBold, 20px, line-height 36px</li>
          </ul>
        </div>
      </div>
    ),
  },
};

export const WithCustomContent: Story = {
  args: {
    title: 'Custom Layout',
    subtitle: 'Demonstrating the flexible content area',
    navRail: sampleNavRail,
    children: (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2">Section 1</h3>
            <p className="text-blue-700 text-sm">
              This demonstrates how the page template can accommodate various content layouts.
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2">Section 2</h3>
            <p className="text-green-700 text-sm">
              The template maintains the Figma design specifications while allowing flexible content.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">Design Specifications</h3>
          <div className="grid grid-cols-4 gap-4 text-xs">
            <div>
              <div className="w-4 h-4 bg-[#ff0000] rounded mb-1"></div>
              <p>Brand Bar: #ff0000</p>
            </div>
            <div>
              <div className="w-4 h-4 bg-[#2a7d2a] rounded mb-1"></div>
              <p>Header: #2a7d2a</p>
            </div>
            <div>
              <div className="w-4 h-4 bg-[#dc0016] rounded mb-1"></div>
              <p>Nav Rail: #dc0016</p>
            </div>
            <div>
              <div className="w-4 h-4 bg-[#3560c1] rounded mb-1"></div>
              <p>Background: #3560c1</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
}; 