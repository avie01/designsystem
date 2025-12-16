import React, { useState } from 'react';
import Icon from '../components/Icon/Icon';
import Button from '../components/Button/Button';
import Dropdown from '../components/Dropdown/Dropdown';
import type { DropdownOption } from '../components/Dropdown/Dropdown';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import DemoComparison from '../components/DemoComparison/DemoComparison';
import { ODLThemeProvider } from '../theme/ODLThemeProvider';
import { Select, MenuItem, FormControl } from '@mui/material';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

// MUI Select Component with ODL Styling
interface MUISelectProps {
  label: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  size?: 'sm' | 'md' | 'lg';
  searchable?: boolean;
  clearable?: boolean;
}

const MUISelect: React.FC<MUISelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  helperText,
  errorMessage,
  required = false,
  disabled = false,
  error = false,
  size = 'md'
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return { height: '32px', fontSize: '14px' };
      case 'lg': return { height: '48px', fontSize: '16px' };
      default: return { height: '40px', fontSize: '14px' };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <div style={{ width: '100%' }}>
      <label style={{
        display: 'block',
        fontSize: '14px',
        fontWeight: 400,
        lineHeight: '18px',
        color: required ? '#DA1E28' : '#161616',
        marginBottom: '8px',
        fontFamily: ODLTheme.typography.fontFamily.sans
      }}>
        {label}
      </label>
      <FormControl
        fullWidth
        error={error}
        disabled={disabled}
        variant="filled"
        sx={{ width: '100%' }}
      >
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        displayEmpty={!!placeholder}
        variant="filled"
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: '#FFFFFF',
              border: `2px solid ${ODLTheme.colors.primary}`,
              borderTop: 'none',
              borderRadius: '4px',
              borderTopLeftRadius: '0',
              borderTopRightRadius: '0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              marginTop: '0',
              '& .MuiMenuItem-root': {
                borderBottom: '1px solid transparent'
              }
            }
          },
          sx: {
            '& .MuiMenu-paper': {
              marginTop: '0'
            }
          }
        }}
        sx={{
          height: sizeStyles.height,
          fontSize: sizeStyles.fontSize,
          fontFamily: ODLTheme.typography.fontFamily.sans,
          backgroundColor: '#F4F4F4', // ODL surface color
          borderRadius: '0',
          '& .MuiFilledInput-root': {
            backgroundColor: '#F4F4F4',
            borderRadius: '0',
            border: 'none',
            borderBottom: `2px solid ${error ? '#DA1E28' : '#E0E0E0'}`,
            '&:before': {
              display: 'none'
            },
            '&:after': {
              borderBottom: `2px solid ${error ? '#DA1E28' : ODLTheme.colors.primary}`,
              transform: 'scaleX(0)',
              transition: 'transform 0.15s cubic-bezier(0.2, 0, 0.38, 0.9)'
            },
            '&:hover': {
              backgroundColor: '#EBEBEB',
              borderBottom: `2px solid ${error ? '#DA1E28' : ODLTheme.colors.primary}`,
              '&:before': {
                display: 'none'
              }
            },
            '&.Mui-focused': {
              backgroundColor: '#F4F4F4',
              borderBottom: `2px solid ${error ? '#DA1E28' : ODLTheme.colors.primary}`,
              '&:after': {
                transform: 'scaleX(1)'
              }
            },
            '&.Mui-disabled': {
              backgroundColor: '#F4F4F4',
              color: '#C6C6C6',
              borderBottom: '2px solid #C6C6C6',
              '&:before': {
                display: 'none'
              }
            }
          },
          '& .MuiSelect-select': {
            paddingTop: size === 'sm' ? '8px' : size === 'lg' ? '12px' : '12px',
            paddingBottom: size === 'sm' ? '8px' : size === 'lg' ? '12px' : '12px',
            paddingLeft: '16px',
            paddingRight: '40px'
          },
          '& .MuiSelect-icon': {
            color: disabled ? '#C6C6C6' : '#525252',
            right: '12px'
          }
        }}
      >
        {placeholder && !value && (
          <MenuItem value="" disabled sx={{
            color: '#707070', // ODL placeholder color for WCAG AA compliance
            fontSize: sizeStyles.fontSize
          }}>
            {placeholder}
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            sx={{
              fontSize: sizeStyles.fontSize,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              color: '#161616',
              padding: '8px 12px',
              '&:hover': {
                backgroundColor: '#EBEBEB'
              },
              '&.Mui-selected': {
                backgroundColor: '#E0F3FE',
                '&:hover': {
                  backgroundColor: '#2A4FA3',
                  color: '#FFFFFF'
                }
              },
              '&.Mui-disabled': {
                color: '#C6C6C6'
              }
            }}
          >
            {option.icon && <span style={{ fontSize: '16px' }}>{option.icon}</span>}
            {option.label}
          </MenuItem>
        ))}
      </Select>
      </FormControl>
      {(helperText || errorMessage) && (
        <div style={{
          color: error ? '#DA1E28' : '#525252',
          fontSize: '12px',
          fontFamily: ODLTheme.typography.fontFamily.sans,
          marginTop: '4px',
          lineHeight: '16px'
        }}>
          {error ? errorMessage : helperText}
        </div>
      )}
    </div>
  );
};

const DropdownDemo: React.FC = () => {
  // Demo selector state
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced' | 'sizes' | 'realworld' | 'interactive'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [showComparison, setShowComparison] = useState(true);
  
  // Basic dropdown state
  const [basicValue, setBasicValue] = useState<string>('');
  
  // Searchable dropdown state
  const [searchableValue, setSearchableValue] = useState<string>('');
  
  // Clearable dropdown state
  const [clearableValue, setClearableValue] = useState<string>('option2');
  
  // Multiple examples state
  const [countryValue, setCountryValue] = useState<string>('us');
  const [priorityValue, setPriorityValue] = useState<string>('');
  const [statusValue, setStatusValue] = useState<string>('active');
  
  // Interactive demo state
  const [interactiveSettings, setInteractiveSettings] = useState({
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
    error: false,
    size: 'md' as 'sm' | 'md' | 'lg',
    placeholder: 'Select an option',
    label: 'Custom Dropdown',
    helperText: 'This is helper text',
    errorMessage: 'This field has an error'
  });
  const [interactiveValue, setInteractiveValue] = useState<string>('');

  // Sample options
  const basicOptions: DropdownOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    { value: 'option5', label: 'Option 5' },
  ];

  const countryOptions: DropdownOption[] = [
    { value: 'us', label: 'United States', icon: '🇺🇸' },
    { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
    { value: 'ca', label: 'Canada', icon: '🇨🇦' },
    { value: 'au', label: 'Australia', icon: '🇦🇺' },
    { value: 'de', label: 'Germany', icon: '🇩🇪' },
    { value: 'fr', label: 'France', icon: '🇫🇷' },
    { value: 'jp', label: 'Japan', icon: '🇯🇵' },
    { value: 'cn', label: 'China', icon: '🇨🇳' },
  ];

  const priorityOptions: DropdownOption[] = [
    { value: 'critical', label: 'Critical', icon: <Icon name="dot-mark" size={16} style={{ color: '#da1e28' }} /> },
    { value: 'high', label: 'High', icon: <Icon name="dot-mark" size={16} style={{ color: '#ff832b' }} /> },
    { value: 'medium', label: 'Medium', icon: <Icon name="dot-mark" size={16} style={{ color: '#f1c21b' }} /> },
    { value: 'low', label: 'Low', icon: <Icon name="dot-mark" size={16} style={{ color: '#24a148' }} /> },
  ];

  const statusOptions: DropdownOption[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'archived', label: 'Archived', disabled: true },
  ];

  const largeOptionsList: DropdownOption[] = Array.from({ length: 20 }, (_, i) => ({
    value: `item${i + 1}`,
    label: `Item ${i + 1}`,
    disabled: i === 7 || i === 15, // Disable some items for demonstration
  }));

  // Get code example based on selected demo
  const getCodeExample = (demo: string) => {
    const examples: Record<string, string> = {
      basic: `// Basic Dropdown
import Dropdown from './components/Dropdown/Dropdown';

const BasicExample = () => {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  
  return (
    <Dropdown
      label="Standard Dropdown"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Choose an option"
      helperText="Select one option from the list"
    />
  );
};`,
      advanced: `// Advanced Features
import Dropdown from './components/Dropdown/Dropdown';
import Icon from './components/Icon/Icon';

const AdvancedExample = () => {
  const [value, setValue] = useState('');
  
  const options = [
    { value: 'critical', label: 'Critical', 
      icon: <Icon name="dot-mark" size={16} style={{ color: '#da1e28' }} /> },
    { value: 'high', label: 'High',
      icon: <Icon name="dot-mark" size={16} style={{ color: '#ff832b' }} /> }
  ];
  
  return (
    <Dropdown
      label="Searchable with Icons"
      options={options}
      value={value}
      onChange={setValue}
      searchable
      clearable
      placeholder="Search options..."
    />
  );
};`,
      sizes: `// Size Variants
import Dropdown from './components/Dropdown/Dropdown';

const SizeExample = () => {
  return (
    <>
      <Dropdown
        label="Small Size"
        options={options}
        size="sm"
        placeholder="Small dropdown"
      />
      
      <Dropdown
        label="Medium Size (Default)"
        options={options}
        size="md"
        placeholder="Medium dropdown"
      />
      
      <Dropdown
        label="Large Size"
        options={options}
        size="lg"
        placeholder="Large dropdown"
      />
    </>
  );
};`,
      realworld: `// Real-world Example
import Dropdown from './components/Dropdown/Dropdown';

const CountrySelector = () => {
  const [country, setCountry] = useState('us');
  
  const countryOptions = [
    { value: 'us', label: 'United States', icon: '🇺🇸' },
    { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
    { value: 'ca', label: 'Canada', icon: '🇨🇦' },
    { value: 'au', label: 'Australia', icon: '🇦🇺' }
  ];
  
  return (
    <Dropdown
      label="Select your country"
      options={countryOptions}
      value={country}
      onChange={setCountry}
      searchable
      clearable
      helperText="Choose your location"
    />
  );
};`,
      interactive: `// Interactive Configuration
import Dropdown from './components/Dropdown/Dropdown';

const InteractiveExample = () => {
  const [value, setValue] = useState('');
  const [settings, setSettings] = useState({
    searchable: false,
    clearable: false,
    disabled: false,
    required: false,
    error: false,
    size: 'md'
  });
  
  return (
    <Dropdown
      label="Configurable Dropdown"
      options={options}
      value={value}
      onChange={setValue}
      searchable={settings.searchable}
      clearable={settings.clearable}
      disabled={settings.disabled}
      required={settings.required}
      error={settings.error}
      size={settings.size}
      placeholder="Select an option"
    />
  );
};`
    };
    
    return examples[demo] || examples.basic;
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Dropdown Component" />
      
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Dropdown Component</h1>
            <p>Select menus with search, icons, and multiple styles</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showComparison ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide MUI' : 'Show MUI'}
            </Button>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic', desc: 'Standard dropdowns', icon: '📋' },
            { key: 'advanced', label: 'Advanced', desc: 'Search and clear features', icon: '🔍' },
            { key: 'sizes', label: 'Sizes', desc: 'Different dimensions', icon: '📏' },
            { key: 'realworld', label: 'Real-world', desc: 'Practical examples', icon: '🌍' },
            { key: 'interactive', label: 'Interactive', desc: 'Live playground', icon: '🎛️' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent} style={{ overflow: 'visible' }}>
        
        {/* Basic Examples */}
        {selectedDemo === 'basic' && (
          <section className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Basic Examples</h2>
              <p>Standard dropdown configurations for common use cases</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
              {showComparison ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <DemoComparison
                    title="Standard Dropdown"
                    description="Basic dropdown with options and helper text"
                    odlExample={
                      <Dropdown
                        label="Standard Dropdown"
                        options={basicOptions}
                        value={basicValue}
                        onChange={setBasicValue}
                        placeholder="Choose an option"
                        helperText="Select one option from the list"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Standard Dropdown"
                          options={basicOptions}
                          value={basicValue}
                          onChange={setBasicValue}
                          placeholder="Choose an option"
                          helperText="Select one option from the list"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Required Field"
                    description="Dropdown with required field indicator"
                    odlExample={
                      <Dropdown
                        label="Required Field"
                        options={statusOptions}
                        value={statusValue}
                        onChange={setStatusValue}
                        required
                        helperText="This field is required"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Required Field"
                          options={statusOptions}
                          value={statusValue}
                          onChange={setStatusValue}
                          required
                          helperText="This field is required"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Disabled State"
                    description="Dropdown in disabled state"
                    odlExample={
                      <Dropdown
                        label="Disabled Dropdown"
                        options={basicOptions}
                        value="option2"
                        disabled
                        helperText="This dropdown is disabled"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Disabled Dropdown"
                          options={basicOptions}
                          value="option2"
                          onChange={() => {}}
                          disabled
                          helperText="This dropdown is disabled"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Error State"
                    description="Dropdown with validation error"
                    odlExample={
                      <Dropdown
                        label="Error State"
                        options={basicOptions}
                        value=""
                        error
                        errorMessage="Please select a valid option"
                        placeholder="Select an option"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Error State"
                          options={basicOptions}
                          value=""
                          onChange={() => {}}
                          error
                          errorMessage="Please select a valid option"
                          placeholder="Select an option"
                        />
                      </ODLThemeProvider>
                    }
                  />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', overflow: 'visible' }}>
                  {/* Standard Dropdown */}
                  <div>
                    <Dropdown
                      label="Standard Dropdown"
                      options={basicOptions}
                      value={basicValue}
                      onChange={setBasicValue}
                      placeholder="Choose an option"
                      helperText="Select one option from the list"
                    />
                  </div>

                  {/* Required Dropdown */}
                  <div>
                    <Dropdown
                      label="Required Field"
                      options={statusOptions}
                      value={statusValue}
                      onChange={setStatusValue}
                      required
                      helperText="This field is required"
                    />
                  </div>

                  {/* Disabled Dropdown */}
                  <div>
                    <Dropdown
                      label="Disabled Dropdown"
                      options={basicOptions}
                      value="option2"
                      disabled
                      helperText="This dropdown is disabled"
                    />
                  </div>

                  {/* Error State */}
                  <div>
                    <Dropdown
                      label="Error State"
                      options={basicOptions}
                      value=""
                      error
                      errorMessage="Please select a valid option"
                      placeholder="Select an option"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Advanced Features */}
        {selectedDemo === 'advanced' && (
          <section className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Advanced Features</h2>
              <p>Enhanced dropdown functionality with search, clear, and icons</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
              {showComparison ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <DemoComparison
                    title="Searchable Dropdown"
                    description="Dropdown with search functionality (Note: MUI Select doesn't have built-in search)"
                    odlExample={
                      <Dropdown
                        label="Searchable Dropdown"
                        options={countryOptions}
                        value={searchableValue}
                        onChange={setSearchableValue}
                        searchable
                        placeholder="Search countries..."
                        helperText="Type to filter options"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Searchable Dropdown"
                          options={countryOptions}
                          value={searchableValue}
                          onChange={setSearchableValue}
                          placeholder="Search countries..."
                          helperText="MUI Select without search (use Autocomplete for search)"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Clearable Dropdown"
                    description="Dropdown with clear button functionality (Note: MUI Select doesn't have built-in clear)"
                    odlExample={
                      <Dropdown
                        label="Clearable Dropdown"
                        options={basicOptions}
                        value={clearableValue}
                        onChange={setClearableValue}
                        clearable
                        helperText="Click X to clear selection"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Clearable Dropdown"
                          options={basicOptions}
                          value={clearableValue}
                          onChange={setClearableValue}
                          helperText="MUI Select without clear button"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="With Icons"
                    description="Dropdown options with icons"
                    odlExample={
                      <Dropdown
                        label="Priority Level"
                        options={priorityOptions}
                        value={priorityValue}
                        onChange={setPriorityValue}
                        placeholder="Select priority"
                        helperText="Options with icons"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Priority Level"
                          options={priorityOptions}
                          value={priorityValue}
                          onChange={setPriorityValue}
                          placeholder="Select priority"
                          helperText="Options with icons"
                        />
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Large List"
                    description="Dropdown with many options"
                    odlExample={
                      <Dropdown
                        label="Large List"
                        options={largeOptionsList}
                        value=""
                        onChange={() => {}}
                        searchable
                        placeholder="Search items..."
                        helperText="Searchable list with many items"
                      />
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <MUISelect
                          label="Large List"
                          options={largeOptionsList}
                          value=""
                          onChange={() => {}}
                          placeholder="Search items..."
                          helperText="List with many items (no search)"
                        />
                      </ODLThemeProvider>
                    }
                  />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', overflow: 'visible' }}>
                  {/* Searchable Dropdown */}
                  <div>
                    <Dropdown
                      label="Searchable Dropdown"
                      options={countryOptions}
                      value={searchableValue}
                      onChange={setSearchableValue}
                      searchable
                      placeholder="Search countries..."
                      helperText="Type to filter options"
                    />
                  </div>

                  {/* Clearable Dropdown */}
                  <div>
                    <Dropdown
                      label="Clearable Dropdown"
                      options={basicOptions}
                      value={clearableValue}
                      onChange={setClearableValue}
                      clearable
                      helperText="Click X to clear selection"
                    />
                  </div>

                  {/* With Icons */}
                  <div>
                    <Dropdown
                      label="Priority Level"
                      options={priorityOptions}
                      value={priorityValue}
                      onChange={setPriorityValue}
                      placeholder="Select priority"
                      helperText="Options with icons"
                    />
                  </div>

                  {/* Large List */}
                  <div>
                    <Dropdown
                      label="Large List"
                      options={largeOptionsList}
                      value=""
                      searchable
                      placeholder="Search items..."
                      helperText="Searchable list with many items"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Size Variants */}
        {selectedDemo === 'sizes' && (
          <section className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Size Variants</h2>
              <p>Different dropdown sizes for various UI contexts</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
              {showComparison ? (
                <DemoComparison
                  title="Size Variants"
                  description="Different dropdown sizes for various UI contexts"
                  odlExample={
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
                      <Dropdown
                        label="Small Size"
                        options={basicOptions}
                        size="sm"
                        placeholder="Small dropdown"
                      />

                      <Dropdown
                        label="Medium Size (Default)"
                        options={basicOptions}
                        size="md"
                        placeholder="Medium dropdown"
                      />

                      <Dropdown
                        label="Large Size"
                        options={basicOptions}
                        size="lg"
                        placeholder="Large dropdown"
                      />
                    </div>
                  }
                  muiExample={
                    <ODLThemeProvider enableMui={true}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '300px' }}>
                        <MUISelect
                          label="Small Size"
                          options={basicOptions}
                          value=""
                          onChange={() => {}}
                          size="sm"
                          placeholder="Small dropdown"
                        />

                        <MUISelect
                          label="Medium Size (Default)"
                          options={basicOptions}
                          value=""
                          onChange={() => {}}
                          size="md"
                          placeholder="Medium dropdown"
                        />

                        <MUISelect
                          label="Large Size"
                          options={basicOptions}
                          value=""
                          onChange={() => {}}
                          size="lg"
                          placeholder="Large dropdown"
                        />
                      </div>
                    </ODLThemeProvider>
                  }
                />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px', overflow: 'visible' }}>
                  <Dropdown
                    label="Small Size"
                    options={basicOptions}
                    size="sm"
                    placeholder="Small dropdown"
                  />

                  <Dropdown
                    label="Medium Size (Default)"
                    options={basicOptions}
                    size="md"
                    placeholder="Medium dropdown"
                  />

                  <Dropdown
                    label="Large Size"
                    options={basicOptions}
                    size="lg"
                    placeholder="Large dropdown"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* Real-world Examples */}
        {selectedDemo === 'realworld' && (
          <section className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Real-world Examples</h2>
              <p>Practical dropdown implementations for common scenarios</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
              {showComparison ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                  <DemoComparison
                    title="Country Selector"
                    description="Real-world country selection with search and icons"
                    odlExample={
                      <div style={{
                        padding: '1.5rem',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        overflow: 'visible',
                        position: 'relative'
                      }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                          Country Selector
                        </h3>
                        <Dropdown
                          label="Select your country"
                          options={countryOptions}
                          value={countryValue}
                          onChange={setCountryValue}
                          searchable
                          clearable
                          helperText="Choose your location"
                        />
                        {countryValue && (
                          <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                            Selected: {countryOptions.find(opt => opt.value === countryValue)?.label}
                          </p>
                        )}
                      </div>
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <div style={{
                          padding: '1.5rem',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          overflow: 'visible',
                          position: 'relative'
                        }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                            Country Selector
                          </h3>
                          <MUISelect
                            label="Select your country"
                            options={countryOptions}
                            value={countryValue}
                            onChange={setCountryValue}
                            helperText="Choose your location"
                          />
                          {countryValue && (
                            <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                              Selected: {countryOptions.find(opt => opt.value === countryValue)?.label}
                            </p>
                          )}
                        </div>
                      </ODLThemeProvider>
                    }
                  />

                  <DemoComparison
                    title="Task Priority"
                    description="Priority selection with colored indicators"
                    odlExample={
                      <div style={{
                        padding: '1.5rem',
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '0.5rem',
                        overflow: 'visible',
                        position: 'relative'
                      }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                          Task Priority
                        </h3>
                        <Dropdown
                          label="Set priority"
                          options={priorityOptions}
                          value={priorityValue}
                          onChange={setPriorityValue}
                          required
                          placeholder="Choose priority level"
                        />
                        {priorityValue && (
                          <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                            Priority set to: {priorityOptions.find(opt => opt.value === priorityValue)?.label}
                          </p>
                        )}
                      </div>
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <div style={{
                          padding: '1.5rem',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '0.5rem',
                          overflow: 'visible',
                          position: 'relative'
                        }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                            Task Priority
                          </h3>
                          <MUISelect
                            label="Set priority"
                            options={priorityOptions}
                            value={priorityValue}
                            onChange={setPriorityValue}
                            required
                            placeholder="Choose priority level"
                          />
                          {priorityValue && (
                            <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                              Priority set to: {priorityOptions.find(opt => opt.value === priorityValue)?.label}
                            </p>
                          )}
                        </div>
                      </ODLThemeProvider>
                    }
                  />
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', overflow: 'visible' }}>
                  {/* Country Selector */}
                  <div style={{
                    padding: '1.5rem',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'visible',
                    position: 'relative'
                  }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                      Country Selector
                    </h3>
                    <Dropdown
                      label="Select your country"
                      options={countryOptions}
                      value={countryValue}
                      onChange={setCountryValue}
                      searchable
                      clearable
                      helperText="Choose your location"
                    />
                    {countryValue && (
                      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                        Selected: {countryOptions.find(opt => opt.value === countryValue)?.label}
                      </p>
                    )}
                  </div>

                  {/* Task Priority */}
                  <div style={{
                    padding: '1.5rem',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'visible',
                    position: 'relative'
                  }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: '#374151' }}>
                      Task Priority
                    </h3>
                    <Dropdown
                      label="Set priority"
                      options={priorityOptions}
                      value={priorityValue}
                      onChange={setPriorityValue}
                      required
                      placeholder="Choose priority level"
                    />
                    {priorityValue && (
                      <p style={{ marginTop: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                        Priority set to: {priorityOptions.find(opt => opt.value === priorityValue)?.label}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Interactive Playground */}
        {selectedDemo === 'interactive' && (
          <section className={styles.tableSection} style={{ overflow: 'visible' }}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Playground</h2>
              <p>Configure and test dropdown properties in real-time</p>
            </div>
            
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
              {showComparison ? (
                <DemoComparison
                  title="Interactive Configuration"
                  description="Live playground to test different dropdown properties"
                  odlExample={
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', overflow: 'visible' }}>
                      {/* Settings Panel */}
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#374151' }}>
                          Configuration
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={interactiveSettings.searchable}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, searchable: e.target.checked }))}
                            />
                            Searchable
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={interactiveSettings.clearable}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, clearable: e.target.checked }))}
                            />
                            Clearable
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={interactiveSettings.disabled}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, disabled: e.target.checked }))}
                            />
                            Disabled
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={interactiveSettings.required}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, required: e.target.checked }))}
                            />
                            Required
                          </label>
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <input
                              type="checkbox"
                              checked={interactiveSettings.error}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, error: e.target.checked }))}
                            />
                            Error State
                          </label>

                          <div style={{ marginTop: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Size</label>
                            <select
                              value={interactiveSettings.size}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, size: e.target.value as 'sm' | 'md' | 'lg' }))}
                              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                            >
                              <option value="sm">Small</option>
                              <option value="md">Medium</option>
                              <option value="lg">Large</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Placeholder</label>
                            <input
                              type="text"
                              value={interactiveSettings.placeholder}
                              onChange={(e) => setInteractiveSettings(prev => ({ ...prev, placeholder: e.target.value }))}
                              style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Preview */}
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#374151' }}>
                          ODL Preview
                        </h3>
                        <Dropdown
                          label={interactiveSettings.label}
                          options={countryOptions}
                          value={interactiveValue}
                          onChange={setInteractiveValue}
                          searchable={interactiveSettings.searchable}
                          clearable={interactiveSettings.clearable}
                          disabled={interactiveSettings.disabled}
                          required={interactiveSettings.required}
                          error={interactiveSettings.error}
                          errorMessage={interactiveSettings.error ? interactiveSettings.errorMessage : undefined}
                          size={interactiveSettings.size}
                          placeholder={interactiveSettings.placeholder}
                          helperText={!interactiveSettings.error ? interactiveSettings.helperText : undefined}
                        />
                      </div>
                    </div>
                  }
                  muiExample={
                    <ODLThemeProvider enableMui={true}>
                      <div>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#374151' }}>
                          MUI Preview
                        </h3>
                        <MUISelect
                          label={interactiveSettings.label}
                          options={countryOptions}
                          value={interactiveValue}
                          onChange={setInteractiveValue}
                          disabled={interactiveSettings.disabled}
                          required={interactiveSettings.required}
                          error={interactiveSettings.error}
                          errorMessage={interactiveSettings.error ? interactiveSettings.errorMessage : undefined}
                          size={interactiveSettings.size}
                          placeholder={interactiveSettings.placeholder}
                          helperText={!interactiveSettings.error ? interactiveSettings.helperText : undefined}
                        />
                        <p style={{ marginTop: '1rem', fontSize: '14px', color: '#6b7280' }}>
                          Note: MUI Select doesn't support searchable or clearable props natively
                        </p>
                      </div>
                    </ODLThemeProvider>
                  }
                />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', overflow: 'visible' }}>
                  {/* Settings Panel */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#374151' }}>
                      Configuration
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={interactiveSettings.searchable}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, searchable: e.target.checked }))}
                        />
                        Searchable
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={interactiveSettings.clearable}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, clearable: e.target.checked }))}
                        />
                        Clearable
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={interactiveSettings.disabled}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, disabled: e.target.checked }))}
                        />
                        Disabled
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={interactiveSettings.required}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, required: e.target.checked }))}
                        />
                        Required
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={interactiveSettings.error}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, error: e.target.checked }))}
                        />
                        Error State
                      </label>

                      <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Size</label>
                        <select
                          value={interactiveSettings.size}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, size: e.target.value as 'sm' | 'md' | 'lg' }))}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                        >
                          <option value="sm">Small</option>
                          <option value="md">Medium</option>
                          <option value="lg">Large</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Placeholder</label>
                        <input
                          type="text"
                          value={interactiveSettings.placeholder}
                          onChange={(e) => setInteractiveSettings(prev => ({ ...prev, placeholder: e.target.value }))}
                          style={{ width: '100%', padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem', color: '#374151' }}>
                      Preview
                    </h3>
                    <Dropdown
                      label={interactiveSettings.label}
                      options={countryOptions}
                      value={interactiveValue}
                      onChange={setInteractiveValue}
                      searchable={interactiveSettings.searchable}
                      clearable={interactiveSettings.clearable}
                      disabled={interactiveSettings.disabled}
                      required={interactiveSettings.required}
                      error={interactiveSettings.error}
                      errorMessage={interactiveSettings.error ? interactiveSettings.errorMessage : undefined}
                      size={interactiveSettings.size}
                      placeholder={interactiveSettings.placeholder}
                      helperText={!interactiveSettings.error ? interactiveSettings.helperText : undefined}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Code Example Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Dropdown Component Features</h3>
          <p>Everything you need for flexible select menu implementations</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ Single selection</li>
              <li>✓ Placeholder text</li>
              <li>✓ Required field</li>
              <li>✓ Disabled state</li>
              <li>✓ Error messages</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🔍 Advanced</h4>
            <ul>
              <li>✓ Searchable options</li>
              <li>✓ Clearable selection</li>
              <li>✓ Option icons</li>
              <li>✓ Disabled options</li>
              <li>✓ Large option lists</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📏 Customization</h4>
            <ul>
              <li>✓ Three size variants</li>
              <li>✓ Custom labels</li>
              <li>✓ Helper text</li>
              <li>✓ Icon positioning</li>
              <li>✓ Custom placeholders</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ Performance</h4>
            <ul>
              <li>✓ Virtual scrolling</li>
              <li>✓ Lazy loading</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Click outside handling</li>
              <li>✓ Optimized search</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA compliant</li>
              <li>✓ Keyboard support</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ Focus management</li>
              <li>✓ Clear labels</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Use Cases</h4>
            <ul>
              <li>✓ Form selections</li>
              <li>✓ Country pickers</li>
              <li>✓ Status selectors</li>
              <li>✓ Priority levels</li>
              <li>✓ Filter options</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default DropdownDemo;