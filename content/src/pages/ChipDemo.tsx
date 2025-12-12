import React, { useState } from 'react';
import Chip from '../components/Chip/Chip';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Icon from '../components/Icon/Icon';
import styles from './TableDemo.module.css';
import {
  Chip as MUIChip,
  Stack,
  Box
} from '@mui/material';
import DemoComparison from '../components/DemoComparison/DemoComparison';
import ODLThemeProvider from '../theme/ODLThemeProvider';

// Self-contained Button component for the demo
const Button: React.FC<{
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium';
  onClick?: () => void;
  children: React.ReactNode;
}> = ({ variant = 'primary', size = 'medium', onClick, children }) => {
  const baseStyles: React.CSSProperties = {
    padding: size === 'small' ? '6px 12px' : '8px 16px',
    fontSize: size === 'small' ? '13px' : '14px',
    fontWeight: 500,
    borderRadius: '4px',
    cursor: 'pointer',
    border: '1px solid',
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  };

  const variantStyles: React.CSSProperties = variant === 'primary' 
    ? {
        backgroundColor: '#3560C1',
        borderColor: '#3560C1',
        color: 'white',
      }
    : {
        backgroundColor: 'white',
        borderColor: '#D1D1D1',
        color: '#3560C1',
      };

  return (
    <button 
      style={{ ...baseStyles, ...variantStyles }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#2850B1';
        } else {
          e.currentTarget.style.backgroundColor = '#F5F5F5';
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#3560C1';
        } else {
          e.currentTarget.style.backgroundColor = 'white';
        }
      }}
    >
      {children}
    </button>
  );
};

const ChipDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'colors' | 'icons' | 'interactive' | 'status' | 'tags' | 'custom' | 'comparison'>('colors');
  const [showCode, setShowCode] = useState(false);
  const [showComparison, _setShowComparison] = useState(true);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [tags, setTags] = useState(['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML']);
  const [newTag, setNewTag] = useState('');

  // ODL-styled MUI chip colors to match exactly
  const getODLChipStyles = (variant: string, size?: string) => {
    const baseStyles = {
      fontSize: size === 'small' ? '12px' : size === 'large' ? '16px' : '14px',
      height: size === 'small' ? '24px' : size === 'large' ? '32px' : '28px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      fontWeight: 400,
      borderRadius: '4px',
      border: 'none',
      '& .MuiChip-label': {
        padding: size === 'small' ? '0 8px' : '0 12px',
      },
      '& .MuiChip-deleteIcon': {
        fontSize: '16px',
        width: '16px',
        height: '16px',
        margin: '0 4px 0 -4px',
        opacity: 0.7,
        '&:hover': {
          opacity: 1,
        }
      },
      '& .MuiChip-icon': {
        margin: '0 -4px 0 8px',
      }
    };

    const colorStyles = {
      blue: {
        backgroundColor: '#E0F3FE',
        color: '#3560C1',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#3560C1',
        }
      },
      lightGreen: {
        backgroundColor: '#DEFBE6',
        color: '#31622C',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#31622C',
        }
      },
      orange: {
        backgroundColor: '#FCEEDA',
        color: '#C93713',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#C93713',
        }
      },
      yellow: {
        backgroundColor: '#FFF1C7',
        color: '#161616',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#161616',
        }
      },
      red: {
        backgroundColor: '#FFD7D9',
        color: '#DA1E28',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#DA1E28',
        }
      },
      purple: {
        backgroundColor: '#F0E5FF',
        color: '#6929C4',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#6929C4',
        }
      },
      teal: {
        backgroundColor: '#D9FBFB',
        color: '#005D5D',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#005D5D',
        }
      },
      grey: {
        backgroundColor: '#F4F4F4',
        color: '#161616',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#161616',
        }
      },
      darkGreen: {
        backgroundColor: '#1B4721',
        color: '#FFFFFF',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#FFFFFF',
        }
      },
      burgundy: {
        backgroundColor: '#750E13',
        color: '#FFFFFF',
        '& .MuiChip-deleteIcon': {
          ...baseStyles['& .MuiChip-deleteIcon'],
          color: '#FFFFFF',
        }
      },
    };

    return { ...baseStyles, ...(colorStyles[variant as keyof typeof colorStyles] || colorStyles.blue) };
  };

  const handleChipClick = (chipId: string) => {
    setSelectedChips(prev => 
      prev.includes(chipId) 
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const getCodeExample = (demo: string) => {
    const examples: Record<string, string> = {
      colors: `// ODL chip color variants
<Chip label="Blue chip" variant="blue" />
<Chip label="Light green" variant="lightGreen" />
<Chip label="Dark green" variant="darkGreen" />
<Chip label="Orange chip" variant="orange" />
<Chip label="Red chip" variant="red" />
<Chip label="Yellow chip" variant="yellow" />
<Chip label="Purple chip" variant="purple" />
<Chip label="Teal chip" variant="teal" />
<Chip label="Burgundy" variant="burgundy" />
<Chip label="Grey chip" variant="grey" />
<Chip label="White chip" variant="white" />

// Size variants
<Chip label="Small" variant="blue" size="sm" />
<Chip label="Medium" variant="blue" size="md" />
<Chip label="Large" variant="blue" size="lg" />

// States
<Chip label="Normal" variant="blue" />
<Chip label="Disabled" variant="blue" disabled />
<Chip label="Error" variant="red" error />`,

      icons: `// Chips with icons
<Chip 
  label="Document" 
  variant="blue" 
  showDocumentIcon 
/>

<Chip 
  label="Alert" 
  variant="red" 
  showInfoIcon 
/>

<Chip 
  label="Custom icon" 
  variant="lightGreen" 
  iconName="checkmark" 
/>

// Icons on both sides
<Chip 
  label="Important" 
  variant="orange" 
  showDocumentIcon
  showInfoIcon 
/>`,


      interactive: `// Clickable chips
<Chip 
  label="Click me" 
  variant="blue"
  clickable 
  onClick={() => console.log('Chip clicked!')} 
/>

// Selection state management
const [selected, setSelected] = useState(false);

<Chip 
  label={selected ? "Selected" : "Click to select"}
  variant={selected ? "blue" : "grey"}
  clickable 
  onClick={() => setSelected(!selected)} 
/>`,

      status: `// Status indicator chips
<Chip label="Active" variant="lightGreen" />
<Chip label="Pending" variant="yellow" />
<Chip label="Inactive" variant="grey" />
<Chip label="Error" variant="red" />
<Chip label="New" variant="blue" />

// With icons
<Chip label="Draft" variant="grey" iconName="edit" />
<Chip label="Published" variant="lightGreen" iconName="checkmark" />
<Chip label="Archived" variant="orange" iconName="archive" />`,

      tags: `// Tag management system
const [tags, setTags] = useState(['React', 'TypeScript']);

{tags.map(tag => (
  <Chip 
    key={tag}
    label={tag}
    variant="blue"
    iconName="tag"
    clickable
    onClick={() => removeTag(tag)}
  />
))}

// Add new tag functionality
<input 
  value={newTag} 
  onChange={(e) => setNewTag(e.target.value)}
  onKeyPress={(e) => e.key === 'Enter' && addTag()}
/>`,

      custom: `// Document chips with icons
<Chip 
  label="Report.pdf" 
  variant="blue"
  showDocumentIcon
  showInfoIcon
/>

// Metric chips
<div style={{ display: 'flex', gap: '8px' }}>
  <Chip label="Users: 1,234" variant="blue" iconName="user" />
  <Chip label="Revenue: $45.6K" variant="lightGreen" iconName="currency" />
  <Chip label="Growth: +12%" variant="lightGreen" iconName="trending-up" />
</div>

// Category chips
<Chip label="Technology" variant="purple" iconName="application" />
<Chip label="Business" variant="teal" iconName="briefcase" />
<Chip label="Design" variant="orange" iconName="paint-brush" />`
    };

    return examples[demo] || '';
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Chip Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Chip Component Showcase</h1>
            <p>Compact elements for displaying small pieces of information, tags, or status indicators</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showCode ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowCode(!showCode)}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'colors', label: 'Colors', desc: 'ODL color palette', icon: '🎨' },
            { key: 'icons', label: 'With Icons', desc: 'Carbon icon integration', icon: '🎯' },
            { key: 'interactive', label: 'Interactive', desc: 'Clickable chips', icon: '👆' },
            { key: 'status', label: 'Status', desc: 'Status indicators', icon: '🚦' },
            { key: 'tags', label: 'Tags', desc: 'Tag management', icon: '🏷️' },
            { key: 'custom', label: 'Custom', desc: 'Advanced examples', icon: '✨' },
            { key: 'comparison', label: 'MUI Comparison', desc: 'ODL vs Material UI', icon: '⚖️' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as any)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
                <span className={styles.demoDesc}>{demo.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'colors' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Chip Color Variants</h2>
              <p>Complete color palette comparison between ODL and Material UI</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              {/* ODL vs MUI Chip Comparison */}
              {showComparison && (
                <DemoComparison
                  title="Color Variants"
                  description="ODL custom colors vs MUI semantic colors"
                  odlExample={
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Light Colors</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Chip label="Blue" variant="blue" />
                        <Chip label="Light Green" variant="lightGreen" />
                        <Chip label="Orange" variant="orange" />
                        <Chip label="Yellow" variant="yellow" />
                        <Chip label="Purple" variant="purple" />
                        <Chip label="Teal" variant="teal" />
                        <Chip label="Red" variant="red" />
                        <Chip label="Grey" variant="grey" />
                        <Chip label="White" variant="white" />
                      </div>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Dark Colors</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        <Chip label="Dark Green" variant="darkGreen" />
                        <Chip label="Burgundy" variant="burgundy" />
                      </div>
                    </div>
                  }
                  muiExample={
                    <ODLThemeProvider enableMui={true}>
                      <Box sx={{ padding: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Semantic Colors</h3>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, marginBottom: '1.5rem' }}>
                          <MUIChip label="Default" sx={getODLChipStyles('grey')} />
                          <MUIChip label="Primary" sx={getODLChipStyles('blue')} />
                          <MUIChip label="Secondary" sx={getODLChipStyles('purple')} />
                          <MUIChip label="Success" sx={getODLChipStyles('lightGreen')} />
                          <MUIChip label="Warning" sx={getODLChipStyles('yellow')} />
                          <MUIChip label="Error" sx={getODLChipStyles('red')} />
                          <MUIChip label="Info" sx={getODLChipStyles('teal')} />
                        </Stack>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Outlined Variants</h3>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                          <MUIChip label="Primary" variant="outlined" sx={{ ...getODLChipStyles('blue'), backgroundColor: 'white', border: '1px solid #3560C1' }} />
                          <MUIChip label="Secondary" variant="outlined" sx={{ ...getODLChipStyles('purple'), backgroundColor: 'white', border: '1px solid #6929C4' }} />
                          <MUIChip label="Success" variant="outlined" sx={{ ...getODLChipStyles('lightGreen'), backgroundColor: 'white', border: '1px solid #31622C', color: '#31622C' }} />
                          <MUIChip label="Warning" variant="outlined" sx={{ ...getODLChipStyles('yellow'), backgroundColor: 'white', border: '1px solid #F1C21B', color: '#161616' }} />
                        </Stack>
                      </Box>
                    </ODLThemeProvider>
                  }
                />
              )}


              <div style={{ marginTop: '2rem' }}>
                <DemoComparison
                  title="Size & State Variants"
                  description="Different sizes and interactive states"
                  odlExample={
                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Size Variants</h3>
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Chip label="Small" variant="blue" size="sm" />
                        <Chip label="Medium" variant="blue" size="md" />
                        <Chip label="Large" variant="blue" size="lg" />
                      </div>

                      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>States</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Normal:</span>
                          <Chip label="Active" variant="blue" />
                          <Chip label="Clickable" variant="blue" clickable onClick={() => console.log('Clicked!')} />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Disabled:</span>
                          <Chip label="Disabled" variant="blue" disabled />
                          <Chip label="Disabled Clickable" variant="blue" clickable disabled onClick={() => console.log('Should not click')} />
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Error:</span>
                          <Chip label="Error State" variant="red" error />
                          <Chip label="Error Clickable" variant="red" error clickable onClick={() => console.log('Error clicked')} />
                        </div>
                      </div>
                    </div>
                  }
                  muiExample={
                    <ODLThemeProvider enableMui={true}>
                      <Box sx={{ padding: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Size Variants</h3>
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, marginBottom: '1.5rem' }}>
                          <MUIChip label="Small" sx={getODLChipStyles('blue', 'small')} size="small" />
                          <MUIChip label="Medium" sx={getODLChipStyles('blue')} size="medium" />
                          <MUIChip label="Large" sx={getODLChipStyles('blue', 'large')} />
                        </Stack>

                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>States</h3>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Normal:</span>
                            <MUIChip label="Active" sx={getODLChipStyles('blue')} />
                            <MUIChip label="Clickable" sx={{ ...getODLChipStyles('blue'), cursor: 'pointer', '&:hover': { backgroundColor: '#3560C1', color: 'white' } }} onClick={() => console.log('Clicked!')} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Disabled:</span>
                            <MUIChip label="Disabled" disabled />
                            <MUIChip label="Disabled Clickable" disabled onClick={() => console.log('Should not click')} />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Deletable:</span>
                            <MUIChip label="Can Delete" sx={getODLChipStyles('red')} onDelete={() => console.log('Deleted')} />
                            <MUIChip label="With Icon" sx={getODLChipStyles('lightGreen')} onDelete={() => console.log('Deleted')} deleteIcon={<Icon name="close" size={16} />} />
                          </Box>
                        </Box>
                      </Box>
                    </ODLThemeProvider>
                  }
                />
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'icons' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Chips with Icons</h2>
              <p>Icon integration comparison between ODL and Material UI</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              {showComparison && (
                <>
                  <DemoComparison
                    title="Icon Variants"
                    description="Different ways to add icons to chips"
                    odlExample={
                      <div style={{ padding: '1rem' }}>
                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Document Icons</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                          <Chip label="Report.pdf" variant="blue" showDocumentIcon />
                          <Chip label="Spreadsheet.xlsx" variant="lightGreen" showDocumentIcon />
                          <Chip label="Presentation.pptx" variant="orange" showDocumentIcon />
                          <Chip label="Archive.zip" variant="grey" showDocumentIcon />
                        </div>

                        <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Custom Icons</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                          <Chip label="Approved" variant="lightGreen" iconName="checkmark" />
                          <Chip label="Rejected" variant="red" iconName="close" />
                          <Chip label="In Progress" variant="yellow" iconName="time" />
                          <Chip label="Locked" variant="grey" iconName="locked" />
                          <Chip label="Favorite" variant="purple" iconName="star" />
                          <Chip label="Settings" variant="teal" iconName="settings" />
                        </div>
                      </div>
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <Box sx={{ padding: '1rem' }}>
                          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>With Avatars</h3>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, marginBottom: '1.5rem' }}>
                            <MUIChip label="User Profile" icon={<Icon name="user" size={16} color="#3560C1" />} sx={getODLChipStyles('blue')} />
                            <MUIChip label="Admin" icon={<Icon name="user-admin" size={16} color="#DA1E28" />} sx={getODLChipStyles('red')} />
                            <MUIChip label="Guest" icon={<Icon name="user" size={16} color="#161616" />} sx={getODLChipStyles('grey')} />
                            <MUIChip label="Team Lead" icon={<Icon name="group" size={16} color="#31622C" />} sx={getODLChipStyles('lightGreen')} />
                          </Stack>

                          <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>With Icons</h3>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            <MUIChip label="Approved" icon={<Icon name="checkmark" size={16} color="#31622C" />} sx={getODLChipStyles('lightGreen')} />
                            <MUIChip label="Rejected" icon={<Icon name="close" size={16} color="#DA1E28" />} sx={getODLChipStyles('red')} />
                            <MUIChip label="In Progress" icon={<Icon name="time" size={16} color="#161616" />} sx={getODLChipStyles('yellow')} />
                            <MUIChip label="Locked" icon={<Icon name="locked" size={16} color="#161616" />} sx={getODLChipStyles('grey')} />
                            <MUIChip label="Favorite" icon={<Icon name="star" size={16} color="#6929C4" />} sx={getODLChipStyles('purple')} />
                            <MUIChip label="Settings" icon={<Icon name="settings" size={16} color="#005D5D" />} sx={getODLChipStyles('teal')} />
                          </Stack>
                        </Box>
                      </ODLThemeProvider>
                    }
                  />

                  <div style={{ marginTop: '2rem' }}>
                    <DemoComparison
                      title="Info & Action Icons"
                      description="Chips with informational and action icons"
                      odlExample={
                        <div style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            <Chip label="Important" variant="red" showInfoIcon />
                            <Chip label="Warning" variant="yellow" showInfoIcon />
                            <Chip label="Notice" variant="blue" showInfoIcon />
                            <Chip label="Help" variant="purple" showInfoIcon />
                          </div>
                        </div>
                      }
                      muiExample={
                        <ODLThemeProvider enableMui={true}>
                          <Box sx={{ padding: '1rem' }}>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                              <MUIChip label="Delete Item" onDelete={() => {}} sx={getODLChipStyles('red')} />
                              <MUIChip label="Remove Tag" onDelete={() => {}} sx={getODLChipStyles('yellow')} />
                              <MUIChip label="Clear Filter" onDelete={() => {}} sx={getODLChipStyles('blue')} />
                              <MUIChip label="Reset" onDelete={() => {}} deleteIcon={<Icon name="restart" size={16} />} sx={getODLChipStyles('grey')} />
                            </Stack>
                          </Box>
                        </ODLThemeProvider>
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Chips</h2>
              <p>Chips that respond to user interactions for selection and actions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Clickable Chips</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Click the chips below to select/deselect them</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['React', 'Vue', 'Angular', 'Svelte', 'Next.js'].map(tech => (
                    <Chip
                      key={tech}
                      label={tech}
                      variant={selectedChips.includes(tech) ? 'blue' : 'grey'}
                      iconName={selectedChips.includes(tech) ? 'checkmark' : undefined}
                      clickable
                      onClick={() => handleChipClick(tech)}
                    />
                  ))}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Filter Selection</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Use chips for multi-select filters</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['All', 'Active', 'Pending', 'Completed', 'Archived'].map(filter => (
                    <Chip
                      key={filter}
                      label={filter}
                      variant={selectedChips.includes(filter) ? 'blue' : 'white'}
                      iconName={selectedChips.includes(filter) ? 'checkmark' : undefined}
                      clickable
                      onClick={() => handleChipClick(filter)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'status' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Status Chips</h2>
              <p>Visual indicators for different states and conditions</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>System Status</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Online" variant="lightGreen" iconName="checkmark-filled" />
                  <Chip label="Offline" variant="red" iconName="error-filled" />
                  <Chip label="Maintenance" variant="yellow" iconName="warning" />
                  <Chip label="Beta" variant="blue" iconName="beta" />
                  <Chip label="Deprecated" variant="grey" iconName="subtract" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Document Status</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Draft" variant="grey" iconName="edit" />
                  <Chip label="In review" variant="yellow" iconName="view" />
                  <Chip label="Approved" variant="lightGreen" iconName="checkmark" />
                  <Chip label="Published" variant="lightGreen" showDocumentIcon />
                  <Chip label="Archived" variant="grey" iconName="archive" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Priority Levels</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Critical" variant="red" showInfoIcon />
                  <Chip label="High" variant="orange" showInfoIcon />
                  <Chip label="Medium" variant="yellow" />
                  <Chip label="Low" variant="grey" />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'tags' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Tag Management</h2>
              <p>Dynamic tag system with add and remove functionality</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Removable Tags</h3>
                <p style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>Click on any tag to remove it</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                  {tags.map(tag => (
                    <div key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Chip
                        label={tag}
                        variant="blue"
                        iconName="tag"
                        clickable
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add new tag..."
                    style={{
                      padding: '6px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '4px',
                      fontSize: '14px',
                      minWidth: '200px'
                    }}
                  />
                  <Button size="small" onClick={handleAddTag}>Add Tag</Button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Category Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Technology" variant="purple" iconName="application" />
                  <Chip label="Business" variant="teal" iconName="briefcase" />
                  <Chip label="Design" variant="orange" iconName="paint-brush" />
                  <Chip label="Marketing" variant="lightGreen" iconName="chart-line" />
                  <Chip label="Sales" variant="blue" iconName="shopping-cart" />
                  <Chip label="Support" variant="yellow" iconName="headset" />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedDemo === 'custom' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Custom Examples</h2>
              <p>Advanced use cases and combinations</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Metric Chips</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Users: 1,234" variant="blue" iconName="user" />
                  <Chip label="Revenue: $45.6K" variant="lightGreen" iconName="currency" />
                  <Chip label="Growth: +12%" variant="lightGreen" iconName="trending-up" />
                  <Chip label="Bounce: 2.3%" variant="yellow" iconName="analytics" />
                  <Chip label="Errors: 3" variant="red" iconName="error" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem', marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>User Roles</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <Chip label="Admin" variant="burgundy" iconName="user-admin" />
                  <Chip label="Editor" variant="orange" iconName="edit" />
                  <Chip label="Viewer" variant="blue" iconName="view" />
                  <Chip label="Guest" variant="grey" iconName="user" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: 600 }}>Mixed Usage</h3>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1rem',
                  padding: '1rem',
                  background: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Status:</span>
                    <Chip label="Active" variant="lightGreen" iconName="checkmark-filled" />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Priority:</span>
                    <Chip label="High" variant="orange" showInfoIcon />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '14px', color: '#6b7280', minWidth: '80px' }}>Tags:</span>
                    <Chip label="Frontend" variant="purple" iconName="application" />
                    <Chip label="React" variant="blue" iconName="logo-react" />
                    <Chip label="TypeScript" variant="teal" iconName="code" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MUI Comparison Section */}
        {selectedDemo === 'comparison' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>ODL vs Material UI Chips</h2>
              <p>Side-by-side comparison of ODL and Material UI chip components</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>

              {showComparison ? (
                <>
                  <DemoComparison
                    title="Basic Chips"
                    description="Standard chip variants and colors"
                    odlExample={
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem' }}>
                        <Chip label="Default" variant="grey" />
                        <Chip label="Primary" variant="blue" />
                        <Chip label="Success" variant="lightGreen" />
                        <Chip label="Warning" variant="yellow" />
                        <Chip label="Error" variant="red" />
                        <Chip label="Info" variant="teal" />
                      </div>
                    }
                    muiExample={
                      <ODLThemeProvider enableMui={true}>
                        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, padding: '1rem' }}>
                          <MUIChip label="Default" sx={getODLChipStyles('grey')} />
                          <MUIChip label="Primary" sx={getODLChipStyles('blue')} />
                          <MUIChip label="Success" sx={getODLChipStyles('lightGreen')} />
                          <MUIChip label="Warning" sx={getODLChipStyles('yellow')} />
                          <MUIChip label="Error" sx={getODLChipStyles('red')} />
                          <MUIChip label="Info" sx={getODLChipStyles('teal')} />
                        </Stack>
                      </ODLThemeProvider>
                    }
                  />

                  <div style={{ marginTop: '2rem' }}>
                    <DemoComparison
                      title="Interactive Chips"
                      description="Clickable and deletable chips"
                      odlExample={
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem' }}>
                          <Chip label="Clickable" variant="blue" clickable onClick={() => console.log('Clicked ODL')} />
                          <Chip label="With Icon" variant="lightGreen" iconName="checkmark" />
                          <Chip label="Disabled" variant="grey" disabled />
                          <Chip label="With Info" variant="orange" showInfoIcon />
                        </div>
                      }
                      muiExample={
                        <ODLThemeProvider enableMui={true}>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, padding: '1rem' }}>
                            <MUIChip label="Clickable" sx={{ ...getODLChipStyles('blue'), cursor: 'pointer', '&:hover': { backgroundColor: '#3560C1', color: 'white' } }} onClick={() => console.log('Clicked MUI')} />
                            <MUIChip label="Deletable" sx={getODLChipStyles('lightGreen')} onDelete={() => console.log('Deleted')} />
                            <MUIChip label="Disabled" disabled />
                            <MUIChip
                              label="With Icon"
                              icon={<Icon name="information" size={16} color="#005D5D" />}
                              sx={getODLChipStyles('teal')}
                            />
                          </Stack>
                        </ODLThemeProvider>
                      }
                    />
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <DemoComparison
                      title="Size Variants"
                      description="Different chip sizes for various use cases"
                      odlExample={
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', padding: '1rem' }}>
                          <Chip label="Small" variant="blue" size="sm" />
                          <Chip label="Medium" variant="blue" size="md" />
                          <Chip label="Large" variant="blue" size="lg" />
                        </div>
                      }
                      muiExample={
                        <ODLThemeProvider enableMui={true}>
                          <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flexWrap: 'wrap', gap: 1, padding: '1rem' }}>
                            <MUIChip label="Small" sx={getODLChipStyles('blue', 'small')} size="small" />
                            <MUIChip label="Medium" sx={getODLChipStyles('blue')} size="medium" />
                            <MUIChip
                              label="Large"
                              sx={getODLChipStyles('blue', 'large')}
                            />
                          </Stack>
                        </ODLThemeProvider>
                      }
                    />
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <DemoComparison
                      title="Outlined Variants"
                      description="Outlined chip styles"
                      odlExample={
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', padding: '1rem' }}>
                          <Chip label="Outlined Blue" variant="white" style={{ border: '1px solid #3B82F6', color: '#3B82F6' }} />
                          <Chip label="Outlined Green" variant="white" style={{ border: '1px solid #10B981', color: '#10B981' }} />
                          <Chip label="Outlined Orange" variant="white" style={{ border: '1px solid #F59E0B', color: '#F59E0B' }} />
                        </div>
                      }
                      muiExample={
                        <ODLThemeProvider enableMui={true}>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, padding: '1rem' }}>
                            <MUIChip label="Outlined Default" variant="outlined" sx={{ ...getODLChipStyles('grey'), backgroundColor: 'white', border: '1px solid #E0E0E0' }} />
                            <MUIChip label="Outlined Primary" variant="outlined" sx={{ ...getODLChipStyles('blue'), backgroundColor: 'white', border: '1px solid #3560C1' }} />
                            <MUIChip label="Outlined Success" variant="outlined" sx={{ ...getODLChipStyles('lightGreen'), backgroundColor: 'white', border: '1px solid #31622C', color: '#31622C' }} />
                          </Stack>
                        </ODLThemeProvider>
                      }
                    />
                  </div>

                  <div style={{ marginTop: '2rem' }}>
                    <DemoComparison
                      title="Complex Examples"
                      description="Advanced chip configurations"
                      odlExample={
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem' }}>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <Chip label="React" variant="blue" iconName="logo-react" />
                            <Chip label="Vue" variant="lightGreen" iconName="logo-vue" />
                            <Chip label="Angular" variant="red" iconName="logo-angular" />
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <Chip label="Users: 1.2K" variant="purple" iconName="user" />
                            <Chip label="Revenue: $45K" variant="lightGreen" iconName="currency" />
                            <Chip label="Growth: +12%" variant="teal" iconName="trending-up" />
                          </div>
                        </div>
                      }
                      muiExample={
                        <ODLThemeProvider enableMui={true}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '1rem' }}>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                              <MUIChip
                                label="React"
                                icon={<Icon name="logo-react" size={16} color="#3560C1" />}
                                sx={getODLChipStyles('blue')}
                              />
                              <MUIChip
                                label="Vue"
                                icon={<Icon name="logo-vue" size={16} color="#31622C" />}
                                sx={getODLChipStyles('lightGreen')}
                              />
                              <MUIChip
                                label="Angular"
                                icon={<Icon name="logo-angular" size={16} color="#DA1E28" />}
                                sx={getODLChipStyles('red')}
                              />
                            </Stack>
                            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                              <MUIChip
                                label="Users: 1.2K"
                                icon={<Icon name="user" size={16} color="#6929C4" />}
                                sx={getODLChipStyles('purple')}
                              />
                              <MUIChip
                                label="Revenue: $45K"
                                icon={<Icon name="currency" size={16} color="#31622C" />}
                                sx={getODLChipStyles('lightGreen')}
                              />
                              <MUIChip
                                label="Growth: +12%"
                                icon={<Icon name="trending-up" size={16} color="#005D5D" />}
                                sx={getODLChipStyles('teal')}
                              />
                            </Stack>
                          </Box>
                        </ODLThemeProvider>
                      }
                    />
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>Toggle comparison view to see MUI examples</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Code Panel */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3>Code Example</h3>
            <pre className={styles.codeBlock}>
              <code>{getCodeExample(selectedDemo)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Features Showcase */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Chip Component Features</h3>
          <p>Everything you need for displaying tags, labels, and status indicators</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Core Features</h4>
            <ul>
              <li>✓ 6 color variants</li>
              <li>✓ 3 size options</li>
              <li>✓ Filled and outlined styles</li>
              <li>✓ Automatic text casing</li>
              <li>✓ Overflow handling</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>⚡ Interactive</h4>
            <ul>
              <li>✓ Clickable chips</li>
              <li>✓ Hover effects</li>
              <li>✓ Selection states</li>
              <li>✓ Keyboard accessible</li>
              <li>✓ Active animations</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🎯 Customization</h4>
            <ul>
              <li>✓ Custom className support</li>
              <li>✓ Flexible sizing</li>
              <li>✓ Color variants</li>
              <li>✓ Style combinations</li>
              <li>✓ Event handlers</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>🚀 Performance</h4>
            <ul>
              <li>✓ Lightweight component</li>
              <li>✓ No external dependencies</li>
              <li>✓ Efficient rendering</li>
              <li>✓ Optimized animations</li>
              <li>✓ Minimal DOM updates</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ ARIA role support</li>
              <li>✓ Keyboard navigation</li>
              <li>✓ Focus indicators</li>
              <li>✓ Screen reader friendly</li>
              <li>✓ Semantic HTML</li>
            </ul>
          </div>

          <div className={styles.featureCategory}>
            <h4>💡 Use Cases</h4>
            <ul>
              <li>✓ Status indicators</li>
              <li>✓ Category labels</li>
              <li>✓ Tag management</li>
              <li>✓ Filter options</li>
              <li>✓ Metadata display</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default ChipDemo;