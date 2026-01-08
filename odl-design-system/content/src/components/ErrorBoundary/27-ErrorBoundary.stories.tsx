import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Button from '../Button/Button';

const meta: Meta<typeof ErrorBoundary> = {
  title: 'Design System/Components/ErrorBoundary',
  component: ErrorBoundary,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Error Boundary component that catches JavaScript errors in child components, logs them, and displays a fallback UI. Supports custom error handlers, automatic reset, and different display levels (page, section, component).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Child components to wrap with error boundary',
      table: {
        disable: true,
        type: { summary: 'ReactNode' },
      },
    },
    fallback: {
      control: false,
      description: 'Custom fallback component to show when error occurs',
      table: {
        disable: true,
        type: { summary: 'React.ComponentType<{ error: Error; resetError: () => void }>' },
      },
    },
    onError: {
      description: 'Callback when an error is caught',
      table: {
        disable: true,
        type: { summary: '(error: Error, errorInfo: ErrorInfo) => void' },
      },
    },
    resetKeys: {
      control: false,
      description: 'Array of keys that will reset the error boundary when changed',
      table: {
        disable: true,
        type: { summary: 'Array<string | number>' },
      },
    },
    resetOnPropsChange: {
      control: 'boolean',
      description: 'Whether to reset error boundary on any prop change',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isolate: {
      control: 'boolean',
      description: 'Whether to isolate errors or propagate to parent boundary',
      table: {
        disable: true,
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    level: {
      control: 'select',
      options: ['page', 'section', 'component'],
      description: 'Display level affecting fallback UI sizing',
      table: {
        disable: true,
        type: { summary: '"page" | "section" | "component"' },
        defaultValue: { summary: 'component' },
      },
    },
    fallbackMessage: {
      control: 'text',
      description: 'Custom message to display in fallback UI',
      table: {
        disable: true,
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const BrokenComponent: React.FC<{ shouldThrow?: boolean }> = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('This component intentionally threw an error for demonstration');
  }
  return <div>This component is working correctly</div>;
};

const ComponentWithButton: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('User triggered error by clicking the button');
  }

  return (
    <div style={{ padding: '20px', border: '2px solid #4a90e2', borderRadius: '8px' }}>
      <h2>Stable Component</h2>
      <p>This component is working fine. Click the button below to trigger an error:</p>
      <Button variant="destructive" onClick={() => setShouldThrow(true)}>
        Trigger Error
      </Button>
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <ErrorBoundary>
      <ComponentWithButton />
    </ErrorBoundary>
  ),
};

export const ComponentLevel: Story = {
  name: '02 Component Level',
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Component Level Error Boundary</h2>
      <p>This error boundary only affects a small component within the page.</p>

      <div style={{ marginTop: '20px', display: 'grid', gap: '20px' }}>
        <div style={{ padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Working Component</h3>
          <p>This component is functioning normally.</p>
        </div>

        <ErrorBoundary level="component">
          <ComponentWithButton />
        </ErrorBoundary>

        <div style={{ padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <h3>Another Working Component</h3>
          <p>This component continues to work even if the middle component errors.</p>
        </div>
      </div>
    </div>
  ),
};

export const SectionLevel: Story = {
  name: '03 Section Level',
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Section Level Error Boundary</h2>

      <ErrorBoundary level="section">
        <div style={{ padding: '24px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Protected Section</h3>
          <p>This entire section is wrapped in an error boundary.</p>
          <ComponentWithButton />
        </div>
      </ErrorBoundary>
    </div>
  ),
};

export const PageLevel: Story = {
  name: '04 Page Level',
  render: () => (
    <ErrorBoundary level="page">
      <div style={{ minHeight: '400px', padding: '40px' }}>
        <h1>Entire Page Protected</h1>
        <p>This error boundary protects the entire page content.</p>
        <ComponentWithButton />
      </div>
    </ErrorBoundary>
  ),
};

export const CustomFallback: Story = {
  name: '05 Custom Fallback',
  render: () => {
    const CustomError: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#fff3cd',
        border: '2px solid #ffc107',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h2 style={{ color: '#856404' }}>Oops! Something went wrong</h2>
        <p style={{ color: '#856404', marginBottom: '20px' }}>
          We encountered an unexpected error. Our team has been notified.
        </p>
        <details style={{ marginBottom: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto 20px' }}>
          <summary style={{ cursor: 'pointer', color: '#856404', fontWeight: 'bold' }}>
            Error Details
          </summary>
          <pre style={{
            backgroundColor: 'white',
            padding: '12px',
            borderRadius: '4px',
            marginTop: '12px',
            overflow: 'auto',
            fontSize: '12px',
            color: '#d32f2f'
          }}>
            {error.message}
          </pre>
        </details>
        <Button variant="primary" onClick={resetError}>
          Try Again
        </Button>
      </div>
    );

    return (
      <ErrorBoundary fallback={CustomError}>
        <ComponentWithButton />
      </ErrorBoundary>
    );
  },
};

export const WithErrorHandler: Story = {
  name: '06 With Error Handler',
  render: () => {
    const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
      console.error('Error caught by boundary:', error);
      console.error('Error info:', errorInfo);
      alert(`Error logged: ${error.message}`);
    };

    return (
      <ErrorBoundary onError={handleError}>
        <div style={{ padding: '20px' }}>
          <h3>Error Boundary with Custom Handler</h3>
          <p>When an error occurs, it will be logged and an alert will be shown.</p>
          <ComponentWithButton />
        </div>
      </ErrorBoundary>
    );
  },
};

export const AutoResetOnKeyChange: Story = {
  name: '07 Auto Reset On Key Change',
  render: () => {
    const [userId, setUserId] = useState(1);
    const [shouldError, setShouldError] = useState(false);

    const UserProfile: React.FC<{ userId: number; shouldError: boolean }> = ({ userId: id, shouldError: error }) => {
      if (error) {
        throw new Error(`Failed to load user profile for user ${id}`);
      }
      return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>User Profile #{id}</h3>
          <p>Profile loaded successfully</p>
          <Button variant="destructive" onClick={() => setShouldError(true)}>
            Trigger Error
          </Button>
        </div>
      );
    };

    return (
      <div style={{ padding: '20px' }}>
        <h3>Auto-Reset on Key Change</h3>
        <p>The error boundary automatically resets when userId changes.</p>

        <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
          <Button onClick={() => { setUserId(userId + 1); setShouldError(false); }}>
            Load Next User (ID: {userId + 1})
          </Button>
          <Button onClick={() => { setUserId(userId - 1); setShouldError(false); }}>
            Load Previous User (ID: {userId - 1})
          </Button>
        </div>

        <ErrorBoundary resetKeys={[userId]}>
          <UserProfile userId={userId} shouldError={shouldError} />
        </ErrorBoundary>
      </div>
    );
  },
};

export const MultipleErrorBoundaries: Story = {
  name: '08 Multiple Error Boundaries',
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Multiple Isolated Error Boundaries</h2>
      <p>Each section has its own error boundary. Errors are isolated to their respective sections.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <ErrorBoundary level="component" fallbackMessage="Section 1 Error">
          <div style={{ padding: '20px', border: '2px solid #4caf50', borderRadius: '8px' }}>
            <h3>Section 1</h3>
            <ComponentWithButton />
          </div>
        </ErrorBoundary>

        <ErrorBoundary level="component" fallbackMessage="Section 2 Error">
          <div style={{ padding: '20px', border: '2px solid #2196f3', borderRadius: '8px' }}>
            <h3>Section 2</h3>
            <ComponentWithButton />
          </div>
        </ErrorBoundary>

        <ErrorBoundary level="component" fallbackMessage="Section 3 Error">
          <div style={{ padding: '20px', border: '2px solid #ff9800', borderRadius: '8px' }}>
            <h3>Section 3</h3>
            <ComponentWithButton />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  ),
};

export const NestedErrorBoundaries: Story = {
  name: '09 Nested Error Boundaries',
  render: () => (
    <ErrorBoundary level="page" fallbackMessage="Page Level Error">
      <div style={{ padding: '20px', border: '3px solid #9c27b0', borderRadius: '8px', minHeight: '400px' }}>
        <h2>Outer Error Boundary (Page Level)</h2>

        <ErrorBoundary level="section" fallbackMessage="Section Level Error">
          <div style={{ padding: '20px', border: '2px solid #3f51b5', borderRadius: '8px', marginTop: '20px' }}>
            <h3>Inner Error Boundary (Section Level)</h3>

            <ErrorBoundary level="component" fallbackMessage="Component Level Error">
              <div style={{ padding: '16px', border: '1px solid #00bcd4', borderRadius: '8px', marginTop: '16px' }}>
                <h4>Innermost Error Boundary (Component Level)</h4>
                <ComponentWithButton />
              </div>
            </ErrorBoundary>
          </div>
        </ErrorBoundary>

        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          <p>This content is outside the inner boundaries but inside the page boundary.</p>
        </div>
      </div>
    </ErrorBoundary>
  ),
};

export const AsyncError: Story = {
  name: '10 Async Error',
  render: () => {
    const AsyncComponent: React.FC = () => {
      const [data, setData] = useState<string | null>(null);
      const [shouldError, setShouldError] = useState(false);

      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (shouldError) {
          throw new Error('Async operation failed');
        }
        setData('Data loaded successfully');
      };

      React.useEffect(() => {
        if (shouldError) {
          fetchData();
        }
      }, [shouldError]);

      return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3>Async Component</h3>
          {data ? <p>{data}</p> : <p>No data loaded yet</p>}
          <Button onClick={() => setShouldError(true)}>
            Trigger Async Error
          </Button>
          <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            Note: Async errors need to be caught and re-thrown to be caught by Error Boundary
          </p>
        </div>
      );
    };

    return (
      <ErrorBoundary>
        <AsyncComponent />
      </ErrorBoundary>
    );
  },
};

export const FormValidationError: Story = {
  name: '11 Form Validation Error',
  render: () => {
    const FormComponent: React.FC = () => {
      const [formData, setFormData] = useState({ name: '', email: '' });
      const [shouldValidate, setShouldValidate] = useState(false);

      if (shouldValidate && !formData.email.includes('@')) {
        throw new Error('Invalid email format - this is a simulated validation error');
      }

      return (
        <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '400px' }}>
          <h3>Form with Error Boundary</h3>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Name:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>Email:</label>
            <input
              type="text"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
              placeholder="Enter an invalid email and submit"
            />
          </div>
          <Button variant="primary" onClick={() => setShouldValidate(true)}>
            Submit (will error if email is invalid)
          </Button>
        </div>
      );
    };

    return (
      <ErrorBoundary fallbackMessage="Form Validation Failed">
        <FormComponent />
      </ErrorBoundary>
    );
  },
};

export const Playground: Story = {
  name: '12 Playground',
  render: () => (
    <div style={{ padding: '20px' }}>
      <h2>Error Boundary Playground</h2>
      <p>Experiment with different error scenarios and boundary levels.</p>

      <ErrorBoundary
        level="section"
        onError={(error) => console.log('Error caught:', error.message)}
      >
        <ComponentWithButton />
      </ErrorBoundary>
    </div>
  ),
};
