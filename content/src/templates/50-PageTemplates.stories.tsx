import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BasicPageTemplate,
  DashboardTemplate,
  TableListTemplate,
  TwoColumnTemplate,
  FormPageTemplate,
  CardsGridTemplate
} from './PageTemplates';

// Create ODL-themed MUI theme
const odlTheme = createTheme({
  palette: {
    primary: {
      main: '#3560C1',
      light: '#E0F3FE',
      dark: '#2A4FA3',
    },
    success: {
      main: '#24A148',
      light: '#DEFBE6',
      dark: '#1B4721',
    },
    error: {
      main: '#DA1E28',
      light: '#FFD7D9',
    },
    warning: {
      main: '#F1C21B',
      light: '#FFF1C7',
    },
    info: {
      main: '#0F62FE',
      light: '#E8F4FD',
    },
    text: {
      primary: '#161616',
      secondary: '#525252',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F4F4F4',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

// Decorator to wrap all stories with MUI theme
const withTheme = (Story: any) => (
  <ThemeProvider theme={odlTheme}>
    <CssBaseline />
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Story />
    </div>
  </ThemeProvider>
);

const meta = {
  title: 'Design System/Templates/PageTemplates',
  decorators: [withTheme],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A collection of page templates built with Material-UI components and ODL theming. These templates provide ready-to-use layouts for common application pages.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicPage: Story = {
  name: '01 Basic Page',
  render: () => <BasicPageTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'A simple page template with header, title, and content area using MUI Paper component.',
      },
    },
  },
};

export const Dashboard: Story = {
  render: () => <DashboardTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Dashboard template with metric cards and content sections. Includes hover effects and status indicators.',
      },
    },
  },
};

export const TableList: Story = {
  name: '03 Table List',
  render: () => <TableListTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Table list template featuring MUI DataGrid with sorting, filtering, and pagination capabilities.',
      },
    },
  },
};

export const TwoColumn: Story = {
  render: () => <TwoColumnTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Two-column layout template with main content area and sidebar widgets. Responsive design adjusts to screen size.',
      },
    },
  },
};

export const FormPage: Story = {
  name: '05 Form Page',
  render: () => <FormPageTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Form template with multiple sections, various input types, and form validation. Includes text fields, selects, and action buttons.',
      },
    },
  },
};

export const CardsGrid: Story = {
  name: '06 Cards Grid',
  render: () => <CardsGridTemplate />,
  parameters: {
    docs: {
      description: {
        story: 'Cards grid template for displaying collections of items. Each card includes status chips, hover effects, and action buttons.',
      },
    },
  },
};

// Composite story showing multiple templates
export const AllTemplates: Story = {
  name: '07 All Templates',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Basic Page Template</h2>
        <BasicPageTemplate />
      </div>
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Dashboard Template</h2>
        <DashboardTemplate />
      </div>
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Table List Template</h2>
        <TableListTemplate />
      </div>
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Two Column Template</h2>
        <TwoColumnTemplate />
      </div>
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Form Page Template</h2>
        <FormPageTemplate />
      </div>
      <div style={{ borderTop: '2px solid #e0e0e0', paddingTop: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: '#161616' }}>Cards Grid Template</h2>
        <CardsGridTemplate />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'View all available MUI page templates in one place. Useful for comparing different layout options.',
      },
    },
  },
};