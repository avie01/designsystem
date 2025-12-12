import type { Meta, StoryObj } from '@storybook/react';
import Popover from './Popover';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import { ODLTheme } from '../../styles/ODLTheme';

const meta: Meta<typeof Popover> = {
  title: 'Components/Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the popover relative to trigger',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of the popover',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BottomStart: Story = {
  args: {
    trigger: <Button variant="primary">Open Popover</Button>,
    content: (
      <div style={{ padding: '16px', minWidth: '250px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 600 }}>
          Popover Title
        </h3>
        <p style={{ margin: 0, color: ODLTheme.colors.text.secondary, fontSize: '14px' }}>
          This is a popover with some content. You can put any React component here.
        </p>
      </div>
    ),
    position: 'bottom',
    align: 'start',
  },
};

export const TopCenter: Story = {
  args: {
    trigger: <Button variant="secondary">Show Info</Button>,
    content: (
      <div style={{ padding: '16px', minWidth: '200px' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5 }}>
          Information appears above the trigger button.
        </p>
      </div>
    ),
    position: 'top',
    align: 'center',
  },
};

export const LeftAlign: Story = {
  args: {
    trigger: <Button variant="outlined">Left Popover</Button>,
    content: (
      <div style={{ padding: '16px', minWidth: '220px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Icon name="information" size={20} color={ODLTheme.colors.primary} />
          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
            Important Note
          </h4>
        </div>
        <p style={{ margin: 0, fontSize: '14px', color: ODLTheme.colors.text.secondary }}>
          This popover appears to the left of the trigger.
        </p>
      </div>
    ),
    position: 'left',
    align: 'center',
  },
};

export const RightAlign: Story = {
  args: {
    trigger: <Button variant="outlined">Right Popover</Button>,
    content: (
      <div style={{ padding: '16px', minWidth: '220px' }}>
        <p style={{ margin: 0, fontSize: '14px' }}>
          This popover appears to the right of the trigger.
        </p>
      </div>
    ),
    position: 'right',
    align: 'center',
  },
};

export const WithIconTrigger: Story = {
  args: {
    trigger: (
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '4px',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = ODLTheme.colors.grey100;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'none';
        }}
      >
        <Icon name="help" size={24} color={ODLTheme.colors.primary} />
      </button>
    ),
    content: (
      <div style={{ padding: '12px 16px', maxWidth: '250px' }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>
          Need Help?
        </h4>
        <p style={{ margin: 0, fontSize: '13px', color: ODLTheme.colors.text.secondary, lineHeight: 1.5 }}>
          Click on the help icon to access documentation and support resources.
        </p>
      </div>
    ),
    position: 'bottom',
    align: 'center',
  },
};

export const WithList: Story = {
  args: {
    trigger: <Button variant="secondary">View Options</Button>,
    content: (
      <div style={{ padding: '8px 0', minWidth: '200px' }}>
        {['Edit', 'Duplicate', 'Archive', 'Delete'].map((item, index) => (
          <button
            key={item}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '14px',
              color: item === 'Delete' ? ODLTheme.colors.error : ODLTheme.colors.text.primary,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ODLTheme.colors.grey100;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
            onClick={() => console.log(`Clicked ${item}`)}
          >
            {item}
          </button>
        ))}
      </div>
    ),
    position: 'bottom',
    align: 'start',
  },
};

export const WithForm: Story = {
  args: {
    trigger: <Button variant="primary">Add Comment</Button>,
    content: (
      <div style={{ padding: '16px', width: '300px' }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', fontWeight: 600 }}>
          Leave a Comment
        </h4>
        <textarea
          placeholder="Type your comment here..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '8px 12px',
            border: `1px solid ${ODLTheme.colors.grey300}`,
            borderRadius: '4px',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            marginBottom: '12px',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="primary" size="sm">
            Submit
          </Button>
        </div>
      </div>
    ),
    position: 'bottom',
    align: 'end',
  },
};

export const UserProfile: Story = {
  args: {
    trigger: (
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          border: `1px solid ${ODLTheme.colors.grey300}`,
          borderRadius: '6px',
          background: 'white',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = ODLTheme.colors.primary;
          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = ODLTheme.colors.grey300;
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: ODLTheme.colors.primary,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          JD
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '14px', fontWeight: 500 }}>John Doe</div>
          <div style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>
            john@example.com
          </div>
        </div>
        <Icon name="chevron-down" size={16} />
      </button>
    ),
    content: (
      <div style={{ padding: '12px 0', minWidth: '220px' }}>
        <div style={{ padding: '8px 16px', marginBottom: '8px', borderBottom: `1px solid ${ODLTheme.colors.grey200}` }}>
          <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>John Doe</div>
          <div style={{ fontSize: '12px', color: ODLTheme.colors.text.secondary }}>john@example.com</div>
        </div>
        {[
          { icon: 'user', label: 'Profile' },
          { icon: 'settings', label: 'Settings' },
          { icon: 'help', label: 'Help & Support' },
          { icon: 'logout', label: 'Sign Out', danger: true },
        ].map((item) => (
          <button
            key={item.label}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: 'none',
              background: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '14px',
              color: item.danger ? ODLTheme.colors.error : ODLTheme.colors.text.primary,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ODLTheme.colors.grey100;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
            }}
            onClick={() => console.log(`Clicked ${item.label}`)}
          >
            <Icon name={item.icon} size={16} color={item.danger ? ODLTheme.colors.error : ODLTheme.colors.grey600} />
            {item.label}
          </button>
        ))}
      </div>
    ),
    position: 'bottom',
    align: 'end',
  },
};

export const RichContent: Story = {
  args: {
    trigger: <Button variant="outlined">Show Details</Button>,
    content: (
      <div style={{ padding: '16px', width: '320px' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${ODLTheme.colors.primary}, ${ODLTheme.colors.success})`,
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 600 }}>
              Feature Update
            </h4>
            <p style={{ margin: 0, fontSize: '13px', color: ODLTheme.colors.text.secondary }}>
              2 hours ago
            </p>
          </div>
        </div>
        <p style={{ margin: '0 0 12px 0', fontSize: '14px', lineHeight: 1.5, color: ODLTheme.colors.text.secondary }}>
          We've just released a new feature that makes it easier to collaborate with your team. Check out the details below.
        </p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" size="sm" style={{ flex: 1 }}>
            Learn More
          </Button>
          <Button variant="secondary" size="sm">
            Dismiss
          </Button>
        </div>
      </div>
    ),
    position: 'bottom',
    align: 'center',
  },
};

export const ColorPicker: Story = {
  args: {
    trigger: (
      <button
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '6px',
          border: `2px solid ${ODLTheme.colors.grey300}`,
          background: ODLTheme.colors.primary,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      />
    ),
    content: (
      <div style={{ padding: '12px' }}>
        <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600 }}>
          Choose Color
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
          {[
            ODLTheme.colors.primary,
            ODLTheme.colors.success,
            ODLTheme.colors.warning,
            ODLTheme.colors.error,
            ODLTheme.colors.grey500,
            '#9b59b6',
            '#e74c3c',
            '#f39c12',
            '#2ecc71',
            '#3498db',
          ].map((color) => (
            <button
              key={color}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                border: `2px solid ${ODLTheme.colors.grey300}`,
                background: color,
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
              onClick={() => console.log(`Selected color: ${color}`)}
            />
          ))}
        </div>
      </div>
    ),
    position: 'bottom',
    align: 'start',
  },
};
