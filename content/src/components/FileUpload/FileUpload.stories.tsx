import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import FileUpload from './FileUpload';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FileUpload Component

A versatile file upload component with multiple variants optimized for different use cases.

### Variants

| Variant | Use Case |
|---------|----------|
| \`dropzone\` | Standard drag & drop area (default) |
| \`compact\` | Inline upload for drawers/forms |
| \`button\` | Simple button trigger |
| \`picture-card\` | Image grid with previews |

### AI Integration

The component supports AI-powered document analysis via \`onAnalyze\` callback:
- Auto-categorization
- Tag extraction
- Content summarization
- Document understanding

### Usage

\`\`\`tsx
// Compact variant for drawers
<FileUpload
  variant="compact"
  label="Attachments"
  accept=".pdf,.doc"
  multiple
  fullWidth
/>

// With AI analysis
<FileUpload
  variant="dropzone"
  enableAI
  onAnalyze={async (file) => {
    const result = await myAIService.analyze(file);
    return { summary: result.summary, tags: result.tags };
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dropzone', 'compact', 'button', 'picture-card'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// DROPZONE VARIANT
// ============================================

export const Default: Story = {
  args: {
    variant: 'dropzone',
    dropzoneText: 'Drag and drop documents',
    dropzoneSubtext: 'Upload relevant site description documents, or {browse}',
  },
};

export const DropzoneSmall: Story = {
  args: {
    label: 'Upload Document',
    variant: 'dropzone',
    size: 'sm',
    accept: '.pdf,.doc,.docx',
  },
};

export const DropzoneLarge: Story = {
  args: {
    variant: 'dropzone',
    size: 'lg',
    dropzoneText: 'Drag and drop documents',
    dropzoneSubtext: 'Upload relevant site description documents, or {browse}',
    multiple: true,
    maxFiles: 10,
  },
};

// ============================================
// COMPACT VARIANT (for drawers/forms)
// ============================================

export const Compact: Story = {
  args: {
    label: 'Attachments',
    variant: 'compact',
    accept: '.pdf,.doc,.docx',
    multiple: true,
    fullWidth: true,
  },
};

export const CompactInDrawer: Story = {
  render: () => (
    <div style={{
      width: '360px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    }}>
      <h3 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>
        Project Settings
      </h3>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>
          Project Name
        </label>
        <input
          type="text"
          defaultValue="Website Redesign"
          style={{
            width: '100%',
            padding: '8px 12px',
            border: '1px solid var(--odl-border)',
            borderRadius: '4px',
            fontSize: '14px',
          }}
        />
      </div>

      <FileUpload
        variant="compact"
        label="Attachments"
        accept=".pdf,.doc,.docx,.jpg,.png"
        multiple
        maxFiles={5}
        fullWidth
        helperText="Max 5 files, 10MB each"
      />

      <FileUpload
        variant="compact"
        label="Cover Image"
        accept="image/*"
        dropzoneText="Drop image or click"
        fullWidth
        className="mt-4"
      />

      <div style={{ display: 'flex', gap: '8px', marginTop: '24px', justifyContent: 'flex-end' }}>
        <button style={{
          padding: '8px 16px',
          border: '1px solid var(--odl-border)',
          borderRadius: '4px',
          backgroundColor: 'white',
          cursor: 'pointer',
        }}>
          Cancel
        </button>
        <button style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: 'var(--odl-primary)',
          color: 'white',
          cursor: 'pointer',
        }}>
          Save
        </button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact variant designed for use inside drawers alongside other form fields.',
      },
    },
  },
};

// ============================================
// BUTTON VARIANT
// ============================================

export const Button: Story = {
  args: {
    label: 'Resume',
    variant: 'button',
    buttonText: 'Choose File',
    accept: '.pdf,.doc,.docx',
  },
};

export const ButtonMultiple: Story = {
  args: {
    label: 'Documents',
    variant: 'button',
    buttonText: 'Upload Documents',
    multiple: true,
    accept: '.pdf',
    maxFiles: 5,
  },
};

// ============================================
// PICTURE CARD VARIANT
// ============================================

export const PictureCard: Story = {
  args: {
    label: 'Gallery Images',
    variant: 'picture-card',
    accept: 'image/*',
    multiple: true,
    maxFiles: 8,
  },
};

export const PictureCardSingle: Story = {
  args: {
    label: 'Profile Photo',
    variant: 'picture-card',
    accept: 'image/*',
    multiple: false,
    helperText: 'Upload a profile picture',
  },
};

// ============================================
// AI INTEGRATION
// ============================================

const mockAIAnalysis = async (file: File) => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const fileName = file.name.toLowerCase();
  let category = 'Document';
  let tags = ['uploaded'];
  let summary = 'Document uploaded successfully';

  if (fileName.includes('invoice') || fileName.includes('receipt')) {
    category = 'Financial';
    tags = ['invoice', 'financial', 'expense'];
    summary = 'Invoice document detected with payment details';
  } else if (fileName.includes('contract') || fileName.includes('agreement')) {
    category = 'Legal';
    tags = ['contract', 'legal', 'agreement'];
    summary = 'Legal contract requiring review';
  } else if (file.type.startsWith('image/')) {
    category = 'Media';
    tags = ['image', 'visual', 'media'];
    summary = 'Image file for visual content';
  }

  return { category, tags, summary, confidence: 0.85 };
};

export const WithAIAnalysis: Story = {
  args: {
    label: 'Smart Document Upload',
    variant: 'dropzone',
    enableAI: true,
    onAnalyze: mockAIAnalysis,
    onUpload: async (file, onProgress) => {
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(r => setTimeout(r, 100));
        onProgress(i);
      }
    },
    helperText: 'AI will analyze and categorize your documents',
    multiple: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Documents are automatically analyzed by AI after upload, extracting categories, tags, and summaries.',
      },
    },
  },
};

export const CompactWithAI: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <FileUpload
        variant="compact"
        label="Document Intelligence"
        enableAI
        onAnalyze={mockAIAnalysis}
        onUpload={async (file, onProgress) => {
          for (let i = 0; i <= 100; i += 25) {
            await new Promise(r => setTimeout(r, 80));
            onProgress(i);
          }
        }}
        accept=".pdf,.doc,.docx"
        multiple
        fullWidth
        helperText="AI-powered document analysis"
      />
    </div>
  ),
};

// ============================================
// STATES
// ============================================

export const WithError: Story = {
  args: {
    label: 'Upload File',
    variant: 'dropzone',
    error: true,
    errorMessage: 'Please upload at least one file',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Upload File',
    variant: 'dropzone',
    disabled: true,
    helperText: 'Upload is currently disabled',
  },
};

export const CompactDisabled: Story = {
  args: {
    label: 'Attachments',
    variant: 'compact',
    disabled: true,
    fullWidth: true,
  },
};

// ============================================
// WITH UPLOAD PROGRESS
// ============================================

export const WithProgress: Story = {
  args: {
    label: 'Upload with Progress',
    variant: 'dropzone',
    multiple: true,
    onUpload: async (file, onProgress) => {
      for (let i = 0; i <= 100; i += 5) {
        await new Promise(r => setTimeout(r, 50));
        onProgress(i);
      }
    },
  },
};

// ============================================
// ALL VARIANTS COMPARISON
// ============================================

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '500px' }}>
      <section>
        <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#525252' }}>
          Dropzone (Default)
        </h3>
        <FileUpload
          variant="dropzone"
          dropzoneText="Drag and drop documents"
          dropzoneSubtext="Upload relevant documents, or {browse}"
          size="md"
        />
      </section>

      <section>
        <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#525252' }}>
          Compact (For Drawers/Forms)
        </h3>
        <FileUpload
          variant="compact"
          label="Attachments"
          accept=".pdf,.doc,.docx"
          multiple
          fullWidth
        />
      </section>

      <section>
        <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#525252' }}>
          Button
        </h3>
        <FileUpload
          variant="button"
          label="Resume"
          buttonText="Choose File"
          accept=".pdf"
        />
      </section>

      <section>
        <h3 style={{ margin: '0 0 12px', fontSize: '14px', fontWeight: 600, color: '#525252' }}>
          Picture Card
        </h3>
        <FileUpload
          variant="picture-card"
          label="Gallery"
          accept="image/*"
          multiple
          maxFiles={6}
        />
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all FileUpload variants side by side.',
      },
    },
  },
};
