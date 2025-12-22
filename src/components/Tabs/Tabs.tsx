import React, { useState, useRef, useCallback, KeyboardEvent, useEffect } from 'react';
import { ODLTheme } from '../../styles/ODLTheme';
import { useTheme } from '../../../.storybook/theme-decorator';

// Self-contained utility function to replace clsx
const classNames = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'compact';
  className?: string;
  showContent?: boolean;
  fullWidth?: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'default',
  className = '',
  showContent = true,
  fullWidth = false
}) => {
  const { colors } = useTheme();
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || tabs[0]?.id || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  // Inject dynamic styles for theme-aware colors
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .odl-tab-item:hover:not(:disabled) {
        background-color: ${colors.grey300} !important;
      }
      .odl-tab-item:focus-visible {
        outline: 2px solid ${colors.primaryMain} !important;
        outline-offset: 2px !important;
      }
      .odl-tab-item.odl-tab-active::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 4px;
        background-color: ${colors.primaryMain} !important;
      }
    `;
    document.head.appendChild(style);
    styleRef.current = style;
    
    return () => {
      if (styleRef.current) {
        document.head.removeChild(styleRef.current);
        styleRef.current = null;
      }
    };
  }, [colors]);

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

  // Self-contained styles
  // DESIGN RULE: Tabs must maintain consistent spacing across all implementations
  // - Always use 'px-4 py-3 text-md' for default variant (standard tabs)
  // - Always use 'px-3 py-2 text-xs' for compact variant (space-constrained areas)
  // - Tab container should have proper padding/margin from parent elements (p-4 or equivalent)
  // - Content area should have consistent 'py-4' padding
  const containerStyles = 'w-full';
  const navigationStyles = 'flex border-b gap-0';
  const tabItemStyles = classNames(
    'relative bg-none border-none cursor-pointer transition-all duration-200 rounded-none outline-none whitespace-nowrap min-w-0 odl-tab-item',
    fullWidth ? 'flex-1' : 'flex-shrink-0',
    'flex items-center justify-center gap-2',
    variant === 'default' ? 'px-4 py-3' : 'px-3 py-2'
  );
  const activeTabStyles = 'font-medium odl-tab-active';
  const disabledTabStyles = 'cursor-not-allowed opacity-60 hover:bg-transparent';
  const contentStyles = 'py-4';

  // Navigation container styles with theme colors
  const navigationContainerStyles: React.CSSProperties = {
    borderColor: colors.grey400,
  };

  return (
    <div className={classNames(containerStyles, className)}>
      {/* Tab Navigation */}
      <div className={navigationStyles} style={navigationContainerStyles} role="tablist">
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
              className={classNames(
                tabItemStyles,
                isActive && activeTabStyles,
                isDisabled && disabledTabStyles
              )}
              style={{
                fontFamily: ODLTheme.typography.fontFamily.sans,
                fontSize: variant === 'default' ? ODLTheme.typography.fontSize.md : ODLTheme.typography.fontSize.xs,
                fontStyle: 'normal',
                fontWeight: ODLTheme.typography.fontWeight.semibold,
                lineHeight: ODLTheme.typography.lineHeight.normal,
                color: isDisabled 
                  ? colors.textDisabled 
                  : isActive 
                    ? colors.primaryMain 
                    : colors.primaryTwilight,
              } as React.CSSProperties}
            >
              {tab.iconLeft && (
                <span 
                  className="flex-shrink-0" 
                  style={{ 
                    color: isDisabled 
                      ? colors.textDisabled 
                      : isActive 
                        ? colors.primaryMain 
                        : colors.primaryTwilight 
                  }}
                >
                  {tab.iconLeft}
                </span>
              )}
              <span className="truncate">{tab.label}</span>
              {tab.iconRight && (
                <span 
                  className="flex-shrink-0" 
                  style={{ 
                    color: isDisabled 
                      ? colors.textDisabled 
                      : isActive 
                        ? colors.primaryMain 
                        : colors.primaryTwilight 
                  }}
                >
                  {tab.iconRight}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {showContent && activeTabData && (
        <div 
          className={contentStyles} 
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