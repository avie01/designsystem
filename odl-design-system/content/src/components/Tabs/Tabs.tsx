import React, { useState, useRef, useCallback, KeyboardEvent } from 'react';

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

  // Self-contained styles
  // DESIGN RULE: Tabs must maintain consistent spacing across all implementations
  // - Always use 'px-4 py-3 text-sm' for default variant (standard tabs)
  // - Always use 'px-3 py-2 text-xs' for compact variant (space-constrained areas)
  // - Tab container should have proper padding/margin from parent elements (p-4 or equivalent)
  // - Content area should have consistent 'py-4' padding
  const containerStyles = 'w-full';
  const navigationStyles = 'flex border-b border-gray-200 gap-0';
  const tabItemStyles = classNames(
    'relative bg-none border-none font-normal text-gray-600 cursor-pointer transition-all duration-200 rounded-none outline-none whitespace-nowrap min-w-0 flex-shrink-0',
    variant === 'default' ? 'px-4 py-3 text-sm' : 'px-3 py-2 text-xs',
    'hover:not-disabled:bg-gray-100 hover:not-disabled:text-gray-600',
    'focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2'
  );
  const activeTabStyles = 'text-blue-600 font-medium after:content-[""] after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-blue-600 after:rounded-sm';
  const disabledTabStyles = 'text-gray-400 cursor-not-allowed opacity-60 hover:bg-transparent';
  const contentStyles = 'py-4';

  return (
    <div className={classNames(containerStyles, className)}>
      {/* Tab Navigation */}
      <div className={navigationStyles} role="tablist">
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
            >
              {tab.label}
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