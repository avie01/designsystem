// Standalone Carbon Icons CSS injection for Storybook sidebar
// No imports needed - pure JavaScript/CSS approach

// Inject CSS to add Carbon icons to sidebar items
const addCarbonIconsCSS = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Carbon-style Icons for Storybook Sidebar - Multiple selectors for compatibility */
    
    /* Accordion Component - CheckmarkOutline */
    [data-item-id*="accordion"] span::before,
    [data-nodeid*="accordion"] span::before,
    [aria-label*="Accordion"] span::before,
    .sidebar-item[data-ref-id*="accordion"] span::before {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z"/><path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0137,12.0137,0,0,1,16,28Z"/></svg>');
      background-size: contain;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    
    /* Button Component */
    [data-item-id*="button"] span::before,
    [data-nodeid*="button"] span::before,
    [aria-label*="Button"] span::before,
    .sidebar-item[data-ref-id*="button"] span::before {
      content: "🔘 ";
    }
    
    /* Input Component */
    [data-item-id*="input"] span::before,
    [data-nodeid*="input"] span::before,
    [aria-label*="Input"] span::before,
    .sidebar-item[data-ref-id*="input"] span::before {
      content: "✏️ ";
    }
    
    /* Modal Component */
    [data-item-id*="modal"] span::before,
    [data-nodeid*="modal"] span::before,
    [aria-label*="Modal"] span::before,
    .sidebar-item[data-ref-id*="modal"] span::before {
      content: "🗔 ";
    }
    
    /* Table Component */
    [data-item-id*="table"] span::before,
    [data-nodeid*="table"] span::before,
    [aria-label*="Table"] span::before,
    .sidebar-item[data-ref-id*="table"] span::before {
      content: "📊 ";
    }
    
    /* Card Component */
    [data-item-id*="card"] span::before,
    [data-nodeid*="card"] span::before,
    [aria-label*="Card"] span::before,
    .sidebar-item[data-ref-id*="card"] span::before {
      content: "🗃️ ";
    }
    
    /* Header Component */
    [data-item-id*="header"] span::before,
    [data-nodeid*="header"] span::before,
    [aria-label*="Header"] span::before,
    .sidebar-item[data-ref-id*="header"] span::before {
      content: "📋 ";
    }
    
    /* Navigation Component */
    [data-item-id*="navigation"] span::before,
    [data-nodeid*="navigation"] span::before,
    [aria-label*="Navigation"] span::before,
    .sidebar-item[data-ref-id*="navigation"] span::before {
      content: "🧭 ";
    }
    
    /* Icon Component */
    [data-item-id*="icon"] span::before,
    [data-nodeid*="icon"] span::before,
    [aria-label*="Icon"] span::before,
    .sidebar-item[data-ref-id*="icon"] span::before {
      content: "⭐ ";
    }
    
    /* Badge/Chip Component */
    [data-item-id*="badge"] span::before,
    [data-nodeid*="badge"] span::before,
    [data-item-id*="chip"] span::before,
    [data-nodeid*="chip"] span::before,
    [aria-label*="Badge"] span::before,
    [aria-label*="Chip"] span::before,
    .sidebar-item[data-ref-id*="badge"] span::before,
    .sidebar-item[data-ref-id*="chip"] span::before {
      content: "🏷️ ";
    }
    
    /* Stepper Component */
    [data-item-id*="stepper"] span::before,
    [data-nodeid*="stepper"] span::before,
    [aria-label*="Stepper"] span::before,
    .sidebar-item[data-ref-id*="stepper"] span::before {
      content: "📈 ";
    }
    
    /* Try a more general approach */
    .sidebar-item span::before,
    [data-ref] span::before {
      margin-right: 4px;
    }
    
    /* Alternative approach using text content matching */
    .sidebar-item:has(span[title*="Accordion"]) span::before,
    .sidebar-item:has(span:contains("Accordion")) span::before {
      content: "📄 ";
    }
    
    .sidebar-item:has(span[title*="Button"]) span::before,
    .sidebar-item:has(span:contains("Button")) span::before {
      content: "🔘 ";
    }
    
    /* Debug styles to help identify elements */
    .sidebar-item {
      border-left: 2px solid transparent !important;
    }
    
    .sidebar-item[data-ref-id*="accordion"] {
      border-left-color: #4CAF50 !important;
    }
    
    .sidebar-item[data-ref-id*="button"] {
      border-left-color: #2196F3 !important;
    }
  `;
  document.head.appendChild(style);
};

// More aggressive DOM manipulation approach
const injectAccordionIcon = () => {
  // First, remove any existing custom icons to prevent duplicates
  document.querySelectorAll('.custom-accordion-icon').forEach(icon => {
    icon.remove();
  });
  
  // Reset all applied classes
  document.querySelectorAll('.accordion-icon-applied').forEach(element => {
    element.classList.remove('accordion-icon-applied');
  });
  
  // Wait a bit for DOM to settle, then proceed
  setTimeout(() => {
    // Find all elements that might contain "Accordion" text
    const possibleSelectors = [
      '[data-item-id*="accordion"]',
      '[data-nodeid*="accordion"]', 
      'a[href*="accordion"]',
      '[aria-label*="Accordion"]',
      '.sidebar-item'
    ];
    
    let accordionFound = false;
    
    possibleSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Check if this element contains "Accordion" text
          const text = element.textContent || '';
          if (text.toLowerCase().includes('accordion') && !accordionFound) {
            // Only target main component entries, not individual stories
            const isMainComponent = text.trim() === 'Accordion' || 
                                   (element.getAttribute('data-item-id') || '').includes('components-accordion') ||
                                   (element.querySelector('span') && element.querySelector('span').textContent?.trim() === 'Accordion');
            
            if (isMainComponent && !element.querySelector('.custom-accordion-icon')) {
              console.log('Found main Accordion element:', element);
              accordionFound = true; // Prevent duplicate processing
              
              // Find the span that contains the text
              const span = element.querySelector('span') || element;
              if (span && !span.classList.contains('accordion-icon-applied')) {
                // Add our custom icon class to prevent duplicates
                span.classList.add('accordion-icon-applied');
                
                // Create and inject the CheckmarkOutline icon directly
                const iconSpan = document.createElement('span');
                iconSpan.className = 'custom-accordion-icon';
                iconSpan.innerHTML = `
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M14 21.414l-5-5.001L10.413 15L14 18.586L21.585 11L23 12.415z"/>
                    <path d="M16,2A14,14,0,1,0,30,16,14.0158,14.0158,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12.0137,12.0137,0,0,1,16,28Z"/>
                  </svg>
                `;
                iconSpan.style.marginRight = '8px';
                iconSpan.style.display = 'inline-flex';
                iconSpan.style.alignItems = 'center';
                iconSpan.style.justifyContent = 'center';
                iconSpan.style.verticalAlign = 'middle';
                iconSpan.style.lineHeight = '1';
                iconSpan.style.width = '16px';
                iconSpan.style.height = '16px';
                iconSpan.style.flexShrink = '0';
                span.insertBefore(iconSpan, span.firstChild);
              }
            }
          }
        });
      } catch (e) {
        console.log('Selector failed:', selector, e);
      }
    });
  }, 100);
};

// Execute when DOM is ready
const init = () => {
  // Apply CSS immediately
  addCarbonIconsCSS();
  
  // Try direct DOM manipulation
  injectAccordionIcon();
  
  // Also try again after delays to catch dynamic content
  setTimeout(() => {
    addCarbonIconsCSS();
    injectAccordionIcon();
  }, 1000);
  
  setTimeout(() => {
    addCarbonIconsCSS();
    injectAccordionIcon();
  }, 3000);
  
  // Set up a mutation observer to catch dynamically added content
  const observer = new MutationObserver(() => {
    injectAccordionIcon();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Wait for DOM to load before injecting CSS
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}