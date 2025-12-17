import React, { useState, useEffect } from 'react';
import AlertBanner from '../components/AlertBanner/AlertBanner';
import Button from '../components/Button/Button';
import Chip from '../components/Chip/Chip';
import Icon from '../components/Icon/Icon';
import DemoBreadcrumb from '../components/DemoBreadcrumb/DemoBreadcrumb';
import BackToTop from '../components/BackToTop/BackToTop';
import ODLTheme from '../styles/ODLTheme';
import styles from './TableDemo.module.css';

const AlertBannerDemo: React.FC = () => {
  const [selectedDemo, setSelectedDemo] = useState<'basic' | 'dismissible' | 'auto-dismiss' | 'with-actions' | 'stacked'>('basic');
  const [showCode, setShowCode] = useState(false);
  
  // Alert states
  const [basicAlerts, _setBasicAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    error: true
  });
  
  const [dismissibleAlerts, setDismissibleAlerts] = useState({
    info: true,
    success: true,
    warning: true,
    error: true
  });
  
  const [autoDismissAlerts, setAutoDismissAlerts] = useState({
    info: false,
    success: false,
    warning: false,
    error: false
  });
  
  const [countdowns, setCountdowns] = useState({
    info: 0,
    success: 0,
    warning: 0,
    error: 0
  });
  
  const [countdownIntervals, setCountdownIntervals] = useState<{[key: string]: NodeJS.Timeout | null}>({
    info: null,
    success: null,
    warning: null,
    error: null
  });
  
  const [stackedAlerts, setStackedAlerts] = useState<Array<{
    id: string;
    variant: 'info' | 'success' | 'warning' | 'error';
    message: string;
    title?: string;
  }>>([]);
  
  const addStackedAlert = (variant: 'info' | 'success' | 'warning' | 'error') => {
    const messages = {
      info: { title: 'Information', message: 'New system update available. Click to learn more.' },
      success: { title: 'Success!', message: 'Your changes have been saved successfully.' },
      warning: { title: 'Warning', message: 'Your session will expire in 5 minutes.' },
      error: { title: 'Error', message: 'Failed to save changes. Please try again.' }
    };
    
    const newAlert = {
      id: Date.now().toString(),
      variant,
      ...messages[variant]
    };
    
    setStackedAlerts(prev => [...prev, newAlert]);
  };
  
  const removeStackedAlert = (id: string) => {
    setStackedAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  const getTimeoutDuration = (variant: keyof typeof autoDismissAlerts): number => {
    const durations = { info: 5000, success: 3000, warning: 4000, error: 6000 };
    return durations[variant];
  };
  
  const triggerAutoDismiss = (variant: keyof typeof autoDismissAlerts) => {
    // Clear existing interval if any
    if (countdownIntervals[variant]) {
      clearInterval(countdownIntervals[variant]!);
    }
    
    const duration = getTimeoutDuration(variant);
    const startTime = Date.now();
    
    setAutoDismissAlerts(prev => ({ ...prev, [variant]: true }));
    setCountdowns(prev => ({ ...prev, [variant]: Math.ceil(duration / 1000) }));
    
    // Update countdown every 100ms
    const countdownInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      
      setCountdowns(prev => ({ ...prev, [variant]: remaining }));
      
      if (remaining <= 0) {
        clearInterval(countdownInterval);
        setCountdownIntervals(prev => ({ ...prev, [variant]: null }));
      }
    }, 100);
    
    // Store the interval reference
    setCountdownIntervals(prev => ({ ...prev, [variant]: countdownInterval }));
  };
  
  const handleAutoDismissComplete = (variant: keyof typeof autoDismissAlerts) => {
    // Clear the interval when alert is dismissed
    if (countdownIntervals[variant]) {
      clearInterval(countdownIntervals[variant]!);
      setCountdownIntervals(prev => ({ ...prev, [variant]: null }));
    }
    
    setAutoDismissAlerts(prev => ({ ...prev, [variant]: false }));
    setCountdowns(prev => ({ ...prev, [variant]: 0 }));
  };
  
  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(countdownIntervals).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [countdownIntervals]);
  
  const codeExamples = {
    basic: `// Basic Alert Banners
<AlertBanner variant="info">
  This is an informational message to keep users informed.
</AlertBanner>

<AlertBanner variant="info">
  Operation completed successfully!
</AlertBanner>

<AlertBanner variant="warning">
  Please review your input before proceeding.
</AlertBanner>

<AlertBanner variant="error">
  An error occurred. Please try again.
</AlertBanner>`,
    
    dismissible: `// Dismissible Alert Banners
<AlertBanner
  variant="info"
  dismissible
  onDismiss={() => console.log('Alert dismissed')}
>
  This alert can be dismissed by the user.
</AlertBanner>

<AlertBanner
  variant="info"
  dismissible
  title="Upload Complete"
>
  Your files have been uploaded successfully.
</AlertBanner>`,
    
    'auto-dismiss': `// Auto-dismiss Alert Banners
<AlertBanner
  variant="info"
  autoDismiss={3000} // Dismiss after 3 seconds
  dismissible
>
  This alert will automatically dismiss after 3 seconds.
</AlertBanner>

<AlertBanner
  variant="info"
  autoDismiss={5000}
  onDismiss={() => console.log('Auto-dismissed')}
>
  Temporary notification that disappears automatically.
</AlertBanner>`,
    
    'with-actions': `// Alert Banners with Action Chips
<AlertBanner
  variant="warning"
  title="Unsaved Changes"
  dismissible
  actions={
    <>
      <Chip label="Discard" variant="grey" onClick={handleDiscard} />
      <Chip label="Save Changes" variant="warning" onClick={handleSave} />
    </>
  }
>
  You have unsaved changes. Would you like to save them?
</AlertBanner>

<AlertBanner
  variant="error"
  title="Connection Lost"
  actions={
    <Chip 
      label="Retry Connection" 
      variant="error" 
      icon="restart"
      onClick={handleRetry} 
    />
  }
>
  Unable to connect to the server. Check your internet connection.
</AlertBanner>`,
    
    stacked: `// Stacked Alert System
const [alerts, setAlerts] = useState([]);

const addAlert = (variant, message) => {
  const newAlert = {
    id: Date.now().toString(),
    variant,
    message
  };
  setAlerts(prev => [...prev, newAlert]);
};

const removeAlert = (id) => {
  setAlerts(prev => prev.filter(alert => alert.id !== id));
};

// Render stacked alerts
<div className="alert-container">
  {alerts.map(alert => (
    <AlertBanner
      key={alert.id}
      variant={alert.variant}
      dismissible
      onDismiss={() => removeAlert(alert.id)}
    >
      {alert.message}
    </AlertBanner>
  ))}
</div>`,
  };
  
  return (
    <div className={styles.tableDemo}>
      {/* Breadcrumb Navigation */}
      <DemoBreadcrumb componentName="Alert Banner" />
      
      {/* Enhanced Header Section */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.headerText}>
            <h1>Alert Banner Component</h1>
            <p>Contextual feedback messages for user actions with ODL theme</p>
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
        <div className={styles.demoTabs}>
          {[
            { key: 'basic', label: 'Basic Alerts', icon: '🔔' },
            { key: 'dismissible', label: 'Dismissible', icon: '❌' },
            { key: 'auto-dismiss', label: 'Auto-dismiss', icon: '⏱️' },
            { key: 'with-actions', label: 'With Actions', icon: '🎬' },
            { key: 'stacked', label: 'Stacked Alerts', icon: '📚' },
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
      
      {/* Demo Content */}
      <div className={styles.demoContent}>
        {selectedDemo === 'basic' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Basic Alert Banners</h2>
              <p>Standard alert variants for different message types</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              {basicAlerts.info && (
                <AlertBanner variant="info">
                  This is an informational message to keep users informed about system status or updates.
                </AlertBanner>
              )}
              {basicAlerts.success && (
                <AlertBanner variant="info">
                  Success! Your operation has been completed successfully without any issues.
                </AlertBanner>
              )}
              {basicAlerts.warning && (
                <AlertBanner variant="warning">
                  Warning: Please review your input before proceeding. This action may have consequences.
                </AlertBanner>
              )}
              {basicAlerts.error && (
                <AlertBanner variant="error">
                  Error: Something went wrong while processing your request. Please try again.
                </AlertBanner>
              )}
            </div>
          </div>
        )}
        
        {selectedDemo === 'dismissible' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Dismissible Alerts</h2>
              <p>Alerts that users can manually dismiss</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              {dismissibleAlerts.info && (
                <AlertBanner
                  variant="info"
                  dismissible
                  title="System Update"
                  onDismiss={() => setDismissibleAlerts(prev => ({ ...prev, info: false }))}
                >
                  A new version is available. Update now to get the latest features and improvements.
                </AlertBanner>
              )}
              {dismissibleAlerts.success && (
                <AlertBanner
                  variant="info"
                  dismissible
                  title="Upload Complete"
                  onDismiss={() => setDismissibleAlerts(prev => ({ ...prev, success: false }))}
                >
                  Your files have been uploaded successfully. You can now proceed to the next step.
                </AlertBanner>
              )}
              {dismissibleAlerts.warning && (
                <AlertBanner
                  variant="warning"
                  dismissible
                  title="Low Storage"
                  onDismiss={() => setDismissibleAlerts(prev => ({ ...prev, warning: false }))}
                >
                  You're running low on storage space. Consider deleting old files to free up space.
                </AlertBanner>
              )}
              {dismissibleAlerts.error && (
                <AlertBanner
                  variant="error"
                  dismissible
                  title="Payment Failed"
                  onDismiss={() => setDismissibleAlerts(prev => ({ ...prev, error: false }))}
                >
                  Your payment could not be processed. Please check your payment details and try again.
                </AlertBanner>
              )}
              
              {!Object.values(dismissibleAlerts).some(v => v) && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ marginBottom: '1rem', color: ODLTheme.colors.text.secondary }}>
                    All alerts have been dismissed
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => setDismissibleAlerts({ info: true, success: true, warning: true, error: true })}
                  >
                    Reset All Alerts
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
        
        {selectedDemo === 'auto-dismiss' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Auto-dismiss Alerts</h2>
              <p>Alerts that automatically disappear after a specified time</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => triggerAutoDismiss('info')}>
                  Show Info (5s)
                </Button>
                <Button variant="primary" onClick={() => triggerAutoDismiss('success')}>
                  Show Success (3s)
                </Button>
                <Button variant="secondary" onClick={() => triggerAutoDismiss('warning')}>
                  Show Warning (4s)
                </Button>
                <Button variant="destructive" onClick={() => triggerAutoDismiss('error')}>
                  Show Error (6s)
                </Button>
              </div>
              
              {autoDismissAlerts.info && (
                <AlertBanner
                  variant="info"
                  autoDismiss={5000}
                  dismissible
                  onDismiss={() => handleAutoDismissComplete('info')}
                >
                  This informational alert will disappear in <strong>{countdowns.info}</strong> second{countdowns.info !== 1 ? 's' : ''}.
                </AlertBanner>
              )}
              {autoDismissAlerts.success && (
                <AlertBanner
                  variant="info"
                  autoDismiss={3000}
                  dismissible
                  onDismiss={() => handleAutoDismissComplete('success')}
                >
                  Success message - disappearing in <strong>{countdowns.success}</strong> second{countdowns.success !== 1 ? 's' : ''}!
                </AlertBanner>
              )}
              {autoDismissAlerts.warning && (
                <AlertBanner
                  variant="warning"
                  autoDismiss={4000}
                  dismissible
                  onDismiss={() => handleAutoDismissComplete('warning')}
                >
                  Warning alert - will auto-dismiss in <strong>{countdowns.warning}</strong> second{countdowns.warning !== 1 ? 's' : ''}.
                </AlertBanner>
              )}
              {autoDismissAlerts.error && (
                <AlertBanner
                  variant="error"
                  autoDismiss={6000}
                  dismissible
                  onDismiss={() => handleAutoDismissComplete('error')}
                >
                  Error notification - automatically closing in <strong>{countdowns.error}</strong> second{countdowns.error !== 1 ? 's' : ''}.
                </AlertBanner>
              )}
            </div>
          </div>
        )}
        
        {selectedDemo === 'with-actions' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Alerts with Actions</h2>
              <p>Alert banners with interactive action buttons</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <AlertBanner
                variant="warning"
                title="Unsaved Changes"
                dismissible
                actions={
                  <>
                    <Chip 
                      label="Discard" 
                      variant="grey" 
                      onClick={() => alert('Changes discarded')} 
                      style={{ backgroundColor: 'transparent', color: '#525252' }}
                    />
                    <Chip label="Save Changes" variant="warning" onClick={() => alert('Changes saved')} />
                  </>
                }
              >
                You have unsaved changes that will be lost if you navigate away from this page.
              </AlertBanner>
              
              <AlertBanner
                variant="error"
                title="Connection Lost"
                actions={
                  <Chip
                    label="Retry Connection"
                    variant="error"
                    onClick={() => alert('Retrying connection...')}
                  />
                }
              >
                Unable to connect to the server. Please check your internet connection and try again.
              </AlertBanner>
              
              <AlertBanner
                variant="info"
                title="New Features Available"
                dismissible
                actions={
                  <>
                    <Chip 
                      label="View Changelog" 
                      variant="grey" 
                      onClick={() => alert('Viewing changelog...')} 
                      style={{ backgroundColor: 'transparent', color: '#525252' }}
                    />
                    <Chip 
                      label="Take a Tour" 
                      variant="info" 
                      onClick={() => alert('Starting tour...')} 
                      style={{ backgroundColor: ODLTheme.colors.primary, color: 'white' }}
                    />
                  </>
                }
              >
                We've added new features to improve your experience. Take a quick tour to see what's new!
              </AlertBanner>
              
              <AlertBanner
                variant="info"
                title="Subscription Renewed"
                actions={
                  <Chip label="View Invoice" variant="info" onClick={() => alert('Viewing invoice...')} />
                }
              >
                Your subscription has been successfully renewed for another year. Thank you for your continued support!
              </AlertBanner>
            </div>
          </div>
        )}
        
        {selectedDemo === 'stacked' && (
          <div className={styles.tableSection}>
            <div className={styles.sectionHeader}>
              <h2>Stacked Alert System</h2>
              <p>Multiple alerts displayed in a stack</p>
            </div>
            <div style={{ padding: '2rem', background: 'white', borderRadius: '0 0 12px 12px' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => addStackedAlert('info')}>
                  Add Info Alert
                </Button>
                <Button variant="primary" onClick={() => addStackedAlert('success')}>
                  Add Success Alert
                </Button>
                <Button variant="secondary" onClick={() => addStackedAlert('warning')}>
                  Add Warning Alert
                </Button>
                <Button variant="destructive" onClick={() => addStackedAlert('error')}>
                  Add Error Alert
                </Button>
                {stackedAlerts.length > 0 && (
                  <Button variant="ghost" onClick={() => setStackedAlerts([])}>
                    Clear All
                  </Button>
                )}
              </div>
              
              <div style={{ minHeight: '600px' }}>
                {stackedAlerts.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    backgroundColor: '#F9FAFB',
                    borderRadius: ODLTheme.borders.radius.md,
                    color: ODLTheme.colors.text.secondary
                  }}>
                    <Icon name="notification" size={48} style={{ color: '#D1D5DB', marginBottom: '1rem' }} />
                    <p>No active alerts. Click the buttons above to add alerts.</p>
                  </div>
                ) : (
                  stackedAlerts.map(alert => (
                    <AlertBanner
                      key={alert.id}
                      variant={alert.variant}
                      title={alert.title}
                      dismissible
                      onDismiss={() => removeStackedAlert(alert.id)}
                    >
                      {alert.message}
                    </AlertBanner>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        
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
            <h3>Alert Banner Features</h3>
            <p>Everything you need for effective user notifications</p>
          </div>
          
          <div className={styles.featureGrid}>
            <div className={styles.featureCategory}>
              <h4>🎨 Core Features</h4>
              <ul>
                <li>Multiple alert variants (info, success, warning, error)</li>
                <li>Dismissible alerts with close button</li>
                <li>Auto-dismiss with configurable timeout</li>
                <li>Support for titles and descriptions</li>
                <li>Smooth entrance and exit animations</li>
                <li>ODL theme integration</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>⚡ Advanced Features</h4>
              <ul>
                <li>Action buttons for user interaction</li>
                <li>Custom icons from Carbon set</li>
                <li>Stacked alert management</li>
                <li>Programmatic control via props</li>
                <li>Callback functions for events</li>
                <li>Flexible content rendering</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🎯 Customization</h4>
              <ul>
                <li>Custom styling with className prop</li>
                <li>Inline style overrides</li>
                <li>Icon customization</li>
                <li>Show/hide close button</li>
                <li>Custom action components</li>
                <li>Flexible layout options</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>♿ Accessibility</h4>
              <ul>
                <li>ARIA role="alert" for screen readers</li>
                <li>Keyboard dismissible</li>
                <li>Focus management</li>
                <li>Proper color contrast</li>
                <li>Semantic HTML structure</li>
                <li>Accessible action buttons</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>🚀 Performance</h4>
              <ul>
                <li>Lightweight component</li>
                <li>Smooth CSS transitions</li>
                <li>Conditional rendering</li>
                <li>Optimized re-renders</li>
                <li>Memory-efficient state management</li>
                <li>No external dependencies</li>
              </ul>
            </div>
            
            <div className={styles.featureCategory}>
              <h4>📱 Use Cases</h4>
              <ul>
                <li>Form validation feedback</li>
                <li>System status notifications</li>
                <li>User action confirmations</li>
                <li>Warning messages</li>
                <li>Error handling displays</li>
                <li>Temporary notifications</li>
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

export default AlertBannerDemo;