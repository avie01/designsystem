import React, { useState } from 'react';
import { Input } from '../src';

const InputComponentTest: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [invalidValue, setInvalidValue] = useState('');

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1>Input Component Test</h1>
      <p>Testing IBM Carbon Design System Input components</p>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>Basic Input</h2>
        <Input
          id="basic-input"
          labelText="Basic Text Input"
          placeholder="Enter some text"
          value={basicValue}
          onChange={setBasicValue}
          helperText="This is a basic text input field"
        />
        <p>Current value: <code>{basicValue}</code></p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Email Input</h2>
        <Input
          type="email"
          id="email-input"
          labelText="Email Address"
          placeholder="user@example.com"
          value={emailValue}
          onChange={setEmailValue}
          required
          helperText="Enter a valid email address"
        />
        <p>Current value: <code>{emailValue}</code></p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Password Input</h2>
        <Input
          type="password"
          id="password-input"
          labelText="Password"
          placeholder="Enter your password"
          value={passwordValue}
          onChange={setPasswordValue}
          required
          helperText="Password should be at least 8 characters"
        />
        <p>Current value length: <code>{passwordValue.length} characters</code></p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Invalid Input</h2>
        <Input
          id="invalid-input"
          labelText="Input with Error"
          placeholder="Enter invalid value"
          value={invalidValue}
          onChange={setInvalidValue}
          invalid={invalidValue.length > 0 && invalidValue.length < 5}
          invalidText="Value must be at least 5 characters long"
          helperText="Type less than 5 characters to see error state"
        />
        <p>Current value: <code>{invalidValue}</code></p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Different Sizes</h2>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            size="sm"
            id="small-input"
            labelText="Small Input"
            placeholder="Small size input"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            size="md"
            id="medium-input"
            labelText="Medium Input (Default)"
            placeholder="Medium size input"
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            size="lg"
            id="large-input"
            labelText="Large Input"
            placeholder="Large size input"
          />
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>Disabled and Read-only States</h2>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            id="disabled-input"
            labelText="Disabled Input"
            placeholder="This input is disabled"
            value="Cannot edit this"
            disabled
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Input
            id="readonly-input"
            labelText="Read-only Input"
            value="This is read-only"
            readOnly
            helperText="This field cannot be modified"
          />
        </div>
      </div>
    </div>
  );
};

export default InputComponentTest;