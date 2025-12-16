# ODL Design System - Import Guide

How to use the ODL Design System in your projects without copying files.

## 🚀 Method 1: NPM Link (Local Development)

This method creates a symbolic link to use the design system locally across projects.

### Step 1: Build the Design System

```bash
# In the design system directory
npm run build
```

### Step 2: Create NPM Link

```bash
# Still in the design system directory
npm link
```

### Step 3: Link in Your Project

```bash
# In your project directory
cd /path/to/your/project
npm link @odl/design-system
```

### Step 4: Import Components

```tsx
// In your React components
import { Button, Table, Modal, Card } from '@odl/design-system';
import { ODLTheme } from '@odl/design-system';

// Use the components
function MyApp() {
  return (
    <Button variant="primary" size="medium">
      Click Me
    </Button>
  );
}
```

## 📦 Method 2: Direct Package Reference

Add the design system as a dependency using a file path:

### In your project's package.json:

```json
{
  "dependencies": {
    "@odl/design-system": "file:../odl-design-system"
  }
}
```

Then run:
```bash
npm install
```

## 🌐 Method 3: Private NPM Registry (Production)

For production use across multiple projects:

### Step 1: Build for Production

```bash
npm run build
```

### Step 2: Publish to Private Registry

```bash
# Set your private registry (if using one)
npm config set registry https://your-private-registry.com

# Publish the package
npm publish
```

### Step 3: Install in Projects

```bash
npm install @odl/design-system
```

## 💻 Usage Examples

### Basic Component Import

```tsx
import React from 'react';
import { 
  Button, 
  Input, 
  Table, 
  Modal,
  Card,
  Header,
  NavigationRail 
} from '@odl/design-system';

function MyComponent() {
  return (
    <div>
      <Header title="My Application" />
      <Button onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
      <Input 
        type="text" 
        placeholder="Enter text..."
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
```

### Using Theme Values

```tsx
import { ODLTheme } from '@odl/design-system';

const styles = {
  container: {
    padding: ODLTheme.spacing[4],
    backgroundColor: ODLTheme.colors.background,
    color: ODLTheme.colors.text.primary
  }
};
```

### Importing Specific Components

```tsx
// Import only what you need
import Button from '@odl/design-system/dist/components/Button';
import Table from '@odl/design-system/dist/components/Table';
```

## 📋 What Gets Imported

When you import the design system, you get:

- ✅ All 53 React components
- ✅ ODLTheme configuration
- ✅ All component styles
- ✅ TypeScript definitions
- ✅ Utility functions and hooks
- ✅ Carbon icons integration

## 🎨 Styles

The design system styles are included automatically when you import components. No need to import CSS separately.

## 🔧 TypeScript Support

TypeScript definitions are included. Your IDE will provide full IntelliSense support:

```tsx
import { ButtonProps, TableProps } from '@odl/design-system';

const myButtonProps: ButtonProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false
};
```

## ⚠️ Important Notes

1. **Build First**: Always run `npm run build` in the design system before using it in other projects
2. **Peer Dependencies**: Ensure your project has React 18+ installed
3. **Updates**: After making changes to the design system, rebuild and reinstall in consuming projects

## 🔄 Updating the Design System

When you make changes to the design system:

```bash
# In design system directory
npm run build

# Your linked projects will automatically get the updates
# For file: references, you may need to run:
npm install

# For published packages:
npm update @odl/design-system
```

## 🎯 Quick Setup Script

Create this script in your project to quickly set up the design system:

```bash
#!/bin/bash
# setup-odl.sh

echo "Setting up ODL Design System..."

# Build the design system (run from the design system directory)
npm run build

# Link it
npm link

# In your consuming project, run:
# npm link @odl/design-system

echo "✅ ODL Design System built and linked successfully!"
```

## 📝 Example Project Setup

Here's a minimal example of using the design system in a new React project:

```tsx
// App.tsx
import React from 'react';
import { 
  Button, 
  Card, 
  Header,
  ODLTheme 
} from '@odl/design-system';

function App() {
  return (
    <div style={{ minHeight: '100vh', background: ODLTheme.colors.background }}>
      <Header title="My ODL App" />
      <div style={{ padding: ODLTheme.spacing[8] }}>
        <Card>
          <h2>Welcome to My App</h2>
          <p>Built with ODL Design System</p>
          <Button variant="primary">
            Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default App;
```

---

For questions or issues, refer to the main README.md or CLAUDE.md files.