import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Icon/Icon';
import List, { ListItem } from '../List/List';
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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Handle legacy API compatibility
  const actualLabel = label || labelText;
  const actualError = error || invalid || false;
  const actualErrorMessage = errorMessage || invalidText;

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

  return (
    <div className="dropdown-wrapper" ref={dropdownRef}>
      {actualLabel && !hideLabel && (
        <label 
          htmlFor={dropdownId} 
          className="dropdown-label"
        >
          {actualLabel}
          {required && <span className="dropdown-label--required"> *</span>}
        </label>
      )}
      
      <div className="dropdown-field-wrapper">
        {icon && (
          <div className="dropdown-icon dropdown-icon--left">
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
        >
          <span className={`dropdown-value ${!selectedOption ? 'dropdown-placeholder' : ''}`}>
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
          >
            <Icon name="close" size={16} />
          </button>
        )}
        
        {actualError && (
          <div className="dropdown-icon dropdown-icon--right dropdown-error-icon">
            <Icon name="warning" size={16} />
          </div>
        )}
        
        {!actualError && !clearable && (
          <div className={`dropdown-icon dropdown-icon--right dropdown-chevron ${isOpen ? 'dropdown-chevron--open' : ''}`}>
            <Icon name="chevron-down" size={16} />
          </div>
        )}

        {/* Dropdown menu */}
        {isOpen && (
          <div className="dropdown-content" role="listbox">
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
                />
              </div>
            )}
            
            <div className="dropdown-options" id={`${dropdownId}-listbox`} role="listbox">
              {filteredOptions.length === 0 ? (
                <div className="dropdown-no-options" role="status" aria-live="polite">
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
        <div id={`${dropdownId}-error`} className="dropdown-error-message">
          {actualErrorMessage}
        </div>
      )}
      
      {helperText && !actualError && (
        <div id={`${dropdownId}-helper`} className="dropdown-helper-text">
          {helperText}
        </div>
      )}
    </div>
  );
};

export default Dropdown;