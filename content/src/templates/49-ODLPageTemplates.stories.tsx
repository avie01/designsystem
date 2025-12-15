import type { Meta, StoryObj } from '@storybook/react';
import {
  ODLDashboardTemplate,
  ODLTablePageTemplate,
  ODLFormPageTemplate,
  ODLDetailPageTemplate,
  ODLCardsGridTemplate,
  ODLAppShellTemplate,
} from './ODLPageTemplates';

/**
 * Pure ODL Page Templates
 *
 * These templates are built exclusively with ODL Design System components.
 * No MUI dependencies - showcases the native ODL component library capabilities.
 *
 * **Components Used:**
 * - Button, Input, Dropdown (Form components)
 * - AdvancedTable, Cards, Chip (Data display)
 * - Breadcrumb, SimpleTabs, NavigationRail (Navigation)
 * - Graph, Icon, AlertBanner, Accordion (Utilities)
 *
 * **Usage:**
 * Copy the template you need and customize it for your application.
 */
const meta = {
  title: 'Design System/Templates/ODLPageTemplates',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## Pure ODL Page Templates

A collection of page templates built **exclusively with ODL Design System components** - no MUI dependencies.

### Available Templates

| Template | Description | Key Components |
|----------|-------------|----------------|
| **Dashboard** | Overview page with stats, charts, and activity | StatsCards, Graph, Cards |
| **Table Page** | Data table with search, filters, export | AdvancedTable, Chip, Button |
| **Form Page** | Multi-section form layout | Input, Dropdown, Button |
| **Detail Page** | Entity detail view with tabs and drawer | SimpleTabs, Accordion, Chip, Drawer |
| **Cards Grid** | Grid of project/item cards | Cards, Chip, Button |
| **App Shell** | Full app layout with navigation | NavigationRail, Breadcrumb |

### How to Use

\`\`\`tsx
import { ODLDashboardTemplate } from '@odl/design-system/templates';

// Use as a starting point and customize
function MyDashboard() {
  return <ODLDashboardTemplate />;
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
 * Dashboard template with stats cards, charts, and recent activity.
 *
 * **Components used:**
 * - Breadcrumb
 * - Chip (for trend indicators)
 * - Graph (area and bar charts)
 * - Cards (for activity list)
 */
export const Dashboard: Story = {
  name: '01 Dashboard',
  render: () => <ODLDashboardTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
A comprehensive dashboard layout featuring:
- **Stats Row**: 4 metric cards with trend indicators
- **Charts Section**: Area and bar charts for data visualization
- **Activity Feed**: Recent activity cards list

Perfect for admin dashboards, analytics pages, or home screens.
        `,
      },
    },
  },
};

/**
 * Table page template with AdvancedTable, search, and bulk actions.
 *
 * **Components used:**
 * - Breadcrumb
 * - Button
 * - AlertBanner
 * - AdvancedTable (with Chip for status)
 */
export const TablePage: Story = {
  name: '02 Table Page',
  render: () => <ODLTablePageTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
A data management page featuring:
- **Header**: Title, description, and primary action button
- **Alert Banner**: Shows when rows are selected
- **AdvancedTable**: Full-featured table with sorting, search, pagination, export

Great for user lists, inventory, orders, or any data management page.
        `,
      },
    },
  },
};

/**
 * Form page template with sections and validation-ready inputs.
 *
 * **Components used:**
 * - Breadcrumb
 * - Input (text, email, textarea)
 * - Dropdown
 * - Button
 */
export const FormPage: Story = {
  name: '03 Form Page',
  render: () => <ODLFormPageTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
A multi-section form layout featuring:
- **Section Headers**: Visual separation with colored borders
- **Form Grid**: Responsive 2-column layout
- **Multiple Input Types**: Text, email, dropdown, textarea
- **Action Footer**: Cancel and submit buttons

Ideal for user creation, settings pages, or any data entry form.
        `,
      },
    },
  },
};

/**
 * Detail page template with tabs, expandable sections, and settings drawer.
 *
 * **Components used:**
 * - Breadcrumb
 * - Chip
 * - Button
 * - SimpleTabs
 * - Accordion
 * - Drawer (Settings panel - click "Settings" button to open)
 */
export const DetailPage: Story = {
  name: '04 Detail Page',
  render: () => <ODLDetailPageTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
An entity detail page featuring:
- **Header**: Title, status badge, metadata, and action buttons
- **Tabbed Content**: Overview, Tasks, and Team tabs
- **Progress Bar**: Visual progress indicator
- **Accordion**: Expandable task list
- **Drawer**: Settings panel (click "Settings" button to open)

Perfect for project details, user profiles, or any single-item view.
        `,
      },
    },
  },
};

/**
 * Cards grid template for displaying collections.
 *
 * **Components used:**
 * - Breadcrumb
 * - Button
 * - Chip (for filters and status)
 */
export const CardsGrid: Story = {
  name: '05 Cards Grid',
  render: () => <ODLCardsGridTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
A cards-based overview page featuring:
- **Header**: Title, count, and create button
- **Filter Bar**: Category chips for quick filtering
- **Cards Grid**: Responsive grid of project cards
- **Card Design**: Status badge, description, category, and action

Great for projects, products, articles, or any collection view.
        `,
      },
    },
  },
};

/**
 * Full application shell with Header and dual navigation rails.
 *
 * **Components used:**
 * - Header (Build variant)
 * - NavigationRail (left & right)
 * - Breadcrumb
 * - Chip
 * - Icon
 */
export const AppShell: Story = {
  name: '06 App Shell',
  render: () => <ODLAppShellTemplate />,
  parameters: {
    docs: {
      description: {
        story: `
A complete application shell matching the ODL TemplatesDemo pattern:
- **Header**: Build variant with user profile
- **Left Navigation Rail**: Main navigation with collapsible toggle
- **Right Navigation Rail**: Contextual tools (notifications, profile, search, filters)
- **Content Wrapper Pattern**: Grey outer frame (#EDF1F5) with white inner container
- **Breadcrumb**: Hierarchical navigation
- **Dashboard Cards**: Sample content with icons and chips

This template provides the standard ODL application layout structure.
        `,
      },
    },
  },
};

/**
 * View all ODL templates together for comparison.
 */
export const AllTemplates: Story = {
  name: '07 All Templates',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '60px', padding: '20px', backgroundColor: '#f5f5f5' }}>
      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          1. Dashboard Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <ODLDashboardTemplate />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          2. Table Page Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <ODLTablePageTemplate />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          3. Form Page Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <ODLFormPageTemplate />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          4. Detail Page Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <ODLDetailPageTemplate />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          5. Cards Grid Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
          <ODLCardsGridTemplate />
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '20px', color: '#161616', fontSize: '24px', fontWeight: 600 }}>
          6. App Shell Template
        </h2>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden', height: '600px' }}>
          <ODLAppShellTemplate />
        </div>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'View all ODL page templates in one place for easy comparison and selection.',
      },
    },
  },
};
