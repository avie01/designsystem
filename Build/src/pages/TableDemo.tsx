import React, { useState, useMemo } from 'react';
import Table from '../components/Table/Table';
import AdvancedTable from '../components/AdvancedTable/AdvancedTable';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import Chip from '../components/Chip/Chip';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import { TableRowData } from '../types/common';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

interface BasicTableData extends TableRowData {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinDate: string;
  salary: number;
  [key: string]: unknown;
}

interface ProductData extends TableRowData {
  id: number;
  product: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  lastRestocked: string;
  [key: string]: unknown;
}

// Date formatting function
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const TableDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'advanced' | 'products' | 'interactive' | 'performance'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [tableSettings, setTableSettings] = useState({
    paginated: true,
    selectable: true,
    striped: true,
    hoverable: true,
    compact: false,
    bordered: false,
  });
  const [loadingData, setLoadingData] = useState(false);

  // Sample data for basic table
  const basicTableData: BasicTableData[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Developer', department: 'Engineering', status: 'Active', joinDate: '2023-01-15', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Designer', department: 'Design', status: 'Active', joinDate: '2023-02-20', salary: 70000 },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'Manager', department: 'Management', status: 'Active', joinDate: '2022-11-10', salary: 85000 },
    { id: 4, name: 'Alice Brown', email: 'alice.brown@example.com', role: 'Developer', department: 'Engineering', status: 'Inactive', joinDate: '2023-03-05', salary: 72000 },
    { id: 5, name: 'Charlie Wilson', email: 'charlie.wilson@example.com', role: 'Analyst', department: 'Analytics', status: 'Active', joinDate: '2023-04-12', salary: 65000 },
    { id: 6, name: 'Emma Davis', email: 'emma.davis@example.com', role: 'Developer', department: 'Engineering', status: 'Active', joinDate: '2023-05-18', salary: 78000 },
    { id: 7, name: 'Frank Miller', email: 'frank.miller@example.com', role: 'Designer', department: 'Design', status: 'Pending', joinDate: '2023-06-22', salary: 68000 },
    { id: 8, name: 'Grace Lee', email: 'grace.lee@example.com', role: 'Product Manager', department: 'Product', status: 'Active', joinDate: '2022-09-30', salary: 90000 },
    { id: 9, name: 'Henry Taylor', email: 'henry.taylor@example.com', role: 'QA Engineer', department: 'Quality', status: 'Active', joinDate: '2023-07-08', salary: 62000 },
    { id: 10, name: 'Ivy Chen', email: 'ivy.chen@example.com', role: 'DevOps', department: 'Engineering', status: 'Active', joinDate: '2023-08-14', salary: 80000 },
    { id: 11, name: 'Jack Anderson', email: 'jack.anderson@example.com', role: 'Marketing Manager', department: 'Marketing', status: 'Active', joinDate: '2023-01-25', salary: 75000 },
    { id: 12, name: 'Kelly White', email: 'kelly.white@example.com', role: 'HR Manager', department: 'Human Resources', status: 'Active', joinDate: '2022-10-15', salary: 70000 },
    { id: 13, name: 'Leo Martinez', email: 'leo.martinez@example.com', role: 'Senior Developer', department: 'Engineering', status: 'Active', joinDate: '2022-08-20', salary: 95000 },
    { id: 14, name: 'Maya Patel', email: 'maya.patel@example.com', role: 'UX Designer', department: 'Design', status: 'Active', joinDate: '2023-09-10', salary: 72000 },
    { id: 15, name: 'Nathan Green', email: 'nathan.green@example.com', role: 'Data Scientist', department: 'Analytics', status: 'Pending', joinDate: '2023-10-05', salary: 88000 },
  ];

  // Sample product data
  const productData: ProductData[] = [
    { id: 1, product: 'Laptop Pro 15"', category: 'Electronics', price: 1299.99, stock: 45, rating: 4.5, lastRestocked: '2024-01-15' },
    { id: 2, product: 'Wireless Mouse', category: 'Accessories', price: 29.99, stock: 150, rating: 4.2, lastRestocked: '2024-01-20' },
    { id: 3, product: 'USB-C Hub', category: 'Accessories', price: 49.99, stock: 80, rating: 4.7, lastRestocked: '2024-01-18' },
    { id: 4, product: 'Monitor 27"', category: 'Electronics', price: 399.99, stock: 30, rating: 4.6, lastRestocked: '2024-01-10' },
    { id: 5, product: 'Mechanical Keyboard', category: 'Accessories', price: 129.99, stock: 65, rating: 4.8, lastRestocked: '2024-01-22' },
    { id: 6, product: 'Webcam HD', category: 'Electronics', price: 79.99, stock: 95, rating: 4.1, lastRestocked: '2024-01-25' },
    { id: 7, product: 'Desk Lamp LED', category: 'Office', price: 39.99, stock: 120, rating: 4.3, lastRestocked: '2024-01-12' },
    { id: 8, product: 'Standing Desk', category: 'Furniture', price: 599.99, stock: 20, rating: 4.7, lastRestocked: '2024-01-08' },
    { id: 9, product: 'Office Chair', category: 'Furniture', price: 299.99, stock: 35, rating: 4.4, lastRestocked: '2024-01-14' },
    { id: 10, product: 'Headphones Wireless', category: 'Audio', price: 199.99, stock: 55, rating: 4.6, lastRestocked: '2024-01-19' },
  ];

  // Generate large dataset for performance testing
  const generateLargeDataset = (count: number = 1000): BasicTableData[] => {
    const departments = ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations', 'Finance'];
    const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Coordinator', 'Director', 'Specialist'];
    const statuses: ('Active' | 'Inactive' | 'Pending')[] = ['Active', 'Inactive', 'Pending'];
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson', 'Emma Davis', 'Frank Miller'];
    
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `${names[i % names.length]} ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: roles[i % roles.length],
      department: departments[i % departments.length],
      status: statuses[i % statuses.length],
      joinDate: new Date(2020 + Math.floor(i / 365), (i % 12), 1 + (i % 28)).toISOString().split('T')[0],
      salary: 45000 + (i % 50) * 1000 + Math.floor(Math.random() * 10000)
    }));
  };

  const performanceData = useMemo(() => generateLargeDataset(1000), []);

  // Function to simulate loading data
  const simulateDataLoading = async () => {
    setLoadingData(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    setLoadingData(false);
  };

  const basicColumns = [
    { key: 'name', label: 'Name', sortable: true, width: '15%' },
    { key: 'email', label: 'Email', sortable: true, width: '18%' },
    { key: 'role', label: 'Role', sortable: true, width: '12%' },
    { key: 'department', label: 'Department', sortable: true, width: '12%' },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      width: '10%',
      render: (item: BasicTableData) => {
        const statusVariants: { [key: string]: { variant: 'lightGreen' | 'red' | 'yellow' | 'grey', icon?: string } } = {
          'Active': { variant: 'lightGreen', icon: 'checkmark-filled' },
          'Inactive': { variant: 'red', icon: 'error-filled' },
          'Pending': { variant: 'yellow', icon: 'warning' }
        };
        const config = statusVariants[item.status] || { variant: 'grey' };
        return (
          <Chip 
            label={item.status} 
            variant={config.variant}
            iconName={config.icon}
          />
        );
      }
    },
    { 
      key: 'joinDate', 
      label: 'Join Date', 
      sortable: true,
      width: '13%',
      render: (item: BasicTableData) => formatDate(item.joinDate)
    },
    { 
      key: 'salary', 
      label: 'Salary', 
      sortable: true,
      width: '10%',
      render: (item: BasicTableData) => `$${item.salary.toLocaleString()}`
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '10%',
      render: (item: BasicTableData) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: ODLTheme.spacing[1] }}>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit', item);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon name="edit" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            title="View"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View', item);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon name="view" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            title="More options"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options', item);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </button>
        </div>
      )
    },
  ];

  const productColumns = [
    { key: 'product', label: 'Product Name', sortable: true, width: '22%' },
    { key: 'category', label: 'Category', sortable: true, width: '13%' },
    { 
      key: 'price', 
      label: 'Price', 
      sortable: true,
      width: '12%',
      render: (item: ProductData) => `$${item.price.toFixed(2)}`
    },
    { 
      key: 'stock', 
      label: 'Stock', 
      sortable: true,
      width: '13%',
      render: (item: ProductData) => (
        <span className={item.stock < 50 ? 'low-stock' : 'in-stock'}>
          {item.stock} units
        </span>
      )
    },
    { 
      key: 'rating', 
      label: 'Rating', 
      sortable: true,
      width: '10%',
      render: (item: ProductData) => `⭐ ${item.rating}/5`
    },
    { 
      key: 'lastRestocked', 
      label: 'Last Restocked', 
      sortable: true,
      width: '18%',
      render: (item: ProductData) => formatDate(item.lastRestocked)
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '12%',
      render: (item: ProductData) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: ODLTheme.spacing[1] }}>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit product', item);
            }}
          >
            <Icon name="edit" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="View"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View product', item);
            }}
          >
            <Icon name="view" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="More options"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for product', item);
            }}
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </button>
        </div>
      )
    },
  ];

  const advancedColumns = [
    { key: 'name', label: 'Employee Name', sortable: true, filterable: true, width: '15%' },
    { key: 'email', label: 'Email Address', sortable: true, filterable: true, width: '18%' },
    { key: 'role', label: 'Job Role', sortable: true, filterable: true, width: '12%' },
    { key: 'department', label: 'Department', sortable: true, filterable: true, width: '12%' },
    { key: 'status', label: 'Status', sortable: true, filterable: true, width: '10%' },
    { 
      key: 'joinDate', 
      label: 'Join Date',
      sortable: true,
      width: '13%',
      render: (item: any) => formatDate(item.joinDate)
    },
    { key: 'salary', label: 'Annual Salary', sortable: true, width: '10%' },
    {
      key: 'actions',
      label: 'Actions',
      width: '10%',
      render: (item: any) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: ODLTheme.spacing[1] }}>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Edit employee', item);
            }}
          >
            <Icon name="edit" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="View"
            onClick={(e) => {
              e.stopPropagation();
              console.log('View employee', item);
            }}
          >
            <Icon name="view" size={16} />
          </button>
          <button 
            style={{
              padding: ODLTheme.spacing[1],
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: 'none',
              borderRadius: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.primary;
              e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = ODLTheme.colors.text.secondary;
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title="More options"
            onClick={(e) => {
              e.stopPropagation();
              console.log('More options for employee', item);
            }}
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Table Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Table Component Showcase</h1>
            <p>Comprehensive demonstration of table features with interactive controls and live examples</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
            <Button
              variant="secondary"
              size="small"
              loading={loadingData}
              onClick={simulateDataLoading}
            >
              Refresh Data
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Demo Selector with descriptions */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { 
              key: 'basic', 
              label: 'Basic Table', 
              icon: '📋'
            },
            { 
              key: 'products', 
              label: 'Product Catalog', 
              icon: '🛍️'
            },
            { 
              key: 'advanced', 
              label: 'Advanced Features', 
              icon: '⚡'
            },
            { 
              key: 'interactive', 
              label: 'Interactive Demo', 
              icon: '🎛️'
            },
            { 
              key: 'performance', 
              label: 'Performance Test', 
              icon: '🚀'
            }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Settings Panel for Interactive Demo */}
      {selectedDemo === 'interactive' && (
        <div className={styles.settingsPanel} style={{
          background: `linear-gradient(135deg, ${ODLTheme.colors.background} 0%, ${ODLTheme.colors.surface} 100%)`,
          borderRadius: ODLTheme.spacing[3],
          padding: ODLTheme.spacing[6],
          marginBottom: ODLTheme.spacing[8],
          border: `${ODLTheme.spacing[0]} solid ${ODLTheme.colors.border}`
        }}>
          <h3 style={{
            fontSize: ODLTheme.typography.fontSize.lg,
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            color: ODLTheme.colors.text.primary,
            marginBottom: ODLTheme.spacing[6],
            display: 'flex',
            alignItems: 'center',
            gap: ODLTheme.spacing[2]
          }}>
            <Icon name="settings" size={20} style={{ color: ODLTheme.colors.primary }} />
            Live Configuration
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: ODLTheme.spacing[4]
          }}>
            {Object.entries(tableSettings).map(([key, value]) => {
              const labels: { [key: string]: { label: string, description: string, icon: string } } = {
                paginated: { 
                  label: 'Pagination', 
                  description: 'Split data across pages',
                  icon: 'page-first'
                },
                selectable: { 
                  label: 'Row Selection', 
                  description: 'Enable checkbox selection',
                  icon: 'checkbox-checked'
                },
                striped: { 
                  label: 'Striped Rows', 
                  description: 'Alternate row colors',
                  icon: 'list'
                },
                hoverable: { 
                  label: 'Hover Effect', 
                  description: 'Highlight on hover',
                  icon: 'cursor-1'
                },
                compact: { 
                  label: 'Compact Mode', 
                  description: 'Reduced padding',
                  icon: 'minimize'
                },
                bordered: { 
                  label: 'Borders', 
                  description: 'Show cell borders',
                  icon: 'border-full'
                }
              };
              
              const config = labels[key] || { label: key, description: '', icon: 'settings' };
              
              return (
                <label 
                  key={key} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    padding: ODLTheme.spacing[4],
                    borderRadius: ODLTheme.spacing[2],
                    background: value ? 'white' : ODLTheme.colors.surface,
                    border: value ? `${ODLTheme.spacing[0]} solid ${ODLTheme.colors.primary}` : `${ODLTheme.spacing[0]} solid transparent`,
                    cursor: 'pointer',
                    transition: ODLTheme.transitions.base,
                    position: 'relative',
                    boxShadow: value ? `0 ${ODLTheme.spacing[0]} ${ODLTheme.spacing[2]} ${ODLTheme.colors.primary}20` : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!value) {
                      e.currentTarget.style.background = ODLTheme.colors.background;
                      e.currentTarget.style.borderColor = ODLTheme.colors.border;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!value) {
                      e.currentTarget.style.background = ODLTheme.colors.surface;
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setTableSettings(prev => ({
                      ...prev,
                      [key]: e.target.checked
                    }))}
                    style={{
                      width: '20px',
                      height: '20px',
                      marginRight: ODLTheme.spacing[3],
                      marginTop: '2px',
                      cursor: 'pointer',
                      accentColor: ODLTheme.colors.primary
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.base,
                      fontWeight: value ? ODLTheme.typography.fontWeight.semibold : ODLTheme.typography.fontWeight.medium,
                      color: value ? ODLTheme.colors.primary : ODLTheme.colors.text.primary,
                      marginBottom: ODLTheme.spacing[1],
                      display: 'flex',
                      alignItems: 'center',
                      gap: ODLTheme.spacing[2]
                    }}>
                      {config.label}
                      {value && (
                        <span style={{
                          fontSize: ODLTheme.typography.fontSize.xs,
                          padding: `${ODLTheme.spacing[0]} ${ODLTheme.spacing[2]}`,
                          background: `${ODLTheme.colors.primary}20`,
                          color: ODLTheme.colors.primary,
                          borderRadius: ODLTheme.spacing[1],
                          fontWeight: ODLTheme.typography.fontWeight.medium
                        }}>
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div style={{
                      fontSize: ODLTheme.typography.fontSize.sm,
                      color: ODLTheme.colors.text.secondary,
                      lineHeight: 1.3
                    }}>
                      {config.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          <div style={{
            marginTop: ODLTheme.spacing[6],
            padding: ODLTheme.spacing[4],
            background: `${ODLTheme.colors.primary}20`,
            borderRadius: ODLTheme.spacing[2],
            display: 'flex',
            alignItems: 'center',
            gap: ODLTheme.spacing[3]
          }}>
            <Icon name="information" size={20} style={{ color: ODLTheme.colors.primary }} />
            <p style={{
              fontSize: ODLTheme.typography.fontSize.base,
              color: ODLTheme.colors.text.secondary,
              margin: 0
            }}>
              Toggle these options to see how they affect the table appearance and behavior in real-time.
            </p>
          </div>
        </div>
      )}

      {/* Enhanced Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Table with Core Features</h2>
              <p>Demonstrates essential table functionality including sorting, pagination, and row selection</p>
            </div>
            <div className={styles.tableContainer}>
              <Table
                data={basicTableData}
                columns={basicColumns}
                pageSize={5}
                paginated={true}
                selectable={true}
                striped={true}
                hoverable={true}
                title="Employee Directory"
                headerActions={
                  <>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Download"
                    >
                      <Icon name="download" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Filter"
                    >
                      <Icon name="filter" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Settings"
                    >
                      <Icon name="settings" size={20} />
                    </button>
                  </>
                }
                onRowSelect={(selected) => console.log('Selected rows:', selected)}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'products' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Product Inventory Management</h2>
              <p>Showcases custom formatting, conditional styling, and business data presentation</p>
            </div>
            <div className={styles.tableContainer}>
              <Table
                data={productData}
                columns={productColumns}
                pageSize={5}
                paginated={true}
                selectable={true}
                striped={true}
                hoverable={true}
                title="Product Inventory"
                onRowSelect={(selected) => console.log('Product table - Selected rows:', selected)}
                headerActions={
                  <>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Add Product"
                    >
                      <Icon name="add" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Export"
                    >
                      <Icon name="download" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: `${ODLTheme.spacing[1]} ${ODLTheme.spacing[2]}`,
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        transition: ODLTheme.transitions.base
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      title="Refresh"
                    >
                      <Icon name="renew" size={20} />
                    </button>
                  </>
                }
              />
            </div>
          </div>
        )}

        {selectedDemo === 'advanced' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Advanced Table with Full Feature Set</h2>
              <p>Complete feature demonstration including search, filters, column controls, and export functionality</p>
            </div>
            <div className={styles.tableContainer}>
              <AdvancedTable
                data={basicTableData}
                columns={advancedColumns}
                itemsPerPage={8}
                paginated={true}
                selectable={true}
                showSearch={true}
                showColumnToggle={true}
                showExport={true}
                showBulkActions={true}
                bulkActions={[
                  {
                    label: 'Archive Selected',
                    action: (items) => {
                      console.log('Archiving items:', items);
                      alert(`Archiving ${items.length} employee${items.length !== 1 ? 's' : ''}`);
                    },
                    variant: 'secondary'
                  },
                  {
                    label: 'Send Email',
                    action: (items) => {
                      console.log('Sending email to:', items);
                      alert(`Sending email to ${items.length} employee${items.length !== 1 ? 's' : ''}`);
                    },
                    variant: 'primary'
                  },
                  {
                    label: 'Delete Selected',
                    action: (items) => {
                      if (confirm(`Are you sure you want to delete ${items.length} employee${items.length !== 1 ? 's' : ''}?`)) {
                        console.log('Deleting items:', items);
                        alert(`Deleted ${items.length} employee${items.length !== 1 ? 's' : ''}`);
                      }
                    },
                    variant: 'destructive'
                  }
                ]}
                exportFormats={['csv', 'json']}
                title="Employee Directory"
                subtitle="Manage and export employee information with bulk actions"
              />
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Configuration Demo</h2>
              <p>Experiment with different table settings and see changes in real-time</p>
            </div>
            <div className={styles.tableContainer}>
              <Table
                data={basicTableData}
                columns={basicColumns}
                pageSize={6}
                paginated={tableSettings.paginated}
                selectable={tableSettings.selectable}
                striped={tableSettings.striped}
                hoverable={tableSettings.hoverable}
                compact={tableSettings.compact}
                bordered={tableSettings.bordered}
                title="Configurable Table"
                headerActions={
                  <>
                    <button 
                      style={{
                        padding: ODLTheme.spacing[2],
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: ODLTheme.transitions.base
                      }}
                      title="Print"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon name="print" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: ODLTheme.spacing[2],
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: ODLTheme.transitions.base
                      }}
                      title="Share"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon name="share" size={20} />
                    </button>
                    <button 
                      style={{
                        padding: ODLTheme.spacing[2],
                        color: ODLTheme.colors.text.secondary,
                        background: 'transparent',
                        border: 'none',
                        borderRadius: ODLTheme.spacing[1],
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: ODLTheme.transitions.base
                      }}
                      title="More Options"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.primary;
                        e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ODLTheme.colors.text.secondary;
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <Icon name="overflow-menu-vertical" size={20} />
                    </button>
                  </>
                }
                onRowSelect={(selected) => console.log('Interactive demo - Selected rows:', selected)}
              />
            </div>
          </div>
        )}

        {selectedDemo === 'performance' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Performance & Scale Testing</h2>
              <p>Demonstrates table performance with large datasets (1000+ rows) and optimized rendering</p>
              <div className={styles.performanceStats}>
                <span className={styles.statItem}>
                  <strong>{performanceData.length.toLocaleString()}</strong> rows
                </span>
                <span className={styles.statItem}>
                  <strong>{basicColumns.length}</strong> columns
                </span>
                <span className={styles.statItem}>
                  <strong>Virtual scrolling</strong> enabled
                </span>
              </div>
            </div>
            <div className={styles.tableContainer}>
              <AdvancedTable
                data={performanceData}
                columns={advancedColumns}
                itemsPerPage={25}
                paginated={true}
                selectable={true}
                showSearch={true}
                showColumnToggle={true}
                showExport={true}
                showBulkActions={true}
                bulkActions={[
                  {
                    label: 'Batch Update',
                    action: (items) => {
                      console.log('Batch updating items:', items);
                      alert(`Processing batch update for ${items.length} record${items.length !== 1 ? 's' : ''}`);
                    },
                    variant: 'primary'
                  },
                  {
                    label: 'Export Selected',
                    action: (items) => {
                      const csvContent = [
                        'Name,Email,Role,Department,Status',
                        ...items.map(item => `${item.name},${item.email},${item.role},${item.department},${item.status}`)
                      ].join('\n');
                      
                      const blob = new Blob([csvContent], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `selected-employees-${items.length}.csv`;
                      a.click();
                      URL.revokeObjectURL(url);
                    },
                    variant: 'secondary'
                  }
                ]}
                exportFormats={['csv', 'json']}
                title="Large Dataset Performance Demo"
                subtitle={`Efficiently handling ${performanceData.length.toLocaleString()} employee records with bulk operations`}
              />
            </div>
          </div>
        )}

        {/* Code Examples Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Enhanced Feature Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Complete Feature Set</h3>
          <p>Everything you need for modern data table implementations</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>📊 Core Features</h4>
            <ul>
              <li>✓ Sorting (single & multi-column)</li>
              <li>✓ Pagination with customizable page sizes</li>
              <li>✓ Row selection (single & multi-select)</li>
              <li>✓ Bulk actions for selected rows</li>
              <li>✓ Custom cell rendering</li>
              <li>✓ Keyboard navigation</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🔍 Advanced Filtering</h4>
            <ul>
              <li>✓ Global search across all columns</li>
              <li>✓ Column-specific filters</li>
              <li>✓ Date range filtering</li>
              <li>✓ Numeric range filters</li>
              <li>✓ Custom filter functions</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚙️ Customization</h4>
            <ul>
              <li>✓ Column visibility controls</li>
              <li>✓ Dynamic column resizing</li>
              <li>✓ Custom themes & styling</li>
              <li>✓ Conditional row/cell formatting</li>
              <li>✓ Loading states & placeholders</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📤 Export & Integration</h4>
            <ul>
              <li>✓ CSV export with custom formatting</li>
              <li>✓ JSON export for data interchange</li>
              <li>✓ PDF export (with custom layouts)</li>
              <li>✓ API integration helpers</li>
              <li>✓ Real-time data synchronization</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Performance</h4>
            <ul>
              <li>✓ Virtual scrolling for large datasets</li>
              <li>✓ Lazy loading & pagination</li>
              <li>✓ Memoized rendering optimizations</li>
              <li>✓ Debounced search & filtering</li>
              <li>✓ Memory-efficient state management</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ WCAG 2.1 AA compliance</li>
              <li>✓ Screen reader support</li>
              <li>✓ Keyboard-only navigation</li>
              <li>✓ High contrast mode</li>
              <li>✓ Focus management & indicators</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );

  // Helper function to generate code examples
  function getCodeExample(demo: string): string {
    const examples = {
      basic: `<Table
  data={employeeData}
  columns={[
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', render: (value) => (
      <span className={\`status-\${value.toLowerCase()}\`}>
        {value}
      </span>
    )}
  ]}
  pageSize={5}
  paginated={true}
  selectable={true}
  onRowSelect={(selectedRows) => handleRowSelection(selectedRows)}
/>`,
      products: `<Table
  data={productData}
  columns={[
    { key: 'product', label: 'Product Name', sortable: true },
    { key: 'price', label: 'Price', render: (value) => \`$\${value.toFixed(2)}\` },
    { key: 'stock', label: 'Stock', render: (value) => (
      <span className={value < 50 ? 'low-stock' : 'in-stock'}>
        {value} units
      </span>
    )}
  ]}
  pageSize={5}
  striped={true}
  hoverable={true}
/>`,
      advanced: `<AdvancedTable
  data={employeeData}
  columns={advancedColumns}
  itemsPerPage={10}
  paginated={true}
  selectable={true}
  showSearch={true}
  showColumnToggle={true}
  showExport={true}
  showBulkActions={true}
  bulkActions={[
    {
      label: 'Archive Selected',
      action: (items) => handleArchive(items),
      variant: 'secondary'
    },
    {
      label: 'Send Email',
      action: (items) => handleEmailSend(items),
      variant: 'primary'
    }
  ]}
  exportFormats={['csv', 'json']}
  title="Employee Directory"
  subtitle="Manage and export employee information"
/>`,
      interactive: `// Live configuration demo
const [settings, setSettings] = useState({
  paginated: true,
  selectable: true,
  striped: true,
  hoverable: true,
  compact: false
});

<Table
  data={data}
  columns={columns}
  {...settings}
  onRowSelect={(rows) => console.log(rows)}
/>`,
      performance: `<AdvancedTable
  data={largeDataset} // 1000+ rows
  columns={columns}
  itemsPerPage={25}
  paginated={true}
  showSearch={true}
  virtualScrolling={true} // For very large datasets
  title="Large Dataset Demo"
  subtitle="Efficiently handling 1000+ records"
/>`
    };
    
    return examples[demo as keyof typeof examples] || examples.basic;
  }
};

export default TableDemo;