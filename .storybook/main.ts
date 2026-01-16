import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    {
      directory: "../src",
      files: "**/*.stories.@(js|jsx|mjs|ts|tsx)",
      titlePrefix: "",
    },
  ],
  tags: {
    hidden: {
      excludeFromSidebar: true,
    },
  },
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y"
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
  },
  async viteFinal(config) {
    // Ensure MUI dependencies are optimized
    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.include = [
      ...(config.optimizeDeps.include || []),
      '@mui/material',
      '@mui/icons-material',
      '@mui/x-data-grid',
    ];

    // Ensure SVG imports are handled as asset URLs
    config.assetsInclude = config.assetsInclude || [];
    if (Array.isArray(config.assetsInclude)) {
      config.assetsInclude.push('**/*.svg');
    }

    return config;
  },
};
export default config;