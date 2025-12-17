# ODL Component Library

A modern React component library with a comprehensive design system and icon collection.

## Features

- 🎨 **Design System**: Built with design tokens for consistent theming
- 🎯 **TypeScript**: Full TypeScript support with proper type definitions
- 📚 **Storybook**: Interactive documentation and component playground
- 🎨 **Icons**: Extensive icon library organized by categories
- 📦 **Modular**: Easy to import individual components
- 🎨 **Theming**: Support for light and dark themes
- ♿ **Accessible**: Built with accessibility in mind

## Installation

```bash
npm install odl-component-library
```

## Quick Start

```tsx
import { NavigationRail, Icon, DesignTokensProvider } from 'odl-component-library';

function App() {
  const menuItems = [
    { 
      id: 'dashboard', 
      iconName: 'controls-dashboard', 
      label: 'Dashboard', 
      path: '/' 
    },
    // ... more items
  ];

  return (
    <DesignTokensProvider>
      <div style={{ display: 'flex', height: '100vh' }}>
        <NavigationRail
          currentPath="/"
          menuItems={menuItems}
          onNavigate={(path) => console.log('Navigate to:', path)}
        />
        <main style={{ flex: 1, padding: '20px' }}>
          <h1>Your App Content</h1>
        </main>
      </div>
    </DesignTokensProvider>
  );
}
```

## Components

### Header

A professional app header component with navigation, user actions, and branding.

```tsx
import { Header } from 'odl-component-library';

<Header
  title="Dashboard"
  subtitle="Overview of your system metrics"
  showBreadcrumb={true}
  breadcrumbs={[
    { label: 'Home', path: '/' },
    { label: 'Dashboard' }
  ]}
  user={{
    name: 'John Doe',
    email: 'john@example.com'
  }}
/>
```

**Props:**
- `title`: Main title/heading (string)
- `subtitle`: Optional subtitle or description (string)
- `showBreadcrumb`: Whether to show breadcrumb navigation (boolean)
- `breadcrumbs`: Array of breadcrumb items (Array)
- `user`: User profile information (object)
- `actions`: Additional action buttons (ReactNode)
- `compact`: Whether the header is compact (boolean)
- `className`: Additional CSS classes (string)
- `onBreadcrumbClick`: Callback when breadcrumb is clicked (function)

### Icon

A flexible icon component that supports various icon libraries.

```tsx
import { Icon } from 'odl-component-library';

<Icon name="dashboard" className="w-6 h-6" />
<Icon name="search" color="#3560c1" />
```

**Props:**
- `name`: Icon name (string)
- `className`: CSS classes (string)
- `alt`: Alt text for accessibility (string)
- `width`: Icon width (number | string)
- `height`: Icon height (number | string)
- `color`: Icon color (string)
- `onClick`: Click handler (function)

### NavigationRail

A collapsible navigation rail component with support for icons and tooltips.

```tsx
import { NavigationRail } from 'odl-component-library';

<NavigationRail
  currentPath="/dashboard"
  menuItems={menuItems}
  onNavigate={handleNavigate}
  collapsed={false}
  showTooltips={true}
  position="left"
  theme="light"
/>
```

**Props:**
- `currentPath`: Current active path (string)
- `onNavigate`: Navigation callback (function)
- `menuItems`: Array of menu items (MenuItem[])
- `collapsed`: Whether rail is collapsed (boolean)
- `showTooltips`: Show tooltips on hover (boolean)
- `position`: Rail position - 'left' | 'right' (string)
- `theme`: Theme variant - 'light' | 'dark' (string)

### DesignTokensProvider

Provides design tokens context to child components.

```tsx
import { DesignTokensProvider } from 'odl-component-library';

<DesignTokensProvider>
  {/* Your app components */}
</DesignTokensProvider>
```

## Design System

The component library includes a comprehensive design system with:

### Colors
- Light theme colors (white, wave, light-deco, twilight, night, blue-default, active-background)
- Dark theme colors (vacuum, deep-space, dark-deco, moonlight, white, blue, dk-blue)

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- xxl: 48px

### Typography
- Display 2 (H2): 42px, 600 weight
- Heading 4 (H4): 28px, 600 weight
- Heading 5 (H5): 20px, 500 weight
- Body 1 (P Large): 18px, 400 weight
- Body 2 (P Regular): 16px, 400 weight
- Caption 14px (P Small): 14px, 400 weight
- Caption 12px (P Smaller): 12px, 400 weight

### Border Radius
- sm: 4px
- md: 8px
- lg: 12px

## Icon Library

The library uses **IBM Carbon Icons** - a comprehensive, professional icon set with over 1,600 icons. Icons are organized by categories:

- **Navigation**: Dashboard, home, search, settings, menu, arrows, chevrons
- **Actions**: Add, edit, delete, save, cancel, refresh, download, upload
- **Data & Analytics**: Charts, analytics, tables, lists, grids
- **Communication**: Email, chat, phone, video, microphone, camera
- **Files & Documents**: Document, folder, file, image, video, audio
- **Security**: Lock, unlock, shield, key, password, security
- **Development**: Code, terminal, API, database, server, cloud
- **Business**: Users, groups, organizations, buildings, locations
- **Status**: Checkmark, error, warning, information, help
- **System**: Settings, monitors, devices, system controls
- **Weather & Time**: Sun, moon, cloud, rain, clock, timer
- **Social**: Facebook, Twitter, LinkedIn, GitHub, YouTube
- **Utilities**: Filter, sort, zoom, full-screen, resize

## Development

### Setup

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Storybook

```bash
npm run storybook
```

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── Icon/
│   │   ├── Icon.tsx
│   │   └── Icon.stories.tsx
│   └── NavigationRail/
│       ├── NavigationRail.tsx
│       └── NavigationRail.stories.tsx
├── design-system/
│   ├── DesignTokens.tsx
│   └── tokens.ts
└── index.ts
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and stories
5. Submit a pull request

## License

MIT 