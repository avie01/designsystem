import React, { useState, useRef, useCallback, KeyboardEvent, CSSProperties } from 'react';
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
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  showContent = true
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

  // Style functions using ODL theme
  const getTabItemStyles = (isActive: boolean, isDisabled: boolean): CSSProperties => ({
    position: 'relative',
    background: 'transparent',
    border: 'none',
    fontFamily: ODLTheme.typography.fontFamily.sans,
    fontSize: variant === 'default' ? ODLTheme.typography.fontSize.sm : ODLTheme.typography.fontSize.xs,
    fontWeight: isActive ? ODLTheme.typography.fontWeight.semibold : ODLTheme.typography.fontWeight.medium,
    color: isActive ? ODLTheme.colors.primary : isDisabled ? ODLTheme.colors.text.disabled : ODLTheme.colors.text.secondary,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    padding: variant === 'default' ? `${ODLTheme.spacing[3]}px ${ODLTheme.spacing[4]}px` : `${ODLTheme.spacing[2]}px ${ODLTheme.spacing[3]}px`,
    transition: ODLTheme.transitions.base,
    borderRadius: 0,
    outline: 'none',
    whiteSpace: 'nowrap',
    minWidth: 0,
    flexShrink: 0,
    opacity: isDisabled ? 0.6 : 1,
    paddingBottom: isActive ? `calc(${ODLTheme.spacing[3]}px - ${ODLTheme.borders.width.base})` : ODLTheme.spacing[3] + 'px',
    borderBottom: isActive ? `${ODLTheme.borders.width.base} solid ${ODLTheme.colors.primary}` : 'none',
  });

  const navigationStyles: CSSProperties = {
    display: 'flex',
    borderBottom: `${ODLTheme.borders.width.thin} solid ${ODLTheme.colors.border}`,
    gap: 0,
    width: '100%',
  };

  const containerStyles: CSSProperties = {
    width: '100%',
  };

  const contentStyles: CSSProperties = {
    padding: `${ODLTheme.spacing[4]}px 0`,
    color: ODLTheme.colors.text.primary,
    fontSize: ODLTheme.typography.fontSize.base,
    fontFamily: ODLTheme.typography.fontFamily.sans,
  };

  return (
    <div style={containerStyles} className={className}>
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
              style={{
                ...getTabItemStyles(isActive, isDisabled),
              }}
              onMouseEnter={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = ODLTheme.colors.wave;
                }
              }}
              onMouseLeave={(e) => {
                if (!isDisabled && !isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
              onFocus={(e) => {
                e.currentTarget.style.outlineWidth = ODLTheme.borders.width.base;
                e.currentTarget.style.outlineStyle = 'solid';
                e.currentTarget.style.outlineColor = ODLTheme.colors.primary;
                e.currentTarget.style.outlineOffset = ODLTheme.spacing[1] + 'px';
              }}
              onBlur={(e) => {
                e.currentTarget.style.outline = 'none';
              }}
            >
              {tab.label}
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