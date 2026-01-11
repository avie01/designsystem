import type { Meta, StoryObj } from '@storybook/react';
import Checkbox, { CheckboxGroup } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Design system/Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A customizable checkbox component with support for different sizes, states, and accessibility features. Follows WCAG 2.1 AA standards.'
      }
    }
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox'
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is checked'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is disabled'
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox is in an indeterminate state'
    },
    error: {
      control: { type: 'boolean' },
      description: 'Whether the checkbox has an error state'
    },
    label: {
      control: { type: 'text' },
      description: 'Label text for the checkbox'
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the checkbox state changes'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default checkbox',
    checked: false,
    disabled: false,
    error: false,
    size: 'md'
  }
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
    disabled: false,
    error: false,
    size: 'md'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    checked: false,
    disabled: true,
    error: false,
    size: 'md'
  }
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    checked: true,
    disabled: true,
    error: false,
    size: 'md'
  }
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    checked: false,
    indeterminate: true,
    disabled: false,
    error: false,
    size: 'md'
  }
};

export const Error: Story = {
  args: {
    label: 'Checkbox with error',
    checked: false,
    disabled: false,
    error: true,
    size: 'md'
  }
};

export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox size="sm" label="Small checkbox" checked />
        <Checkbox size="md" label="Medium checkbox" checked />
        <Checkbox size="lg" label="Large checkbox" checked />
      </div>
    );
  }
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(true);
    const [indeterminate, setIndeterminate] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox 
          label="Toggle me" 
          checked={checked} 
          onChange={setChecked} 
        />
        <Checkbox 
          label="Another checkbox" 
          checked={checkedTwo} 
          onChange={setCheckedTwo} 
        />
        <Checkbox 
          label="Indeterminate state" 
          checked={false}
          indeterminate={indeterminate} 
          onChange={() => setIndeterminate(!indeterminate)} 
        />
      </div>
    );
  }
};

export const GroupVertical: Story = {
  render: () => {
    const [permissions, setPermissions] = useState({
      read: true,
      write: false,
      delete: false
    });

    const handlePermissionChange = (key: keyof typeof permissions) => {
      setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <CheckboxGroup 
        label="User Permissions" 
        orientation="vertical"
        gap="16px"
      >
        <Checkbox
          label="Read access"
          checked={permissions.read}
          onChange={() => handlePermissionChange('read')}
        />
        <Checkbox
          label="Write access"
          checked={permissions.write}
          onChange={() => handlePermissionChange('write')}
        />
        <Checkbox
          label="Delete access"
          checked={permissions.delete}
          onChange={() => handlePermissionChange('delete')}
        />
      </CheckboxGroup>
    );
  }
};

export const GroupHorizontal: Story = {
  render: () => {
    const [features, setFeatures] = useState({
      notifications: true,
      darkMode: false,
      analytics: true
    });

    const handleFeatureChange = (key: keyof typeof features) => {
      setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <CheckboxGroup 
        label="App Features" 
        orientation="horizontal"
        gap="24px"
      >
        <Checkbox
          label="Notifications"
          checked={features.notifications}
          onChange={() => handleFeatureChange('notifications')}
        />
        <Checkbox
          label="Dark Mode"
          checked={features.darkMode}
          onChange={() => handleFeatureChange('darkMode')}
        />
        <Checkbox
          label="Analytics"
          checked={features.analytics}
          onChange={() => handleFeatureChange('analytics')}
        />
      </CheckboxGroup>
    );
  }
};

export const GroupWithError: Story = {
  render: () => {
    const [agreement, setAgreement] = useState({
      terms: false,
      privacy: false,
      marketing: false
    });

    const handleAgreementChange = (key: keyof typeof agreement) => {
      setAgreement(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <CheckboxGroup 
        label="Legal Agreements" 
        orientation="vertical"
        error={true}
        errorMessage="You must accept the Terms of Service and Privacy Policy to continue"
      >
        <Checkbox
          label="I agree to the Terms of Service"
          checked={agreement.terms}
          onChange={() => handleAgreementChange('terms')}
          error={!agreement.terms}
        />
        <Checkbox
          label="I agree to the Privacy Policy"
          checked={agreement.privacy}
          onChange={() => handleAgreementChange('privacy')}
          error={!agreement.privacy}
        />
        <Checkbox
          label="I want to receive marketing emails (optional)"
          checked={agreement.marketing}
          onChange={() => handleAgreementChange('marketing')}
        />
      </CheckboxGroup>
    );
  }
};

export const NoLabel: Story = {
  args: {
    checked: true,
    size: 'md'
  }
};