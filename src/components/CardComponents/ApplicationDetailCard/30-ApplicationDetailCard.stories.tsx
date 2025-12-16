import type { Meta, StoryObj } from '@storybook/react';
import ApplicationDetailCard from './ApplicationDetailCard';

const meta: Meta<typeof ApplicationDetailCard> = {
  title: 'Design System/Components/ApplicationDetailCard',
  component: ApplicationDetailCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component for displaying planning application details with labeled fields for site information, applicant details, and approval information.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: '01 Default',
  args: {
    siteAddress: '123 Main Street, Springfield, QLD 4300',
    reference: 'DA-2024-00123',
    applicant: 'John Smith Construction Pty Ltd',
    owner: 'Jane & Robert Thompson',
    contact: 'john.smith@construction.com.au',
    description: 'Proposed two-storey residential dwelling with attached garage and swimming pool',
    approver: 'Sarah Johnson, Senior Planning Officer',
  },
};

export const CommercialApplication: Story = {
  name: '02 Commercial Application',
  args: {
    siteAddress: '456 Industrial Park Drive, Logan Central, QLD 4114',
    reference: 'DA-2024-00456',
    applicant: 'Commercial Developments Australia',
    owner: 'Logan Industrial Holdings Ltd',
    contact: 'info@commercialdev.com.au',
    description: 'Development of a mixed-use commercial complex including retail spaces, office facilities, and underground parking for 150 vehicles',
    approver: 'Michael Chen, Principal Planner',
  },
};

export const Subdivision: Story = {
  name: '03 Subdivision',
  args: {
    siteAddress: 'Lot 42, Heritage Estate Road, Park Ridge, QLD 4125',
    reference: 'SUB-2024-00789',
    applicant: 'Heritage Estates Development Corporation',
    owner: 'Heritage Estates Development Corporation',
    contact: 'planning@heritageestates.com.au',
    description: 'Subdivision of land into 24 residential lots with associated infrastructure including roads, drainage, and public open space',
    approver: 'Amanda Roberts, Development Assessment Manager',
  },
};

export const MinorWorks: Story = {
  name: '04 Minor Works',
  args: {
    siteAddress: '89 Suburban Court, Browns Plains, QLD 4118',
    reference: 'BA-2024-00321',
    applicant: 'David Wilson',
    owner: 'David Wilson',
    contact: 'david.wilson@email.com',
    description: 'Construction of covered patio and deck extension to existing dwelling',
    approver: 'Tom Anderson, Building Certifier',
  },
};

export const WithCustomClassName: Story = {
  name: '05 With Custom Class Name',
  args: {
    siteAddress: '15 Waterfront Boulevard, Beenleigh, QLD 4207',
    reference: 'DA-2024-00555',
    applicant: 'Waterfront Properties Group',
    owner: 'Coastal Investments Pty Ltd',
    contact: 'contact@waterfrontproperties.com.au',
    description: 'Multi-residential development consisting of three apartment buildings with a total of 48 units',
    approver: 'Lisa Martinez, Development Coordinator',
    className: 'custom-card-wrapper',
  },
};
