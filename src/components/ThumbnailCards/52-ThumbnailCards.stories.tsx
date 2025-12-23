import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import ThumbnailCards, { ThumbnailCardSize } from './ThumbnailCards';
import { getAvailableFileTypes } from '../FileType/fileTypeSvgs';

const meta: Meta<typeof ThumbnailCards> = {
  title: 'Design System/Components/ThumbnailCards',
  component: ThumbnailCards,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Thumbnail cards component with three size variants. Perfect for displaying content with thumbnails in a compact, organized layout.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size variant of the thumbnail card',
      table: {
        type: { summary: 'ThumbnailCardSize' },
        defaultValue: { summary: 'large' },
      },
    },
    thumbnailSrc: {
      control: 'text',
      description: 'URL for the thumbnail image',
      table: {
        type: { summary: 'string' },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the card',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Title' },
      },
    },
    fileType: {
      control: { type: 'select' },
      options: getAvailableFileTypes(),
      description: 'File type for the icon next to title',
      table: {
        type: { summary: 'FileTypeVariant' },
        defaultValue: { summary: 'folder' },
      },
    },
    selected: {
      control: 'boolean',
      description: 'Whether the card is selected',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the card is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    iconName: {
      control: 'text',
      description: 'Icon name for the ghost icon button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'more-vertical' },
      },
    },
    onClick: { 
      action: 'clicked',
      description: 'Click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
    onCheckboxChange: { 
      action: 'checkbox-changed',
      description: 'Checkbox change handler function',
      table: {
        type: { summary: '(checked: boolean) => void' },
      },
    },
    onIconClick: { 
      action: 'icon-clicked',
      description: 'Icon button click handler function',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'large',
    title: 'Document Title',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    title: 'Large Card',
    subtitle: 'This is the largest size variant',
    thumbnailSrc: 'https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=IMG',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    title: 'Medium Card',
    subtitle: 'This is the medium size variant',
    thumbnailSrc: 'https://via.placeholder.com/48x48/50C878/FFFFFF?text=IMG',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    title: 'Small Card',
    subtitle: 'This is the small size variant',
    thumbnailSrc: 'https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=IMG',
  },
};

export const WithoutThumbnail: Story = {
  args: {
    size: 'large',
    title: 'No Thumbnail',
    subtitle: 'Card without a thumbnail image',
  },
};

export const Selected: Story = {
  args: {
    size: 'large',
    title: 'Selected Card',
    subtitle: 'This card is in selected state',
    selected: true,
    thumbnailSrc: 'https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=SEL',
  },
};

export const Disabled: Story = {
  args: {
    size: 'large',
    title: 'Disabled Card',
    subtitle: 'This card is in disabled state',
    disabled: true,
    thumbnailSrc: 'https://via.placeholder.com/56x56/CCCCCC/FFFFFF?text=DIS',
  },
};

export const LongText: Story = {
  args: {
    size: 'large',
    title: 'Very Long Title That Will Be Truncated',
    subtitle: 'Very long subtitle that will also be truncated when it exceeds the available space',
    thumbnailSrc: 'https://via.placeholder.com/56x56/9B59B6/FFFFFF?text=TXT',
  },
};

export const AllSizes: Story = {
  name: '08 All Sizes Comparison',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Size Comparison</h3>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <ThumbnailCards
              size="small"
              title="Small Card"
              subtitle="180px width"
              thumbnailSrc="https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=S"
            />
            <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Small (180px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ThumbnailCards
              size="medium"
              title="Medium Card"
              subtitle="226px width"
              thumbnailSrc="https://via.placeholder.com/48x48/50C878/FFFFFF?text=M"
            />
            <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Medium (226px)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ThumbnailCards
              size="large"
              title="Large Card"
              subtitle="272px width"
              thumbnailSrc="https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=L"
            />
            <div style={{ fontSize: '12px', marginTop: '8px', color: '#666' }}>Large (272px)</div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveStates: Story = {
  name: '09 Interactive States',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Interactive States</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <ThumbnailCards
          size="large"
          title="Normal State"
          subtitle="Hover to see effect"
          thumbnailSrc="https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=NOR"
          onClick={() => alert('Normal card clicked!')}
        />
        <ThumbnailCards
          size="large"
          title="Selected State"
          subtitle="This card is selected"
          selected={true}
          thumbnailSrc="https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=SEL"
          onClick={() => alert('Selected card clicked!')}
        />
        <ThumbnailCards
          size="large"
          title="Disabled State"
          subtitle="This card is disabled"
          disabled={true}
          thumbnailSrc="https://via.placeholder.com/56x56/CCCCCC/FFFFFF?text=DIS"
          onClick={() => alert('This should not fire!')}
        />
      </div>
    </div>
  ),
};

export const ContentVariations: Story = {
  name: '10 Content Variations',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Content Variations</h3>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <ThumbnailCards
          size="large"
          title="PDF Document"
          fileType="pdf"
          thumbnailSrc="https://via.placeholder.com/56x56/D32F2F/FFFFFF?text=PDF"
        />
        <ThumbnailCards
          size="large"
          title="Image File"
          fileType="jpg"
          thumbnailSrc="https://via.placeholder.com/56x56/FF9800/FFFFFF?text=JPG"
        />
        <ThumbnailCards
          size="large"
          title="Spreadsheet"
          fileType="xls"
          thumbnailSrc="https://via.placeholder.com/56x56/4CAF50/FFFFFF?text=XLS"
        />
        <ThumbnailCards
          size="large"
          title="Presentation"
          fileType="ppt"
          thumbnailSrc="https://via.placeholder.com/56x56/FF5722/FFFFFF?text=PPT"
        />
      </div>
    </div>
  ),
};

export const WithHeaderControls: Story = {
  name: '11 With Header Controls',
  render: function Component() {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <ThumbnailCards
          size="large"
          title="Document with Controls"
          subtitle="Checkbox and icon button in header"
          thumbnailSrc="https://via.placeholder.com/56x56/4A90E2/FFFFFF?text=DOC"
          checked={checked}
          onCheckboxChange={setChecked}
          iconName="more-vertical"
          onIconClick={() => alert('Icon button clicked!')}
          onClick={() => alert('Card clicked!')}
        />
        <ThumbnailCards
          size="medium"
          title="Medium Card"
          subtitle="With custom icon"
          thumbnailSrc="https://via.placeholder.com/48x48/50C878/FFFFFF?text=MED"
          checked={true}
          iconName="star"
          onCheckboxChange={(checked) => console.log('Checkbox:', checked)}
          onIconClick={() => alert('Star clicked!')}
        />
        <ThumbnailCards
          size="small"
          title="Small Card"
          subtitle="Compact version"
          thumbnailSrc="https://via.placeholder.com/40x40/FF6B6B/FFFFFF?text=SM"
          iconName="bookmark"
          onIconClick={() => alert('Bookmark clicked!')}
        />
      </div>
    );
  },
};

export const GridLayout: Story = {
  name: '12 Grid Layout Example',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Grid Layout</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(272px, 1fr))', 
        gap: '16px',
        maxWidth: '900px'
      }}>
        {Array.from({ length: 6 }, (_, index) => (
          <ThumbnailCards
            key={index}
            size="large"
            title={`Document ${index + 1}`}
            subtitle={`Description for document ${index + 1}`}
            thumbnailSrc={`https://via.placeholder.com/56x56/${['4A90E2', 'FF6B6B', '50C878', '9B59B6', 'FF9800', 'F39C12'][index]}/FFFFFF?text=${index + 1}`}
            onClick={() => alert(`Clicked document ${index + 1}`)}
          />
        ))}
      </div>
    </div>
  ),
};