import type { Preview } from '@storybook/react-vite'
import '../src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  decorators: [
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