import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TableRow,
  // Checkbox,
  Chip,
  IconButton,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
// import Grid from '@mui/material/Grid2'; // Grid2 not available, using Grid instead
import {
  Add as AddIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import './PageTemplates.css';

/**
 * PAGE TEMPLATES
 * Simple wireframe templates with content borders and placeholder content
 * 
 * Usage:
 * 1. Copy the template you need
 * 2. Replace placeholder content with your components
 * 3. Keep the content wrapper structure
 */

/**
 * BASIC PAGE TEMPLATE
 * Standard page with MUI Paper component
 */
export const BasicPageTemplate: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 4, minHeight: '60vh' }}>
        {/* Page Header */}
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: '#161616' }}>
          Page Title
        </Typography>

        {/* Breadcrumb or subtitle */}
        <Typography variant="subtitle1" sx={{ color: '#525252', marginBottom: 3 }}>
          Home / Section / Current Page
        </Typography>

        {/* Divider */}
        <Box sx={{ borderBottom: '1px solid #E0E0E0', marginBottom: 3 }} />

        {/* Main Content */}
        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          This is the main content area using MUI Paper component. The page provides a clean,
          consistent layout with proper spacing and typography following the ODL design system.
        </Typography>

        <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>

        {/* Action buttons example */}
        <Box sx={{ marginTop: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: '#3560C1',
              '&:hover': { bgcolor: '#2850B1' },
              textTransform: 'none'
            }}
          >
            Primary Action
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: '#D1D1D1',
              color: '#525252',
              '&:hover': { borderColor: '#525252' },
              textTransform: 'none'
            }}
          >
            Secondary Action
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

/**
 * DASHBOARD TEMPLATE
 * Page with status cards row at top using MUI
 */
export const DashboardTemplate: React.FC = () => {
  const metrics = [
    { id: 1, label: 'Total Users', value: '1,234', change: '+12%', color: '#3560C1' },
    { id: 2, label: 'Active Projects', value: '56', change: '+5%', color: '#24A148' },
    { id: 3, label: 'Pending Tasks', value: '89', change: '-3%', color: '#F1C21B' },
    { id: 4, label: 'Revenue', value: '$12.5K', change: '+18%', color: '#6929C4' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* Status Cards Row using MUI Grid */}
      <Grid container spacing={3} sx={{ marginBottom: 4 }}>
        {metrics.map(metric => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Typography color="text.secondary" gutterBottom sx={{ fontSize: 12 }}>
                  {metric.label}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: metric.color }}>
                  {metric.value}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 12,
                    mt: 1,
                    color: metric.change.startsWith('+') ? '#24A148' : '#DA1E28'
                  }}
                >
                  {metric.change} from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Area */}
      <Paper sx={{ padding: 3, minHeight: 400 }}>
        <Typography variant="h5" gutterBottom>Dashboard Overview</Typography>
        <Typography>Main dashboard content area using MUI Paper component...</Typography>
      </Paper>
    </Box>
  );
};

/**
 * TABLE LIST TEMPLATE
 * Page with MUI DataGrid
 */
export const TableListTemplate: React.FC = () => {
  const [_selectedRows, setSelectedRows] = useState<any[]>([]);

  // Sample data for DataGrid
  const rows = [
    { id: 1, name: 'Project Alpha', status: 'Active', category: 'Development', lastUpdated: '2024-01-15', owner: 'John Smith' },
    { id: 2, name: 'Marketing Campaign', status: 'Pending', category: 'Marketing', lastUpdated: '2024-01-14', owner: 'Sarah Johnson' },
    { id: 3, name: 'User Research', status: 'Active', category: 'Research', lastUpdated: '2024-01-13', owner: 'Mike Chen' },
    { id: 4, name: 'Bug Fixes', status: 'Inactive', category: 'Development', lastUpdated: '2024-01-12', owner: 'Emma Wilson' },
    { id: 5, name: 'Design System', status: 'Active', category: 'Design', lastUpdated: '2024-01-11', owner: 'David Brown' },
  ];

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={params.value === 'Active' ? 'success' : params.value === 'Pending' ? 'warning' : 'default'}
          sx={{
            backgroundColor: params.value === 'Active' ? '#DEFBE6' :
                           params.value === 'Pending' ? '#FFF1C7' : '#F4F4F4',
            color: params.value === 'Active' ? '#31622C' :
                  params.value === 'Pending' ? '#8E6A00' : '#525252'
          }}
        />
      )
    },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'lastUpdated', headerName: 'Last Updated', width: 150 },
    { field: 'owner', headerName: 'Owner', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: () => (
        <Box>
          <IconButton size="small" sx={{ color: '#3560C1' }}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ color: '#DA1E28' }}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      {/* Action Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#3560C1',
              '&:hover': { bgcolor: '#2850B1' },
              textTransform: 'none'
            }}
          >
            Add New
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            sx={{
              borderColor: '#D1D1D1',
              color: '#3560C1',
              '&:hover': { borderColor: '#3560C1', backgroundColor: 'rgba(53, 96, 193, 0.04)' },
              textTransform: 'none'
            }}
          >
            Filter
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="text"
            startIcon={<DownloadIcon />}
            sx={{ color: '#525252', textTransform: 'none' }}
          >
            Export
          </Button>
          <Button
            variant="text"
            startIcon={<RefreshIcon />}
            sx={{ color: '#525252', textTransform: 'none' }}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      {/* MUI DataGrid */}
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(Array.from(newSelection.ids));
          }}
          sx={{
            '& .MuiDataGrid-cell:focus': {
              outline: '2px solid #3560C1',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F4F4F4',
              fontWeight: 600,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#F9F9F9',
            },
          }}
        />
      </Paper>
    </Box>
  );
};

/**
 * TWO COLUMN TEMPLATE
 * Page with main content and sidebar using MUI Grid
 */
export const TwoColumnTemplate: React.FC = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ padding: 3, minHeight: 600 }}>
            <Typography variant="h5" gutterBottom>Main Content Area</Typography>
            <Typography paragraph>
              This is the main content area using MUI Paper component. It takes up 8 columns on medium+ screens.
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>Sidebar Widget 1</Typography>
            <Typography variant="body2">
              Quick stats, links, or other sidebar content here.
            </Typography>
          </Paper>
          <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>Sidebar Widget 2</Typography>
            <Typography variant="body2">
              Additional sidebar information or controls.
            </Typography>
          </Paper>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <Typography variant="body2">
              Activity feed or notifications.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

/**
 * FORM PAGE TEMPLATE
 * Page with form sections using MUI
 */
export const FormPageTemplate: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    notes: ''
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>User Information Form</Typography>

        {/* Section 1: Personal Information */}
        <Box sx={{ marginTop: 3, marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#3560C1' }}>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
        </Box>

        {/* Section 2: Organization Details */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#3560C1' }}>
            Organization Details
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                >
                  <MenuItem value="">Select Department</MenuItem>
                  <MenuItem value="engineering">Engineering</MenuItem>
                  <MenuItem value="marketing">Marketing</MenuItem>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="hr">Human Resources</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Additional Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => console.log('Cancel clicked')}
            sx={{
              borderColor: '#D1D1D1',
              color: '#525252',
              '&:hover': { borderColor: '#525252' },
              textTransform: 'none'
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => console.log('Save clicked:', formData)}
            sx={{
              bgcolor: '#3560C1',
              '&:hover': { bgcolor: '#2850B1' },
              textTransform: 'none'
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

/**
 * CARDS GRID TEMPLATE
 * Page with grid of cards using MUI
 */
export const CardsGridTemplate: React.FC = () => {
  const cardItems = [
    { id: 1, title: 'Project Alpha', description: 'Development project for new features', status: 'In Progress', color: '#3560C1' },
    { id: 2, title: 'Marketing Campaign', description: 'Q1 2024 marketing initiatives', status: 'Planning', color: '#F1C21B' },
    { id: 3, title: 'User Research', description: 'Customer feedback analysis', status: 'Completed', color: '#24A148' },
    { id: 4, title: 'Bug Fixes', description: 'Priority bug resolution', status: 'In Progress', color: '#3560C1' },
    { id: 5, title: 'Design System', description: 'Component library updates', status: 'Review', color: '#6929C4' },
    { id: 6, title: 'Documentation', description: 'Technical documentation update', status: 'Planning', color: '#F1C21B' },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: 3 }}>Projects Overview</Typography>

      {/* Cards Grid using MUI Grid */}
      <Grid container spacing={3}>
        {cardItems.map(item => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderTop: `4px solid ${item.color}`,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => console.log(`Card ${item.id} clicked`)}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {item.title}
                </Typography>
                <Chip
                  label={item.status}
                  size="small"
                  sx={{
                    marginBottom: 2,
                    backgroundColor: item.status === 'Completed' ? '#DEFBE6' :
                                   item.status === 'In Progress' ? '#E8F4FD' :
                                   item.status === 'Planning' ? '#FFF1C7' : '#F0E5FF',
                    color: item.status === 'Completed' ? '#31622C' :
                          item.status === 'In Progress' ? '#0F62FE' :
                          item.status === 'Planning' ? '#8E6A00' : '#6929C4'
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Last updated: 2 days ago
                  </Typography>
                  <IconButton size="small" sx={{ color: '#3560C1' }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};