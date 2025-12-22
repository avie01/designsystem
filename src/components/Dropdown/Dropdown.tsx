import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import List, { ListItem } from '../List/List';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';
import './Dropdown.css';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  /** Options for the dropdown */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the dropdown is required */
  required?: boolean;
  /** Dropdown name */
  name?: string;
  /** Dropdown id */
  id?: string;
  /** Additional CSS classes */
  className?: string;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Label for the dropdown */
  label?: string;
  /** Helper text */
  helperText?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Hide label visually */
  hideLabel?: boolean;
  /** Icon element to display before dropdown */
  icon?: React.ReactNode;
  /** Allow searching/filtering options */
  searchable?: boolean;
  /** Allow clearing selection */
  clearable?: boolean;
  
  // Legacy API compatibility (Carbon Design System style)
  /** Legacy: Label text (alias for label) */
  labelText?: string;
  /** Legacy: Invalid state (alias for error) */
  invalid?: boolean;
  /** Legacy: Invalid text (alias for errorMessage) */
  invalidText?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  name,
  id,
  className = '',
  error = false,
  errorMessage,
  label,
  helperText,
  size = 'md',
  hideLabel = false,
  icon,
  searchable = false,
  clearable = false,
  // Legacy props
  labelText,
  invalid,
  invalidText,
}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Handle legacy API compatibility
  const actualLabel = label || labelText;
  const actualError = error || invalid || false;
  const actualErrorMessage = errorMessage || invalidText;

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-dropdown:hover:not(.custom-dropdown--disabled) {
        background-color: ${colors.grey400} !important;
        border-bottom: none !important;
        border: 2px solid ${colors.primaryMain} !important;
      }
      .custom-dropdown:focus:not(.custom-dropdown--disabled),
      .custom-dropdown--open:not(.custom-dropdown--disabled) {
        background-color: ${colors.grey400} !important;
        border: 1px solid transparent !important;
        box-shadow: inset 0 0 0 1px ${colors.primaryMain} !important;
        outline: none !important;
      }
      .custom-dropdown--error {
        border-bottom: ${ODLTheme.borders.width.base} solid ${colors.errorMain} !important;
      }
      .custom-dropdown--error:focus,
      .custom-dropdown--error.custom-dropdown--open {
        background-color: ${colors.grey400} !important;
        border: ${ODLTheme.borders.width.base} solid transparent !important;
        box-shadow: inset 0 0 0 ${ODLTheme.borders.width.base} ${colors.errorMain} !important;
        outline: none !important;
      }
      .dropdown-content {
        background-color: ${colors.paper} !important;
        border-color: ${colors.primaryMain} !important;
      }
      .dropdown-search-input {
        background-color: ${colors.inputBackground} !important;
        border-bottom-color: ${colors.inputBorder} !important;
      }
      .dropdown-search-input:focus {
        border-bottom-color: ${colors.primaryMain} !important;
      }
      .dropdown-list .list-item:hover:not(.list-item--disabled) {
        background-color: ${colors.grey300} !important;
      }
      .dropdown-list .list-item--selected {
        background-color: ${colors.info} !important;
      }
      .dropdown-list .list-item--selected:hover {
        background-color: ${colors.primaryMain} !important;
        color: ${colors.textInverse} !important;
      }
      .dropdown-list::-webkit-scrollbar-thumb {
        background: ${colors.grey600} !important;
      }
      .dropdown-list::-webkit-scrollbar-thumb:hover {
        background: ${colors.grey700} !important;
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

  // Get the selected option
  const selectedOption = options.find(opt => opt.value === value);

  // Filter options based on search term
  const filteredOptions = searchable && searchTerm
    ? options.filter(opt => 
        opt.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Convert DropdownOptions to ListItems
  const convertToListItems = (opts: DropdownOption[]): ListItem[] => {
    return opts.map(opt => ({
      id: opt.value,
      label: opt.label,
      disabled: opt.disabled,
      selected: opt.value === value,
      icon: opt.icon // Pass through string or React component icons
    }));
  };

  const listItems = convertToListItems(filteredOptions);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset focused index when options change
  useEffect(() => {
    if (isOpen && focusedIndex >= filteredOptions.length) {
      setFocusedIndex(filteredOptions.length - 1);
    }
  }, [searchTerm, isOpen, focusedIndex, filteredOptions.length]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth'
      });
    }
  }, [focusedIndex]);

  // Handle option selection
  const handleSelect = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
    setSearchTerm('');
    setFocusedIndex(-1);
    // Return focus to button
    setTimeout(() => buttonRef.current?.focus(), 0);
  };

  // Handle list item click
  const handleListItemClick = (item: ListItem) => {
    if (!item.disabled) {
      handleSelect(item.id);
    }
  };

  // Handle clear button
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      onChange('');
    }
    setFocusedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          // Focus first option or search input
          if (searchable) {
            setTimeout(() => inputRef.current?.focus(), 0);
          } else {
            setFocusedIndex(0);
          }
        } else if (!searchable) {
          setFocusedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(filteredOptions.length - 1);
        } else if (!searchable) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;

      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          if (searchable) {
            setTimeout(() => inputRef.current?.focus(), 0);
          } else {
            setFocusedIndex(0);
          }
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          const option = filteredOptions[focusedIndex];
          if (!option.disabled) {
            handleSelect(option.value);
          }
        }
        break;

      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
          setSearchTerm('');
          setFocusedIndex(-1);
        }
        break;

      case 'Home':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(0);
        }
        break;

      case 'End':
        if (isOpen) {
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
        }
        break;

      case 'Tab':
        // Let Tab close the dropdown
        if (isOpen) {
          setIsOpen(false);
          setSearchTerm('');
          setFocusedIndex(-1);
        }
        break;

      default:
        // For single character keys, open dropdown and focus search if searchable
        if (!isOpen && searchable && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          setIsOpen(true);
          setSearchTerm(e.key);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.focus();
              inputRef.current.value = e.key;
              inputRef.current.setSelectionRange(1, 1);
            }
          }, 0);
        }
        break;
    }
  };

  // Handle search input keyboard navigation
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;

      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          const option = filteredOptions[focusedIndex];
          if (!option.disabled) {
            handleSelect(option.value);
          }
        }
        break;

      case 'Escape':
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        setSearchTerm('');
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;

      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setFocusedIndex(filteredOptions.length - 1);
        break;
    }
  };

  // Custom styling classes
  const sizeClasses = {
    sm: 'dropdown-size--sm',
    md: 'dropdown-size--md',
    lg: 'dropdown-size--lg'
  };

  const dropdownClasses = [
    'custom-dropdown',
    sizeClasses[size],
    actualError ? 'custom-dropdown--error' : '',
    disabled ? 'custom-dropdown--disabled' : '',
    isOpen ? 'custom-dropdown--open' : '',
    icon ? 'custom-dropdown--with-icon' : '',
    ((clearable && value) || actualError || isOpen) ? 'custom-dropdown--with-right-elements' : '',
    className
  ].filter(Boolean).join(' ');

  const dropdownId = id || `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  // Dynamic styles using theme colors
  const getDropdownStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      width: '100%',
      padding: size === 'sm' 
        ? `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`
        : size === 'lg'
        ? `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`
        : `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}`,
      border: `${ODLTheme.borders.width.base} solid transparent`,
      borderBottom: `1px solid ${colors.inputBorder}`,
      backgroundColor: colors.inputBackground,
      color: disabled ? colors.textDisabled : colors.textPrimary,
      fontSize: size === 'sm' 
        ? ODLTheme.typography.fontSize.xs
        : ODLTheme.typography.fontSize.base,
      fontWeight: ODLTheme.typography.fontWeight.normal,
      lineHeight: size === 'sm'
        ? ODLTheme.typography.lineHeight.inputSm
        : ODLTheme.typography.lineHeight.inputBase,
      fontFamily: ODLTheme.typography.fontFamily.sans,
      outline: 'none',
      transition: ODLTheme.transitions.input,
      borderRadius: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
    };

    if (icon) {
      baseStyles.paddingLeft = ODLTheme.spacing[10];
    }
    if ((clearable && value) || actualError || isOpen) {
      baseStyles.paddingRight = ODLTheme.spacing[10];
    }
    if (size === 'lg') {
      baseStyles.minHeight = ODLTheme.spacing[11];
      baseStyles.height = ODLTheme.spacing[11];
    } else if (size === 'sm') {
      baseStyles.minHeight = ODLTheme.spacing[8];
    } else {
      baseStyles.minHeight = ODLTheme.spacing[10];
    }
    if (actualError) {
      baseStyles.border = `${ODLTheme.borders.width.base} solid ${colors.errorMain}`;
      baseStyles.borderBottom = `${ODLTheme.borders.width.base} solid ${colors.errorMain}`;
      baseStyles.backgroundColor = colors.grey400;
    }
    if (disabled) {
      baseStyles.borderBottom = `1px solid transparent`;
      baseStyles.cursor = 'not-allowed';
    }

    return baseStyles;
  };

  const labelStyles: React.CSSProperties = {
    display: 'block',
    fontSize: ODLTheme.typography.fontSize.base,
    fontWeight: ODLTheme.typography.fontWeight.semibold,
    lineHeight: ODLTheme.typography.lineHeight.inputBase,
    color: colors.primaryNight,
    marginBottom: ODLTheme.spacing[2],
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const helperTextStyles: React.CSSProperties = {
    marginTop: 0,
    marginBottom: ODLTheme.spacing[3],
    fontSize: ODLTheme.typography.fontSize.base,
    lineHeight: 1.5,
    color: colors.primaryTwilight,
    fontWeight: ODLTheme.typography.fontWeight.normal,
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const errorMessageStyles: React.CSSProperties = {
    marginTop: ODLTheme.spacing[1],
    fontSize: ODLTheme.typography.fontSize.xs,
    lineHeight: ODLTheme.typography.lineHeight.inputSm,
    color: colors.errorMain,
    fontWeight: ODLTheme.typography.fontWeight.normal,
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  const iconStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const leftIconStyles: React.CSSProperties = {
    ...iconStyles,
    left: ODLTheme.spacing[3],
    color: colors.primaryTwilight,
  };

  const rightIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: ODLTheme.spacing[3],
    color: colors.primaryTwilight,
  };

  const errorIconStyles: React.CSSProperties = {
    ...iconStyles,
    right: ODLTheme.spacing[3],
    color: colors.errorMain,
  };

  const placeholderStyles: React.CSSProperties = {
    color: colors.textMuted,
  };

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      {actualLabel && !hideLabel && (
        <label 
          htmlFor={dropdownId} 
          className="dropdown-label"
          style={labelStyles}
        >
          {actualLabel}
          {required && <span className="dropdown-label--required" style={{ color: colors.errorMain }}> *</span>}
        </label>
      )}
      
      {helperText && !actualError && actualLabel && !hideLabel && (
        <div id={`${dropdownId}-helper`} className="dropdown-helper-text" style={helperTextStyles}>
          {helperText}
        </div>
      )}
      
      <div className="dropdown-field-wrapper">
        {icon && (
          <div className="dropdown-icon dropdown-icon--left" style={leftIconStyles}>
            {icon}
          </div>
        )}
        
        <button
          ref={buttonRef}
          type="button"
          id={dropdownId}
          name={name}
          disabled={disabled}
          className={dropdownClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={actualError}
          aria-activedescendant={isOpen && focusedIndex >= 0 ? `${dropdownId}-option-${focusedIndex}` : undefined}
          aria-describedby={
            [
              actualErrorMessage ? `${dropdownId}-error` : null,
              helperText ? `${dropdownId}-helper` : null
            ].filter(Boolean).join(' ') || undefined
          }
          style={getDropdownStyles()}
        >
          <span 
            className={`dropdown-value ${!selectedOption ? 'dropdown-placeholder' : ''}`}
            style={!selectedOption ? placeholderStyles : undefined}
          >
            {selectedOption?.icon && (
              <span className="dropdown-value-icon">
                {typeof selectedOption.icon === 'string' ? (
                  <Icon name={selectedOption.icon} size={16} />
                ) : (
                  selectedOption.icon
                )}
              </span>
            )}
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </button>

        {/* Icons on the right */}
        {clearable && value && !actualError && !isOpen && (
          <button
            className="dropdown-icon dropdown-icon--right dropdown-clear-button"
            onClick={handleClear}
            aria-label="Clear selection"
            tabIndex={-1}
            style={rightIconStyles}
          >
            <Icon name="close" size={16} />
          </button>
        )}
        
        {actualError && (
          <div className="dropdown-icon dropdown-icon--right dropdown-error-icon" style={errorIconStyles}>
            <Icon name="warning" size={16} />
          </div>
        )}
        
        {!actualError && !clearable && (
          <div 
            className={`dropdown-icon dropdown-icon--right dropdown-chevron ${isOpen ? 'dropdown-chevron--open' : ''}`}
            style={rightIconStyles}
          >
            <Icon name="chevron-down" size={16} />
          </div>
        )}

        {/* Dropdown menu */}
        {isOpen && (
          <div 
            className="dropdown-content" 
            role="listbox"
            style={{
              backgroundColor: colors.paper,
              borderColor: colors.primaryMain,
            }}
          >
            {searchable && (
              <div className="dropdown-search">
                <input
                  ref={inputRef}
                  type="text"
                  className="dropdown-search-input"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Search options"
                  aria-autocomplete="list"
                  aria-controls={`${dropdownId}-listbox`}
                  aria-activedescendant={focusedIndex >= 0 ? `${dropdownId}-option-${focusedIndex}` : undefined}
                  autoFocus
                  style={{
                    backgroundColor: colors.inputBackground,
                    borderBottomColor: colors.inputBorder,
                    color: colors.textPrimary,
                    fontFamily: ODLTheme.typography.fontFamily.sans,
                    fontSize: ODLTheme.typography.fontSize.base,
                  }}
                />
              </div>
            )}
            
            <div className="dropdown-options" id={`${dropdownId}-listbox`} role="listbox">
              {filteredOptions.length === 0 ? (
                <div 
                  className="dropdown-no-options" 
                  role="status" 
                  aria-live="polite"
                  style={{
                    color: colors.primaryTwilight,
                    fontFamily: ODLTheme.typography.fontFamily.sans,
                    fontSize: ODLTheme.typography.fontSize.base,
                  }}
                >
                  No options found
                </div>
              ) : (
                <List
                  items={listItems}
                  size={size}
                  onItemClick={handleListItemClick}
                  selectable={true}
                  multiSelect={false}
                  hierarchical={false}
                  showExpandIcons={false}
                  className="dropdown-list"
                />
              )}
            </div>
          </div>
        )}
      </div>
      
      {actualErrorMessage && actualError && (
        <div id={`${dropdownId}-error`} className="dropdown-error-message" style={errorMessageStyles}>
          {actualErrorMessage}
        </div>
      )}
    </div>
  );
};

export default Dropdown;