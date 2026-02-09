import type { Meta, StoryObj } from '@storybook/react';
import {
  ODLAppShellWrapper,
} from './ODLPageTemplates';

/**
 * Blank Page Templates
 *
 * These templates are built exclusively with ODL Design System components.
 * No MUI dependencies - showcases the native ODL component library capabilities.
 *
 * **Components Used:**
 * - Header, NavigationRail, Breadcrumb (Navigation)
 *
 * **Usage:**
 * Copy the template you need and customize it for your application.
 */
const meta = {
  title: 'Design System/Templates/BlankTemplates',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Blank Page Templates

A collection of page templates built **exclusively with ODL Design System components** - no MUI dependencies.

### Available Templates

| Template | Description | Key Components |
|----------|-------------|----------------|
| **Full Page** | Blank page with header, left nav, title | Header, NavigationRail (left), Breadcrumb |

### How to Use

\`\`\`tsx
import { ODLAppShellWrapper } from '@odl/design-system/templates';

// Use as a starting point and customize
function MyPage() {
  return (
    <ODLAppShellWrapper
      pageTitle="Page Title"
      pageSubtitle="Description"
      showRightPanel={false}
    >
      {/* Your content here */}
    </ODLAppShellWrapper>
  );
}
\`\`\`
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full page template with header, left navigation rail, title and description.
 *
 * **Components used:**
 * - Header (Build variant)
 * - NavigationRail (left only)
 * - Breadcrumb
 */
export const FullPage: Story = {
  name: '01 Full page',
  render: () => (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Page Title"
      pageSubtitle="A brief description of what this page is about."
      showRightPanel={false}
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Page Title' },
      ]}
    >
      {null}
    </ODLAppShellWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A blank full page template featuring:
- **Header**: Build variant with user profile
- **Left Navigation Rail**: Main navigation with collapsible toggle
- **Breadcrumb**: Hierarchical navigation
- **Page Title (H1)**: Main heading
- **Page Subtitle**: Description text

Use this as a starting point and add your own content.
        `,
      },
    },
  },
};

/**
 * Full page template with header, left navigation rail, left panel, title and description.
 *
 * **Components used:**
 * - Header (Build variant)
 * - NavigationRail (left only)
 * - Left Panel
 * - Breadcrumb
 */
export const WithLeftPanel: Story = {
  name: '02 With Left Panel',
  render: () => (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Page Title"
      pageSubtitle="A brief description of what this page is about."
      showLeftPanel={true}
      showRightPanel={false}
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Page Title' },
      ]}
    >
      {null}
    </ODLAppShellWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A blank full page template featuring:
- **Header**: Build variant with user profile
- **Left Navigation Rail**: Main navigation with collapsible toggle
- **Left Panel**: Additional panel for secondary navigation or filters
- **Breadcrumb**: Hierarchical navigation
- **Page Title (H1)**: Main heading
- **Page Subtitle**: Description text

Use this as a starting point and add your own content.
        `,
      },
    },
  },
};

/**
 * Full page template with header, left navigation rail, right panel, title and description.
 *
 * **Components used:**
 * - Header (Build variant)
 * - NavigationRail (left and right)
 * - Right Panel
 * - Breadcrumb
 */
export const WithRightPanel: Story = {
  name: '03 With Right Panel',
  render: () => (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Page Title"
      pageSubtitle="A brief description of what this page is about."
      showRightPanel={true}
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Page Title' },
      ]}
    >
      {null}
    </ODLAppShellWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A blank full page template featuring:
- **Header**: Build variant with user profile
- **Left Navigation Rail**: Main navigation with collapsible toggle
- **Right Navigation Rail**: Contextual tools
- **Right Panel**: Click right nav icons to open panels
- **Breadcrumb**: Hierarchical navigation
- **Page Title (H1)**: Main heading
- **Page Subtitle**: Description text

Use this as a starting point and add your own content.
        `,
      },
    },
  },
};

/**
 * Full page template with header, left navigation rail, both panels, title and description.
 *
 * **Components used:**
 * - Header (Build variant)
 * - NavigationRail (left and right)
 * - Left Panel
 * - Right Panel
 * - Breadcrumb
 */
export const WithBothPanels: Story = {
  name: '04 With Both Panels',
  render: () => (
    <ODLAppShellWrapper
      currentPage="/dashboard"
      pageTitle="Page Title"
      pageSubtitle="A brief description of what this page is about."
      showLeftPanel={true}
      showRightPanel={true}
      breadcrumbItems={[
        { label: 'Home', path: '/' },
        { label: 'Page Title' },
      ]}
    >
      {null}
    </ODLAppShellWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: `
A blank full page template featuring:
- **Header**: Build variant with user profile
- **Left Navigation Rail**: Main navigation with collapsible toggle
- **Left Panel**: Additional panel for secondary navigation or filters
- **Right Navigation Rail**: Contextual tools
- **Right Panel**: Click right nav icons to open panels
- **Breadcrumb**: Hierarchical navigation
- **Page Title (H1)**: Main heading
- **Page Subtitle**: Description text

Use this as a starting point and add your own content.
        `,
      },
    },
  },
};
