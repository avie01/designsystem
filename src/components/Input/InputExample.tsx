import React, { useState } from 'react';
import Input from './Input';

const InputExample: React.FC = () => {
  const [defaultValue, setDefaultValue] = useState('');
  const [activeValue, setActiveValue] = useState('Active state with text');
  const [errorValue, setErrorValue] = useState('');

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Carbon Input Component States</h1>
      
      <div className="grid gap-8 max-w-md">
        {/* Default State */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Default</h3>
          <Input
            placeholder="Placeholder text"
            value={defaultValue}
            onChange={setDefaultValue}
            hideLabel={true}
          />
        </div>

        {/* Hover State - Visual feedback handled by CSS */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Hover (hover over input)</h3>
          <Input
            placeholder="Hover over me"
            hideLabel={true}
          />
        </div>

        {/* Error State */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Error</h3>
          <Input
            placeholder="Error state"
            value={errorValue}
            onChange={setErrorValue}
            error={true}
            errorMessage="This field is required"
            hideLabel={true}
          />
        </div>

        {/* Active/Focus State with Text */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Active (focused with text)</h3>
          <Input
            placeholder="Active state"
            value={activeValue}
            onChange={setActiveValue}
            hideLabel={true}
          />
        </div>

        {/* Disabled State */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Disabled</h3>
          <Input
            placeholder="Disabled input"
            disabled={true}
            value="Cannot edit this"
            hideLabel={true}
          />
        </div>

        {/* Read-only State */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Read-only</h3>
          <Input
            placeholder="Read-only"
            readOnly={true}
            value="Read-only value"
            hideLabel={true}
          />
        </div>

        {/* With Label and Helper Text */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">With Label & Helper Text</h3>
          <Input
            label="Email Address"
            placeholder="Enter your email"
            helperText="We'll never share your email with anyone"
            type="email"
          />
        </div>

        {/* Required Field */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Required Field</h3>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required={true}
          />
        </div>

        {/* Size Variations */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Size Variations</h3>
          <div className="space-y-4">
            <Input
              label="Small Input"
              placeholder="Small size"
              size="sm"
            />
            <Input
              label="Medium Input (Default)"
              placeholder="Medium size"
              size="md"
            />
            <Input
              label="Large Input"
              placeholder="Large size"
              size="lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputExample;