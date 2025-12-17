import React, { useState } from 'react';
import { Dropdown, Input, DropdownOption } from '../src';

const DropdownTest: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [selectedSize, setSelectedSize] = useState('');
  const [searchableValue, setSearchableValue] = useState('');

  const simpleOptions: DropdownOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
    { value: 'option5', label: 'Option 5' },
  ];

  const countryOptions: DropdownOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
    { value: 'nz', label: 'New Zealand' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
  ];

  const sizeOptions: DropdownOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' },
  ];

  const productOptions: DropdownOption[] = [
    { value: 'threesixty', label: '3Sixty' },
    { value: 'build', label: 'Build' },
    { value: 'connect', label: 'Connect' },
    { value: 'keyplan', label: 'Keyplan' },
    { value: 'keystone', label: 'Keystone' },
    { value: 'nexus', label: 'Nexus' },
    { value: 'redact', label: 'Redact' },
    { value: 'regworks', label: 'RegWorks' },
    { value: 'trapeze', label: 'Trapeze' },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Dropdown Component Test</h1>
      
      <div style={{ display: 'grid', gap: '2rem' }}>
        
        {/* Comparison with Input */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Input vs Dropdown Styling Comparison</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="Input Field"
              placeholder="Type something..."
              helperText="This is a regular input field"
            />
            <Dropdown
              label="Dropdown Field"
              placeholder="Select an option..."
              options={simpleOptions}
              value={selectedValue}
              onChange={setSelectedValue}
              helperText="This is a dropdown with matching style"
            />
          </div>
        </section>

        {/* Basic Dropdown */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Basic Dropdown</h2>
          <Dropdown
            label="Select an Option"
            placeholder="Choose one..."
            options={simpleOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            required
          />
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Selected value: {selectedValue || 'None'}
          </p>
        </section>

        {/* Searchable Dropdown */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Searchable Dropdown</h2>
          <Dropdown
            label="Country"
            placeholder="Select a country..."
            options={countryOptions}
            value={selectedCountry}
            onChange={setSelectedCountry}
            searchable
            clearable
            helperText="Type to search countries"
          />
        </section>

        {/* Different Sizes */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Different Sizes</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Dropdown
              label="Small Size"
              placeholder="Small dropdown"
              options={sizeOptions}
              size="sm"
            />
            <Dropdown
              label="Medium Size (Default)"
              placeholder="Medium dropdown"
              options={sizeOptions}
              size="md"
            />
            <Dropdown
              label="Large Size"
              placeholder="Large dropdown"
              options={sizeOptions}
              size="lg"
            />
          </div>
        </section>

        {/* Error State */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Error State</h2>
          <Dropdown
            label="Size Selection"
            placeholder="Select a size..."
            options={sizeOptions}
            value={selectedSize}
            onChange={setSelectedSize}
            error
            errorMessage="Please select a valid size"
            required
          />
        </section>

        {/* Disabled State */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Disabled State</h2>
          <Dropdown
            label="Disabled Dropdown"
            placeholder="Cannot select..."
            options={simpleOptions}
            disabled
            helperText="This dropdown is disabled"
          />
        </section>

        {/* Clearable Dropdown */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Clearable Dropdown</h2>
          <Dropdown
            label="Product Selection"
            placeholder="Select a product..."
            options={productOptions}
            value={searchableValue}
            onChange={setSearchableValue}
            clearable
            searchable
            helperText="You can clear the selection with the X button"
          />
        </section>

        {/* Grid Layout Example */}
        <section>
          <h2 style={{ marginBottom: '1rem' }}>Form Layout Example</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Input
              label="First Name"
              placeholder="Enter first name..."
              required
            />
            <Input
              label="Last Name"
              placeholder="Enter last name..."
              required
            />
            <Dropdown
              label="Country"
              placeholder="Select country..."
              options={countryOptions}
              required
            />
            <Dropdown
              label="Product"
              placeholder="Select product..."
              options={productOptions}
              required
            />
          </div>
        </section>

      </div>
    </div>
  );
};

export default DropdownTest;