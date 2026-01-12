import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Drawer from './Drawer';
import Button from '../Button/Button';

const meta: Meta<typeof Drawer> = {
  title: 'Design System/Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ODL Drawer component for side panels and overlays. Features focus trapping, keyboard navigation, and customizable positioning. Fully accessible with ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    position: 'right',
    size: 'medium',
    overlay: true,
    closeOnEscape: true,
    closeOnBackdropClick: true,
    disabled: false,
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Position of the drawer',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'right' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'extra-large'],
      description: 'Drawer size',
      table: {
        disable: true,
        type: { summary: 'string' },
        defaultValue: { summary: 'medium' },
      },
    },
    overlay: {
      control: 'boolean',
      description: 'Whether to show overlay backdrop',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether drawer can be closed with Escape key',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether drawer can be closed by clicking backdrop',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the drawer is disabled',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message to display',
      table: {
        disable: true,
        type: { summary: 'boolean | string' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SampleContent = () => (
  <div>
    <p style={{ marginBottom: '16px', color: 'var(--color-dusk)' }}>
      This is the drawer content. You can put any content here including forms, lists, or other components.
    </p>
    <p style={{ marginBottom: '16px', color: 'var(--color-dusk)' }}>
      Try pressing <strong>Tab</strong> to navigate through focusable elements, or <strong>Escape</strong> to close the drawer.
    </p>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input type="text" placeholder="Name" style={{ padding: '8px', border: '1px solid var(--color-light-deco)', borderRadius: '4px' }} />
      <input type="email" placeholder="Email" style={{ padding: '8px', border: '1px solid var(--color-light-deco)', borderRadius: '4px' }} />
      <textarea placeholder="Message" rows={4} style={{ padding: '8px', border: '1px solid var(--color-light-deco)', borderRadius: '4px' }} />
    </div>
  </div>
);

export const RightDrawer: Story = {
  name: '01 Right Drawer',
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Right Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="Right Drawer"
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const LeftDrawer: Story = {
  name: '02 Left Drawer',
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Left Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
          title="Left Drawer"
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const TopDrawer: Story = {
  name: '03 Top Drawer',
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Top Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="top"
          title="Top Drawer"
          height="400px"
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const BottomDrawer: Story = {
  name: '04 Bottom Drawer',
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Bottom Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          title="Bottom Drawer"
          height="400px"
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const AllSizes: Story = {
  name: '05 All Sizes',
  render: () => {
    const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenDrawer('small')}>Small Drawer</Button>
        <Button onClick={() => setOpenDrawer('medium')}>Medium Drawer</Button>
        <Button onClick={() => setOpenDrawer('large')}>Large Drawer</Button>
        <Button onClick={() => setOpenDrawer('extra-large')}>Extra Large Drawer</Button>

        <Drawer
          isOpen={openDrawer === 'small'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          size="small"
          title="Small Drawer"
          width="300px"
        >
          <p>This is a small drawer.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'medium'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          size="medium"
          title="Medium Drawer"
          width="400px"
        >
          <p>This is a medium drawer.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'large'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          size="large"
          title="Large Drawer"
          width="600px"
        >
          <p>This is a large drawer.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'extra-large'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          size="extra-large"
          title="Extra Large Drawer"
          width="800px"
        >
          <p>This is an extra large drawer.</p>
        </Drawer>
      </div>
    );
  },
};

export const WithFooter: Story = {
  name: '06 With Footer',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const footer = (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="text" onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button variant="primary" onClick={() => { alert('Saved!'); setIsOpen(false); }}>Save</Button>
      </div>
    );

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer with Footer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="Drawer with Footer"
          footer={footer}
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const WithoutOverlay: Story = {
  name: '07 Without Overlay',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer without Overlay</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="No Overlay Drawer"
          overlay={false}
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const WithError: Story = {
  name: '08 With Error',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer with Error</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="Error State Drawer"
          error="There was an error loading the data. Please try again."
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const HalfWidth: Story = {
  name: '09 Half Width',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Half-Width Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="Half Width Drawer"
          width="half"
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
};

export const CustomDimensions: Story = {
  name: '10 Custom Dimensions',
  render: () => {
    const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button onClick={() => setOpenDrawer('custom-width')}>Custom Width (500px)</Button>
        <Button onClick={() => setOpenDrawer('custom-height')}>Custom Height (250px)</Button>

        <Drawer
          isOpen={openDrawer === 'custom-width'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          title="Custom Width"
          width="500px"
        >
          <p>This drawer has a custom width of 500px.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'custom-height'}
          onClose={() => setOpenDrawer(null)}
          position="bottom"
          title="Custom Height"
          height="250px"
        >
          <p>This drawer has a custom height of 250px.</p>
        </Drawer>
      </div>
    );
  },
};

export const NoCloseOnBackdrop: Story = {
  name: '11 No Close On Backdrop',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer (No Close on Backdrop)</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="Must Use Close Button"
          closeOnBackdropClick={false}
        >
          <p style={{ color: 'var(--color-dusk)' }}>
            This drawer cannot be closed by clicking the backdrop. You must use the close button or press Escape.
          </p>
        </Drawer>
      </>
    );
  },
};

export const NoCloseOnEscape: Story = {
  name: '12 No Close On Escape',
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer (No Close on Escape)</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
          title="No Escape Close"
          closeOnEscape={false}
        >
          <p style={{ color: 'var(--color-dusk)' }}>
            This drawer cannot be closed by pressing Escape. You must use the close button or click the backdrop.
          </p>
        </Drawer>
      </>
    );
  },
};

export const AllPositions: Story = {
  name: '13 All Positions',
  render: () => {
    const [openDrawer, setOpenDrawer] = React.useState<string | null>(null);

    return (
      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button onClick={() => setOpenDrawer('top')}>Top</Button>
          <Button onClick={() => setOpenDrawer('right')}>Right</Button>
          <Button onClick={() => setOpenDrawer('bottom')}>Bottom</Button>
          <Button onClick={() => setOpenDrawer('left')}>Left</Button>
        </div>

        <Drawer
          isOpen={openDrawer === 'top'}
          onClose={() => setOpenDrawer(null)}
          position="top"
          title="Top Drawer"
          height="300px"
        >
          <p>This drawer slides from the top.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'right'}
          onClose={() => setOpenDrawer(null)}
          position="right"
          title="Right Drawer"
        >
          <p>This drawer slides from the right.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'bottom'}
          onClose={() => setOpenDrawer(null)}
          position="bottom"
          title="Bottom Drawer"
          height="300px"
        >
          <p>This drawer slides from the bottom.</p>
        </Drawer>

        <Drawer
          isOpen={openDrawer === 'left'}
          onClose={() => setOpenDrawer(null)}
          position="left"
          title="Left Drawer"
        >
          <p>This drawer slides from the left.</p>
        </Drawer>
      </div>
    );
  },
};

export const Playground: Story = {
  name: '14 Playground',
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <SampleContent />
        </Drawer>
      </>
    );
  },
  args: {
    position: 'right',
    size: 'medium',
    title: 'Drawer',
    overlay: true,
    closeOnEscape: true,
    closeOnBackdropClick: true,
    disabled: false,
  },
};
