import React, { useState } from 'react';
import Cards from '../components/CardComponents/Cards/Cards';
import UserCard from '../components/CardComponents/UserCard/UserCard';
import ChartCard from '../components/CardComponents/ChartCard/ChartCard';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import Button from '../components/Button/Button';
import DemoComparison from '../components/DemoComparison/DemoComparison';
import { ODLThemeProvider } from '../theme/ODLThemeProvider';
import {
  Card as MUICard,
  CardContent,
  CardActions,
  Checkbox,
  IconButton,
  Typography,
  Chip,
  Box
} from '@mui/material';
import ODLTheme from '../styles/ODLTheme';
import FileType from '../components/FileType/FileType';
import styles from './TableDemo.module.css';

// MUI Card Component with ODL Styling
interface MUICardProps {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  error?: boolean;
  selected?: boolean;
  title?: string;
  subtitle?: string;
  tag?: string;
  showInfoIcon?: boolean;
  showMenuIcon?: boolean;
  onSelect?: (selected: boolean) => void;
  onInfoClick?: () => void;
  onMenuClick?: () => void;
}

const MUICardComponent: React.FC<MUICardProps> = ({
  size = 'md',
  disabled = false,
  error = false,
  selected = false,
  title = "Title - h4 - Primary",
  subtitle = "Body - body2 - Secondary",
  tag = "fA7985",
  showInfoIcon = true,
  showMenuIcon = true,
  onSelect,
  onInfoClick,
  onMenuClick,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm': return {
        padding: '12px',
        titleSize: '14px',
        subtitleSize: '12px',
        tagSize: '11px',
        iconSize: 20,
        minHeight: '64px'
      };
      case 'lg': return {
        padding: '20px',
        titleSize: '18px',
        subtitleSize: '16px',
        tagSize: '14px',
        iconSize: 28,
        minHeight: '96px'
      };
      default: return {
        padding: '16px',
        titleSize: '16px',
        subtitleSize: '14px',
        tagSize: '12px',
        iconSize: 24,
        minHeight: '80px'
      };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <MUICard
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: sizeStyles.padding,
        minHeight: sizeStyles.minHeight,
        backgroundColor: selected ? '#E0F3FE' : '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderLeft: selected ? '4px solid #3560C1' : '1px solid #E0E0E0',
        borderRadius: '0',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        boxSizing: 'border-box',
        '&:hover': {
          backgroundColor: disabled ? 'inherit' : (selected ? '#E0F3FE' : '#F4F4F4'),
          boxShadow: disabled ? '0 1px 2px rgba(0,0,0,0.05)' : '0 4px 6px rgba(0,0,0,0.1)'
        },
        '&:focus-within': {
          outline: '2px solid #3560C1',
          outlineOffset: '2px'
        }
      }}
      onClick={() => !disabled && onSelect?.(!selected)}
    >
      {/* Checkbox */}
      <Box sx={{ marginRight: '12px' }}>
        <Checkbox
          checked={selected}
          disabled={disabled}
          onChange={(e) => onSelect?.(e.target.checked)}
          onClick={(e) => e.stopPropagation()}
          sx={{
            color: '#525252',
            '&.Mui-checked': {
              color: '#3560C1'
            },
            '&.Mui-disabled': {
              color: '#C6C6C6'
            },
            padding: '4px'
          }}
        />
      </Box>

      {/* FileType Icon */}
      <Box sx={{ marginRight: '12px', display: 'flex', alignItems: 'center' }}>
        <FileType type="folder" size={sizeStyles.iconSize} />
      </Box>

      {/* Text Content */}
      <CardContent sx={{
        flex: 1,
        padding: '0!important',
        minWidth: 0
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: sizeStyles.titleSize,
            fontWeight: 500,
            color: disabled ? '#C6C6C6' : (error ? '#DA1E28' : '#161616'),
            fontFamily: ODLTheme.typography.fontFamily.sans,
            lineHeight: 1.2,
            marginBottom: '4px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: sizeStyles.subtitleSize,
            color: disabled ? '#C6C6C6' : '#525252',
            fontFamily: ODLTheme.typography.fontFamily.sans,
            lineHeight: 1.5,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {subtitle}
        </Typography>
      </CardContent>

      {/* Tag */}
      {tag && (
        <Box sx={{ marginRight: '12px' }}>
          <Chip
            label={tag}
            size="small"
            sx={{
              backgroundColor: '#F4F4F4',
              color: '#525252',
              fontSize: sizeStyles.tagSize,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              height: 'auto',
              padding: '2px 8px',
              '& .MuiChip-label': {
                padding: '2px 4px'
              }
            }}
          />
        </Box>
      )}

      {/* Action Icons */}
      <CardActions sx={{ padding: 0, gap: '4px' }}>
        {showInfoIcon && (
          <IconButton
            size="small"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onInfoClick?.();
            }}
            sx={{
              color: '#525252',
              padding: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              },
              '&.Mui-disabled': {
                color: '#C6C6C6'
              }
            }}
          >
            <Icon name="information" size={16} />
          </IconButton>
        )}

        {showMenuIcon && (
          <IconButton
            size="small"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick?.();
            }}
            sx={{
              color: '#525252',
              padding: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.05)'
              },
              '&.Mui-disabled': {
                color: '#C6C6C6'
              }
            }}
          >
            <Icon name="overflow-menu-vertical" size={16} />
          </IconButton>
        )}
      </CardActions>
    </MUICard>
  );
};

const CardsDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'interactive' | 'variations' | 'states' | 'realworld' | 'activity' | 'status'>('basic');
  const [showCode, setShowCode] = useState(false);
  const [showComparison, setShowComparison] = useState(true);
  const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());
  const [basicSelectedCards, setBasicSelectedCards] = useState<Set<string>>(new Set());

  const handleCardSelect = (index: number, selected: boolean) => {
    const newSelected = new Set(selectedCards);
    if (selected) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedCards(newSelected);
  };

  const handleInfoClick = (index: number) => {
    alert(`Info clicked for card ${index + 1}`);
  };

  const handleMenuClick = (index: number) => {
    alert(`Menu clicked for card ${index + 1}`);
  };

  const getCodeExample = () => {
    switch (selectedDemo) {
      case 'basic':
        return `import Cards from '../components/CardComponents/Cards/Cards';

// Basic card with default props
<Cards />

// Card with custom content
<Cards
  title="Document Title"
  subtitle="Document description"
  tag="fA7985"
/>`;
      case 'interactive':
        return `const [selectedCards, setSelectedCards] = useState<Set<number>>(new Set());

const handleCardSelect = (index: number, selected: boolean) => {
  const newSelected = new Set(selectedCards);
  if (selected) {
    newSelected.add(index);
  } else {
    newSelected.delete(index);
  }
  setSelectedCards(newSelected);
};

<Cards
  selected={selectedCards.has(index)}
  title={doc.title}
  subtitle={doc.subtitle}
  tag={doc.tag}
  onSelect={(selected) => handleCardSelect(index, selected)}
  onInfoClick={() => handleInfoClick(index)}
  onMenuClick={() => handleMenuClick(index)}
/>`;
      case 'variations':
        return `// Card without tag
<Cards
  title="Document without tag"
  subtitle="This card doesn't have a tag"
/>

// Card without action icons
<Cards
  title="Document without action icons"
  subtitle="This card has no info or menu icons"
  tag="fA7985"
  showInfoIcon={false}
  showMenuIcon={false}
/>

// Selected card
<Cards
  selected={true}
  title="Selected Document"
  subtitle="This card is currently selected"
  tag="fA7985"
/>`;
      case 'states':
        return `// Hoverable card with state management
const [isHovered, setIsHovered] = useState(false);

<Cards
  title="Hover over me"
  subtitle="This card shows hover state"
  tag="Hover"
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
/>

// Disabled-looking card (visually)
<Cards
  title="Disabled Card"
  subtitle="This card appears disabled"
  tag="Disabled"
  className="opacity-50 pointer-events-none"
/>`;
      case 'realworld':
        return `// File browser implementation
const files = [
  { id: 1, name: "Project Report.pdf", size: "2.5 MB", modified: "2 hours ago" },
  { id: 2, name: "Budget 2024.xlsx", size: "854 KB", modified: "Yesterday" },
  { id: 3, name: "Meeting Notes.docx", size: "125 KB", modified: "3 days ago" }
];

{files.map((file) => (
  <Cards
    key={file.id}
    title={file.name}
    subtitle={\`Size: \${file.size} • Modified: \${file.modified}\`}
    tag={file.size}
    onSelect={(selected) => handleFileSelect(file.id, selected)}
    onInfoClick={() => showFileInfo(file)}
    onMenuClick={() => showFileMenu(file)}
  />
))}`;
      case 'activity':
        return `// Activity Feed Cards - "Since You Were Here" Pattern
const recentActivities = [
  {
    id: 1,
    title: 'New application submitted',
    description: 'Building consent application for residential extension',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    user: 'Sarah Chen',
    icon: 'document-add',
    color: 'blue',
    relatedItem: 'BC-2024-0156'
  },
  // ... more activities
];

// Activity Card Component
{recentActivities.map(activity => (
  <div 
    key={activity.id} 
    style={{
      padding: '12px',
      border: '1px solid #E5E7EB',
      backgroundColor: 'white',
      cursor: 'pointer',
      transition: 'all 0.2s',
      borderRadius: '4px'
    }}
    onClick={() => console.log('Activity clicked:', activity.id)}
  >
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <Icon 
        name={activity.icon}
        size={20}
        color={getIconColor(activity.color)}
      />
      <div style={{ flex: 1 }}>
        <h4>{activity.title}</h4>
        <p>{activity.description}</p>
        <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
          <span>{formatTimeAgo(activity.timestamp)}</span>
          <span> • </span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ 
              width: '20px', 
              height: '20px', 
              borderRadius: '50%', 
              backgroundColor: '#E5E7EB', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              fontSize: '10px',
              fontWeight: '600',
              color: '#6B7280'
            }}>
              {activity.user.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <span>by {activity.user}</span>
          </div>
          <span> • </span>
          <span>{activity.relatedItem}</span>
        </div>
      </div>
    </div>
  </div>
))}`;
      default:
        return '';
    }
  };

  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Cards Component" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Cards Component Showcase</h1>
            <p>Horizontal card component with checkbox, folder icon, text content, tag, and action icons</p>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant={showComparison ? 'primary' : 'secondary'}
              size="small"
              onClick={() => setShowComparison(!showComparison)}
            >
              {showComparison ? 'Hide MUI' : 'Show MUI'}
            </Button>
            <button
              onClick={() => setShowCode(!showCode)}
              style={{
                padding: '8px 16px',
                backgroundColor: showCode ? '#0F62FE' : '#ffffff',
                color: showCode ? '#ffffff' : '#0F62FE',
                border: '1px solid #0F62FE',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
            >
              {showCode ? 'Hide Code' : 'View Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic', desc: 'Default card configurations', icon: '📋' },
            { key: 'interactive', label: 'Interactive', desc: 'Cards with event handlers', icon: '🖱️' },
            { key: 'variations', label: 'Variations', desc: 'Different card configurations', icon: '🎨' },
            { key: 'states', label: 'States', desc: 'Card states and behaviors', icon: '🔄' },
            { key: 'realworld', label: 'Real World', desc: 'Practical implementations', icon: '🌍' },
            { key: 'activity', label: 'Activity Cards', desc: 'Timeline and activity feed cards', icon: '📅' },
            { key: 'status', label: 'Status Cards', desc: 'Dashboard status and metric cards', icon: '📊' },
          ].map((demo) => (
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

      {/* Code Display */}
      {showCode && (
        <div className={styles.codeBlock}>
          <div className={styles.codeHeader}>
            <span className={styles.codeTitle}>Example Code</span>
            <button 
              className={styles.copyButton}
              onClick={() => navigator.clipboard.writeText(getCodeExample())}
            >
              Copy
            </button>
          </div>
          <pre className={styles.codeContent}>
            <code>{getCodeExample()}</code>
          </pre>
        </div>
      )}
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Basic Demo */}
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Cards</h2>
              <p>Default card configurations with standard features</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {showComparison ? (
              <DemoComparison
                title="Stacked Cards"
                description="Multiple cards in a vertical stack layout"
                odlExample={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <Cards
                      title="Project Proposal.pdf"
                      subtitle="Last modified 2 hours ago • 2.5 MB"
                      tag="PDF"
                      selected={basicSelectedCards.has('card1')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('card1');
                        } else {
                          newSelected.delete('card1');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                      onInfoClick={() => alert('Info clicked for Project Proposal')}
                      onMenuClick={() => alert('Menu clicked for Project Proposal')}
                    />
                    <Cards
                      title="Financial Report Q4.xlsx"
                      subtitle="Last modified yesterday • 854 KB"
                      tag="XLSX"
                      selected={basicSelectedCards.has('card2')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('card2');
                        } else {
                          newSelected.delete('card2');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                      onInfoClick={() => alert('Info clicked for Financial Report')}
                      onMenuClick={() => alert('Menu clicked for Financial Report')}
                    />
                    <Cards
                      title="Meeting Notes.docx"
                      subtitle="Last modified 3 days ago • 125 KB"
                      tag="DOCX"
                      selected={basicSelectedCards.has('card3')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('card3');
                        } else {
                          newSelected.delete('card3');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                      onInfoClick={() => alert('Info clicked for Meeting Notes')}
                      onMenuClick={() => alert('Menu clicked for Meeting Notes')}
                    />
                    <Cards
                      title="Design Mockups.sketch"
                      subtitle="Last modified 1 week ago • 45.2 MB"
                      tag="SKETCH"
                      selected={basicSelectedCards.has('card4')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('card4');
                        } else {
                          newSelected.delete('card4');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                      onInfoClick={() => alert('Info clicked for Design Mockups')}
                      onMenuClick={() => alert('Menu clicked for Design Mockups')}
                    />
                    <Cards
                      title="Marketing Strategy.pptx"
                      subtitle="Last modified 2 weeks ago • 12.8 MB"
                      tag="PPTX"
                      selected={basicSelectedCards.has('card5')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('card5');
                        } else {
                          newSelected.delete('card5');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                      onInfoClick={() => alert('Info clicked for Marketing Strategy')}
                      onMenuClick={() => alert('Menu clicked for Marketing Strategy')}
                    />
                  </div>
                }
                muiExample={
                  <ODLThemeProvider enableMui={true}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                      <MUICardComponent
                        title="Project Proposal.pdf"
                        subtitle="Last modified 2 hours ago • 2.5 MB"
                        tag="PDF"
                        selected={basicSelectedCards.has('card1')}
                        onSelect={(selected) => {
                          const newSelected = new Set(basicSelectedCards);
                          if (selected) {
                            newSelected.add('card1');
                          } else {
                            newSelected.delete('card1');
                          }
                          setBasicSelectedCards(newSelected);
                        }}
                        onInfoClick={() => alert('Info clicked for Project Proposal')}
                        onMenuClick={() => alert('Menu clicked for Project Proposal')}
                      />
                      <MUICardComponent
                        title="Financial Report Q4.xlsx"
                        subtitle="Last modified yesterday • 854 KB"
                        tag="XLSX"
                        selected={basicSelectedCards.has('card2')}
                        onSelect={(selected) => {
                          const newSelected = new Set(basicSelectedCards);
                          if (selected) {
                            newSelected.add('card2');
                          } else {
                            newSelected.delete('card2');
                          }
                          setBasicSelectedCards(newSelected);
                        }}
                        onInfoClick={() => alert('Info clicked for Financial Report')}
                        onMenuClick={() => alert('Menu clicked for Financial Report')}
                      />
                      <MUICardComponent
                        title="Meeting Notes.docx"
                        subtitle="Last modified 3 days ago • 125 KB"
                        tag="DOCX"
                        selected={basicSelectedCards.has('card3')}
                        onSelect={(selected) => {
                          const newSelected = new Set(basicSelectedCards);
                          if (selected) {
                            newSelected.add('card3');
                          } else {
                            newSelected.delete('card3');
                          }
                          setBasicSelectedCards(newSelected);
                        }}
                        onInfoClick={() => alert('Info clicked for Meeting Notes')}
                        onMenuClick={() => alert('Menu clicked for Meeting Notes')}
                      />
                      <MUICardComponent
                        title="Design Mockups.sketch"
                        subtitle="Last modified 1 week ago • 45.2 MB"
                        tag="SKETCH"
                        selected={basicSelectedCards.has('card4')}
                        onSelect={(selected) => {
                          const newSelected = new Set(basicSelectedCards);
                          if (selected) {
                            newSelected.add('card4');
                          } else {
                            newSelected.delete('card4');
                          }
                          setBasicSelectedCards(newSelected);
                        }}
                        onInfoClick={() => alert('Info clicked for Design Mockups')}
                        onMenuClick={() => alert('Menu clicked for Design Mockups')}
                      />
                      <MUICardComponent
                        title="Marketing Strategy.pptx"
                        subtitle="Last modified 2 weeks ago • 12.8 MB"
                        tag="PPTX"
                        selected={basicSelectedCards.has('card5')}
                        onSelect={(selected) => {
                          const newSelected = new Set(basicSelectedCards);
                          if (selected) {
                            newSelected.add('card5');
                          } else {
                            newSelected.delete('card5');
                          }
                          setBasicSelectedCards(newSelected);
                        }}
                        onInfoClick={() => alert('Info clicked for Marketing Strategy')}
                        onMenuClick={() => alert('Menu clicked for Marketing Strategy')}
                      />
                    </div>
                  </ODLThemeProvider>
                }
              />

            ) : (
              <div>
                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Default Card</h3>
                  <div style={{ marginBottom: '24px' }}>
                    <Cards
                      selected={basicSelectedCards.has('default')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('default');
                        } else {
                          newSelected.delete('default');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h3 style={{ marginBottom: '16px' }}>Card with Custom Content</h3>
                  <div style={{ marginBottom: '24px' }}>
                    <Cards
                      title="Project Proposal.pdf"
                      subtitle="Last modified 2 hours ago • 2.5 MB"
                      tag="PDF"
                      selected={basicSelectedCards.has('custom')}
                      onSelect={(selected) => {
                        const newSelected = new Set(basicSelectedCards);
                        if (selected) {
                          newSelected.add('custom');
                        } else {
                          newSelected.delete('custom');
                        }
                        setBasicSelectedCards(newSelected);
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ marginBottom: '16px' }}>Multiple Cards</h3>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '-1px', // Maintain visual border overlap
                padding: '4px', // Provide space for focus outlines
                margin: '-4px' // Offset the padding to maintain original position
              }}>
                <Cards 
                  title="Document 1" 
                  subtitle="First document in the list" 
                  tag="fA7985" 
                  selected={basicSelectedCards.has('doc1')}
                  onSelect={(selected) => {
                    const newSelected = new Set(basicSelectedCards);
                    if (selected) {
                      newSelected.add('doc1');
                    } else {
                      newSelected.delete('doc1');
                    }
                    setBasicSelectedCards(newSelected);
                  }}
                />
                <Cards 
                  title="Document 2" 
                  subtitle="Second document in the list" 
                  tag="bC1234" 
                  selected={basicSelectedCards.has('doc2')}
                  onSelect={(selected) => {
                    const newSelected = new Set(basicSelectedCards);
                    if (selected) {
                      newSelected.add('doc2');
                    } else {
                      newSelected.delete('doc2');
                    }
                    setBasicSelectedCards(newSelected);
                  }}
                  style={{ marginTop: '-1px', position: 'relative', zIndex: 1 }}
                />
                <Cards 
                  title="Document 3" 
                  subtitle="Third document in the list" 
                  tag="dE5678" 
                  selected={basicSelectedCards.has('doc3')}
                  onSelect={(selected) => {
                    const newSelected = new Set(basicSelectedCards);
                    if (selected) {
                      newSelected.add('doc3');
                    } else {
                      newSelected.delete('doc3');
                    }
                    setBasicSelectedCards(newSelected);
                  }}
                  style={{ marginTop: '-1px' }}
                />
              </div>
            </div>
            </div>
          </div>
        )}

        {/* Interactive Demo */}
        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Cards</h2>
              <p>Cards with selection and event handlers</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {showComparison ? (
              <DemoComparison
                title="Selectable Cards"
                description="Click anywhere on the card to select/deselect"
                odlExample={
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                      {[
                        { title: "Report Q4 2024.pdf", subtitle: "Financial report for Q4", tag: "2.5 MB" },
                        { title: "Budget Planning.xlsx", subtitle: "Annual budget spreadsheet", tag: "854 KB" },
                        { title: "Meeting Notes.docx", subtitle: "Team meeting notes", tag: "125 KB" },
                      ].map((doc, index) => (
                        <Cards
                          key={index}
                          selected={selectedCards.has(index)}
                          title={doc.title}
                          subtitle={doc.subtitle}
                          tag={doc.tag}
                          onSelect={(selected) => handleCardSelect(index, selected)}
                          onInfoClick={() => handleInfoClick(index)}
                          onMenuClick={() => handleMenuClick(index)}
                        />
                      ))}
                    </div>
                    {selectedCards.size > 0 && (
                      <p style={{ marginTop: '16px', color: '#0F62FE' }}>
                        {selectedCards.size} card{selectedCards.size > 1 ? 's' : ''} selected
                      </p>
                    )}
                  </div>
                }
                muiExample={
                  <ODLThemeProvider enableMui={true}>
                    <div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                        {[
                          { title: "Report Q4 2024.pdf", subtitle: "Financial report for Q4", tag: "2.5 MB" },
                          { title: "Budget Planning.xlsx", subtitle: "Annual budget spreadsheet", tag: "854 KB" },
                          { title: "Meeting Notes.docx", subtitle: "Team meeting notes", tag: "125 KB" },
                        ].map((doc, index) => (
                          <MUICardComponent
                            key={index}
                            selected={selectedCards.has(index)}
                            title={doc.title}
                            subtitle={doc.subtitle}
                            tag={doc.tag}
                            onSelect={(selected) => handleCardSelect(index, selected)}
                            onInfoClick={() => handleInfoClick(index)}
                            onMenuClick={() => handleMenuClick(index)}
                          />
                        ))}
                      </div>
                      {selectedCards.size > 0 && (
                        <p style={{ marginTop: '16px', color: '#0F62FE' }}>
                          {selectedCards.size} card{selectedCards.size > 1 ? 's' : ''} selected
                        </p>
                      )}
                    </div>
                  </ODLThemeProvider>
                }
              />
            ) : (
              <div style={{ marginTop: '24px' }}>
                <h3>Selectable Cards</h3>
                <p style={{ marginBottom: '16px' }}>Click anywhere on the card to select/deselect</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { title: "Report Q4 2024.pdf", subtitle: "Financial report for Q4", tag: "2.5 MB" },
                    { title: "Budget Planning.xlsx", subtitle: "Annual budget spreadsheet", tag: "854 KB" },
                    { title: "Meeting Notes.docx", subtitle: "Team meeting notes", tag: "125 KB" },
                  ].map((doc, index) => (
                    <Cards
                      key={index}
                      selected={selectedCards.has(index)}
                      title={doc.title}
                      subtitle={doc.subtitle}
                      tag={doc.tag}
                      onSelect={(selected) => handleCardSelect(index, selected)}
                      onInfoClick={() => handleInfoClick(index)}
                      onMenuClick={() => handleMenuClick(index)}
                    />
                  ))}
                </div>
                {selectedCards.size > 0 && (
                  <p style={{ marginTop: '16px', color: '#0F62FE' }}>
                    {selectedCards.size} card{selectedCards.size > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>
            )}
            </div>
          </div>
        )}

        {/* Variations Demo */}
        {selectedDemo === 'variations' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Card Variations</h2>
              <p>Different card configurations and options</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {showComparison ? (
              <DemoComparison
                title="Card Variations"
                description="Different card configurations and styles"
                odlExample={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
                    <Cards
                      selected={true}
                      title="Selected Document"
                      subtitle="This card is currently selected"
                      tag="fA7985"
                    />
                    <Cards
                      title="Document without tag"
                      subtitle="This card doesn't have a tag"
                    />
                    <Cards
                      title="Document without action icons"
                      subtitle="This card has no info or menu icons"
                      tag="fA7985"
                      showInfoIcon={false}
                      showMenuIcon={false}
                    />
                    <Cards
                      title="This is a very long document title that might wrap to multiple lines and shows how the component handles overflow gracefully"
                      subtitle="Secondary text for the long title document with additional details about the file"
                      tag="LongName.pdf"
                    />
                    <Cards
                      title="Minimal Card"
                      subtitle="Only essential elements"
                      showInfoIcon={false}
                      showMenuIcon={false}
                    />
                  </div>
                }
                muiExample={
                  <ODLThemeProvider enableMui={true}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
                      <MUICardComponent
                        selected={true}
                        title="Selected Document"
                        subtitle="This card is currently selected"
                        tag="fA7985"
                      />
                      <MUICardComponent
                        title="Document without tag"
                        subtitle="This card doesn't have a tag"
                      />
                      <MUICardComponent
                        title="Document without action icons"
                        subtitle="This card has no info or menu icons"
                        tag="fA7985"
                        showInfoIcon={false}
                        showMenuIcon={false}
                      />
                      <MUICardComponent
                        title="This is a very long document title that might wrap to multiple lines and shows how the component handles overflow gracefully"
                        subtitle="Secondary text for the long title document with additional details about the file"
                        tag="LongName.pdf"
                      />
                      <MUICardComponent
                        title="Minimal Card"
                        subtitle="Only essential elements"
                        showInfoIcon={false}
                        showMenuIcon={false}
                      />
                    </div>
                  </ODLThemeProvider>
                }
              />
            ) : (
              <div>
                <div style={{ marginTop: '24px' }}>
                  <h3>Selected Card</h3>
                  <Cards
                    selected={true}
                    title="Selected Document"
                    subtitle="This card is currently selected"
                    tag="fA7985"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Card without Tag</h3>
                  <Cards
                    title="Document without tag"
                    subtitle="This card doesn't have a tag"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Card without Action Icons</h3>
                  <Cards
                    title="Document without action icons"
                    subtitle="This card has no info or menu icons"
                    tag="fA7985"
                    showInfoIcon={false}
                    showMenuIcon={false}
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Long Content Card</h3>
                  <Cards
                    title="This is a very long document title that might wrap to multiple lines and shows how the component handles overflow gracefully"
                    subtitle="Secondary text for the long title document with additional details about the file"
                    tag="LongName.pdf"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Minimal Card</h3>
                  <Cards
                    title="Minimal Card"
                    subtitle="Only essential elements"
                    showInfoIcon={false}
                    showMenuIcon={false}
                  />
                </div>
              </div>
            )}
            </div>
          </div>
        )}

        {/* States Demo */}
        {selectedDemo === 'states' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Card States</h2>
              <p>Different visual states and behaviors</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {showComparison ? (
              <DemoComparison
                title="Card States"
                description="Different visual states and hover behaviors"
                odlExample={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
                    <Cards
                      title="Default State Card"
                      subtitle="Normal appearance"
                      tag="Default"
                    />
                    <Cards
                      title="Hoverable Card"
                      subtitle="This card responds to hover"
                      tag="Hover"
                    />
                    <Cards
                      selected={true}
                      title="Selected State Card"
                      subtitle="This card is selected"
                      tag="Selected"
                    />
                    <Cards
                      title="Focusable Card"
                      subtitle="This card can receive keyboard focus"
                      tag="Focus"
                    />
                  </div>
                }
                muiExample={
                  <ODLThemeProvider enableMui={true}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end' }}>
                      <MUICardComponent
                        title="Default State Card"
                        subtitle="Normal appearance"
                        tag="Default"
                      />
                      <MUICardComponent
                        title="Hoverable Card"
                        subtitle="This card responds to hover"
                        tag="Hover"
                      />
                      <MUICardComponent
                        selected={true}
                        title="Selected State Card"
                        subtitle="This card is selected"
                        tag="Selected"
                      />
                      <MUICardComponent
                        title="Focusable Card"
                        subtitle="This card can receive keyboard focus"
                        tag="Focus"
                      />
                    </div>
                  </ODLThemeProvider>
                }
              />
            ) : (
              <div>
                <div style={{ marginTop: '24px' }}>
                  <h3>Default State</h3>
                  <Cards
                    title="Default State Card"
                    subtitle="Normal appearance"
                    tag="Default"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Hover State</h3>
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Hover over the card to see the effect</p>
                  <Cards
                    title="Hoverable Card"
                    subtitle="This card responds to hover"
                    tag="Hover"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Selected State</h3>
                  <Cards
                    selected={true}
                    title="Selected State Card"
                    subtitle="This card is selected"
                    tag="Selected"
                  />
                </div>

                <div style={{ marginTop: '24px' }}>
                  <h3>Focus State</h3>
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#666' }}>Tab to this card to see focus outline</p>
                  <Cards
                    title="Focusable Card"
                    subtitle="This card can receive keyboard focus"
                    tag="Focus"
                  />
                </div>
              </div>
            )}
            </div>
          </div>
        )}

        {/* Real World Demo */}
        {selectedDemo === 'realworld' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Real World Examples</h2>
              <p>Practical implementations of the card component</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {showComparison ? (
              <DemoComparison
                title="Document Cards"
                description="Real-world examples with various document types"
                odlExample={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <Cards
                      title="Annual Report 2024.pdf"
                      subtitle="Last modified yesterday • 4.2 MB"
                      tag="PDF"
                      selected={false}
                      onInfoClick={() => alert('View document info')}
                      onMenuClick={() => alert('Open document menu')}
                    />
                    <Cards
                      title="Q4 Budget Review.xlsx"
                      subtitle="Last modified 2 days ago • 1.8 MB"
                      tag="XLSX"
                      selected={false}
                      onInfoClick={() => alert('View spreadsheet info')}
                      onMenuClick={() => alert('Open spreadsheet menu')}
                    />
                    <Cards
                      title="Product Roadmap.pptx"
                      subtitle="Last modified 1 week ago • 15.3 MB"
                      tag="PPTX"
                      selected={true}
                      onInfoClick={() => alert('View presentation info')}
                      onMenuClick={() => alert('Open presentation menu')}
                    />
                    <Cards
                      title="Team Meeting Notes.docx"
                      subtitle="Last modified 3 hours ago • 245 KB"
                      tag="DOCX"
                      selected={false}
                      onInfoClick={() => alert('View document info')}
                      onMenuClick={() => alert('Open document menu')}
                    />
                    <Cards
                      title="Architecture Diagram.svg"
                      subtitle="Last modified 5 days ago • 892 KB"
                      tag="SVG"
                      selected={false}
                      showInfoIcon={false}
                      onMenuClick={() => alert('Open image menu')}
                    />
                  </div>
                }
                muiExample={
                  <ODLThemeProvider enableMui={true}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                      <MUICardComponent
                        title="Annual Report 2024.pdf"
                        subtitle="Last modified yesterday • 4.2 MB"
                        tag="PDF"
                        selected={false}
                        onInfoClick={() => alert('View document info')}
                        onMenuClick={() => alert('Open document menu')}
                      />
                      <MUICardComponent
                        title="Q4 Budget Review.xlsx"
                        subtitle="Last modified 2 days ago • 1.8 MB"
                        tag="XLSX"
                        selected={false}
                        onInfoClick={() => alert('View spreadsheet info')}
                        onMenuClick={() => alert('Open spreadsheet menu')}
                      />
                      <MUICardComponent
                        title="Product Roadmap.pptx"
                        subtitle="Last modified 1 week ago • 15.3 MB"
                        tag="PPTX"
                        selected={true}
                        onInfoClick={() => alert('View presentation info')}
                        onMenuClick={() => alert('Open presentation menu')}
                      />
                      <MUICardComponent
                        title="Team Meeting Notes.docx"
                        subtitle="Last modified 3 hours ago • 245 KB"
                        tag="DOCX"
                        selected={false}
                        onInfoClick={() => alert('View document info')}
                        onMenuClick={() => alert('Open document menu')}
                      />
                      <MUICardComponent
                        title="Architecture Diagram.svg"
                        subtitle="Last modified 5 days ago • 892 KB"
                        tag="SVG"
                        selected={false}
                        showInfoIcon={false}
                        onMenuClick={() => alert('Open image menu')}
                      />
                    </div>
                  </ODLThemeProvider>
                }
              />
            ) : (
              <>
                {/* User Cards */}
                <div style={{ marginTop: '24px' }}>
                  <h3>👤 User Cards</h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                    gap: '16px',
                    marginTop: '16px',
                  }}>
                    <UserCard
                  name="Sarah Johnson"
                  role="Senior UI/UX Designer"
                  department="Design Team"
                  email="sarah.j@company.com"
                  status="active"
                  lastActive="2 mins ago"
                  tags={["Full-time", "Senior level"]}
                  actions={{
                    onMessage: () => alert('Message Sarah'),
                    onCall: () => alert('Call Sarah'),
                  }}
                  onSave={(saved) => console.log('Saved:', saved)}
                />
                <UserCard
                  name="Michael Chen"
                  role="Frontend Developer"
                  department="Engineering"
                  email="m.chen@company.com"
                  status="away"
                  lastActive="30 mins ago"
                  tags={["Contract", "Remote"]}
                  actions={{
                    onMessage: () => alert('Message Michael'),
                    onCall: () => alert('Call Michael'),
                  }}
                />
                <UserCard
                  initials="EP"
                  name="Emily Parker"
                  role="Product Manager"
                  department="Product"
                  email="emily.p@company.com"
                  status="offline"
                  lastActive="2 hours ago"
                  tags={["Full-time", "In office"]}
                  actions={{
                    onMessage: () => alert('Message Emily'),
                  }}
                />
              </div>
            </div>

            {/* Document Analytics Cards */}
            <div style={{ marginTop: '24px' }}>
              <h3>📊 Document Analytics</h3>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px',
                marginTop: '16px',
              }}>
                <ChartCard
                  title="Total Documents"
                  subtitle="Documents in system"
                  value="45,892"
                  change={{
                    value: 3248,
                    percentage: 7.6,
                    trend: 'up'
                  }}
                  timeframe="last month"
                  sparklineData={[38, 40, 39, 42, 41, 43, 44, 43, 44, 45, 46, 46]}
                  type="area"
                  color="#24A148"
                  icon="document"
                  actions={{
                    onViewDetails: () => alert('View document statistics'),
                    onExport: () => alert('Export document data'),
                  }}
                />
                <ChartCard
                  title="Pending Reviews"
                  subtitle="Documents awaiting approval"
                  value="234"
                  change={{
                    value: -45,
                    percentage: -16.1,
                    trend: 'down'
                  }}
                  timeframe="last week"
                  sparklineData={[280, 275, 270, 265, 260, 250, 245, 240, 238, 235, 234, 234]}
                  type="line"
                  color="#3560C1"
                  icon="document-tasks"
                  actions={{
                    onViewDetails: () => alert('View pending documents'),
                    onRefresh: () => alert('Refresh pending count'),
                  }}
                />
                <ChartCard
                  title="Processing Rate"
                  subtitle="Documents processed per hour"
                  value="127/hr"
                  change={{
                    value: 12,
                    percentage: 10.4,
                    trend: 'up'
                  }}
                  timeframe="today"
                  sparklineData={[95, 102, 98, 110, 115, 108, 118, 122, 125, 120, 127, 127]}
                  type="bar"
                  icon="activity"
                  actions={{
                    onViewDetails: () => alert('View processing metrics'),
                  }}
                />
                <ChartCard
                  title="Storage Used"
                  subtitle="Document storage consumption"
                  value="2.4 TB"
                  change={{
                    value: 0.2,
                    percentage: 9.1,
                    trend: 'up'
                  }}
                  timeframe="this month"
                  sparklineData={[2.0, 2.05, 2.08, 2.12, 2.15, 2.18, 2.22, 2.25, 2.28, 2.32, 2.36, 2.4]}
                  type="area"
                  color="#F1C21B"
                  icon="data-base"
                  actions={{
                    onViewDetails: () => alert('View storage breakdown'),
                    onExport: () => alert('Export storage report'),
                  }}
                />
                <ChartCard
                  title="Compliance Score"
                  subtitle="Document compliance rate"
                  value="94.2%"
                  change={{
                    value: 2.3,
                    percentage: 2.5,
                    trend: 'up'
                  }}
                  timeframe="this quarter"
                  sparklineData={[89, 90, 88, 91, 90, 92, 91, 93, 92, 94, 93, 94]}
                  type="line"
                  color="#24A148"
                  icon="checkmark-filled"
                  actions={{
                    onViewDetails: () => alert('View compliance details'),
                  }}
                />
                <ChartCard
                  title="Active Workflows"
                  subtitle="Documents in workflow"
                  value="1,847"
                  change={{
                    value: 0,
                    percentage: 0,
                    trend: 'neutral'
                  }}
                  timeframe="real-time"
                  sparklineData={[1847, 1845, 1848, 1844, 1849, 1843, 1850, 1846, 1847, 1845, 1848, 1847]}
                  type="bar"
                  color="#8D8D8D"
                  icon="renew"
                  actions={{
                    onViewDetails: () => alert('View active workflows'),
                    onRefresh: () => alert('Refresh workflow status'),
                  }}
                />
              </div>
            </div>

            {/* Status Cards - Dashboard Style */}
            <div style={{ marginTop: '32px' }}>
              <h3>📈 Dashboard Status Cards</h3>
              <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '8px' }}>
                Compact status cards for dashboards and analytics pages
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginTop: '16px'
              }}>
                {[
                  { label: 'Total Applications', value: '142', change: '+12%', icon: 'document-tasks', color: '#3560C1' },
                  { label: 'Under Review', value: '48', change: '+5%', icon: 'time', color: '#F59E0B' },
                  { label: 'Approved', value: '72', change: '+18%', icon: 'checkmark-filled', color: '#10B981' },
                  { label: 'Rejected', value: '22', change: '-8%', icon: 'close', color: '#EF4444' },
                ].map((stat, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '8px',
                      background: `${stat.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon name={stat.icon} size={24} color={stat.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#6B7280', fontSize: '13px', margin: 0, fontWeight: 500 }}>{stat.label}</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '4px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, margin: 0, color: '#111827' }}>
                          {stat.value}
                        </h3>
                        <span style={{ 
                          fontSize: '12px', 
                              color: stat.change.startsWith('+') ? '#10B981' : '#EF4444',
                          fontWeight: 500,
                          background: stat.change.startsWith('+') ? '#10B98115' : '#EF444415',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    {/* Optional corner decoration */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '60px',
                      height: '60px',
                      background: `${stat.color}08`,
                      borderRadius: '0 0 0 100%',
                    }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Cards with Progress */}
            <div style={{ marginTop: '32px' }}>
              <h3>📊 Metric Cards with Progress</h3>
              <p style={{ color: '#6B7280', fontSize: '14px', marginTop: '8px' }}>
                Status cards with progress indicators and detailed metrics
              </p>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginTop: '16px'
              }}>
                {[
                  { label: 'Project Completion', value: '65%', progress: 65, status: 'On Track', icon: 'chart-line', color: '#3560C1' },
                  { label: 'Team Productivity', value: '92%', progress: 92, status: 'Excellent', icon: 'user-multiple', color: '#10B981' },
                  { label: 'Budget Utilization', value: '78%', progress: 78, status: 'Warning', icon: 'currency', color: '#F59E0B' },
                  { label: 'Risk Assessment', value: '45%', progress: 45, status: 'Moderate', icon: 'warning', color: '#6B7280' },
                ].map((metric, index) => (
                  <div key={index} style={{
                    background: 'white',
                    borderRadius: '8px',
                    padding: '20px',
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 500, color: '#374151' }}>{metric.label}</h4>
                        <p style={{ margin: '4px 0 0 0', fontSize: '24px', fontWeight: 700, color: metric.color }}>
                          {metric.value}
                        </p>
                      </div>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: `${metric.color}15`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Icon name={metric.icon} size={20} color={metric.color} />
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ 
                        height: '6px', 
                        background: '#E5E7EB', 
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${metric.progress}%`,
                          height: '100%',
                          background: metric.color,
                          transition: 'width 0.3s ease',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ 
                        fontSize: '12px', 
                            color: '#6B7280',
                        fontWeight: 500
                      }}>
                        Status: {metric.status}
                      </span>
                      <Icon name="arrow-right" size={16} color="#9CA3AF" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
              </>
            )}
            </div>
          </div>
        )}

        {/* Activity Cards Demo */}
        {selectedDemo === 'activity' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Activity Cards</h2>
              <p>Timeline and activity feed cards for dashboards and activity streams</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>

            {/* Activity Feed Cards - ODL Implementation Only */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    maxWidth: '600px'
                  }}>
                    {[
                      {
                            id: 1,
                        title: 'New application submitted',
                        description: 'Building consent application for residential extension',
                        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                        user: 'Sarah Chen',
                        icon: 'document-add',
                        color: 'blue',
                        relatedItem: 'BC-2024-0156'
                      },
                      {
                        id: 2,
                        title: 'Site inspection completed',
                        description: 'Foundation inspection passed with no issues found',
                        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                        user: 'Mike Torres',
                        icon: 'checkmark-filled',
                        color: 'green',
                        relatedItem: 'BC-2024-0143'
                      },
                      {
                        id: 3,
                        title: 'Document review required',
                        description: 'Engineering drawings require additional approval',
                        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                        user: 'Emma Wilson',
                        icon: 'warning',
                        color: 'orange',
                        relatedItem: 'BC-2024-0134'
                      },
                      {
                        id: 4,
                        title: 'Approval granted',
                        description: 'Building consent approved and certificate issued',
                        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                        user: 'James Park',
                        icon: 'certificate',
                        color: 'green',
                        relatedItem: 'BC-2024-0128'
                      },
                      {
                        id: 5,
                        title: 'Payment received',
                        description: 'Application fee payment processed successfully',
                        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
                        user: 'Lisa Anderson',
                        icon: 'money',
                        color: 'purple',
                        relatedItem: 'BC-2024-0122'
                  }
                ].map(activity => {
                  const getIconColor = () => {
                    switch(activity.color) {
                      case 'green': return '#10B981';
                      case 'blue': return '#3B82F6';
                      case 'orange': return '#F59E0B';
                      case 'yellow': return '#EAB308';
                      case 'purple': return '#8B5CF6';
                      default: return '#6B7280';
                    }
                  };

                  const formatTimeAgo = (date: Date) => {
                    const now = new Date();
                    const diff = now.getTime() - date.getTime();
                    const hours = Math.floor(diff / 3600000);
                    
                    if (hours < 1) {
                      const minutes = Math.floor(diff / 60000);
                      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
                    } else if (hours < 24) {
                      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
                    } else {
                      const days = Math.floor(hours / 24);
                      return `${days} day${days !== 1 ? 's' : ''} ago`;
                    }
                  };

                  return (
                    <div 
                      key={activity.id} 
                      style={{
                        padding: '12px',
                        border: '1px solid #E5E7EB',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#F9FAFB';
                        e.currentTarget.style.borderColor = '#D1D5DB';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onClick={() => console.log('Activity clicked:', activity.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <div style={{ flexShrink: 0, marginTop: '2px' }}>
                          <Icon 
                            name={activity.icon || 'information'}
                            size={20}
                            color={getIconColor()}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 style={{ fontWeight: '500', fontSize: '14px', color: '#111827', margin: '0 0 4px 0' }}>{activity.title}</h4>
                          <p style={{ fontSize: '12px', color: '#6B7280', margin: '0 0 8px 0' }}>{activity.description}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#9CA3AF' }}>
                            <span>{formatTimeAgo(activity.timestamp)}</span>
                            <span>•</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ 
                                width: '20px', 
                                height: '20px', 
                                borderRadius: '50%', 
                                backgroundColor: '#E5E7EB', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                fontSize: '10px',
                                fontWeight: '600',
                                    color: '#6B7280'
                              }}>
                                {activity.user.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </div>
                              <span>by {activity.user}</span>
                            </div>
                            <span>•</span>
                            <span style={{ color: '#2563EB', fontWeight: '500', cursor: 'pointer' }}>
                              {activity.relatedItem}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
                <button style={{ fontSize: '12px', color: '#2563EB', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer' }}>
                  View all activity →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Showcase Section */}
      <div className={styles.featuresShowcase}>
        <div className={styles.sectionHeader}>
          <h3>Card Component Features</h3>
          <p>Everything you need for flexible card-based layouts</p>
        </div>
        
        <div className={styles.featureGrid}>
          <div className={styles.featureCategory}>
            <h4>🎨 Design</h4>
            <ul>
              <li>✓ Horizontal layout</li>
              <li>✓ Folder icon</li>
              <li>✓ Title & subtitle</li>
              <li>✓ Optional tags</li>
              <li>✓ Action icons</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>📏 Customization</h4>
            <ul>
              <li>✓ Selectable checkbox</li>
              <li>✓ Hide/show icons</li>
              <li>✓ Custom content</li>
              <li>✓ Flexible tags</li>
              <li>✓ Event handlers</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>⚡ States</h4>
            <ul>
              <li>✓ Default state</li>
              <li>✓ Hover effects</li>
              <li>✓ Selected state</li>
              <li>✓ Focus indicators</li>
              <li>✓ Smooth transitions</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>👍 Accessibility</h4>
            <ul>
              <li>✓ Keyboard navigation</li>
              <li>✓ Focus management</li>
              <li>✓ ARIA support</li>
              <li>✓ Screen reader ready</li>
              <li>✓ Clear labels</li>
            </ul>
          </div>
          
          <div className={styles.featureCategory}>
            <h4>🎯 Use Cases</h4>
            <ul>
              <li>✓ File browsers</li>
              <li>✓ Document lists</li>
              <li>✓ Task management</li>
              <li>✓ Selection lists</li>
              <li>✓ Item catalogs</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Status Cards Demo */}
      {selectedDemo === 'status' && (
        <div className={styles.tableSection}>
          <div className={styles.sectionHeader}>
            <h2>Status Cards</h2>
            <p>Dashboard status and metric cards with gradients and trends</p>
          </div>
          <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px', overflow: 'visible' }}>
            
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Dashboard Metrics</h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px'
              }}>
                {/* Total Amendments Card */}
                <div style={{
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(53, 96, 193, 0.063), white)',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '4px' }}>
                        Total Amendments
                      </p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#161616' }}>
                          27
                        </h3>
                        <span style={{ fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: '#24A148' }}>
                          <Icon name="arrow-up" size={12} />
                          12%
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#8D8D8D', marginTop: '4px' }}>
                        All active amendments
                      </p>
                    </div>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(53, 96, 193, 0.082)' }}>
                      <Icon name="document" size={20} color="#3560C1" />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px', marginTop: '12px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
                      vs last month
                    </p>
                  </div>
                </div>

                {/* Awaiting Approval Card */}
                <div style={{
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(241, 194, 27, 0.063), white)',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '4px' }}>
                        Awaiting Approval
                      </p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#161616' }}>
                          25
                        </h3>
                        <span style={{ fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: '#DA1E28' }}>
                          <Icon name="arrow-down" size={12} />
                          8%
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#8D8D8D', marginTop: '4px' }}>
                        Manager approval pending
                      </p>
                    </div>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(241, 194, 27, 0.082)' }}>
                      <Icon name="time" size={20} color="#F1C21B" />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px', marginTop: '12px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
                      vs last week
                    </p>
                  </div>
                </div>

                {/* Draft Status Card */}
                <div style={{
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(36, 161, 72, 0.063), white)',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '4px' }}>
                        Draft Status
                      </p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#161616' }}>
                          22
                        </h3>
                        <span style={{ fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: '#24A148' }}>
                          <Icon name="arrow-up" size={12} />
                          15%
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#8D8D8D', marginTop: '4px' }}>
                        In preparation
                      </p>
                    </div>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(36, 161, 72, 0.082)' }}>
                      <Icon name="document" size={20} color="#24A148" />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px', marginTop: '12px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
                      vs last month
                    </p>
                  </div>
                </div>

                {/* Comments Card */}
                <div style={{
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  padding: '16px',
                  background: 'linear-gradient(135deg, rgba(218, 30, 40, 0.063), white)',
                  transition: 'box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '4px' }}>
                        Comments
                      </p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#161616' }}>
                          532
                        </h3>
                        <span style={{ fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: '#DA1E28' }}>
                          <Icon name="arrow-down" size={12} />
                          5%
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#8D8D8D', marginTop: '4px' }}>
                        Total comments
                      </p>
                    </div>
                    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(218, 30, 40, 0.082)' }}>
                      <Icon name="chat" size={20} color="#DA1E28" />
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px', marginTop: '12px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
                      vs yesterday
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Code Example</h3>
              <div style={{ 
                backgroundColor: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                overflow: 'auto'
              }}>
                <pre style={{ margin: 0 }}>
{`<div style={{
  borderRadius: '8px',
  border: '1px solid #E0E0E0',
  padding: '16px',
  background: 'linear-gradient(135deg, rgba(53, 96, 193, 0.063), white)',
  transition: 'box-shadow 0.2s',
  cursor: 'pointer'
}}
onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)' }}
onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
    <div>
      <p style={{ fontSize: '11px', color: '#525252', marginBottom: '4px' }}>
        Total Amendments
      </p>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#161616' }}>
          27
        </h3>
        <span style={{ fontSize: '11px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', color: '#24A148' }}>
          <Icon name="arrow-up" size={12} />
          12%
        </span>
      </div>
      <p style={{ fontSize: '11px', color: '#8D8D8D', marginTop: '4px' }}>
        All active amendments
      </p>
    </div>
    <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: 'rgba(53, 96, 193, 0.082)' }}>
      <Icon name="document" size={20} color="#3560C1" />
    </div>
  </div>
  <div style={{ borderTop: '1px solid #E0E0E0', paddingTop: '12px', marginTop: '12px' }}>
    <p style={{ fontSize: '14px', fontWeight: 500, color: '#161616' }}>
      vs last month
    </p>
  </div>
</div>`}
                </pre>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Features</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Gradient backgrounds for visual hierarchy
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Trend indicators with up/down arrows
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Comparison periods (vs last month/week/day)
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Icon badges with matching color schemes
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Hover effects for interactivity
                </li>
                <li style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  ✅ Responsive grid layout
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default CardsDemo; 