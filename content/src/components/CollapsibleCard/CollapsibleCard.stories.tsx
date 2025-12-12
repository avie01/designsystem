import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import CollapsibleCard from './CollapsibleCard';

const meta: Meta<typeof CollapsibleCard> = {
  title: 'Components/Cards/CollapsibleCard',
  component: CollapsibleCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL CollapsibleCard component for creating expandable/collapsible content sections. Supports custom content and toggle callbacks. Fully accessible with ARIA attributes and follows ODL design system guidelines.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title displayed in the card header',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultExpanded: {
      control: 'boolean',
      description: 'Whether the card is expanded by default',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onToggle: {
      description: 'Callback when the card is toggled',
      table: {
        type: { summary: '(expanded: boolean) => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Collapsible Section',
    children: (
      <div>
        <p>This is the collapsible content. Click the header to toggle visibility.</p>
      </div>
    ),
  },
};

export const DefaultExpanded: Story = {
  args: {
    title: 'Expanded by Default',
    defaultExpanded: true,
    children: (
      <div>
        <p>This card starts in the expanded state.</p>
      </div>
    ),
  },
};

export const WithRichContent: Story = {
  render: () => (
    <CollapsibleCard title="Project Details">
      <div style={{ padding: '8px 0' }}>
        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Description</h4>
        <p style={{ marginBottom: '16px', color: '#6b7280' }}>
          This is a comprehensive project that involves multiple phases and team members.
        </p>

        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Timeline</h4>
        <ul style={{ marginBottom: '16px', paddingLeft: '20px', color: '#6b7280' }}>
          <li>Phase 1: Planning (2 weeks)</li>
          <li>Phase 2: Development (6 weeks)</li>
          <li>Phase 3: Testing (2 weeks)</li>
        </ul>

        <h4 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>Team</h4>
        <p style={{ color: '#6b7280' }}>5 developers, 2 designers, 1 project manager</p>
      </div>
    </CollapsibleCard>
  ),
};

export const MultipleCards: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <CollapsibleCard title="Personal Information" defaultExpanded={true}>
        <div style={{ padding: '8px 0' }}>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Email:</strong> john.doe@example.com</p>
          <p><strong>Phone:</strong> +1 234 567 8900</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Address Details">
        <div style={{ padding: '8px 0' }}>
          <p><strong>Street:</strong> 123 Main Street</p>
          <p><strong>City:</strong> San Francisco</p>
          <p><strong>State:</strong> CA</p>
          <p><strong>Zip:</strong> 94102</p>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Preferences">
        <div style={{ padding: '8px 0' }}>
          <p><strong>Language:</strong> English</p>
          <p><strong>Timezone:</strong> Pacific Time (PT)</p>
          <p><strong>Notifications:</strong> Enabled</p>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const FAQSection: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '700px' }}>
      <h3 style={{ marginBottom: '8px', fontSize: '20px', fontWeight: 600 }}>Frequently Asked Questions</h3>

      <CollapsibleCard title="What is the ODL Design System?">
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          The ODL Design System is a comprehensive library of reusable UI components designed to
          maintain consistency and accelerate development across all ODL applications.
        </p>
      </CollapsibleCard>

      <CollapsibleCard title="How do I install the components?">
        <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '8px' }}>You can install the ODL Design System using npm:</p>
          <code style={{
            background: '#f3f4f6',
            padding: '8px 12px',
            borderRadius: '4px',
            display: 'block',
            fontFamily: 'monospace'
          }}>
            npm install @odl/design-system
          </code>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Are the components accessible?">
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          Yes! All ODL components follow WCAG 2.1 AA standards and include proper ARIA attributes,
          keyboard navigation, and screen reader support.
        </p>
      </CollapsibleCard>

      <CollapsibleCard title="Can I customize the components?">
        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
          Absolutely! Components support custom styling through className and style props,
          and the design system uses CSS variables for easy theming.
        </p>
      </CollapsibleCard>
    </div>
  ),
};

export const WithNestedContent: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <CollapsibleCard title="Project Settings">
        <div style={{ padding: '8px 0' }}>
          <CollapsibleCard title="General Settings">
            <div style={{ padding: '8px 0' }}>
              <p><strong>Project Name:</strong> Website Redesign</p>
              <p><strong>Status:</strong> Active</p>
              <p><strong>Priority:</strong> High</p>
            </div>
          </CollapsibleCard>

          <div style={{ marginTop: '12px' }}>
            <CollapsibleCard title="Team Members">
              <div style={{ padding: '8px 0' }}>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ padding: '4px 0' }}>Alice Johnson - Lead Developer</li>
                  <li style={{ padding: '4px 0' }}>Bob Smith - Designer</li>
                  <li style={{ padding: '4px 0' }}>Carol White - Project Manager</li>
                </ul>
              </div>
            </CollapsibleCard>
          </div>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const WithTable: Story = {
  render: () => (
    <div style={{ maxWidth: '800px' }}>
      <CollapsibleCard title="Transaction History" defaultExpanded={true}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Description</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: 600 }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>2024-01-15</td>
                <td style={{ padding: '12px' }}>Payment received</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#059669' }}>+$1,250.00</td>
                <td style={{ padding: '12px' }}>Completed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>2024-01-14</td>
                <td style={{ padding: '12px' }}>Service charge</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#dc2626' }}>-$45.00</td>
                <td style={{ padding: '12px' }}>Completed</td>
              </tr>
              <tr>
                <td style={{ padding: '12px' }}>2024-01-13</td>
                <td style={{ padding: '12px' }}>Refund processed</td>
                <td style={{ padding: '12px', textAlign: 'right', color: '#059669' }}>+$89.99</td>
                <td style={{ padding: '12px' }}>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const WithForm: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <CollapsibleCard title="Additional Information" defaultExpanded={true}>
        <div style={{ padding: '8px 0' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
              Company Name
            </label>
            <input
              type="text"
              placeholder="Enter company name"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
              Industry
            </label>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option>Select industry</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Education</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
              Comments
            </label>
            <textarea
              placeholder="Enter any additional comments"
              rows={4}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
            />
          </div>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const DashboardPanels: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
      <CollapsibleCard title="Recent Activity" defaultExpanded={true}>
        <div style={{ padding: '8px 0' }}>
          <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>New user registered</p>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>2 minutes ago</p>
          </div>
          <div style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb' }}>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>Project updated</p>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>15 minutes ago</p>
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: 500 }}>Task completed</p>
            <p style={{ fontSize: '12px', color: '#6b7280' }}>1 hour ago</p>
          </div>
        </div>
      </CollapsibleCard>

      <CollapsibleCard title="Quick Stats" defaultExpanded={true}>
        <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Active Projects</span>
            <strong>24</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Pending Tasks</span>
            <strong>156</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280' }}>Team Members</span>
            <strong>12</strong>
          </div>
        </div>
      </CollapsibleCard>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    title: 'Collapsible Section',
    defaultExpanded: false,
    children: (
      <div>
        <p>This is the collapsible content. Click the header to toggle visibility.</p>
        <p>You can put any content here, including text, images, forms, or other components.</p>
      </div>
    ),
  },
};
