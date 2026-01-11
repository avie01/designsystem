import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Modal from './Modal';
import Button from '../Button/Button';

const meta: Meta<typeof Modal> = {
  title: 'Design System/Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onClose: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Callback when modal is closed',
    },
    title: {
      control: 'text',
      description: 'Modal title',
      table: {
        type: { summary: 'string' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full'],
      description: 'Modal size',
      table: {
        type: { summary: '"small" | "medium" | "large" | "full"' },
        defaultValue: { summary: 'medium' },
      },
    },
    children: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Modal content (use render function)',
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic modal
export const Default: Story = {
  name: '01 Default',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Basic Modal"
        >
          <p>This is a basic modal dialog.</p>
        </Modal>
      </>
    );
  },
};

// Confirmation dialog
export const Confirmation: Story = {
  name: '02 Confirmation',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button variant="destructive" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="small"
        >
          <p>Are you sure you want to delete this item?</p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsOpen(false)}>
              Delete
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

// Large modal
export const LargeContent: Story = {
  name: '03 Large Content',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Details</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Application Details"
          size="large"
        >
          <h3>Application Information</h3>
          <p>Application ID: APP-2024-001</p>
          <p>Status: Under Review</p>
          <p>Submitted: January 15, 2024</p>
          
          <h4 style={{ marginTop: '1rem' }}>Description</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Modal>
      </>
    );
  },
};