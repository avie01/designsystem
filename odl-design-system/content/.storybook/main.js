export default {
  stories: ['../src/**/*.stories.{js,jsx,ts,tsx,mdx}'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  typescript: {
    check: false,
  },
};
