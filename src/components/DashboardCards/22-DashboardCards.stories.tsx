import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DashboardCards from './DashboardCards';
import IconButton from '../IconButton/IconButton';
import {
  Analytics,
  User,
  Revenue,
  Growth,
  ChartLine,
  ShoppingCart,
  Time,
  CheckmarkFilled,
  WarningFilled,
  Settings,
  Download,
  View,
  Edit
} from '@carbon/icons-react';

const meta: Meta<typeof DashboardCards> = {
  title: 'Design System/Components/DashboardCards',
  component: DashboardCards,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL DashboardCards component for displaying key metrics, KPIs, and dashboard information. Supports multiple variants, trends, progress indicators, and interactive actions.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the card',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      control: 'text',
      description: 'Main value or metric to display',
      table: {
        type: { summary: 'string | number' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional subtitle or description',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'compact', 'detailed'],
      description: 'Card variant style',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Whether the card is in loading state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClick: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Click handler for the entire card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic dashboard card
export const Default: Story = {
  args: {
    value: 'Security Operations Center',
    subtitle: 'Centralised monitoring and management of security events, threat detection, and incident response.',
    icon: 'user',
  },
};

// All variants showcase
export const AllVariants: Story = {
  name: '02 All Variants',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Card Variants</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <DashboardCards
            value="Data Analytics Platform"
            subtitle="Advanced analytics and data visualization tools for comprehensive business intelligence and reporting capabilities."
            icon="user"
            variant="default"
            modifiedText="Modified on 15 Mar 2026 by John Stevens"
          />
          <DashboardCards
            value="Customer Portal"
            subtitle="Self-service customer interface providing account management, support tickets, and service requests."
            icon="user"
            variant="compact"
            modifiedText="Modified on 22 Jan 2026 by Maria Garcia"
          />
          <DashboardCards
            value="Compliance Management"
            subtitle="Regulatory compliance tracking and audit management system for enterprise governance requirements."
            icon="user"
            variant="detailed"
            modifiedText="Modified on 08 Feb 2026 by James Wilson"
          />
        </div>
      </div>
    </div>
  ),
};


// Cards with actions
export const WithActions: Story = {
  name: '03 With Actions',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Cards with Action Buttons</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <DashboardCards
            value="Inventory Management System"
            subtitle="Real-time inventory tracking with automated reordering, supplier management, and stock level optimization."
            icon="user"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <IconButton icon="view" variant="ghost" size="medium" aria-label="View report" />
                <IconButton icon="download" variant="ghost" size="medium" aria-label="Download report" />
              </div>
            }
            modifiedText="Modified on 18 Mar 2026 by Alex Johnson"
          />
          <DashboardCards
            value="Customer Relationship Hub"
            subtitle="Comprehensive CRM platform for lead management, sales tracking, and customer communication workflows."
            icon="user"
            actions={
              <IconButton icon="settings" variant="ghost" size="medium" aria-label="Manage permissions" />
            }
            modifiedText="Modified on 02 Feb 2026 by Emily Davis"
          />
          <DashboardCards
            value="Quality Assurance Platform"
            subtitle="Integrated testing and quality control system with automated testing pipelines and defect tracking."
            icon="user"
            actions={
              <IconButton icon="view" variant="ghost" size="medium" aria-label="View details" />
            }
            modifiedText="Modified on 25 Jan 2026 by Mark Wilson"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive cards
export const Interactive: Story = {
  name: '04 Interactive',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Clickable Cards</h4>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6C757D' }}>
          These cards are clickable and will show hover effects. Click to see interaction.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <DashboardCards
            value="Financial Analytics Suite"
            subtitle="Advanced financial reporting and analytics platform with real-time budget tracking and forecasting tools."
            icon="user"
            onClick={() => alert('Navigating to Financial Analytics Suite...')}
            modifiedText="Modified on 30 Mar 2026 by Thomas Anderson"
          />
          <DashboardCards
            value="Human Resources Portal"
            subtitle="Comprehensive HR management system for employee records, payroll processing, and benefits administration."
            icon="user"
            onClick={() => alert('Opening Human Resources Portal...')}
            modifiedText="Modified on 14 Apr 2026 by Rachel Green"
          />
          <DashboardCards
            value="Supply Chain Dashboard"
            subtitle="End-to-end supply chain visibility with vendor management, logistics tracking, and procurement workflows."
            icon="user"
            onClick={() => alert('Opening Supply Chain Dashboard...')}
            variant="compact"
            modifiedText="Modified on 07 Feb 2026 by Chris Lee"
          />
        </div>
      </div>
    </div>
  ),
};


// Dashboard grid example
export const DashboardGrid: Story = {
  name: '05 Dashboard Grid Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600 }}>Sample Dashboard Layout</h4>
        <p style={{ marginBottom: '24px', fontSize: '14px', color: '#6C757D' }}>
          Example of how dashboard cards work together in a typical dashboard layout.
        </p>
        
        {/* Key Metrics Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <DashboardCards
            value="Marketing Automation Platform"
            subtitle="Multi-channel marketing campaign management with lead scoring, email automation, and analytics tracking."
            icon="user"
            variant="compact"
            modifiedText="Modified on 20 Apr 2026 by Jessica Miller"
          />
          <DashboardCards
            value="Data Warehouse Platform"
            subtitle="Enterprise data storage and analytics platform with ETL pipelines, data modeling, and business intelligence tools."
            icon="user"
            variant="compact"
            modifiedText="Modified on 03 May 2026 by Ryan Cooper"
          />
          <DashboardCards
            value="Cloud Infrastructure Console"
            subtitle="Multi-cloud infrastructure management with resource provisioning, cost optimization, and security monitoring."
            icon="user"
            variant="compact"
            modifiedText="Modified on 16 Feb 2026 by Nicole Adams"
          />
          <DashboardCards
            value="API Management Gateway"
            subtitle="Comprehensive API lifecycle management with rate limiting, authentication, and developer portal integration."
            icon="user"
            variant="compact"
            modifiedText="Modified on 09 Apr 2026 by Daniel Roberts"
          />
        </div>

        {/* Detailed Cards Row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <DashboardCards
            value="E-commerce Platform"
            subtitle="Complete online retail solution with product catalog, payment processing, and order fulfillment management."
            icon="user"
            onClick={() => alert('Opening E-commerce Platform...')}
            modifiedText="Modified on 13 Mar 2026 by Stephanie Clark"
          />
          <DashboardCards
            value="Learning Management System"
            subtitle="Educational platform with course creation, student tracking, assessment tools, and certification management."
            icon="user"
            actions={
              <IconButton icon="view" variant="ghost" size="medium" aria-label="View project details" />
            }
            modifiedText="Modified on 27 Apr 2026 by Brandon Lewis"
          />
          <DashboardCards
            value="Telecommunications Hub"
            subtitle="Unified communications platform with VoIP, video conferencing, messaging, and contact center capabilities."
            icon="user"
            onClick={() => alert('Opening Telecommunications Hub...')}
            modifiedText="Modified on 21 Feb 2026 by Michelle Turner"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  name: '06 Playground',
  args: {
    value: 'Security Operations Center',
    subtitle: 'Centralised monitoring and management of security events, threat detection, and incident response.',
    icon: 'user',
    variant: 'default',
    loading: false,
    onClick: () => alert('Card clicked!'),
  },
};