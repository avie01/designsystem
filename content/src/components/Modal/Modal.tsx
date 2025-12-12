import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
// import ODLTheme from '../../styles/ODLTheme';
import './Modal.css';

export type ModalVariant = 'standard' | 'with-file' | 'with-summary';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Callback when action button is clicked */
  onAction?: () => void;
  /** Modal title */
  title?: string;
  /** Modal content */
  children?: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether to close on escape key */
  closeOnEscape?: boolean;
  /** Whether to close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Modal variant */
  variant?: ModalVariant;
  /** Action button label */
  actionLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Whether to show icon in header */
  showIcon?: boolean;
  /** File information for file variant */
  fileInfo?: {
    title: string;
    icon?: React.ReactNode;
  };
  /** Summary text for summary variant */
  summary?: string;
  /** Modal size */
  size?: 'small' | 'medium' | 'large' | 'full';
  /** Whether the modal is disabled */
  disabled?: boolean;
  /** Whether the modal is in error state */
  error?: boolean;
  /** ARIA labelledby attribute */
  'aria-labelledby'?: string;
  /** ARIA describedby attribute */
  'aria-describedby'?: string;
  /** ARIA live region for announcements */
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  onAction,
  title = 'Title {h2}', 
  children, 
  className = '',
  closeOnEscape = true,
  closeOnBackdropClick = true,
  variant = 'standard',
  actionLabel = 'Action',
  cancelLabel = 'Cancel',
  showIcon = true,
  fileInfo,
  summary,
  size = 'medium',
  disabled = false,
  error = false,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  'aria-live': ariaLive = 'polite'
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useRef(`modal-title-${Math.random().toString(36).substr(2, 9)}`).current;

  // Focus trap and keyboard navigation management
  const handleKeyboardNavigation = useCallback((e: KeyboardEvent) => {
    if (!modalRef.current || disabled) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button:not([disabled]):not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable="true"]:not([tabindex="-1"]), summary:not([disabled]):not([tabindex="-1"]), iframe:not([tabindex="-1"]), object:not([tabindex="-1"]), embed:not([tabindex="-1"]), audio[controls]:not([tabindex="-1"]), video[controls]:not([tabindex="-1"]), details:not([tabindex="-1"]), [role="button"]:not([disabled]):not([tabindex="-1"]), [role="link"]:not([tabindex="-1"]), [role="menuitem"]:not([disabled]):not([tabindex="-1"]), [role="tab"]:not([disabled]):not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    const currentIndex = Array.from(focusableElements).indexOf(document.activeElement as HTMLElement);

    // Tab key - focus trap
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    
    // Arrow keys - enhanced navigation within modal
    else if (e.key === 'ArrowDown' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      const nextIndex = currentIndex < focusableElements.length - 1 ? currentIndex + 1 : 0;
      (focusableElements[nextIndex] as HTMLElement).focus();
    }
    
    else if (e.key === 'ArrowUp' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : focusableElements.length - 1;
      (focusableElements[prevIndex] as HTMLElement).focus();
    }
    
    // Home/End keys - jump to first/last focusable element
    else if (e.key === 'Home' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      firstElement.focus();
    }
    
    else if (e.key === 'End' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
      e.preventDefault();
      lastElement.focus();
    }
  }, [disabled]);

  // Escape key handler
  const handleEscapeKey = useCallback((e: KeyboardEvent) => {
    if (closeOnEscape && e.key === 'Escape' && !disabled) {
      onClose();
    }
  }, [closeOnEscape, onClose, disabled]);

  // Backdrop click handler
  const handleBackdropClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget && !disabled) {
      onClose();
    }
  }, [closeOnBackdropClick, onClose, disabled]);

  // Focus management on open/close
  useEffect(() => {
    if (isOpen) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus first focusable element or modal itself
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (modalRef.current && !disabled) {
            const firstFocusable = modalRef.current.querySelector(
              'button:not([disabled]):not([tabindex="-1"]), [href]:not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable="true"]:not([tabindex="-1"]), summary:not([disabled]):not([tabindex="-1"]), iframe:not([tabindex="-1"]), object:not([tabindex="-1"]), embed:not([tabindex="-1"]), audio[controls]:not([tabindex="-1"]), video[controls]:not([tabindex="-1"]), details:not([tabindex="-1"]), [role="button"]:not([disabled]):not([tabindex="-1"]), [role="link"]:not([tabindex="-1"]), [role="menuitem"]:not([disabled]):not([tabindex="-1"]), [role="tab"]:not([disabled]):not([tabindex="-1"])'
            ) as HTMLElement;
            
            if (firstFocusable) {
              firstFocusable.focus();
            } else {
              modalRef.current.focus();
            }
          }
        });
      });

      // Add event listeners
      document.addEventListener('keydown', handleKeyboardNavigation);
      document.addEventListener('keydown', handleEscapeKey);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      return () => {
        // Cleanup
        document.removeEventListener('keydown', handleKeyboardNavigation);
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = '';

        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, handleKeyboardNavigation, handleEscapeKey, disabled]);

  if (!isOpen) return null;

  // Build class names
  const backdropClasses = [
    'modal-backdrop',
    disabled && 'modal-backdrop--disabled'
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'modal-container',
    `modal-container--${size}`,
    disabled && 'modal-container--disabled',
    error && 'modal-container--error',
    className
  ].filter(Boolean).join(' ');

  const headerClasses = [
    'modal-header',
    error && 'modal-header--error'
  ].filter(Boolean).join(' ');

  const titleClasses = [
    'modal-title',
    error && 'modal-title--error'
  ].filter(Boolean).join(' ');

  const contentClasses = [
    'modal-content',
    size === 'small' && 'modal-content--small',
    size === 'large' && 'modal-content--large'
  ].filter(Boolean).join(' ');

  const iconCircleClasses = [
    'modal-icon-circle',
    error && 'modal-icon-circle--error'
  ].filter(Boolean).join(' ');

  // Render content based on variant
  const renderContent = () => {
    switch (variant) {
      case 'with-file':
        return (
          <>
            <div className="modal-content-section">
              <p className="modal-selected-label">
                Selected object (body2)
              </p>
              {fileInfo && (
                <div className="modal-file-item">
                  {fileInfo.icon || <Icon name="document" size={24} className="modal-file-icon" />}
                  <h5 className="modal-file-title">
                    {fileInfo.title || 'Object title (h5)'}
                  </h5>
                </div>
              )}
            </div>
            {children}
          </>
        );
      
      case 'with-summary':
        return (
          <>
            <div className="modal-summary-section">
              <p className="modal-summary-text">
                {summary || '"Summary information would be displayed here" (body 2)'}
              </p>
            </div>
            {children}
          </>
        );
      
      case 'standard':
      default:
        return (
          <>
            {typeof children === 'string' ? (
              <p className="modal-body-text">
                {children || 'Important dialog information would be displayed here (body2)'}
              </p>
            ) : (
              children || (
                <p className="modal-body-text">
                  Important dialog information would be displayed here (body2)
                </p>
              )
            )}
          </>
        );
    }
  };

  const modalContent = (
    <div 
      className={backdropClasses}
      onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className={containerClasses}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
        aria-describedby={ariaDescribedBy}
        aria-live={ariaLive}
      >
        {/* Header */}
        <div className={headerClasses}>
          <div className="modal-header-left">
            {showIcon && (
              <div className="modal-icon">
                <div className={iconCircleClasses} />
              </div>
            )}
            <h2 id={titleId} className={titleClasses}>
              {title || 'Title {h2}'}
            </h2>
          </div>
          <button
            className="modal-close-button"
            onClick={onClose}
            disabled={disabled}
            aria-label="Close modal"
          >
            <svg 
              className="modal-close-icon"
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
        </div>

        {/* Content */}
        <div className={contentClasses}>
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={disabled}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="primary"
            onClick={onAction || onClose}
            disabled={disabled}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
};

export default Modal;