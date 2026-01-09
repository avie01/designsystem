import React, { useRef, useEffect, useState } from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
import Icon from '../Icon/Icon';
import Checkbox from '../Checkbox/Checkbox';
import './PopupMenu.css';

export interface PopupMenuItem {
  id: string;
  label: string;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
  action?: () => void;
  subItems?: PopupMenuItem[];
}

export interface PopupMenuProps {
  items: PopupMenuItem[];
  open: boolean;
  onClose: () => void;
  anchorEl?: HTMLElement | null;
  position?: { top: number; left: number };
  align?: 'left' | 'right' | 'center';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  maxHeight?: number;
  minWidth?: number;
  showIcons?: boolean;
  multiSelect?: boolean;
  selectedItems?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({
  items,
  open,
  onClose,
  anchorEl,
  position,
  align = 'left',
  className = '',
  size = 'md',
  maxHeight = 400,
  minWidth = 200,
  showIcons = true,
  multiSelect = false,
  selectedItems: controlledSelectedItems,
  onSelectionChange,
}) => {
  const { colors } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const justOpenedRef = useRef<boolean>(false);
  const [internalSelectedItems, setInternalSelectedItems] = useState<string[]>([]);
  
  // Use controlled or internal state for selected items
  const selectedItems = controlledSelectedItems !== undefined ? controlledSelectedItems : internalSelectedItems;
  
  const handleSelectionChange = (newSelectedItems: string[]) => {
    if (controlledSelectedItems === undefined) {
      setInternalSelectedItems(newSelectedItems);
    }
    onSelectionChange?.(newSelectedItems);
  };

  useEffect(() => {
    if (open) {
      // Mark that menu was just opened to ignore the opening click
      justOpenedRef.current = true;
      const timeoutId = setTimeout(() => {
        justOpenedRef.current = false;
      }, 100);
      
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [open]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .popup-menu {
        background-color: ${colors.paper} !important;
        border: 2px solid ${colors.primaryMain} !important;
        box-shadow: ${ODLTheme.shadows.lg} !important;
      }
      .popup-menu-item:hover:not(.popup-menu-item--disabled) {
        background-color: ${colors.grey400} !important;
      }
      .popup-menu-item:focus:not(.popup-menu-item--disabled) {
        background-color: ${colors.grey400} !important;
        outline: none !important;
      }
      .popup-menu-item:active:not(.popup-menu-item--disabled) {
        background-color: ${colors.grey500} !important;
        border-bottom: 1px solid ${colors.grey500} !important;
        outline: none !important;
      }
      .popup-menu-item:not(:last-child) {
        border-bottom: 1px solid ${colors.grey500} !important;
      }
      .popup-menu-item--disabled {
        color: ${colors.textDisabled} !important;
      }
      .popup-menu-divider {
        border-color: ${colors.grey500} !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;

    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ignore clicks that happen right after opening (likely the click that opened it)
      if (justOpenedRef.current) {
        return;
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (anchorEl && anchorEl.contains(event.target as Node)) {
          return;
        }
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      // Use a longer delay for Docs page compatibility
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('keydown', handleEscape);
      }, 10);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
        document.removeEventListener('keydown', handleEscape);
      };
    }

    return () => {};
  }, [open, onClose, anchorEl]);

  useEffect(() => {
    if (open && menuRef.current) {
      const updatePosition = () => {
        if (!menuRef.current) return;

        if (position) {
          menuRef.current.style.top = `${position.top}px`;
          menuRef.current.style.left = `${position.left}px`;
        } else if (anchorEl) {
          const rect = anchorEl.getBoundingClientRect();
          const menuRect = menuRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;

          let top = rect.bottom + 8;
          let left = rect.left;

          if (top + menuRect.height > viewportHeight && rect.top - menuRect.height - 8 > 0) {
            top = rect.top - menuRect.height - 8;
          }

          if (align === 'right') {
            left = rect.right - menuRect.width;
          } else if (align === 'center') {
            left = rect.left + (rect.width - menuRect.width) / 2;
          }

          if (left + menuRect.width > viewportWidth) {
            left = viewportWidth - menuRect.width - 8;
          }
          if (left < 8) {
            left = 8;
          }

          menuRef.current.style.top = `${top}px`;
          menuRef.current.style.left = `${left}px`;
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);

      const firstFocusable = menuRef.current.querySelector('[tabindex="0"]:not([disabled])') as HTMLElement;
      firstFocusable?.focus();

      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition, true);
      };
    }
  }, [open, anchorEl, position, align]);

  const handleItemClick = (item: PopupMenuItem) => {
    if (item.disabled) return;
    
    if (multiSelect) {
      // Toggle selection
      const isSelected = selectedItems.includes(item.id);
      const newSelectedItems = isSelected
        ? selectedItems.filter(id => id !== item.id)
        : [...selectedItems, item.id];
      handleSelectionChange(newSelectedItems);
      
      // Still call action if provided
      if (item.action) {
        item.action();
      }
    } else {
      // Single select mode - close menu after action
      if (item.action) {
        item.action();
      }
      if (!item.subItems || item.subItems.length === 0) {
        onClose();
      }
    }
  };
  
  const handleCheckboxChange = (item: PopupMenuItem, checked: boolean) => {
    if (item.disabled) return;
    
    const newSelectedItems = checked
      ? [...selectedItems, item.id]
      : selectedItems.filter(id => id !== item.id);
    handleSelectionChange(newSelectedItems);
    
    // Still call action if provided
    if (item.action) {
      item.action();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, item: PopupMenuItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleItemClick(item);
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'popup-menu--sm';
      case 'lg':
        return 'popup-menu--lg';
      default:
        return 'popup-menu--md';
    }
  };

  const getItemStyles = (): React.CSSProperties => {
    const paddingMap = {
      sm: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
      md: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[4]}`,
      lg: `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
    };

    const heightMap = {
      sm: undefined,
      md: '44px',
      lg: undefined,
    };

    return {
      padding: paddingMap[size],
      minHeight: heightMap[size],
      fontSize: size === 'sm' ? ODLTheme.typography.fontSize.xs : ODLTheme.typography.fontSize.base,
      fontFamily: ODLTheme.typography.fontFamily.sans,
      fontWeight: ODLTheme.typography.fontWeight.normal,
      lineHeight: size === 'sm' ? '1.4' : '1.5',
      color: colors.textPrimary,
      backgroundColor: 'transparent',
      border: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      transition: ODLTheme.transitions.base,
      display: 'flex',
      alignItems: 'center',
      gap: ODLTheme.spacing[2],
    };
  };

  if (!open) return null;

  const menuClasses = [
    'popup-menu',
    getSizeClasses(),
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={menuRef}
      className={menuClasses}
      role="menu"
      aria-orientation="vertical"
      style={{
        position: 'fixed',
        zIndex: 1000,
        minWidth: `${minWidth}px`,
        maxHeight: `${maxHeight}px`,
        overflowY: 'auto',
        borderRadius: ODLTheme.borders.radius.md,
        border: `1px solid ${colors.primaryMain}`,
        backgroundColor: colors.paper,
        boxShadow: ODLTheme.shadows.lg,
      }}
    >
      {items.map((item, index) => {
        if (item.divider) {
          return null;
        }

        const isSelected = selectedItems.includes(item.id);
        const checkboxSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

        return (
          <button
            key={item.id}
            className={`popup-menu-item ${item.disabled ? 'popup-menu-item--disabled' : ''}`}
            onClick={() => handleItemClick(item)}
            onKeyDown={(e) => handleKeyDown(e, item)}
            disabled={item.disabled}
            role="menuitem"
            tabIndex={item.disabled ? -1 : 0}
            aria-disabled={item.disabled}
            style={getItemStyles()}
          >
            {multiSelect && (
              <span 
                className="popup-menu-item-checkbox"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={isSelected}
                  disabled={item.disabled}
                  size={checkboxSize}
                  onChange={(checked) => {
                    handleCheckboxChange(item, checked);
                  }}
                  aria-label={`Select ${item.label}`}
                />
              </span>
            )}
            {showIcons && item.icon && (
              <span className="popup-menu-item-icon">
                {typeof item.icon === 'string' ? (
                  <Icon name={item.icon} size={size === 'sm' ? 16 : 20} />
                ) : (
                  item.icon
                )}
              </span>
            )}
            <span className="popup-menu-item-label">{item.label}</span>
            {showIcons && item.subItems && item.subItems.length > 0 && (
              <Icon 
                name="chevron-right" 
                size={size === 'sm' ? 16 : 20} 
                style={{ marginLeft: 'auto' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default PopupMenu;