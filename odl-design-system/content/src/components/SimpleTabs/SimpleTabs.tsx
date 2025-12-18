import React, { useState, CSSProperties } from 'react';
import ODLTheme from '../../styles/ODLTheme';
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

  const getTabButtonStyles = (isActive: boolean, isDisabled: boolean): CSSProperties => ({
    position: 'relative',
    background: 'transparent',
    border: 'none',
    fontFamily: ODLTheme.typography.fontFamily.sans,
    fontSize: variant === 'default' ? ODLTheme.typography.fontSize.sm : ODLTheme.typography.fontSize.xs,
    fontWeight: isActive ? ODLTheme.typography.fontWeight.semibold : ODLTheme.typography.fontWeight.medium,
    color: isActive ? ODLTheme.colors.primary : isDisabled ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.secondary,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    padding: variant === 'default' ? `${ODLTheme.spacing[3]}px ${ODLTheme.spacing[4]}px` : `${ODLTheme.spacing[2]}px ${ODLTheme.spacing[3]}px`,
    borderRadius: 0,
    outline: 'none',
    transition: ODLTheme.transitions.base,
    opacity: isDisabled ? 0.6 : 1,
    whiteSpace: 'nowrap',
    minWidth: 0,
    flex: fullWidth ? 1 : 'initial',
    flexShrink: 0,
    paddingBottom: isActive ? `calc(${ODLTheme.spacing[3]}px - 2px)` : ODLTheme.spacing[3] + 'px',
    borderBottom: isActive ? `2px solid ${ODLTheme.colors.primary}` : 'none',
  });

  const navigationStyles: CSSProperties = {
    display: 'flex',
    borderBottom: `1px solid ${ODLTheme.colors.border}`,
    gap: 0,
  };

  const contentStyles: CSSProperties = {
    paddingTop: ODLTheme.spacing[4],
    color: ODLTheme.colors.text.primary,
    fontFamily: ODLTheme.typography.fontFamily.sans,
    fontSize: ODLTheme.typography.fontSize.base,
  };

  const iconContainerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ODLTheme.spacing[2],
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Navigation */}
      <div style={navigationStyles}>
        {tabs.map((tab) => {
          const isActive = tab.id === currentActiveTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id, isDisabled)}
              style={getTabButtonStyles(isActive, isDisabled)}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.wave;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outlineWidth = '2px';
                e.currentTarget.style.outlineStyle = 'solid';
                e.currentTarget.style.outlineColor = ODLTheme.colors.primary;
                e.currentTarget.style.outlineOffset = ODLTheme.spacing[1] + 'px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              <div style={iconContainerStyles}>
                {tab.icon && (!tab.iconPosition || tab.iconPosition === 'left') && (
                  <Icon name={tab.icon} size={16} />
                )}
                <span>{tab.label}</span>
                {tab.icon && tab.iconPosition === 'right' && (
                  <Icon name={tab.icon} size={16} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {showContent && activeTabData && activeTabData.content && (
        <div style={contentStyles}>
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default SimpleTabs;