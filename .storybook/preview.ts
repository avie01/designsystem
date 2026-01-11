import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css';
import './custom.css';
import { withTheme } from './theme-decorator';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'highContrast', title: 'High Contrast', icon: 'contrast' },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
    withTheme,
    (Story) => {
      if (typeof document !== 'undefined') {
        const errorDisplay = document.querySelector('.sb-errordisplay');
        if (errorDisplay && !errorDisplay.getAttribute('aria-hidden')) {
          errorDisplay.setAttribute('aria-hidden', 'true');
        }
        
        // Add obj.svg logo to the sidebar logo div - use MutationObserver for better timing
        const addLogo = () => {
          // Try multiple selectors to find the logo area
          const selectors = [
            '[class*="css-1x5orkv"]',
            '[data-testid="sidebar-header"]',
            '.sidebar-header',
            'a[href*="storybook"]',
            '[class*="sidebar"] [class*="brand"]',
            '[class*="sidebar"] a:first-child',
            'nav a:first-child',
          ];
          
          let logoDiv = null;
          for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            for (const el of elements) {
              // Check if it's in the sidebar area
              if (el.closest('[class*="sidebar"]') || el.closest('nav')) {
                logoDiv = el;
                break;
              }
            }
            if (logoDiv) break;
          }
          
          if (logoDiv) {
            // Check if logo already added
            const existingObjLogo = logoDiv.querySelector('img[src*="obj.svg"]');
            if (existingObjLogo) return; // Already added
            
            // Remove existing content but preserve structure
            const existingImg = logoDiv.querySelector('img');
            if (existingImg) {
              // Replace existing image src
              existingImg.src = '/assets/obj.svg';
              existingImg.alt = 'ODL Design System';
              existingImg.style.width = '162px';
              existingImg.style.height = '55px';
              existingImg.style.objectFit = 'contain';
              existingImg.style.display = 'block';
            } else {
              // Add obj.svg image if no img exists
              const logoImg = document.createElement('img');
              logoImg.src = '/assets/obj.svg';
              logoImg.alt = 'ODL Design System';
              logoImg.style.width = '162px';
              logoImg.style.height = '55px';
              logoImg.style.objectFit = 'contain';
              logoImg.style.display = 'block';
              logoDiv.appendChild(logoImg);
            }
          }
        };
        
        // Try immediately
        addLogo();
        
        // Also try after delays in case DOM isn't ready
        setTimeout(addLogo, 100);
        setTimeout(addLogo, 500);
        setTimeout(addLogo, 1000);
        
        // Use MutationObserver to watch for sidebar changes
        const observer = new MutationObserver(() => {
          addLogo();
        });
        
        const sidebar = document.querySelector('[class*="sidebar"]') || document.querySelector('nav') || document.body;
        if (sidebar) {
          observer.observe(sidebar, {
            childList: true,
            subtree: true,
          });
        }
      }
      return Story();
    },
  ],
};

export default preview;