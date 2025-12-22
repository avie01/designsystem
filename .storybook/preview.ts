import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css';
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
      }
      return Story();
    },
  ],
};

export default preview;