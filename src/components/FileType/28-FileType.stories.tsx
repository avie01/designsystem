import type { Meta, StoryObj } from '@storybook/react';
import FileType, { FileTypeVariant } from './FileType';
import { getAvailableFileTypes } from './fileTypeSvgs';

const meta: Meta<typeof FileType> = {
  title: 'Design System/Components/FileType',
  component: FileType,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive file type icon component that displays various file format icons including documents, images, videos, audio files, archives, and more.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: getAvailableFileTypes(),
    },
    size: {
      control: { type: 'range', min: 16, max: 128, step: 4 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'folder',
    size: 36,
  },
};

export const PDF: Story = {
  args: {
    type: 'pdf',
    size: 36,
  },
};

export const Word: Story = {
  args: {
    type: 'docx',
    size: 36,
  },
};

export const Excel: Story = {
  args: {
    type: 'xlsx',
    size: 36,
  },
};

export const PowerPoint: Story = {
  args: {
    type: 'pptx',
    size: 36,
  },
};

export const Image: Story = {
  args: {
    type: 'jpg',
    size: 36,
  },
};

export const Video: Story = {
  args: {
    type: 'mp4',
    size: 36,
  },
};

export const Audio: Story = {
  args: {
    type: 'mp3',
    size: 36,
  },
};

export const Archive: Story = {
  args: {
    type: 'zip',
    size: 36,
  },
};

export const Sizes: Story = {
  name: '05 Sizes',
  render: () => (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <FileType type="pdf" size={16} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>16px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <FileType type="pdf" size={24} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>24px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <FileType type="pdf" size={36} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>36px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <FileType type="pdf" size={48} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>48px</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <FileType type="pdf" size={64} />
        <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>64px</div>
      </div>
    </div>
  ),
};

export const DocumentTypes: Story = {
  name: '06 Document Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['pdf', 'doc', 'docx', 'txt', 'rtf', 'html'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const OfficeTypes: Story = {
  name: '07 Office Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['docx', 'xlsx', 'pptx', 'one', 'pub', 'mpp'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const ImageTypes: Story = {
  name: '08 Image Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['jpg', 'png', 'gif', 'bmp', 'svg', 'tiff'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const VideoTypes: Story = {
  name: '09 Video Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['mp4', 'avi', 'mov', 'mkv', 'webm', 'flv'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const AudioTypes: Story = {
  name: '10 Audio Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['mp3', 'wav', 'ogg', 'wma', 'midi', 'oga'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const DesignTypes: Story = {
  name: '11 Design Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['ai', 'ae', 'psd', 'indd', 'xd', 'skt'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const CADTypes: Story = {
  name: '12 CAD Types',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', alignItems: 'center' }}>
      {['dwg', 'dw', 'cad', 'ifc', 'bim', 'vsd'].map((type) => (
        <div key={type} style={{ textAlign: 'center' }}>
          <FileType type={type as FileTypeVariant} size={32} />
          <div style={{ fontSize: '12px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
        </div>
      ))}
    </div>
  ),
};

export const AllFileTypes: Story = {
  name: '13 All File Types',
  render: () => {
    const fileTypes = getAvailableFileTypes();
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', 
        gap: '12px', 
        maxHeight: '400px', 
        overflowY: 'auto',
        padding: '16px',
        background: '#f5f5f5',
        borderRadius: '8px'
      }}>
        {fileTypes.map((type) => (
          <div key={type} style={{ textAlign: 'center' }}>
            <FileType type={type as FileTypeVariant} size={24} />
            <div style={{ fontSize: '10px', marginTop: '4px', color: '#666' }}>{type.toUpperCase()}</div>
          </div>
        ))}
      </div>
    );
  },
};

export const InContext: Story = {
  name: '14 In Context',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <FileType type="pdf" size={32} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>Annual Report.pdf</div>
          <div style={{ fontSize: '12px', color: '#666' }}>2.4 MB • PDF Document</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <FileType type="docx" size={32} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>Meeting Notes.docx</div>
          <div style={{ fontSize: '12px', color: '#666' }}>156 KB • Word Document</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <FileType type="xlsx" size={32} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>Budget 2024.xlsx</div>
          <div style={{ fontSize: '12px', color: '#666' }}>890 KB • Excel Spreadsheet</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f5f5f5', borderRadius: '8px' }}>
        <FileType type="folder" size={32} />
        <div>
          <div style={{ fontWeight: 500, fontSize: '14px' }}>Project Files</div>
          <div style={{ fontSize: '12px', color: '#666' }}>24 files • Folder</div>
        </div>
      </div>
    </div>
  ),
};