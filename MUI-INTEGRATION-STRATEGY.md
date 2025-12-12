# MUI + ODL Parallel Integration Strategy

## Goal
Run MUI components with ODL theming alongside existing ODL components without conflicts

## Recommended Approach: Hybrid Component Library

### 1. Folder Structure
```
src/
├── components/           # Existing ODL components
│   ├── Button/
│   ├── Card/
│   └── ...
├── components-mui/       # MUI-based components
│   ├── Button/
│   │   ├── Button.tsx   # MUI Button with ODL theme
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Card/
│   └── ...
├── theme/
│   ├── ODLTheme.ts      # Existing ODL theme
│   ├── muiTheme.ts      # MUI theme configuration
│   └── ThemeProvider.tsx # Unified theme provider
└── index.ts             # Export both libraries
```

### 2. Naming Convention
To avoid confusion and allow gradual migration:

```typescript
// Explicit imports
import { Button } from '@odl/components';        // ODL version
import { Button } from '@odl/components-mui';    // MUI version

// Or with aliases
import { Button as ODLButton } from '@odl/components';
import { Button as MUIButton } from '@odl/components-mui';
```

### 3. Theme Configuration

#### A. Create MUI Theme from ODL Theme
```typescript
// src/theme/muiTheme.ts
import { createTheme } from '@mui/material/styles';
import { ODLColors, ODLTypography, ODLSpacing } from './ODLTheme';

export const odlMuiTheme = createTheme({
  palette: {
    primary: {
      main: ODLColors.primary,
      light: ODLColors.primaryLight,
      dark: ODLColors.primaryDark,
    },
    secondary: {
      main: ODLColors.text.secondary,
    },
    error: {
      main: ODLColors.error,
      light: ODLColors.errorLight,
    },
    warning: {
      main: ODLColors.warning,
      light: ODLColors.warningLight,
    },
    success: {
      main: ODLColors.success,
      light: ODLColors.successLight,
    },
    background: {
      default: ODLColors.background,
      paper: ODLColors.surface,
    },
    text: {
      primary: ODLColors.text.primary,
      secondary: ODLColors.text.secondary,
      disabled: ODLColors.text.disabled,
    },
  },

  typography: {
    fontFamily: ODLTypography.fontFamily.sans,
    fontSize: 14,
    h1: { fontSize: ODLTypography.fontSize['4xl'] },
    h2: { fontSize: ODLTypography.fontSize['3xl'] },
    h3: { fontSize: ODLTypography.fontSize['2xl'] },
    h4: { fontSize: ODLTypography.fontSize.xl },
    h5: { fontSize: ODLTypography.fontSize.lg },
    h6: { fontSize: ODLTypography.fontSize.md },
    body1: { fontSize: ODLTypography.fontSize.base },
    body2: { fontSize: ODLTypography.fontSize.sm },
    caption: { fontSize: ODLTypography.fontSize.xs },
  },

  spacing: 4, // ODL uses 4px base unit

  shape: {
    borderRadius: 4, // ODL default radius
  },

  components: {
    // Global overrides for all MUI components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // ODL doesn't use uppercase
          borderRadius: '4px',
          transition: 'all 0.2s ease',
        },
      },
      variants: [
        {
          props: { variant: 'ghost' },
          style: {
            backgroundColor: 'transparent',
            color: ODLColors.text.primary,
            '&:hover': {
              backgroundColor: ODLColors.surfaceHover,
            },
          },
        },
        {
          props: { variant: 'tertiary' },
          style: {
            backgroundColor: ODLColors.surface,
            color: ODLColors.text.primary,
            border: `1px solid ${ODLColors.border}`,
            '&:hover': {
              backgroundColor: ODLColors.surfaceHover,
            },
          },
        },
      ],
    },
    // ... more component overrides
  },
});
```

#### B. Unified Theme Provider
```typescript
// src/theme/ThemeProvider.tsx
import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { odlMuiTheme } from './muiTheme';

interface ODLThemeProviderProps {
  children: React.ReactNode;
  useMui?: boolean;
}

export const ODLThemeProvider: React.FC<ODLThemeProviderProps> = ({
  children,
  useMui = false
}) => {
  if (useMui) {
    return (
      <MuiThemeProvider theme={odlMuiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  // For ODL components, just pass through (they use CSS variables)
  return <>{children}</>;
};
```

### 4. Component Migration Pattern

#### Phase 1: Parallel Development
Create MUI versions alongside ODL:

```typescript
// src/components-mui/Button/Button.tsx
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Extend MUI props to support ODL variants
interface ODLButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive';
}

// Map ODL variants to MUI variants + custom styling
const StyledButton = styled(MuiButton)<ODLButtonProps>(({ theme, variant }) => ({
  // Custom styles based on ODL variant
}));

export const Button: React.FC<ODLButtonProps> = ({ variant = 'primary', ...props }) => {
  // Map ODL variants to MUI variants
  const muiVariant = variant === 'primary' ? 'contained' :
                     variant === 'secondary' ? 'outlined' :
                     'text';

  return <StyledButton variant={muiVariant} {...props} />;
};
```

### 5. Gradual Migration Strategy

#### Stage 1: Setup (Week 1)
- [ ] Install MUI dependencies
- [ ] Create MUI theme configuration
- [ ] Set up parallel folder structure
- [ ] Create ThemeProvider wrapper

#### Stage 2: Core Components (Week 2)
- [ ] Migrate Button with all ODL variants
- [ ] Migrate Input/TextField
- [ ] Migrate Card
- [ ] Create comparison demos

#### Stage 3: Testing & Validation (Week 3)
- [ ] Side-by-side visual comparison
- [ ] Performance testing
- [ ] Bundle size analysis
- [ ] Accessibility audit

### 6. Usage in Application

```typescript
// App.tsx - Using both libraries
import React from 'react';
import { ODLThemeProvider } from './theme/ThemeProvider';
import { Button as ODLButton } from './components/Button';
import { Button as MUIButton } from './components-mui/Button';

function App() {
  return (
    <ODLThemeProvider useMui>
      <div>
        <h2>ODL Original</h2>
        <ODLButton variant="primary">ODL Button</ODLButton>

        <h2>MUI with ODL Theme</h2>
        <MUIButton variant="primary">MUI Button</MUIButton>
      </div>
    </ODLThemeProvider>
  );
}
```

### 7. Export Strategy

```typescript
// src/index.ts - Separate exports
export * from './components';     // ODL components
export * as MUI from './components-mui'; // MUI components

// Usage in consuming app
import { Button } from '@odl/design-system';         // ODL Button
import { MUI } from '@odl/design-system';            // MUI.Button
```

### 8. Storybook Organization

```typescript
// .storybook/preview.js
export const parameters = {
  // Organize stories by library
  options: {
    storySort: {
      order: [
        'ODL Components',
        'MUI Components',
        'Comparison',
        '*'
      ],
    },
  },
};
```

Create comparison stories:
```typescript
// stories/Comparison.stories.tsx
import { Button as ODLButton } from '../components/Button';
import { Button as MUIButton } from '../components-mui/Button';

export const ButtonComparison = () => (
  <div style={{ display: 'flex', gap: '20px' }}>
    <div>
      <h3>ODL Button</h3>
      <ODLButton>Click me</ODLButton>
    </div>
    <div>
      <h3>MUI Button</h3>
      <MUIButton>Click me</MUIButton>
    </div>
  </div>
);
```

### 9. Package.json Configuration

```json
{
  "name": "@odl/design-system",
  "exports": {
    ".": {
      "import": "./dist/index.js"
    },
    "./odl": {
      "import": "./dist/components/index.js"
    },
    "./mui": {
      "import": "./dist/components-mui/index.js"
    }
  },
  "dependencies": {
    "@mui/material": "^5.x.x",
    "@emotion/react": "^11.x.x",
    "@emotion/styled": "^11.x.x"
  }
}
```

### 10. Migration Checklist

#### Pre-Migration
- [ ] Audit current component usage
- [ ] Identify high-traffic components for priority
- [ ] Set up monitoring for A/B testing

#### During Migration
- [ ] Maintain backward compatibility
- [ ] Document breaking changes
- [ ] Create migration guide for consumers

#### Post-Migration
- [ ] Deprecation notices for ODL components
- [ ] Performance comparison report
- [ ] Bundle size analysis
- [ ] Update documentation

## Benefits of This Approach

1. **No Breaking Changes**: Both libraries coexist
2. **Gradual Migration**: Teams can adopt MUI components incrementally
3. **A/B Testing**: Can compare performance and UX
4. **Rollback Safety**: ODL components remain available
5. **Clear Separation**: No confusion about which version is being used
6. **Shared Theme**: Single source of truth for design tokens

## Potential Issues & Solutions

### Issue 1: Bundle Size
**Solution**: Use dynamic imports and tree shaking
```typescript
const MUIButton = lazy(() => import('./components-mui/Button'));
```

### Issue 2: Style Conflicts
**Solution**: CSS Modules or styled-components scoping
```typescript
// Use MUI's styled API for isolation
const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'odlVariant',
})(({ theme }) => ({
  // Isolated styles
}));
```

### Issue 3: Theme Context Conflicts
**Solution**: Separate providers or unified wrapper
```typescript
<ODLProvider>
  <MuiThemeProvider theme={odlMuiTheme}>
    {/* Components work with both themes */}
  </MuiThemeProvider>
</ODLProvider>
```

## Decision Points

1. **Should we use MUI paid components?** (DataGrid Pro for tables)
2. **When to deprecate ODL components?** (After validation period)
3. **How to handle custom ODL components?** (Keep as-is or wrap)
4. **Bundle strategy?** (Separate bundles vs. unified)

## Next Steps

1. **Proof of Concept**: Implement Button and Input with MUI
2. **Performance Test**: Compare render times and bundle sizes
3. **Team Review**: Get feedback on DX and migration path
4. **Documentation**: Create comprehensive migration guide
5. **Tooling**: Set up automated visual regression tests