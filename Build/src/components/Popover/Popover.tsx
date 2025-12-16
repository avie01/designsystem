import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';

export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  className?: string;
  onClose?: () => void;
}

const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  position = 'bottom',
  align = 'start',
  className = '',
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (isOpen && onClose) {
      onClose();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      popoverRef.current && 
      !popoverRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      if (onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      
      // Calculate position
      if (triggerRef.current && popoverRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect();
        const popoverRect = popoverRef.current.getBoundingClientRect();
        let top = 0;
        let left = 0;

        // Position calculation
        switch (position) {
          case 'top':
            top = triggerRect.top - popoverRect.height - 8;
            break;
          case 'bottom':
            top = triggerRect.bottom + 8;
            break;
          case 'left':
            left = triggerRect.left - popoverRect.width - 8;
            top = triggerRect.top;
            break;
          case 'right':
            left = triggerRect.right + 16;
            top = triggerRect.top;
            break;
        }

        // Align calculation
        if (position === 'top' || position === 'bottom') {
          switch (align) {
            case 'start':
              left = triggerRect.left;
              break;
            case 'center':
              left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
              break;
            case 'end':
              left = triggerRect.right - popoverRect.width;
              break;
          }
        } else {
          switch (align) {
            case 'start':
              top = triggerRect.top;
              break;
            case 'center':
              top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
              break;
            case 'end':
              top = triggerRect.bottom - popoverRect.height;
              break;
          }
        }

        // Boundary checks
        const padding = 8;
        const rightPadding = 48; // More padding from right edge for close button
        if (left < padding) left = padding;
        if (top < padding) top = padding;
        if (left + popoverRect.width > window.innerWidth - rightPadding) {
          left = window.innerWidth - popoverRect.width - rightPadding;
        }
        if (top + popoverRect.height > window.innerHeight - padding) {
          top = window.innerHeight - popoverRect.height - padding;
        }

        setPopoverPosition({ top, left });
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, position, align, onClose]);

  return (
    <>
      <div 
        ref={triggerRef} 
        onClick={handleToggle}
        className="w-full"
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div
          ref={popoverRef}
          className={`fixed z-50 bg-white rounded shadow-xl border border-blue-500 p-4 ${className}`}
          style={{
            top: `${popoverPosition.top}px`,
            left: `${popoverPosition.left}px`,
            width: '320px'
          }}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => {
              setIsOpen(false);
              if (onClose) onClose();
            }}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            aria-label="Close popover"
          >
            <Icon name="close" size={16} />
          </button>
          {content}
        </div>
      )}
    </>
  );
};

export default Popover;