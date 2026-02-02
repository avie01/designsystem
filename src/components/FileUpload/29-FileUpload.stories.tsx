import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import IconButton from '../IconButton/IconButton';
import FileType, { FileTypeVariant } from '../FileType/FileType';
import ODLTheme from '../../styles/ODLTheme';

const meta = {
  title: 'Design System/Components/FileUpload',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Simple file upload modal with drag-and-drop support.',
      },
    },
  },
  tags: ['autodocs', 'Ready for dev'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// UPLOAD MODAL
// ============================================

export const UploadModal: Story = {
  name: '01 Upload Modal',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<Array<{
      name: string;
      size: string;
      status: 'uploading' | 'completed' | 'error';
      progress: number;
    }>>([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileUpload = (files: File[]) => {
      const newFiles = files.map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        status: 'uploading' as const,
        progress: 0
      }));

      setUploadedFiles(prev => [...prev, ...newFiles]);

      // Simulate upload
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setUploadedFiles(prev =>
            prev.map(file =>
              file.status === 'uploading'
                ? { ...file, status: 'completed', progress: 100 }
                : file
            )
          );
        }
      }, 200);
    };

    const resetModal = () => {
      setIsOpen(false);
      setUploadedFiles([]);
      setUploadProgress(0);
    };

    return (
      <div>
        <Button
          variant="primary"
          size="large"
          onClick={() => setIsOpen(true)}
        >
          <Icon name="upload" size={20} style={{ marginRight: '8px' }} />
          Upload Documents
        </Button>

        <Modal
          isOpen={isOpen}
          onClose={resetModal}
          title="Upload Documents"
          size="medium"
          footer={
            <>
              <Button
                variant="disabled"
                size="medium"
                onClick={resetModal}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="medium"
                disabled={uploadedFiles.length === 0}
                onClick={() => {
                  alert('Files uploaded successfully!');
                  resetModal();
                }}
              >
                Complete Upload
              </Button>
            </>
          }
        >
          <div>
            {/* Drag and Drop Zone */}
            <div
              style={{
                border: isDragging ? `2px dashed ${ODLTheme.colors.primary}` : `2px dashed ${ODLTheme.colors.border}`,
                borderRadius: '8px',
                padding: '3rem 2rem',
                textAlign: 'center',
                backgroundColor: isDragging ? '#F0F7FF' : '#FAFAFA',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden'
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload(files);
              }}
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = '.pdf,.doc,.docx,.jpg,.png';
                input.onchange = (e) => {
                  const files = Array.from((e.target as HTMLInputElement).files || []);
                  handleFileUpload(files);
                };
                input.click();
              }}
            >
              {/* Animated Upload Icon */}
              <div style={{
                display: 'inline-block',
                animation: 'uploadBounce 2s ease-in-out infinite'
              }}>
                <Icon name="upload" size={48} style={{ color: ODLTheme.colors.primary }} />
              </div>

              <h3 style={{
                margin: '1rem 0 0.5rem 0',
                color: ODLTheme.colors.text.primary,
                fontSize: '1.125rem'
              }}>
                Drag & Drop files here
              </h3>
              <p style={{
                color: ODLTheme.colors.text.secondary,
                fontSize: '0.875rem',
                marginBottom: '1rem'
              }}>
                or click to browse
              </p>
              <p style={{
                color: ODLTheme.colors.text.tertiary,
                fontSize: '0.75rem'
              }}>
                Supports PDF, DOC, DOCX, JPG, PNG (Max 10MB)
              </p>
            </div>

            {/* File List */}
            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h4 style={{
                  marginBottom: '1rem',
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}>
                  Uploaded Files ({uploadedFiles.length})
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem',
                        backgroundColor: '#F8F9FA',
                        borderRadius: '6px',
                        border: `1px solid ${ODLTheme.colors.border}`
                      }}
                    >
                      <Icon
                        name={file.name.endsWith('.pdf') ? 'document-pdf' : 'document'}
                        size={24}
                        style={{ color: file.name.endsWith('.pdf') ? '#DC2626' : ODLTheme.colors.primary }}
                      />
                      <div style={{ flex: 1, marginLeft: '0.75rem' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{file.name}</div>
                        <div style={{ fontSize: '0.75rem', color: ODLTheme.colors.text.secondary }}>{file.size}</div>
                      </div>
                      {file.status === 'uploading' && (
                        <div style={{
                          width: '40px',
                          height: '40px',
                          position: 'relative'
                        }}>
                          <svg style={{
                            animation: 'spin 1s linear infinite',
                            width: '100%',
                            height: '100%'
                          }}>
                            <circle
                              cx="20"
                              cy="20"
                              r="18"
                              stroke="#E5E7EB"
                              strokeWidth="3"
                              fill="none"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="18"
                              stroke={ODLTheme.colors.primary}
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${uploadProgress * 1.13} 113`}
                              strokeLinecap="round"
                              transform="rotate(-90 20 20)"
                              style={{
                                transition: 'stroke-dasharray 0.3s ease'
                              }}
                            />
                          </svg>
                          <span style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '0.625rem',
                            fontWeight: 600
                          }}>
                            {uploadProgress}%
                          </span>
                        </div>
                      )}
                      {file.status === 'completed' && (
                        <Icon name="checkmark-filled" size={24} style={{ color: ODLTheme.colors.success }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>

        <style>{`
          @keyframes uploadBounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  },
};

// ============================================
// ATTACHED CARDS
// ============================================

export const AttachedCards: Story = {
  name: '02 Attached Cards',
  render: () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const attachedFiles = [
      { name: 'Annual_Report_2024.pdf', size: '2.4 MB', status: 'completed' as const, progress: 100 },
      { name: 'Budget_Spreadsheet.xlsx', size: '856 KB', status: 'uploading' as const, progress: 65 },
      { name: 'Large_Video_File.mp4', size: '156 MB', status: 'loading' as const, progress: 42 },
      { name: 'Corrupted_File.zip', size: '4.1 MB', status: 'error' as const, progress: 0, errorMessage: 'Upload failed' },
      { name: 'Project_Proposal.docx', size: '1.2 MB', status: 'completed' as const, progress: 100 },
      { name: 'Team_Photo.jpg', size: '3.8 MB', status: 'removable' as const, progress: 100 },
    ];

    const getBackgroundColor = (status: string, isHovered: boolean) => {
      if (status === 'error') return isHovered ? '#FEE2E2' : '#FEF2F2';
      return isHovered ? '#e8e8e8' : '#F8F9FA';
    };

    const getFileType = (filename: string): FileTypeVariant => {
      const ext = filename.split('.').pop()?.toLowerCase() || '';
      return ext as FileTypeVariant;
    };

    return (
      <div style={{ width: '400px' }}>
        <h4 style={{
          marginBottom: '1rem',
          fontSize: '0.875rem',
          fontWeight: 600
        }}>
          Attached Files ({attachedFiles.length})
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0.75rem',
                backgroundColor: getBackgroundColor(file.status, hoveredIndex === index),
                borderRadius: '0px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FileType type={getFileType(file.name)} size={24} />
                <div style={{ flex: 1, marginLeft: '0.75rem' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{file.name}</div>
                  <div style={{ fontSize: '0.75rem', color: file.status === 'error' ? ODLTheme.colors.error : ODLTheme.colors.text.secondary }}>
                    {file.status === 'error' ? file.errorMessage : file.size}
                  </div>
                </div>
              {file.status === 'uploading' && (
                <div style={{
                  width: '40px',
                  height: '40px',
                  position: 'relative'
                }}>
                  <svg style={{
                    width: '100%',
                    height: '100%'
                  }}>
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      stroke="#E5E7EB"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="18"
                      stroke={ODLTheme.colors.primary}
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${file.progress * 1.13} 113`}
                      strokeLinecap="round"
                      transform="rotate(-90 20 20)"
                    />
                  </svg>
                  <span style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '0.625rem',
                    fontWeight: 600
                  }}>
                    {file.progress}%
                  </span>
                </div>
              )}
              {file.status === 'completed' && (
                <Icon name="checkmark-filled" size={24} style={{ color: ODLTheme.colors.success }} />
              )}
              {file.status === 'error' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <IconButton
                    icon="refresh"
                    variant="ghost"
                    size="small"
                    aria-label="Retry upload"
                    onClick={() => alert('Retrying upload...')}
                  />
                  <Icon name="warning-filled" size={24} style={{ color: ODLTheme.colors.error }} />
                </div>
              )}
              {file.status === 'removable' && (
                <IconButton
                  icon="close"
                  variant="ghost"
                  size="small"
                  aria-label="Remove file"
                  onClick={() => alert('File removed')}
                />
              )}
              </div>
              {file.status === 'loading' && (
                <div style={{ marginTop: '0.75rem' }}>
                  <div style={{
                    width: '100%',
                    height: '4px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${file.progress}%`,
                      height: '100%',
                      backgroundColor: ODLTheme.colors.primary,
                      borderRadius: '2px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: ODLTheme.colors.text.secondary,
                    marginTop: '0.25rem'
                  }}>
                    {file.progress}% uploaded
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  },
};
