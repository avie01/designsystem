import React, { useState } from 'react';
import AlertBanner from '../components/AlertBanner/AlertBanner';
import Button from '../components/Button/Button';
import DemoNavigation from '../components/DemoNavigation';

const AlertBannerDemo: React.FC = () => {
  const [alerts, setAlerts] = useState<Array<{
    id: string;
    variant: 'info' | 'success' | 'warning' | 'error';
    message: string;
    dismissible: boolean;
    autoDismiss?: number;
  }>>([
    {
      id: '1',
      variant: 'info',
      message: 'This is an informational alert banner with smooth animations.',
      dismissible: true
    },
    {
      id: '2',
      variant: 'success',
      message: 'Success! Your action was completed successfully.',
      dismissible: true
    },
    {
      id: '3',
      variant: 'warning',
      message: 'Warning: Please review your input before proceeding.',
      dismissible: true
    },
    {
      id: '4',
      variant: 'error',
      message: 'Error: Something went wrong. Please try again.',
      dismissible: true
    }
  ]);

  const [showAutoDismiss, setShowAutoDismiss] = useState(false);

  const addAlert = (variant: 'info' | 'success' | 'warning' | 'error') => {
    const messages = {
      info: 'New informational alert added with React Spring animations.',
      success: 'New success alert with smooth fade-in animation.',
      warning: 'New warning alert with slide-in animation.',
      error: 'New error alert with scale animation.'
    };

    const newAlert = {
      id: Date.now().toString(),
      variant,
      message: messages[variant],
      dismissible: true
    };

    setAlerts(prev => [...prev, newAlert]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const showAutoDismissAlert = () => {
    setShowAutoDismiss(true);
    setTimeout(() => setShowAutoDismiss(false), 5000);
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#EDF1F5', minHeight: '100vh' }}>
      <DemoNavigation title="Alert Banner" />
      
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        border: '1px solid #D1D1D1',
        padding: '24px',
        marginTop: '24px'
      }}>
        <h1 style={{ marginBottom: '32px', color: '#3560c1' }}>
          Alert Banner Component
        </h1>

        <p style={{ marginBottom: '32px', color: '#666', lineHeight: '1.6' }}>
          The AlertBanner component provides animated notification banners with smooth React Spring transitions. 
          Each alert type has distinct styling and animations for optimal user experience.
        </p>

        {/* Static Examples */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Static Examples</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {alerts.map(alert => (
              <AlertBanner
                key={alert.id}
                variant={alert.variant}
                dismissible={alert.dismissible}
                onDismiss={() => removeAlert(alert.id)}
              >
                {alert.message}
              </AlertBanner>
            ))}
          </div>
        </section>

        {/* Interactive Examples */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Interactive Examples</h2>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <Button 
              variant="primary" 
              onClick={() => addAlert('info')}
              size="small"
            >
              Add Info Alert
            </Button>
            <Button 
              variant="primary" 
              onClick={() => addAlert('success')}
              size="small"
            >
              Add Success Alert
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => addAlert('warning')}
              size="small"
            >
              Add Warning Alert
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => addAlert('error')}
              size="small"
            >
              Add Error Alert
            </Button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <Button 
              variant="tertiary" 
              onClick={showAutoDismissAlert}
              size="small"
            >
              Show Auto-Dismiss Alert (5s)
            </Button>
          </div>

          {showAutoDismiss && (
            <AlertBanner
              variant="info"
              dismissible={true}
              autoDismiss={5000}
              onDismiss={() => setShowAutoDismiss(false)}
            >
              This alert will automatically dismiss after 5 seconds with a smooth fade-out animation.
            </AlertBanner>
          )}
        </section>

        {/* Non-dismissible Examples */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Non-dismissible Examples</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AlertBanner
              variant="info"
              dismissible={false}
            >
              This is a non-dismissible informational alert. Users cannot close it manually.
            </AlertBanner>
            <AlertBanner
              variant="warning"
              dismissible={false}
            >
              This is a non-dismissible warning alert. Important information that should remain visible.
            </AlertBanner>
          </div>
        </section>

        {/* Custom Icons */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Custom Icons</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <AlertBanner
              variant="info"
              dismissible={true}
              icon={<span style={{ fontSize: '20px' }}>🔔</span>}
            >
              This alert uses a custom bell emoji icon instead of the default information icon.
            </AlertBanner>
            <AlertBanner
              variant="success"
              dismissible={true}
              icon={<span style={{ fontSize: '20px' }}>🎉</span>}
            >
              This alert uses a custom celebration emoji icon for a more festive feel.
            </AlertBanner>
          </div>
        </section>

        {/* Animation Features */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Animation Features</h2>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <h3 style={{ marginBottom: '12px', color: '#3560c1' }}>React Spring Animations</h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              color: '#666'
            }}>
              <li style={{ marginBottom: '8px' }}>• <strong>Fade In/Out:</strong> Smooth opacity transitions when alerts appear or disappear</li>
              <li style={{ marginBottom: '8px' }}>• <strong>Slide Animation:</strong> Alerts slide down from the top when appearing</li>
              <li style={{ marginBottom: '8px' }}>• <strong>Scale Animation:</strong> Close button scales in with a spring effect</li>
              <li style={{ marginBottom: '8px' }}>• <strong>Auto-dismiss:</strong> Configurable auto-dismiss with smooth fade-out</li>
              <li style={{ marginBottom: '8px' }}>• <strong>Hover Effects:</strong> Subtle hover animations on interactive elements</li>
            </ul>
          </div>
        </section>

        {/* Usage Examples */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '16px' }}>Usage Examples</h2>
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            fontFamily: 'monospace',
            fontSize: '14px',
            overflowX: 'auto'
          }}>
            <pre style={{ margin: 0, color: '#333' }}>
{`// Basic usage
<AlertBanner variant="info" dismissible={true}>
  This is an informational alert
</AlertBanner>

// With auto-dismiss
<AlertBanner 
  variant="success" 
  autoDismiss={3000}
  onDismiss={() => console.log('Alert dismissed')}
>
  Success message
</AlertBanner>

// Custom icon
<AlertBanner 
  variant="warning" 
  icon={<CustomIcon />}
>
  Custom icon alert
</AlertBanner>

// Non-dismissible
<AlertBanner variant="error" dismissible={false}>
  Critical error message
</AlertBanner>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlertBannerDemo; 