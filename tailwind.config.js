/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.stories.{js,ts,jsx,tsx}",
    "./example/**/*.{js,ts,jsx,tsx}",
    "./products/build/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ODL Primary Colors
        'odl-primary': '#3560C1',
        'odl-primary-hover': '#2A4FA3',
        'odl-primary-light': '#E0F3FE',
        'odl-primary-dark': '#1E3A8A',
        
        // ODL Status Colors
        'odl-success': '#24A148',
        'odl-success-light': '#DEFBE6',
        'odl-error': '#DA1E28',
        'odl-error-light': '#FFD7D9',
        'odl-warning': '#F1C21B',
        'odl-warning-light': '#FFF1C7',
        'odl-info': '#0F62FE',
        'odl-info-light': '#E8F4FD',
        
        // ODL Neutral Colors
        'odl-background': '#FAFAFA',
        'odl-surface': '#F4F4F4',
        'odl-border': '#E0E0E0',
        'odl-text-primary': '#161616',
        'odl-text-secondary': '#525252',
        'odl-text-tertiary': '#8D8D8D',
        'odl-text-disabled': '#C6C6C6',
        
        // Legacy colors for compatibility
        'odl-white': '#FFFFFF',
        'odl-wave': '#F4F4F4',
        'odl-light-deco': '#E0E0E0',
        'odl-twilight': '#6F6F6F',
        'odl-night': '#161616',
        'odl-blue-default': '#0F62FE',
        'odl-active-background': '#E0F3FE',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        'xxl': '48px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      fontSize: {
        'display-2': ['42px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-4': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-5': ['20px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-1': ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-2': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'caption-14': ['14px', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-12': ['12px', { lineHeight: '1.3', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}; 