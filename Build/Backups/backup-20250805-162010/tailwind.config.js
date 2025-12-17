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
        // Light theme colors
        'odl-white': '#FFFFFF',
        'odl-wave': '#F4F4F4',
        'odl-light-deco': '#E0E0E0',
        'odl-twilight': '#6F6F6F',
        'odl-night': '#161616',
        'odl-blue-default': '#0F62FE',
        'odl-active-background': '#E0F3FE',
        
        // Dark theme colors
        'odl-vacuum': '#161616',
        'odl-deep-space': '#262626',
        'odl-dark-deco': '#393939',
        'odl-moonlight': '#A8A8A8',
        'odl-white-dark': '#FFFFFF',
        'odl-blue': '#4589FF',
        'odl-dk-blue': '#0043CE',
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