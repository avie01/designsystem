import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from '../Button/Button';
import Input from '../Input/Input';
import React from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible modal dialog component with various sizes, header, footer, and overlay options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Whether the modal is open',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'The size of the modal',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Whether clicking the overlay closes the modal',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic modal
export const Default: Story = {
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
          <p>This is a basic modal with default settings.</p>
        </Modal>
      </>
    );
  },
};

// Confirmation dialog
export const ConfirmationDialog: Story = {
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
          size="sm"
        >
          <p>Are you sure you want to delete this item? This action cannot be undone.</p>
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

// Form modal
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
    });
    
    const handleSubmit = () => {
      console.log('Form submitted:', formData);
      setIsOpen(false);
    };
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Contact Form"
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Input
              label="Name"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              required
            />
            <Input
              label="Message"
              type="textarea"
              rows={4}
              value={formData.message}
              onChange={(value) => setFormData({ ...formData, message: value })}
            />
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// Large content modal
export const LargeContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>View Details</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Application Details"
          size="lg"
        >
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <h3>Application Information</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            
            <h4>Details</h4>
            <ul>
              <li>Application ID: APP-2024-001</li>
              <li>Submitted: January 15, 2024</li>
              <li>Status: Under Review</li>
              <li>Type: Development Application</li>
            </ul>
            
            <h4>Description</h4>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            
            <h4>Additional Notes</h4>
            <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setIsOpen(false)}>
              Approve
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

// All sizes demo
export const AllSizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = React.useState<string | null>(null);
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    
    return (
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {sizes.map(size => (
          <React.Fragment key={size}>
            <Button onClick={() => setOpenModal(size)}>
              Open {size.toUpperCase()} Modal
            </Button>
            <Modal
              isOpen={openModal === size}
              onClose={() => setOpenModal(null)}
              title={`${size.toUpperCase()} Size Modal`}
              size={size}
            >
              <p>This is a {size} sized modal.</p>
              <p>Width varies based on the size prop.</p>
            </Modal>
          </React.Fragment>
        ))}
      </div>
    );
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Close Button"
          showCloseButton={false}
          closeOnOverlayClick={false}
        >
          <p>This modal has no close button and doesn't close on overlay click.</p>
          <p>You must use the button below to close it.</p>
          <div style={{ marginTop: '1.5rem' }}>
            <Button onClick={() => setIsOpen(false)}>
              Close Modal
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

// Custom footer
export const CustomFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Modal with Custom Footer"
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button variant="text">Learn More</Button>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsOpen(false)}>
                  Save Changes
                </Button>
              </div>
            </div>
          }
        >
          <p>This modal has a custom footer with multiple actions.</p>
        </Modal>
      </>
    );
  },
};