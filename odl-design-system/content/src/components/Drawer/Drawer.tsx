import React, { useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../Icon/Icon';
import './Drawer.css';

export type DrawerPosition = 'top' | 'right' | 'bottom' | 'left';
export type DrawerSize = 'small' | 'medium' | 'large' | 'extra-large';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** Callback when drawer should close */
  onClose: () => void;
  /** Position of the drawer */
  position?: DrawerPosition;
  /** Component size */
  size?: DrawerSize;
  /** Whether the drawer is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean | string;
  /** Whether to show overlay backdrop */
  overlay?: boolean;
  /** Drawer title */
  title?: string;
  /** Heading level for title (1-6) for proper document hierarchy */
  titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Drawer content */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Whether drawer can be closed with escape key */
  closeOnEscape?: boolean;
  /** Whether drawer can be closed by clicking backdrop */
  closeOnBackdropClick?: boolean;
  /** Custom width for left/right drawers. Use 'half' for 50% of screen width */
  width?: string | number | 'half';
  /** Custom height for top/bottom drawers. Use 'half' for 50% of screen height */
  height?: string | number | 'half';
  /** Footer content with actions */
  footer?: React.ReactNode;
  /** Accessible label for the drawer */
  'aria-label'?: string;
  /** ARIA attributes */
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  position = 'right',
  size = 'medium',
  disabled = false,
  error = false,
  overlay = true,
  title,
  titleLevel = 2,
  children,
  className,
  closeOnEscape = true,
  closeOnBackdropClick = true,
  width = '400px',
  height = '300px',
  footer,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useRef(`drawer-title-${Math.random().toString(36).substr(2, 9)}`).current;
  const errorId = useRef(`drawer-error-${Math.random().toString(36).substr(2, 9)}`).current;

  // Focus trap management
  const handleTabKey = useCallback((e: KeyboardEvent) => {
    if (!drawerRef.current || disabled) return;

    const focusableElements = drawerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], audio[controls], video[controls]'
    );
    
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
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
    if (closeOnBackdropClick && overlay && e.target === e.currentTarget && !disabled) {
      onClose();
    }
  }, [closeOnBackdropClick, overlay, onClose, disabled]);

  // Focus management on open/close
  useEffect(() => {
    if (isOpen && !disabled) {
      // Store current active element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus first focusable element or drawer itself
      // Use double requestAnimationFrame to ensure animation completes before focusing
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (drawerRef.current) {
            const firstFocusable = drawerRef.current.querySelector(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"], audio[controls], video[controls]'
            ) as HTMLElement;

            if (firstFocusable) {
              firstFocusable.focus();
            } else {
              drawerRef.current.focus();
            }
          }
        });
      });

      // Add event listeners
      document.addEventListener('keydown', handleTabKey as any);
      document.addEventListener('keydown', handleEscapeKey as any);

      // Prevent body scroll when overlay is enabled
      if (overlay) {
        document.body.style.overflow = 'hidden';
      }

      return () => {
        // Cleanup
        document.removeEventListener('keydown', handleTabKey as any);
        document.removeEventListener('keydown', handleEscapeKey as any);
        if (overlay) {
          document.body.style.overflow = '';
        }

        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, overlay, disabled, handleTabKey, handleEscapeKey]);

  if (!isOpen || disabled) return null;

  // Calculate drawer size styles
  const getSizeStyles = (): React.CSSProperties => {
    const isHorizontal = position === 'left' || position === 'right';
    
    let sizeValue: string | number;
    if (isHorizontal) {
      if (width === 'half') {
        sizeValue = '50vw';
      } else {
        sizeValue = width;
      }
      return { width: sizeValue };
    } else {
      if (height === 'half') {
        sizeValue = '50vh';
      } else {
        sizeValue = height;
      }
      return { height: sizeValue };
    }
  };

  // Build CSS classes using BEM methodology
  const drawerClasses = [
    'drawer',
    `drawer--${position}`,
    `drawer--${size}`,
    overlay ? 'drawer--overlay' : 'drawer--no-overlay',
    error && 'drawer--error',
    className
  ].filter(Boolean).join(' ');

  const drawerContent = (
    <>
      {/* Overlay backdrop (conditional) */}
      {overlay && (
        <div 
          className="drawer__backdrop"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />
      )}
      
      {/* Drawer panel */}
      <section
        ref={drawerRef}
        className={drawerClasses}
        style={getSizeStyles()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (title ? titleId : undefined)}
        aria-describedby={[ariaDescribedBy, typeof error === 'string' && errorId].filter(Boolean).join(' ')}
        tabIndex={0}
      >
        {/* Header - always present to contain close button */}
        <header className="drawer__header">
          {title && (() => {
            const HeadingElement = `h${titleLevel}` as keyof JSX.IntrinsicElements;
            return (
              <HeadingElement id={titleId} className="drawer__title">
                {title}
              </HeadingElement>
            );
          })()}
          <button
            onClick={onClose}
            className="drawer__close-button"
            aria-label="Close drawer"
            type="button"
          >
            <Icon 
              name="close" 
              size={size === 'small' ? 16 : size === 'large' || size === 'extra-large' ? 24 : 20} 
            />
          </button>
        </header>

        {/* Content */}
        <main className={title ? 'drawer__content' : 'drawer__content drawer__content--no-title'}>
          {typeof error === 'string' && (
            <div
              id={errorId}
              role="alert"
              aria-live="polite"
              className="drawer__error-message"
            >
              {error}
            </div>
          )}
          {children}
        </main>

        {/* Footer */}
        {footer && (
          <footer className="drawer__footer">
            {footer}
          </footer>
        )}
      </section>
    </>
  );

  // Use portal to render drawer at document body level
  return createPortal(drawerContent, document.body);
};

export default Drawer;