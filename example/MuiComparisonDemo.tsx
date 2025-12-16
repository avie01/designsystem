/**
 * Side-by-side comparison of ODL and MUI components
 * Shows how both libraries can work together with the same theme
 */

import React, { useState } from 'react';
import { ODLThemeProvider } from '../src/theme/ODLThemeProvider';

// ODL Components
import ODLButton from '../src/components/Button/Button';
import ODLCard from '../src/components/Card/Card';
import ODLChip from '../src/components/Chip/Chip';
import ODLInput from '../src/components/Input/Input';

// MUI Components with ODL theme
import { Button as MUIButton } from '../src/components-mui/Button';
import { Input as MUIInput } from '../src/components-mui/Input';
import {
  Card as MUICard,
  CardContent,
  Chip as MUIChip,
  Alert as MUIAlert,
  Box,
  Typography,
  Divider,
  Stack,
} from '@mui/material';

const ComparisonSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div style={{
    marginBottom: '48px',
    padding: '24px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
  }}>
    <h2 style={{
      fontSize: '24px',
      fontWeight: 600,
      marginBottom: '24px',
      color: '#111827',
    }}>
      {title}
    </h2>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
    }}>
      {children}
    </div>
  </div>
);

const ComponentColumn: React.FC<{
  title: string;
  children: React.ReactNode;
  type: 'odl' | 'mui';
}> = ({ title, children, type }) => (
  <div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '16px',
      gap: '8px',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 500,
        color: '#374151',
        margin: 0,
      }}>
        {title}
      </h3>
      <span style={{
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 600,
        backgroundColor: type === 'odl' ? '#3560C1' : '#8B5CF6',
        color: 'white',
      }}>
        {type === 'odl' ? 'ODL' : 'MUI'}
      </span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {children}
    </div>
  </div>
);

const MuiComparisonDemo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <ODLThemeProvider enableMui={true}>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        padding: '40px',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Typography variant="h1" component="h1" gutterBottom>
            ODL vs MUI Component Comparison
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Side-by-side comparison showing ODL original components and MUI components with ODL theming
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Buttons Comparison */}
          <ComparisonSection title="Buttons">
            <ComponentColumn title="ODL Button" type="odl">
              <ODLButton variant="primary">Primary Button</ODLButton>
              <ODLButton variant="secondary">Secondary Button</ODLButton>
              <ODLButton variant="tertiary">Tertiary Button</ODLButton>
              <ODLButton variant="ghost">Ghost Button</ODLButton>
              <ODLButton variant="destructive">Destructive Button</ODLButton>
              <ODLButton variant="primary" disabled>Disabled Button</ODLButton>
              <ODLButton variant="primary" loading>Loading Button</ODLButton>
            </ComponentColumn>

            <ComponentColumn title="MUI Button with ODL Theme" type="mui">
              <MUIButton variant="primary">Primary Button</MUIButton>
              <MUIButton variant="secondary">Secondary Button</MUIButton>
              <MUIButton variant="tertiary">Tertiary Button</MUIButton>
              <MUIButton variant="ghost">Ghost Button</MUIButton>
              <MUIButton variant="destructive">Destructive Button</MUIButton>
              <MUIButton variant="primary" disabled>Disabled Button</MUIButton>
              <MUIButton variant="primary" loading>Loading Button</MUIButton>
            </ComponentColumn>
          </ComparisonSection>

          {/* Input Fields Comparison */}
          <ComparisonSection title="Input Fields">
            <ComponentColumn title="ODL Input" type="odl">
              <ODLInput
                label="Text Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
              />
              <ODLInput
                label="Required Input"
                placeholder="This field is required"
                required
              />
              <ODLInput
                label="Disabled Input"
                placeholder="Disabled"
                disabled
                value="Disabled content"
              />
              <ODLInput
                label="Error Input"
                placeholder="Enter valid email"
                error
                helperText="Please enter a valid email address"
              />
            </ComponentColumn>

            <ComponentColumn title="MUI Input with ODL Theme" type="mui">
              <MUIInput
                label="Text Input"
                placeholder="Enter text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <MUIInput
                label="Required Input"
                placeholder="This field is required"
                required
              />
              <MUIInput
                label="Disabled Input"
                placeholder="Disabled"
                disabled
                value="Disabled content"
              />
              <MUIInput
                label="Error Input"
                placeholder="Enter valid email"
                error
                helperText="Please enter a valid email address"
              />
            </ComponentColumn>
          </ComparisonSection>

          {/* Cards Comparison */}
          <ComparisonSection title="Cards">
            <ComponentColumn title="ODL Card" type="odl">
              <ODLCard>
                <div style={{ padding: '16px' }}>
                  <h4 style={{ margin: '0 0 8px 0' }}>ODL Card Title</h4>
                  <p style={{ margin: 0, color: '#6B7280' }}>
                    This is an ODL Card component with standard padding and styling.
                  </p>
                </div>
              </ODLCard>
            </ComponentColumn>

            <ComponentColumn title="MUI Card with ODL Theme" type="mui">
              <MUICard>
                <CardContent>
                  <Typography variant="h6" component="h4" gutterBottom>
                    MUI Card Title
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    This is a MUI Card component with ODL theme styling applied.
                  </Typography>
                </CardContent>
              </MUICard>
            </ComponentColumn>
          </ComparisonSection>

          {/* Chips Comparison */}
          <ComparisonSection title="Chips">
            <ComponentColumn title="ODL Chip" type="odl">
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <ODLChip label="Default" />
                <ODLChip label="Success" variant="green" />
                <ODLChip label="Warning" variant="yellow" />
                <ODLChip label="Error" variant="red" />
                <ODLChip label="Info" variant="blue" />
                <ODLChip label="Deletable" onDelete={() => {}} />
              </div>
            </ComponentColumn>

            <ComponentColumn title="MUI Chip with ODL Theme" type="mui">
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <MUIChip label="Default" />
                <MUIChip label="Success" color="success" />
                <MUIChip label="Warning" color="warning" />
                <MUIChip label="Error" color="error" />
                <MUIChip label="Info" color="info" />
                <MUIChip label="Deletable" onDelete={() => {}} />
              </Stack>
            </ComponentColumn>
          </ComparisonSection>

          {/* Alerts Comparison */}
          <ComparisonSection title="Alerts (MUI Only - No ODL Equivalent Alert)">
            <ComponentColumn title="N/A - Use AlertBanner" type="odl">
              <div style={{ color: '#6B7280', fontStyle: 'italic' }}>
                ODL uses AlertBanner component which has different structure
              </div>
            </ComponentColumn>

            <ComponentColumn title="MUI Alert with ODL Theme" type="mui">
              <MUIAlert severity="success">Success alert with ODL colors</MUIAlert>
              <MUIAlert severity="info">Info alert with ODL colors</MUIAlert>
              <MUIAlert severity="warning">Warning alert with ODL colors</MUIAlert>
              <MUIAlert severity="error">Error alert with ODL colors</MUIAlert>
            </ComponentColumn>
          </ComparisonSection>

          {/* Size Comparison */}
          <ComparisonSection title="Button Sizes">
            <ComponentColumn title="ODL Button Sizes" type="odl">
              <ODLButton variant="primary" size="small">Small Button</ODLButton>
              <ODLButton variant="primary" size="medium">Medium Button</ODLButton>
              <ODLButton variant="primary" size="large">Large Button</ODLButton>
            </ComponentColumn>

            <ComponentColumn title="MUI Button Sizes" type="mui">
              <MUIButton variant="primary" size="small">Small Button</MUIButton>
              <MUIButton variant="primary" size="medium">Medium Button</MUIButton>
              <MUIButton variant="primary" size="large">Large Button</MUIButton>
            </ComponentColumn>
          </ComparisonSection>

          {/* Link to Cards Showcase */}
          <Box sx={{ mt: 4, p: 3, bgcolor: '#E0F3FE', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom color="primary">
              Want to see more MUI card options?
            </Typography>
            <Typography variant="body1" paragraph>
              Check out our collection of 10+ card variations with ODL theming
            </Typography>
            <MUIButton
              variant="primary"
              size="large"
              onClick={() => window.location.href = '/cards-showcase.html'}
            >
              View MUI Cards Collection →
            </MUIButton>
          </Box>

          {/* Performance Notes */}
          <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2, border: 1, borderColor: 'divider' }}>
            <Typography variant="h5" gutterBottom>
              Implementation Notes
            </Typography>
            <Typography variant="body2" paragraph>
              • Both component sets use the same ODL design tokens (colors, spacing, typography)
            </Typography>
            <Typography variant="body2" paragraph>
              • MUI components are wrapped in ODLThemeProvider for consistent theming
            </Typography>
            <Typography variant="body2" paragraph>
              • Custom ODL variants (ghost, tertiary, destructive) are added to MUI theme
            </Typography>
            <Typography variant="body2" paragraph>
              • ODL CSS variables and MUI theme work side-by-side without conflicts
            </Typography>
            <Typography variant="body2">
              • Bundle size will increase with MUI (~40-50kb gzipped for core components)
            </Typography>
          </Box>
        </div>
      </div>
    </ODLThemeProvider>
  );
};

export default MuiComparisonDemo;