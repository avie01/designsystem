import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';
import ODLTheme from '../../styles/ODLTheme';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
  showContent?: boolean;
  style?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  showContent = true,
  style
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>, tabIndex: number) => {
    let newIndex = tabIndex;
    
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        newIndex = tabIndex > 0 ? tabIndex - 1 : tabs.length - 1;
        break;
      case 'ArrowRight':
        event.preventDefault();
        newIndex = tabIndex < tabs.length - 1 ? tabIndex + 1 : 0;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      default:
        return;
    }
    
    // Focus the new tab and activate it
    const targetTab = tabs[newIndex];
    if (targetTab && !targetTab.disabled) {
      tabRefs.current[newIndex]?.focus();
      handleTabClick(targetTab.id);
    }
  }, [tabs, handleTabClick]);

  const activeTabData = tabs.find(tab => tab.id === currentActiveTab);

  // ODL Theme-based styles
  const containerStyles: React.CSSProperties = {
    width: '100%',
    ...style
  };

  const navigationStyles: React.CSSProperties = {
    display: 'flex',
    borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
    gap: 0
  };

  const getTabStyles = (isActive: boolean, isDisabled: boolean): React.CSSProperties => ({
    position: 'relative',
    background: 'none',
    border: 'none',
    fontWeight: isActive ? ODLTheme.typography.fontWeight.medium : ODLTheme.typography.fontWeight.normal,
    color: isDisabled ? ODLTheme.colors.text.disabled : 
           isActive ? ODLTheme.colors.primary : ODLTheme.colors.text.secondary,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: 0,
    outline: 'none',
    whiteSpace: 'nowrap',
    minWidth: 0,
    flexShrink: 0,
    padding: variant === 'default' ? `${ODLTheme.spacing[3]} ${ODLTheme.spacing[4]}` : `${ODLTheme.spacing[2]} ${ODLTheme.spacing[3]}`,
    fontSize: variant === 'default' ? ODLTheme.typography.fontSize.sm : ODLTheme.typography.fontSize.xs,
    opacity: isDisabled ? 0.6 : 1
  });

  const contentStyles: React.CSSProperties = {
    padding: `${ODLTheme.spacing[4]} 0`
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Tab Navigation */}
      <div style={navigationStyles} role="tablist">
        {tabs.map((tab, index) => {
          const isActive = tab.id === currentActiveTab;
          const isDisabled = tab.disabled;

          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[index] = el)}
              role="tab"
              aria-selected={isActive}
              aria-disabled={isDisabled}
              aria-controls={`tabpanel-${tab.id}`}
              id={`tab-${tab.id}`}
              disabled={isDisabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !isDisabled && handleTabClick(tab.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              style={getTabStyles(isActive, isDisabled)}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.surface;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outline = `2px solid ${ODLTheme.colors.primary}`;
                e.currentTarget.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {tab.label}
              {isActive && (
                <div style={{
                  position: 'absolute',
                  bottom: '-1px',
                  left: 0,
                  right: 0,
                  height: '2px',
                  backgroundColor: ODLTheme.colors.primary,
                  borderRadius: ODLTheme.borders.radius.sm
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {showContent && activeTabData && (
        <div 
          style={contentStyles}
          role="tabpanel"
          id={`tabpanel-${activeTabData.id}`}
          aria-labelledby={`tab-${activeTabData.id}`}
          tabIndex={0}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

export default Tabs; 