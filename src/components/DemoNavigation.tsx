import React from 'react';
import Icon from './Icon/Icon';

interface DemoNavigationProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  breadcrumbPath?: string;
}

const DemoNavigation: React.FC<DemoNavigationProps> = ({
  title,
  description,
  showBackButton = true,
  onBackClick
}) => {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      // Default behavior - go back in browser history
      window.history.back();
    }
  };

  return (
    <div style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '1rem 1.5rem'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {showBackButton && (
              <button
                onClick={handleBackClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#6b7280',
                  cursor: 'pointer',
                  border: 'none',
                  background: 'none',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#111827';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
              >
                <Icon name="navigation-arrow-left" size={20} />
                <span>Back to Home</span>
              </button>
            )}
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#3560c1',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Icon name="data-processing" size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <h1 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#111827',
                  margin: 0
                }}>
                  {title}
                </h1>
                {description && (
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    margin: 0
                  }}>
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '14px',
            color: '#6b7280'
          }}>
            <Icon name="navigation-chevron-right" size={16} />
            <span>ODL Components</span>
            <Icon name="navigation-chevron-right" size={16} />
            <span style={{
              fontWeight: '500',
              color: '#111827'
            }}>
              {title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoNavigation; 