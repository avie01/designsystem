import React, { useState, useRef } from 'react';
import Drawer from '../components/Drawer/Drawer';
import Button from '../components/Button/Button';
import Icon from '../components/Icon/Icon';
import Input from '../components/Input/Input';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';
import samplePDF from '../Images/A1_5_18-Aug-2023.pdf';

type DemoType = 'positions' | 'overlay-comparison' | 'sizes' | 'with-content' | 'with-footer' | 'interactive' | 'document-preview';

const DrawerDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<DemoType>('positions');
  const [showCode, setShowCode] = useState(false);
  
  // Drawer states for position demos
  const [drawers, setDrawers] = useState({
    top: false,
    right: false,
    bottom: false,
    left: false
  });
  
  // Form states for Account Settings
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    email: 'john.doe@company.com',
    bio: 'Senior developer with 8+ years of experience in React and TypeScript.'
  });
  
  // Overlay comparison states
  const [overlayDrawers, setOverlayDrawers] = useState({
    withOverlay: false,
    withoutOverlay: false
  });
  
  // Size demo states
  const [sizeDrawers, setSizeDrawers] = useState({
    small: false,
    medium: false,
    large: false,
    half: false
  });
  
  // Content demo states
  const [contentDrawers, setContentDrawers] = useState({
    basic: false,
    withForm: false,
    withList: false
  });
  
  // Footer demo state
  const [footerDrawer, setFooterDrawer] = useState(false);
  
  // Interactive demo state
  const [interactiveDrawer, setInteractiveDrawer] = useState(false);
  
  // Document preview states
  const [documentDrawer, setDocumentDrawer] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Mouse wheel zoom support
  React.useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!documentDrawer) return;
      
      const drawer = document.querySelector('[role="dialog"]');
      if (!drawer || !drawer.contains(e.target as Node)) return;
      
      e.preventDefault();
      if (e.deltaY < 0) {
        setZoomLevel(prev => Math.min(prev + 10, 200));
      } else {
        setZoomLevel(prev => Math.max(prev - 10, 50));
      }
    };
    
    if (documentDrawer) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => window.removeEventListener('wheel', handleWheel);
  }, [documentDrawer]);
  
  
  const openDrawer = (position: keyof typeof drawers) => {
    setDrawers(prev => ({ ...prev, [position]: true }));
  };
  
  const closeDrawer = (position: keyof typeof drawers) => {
    setDrawers(prev => ({ ...prev, [position]: false }));
  };
  
  
  const codeExamples = {
    positions: `// Drawer in Different Positions
// Top drawer
<Drawer
  isOpen={isTopOpen}
  onClose={() => setIsTopOpen(false)}
  position="top"
  title="Top Drawer"
  height="300px"
>
  Content appears from the top
</Drawer>

// Right drawer (default)
<Drawer
  isOpen={isRightOpen}
  onClose={() => setIsRightOpen(false)}
  position="right"
  title="Right Drawer"
  width="400px"
>
  Content slides from the right
</Drawer>

// Bottom drawer
<Drawer
  isOpen={isBottomOpen}
  onClose={() => setIsBottomOpen(false)}
  position="bottom"
  title="Bottom Drawer"
  height="350px"
>
  Content slides up from the bottom
</Drawer>

// Left drawer
<Drawer
  isOpen={isLeftOpen}
  onClose={() => setIsLeftOpen(false)}
  position="left"
  title="Left Drawer"
  width="350px"
>
  Content slides from the left
</Drawer>`,

    'overlay-comparison': `// Overlay On vs Off Comparison
// With overlay (default) - blocks interaction with page
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  overlay={true}  // Shows dark backdrop
  title="With Overlay"
>
  This drawer has a dark overlay that blocks page interaction
</Drawer>

// Without overlay - allows page interaction
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  overlay={false}  // No backdrop, page remains interactive
  title="Without Overlay"
>
  This drawer has no overlay, page remains interactive
</Drawer>`,

    sizes: `// Different Drawer Sizes
// Small drawer
<Drawer
  isOpen={isSmallOpen}
  onClose={() => setIsSmallOpen(false)}
  position="right"
  width="300px"
  title="Small Drawer"
>
  Compact drawer for simple content
</Drawer>

// Medium drawer (default)
<Drawer
  isOpen={isMediumOpen}
  onClose={() => setIsMediumOpen(false)}
  position="right"
  width="400px"
  title="Medium Drawer"
>
  Standard sized drawer
</Drawer>

// Large drawer
<Drawer
  isOpen={isLargeOpen}
  onClose={() => setIsLargeOpen(false)}
  position="right"
  width="600px"
  title="Large Drawer"
>
  Wide drawer for detailed content
</Drawer>

// Half screen drawer - responsive!
<Drawer
  isOpen={isHalfOpen}
  onClose={() => setIsHalfOpen(false)}
  position="right"
  width="half"  // 50% of viewport width
  title="Half Screen Drawer"
>
  Responsive drawer that adapts to screen size
</Drawer>

// Works for vertical drawers too
<Drawer
  isOpen={isBottomOpen}
  onClose={() => setIsBottomOpen(false)}
  position="bottom"
  height="half"  // 50% of viewport height
  title="Half Height Drawer"
>
  Takes up 50% of screen height
</Drawer>`,

    'with-content': `// Drawers with Rich Content
// Basic content
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  title="User Profile"
>
  <div>
    <h3>Profile Information</h3>
    <p>Name: John Doe</p>
    <p>Email: john@example.com</p>
  </div>
</Drawer>

// Form content
<Drawer
  isOpen={isFormOpen}
  onClose={onClose}
  position="right"
  title="Edit Settings"
  width="500px"
>
  <form>
    <Input label="Name" />
    <Input label="Email" type="email" />
    <textarea placeholder="Description" />
  </form>
</Drawer>`,

    'with-footer': `// Drawer with Footer Actions
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" size="small" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" size="small" onClick={handleConfirm}>
        Confirm
      </Button>
    </>
  }
>
  Are you sure you want to proceed with this action?
</Drawer>`,

    interactive: `// Interactive Drawer Features
<Drawer
  isOpen={isOpen}
  onClose={onClose}
  position="right"
  title="Interactive Drawer"
  overlay={true}
  closeOnEscape={true}
  closeOnBackdropClick={true}
  width="450px"
  footer={
    <Button variant="primary" onClick={handleAction}>
      Take Action
    </Button>
  }
>
  <p>This drawer demonstrates all interactive features:</p>
  <ul>
    <li>✅ Close with Escape key</li>
    <li>✅ Close by clicking backdrop</li>
    <li>✅ Focus trap for accessibility</li>
    <li>✅ Smooth animations</li>
  </ul>
</Drawer>`,

    'document-preview': `// Document Preview Drawer
<Drawer
  isOpen={isDocumentOpen}
  onClose={() => setIsDocumentOpen(false)}
  position="right"
  width="half"        // 50% of screen width
  overlay={false}     // No overlay - page remains interactive
  title="Document Preview"
>
  <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    {/* Zoom Controls */}
    <div style={{ padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
      <Button onClick={() => setZoom(z => Math.max(z - 10, 50))}>-</Button>
      <span>{zoom}%</span>
      <Button onClick={() => setZoom(z => Math.min(z + 10, 200))}>+</Button>
      <Button onClick={() => setZoom(100)}>Reset</Button>
    </div>
    
    {/* PDF Viewer */}
    <iframe
      src={pdfUrl}
      style={{
        width: '100%',
        height: '100%',
        transform: \`scale(\${zoom / 100})\`,
        transformOrigin: 'top center'
      }}
    />
  </div>
</Drawer>`
  };
  
  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Drawer" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Drawer Component</h1>
            <p>Sliding panels for navigation, forms, and detailed content with ODL theme</p>
          </div>
          <button
            className={styles.viewCodeButton}
            onClick={() => setShowCode(!showCode)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: ODLTheme.borders.radius.md,
              border: `1px solid ${showCode ? ODLTheme.colors.primary : ODLTheme.colors.border}`,
              background: showCode ? ODLTheme.colors.primary : 'white',
              color: showCode ? 'white' : ODLTheme.colors.text.primary,
              fontSize: ODLTheme.typography.fontSize.base,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon name="code" size={20} />
            {showCode ? 'Hide Code' : 'View Code'}
          </button>
        </div>
      </div>
      
      {/* Demo Selector */}
      <div className={styles.demoSelector}>
        <div className={styles.demoTabs} style={{ maxWidth: '1600px' }}>
          {[
            { key: 'positions', label: 'Four Positions', icon: '📍' },
            { key: 'overlay-comparison', label: 'Overlay On/Off', icon: '🎭' },
            { key: 'sizes', label: 'Different Sizes', icon: '📏' },
            { key: 'with-content', label: 'Rich Content', icon: '📝' },
            { key: 'with-footer', label: 'With Footer', icon: '🔽' },
            { key: 'interactive', label: 'Interactive', icon: '⚡' },
            { key: 'document-preview', label: 'Document Preview', icon: '📄' }
          ].map(demo => (
            <button
              key={demo.key}
              className={`${styles.demoTab} ${selectedDemo === demo.key ? styles.active : ''}`}
              onClick={() => setSelectedDemo(demo.key as DemoType)}
            >
              <span className={styles.demoIcon}>{demo.icon}</span>
              <div className={styles.demoTabContent}>
                <span className={styles.demoLabel}>{demo.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'positions' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Drawer Positions</h2>
              <p>Drawers can slide from any of the four screen edges</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                gap: '1.5rem',
                marginBottom: '2rem'
              }}>
                <Button 
                  variant="primary" 
                  onClick={() => openDrawer('top')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Icon name="arrow-up" size={16} />
                  Open Top Drawer
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => openDrawer('right')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Icon name="arrow-right" size={16} />
                  Open Right Drawer
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => openDrawer('bottom')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Icon name="arrow-down" size={16} />
                  Open Bottom Drawer
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => openDrawer('left')}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <Icon name="arrow-left" size={16} />
                  Open Left Drawer
                </Button>
              </div>
              
              {/* Position Drawers */}
              <Drawer
                isOpen={drawers.top}
                onClose={() => closeDrawer('top')}
                position="top"
                title="Document Workflow Actions"
                height="280px"
                overlay={false}
              >
                <div style={{ padding: '0.3rem 1rem', height: '100%', boxSizing: 'border-box' }}>
                  {/* Workflow Action Cards Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(6, 1fr)', 
                    gap: '0.75rem',
                    height: '100%'
                  }}>
                    {/* Summarise Document */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed ${ODLTheme.colors.primary}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: ODLTheme.colors.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="document" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        Summarise
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        AI-powered summary
                      </div>
                    </div>
                    
                    {/* Redact Content */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed #DC2626`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: '#DC2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="view-off" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        Redact
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        Remove sensitive data
                      </div>
                    </div>
                    
                    {/* Extract Data */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed ${ODLTheme.colors.success}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: ODLTheme.colors.success,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="data-table" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        Extract Data
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        Parse key information
                      </div>
                    </div>
                    
                    {/* Translate */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed ${ODLTheme.colors.warning}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: ODLTheme.colors.warning,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="translate" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        Translate
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        Convert language
                      </div>
                    </div>
                    
                    {/* OCR Scan */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed #9333EA`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: '#9333EA',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="document" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        OCR Scan
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        Extract text from images
                      </div>
                    </div>
                    
                    {/* Compress */}
                    <div style={{
                      padding: '1.25rem',
                      background: 'linear-gradient(135deg, #E0E7FF 0%, #C7D2FE 100%)',
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `2px dashed #6366F1`,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'center'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: ODLTheme.borders.radius.full,
                        backgroundColor: '#6366F1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 0.75rem'
                      }}>
                        <Icon name="folder" size={24} style={{ color: 'white' }} />
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.base, 
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        color: ODLTheme.colors.text.primary,
                        marginBottom: '0.25rem'
                      }}>
                        Compress
                      </div>
                      <div style={{ 
                        fontSize: ODLTheme.typography.fontSize.xs, 
                        color: ODLTheme.colors.text.secondary
                      }}>
                        Reduce file size
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={drawers.right}
                onClose={() => closeDrawer('right')}
                position="right"
                title="Right Drawer"
                width="400px"
              >
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Content from Right</h3>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    The most common drawer position, sliding in from the right side.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: ODLTheme.colors.background, 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.border}`
                  }}>
                    <p>Ideal for navigation menus, user profiles, settings panels, and detail views.</p>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={drawers.bottom}
                onClose={() => closeDrawer('bottom')}
                position="bottom"
                title="Quick Access Document Dock"
                height="360px"
                overlay={false}
              >
                <div style={{ padding: '0.5rem', height: '100%', boxSizing: 'border-box' }}>
                  <div style={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${ODLTheme.colors.background} 0%, #F8FAFC 100%)`,
                    borderRadius: ODLTheme.borders.radius.lg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'auto'
                  }}>
                    {/* Empty state with enhanced UI */}
                    <div style={{ 
                      textAlign: 'center', 
                      padding: '0.1rem',
                      maxWidth: '600px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginBottom: '1rem'
                      }}>
                        {/* Visual indicator icons */}
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: ODLTheme.borders.radius.md,
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon name="document" size={24} style={{ color: ODLTheme.colors.primary }} />
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          color: ODLTheme.colors.text.secondary
                        }}>
                          <Icon name="arrow-right" size={20} />
                        </div>
                        <div style={{
                          width: '48px',
                          height: '48px',
                          borderRadius: ODLTheme.borders.radius.md,
                          backgroundColor: '#F0FDF4',
                          border: `2px dashed ${ODLTheme.colors.success}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <Icon name="folder-add" size={24} style={{ color: ODLTheme.colors.success }} />
                        </div>
                      </div>
                      
                      <h4 style={{ 
                        color: ODLTheme.colors.text.primary,
                        fontSize: ODLTheme.typography.fontSize.lg,
                        fontWeight: ODLTheme.typography.fontWeight.semibold,
                        marginBottom: '0.5rem'
                      }}>
                        Your Document Quick Access Dock
                      </h4>
                      
                      <p style={{ 
                        color: ODLTheme.colors.text.secondary,
                        fontSize: ODLTheme.typography.fontSize.base,
                        marginBottom: '1rem',
                        lineHeight: '1.5'
                      }}>
                        Drag and drop documents here to keep them instantly accessible while you work
                      </p>
                      
                      <div style={{
                        display: 'flex',
                        gap: '2rem',
                        justifyContent: 'center',
                        fontSize: ODLTheme.typography.fontSize.sm,
                        color: ODLTheme.colors.text.tertiary
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Icon name="checkmark" size={16} style={{ color: ODLTheme.colors.success }} />
                          <span>Pin up to 10 documents</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Icon name="checkmark" size={16} style={{ color: ODLTheme.colors.success }} />
                          <span>Quick preview on hover</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Icon name="checkmark" size={16} style={{ color: ODLTheme.colors.success }} />
                          <span>Stays accessible across pages</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={drawers.left}
                onClose={() => closeDrawer('left')}
                position="left"
                title="Left Drawer"
                width="350px"
              >
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Content from Left</h3>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    This drawer slides in from the left side of the screen.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: ODLTheme.colors.background, 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.border}`
                  }}>
                    <p>Perfect for primary navigation, menu systems, or sidebar content.</p>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'overlay-comparison' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Overlay Comparison</h2>
              <p>Compare drawers with and without overlay backdrop</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button 
                  variant="primary" 
                  onClick={() => setOverlayDrawers(prev => ({ ...prev, withOverlay: true }))}
                >
                  Open With Overlay
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setOverlayDrawers(prev => ({ ...prev, withoutOverlay: true }))}
                >
                  Open Without Overlay
                </Button>
              </div>
              
              <div style={{ 
                padding: '1.5rem', 
                backgroundColor: ODLTheme.colors.background, 
                borderRadius: ODLTheme.borders.radius.md,
                border: `1px solid ${ODLTheme.colors.border}`,
                marginBottom: '1rem'
              }}>
                <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Key Differences:</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <h5 style={{ color: ODLTheme.colors.primary, marginBottom: '0.5rem' }}>With Overlay (overlay=true)</h5>
                    <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary }}>
                      <li>Dark backdrop appears</li>
                      <li>Page content is blocked</li>
                      <li>Click backdrop to close</li>
                      <li>Body scroll prevented</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: ODLTheme.colors.success, marginBottom: '0.5rem' }}>Without Overlay (overlay=false)</h5>
                    <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary }}>
                      <li>No backdrop overlay</li>
                      <li>Page remains interactive</li>
                      <li>Users can scroll/interact</li>
                      <li>Lower z-index (9998)</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Overlay Drawers */}
              <Drawer
                isOpen={overlayDrawers.withOverlay}
                onClose={() => setOverlayDrawers(prev => ({ ...prev, withOverlay: false }))}
                position="right"
                overlay={true}
                title="With Overlay"
                width="450px"
              >
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Drawer With Overlay</h3>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    This drawer has a dark overlay backdrop that prevents interaction with the page behind it.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.primary}`,
                    marginBottom: '1rem'
                  }}>
                    <p><strong>Features:</strong></p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>Dark backdrop visible</li>
                      <li>Page interaction blocked</li>
                      <li>Click backdrop to close</li>
                      <li>Body scrolling prevented</li>
                    </ul>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => setOverlayDrawers(prev => ({ ...prev, withOverlay: false }))}
                  >
                    Close Drawer
                  </Button>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={overlayDrawers.withoutOverlay}
                onClose={() => setOverlayDrawers(prev => ({ ...prev, withoutOverlay: false }))}
                position="right"
                overlay={false}
                title="Without Overlay"
                width="450px"
              >
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Drawer Without Overlay</h3>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    This drawer has no overlay, so you can still interact with the page content behind it.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#E8F5E8', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.success}`,
                    marginBottom: '1rem'
                  }}>
                    <p><strong>Features:</strong></p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>No backdrop overlay</li>
                      <li>Page remains interactive</li>
                      <li>Users can scroll and click</li>
                      <li>Lower z-index positioning</li>
                    </ul>
                  </div>
                  <Button 
                    variant="secondary" 
                    onClick={() => setOverlayDrawers(prev => ({ ...prev, withoutOverlay: false }))}
                  >
                    Close Drawer
                  </Button>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'sizes' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Different Sizes</h2>
              <p>Drawers can be customized with different widths and heights</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => setSizeDrawers(prev => ({ ...prev, small: true }))}
                >
                  Small (300px)
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setSizeDrawers(prev => ({ ...prev, medium: true }))}
                >
                  Medium (400px)
                </Button>
                <Button 
                  variant="primary" 
                  size="large"
                  onClick={() => setSizeDrawers(prev => ({ ...prev, large: true }))}
                >
                  Large (600px)
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setSizeDrawers(prev => ({ ...prev, half: true }))}
                >
                  Half Screen (50%)
                </Button>
              </div>
              
              {/* Size Drawers */}
              <Drawer
                isOpen={sizeDrawers.small}
                onClose={() => setSizeDrawers(prev => ({ ...prev, small: false }))}
                position="right"
                title="Small Drawer"
                width="300px"
              >
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Small Drawer (300px)</h4>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    Compact size perfect for simple content, quick actions, or minimal forms.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: ODLTheme.colors.background, 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.border}`
                  }}>
                    <p>Best for:</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>Quick settings</li>
                      <li>Simple forms</li>
                      <li>Minimal navigation</li>
                    </ul>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={sizeDrawers.medium}
                onClose={() => setSizeDrawers(prev => ({ ...prev, medium: false }))}
                position="right"
                title="Medium Drawer"
                width="400px"
              >
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Medium Drawer (400px)</h4>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    The default size that works well for most use cases and content types.
                  </p>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: ODLTheme.colors.background, 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.border}`,
                    marginBottom: '1rem'
                  }}>
                    <p>Best for:</p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>Standard forms</li>
                      <li>User profiles</li>
                      <li>Navigation menus</li>
                      <li>Detail panels</li>
                    </ul>
                  </div>
                  <p style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
                    This is the most commonly used drawer size across applications.
                  </p>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={sizeDrawers.large}
                onClose={() => setSizeDrawers(prev => ({ ...prev, large: false }))}
                position="right"
                title="Large Drawer"
                width="600px"
              >
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Large Drawer (600px)</h4>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    Wide drawer for complex content, detailed forms, or side-by-side layouts.
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: ODLTheme.colors.background, 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.border}`
                    }}>
                      <h5 style={{ marginBottom: '0.5rem' }}>Left Column</h5>
                      <p>With more space, you can create multi-column layouts for better organization.</p>
                    </div>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: ODLTheme.colors.background, 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.border}`
                    }}>
                      <h5 style={{ marginBottom: '0.5rem' }}>Right Column</h5>
                      <p>Perfect for complex dashboards or detailed configuration panels.</p>
                    </div>
                  </div>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#FFF3E0', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.warning}`
                  }}>
                    <p><strong>Best for:</strong></p>
                    <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
                      <li>Complex forms with multiple sections</li>
                      <li>Data visualization panels</li>
                      <li>Multi-step workflows</li>
                      <li>Rich content with images and text</li>
                    </ul>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={sizeDrawers.half}
                onClose={() => setSizeDrawers(prev => ({ ...prev, half: false }))}
                position="right"
                title="Half Screen Drawer"
                width="half"
              >
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Half Screen Drawer (50% Width)</h4>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    Dynamic drawer that adapts to 50% of the current screen width. Resize your browser window to see it adjust!
                  </p>
                  
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#E8F5E8', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.success}`,
                    marginBottom: '1rem'
                  }}>
                    <h5 style={{ marginBottom: '0.75rem', color: ODLTheme.colors.success }}>✨ Responsive Features</h5>
                    <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary, margin: 0 }}>
                      <li>Uses CSS viewport units (50vw)</li>
                      <li>No hardcoded pixel values</li>
                      <li>Automatically adjusts to screen size</li>
                      <li>Perfect for responsive designs</li>
                    </ul>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: ODLTheme.colors.background, 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.border}`
                    }}>
                      <h5 style={{ marginBottom: '0.5rem' }}>Screen Sizes</h5>
                      <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.875rem', color: ODLTheme.colors.text.secondary }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>📱 Mobile (360px):</span>
                          <span>180px drawer</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>💻 Desktop (1440px):</span>
                          <span>720px drawer</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>🖥️ Large Screen (1920px):</span>
                          <span>960px drawer</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#E3F2FD', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.primary}`
                  }}>
                    <p><strong>Usage:</strong></p>
                    <pre style={{ 
                      margin: '0.5rem 0 0 0', 
                      padding: '0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      overflow: 'auto'
                    }}>
{`<Drawer
  width="half"  // 50% of viewport width
  position="right"
>
  Content
</Drawer>

// For top/bottom drawers:
<Drawer
  height="half"  // 50% of viewport height
  position="bottom"
>`}
                    </pre>
                  </div>
                  
                  <p style={{ 
                    marginTop: '1rem', 
                    fontSize: ODLTheme.typography.fontSize.sm, 
                    color: ODLTheme.colors.text.secondary,
                    fontStyle: 'italic'
                  }}>
                    💡 Tip: Try resizing your browser window to see how the drawer width adapts automatically!
                  </p>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'with-content' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Rich Content Examples</h2>
              <p>Drawers with various content types and layouts</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button 
                  variant="primary" 
                  onClick={() => setContentDrawers(prev => ({ ...prev, basic: true }))}
                >
                  User Profile
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setContentDrawers(prev => ({ ...prev, withForm: true }))}
                >
                  Settings Form
                </Button>
                <Button 
                  variant="primary" 
                  onClick={() => setContentDrawers(prev => ({ ...prev, withList: true }))}
                >
                  Navigation Menu
                </Button>
              </div>
              
              {/* Content Drawers */}
              <Drawer
                isOpen={contentDrawers.basic}
                onClose={() => setContentDrawers(prev => ({ ...prev, basic: false }))}
                position="right"
                title="User Profile"
                width="450px"
              >
                <div style={{ padding: '1rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    marginBottom: '2rem',
                    padding: '1rem',
                    backgroundColor: ODLTheme.colors.background,
                    borderRadius: ODLTheme.borders.radius.md
                  }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: ODLTheme.colors.primary,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '24px',
                      fontWeight: 'bold'
                    }}>
                      JD
                    </div>
                    <div>
                      <h3 style={{ margin: 0, marginBottom: '0.25rem', color: ODLTheme.colors.text.primary }}>John Doe</h3>
                      <p style={{ margin: 0, color: ODLTheme.colors.text.secondary }}>Senior Developer</p>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Contact Information</h4>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icon name="email" size={16} style={{ color: ODLTheme.colors.text.secondary }} />
                        <span style={{ color: ODLTheme.colors.text.secondary }}>john.doe@company.com</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icon name="phone" size={16} style={{ color: ODLTheme.colors.text.secondary }} />
                        <span style={{ color: ODLTheme.colors.text.secondary }}>+1 (555) 123-4567</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icon name="location" size={16} style={{ color: ODLTheme.colors.text.secondary }} />
                        <span style={{ color: ODLTheme.colors.text.secondary }}>San Francisco, CA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Button variant="primary" size="small">
                      <Icon name="edit" size={14} style={{ marginRight: '0.5rem' }} />
                      Edit Profile
                    </Button>
                    <Button variant="secondary" size="small">
                      <Icon name="chat" size={14} style={{ marginRight: '0.5rem' }} />
                      Message
                    </Button>
                  </div>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={contentDrawers.withForm}
                onClose={() => setContentDrawers(prev => ({ ...prev, withForm: false }))}
                position="right"
                title="Account Settings"
                width="500px"
              >
                <div style={{ padding: '1rem' }}>
                  <form style={{ display: 'grid', gap: '1.5rem' }}>
                    <Input
                      label="Display Name"
                      type="text"
                      value={formData.displayName}
                      onChange={(value) => setFormData(prev => ({ ...prev, displayName: value }))}
                      placeholder="Enter your display name"
                      size="md"
                    />
                    
                    <Input
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                      placeholder="Enter your email address"
                      size="md"
                    />
                    
                    <Input
                      label="Phone Number"
                      type="tel"
                      value="+1 (555) 123-4567"
                      onChange={(value) => console.log(value)}
                      placeholder="Enter your phone number"
                      size="md"
                    />
                    
                    <Input
                      label="Department"
                      type="text"
                      value="Engineering"
                      onChange={(value) => console.log(value)}
                      placeholder="Enter your department"
                      size="md"
                      helperText="Your current department or team"
                    />
                    
                    <Input
                      type="textarea"
                      label="Bio"
                      value={formData.bio}
                      onChange={(value) => setFormData(prev => ({ ...prev, bio: value }))}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      size="md"
                      helperText={`${formData.bio.length}/500 characters`}
                    />
                    
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: ODLTheme.colors.background, 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.border}`
                    }}>
                      <h5 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Notification Preferences</h5>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="checkbox" defaultChecked />
                          <span style={{ color: ODLTheme.colors.text.secondary }}>Email notifications</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="checkbox" defaultChecked />
                          <span style={{ color: ODLTheme.colors.text.secondary }}>Push notifications</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <input type="checkbox" />
                          <span style={{ color: ODLTheme.colors.text.secondary }}>Marketing emails</span>
                        </label>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                      <Button 
                        variant="ghost"
                        size="small"
                        onClick={() => setContentDrawers(prev => ({ ...prev, withForm: false }))}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="primary"
                        size="small"
                        onClick={() => {
                          alert('Settings saved successfully!');
                          setContentDrawers(prev => ({ ...prev, withForm: false }));
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </div>
              </Drawer>
              
              <Drawer
                isOpen={contentDrawers.withList}
                onClose={() => setContentDrawers(prev => ({ ...prev, withList: false }))}
                position="right"
                title="Navigation"
                width="350px"
              >
                <div style={{ padding: 0 }}>
                  {[
                    { icon: 'home', label: 'Dashboard', active: true },
                    { icon: 'user', label: 'Profile', active: false },
                    { icon: 'settings', label: 'Settings', active: false },
                    { icon: 'document', label: 'Documents', active: false },
                    { icon: 'analytics', label: 'Analytics', active: false },
                    { icon: 'help', label: 'Help & Support', active: false },
                  ].map((item, index) => (
                    <button
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        width: '100%',
                        padding: '1rem 1.5rem',
                        border: 'none',
                        backgroundColor: item.active ? ODLTheme.colors.primaryLight : 'transparent',
                        color: item.active ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
                        fontSize: ODLTheme.typography.fontSize.base,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        borderLeft: item.active ? `3px solid ${ODLTheme.colors.primary}` : '3px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (!item.active) {
                          e.currentTarget.style.backgroundColor = ODLTheme.colors.background;
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!item.active) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <Icon 
                        name={item.icon} 
                        size={18} 
                        style={{ color: item.active ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary }} 
                      />
                      <span>{item.label}</span>
                    </button>
                  ))}
                  
                  <div style={{ 
                    margin: '1.5rem',
                    padding: '1rem',
                    backgroundColor: ODLTheme.colors.background,
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.border}`
                  }}>
                    <h5 style={{ marginBottom: '0.5rem', color: ODLTheme.colors.text.primary }}>Quick Actions</h5>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      <Button variant="ghost" size="small" style={{ justifyContent: 'flex-start' }}>
                        <Icon name="add" size={14} style={{ marginRight: '0.5rem' }} />
                        Create New
                      </Button>
                      <Button variant="ghost" size="small" style={{ justifyContent: 'flex-start' }}>
                        <Icon name="upload" size={14} style={{ marginRight: '0.5rem' }} />
                        Upload File
                      </Button>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'with-footer' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Drawer with Footer</h2>
              <p>Drawers can include footer sections with action buttons</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Button 
                variant="primary" 
                onClick={() => setFooterDrawer(true)}
              >
                Open Drawer with Footer
              </Button>
              
              <Drawer
                isOpen={footerDrawer}
                onClose={() => setFooterDrawer(false)}
                position="right"
                title="Confirm Delete"
                width="450px"
                footer={
                  <>
                    <Button 
                      variant="ghost" 
                      size="small"
                      onClick={() => setFooterDrawer(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      variant="destructive"
                      size="small"
                      onClick={() => {
                        alert('Item deleted!');
                        setFooterDrawer(false);
                      }}
                    >
                      Delete Item
                    </Button>
                  </>
                }
              >
                <div style={{ padding: '1rem' }}>
                  <div style={{ 
                    padding: '1rem', 
                    backgroundColor: '#FFF3E0', 
                    borderRadius: ODLTheme.borders.radius.md,
                    border: `1px solid ${ODLTheme.colors.warning}`,
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                      <Icon name="warning" size={20} style={{ color: ODLTheme.colors.warning }} />
                      <h4 style={{ margin: 0, color: ODLTheme.colors.text.primary }}>Warning</h4>
                    </div>
                    <p style={{ margin: 0, color: ODLTheme.colors.text.secondary }}>
                      This action cannot be undone. The item will be permanently deleted.
                    </p>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h5 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Item Details</h5>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: ODLTheme.colors.background, 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.border}`
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: ODLTheme.colors.text.secondary }}>Name:</span>
                        <span style={{ color: ODLTheme.colors.text.primary, fontWeight: 500 }}>Project Document.pdf</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: ODLTheme.colors.text.secondary }}>Size:</span>
                        <span style={{ color: ODLTheme.colors.text.primary }}>2.4 MB</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: ODLTheme.colors.text.secondary }}>Modified:</span>
                        <span style={{ color: ODLTheme.colors.text.primary }}>2 hours ago</span>
                      </div>
                    </div>
                  </div>
                  
                  <p style={{ color: ODLTheme.colors.text.secondary, fontSize: ODLTheme.typography.fontSize.sm }}>
                    Are you sure you want to delete this item? This action cannot be undone and the item will be permanently removed from your account.
                  </p>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'interactive' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Interactive Features</h2>
              <p>Demonstrate all interactive capabilities and accessibility features</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <Button 
                variant="primary" 
                onClick={() => setInteractiveDrawer(true)}
              >
                Open Interactive Drawer
              </Button>
              
              <Drawer
                isOpen={interactiveDrawer}
                onClose={() => setInteractiveDrawer(false)}
                position="right"
                title="Interactive Drawer Demo"
                overlay={true}
                closeOnEscape={true}
                closeOnBackdropClick={true}
                width="500px"
                footer={
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon name="information" size={16} style={{ color: ODLTheme.colors.text.secondary }} />
                      <span style={{ fontSize: ODLTheme.typography.fontSize.sm, color: ODLTheme.colors.text.secondary }}>
                        Press Esc or click outside to close
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <Button 
                        variant="secondary"
                        onClick={() => setInteractiveDrawer(false)}
                      >
                        Close
                      </Button>
                      <Button 
                        variant="primary"
                        onClick={() => alert('Action completed!')}
                      >
                        Take Action
                      </Button>
                    </div>
                  </div>
                }
              >
                <div style={{ padding: '1rem' }}>
                  <h4 style={{ marginBottom: '1.5rem', color: ODLTheme.colors.text.primary }}>Interactive Features Demo</h4>
                  
                  <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: '#E8F5E8', 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.success}`
                    }}>
                      <h5 style={{ marginBottom: '0.75rem', color: ODLTheme.colors.success }}>✅ Accessibility Features</h5>
                      <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary, margin: 0 }}>
                        <li>Focus trap keeps tab navigation within drawer</li>
                        <li>ARIA attributes for screen readers</li>
                        <li>Proper focus management on open/close</li>
                        <li>Keyboard navigation support</li>
                      </ul>
                    </div>
                    
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: '#E3F2FD', 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.primary}`
                    }}>
                      <h5 style={{ marginBottom: '0.75rem', color: ODLTheme.colors.primary }}>⚡ Interactive Controls</h5>
                      <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary, margin: 0 }}>
                        <li>Press <kbd style={{ 
                          padding: '0.2rem 0.4rem', 
                          backgroundColor: 'white', 
                          border: '1px solid #ccc', 
                          borderRadius: '4px',
                          fontSize: '0.8rem'
                        }}>Esc</kbd> to close</li>
                        <li>Click the dark backdrop to close</li>
                        <li>Use the close button in header</li>
                        <li>Tab through focusable elements</li>
                      </ul>
                    </div>
                    
                    <div style={{ 
                      padding: '1rem', 
                      backgroundColor: '#FFF3E0', 
                      borderRadius: ODLTheme.borders.radius.md,
                      border: `1px solid ${ODLTheme.colors.warning}`
                    }}>
                      <h5 style={{ marginBottom: '0.75rem', color: ODLTheme.colors.warning }}>🎬 Smooth Animations</h5>
                      <ul style={{ paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary, margin: 0 }}>
                        <li>Cubic bezier easing for natural motion</li>
                        <li>Slide animations from each edge</li>
                        <li>Fade-in overlay backdrop</li>
                        <li>Position-aware animation direction</li>
                      </ul>
                    </div>
                    
                    <div style={{ marginTop: '1rem' }}>
                      <h5 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>Try These Interactions:</h5>
                      <div style={{ display: 'grid', gap: '0.75rem' }}>
                        <Button variant="ghost" size="small">
                          <Icon name="text" size={14} style={{ marginRight: '0.5rem' }} />
                          Tab through elements
                        </Button>
                        <Button variant="ghost" size="small">
                          <Icon name="cursor" size={14} style={{ marginRight: '0.5rem' }} />
                          Click backdrop to close
                        </Button>
                        <Button variant="ghost" size="small">
                          <Icon name="settings" size={14} style={{ marginRight: '0.5rem' }} />
                          Press Escape key
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Drawer>
            </div>
          </div>
        )}
        
        {selectedDemo === 'document-preview' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Document Preview</h2>
              <p>Preview PDF documents with zoom controls in a half-screen drawer</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ marginBottom: '1rem', color: ODLTheme.colors.text.primary }}>
                  Click the button to preview a sample PDF document
                </h4>
                <Button
                  variant="primary"
                  size="medium"
                  onClick={() => setDocumentDrawer(true)}
                  icon={<Icon name="document" size={20} />}
                >
                  Open Document Preview
                </Button>
                
                <div style={{ 
                  marginTop: '2rem',
                  padding: '1.5rem',
                  backgroundColor: '#F0F9FF',
                  borderRadius: ODLTheme.borders.radius.md,
                  border: `1px solid ${ODLTheme.colors.primary}`,
                  textAlign: 'left'
                }}>
                  <h5 style={{ color: ODLTheme.colors.primary, marginBottom: '0.5rem' }}>Features:</h5>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', color: ODLTheme.colors.text.secondary }}>
                    <li>Half-screen drawer (50% width)</li>
                    <li>No overlay - main page remains interactive</li>
                    <li>Zoom controls (-, +, reset)</li>
                    <li>Mouse wheel zoom support</li>
                    <li>Download button</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Document Preview Drawer */}
        <Drawer
          isOpen={documentDrawer}
          onClose={() => {
            setDocumentDrawer(false);
            setZoomLevel(100);
          }}
          position="right"
          width="half"
          overlay={false}
          title="Document Preview - A1_5_18-Aug-2023.pdf"
        >
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: '#F5F5F5'
          }}>
            {/* Zoom Controls */}
            <div style={{
              padding: ODLTheme.spacing[3],
              backgroundColor: 'white',
              borderBottom: `1px solid ${ODLTheme.colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))}
                >
                  <Icon name="subtract" size={16} />
                </Button>
                <span style={{ 
                  minWidth: '60px',
                  textAlign: 'center',
                  fontSize: ODLTheme.typography.fontSize.sm 
                }}>
                  {zoomLevel}%
                </span>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setZoomLevel(prev => Math.min(prev + 10, 200))}
                >
                  <Icon name="add" size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setZoomLevel(100)}
                >
                  <Icon name="maximize" size={16} />
                </Button>
              </div>
              
              <Button 
                variant="primary"
                size="small"
                onClick={() => window.open(samplePDF, '_blank')}
              >
                <Icon name="download" size={14} style={{ marginRight: '0.5rem' }} />
                Download
              </Button>
            </div>
            
            {/* PDF Viewer - No outer scroll needed */}
            <div style={{
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: ODLTheme.spacing[4]
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <iframe
                  ref={iframeRef}
                  src={`${samplePDF}#toolbar=0&navpanes=0&scrollbar=1`}
                  style={{
                    width: zoomLevel > 100 ? `${zoomLevel}%` : '100%',
                    minWidth: '600px',
                    height: zoomLevel > 100 ? `${zoomLevel}%` : '100%',
                    minHeight: '800px',
                    border: `1px solid ${ODLTheme.colors.border}`,
                    backgroundColor: 'white',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: ODLTheme.borders.radius.sm
                  }}
                  title="PDF Document"
                />
              </div>
            </div>
          </div>
        </Drawer>
        
        {/* Code Examples */}
        {showCode && (
          <div className={styles.codePanel}>
            <h3 style={{ color: '#f9fafb', marginBottom: '1rem' }}>
              <Icon name="code" size={20} style={{ marginRight: '0.5rem' }} />
              Code Example
            </h3>
            <pre className={styles.codeBlock}>
              <code>{codeExamples[selectedDemo]}</code>
            </pre>
          </div>
        )}
        
        {/* Features Showcase */}
        <div className={styles.featuresShowcase}>
          <div className={styles.sectionHeader}>
            <h3>Drawer Component Features</h3>
            <p>Everything you need for sliding panels and overlays</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>🎨 Core Features</h4>
              <ul>
                <li>Four position support (top, right, bottom, left)</li>
                <li>Optional overlay backdrop (on/off)</li>
                <li>Smooth slide animations with cubic-bezier easing</li>
                <li>Customizable dimensions (width/height)</li>
                <li>Portal-based rendering for proper layering</li>
                <li>ODL theme integration with consistent styling</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>⚡ Interactive Features</h4>
              <ul>
                <li>Close on Escape key press</li>
                <li>Close by clicking backdrop (when overlay enabled)</li>
                <li>Focus trap for keyboard navigation</li>
                <li>Automatic focus management</li>
                <li>Header with optional close button</li>
                <li>Optional footer with action buttons</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🎯 Customization</h4>
              <ul>
                <li>Custom width and height properties</li>
                <li>Optional title in header section</li>
                <li>Footer content for action buttons</li>
                <li>Custom styling with className prop</li>
                <li>Configurable interaction behaviors</li>
                <li>Different z-index based on overlay setting</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>♿ Accessibility</h4>
              <ul>
                <li>ARIA role="dialog" for screen readers</li>
                <li>Proper aria-labelledby and aria-describedby</li>
                <li>Focus trap prevents tab escape</li>
                <li>Focus restoration on close</li>
                <li>Keyboard navigation support</li>
                <li>Semantic HTML structure</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🚀 Performance</h4>
              <ul>
                <li>React Portal for optimal rendering</li>
                <li>CSS animations for smooth performance</li>
                <li>Conditional overlay rendering</li>
                <li>Optimized event listener management</li>
                <li>Cleanup on component unmount</li>
                <li>Lightweight with no external dependencies</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>📱 Use Cases</h4>
              <ul>
                <li>Navigation menus and sidebars</li>
                <li>User profile and settings panels</li>
                <li>Form inputs and configuration</li>
                <li>Detail views and content preview</li>
                <li>Mobile-friendly action sheets</li>
                <li>Multi-step workflows and wizards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to Top */}
      <BackToTop />
    </div>
  );
};

export default DrawerDemo;