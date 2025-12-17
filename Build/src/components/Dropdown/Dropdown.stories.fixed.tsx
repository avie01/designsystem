import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from './Dropdown';
import React from 'react';
import Icon from '../Icon/Icon';
import type { DropdownOption } from './Dropdown';
import styles from '../../pages/TableDemo.module.css';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown (Fixed)',
  component: Dropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A customizable dropdown select component with search, icons, and multiple selection support - with proper demo styling.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className={styles.tableSection} style={{ overflow: 'visible', minHeight: '400px' }}>
        <div style={{ 
          padding: '2rem', 
          background: 'white', 
          borderRadius: '12px',
          overflow: 'visible',
          position: 'relative'
        }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options data
const basicOptions: DropdownOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  { value: 'option5', label: 'Option 5' },
];

const countryOptions: DropdownOption[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'cn', label: 'China', icon: '🇨🇳' },
];

const priorityOptions: DropdownOption[] = [
  { value: 'critical', label: 'Critical', icon: <Icon name="warning--filled" size={16} style={{ color: '#da1e28' }} /> },
  { value: 'high', label: 'High', icon: <Icon name="warning" size={16} style={{ color: '#ff832b' }} /> },
  { value: 'medium', label: 'Medium', icon: <Icon name="information" size={16} style={{ color: '#f1c21b' }} /> },
  { value: 'low', label: 'Low', icon: <Icon name="checkmark" size={16} style={{ color: '#24a148' }} /> },
];

const statusOptions: DropdownOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
];

// Basic dropdown with exact demo styling
export const BasicStyled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ maxWidth: '300px' }}>
        <Dropdown
          label="Standard Dropdown"
          options={basicOptions}
          value={value}
          onChange={setValue}
          placeholder="Choose an option"
          helperText="Select one option from the list"
        />
      </div>
    );
  },
};

// Grid layout like in demo
export const GridLayout: Story = {
  render: () => {
    const [basicValue, setBasicValue] = React.useState('');
    const [countryValue, setCountryValue] = React.useState('us');
    const [priorityValue, setPriorityValue] = React.useState('');
    const [statusValue, setStatusValue] = React.useState('active');
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '2rem',
        overflow: 'visible'
      }}>
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

        {/* With Selected Value */}
        <div>
          <Dropdown
            label="Country"
            options={countryOptions}
            value={countryValue}
            onChange={setCountryValue}
            helperText="Pre-selected value"
          />
        </div>

        {/* Required Field */}
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
      </div>
    );
  },
};

// Searchable with exact styling
export const SearchableStyled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div style={{ maxWidth: '400px' }}>
        <Dropdown
          label="Searchable Countries"
          options={countryOptions}
          value={value}
          onChange={setValue}
          searchable
          placeholder="Search countries..."
          helperText="Type to filter options"
        />
      </div>
    );
  },
};

// Real-world example cards
export const RealWorldCards: Story = {
  render: () => {
    const [countryValue, setCountryValue] = React.useState('us');
    const [priorityValue, setPriorityValue] = React.useState('');
    
    return (
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem',
        overflow: 'visible'
      }}>
        {/* Country Selector Card */}
        <div style={{
          padding: '1.5rem',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          overflow: 'visible',
          position: 'relative'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            marginBottom: '1rem', 
            color: '#374151' 
          }}>
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
            <p style={{ 
              marginTop: '1rem', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              Selected: {countryOptions.find(opt => opt.value === countryValue)?.label}
            </p>
          )}
        </div>

        {/* Task Priority Card */}
        <div style={{
          padding: '1.5rem',
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          overflow: 'visible',
          position: 'relative'
        }}>
          <h3 style={{ 
            fontSize: '1.125rem', 
            fontWeight: 600, 
            marginBottom: '1rem', 
            color: '#374151' 
          }}>
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
            <p style={{ 
              marginTop: '1rem', 
              color: '#6b7280', 
              fontSize: '0.875rem' 
            }}>
              Priority set to: {priorityOptions.find(opt => opt.value === priorityValue)?.label}
            </p>
          )}
        </div>
      </div>
    );
  },
};

// All states
export const AllStates: Story = {
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '2rem',
      overflow: 'visible'
    }}>
      <Dropdown
        label="Normal"
        options={basicOptions}
        placeholder="Normal state"
      />
      
      <Dropdown
        label="With Value"
        options={basicOptions}
        value="option2"
      />
      
      <Dropdown
        label="Disabled"
        options={basicOptions}
        value="option1"
        disabled
        helperText="This dropdown is disabled"
      />
      
      <Dropdown
        label="Error State"
        options={basicOptions}
        error
        errorMessage="Please select a valid option"
        placeholder="Select an option"
      />
      
      <Dropdown
        label="Required"
        options={basicOptions}
        required
        placeholder="Required field"
      />
      
      <Dropdown
        label="Clearable"
        options={basicOptions}
        value="option3"
        clearable
        helperText="Click X to clear"
      />
    </div>
  ),
};

// Size variants with proper spacing
export const SizeVariants: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem', 
      maxWidth: '400px',
      overflow: 'visible'
    }}>
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
  ),
};