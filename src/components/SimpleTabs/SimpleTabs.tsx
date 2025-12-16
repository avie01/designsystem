import React, { useState } from 'react';
import Icon from '../Icon/Icon';

export interface SimpleTabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
}

export interface SimpleTabsProps {
  tabs: SimpleTabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'compact';
  showContent?: boolean;
  fullWidth?: boolean;
}

/**
 * SimpleTabs Component
 * ODL-compliant tab navigation component with icon support
 */
const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  showContent = true,
  fullWidth = false
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid var(--color-light-deco)', 
        gap: 0 
      }}>
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          const isDisabled = tab.disabled;
          
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, isDisabled)}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                fontFamily: 'inherit',
                fontSize: variant === 'default' ? 'var(--font-size-sm)' : 'var(--font-size-xs)',
                fontWeight: isActive ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)',
                color: isActive ? 'var(--color-blue-default)' : isDisabled ? 'var(--color-twilight)' : 'var(--color-dusk)',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                padding: variant === 'default' ? 'var(--spacing-md) var(--spacing-lg)' : 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 0,
                outline: 'none',
                transition: 'var(--transition-fast)',
                opacity: isDisabled ? 0.6 : 1,
                whiteSpace: 'nowrap',
                minWidth: 0,
                flex: fullWidth ? 1 : 'initial',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--color-wave)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-sm)' }}>
                {tab.icon && (!tab.iconPosition || tab.iconPosition === 'left') && (
                  <Icon name={tab.icon} size={16} />
                )}
                <span>{tab.label}</span>
                {tab.icon && tab.iconPosition === 'right' && (
                  <Icon name={tab.icon} size={16} />
                )}
              </div>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: 'var(--color-blue-default)',
                  borderRadius: '1px'
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {showContent && activeTabData && activeTabData.content && (
        <div style={{ paddingTop: 'var(--spacing-lg)' }}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default SimpleTabs;