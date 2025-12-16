import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate/PageTemplate';
import DemoNavigation from '../components/DemoNavigation';
import Tabs, { TabItem } from '../components/Tabs/Tabs';
import Icon from '../components/Icon/Icon';

const TabsDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  // Sample tab data
  const sampleTabs: TabItem[] = [
    {
      id: 'tab1',
      label: 'Overview',
      content: (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Overview Content</h3>
          <p className="text-gray-600">
            This is the overview tab content. It contains general information about the current section.
          </p>
        </div>
      )
    },
    {
      id: 'tab2',
      label: 'Details',
      content: (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Details Content</h3>
          <p className="text-gray-600">
            This tab shows detailed information and specific data points.
          </p>
        </div>
      )
    },
    {
      id: 'tab3',
      label: 'Settings',
      content: (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Settings Content</h3>
          <p className="text-gray-600">
            Configuration and settings options are displayed in this tab.
          </p>
        </div>
      )
    },
    {
      id: 'tab4',
      label: 'Disabled',
      disabled: true,
      content: (
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-3">Disabled Content</h3>
          <p className="text-gray-600">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      )
    }
  ];

  const compactTabs: TabItem[] = [
    { id: 'compact1', label: 'Tab 1' },
    { id: 'compact2', label: 'Tab 2' },
    { id: 'compact3', label: 'Tab 3' }
  ];

  return (
    <PageTemplate
      title="Tabs Component"
      subtitle="Interactive tab navigation component with multiple states"
      breadcrumbs={[
        { label: 'ODL Components', path: '/' },
        { label: 'Tabs' }
      ]}
      showLeftNavRail={false}
      showRightNavRail={false}
    >
      <DemoNavigation title="Tabs" />
      
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tabs Component</h1>
            <p className="text-gray-600 mt-1">Interactive tab navigation with active, inactive, and hover states</p>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="navigation" className="w-6 h-6 text-blue-600" />
            <span className="text-lg font-semibold text-blue-600">Tabs</span>
          </div>
        </div>

        {/* Basic Tabs Example */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Basic Tabs</h3>
            <p className="text-sm text-gray-600 mt-1">Default tabs with content switching</p>
          </div>
          <div className="p-6">
            <Tabs
              tabs={sampleTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>
        </div>

        {/* Compact Tabs Example */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Compact Tabs</h3>
            <p className="text-sm text-gray-600 mt-1">Smaller tabs for space-constrained layouts</p>
          </div>
          <div className="p-6">
            <Tabs
              tabs={compactTabs}
              variant="compact"
              showContent={false}
            />
          </div>
        </div>

        {/* States Documentation */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Tab States</h3>
            <p className="text-sm text-gray-600 mt-1">Different visual states for tabs</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Active State</h4>
              <p className="text-sm text-gray-600 mb-3">
                Active tabs have blue text (#0F62FE) and a blue underline indicator.
              </p>
              <div className="bg-white border border-gray-200 rounded p-4">
                <Tabs
                  tabs={[
                    { id: 'active', label: 'Label' },
                    { id: 'inactive1', label: 'Label' },
                    { id: 'inactive2', label: 'Label' },
                    { id: 'inactive3', label: 'Label' }
                  ]}
                  activeTab="active"
                  showContent={false}
                />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Hover State</h4>
              <p className="text-sm text-gray-600 mb-3">
                Hover over inactive tabs to see the light gray background (#F4F4F4).
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Disabled State</h4>
              <p className="text-sm text-gray-600 mb-3">
                Disabled tabs have reduced opacity and cannot be interacted with.
              </p>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Usage Examples</h3>
            <p className="text-sm text-gray-600 mt-1">Code examples and implementation details</p>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <pre className="whitespace-pre-wrap">
{`import Tabs, { TabItem } from '../components/Tabs/Tabs';

const tabs: TabItem[] = [
  {
    id: 'tab1',
    label: 'Overview',
    content: &lt;div&gt;Tab content here&lt;/div&gt;
  },
  {
    id: 'tab2', 
    label: 'Details',
    content: &lt;div&gt;More content&lt;/div&gt;
  }
];

&lt;Tabs
  tabs={tabs}
  activeTab="tab1"
  onTabChange={(tabId) =&gt; console.log(tabId)}
/&gt;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Props & Interface</h3>
            <p className="text-sm text-gray-600 mt-1">Component properties and TypeScript interfaces</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">TabsProps</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><code>tabs: TabItem[]</code> - Array of tab items</li>
                  <li><code>activeTab?: string</code> - Currently active tab ID</li>
                  <li><code>onTabChange?: (tabId: string) =&gt; void</code> - Tab change callback</li>
                  <li><code>variant?: 'default' | 'compact'</code> - Tab size variant</li>
                  <li><code>className?: string</code> - Additional CSS classes</li>
                  <li><code>showContent?: boolean</code> - Whether to show tab content</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-800 mb-2">TabItem</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><code>id: string</code> - Unique tab identifier</li>
                  <li><code>label: string</code> - Tab display text</li>
                  <li><code>content?: React.ReactNode</code> - Tab content</li>
                  <li><code>disabled?: boolean</code> - Whether tab is disabled</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Accessibility */}
        <div className="border border-[#EDF1F5] rounded-lg">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Accessibility</h3>
            <p className="text-sm text-gray-600 mt-1">ARIA attributes and keyboard navigation</p>
          </div>
          <div className="p-6">
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Uses proper ARIA roles: <code>tablist</code>, <code>tab</code>, <code>tabpanel</code></li>
              <li>• <code>aria-selected</code> indicates active tab state</li>
              <li>• <code>aria-disabled</code> for disabled tabs</li>
              <li>• Keyboard navigation support (Tab, Arrow keys)</li>
              <li>• Focus indicators for screen readers</li>
            </ul>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default TabsDemo; 