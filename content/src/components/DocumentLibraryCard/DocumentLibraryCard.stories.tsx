import type { Meta, StoryObj } from '@storybook/react';
import DocumentLibraryCard from './DocumentLibraryCard';

const meta: Meta<typeof DocumentLibraryCard> = {
  title: 'Components/Cards/DocumentLibraryCard',
  component: DocumentLibraryCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A simple card component with a title and view button, typically used to provide access to document libraries or collections.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Document library',
  },
};

export const WithOnView: Story = {
  args: {
    title: 'Document library',
    onView: () => {
      console.log('View button clicked');
      alert('Opening document library...');
    },
  },
};

export const PlanningDocuments: Story = {
  args: {
    title: 'Planning documents',
    onView: () => console.log('View planning documents'),
  },
};

export const ApplicationFiles: Story = {
  args: {
    title: 'Application files',
    onView: () => console.log('View application files'),
  },
};

export const TechnicalReports: Story = {
  args: {
    title: 'Technical reports',
    onView: () => console.log('View technical reports'),
  },
};

export const ComplianceCertificates: Story = {
  args: {
    title: 'Compliance certificates',
    onView: () => console.log('View compliance certificates'),
  },
};

export const BuildingPlans: Story = {
  args: {
    title: 'Building plans & specifications',
    onView: () => console.log('View building plans'),
  },
};

export const WithCustomClassName: Story = {
  args: {
    title: 'Archived documents',
    onView: () => console.log('View archived documents'),
    className: 'custom-document-card',
  },
};
