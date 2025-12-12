import React, { useState, useRef, useCallback } from 'react';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import styles from './TableDemo.module.css';
import ODLTheme from '../styles/ODLTheme';

// Modal Component with ODL Theme
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  footer?: React.ReactNode;
  variant?: 'default' | 'danger' | 'warning' | 'success';
  draggable?: boolean;
  noOverlay?: boolean;
  initialPosition?: { x: number; y: number };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  closeOnOverlayClick = true,
  footer,
  draggable = false,
  noOverlay = false,
  initialPosition = { x: window.innerWidth / 2 - 300, y: 100 }
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement>(null);

  // All hooks must be defined before any early returns (Rules of Hooks)
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !draggable) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  }, [isDragging, draggable, dragStart.x, dragStart.y]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // useEffect hooks must also be before early return
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      if (!noOverlay) {
        document.body.style.overflow = 'hidden';
      }
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (!noOverlay) {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen, noOverlay, handleEscape]);

  // Early return must be after ALL hooks (including useEffect)
  if (!isOpen) return null;

  const sizeStyles = {
    small: { width: '400px' },
    medium: { width: '600px' },
    large: { width: '900px' },
    fullscreen: { width: '100vw', height: '100vh' }
  };

  // const __variantColors = {
  //   default: ODLTheme.colors.primary,
  //   danger: ODLTheme.colors.error,
  //   warning: ODLTheme.colors.warning,
  //   success: ODLTheme.colors.success
  // };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const modalContent = (
    <div
      ref={modalRef}
      style={{
        width: draggable ? '600px' : sizeStyles[size].width,
        backgroundColor: 'white',
        borderRadius: size === 'fullscreen' ? 0 : '8px',
        border: `2px solid ${ODLTheme.colors.primary}`,
        boxShadow: draggable ? '0 15px 50px rgba(0, 0, 0, 0.3)' : '0 10px 40px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: size === 'fullscreen' ? '100vh' : '90vh',
        animation: !draggable ? 'slideUp 0.3s ease' : 'none',
        position: draggable ? 'fixed' : 'relative',
        left: draggable ? `${position.x}px` : 'auto',
        top: draggable ? `${position.y}px` : 'auto',
        zIndex: draggable ? 10000 : 'auto',
        cursor: isDragging ? 'grabbing' : 'default'
      }}
    >
      {/* Header */}
      {(title || showCloseButton) && (
        <div
          style={{
            padding: '24px 32px',
            borderBottom: `1px solid ${ODLTheme.colors.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            cursor: draggable ? 'grab' : 'default'
          }}
          onMouseDown={draggable ? handleMouseDown : undefined}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            {draggable && (
              <Icon name="draggable" size={20} style={{ color: '#6B7280' }} />
            )}
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 600,
                color: ODLTheme.colors.text.primary,
                margin: 0,
                lineHeight: 1.2
              }}
            >
              {title || 'Title {h2}'}
            </h2>
          </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '4px',
                    cursor: 'pointer',
                    color: ODLTheme.colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'color 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = ODLTheme.colors.text.primary;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                  }}
                  aria-label="Close modal"
                >
                  <svg 
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div
            style={{
              flex: 1,
              padding: '32px',
              overflowY: 'auto',
              color: ODLTheme.colors.text.primary,
              fontSize: '14px'
            }}
          >
            {children}
          </div>

      {/* Footer */}
      {footer && (
        <div
          style={{
            padding: '24px 32px',
            borderTop: `1px solid ${ODLTheme.colors.border}`,
            backgroundColor: '#EDF1F5',
            borderBottomLeftRadius: size === 'fullscreen' ? 0 : '6px',
            borderBottomRightRadius: size === 'fullscreen' ? 0 : '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {footer}
        </div>
      )}
    </div>
  );

  // Return draggable modal without overlay or regular modal with overlay
  if (draggable && noOverlay) {
    return (
      <>
        {modalContent}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      {!noOverlay && (
        <div
          onClick={handleOverlayClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            display: 'flex',
            alignItems: size === 'fullscreen' ? 'stretch' : 'center',
            justifyContent: 'center',
            zIndex: 9999,
            animation: 'fadeIn 0.2s ease',
            padding: size === 'fullscreen' ? 0 : '2rem'
          }}
        >
          {modalContent}
        </div>
      )}
      {noOverlay && modalContent}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

// Confirmation Modal Component
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'success';
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger'
}) => {
  // const __variantConfig = {
  //   danger: {
  //     color: ODLTheme.colors.error,
  //     icon: 'event-warning',
  //     buttonVariant: 'primary'  // Changed to primary for all variants
  //   },
  //   warning: {
  //     color: ODLTheme.colors.warning,
  //     icon: 'warning',
  //     buttonVariant: 'primary'  // Changed to primary for all variants
  //   },
  //   success: {
  //     color: ODLTheme.colors.success,
  //     icon: 'checkmark-filled',
  //     buttonVariant: 'primary'  // Changed to primary for all variants
  //   }
  // };

  const variantConfig = {
    danger: {
      color: ODLTheme.colors.error,
      icon: 'event-warning' as const,
      buttonVariant: 'primary' as const
    },
    warning: {
      color: ODLTheme.colors.warning,
      icon: 'warning' as const,
      buttonVariant: 'primary' as const
    },
    success: {
      color: ODLTheme.colors.success,
      icon: 'checkmark-filled' as const,
      buttonVariant: 'primary' as const
    }
  };

  const config = variantConfig[variant as keyof typeof variantConfig];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="small"
      showCloseButton={false}
      closeOnOverlayClick={false}
      footer={
        <>
          <Button
            variant="ghost"
            size="small"
            onClick={onClose}
          >
            {cancelText}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmText}
          </Button>
        </>
      }
    >
      <div style={{ textAlign: 'center', padding: '1rem' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 1.5rem',
            borderRadius: '50%',
            backgroundColor: `${config.color}15`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Icon name={config.icon} size={64} style={{ color: config.color }} />
        </div>
        <h3
          style={{
            fontSize: ODLTheme.typography.fontSize.xl,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            marginBottom: '0.75rem',
            color: ODLTheme.colors.text.primary
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: ODLTheme.typography.fontSize.base,
            color: ODLTheme.colors.text.secondary,
            marginBottom: '2rem',
            lineHeight: ODLTheme.typography.lineHeight.relaxed
          }}
        >
          {message}
        </p>
      </div>
    </Modal>
  );
};

const ModalDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'sizes' | 'confirmation' | 'form' | 'scrollable' | 'draggable' | 'upload'>('basic');
  const [showCode, setShowCode] = useState(false);

  // Modal states
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [smallModalOpen, setSmallModalOpen] = useState(false);
  const [largeModalOpen, setLargeModalOpen] = useState(false);
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [warningModalOpen, setWarningModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [scrollableModalOpen, setScrollableModalOpen] = useState(false);
  const [draggableModalOpen, setDraggableModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<Array<{name: string, size: string, status: 'uploading' | 'completed' | 'processing' | 'analyzed' | 'error'}>>([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [_aiProcessingIndex, setAiProcessingIndex] = useState(-1);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    notes: ''
  });

  // Handle scroll detection for scrollable modal
  const handleScrollableContentScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 5;
    setHasScrolledToBottom(isAtBottom);
  };

  // Handle file upload
  const handleFileUpload = (files: File[]) => {
    const newFiles = files.map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(1)} KB`,
      status: 'uploading' as const
    }));
    
    const startIndex = uploadedFiles.length;
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(uploadInterval);
        // Mark as completed
        setUploadedFiles(prev => 
          prev.map((file, index) => {
            if (index >= startIndex && index < startIndex + newFiles.length) {
              return { ...file, status: 'completed' as const };
            }
            return file;
          })
        );
        
        // Start AI processing after a short delay
        setTimeout(() => {
          processWithAI(startIndex, newFiles.length);
        }, 500);
      }
    }, 200);
  };

  // Simulate AI processing
  const processWithAI = (startIndex: number, count: number) => {
    let currentIndex = 0;
    
    const processNext = () => {
      if (currentIndex < count) {
        const fileIndex = startIndex + currentIndex;
        setAiProcessingIndex(fileIndex);
        
        // Mark current file as processing
        setUploadedFiles(prev => 
          prev.map((file, index) => {
            if (index === fileIndex) {
              return { ...file, status: 'processing' as const };
            }
            return file;
          })
        );
        
        // Simulate AI analysis time (2-3 seconds)
        setTimeout(() => {
          // Mark as analyzed
          setUploadedFiles(prev => 
            prev.map((file, index) => {
              if (index === fileIndex) {
                return { ...file, status: 'analyzed' as const };
              }
              return file;
            })
          );
          
          currentIndex++;
          // Process next file after a short delay
          setTimeout(processNext, 300);
        }, 2000 + Math.random() * 1000);
      } else {
        setAiProcessingIndex(-1);
      }
    };
    
    processNext();
  };

  const codeExamples: { [key: string]: string } = {
    basic: `<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Basic Modal"
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
      <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </div>
  }
>
  <p>This is a basic modal with title and footer.</p>
</Modal>`,
    sizes: `// Small Modal
<Modal isOpen={isOpen} onClose={handleClose} size="small" title="Small Modal">
  <p>Compact modal for quick actions</p>
</Modal>

// Large Modal
<Modal isOpen={isOpen} onClose={handleClose} size="large" title="Large Modal">
  <p>Spacious modal for detailed content</p>
</Modal>

// Fullscreen Modal
<Modal isOpen={isOpen} onClose={handleClose} size="fullscreen" title="Fullscreen Modal">
  <p>Full screen experience</p>
</Modal>`,
    confirmation: `<ConfirmationModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Delete Item?"
  message="This action cannot be undone. Are you sure you want to proceed?"
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
/>`,
    form: `<Modal
  isOpen={isFormOpen}
  onClose={handleClose}
  title="Add New User"
  footer={
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span style={{ color: ODLTheme.colors.text.secondary }}>
        * Required fields
      </span>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={handleClose}>Cancel</button>
        <button onClick={handleSubmit}>Add User</button>
      </div>
    </div>
  }
>
  <form>
    <div style={{ marginBottom: '1.5rem' }}>
      <label>Name *</label>
      <input type="text" value={formData.name} onChange={handleChange} />
    </div>
    <div style={{ marginBottom: '1.5rem' }}>
      <label>Email *</label>
      <input type="email" value={formData.email} onChange={handleChange} />
    </div>
    <div style={{ marginBottom: '1.5rem' }}>
      <label>Department</label>
      <select value={formData.department} onChange={handleChange}>
        <option value="">Select department</option>
        <option value="planning">Planning</option>
        <option value="assessment">Assessment</option>
      </select>
    </div>
  </form>
</Modal>`,
    scrollable: `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Terms and Conditions"
  size="large"
>
  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
    {/* Long content that scrolls */}
    <h3>1. Introduction</h3>
    <p>Lorem ipsum dolor sit amet...</p>
    {/* More content... */}
  </div>
</Modal>`,
    draggable: `<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Draggable Modal"
  draggable={true}
  noOverlay={true}
  initialPosition={{ x: 100, y: 100 }}
  footer={
    <>
      <Button variant="ghost" size="small" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" size="small" onClick={handleAction}>
        Perform Action
      </Button>
    </>
  }
>
  <p>This modal can be dragged around the screen.</p>
  <p>Click and drag the header to reposition.</p>
</Modal>`,
    upload: `<Modal
  isOpen={uploadModalOpen}
  onClose={handleClose}
  title="Upload Documents"
  size="medium"
  footer={
    <>
      <Button variant="ghost" size="small" onClick={handleClose}>
        Cancel
      </Button>
      <Button 
        variant="primary" 
        size="small"
        disabled={uploadedFiles.length === 0}
        onClick={handleUploadComplete}
      >
        Complete Upload
      </Button>
    </>
  }
>
  <div
    onDragOver={(e) => e.preventDefault()}
    onDrop={handleDrop}
    onClick={handleBrowse}
    style={{
      border: '2px dashed #D1D1D1',
      borderRadius: '8px',
      padding: '3rem 2rem',
      textAlign: 'center'
    }}
  >
    <Icon name="upload" size={48} />
    <h3>Drag & Drop files here</h3>
    <p>or click to browse</p>
  </div>
</Modal>`
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Modal" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Modal Component</h1>
            <p>Dialog overlays for focused user interactions with ODL theme</p>
          </div>
          <button
            className={styles.viewCodeButton}
            onClick={() => setShowCode(!showCode)}
          >
            <Icon name="code" size={20} />
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic Modals', icon: '💬' },
            { key: 'sizes', label: 'Modal Sizes', icon: '📐' },
            { key: 'confirmation', label: 'Confirmation', icon: '⚠️' },
            { key: 'form', label: 'Form Modal', icon: '📝' },
            { key: 'scrollable', label: 'Scrollable', icon: '📜' },
            { key: 'draggable', label: 'Draggable', icon: '🎯' },
            { key: 'upload', label: 'Upload', icon: '📤' },
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Modals</h2>
              <p>Standard modal dialogs with title, content, and actions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setBasicModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ODLTheme.colors.primary,
                    color: 'white',
                    fontSize: ODLTheme.typography.fontSize.base,
                    fontWeight: ODLTheme.typography.fontWeight.medium,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = ODLTheme.colors.primaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = ODLTheme.colors.primary;
                  }}
                >
                  Open Basic Modal
                </button>
              </div>

              <Modal
                isOpen={basicModalOpen}
                onClose={() => setBasicModalOpen(false)}
                title="Basic Modal Example"
                footer={
                  <>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => setBasicModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => {
                        alert('Saved!');
                        setBasicModalOpen(false);
                      }}
                    >
                      Save Changes
                    </Button>
                  </>
                }
              >
                <p style={{ marginBottom: '1rem' }}>
                  This is a basic modal dialog with a title, content area, and action buttons in the footer.
                </p>
                <p>
                  Modals are perfect for focused user interactions that require attention, such as confirmations,
                  forms, or detailed information display.
                </p>
              </Modal>
            </div>
          </div>
        )}

        {selectedDemo === 'sizes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Modal Sizes</h2>
              <p>Different modal sizes for various content needs</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setSmallModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${ODLTheme.colors.border}`,
                    background: 'white',
                    color: ODLTheme.colors.text.primary,
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Small Modal
                </button>
                <button
                  onClick={() => setLargeModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${ODLTheme.colors.border}`,
                    background: 'white',
                    color: ODLTheme.colors.text.primary,
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Large Modal
                </button>
                <button
                  onClick={() => setFullscreenModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: `1px solid ${ODLTheme.colors.border}`,
                    background: 'white',
                    color: ODLTheme.colors.text.primary,
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Fullscreen Modal
                </button>
              </div>

              <Modal
                isOpen={smallModalOpen}
                onClose={() => setSmallModalOpen(false)}
                title="Small Modal"
                size="small"
              >
                <p>Perfect for quick confirmations or simple forms.</p>
              </Modal>

              <Modal
                isOpen={largeModalOpen}
                onClose={() => setLargeModalOpen(false)}
                title="Large Modal"
                size="large"
              >
                <p>Ideal for detailed content, complex forms, or data tables.</p>
                <div style={{ marginTop: '1rem', padding: '1rem', background: ODLTheme.colors.background, borderRadius: '8px' }}>
                  <h3>Additional Content Area</h3>
                  <p>Large modals provide more space for comprehensive information display.</p>
                </div>
              </Modal>

              <Modal
                isOpen={fullscreenModalOpen}
                onClose={() => setFullscreenModalOpen(false)}
                title="Fullscreen Modal"
                size="fullscreen"
              >
                <p>Takes up the entire viewport for immersive experiences.</p>
                <p style={{ marginTop: '1rem' }}>
                  Fullscreen modals are perfect for multi-step wizards, document editors, or detailed workflows.
                </p>
              </Modal>
            </div>
          </div>
        )}

        {selectedDemo === 'confirmation' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Confirmation Modals</h2>
              <p>Action confirmation dialogs with different severity levels</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setDangerModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ODLTheme.colors.error,
                    color: 'white',
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Delete Action
                </button>
                <button
                  onClick={() => setWarningModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ODLTheme.colors.warning,
                    color: ODLTheme.colors.text.secondary,
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Warning Action
                </button>
                <button
                  onClick={() => setSuccessModalOpen(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: ODLTheme.colors.success,
                    color: 'white',
                    fontSize: ODLTheme.typography.fontSize.base,
                    cursor: 'pointer'
                  }}
                >
                  Success Action
                </button>
              </div>

              <ConfirmationModal
                isOpen={dangerModalOpen}
                onClose={() => setDangerModalOpen(false)}
                onConfirm={() => alert('Item deleted!')}
                title="Delete Item?"
                message="This action cannot be undone. Are you sure you want to delete this item?"
                confirmText="Delete"
                cancelText="Cancel"
                variant="danger"
              />

              <ConfirmationModal
                isOpen={warningModalOpen}
                onClose={() => setWarningModalOpen(false)}
                onConfirm={() => alert('Changes discarded!')}
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to leave?"
                confirmText="Discard Changes"
                cancelText="Keep Editing"
                variant="warning"
              />

              <ConfirmationModal
                isOpen={successModalOpen}
                onClose={() => setSuccessModalOpen(false)}
                onConfirm={() => alert('Published!')}
                title="Ready to Publish?"
                message="Your content will be visible to all users once published."
                confirmText="Publish"
                cancelText="Review Again"
                variant="success"
              />
            </div>
          </div>
        )}

        {selectedDemo === 'form' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Form Modal</h2>
              <p>Modal with form inputs for data collection</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <button
                onClick={() => setFormModalOpen(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: ODLTheme.colors.primary,
                  color: 'white',
                  fontSize: ODLTheme.typography.fontSize.base,
                  cursor: 'pointer'
                }}
              >
                Add New User
              </button>

              <Modal
                isOpen={formModalOpen}
                onClose={() => setFormModalOpen(false)}
                title="Add New User"
                size="medium"
                footer={
                  <>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => setFormModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => {
                        alert('User added successfully!');
                        setFormModalOpen(false);
                      }}
                    >
                      Add User
                    </Button>
                  </>
                }
              >
                <form style={{ width: '100%' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      label="Name"
                      type="text"
                      value={formData.name}
                      onChange={(value) => setFormData({ ...formData, name: value })}
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData({ ...formData, email: value })}
                      placeholder="user@example.com"
                      required
                      icon={<Icon name="email" size={16} />}
                      error={formData.email !== '' && !formData.email.includes('@')}
                      helperText={formData.email !== '' && !formData.email.includes('@') ? 'Please enter a valid email address' : ''}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.primary
                      }}
                    >
                      Department
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '2px',
                        border: `2px solid ${ODLTheme.colors.border}`,
                        borderBottom: `2px solid ${ODLTheme.colors.primary}`,
                        fontSize: ODLTheme.typography.fontSize.base,
                        outline: 'none',
                        background: '#f5f5f5',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderBottomColor = ODLTheme.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background = '#f5f5f5';
                        e.currentTarget.style.borderBottomColor = ODLTheme.colors.border;
                      }}
                    >
                      <option value="">Select department</option>
                      <option value="planning">Planning</option>
                      <option value="assessment">Assessment</option>
                      <option value="development">Development</option>
                      <option value="compliance">Compliance</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: ODLTheme.typography.fontSize.sm,
                        fontWeight: ODLTheme.typography.fontWeight.medium,
                        color: ODLTheme.colors.text.primary
                      }}
                    >
                      Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '2px',
                        border: `2px solid ${ODLTheme.colors.border}`,
                        borderBottom: `2px solid ${ODLTheme.colors.primary}`,
                        fontSize: ODLTheme.typography.fontSize.base,
                        outline: 'none',
                        minHeight: '100px',
                        resize: 'vertical',
                        background: '#f5f5f5',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="Additional notes..."
                      onFocus={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderBottomColor = ODLTheme.colors.primary;
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.background = '#f5f5f5';
                        e.currentTarget.style.borderBottomColor = ODLTheme.colors.border;
                      }}
                    />
                  </div>
                </form>
              </Modal>
            </div>
          </div>
        )}

        {selectedDemo === 'scrollable' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Scrollable Content</h2>
              <p>Handle long content with scrollable modal body</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <button
                onClick={() => setScrollableModalOpen(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: ODLTheme.colors.primary,
                  color: 'white',
                  fontSize: ODLTheme.typography.fontSize.base,
                  cursor: 'pointer'
                }}
              >
                View Terms & Conditions
              </button>

              <Modal
                isOpen={scrollableModalOpen}
                onClose={() => {
                  setScrollableModalOpen(false);
                  setHasScrolledToBottom(false);
                }}
                title="Terms and Conditions"
                size="large"
                footer={
                  <>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => {
                        setScrollableModalOpen(false);
                        setHasScrolledToBottom(false);
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant={hasScrolledToBottom ? "primary" : "ghost"}
                      size="small"
                      disabled={!hasScrolledToBottom}
                      onClick={() => {
                        if (hasScrolledToBottom) {
                          alert('Terms accepted!');
                          setScrollableModalOpen(false);
                          setHasScrolledToBottom(false);
                        }
                      }}
                    >
                      Accept Terms
                    </Button>
                  </>
                }
              >
                <div 
                  style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '1rem' }}
                  onScroll={handleScrollableContentScroll}
                >
                  <h3 style={{ marginBottom: '1rem' }}>1. Introduction</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>2. User Agreement</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>3. Privacy Policy</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>4. Data Collection</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                    magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                    ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>5. Cookies</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>6. Third Party Services</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                    eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis
                    voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>7. Limitations</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                    voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
                    delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>8. Liability</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>9. Modifications</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
                    totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae
                    dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>10. Termination</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum
                    deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non
                    provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>11. Governing Law</h3>
                  <p style={{ marginBottom: '1rem', lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est
                    eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis
                    voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis.
                  </p>

                  <h3 style={{ marginBottom: '1rem' }}>12. Contact Information</h3>
                  <p style={{ lineHeight: ODLTheme.typography.lineHeight.relaxed }}>
                    Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod
                    maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
                    For any questions, please contact us at legal@example.com or call 1-800-555-0123.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        )}

        {selectedDemo === 'draggable' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Draggable Modal</h2>
              <p>Movable modal window without overlay that can be dragged around the screen</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: ODLTheme.colors.text.secondary, marginBottom: '1rem' }}>
                  Click the button to open a draggable modal. Drag the modal by its header to move it around.
                  The modal has no overlay, allowing interaction with the content behind it.
                </p>
              </div>
              
              <button
                onClick={() => setDraggableModalOpen(true)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: ODLTheme.colors.primary,
                  color: 'white',
                  fontSize: ODLTheme.typography.fontSize.base,
                  cursor: 'pointer'
                }}
              >
                Open Draggable Modal
              </button>

              <Modal
                isOpen={draggableModalOpen}
                onClose={() => setDraggableModalOpen(false)}
                title="Draggable Modal"
                draggable={true}
                noOverlay={true}
                footer={
                  <>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => setDraggableModalOpen(false)}
                    >
                      Close
                    </Button>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={() => {
                        alert('Action performed!');
                        setDraggableModalOpen(false);
                      }}
                    >
                      Perform Action
                    </Button>
                  </>
                }
              >
                <div>
                  <p style={{ marginBottom: '1rem' }}>
                    This modal can be dragged around the screen by clicking and dragging the header area.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    Key features:
                  </p>
                  <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
                    <li>No overlay - you can interact with content behind</li>
                    <li>Drag by header to reposition</li>
                    <li>Higher z-index to stay on top</li>
                    <li>Enhanced shadow for better visibility</li>
                  </ul>
                  <p>
                    Perfect for tools, floating panels, or secondary information that users need to reference
                    while working with the main content.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        )}

        {selectedDemo === 'upload' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Upload Modal</h2>
              <p>File upload with drag-and-drop and animated progress</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <button
                onClick={() => {
                  setUploadModalOpen(true);
                  setUploadedFiles([]);
                  setUploadProgress(0);
                  setAiProcessingIndex(-1);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: ODLTheme.colors.primary,
                  color: 'white',
                  fontSize: ODLTheme.typography.fontSize.base,
                  cursor: 'pointer'
                }}
              >
                Upload Documents
              </button>

              <Modal
                isOpen={uploadModalOpen}
                onClose={() => {
                  setUploadModalOpen(false);
                  setUploadedFiles([]);
                  setUploadProgress(0);
                }}
                title="Upload Documents"
                size="medium"
                footer={
                  <>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => {
                        setUploadModalOpen(false);
                        setUploadedFiles([]);
                        setUploadProgress(0);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      disabled={uploadedFiles.length === 0}
                      onClick={() => {
                        alert('Files uploaded successfully!');
                        setUploadModalOpen(false);
                        setUploadedFiles([]);
                        setUploadProgress(0);
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
                      border: isDraggingFile ? `2px dashed ${ODLTheme.colors.primary}` : `2px dashed ${ODLTheme.colors.border}`,
                      borderRadius: '8px',
                      padding: '3rem 2rem',
                      textAlign: 'center',
                      backgroundColor: isDraggingFile ? '#F0F7FF' : '#FAFAFA',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(true);
                    }}
                    onDragLeave={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(false);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDraggingFile(false);
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
                      <h4 style={{ marginBottom: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>
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
                            {file.status === 'processing' && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                              }}>
                                <div style={{
                                  display: 'flex',
                                  gap: '3px'
                                }}>
                                  <div style={{
                                    width: '4px',
                                    height: '16px',
                                    backgroundColor: ODLTheme.colors.primary,
                                    borderRadius: '2px',
                                    animation: 'aiPulse 1.4s ease-in-out infinite'
                                  }} />
                                  <div style={{
                                    width: '4px',
                                    height: '16px',
                                    backgroundColor: ODLTheme.colors.primary,
                                    borderRadius: '2px',
                                    animation: 'aiPulse 1.4s ease-in-out 0.2s infinite'
                                  }} />
                                  <div style={{
                                    width: '4px',
                                    height: '16px',
                                    backgroundColor: ODLTheme.colors.primary,
                                    borderRadius: '2px',
                                    animation: 'aiPulse 1.4s ease-in-out 0.4s infinite'
                                  }} />
                                </div>
                                <span style={{
                                  fontSize: '0.625rem',
                                  color: ODLTheme.colors.primary,
                                  fontWeight: 600,
                                  animation: 'fadeInOut 1.5s ease-in-out infinite'
                                }}>
                                  AI Analyzing...
                                </span>
                              </div>
                            )}
                            {file.status === 'analyzed' && (
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                              }}>
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  backgroundColor: '#E0F2FE',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  animation: 'scaleIn 0.3s ease'
                                }}>
                                  <Icon name="generate-ai" size={16} style={{ color: ODLTheme.colors.primary }} />
                                </div>
                                <span style={{
                                  fontSize: '0.625rem',
                                  color: ODLTheme.colors.success,
                                  fontWeight: 600
                                }}>
                                  AI Ready
                                </span>
                              </div>
                            )}
                            {file.status === 'error' && (
                              <Icon name="warning" size={24} style={{ color: ODLTheme.colors.error }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <style>{`
                  @keyframes uploadBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                  }
                  @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes aiPulse {
                    0%, 100% {
                      opacity: 0.3;
                      transform: scaleY(0.7);
                    }
                    50% {
                      opacity: 1;
                      transform: scaleY(1);
                    }
                  }
                  @keyframes fadeInOut {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                  }
                  @keyframes scaleIn {
                    from {
                      transform: scale(0);
                      opacity: 0;
                    }
                    to {
                      transform: scale(1);
                      opacity: 1;
                    }
                  }
                `}</style>
              </Modal>
            </div>
          </div>
        )}

        {/* Code Example */}
        {showCode && (
          <div className={styles.codeSection}>
            <div className={styles.codeHeader}>
              <h3>Code Example</h3>
              <button className={styles.copyButton}>
                <Icon name="copy" size={16} />
                Copy Code
              </button>
            </div>
            <pre className={styles.codeBlock}>
              <code>{codeExamples[selectedDemo]}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Modal Component Features</h3>
          <p>Everything you need for dialog overlays and focused interactions</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ ODL theme integration</li>
              <li>✓ Multiple size options</li>
              <li>✓ Customizable header & footer</li>
              <li>✓ Overlay click to close</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>💡 Advanced</h4>
            <ul>
              <li>✓ Confirmation dialogs</li>
              <li>✓ Form integration</li>
              <li>✓ Scrollable content</li>
              <li>✓ Variant styles</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Customization</h4>
            <ul>
              <li>✓ Custom animations</li>
              <li>✓ Flexible footer actions</li>
              <li>✓ Close button control</li>
              <li>✓ Background click behavior</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ Performance</h4>
            <ul>
              <li>✓ Portal rendering</li>
              <li>✓ Lazy loading content</li>
              <li>✓ Smooth animations</li>
              <li>✓ Focus management</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ Keyboard navigation</li>
              <li>✓ ESC key to close</li>
              <li>✓ Focus trap</li>
              <li>✓ ARIA attributes</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🚀 Use Cases</h4>
            <ul>
              <li>✓ Confirmations</li>
              <li>✓ Forms & data entry</li>
              <li>✓ Detail views</li>
              <li>✓ Alerts & warnings</li>
            </ul>
          </div>
        </div>
      </div>

      <BackToTop />
    </div>
  );
};

export default ModalDemo;