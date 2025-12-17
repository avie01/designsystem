import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname, 'example'),
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  server: {
    port: 3000,
    host: 'localhost',
    strictPort: false,
  },
  
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@carbon/icons-react'],
  },
});