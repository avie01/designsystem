import React from 'react';
import Icon from '../Icon/Icon';
import ODLTheme from '../../styles/ODLTheme';

interface DemoBreadcrumbProps {
  componentName: string;
  componentPath?: string;
}

const DemoBreadcrumb: React.FC<DemoBreadcrumbProps> = ({ componentName }) => {
  return (
    <div style={{
      background: ODLTheme.colors.white,
      borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
      padding: `${ODLTheme.spacing[4]} ${ODLTheme.spacing[8]}`,
      boxShadow: ODLTheme.shadows.sm,
      position: 'sticky',
      top: 0,
      zIndex: ODLTheme.zIndex.sticky
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
      }}>
        {/* Left side - Breadcrumb */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: ODLTheme.spacing[2] 
        }}>
          <a 
            href="/components-showcase.html" 
            style={{ 
              color: ODLTheme.colors.text.secondary, 
              textDecoration: 'none',
              fontSize: ODLTheme.typography.fontSize.sm,
              fontWeight: ODLTheme.typography.fontWeight.medium,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[1],
              transition: ODLTheme.transitions.color
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = ODLTheme.colors.primary}
            onMouseLeave={(e) => e.currentTarget.style.color = ODLTheme.colors.text.secondary}
          >
            <Icon name="chevron-left" size={16} />
            Components Showcase
          </a>
          <span style={{ 
            color: ODLTheme.colors.text.tertiary, 
            fontSize: ODLTheme.typography.fontSize.sm 
          }}>
            /
          </span>
          <span style={{ 
            color: ODLTheme.colors.text.primary, 
            fontSize: ODLTheme.typography.fontSize.sm, 
            fontWeight: ODLTheme.typography.fontWeight.semibold,
            fontFamily: ODLTheme.typography.fontFamily.sans
          }}>
            {componentName}
          </span>
        </div>

        {/* Right side - Quick Actions */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: ODLTheme.spacing[4] 
        }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
              fontSize: ODLTheme.typography.fontSize.sm,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              color: ODLTheme.colors.text.secondary,
              background: 'transparent',
              border: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
              borderRadius: ODLTheme.borders.radius.base,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[1],
              transition: ODLTheme.transitions.base
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = ODLTheme.colors.surface;
              e.currentTarget.style.borderColor = ODLTheme.colors.border;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = ODLTheme.colors.border;
            }}
          >
            <Icon name="renew" size={14} />
            Refresh
          </button>
          
          <a
            href="/components-showcase.html"
            style={{
              padding: `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
              fontSize: ODLTheme.typography.fontSize.sm,
              fontFamily: ODLTheme.typography.fontFamily.sans,
              color: ODLTheme.colors.text.inverse,
              background: ODLTheme.colors.primary,
              border: 'none',
              borderRadius: ODLTheme.borders.radius.base,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: ODLTheme.spacing[1],
              cursor: 'pointer',
              transition: ODLTheme.transitions.transform
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Icon name="grid" size={14} />
            All Components
          </a>
        </div>
      </div>
    </div>
  );
};

export default DemoBreadcrumb;