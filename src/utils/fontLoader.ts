// Load accessibility fonts for better performance
export const preloadAccessibilityFonts = () => {
  // Check if we're in the browser
  if (typeof window === 'undefined') return;

  // Only preload if not already loaded
  if (document.querySelector('link[rel="preload"][href*="OpenDyslexic"]')) return;

  const fonts = [
    {
      family: 'OpenDyslexic',
      files: [
        '/fonts/OpenDyslexic-Regular.woff2',
        '/fonts/OpenDyslexic-Bold.woff2'
      ]
    },
    {
      family: 'Atkinson Hyperlegible',
      files: [
        '/fonts/Atkinson-Hyperlegible-Regular.woff2',
        '/fonts/Atkinson-Hyperlegible-Bold.woff2'
      ]
    }
  ];

  fonts.forEach(font => {
    font.files.forEach(file => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = file;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  });
};

// Function to check and ensure font loading
export const ensureFontsLoaded = async () => {
  if (typeof window === 'undefined') return;

  // Preload the fonts
  preloadAccessibilityFonts();

  // Create a promise for each font family to check if it's loaded
  const fontPromises = [
    new Promise((resolve) => {
      if (document.fonts && document.fonts.check) {
        // Check if OpenDyslexic is loaded
        if (document.fonts.check('1em OpenDyslexic')) {
          resolve(undefined);
        } else {
          // Wait for OpenDyslexic to load
          document.fonts.addEventListener('loadingdone', () => {
            if (document.fonts.check('1em OpenDyslexic')) {
              resolve(undefined);
            }
          });
        }
      } else {
        // Fallback if document.fonts is not available
        setTimeout(() => resolve(undefined), 1000);
      }
    }),
    new Promise((resolve) => {
      if (document.fonts && document.fonts.check) {
        // Check if Atkinson Hyperlegible is loaded
        if (document.fonts.check('1em "Atkinson Hyperlegible"')) {
          resolve(undefined);
        } else {
          // Wait for Atkinson Hyperlegible to load
          document.fonts.addEventListener('loadingdone', () => {
            if (document.fonts.check('1em "Atkinson Hyperlegible"')) {
              resolve(undefined);
            }
          });
        }
      } else {
        // Fallback if document.fonts is not available
        setTimeout(() => resolve(undefined), 1000);
      }
    })
  ];

  // Wait for all fonts to load
  try {
    await Promise.all(fontPromises);
    console.log('All accessibility fonts loaded');
  } catch (error) {
    console.warn('Error loading accessibility fonts:', error);
  }
};
