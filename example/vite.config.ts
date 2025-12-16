import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, '../src'),
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0', // Explicitly bind to all interfaces
    open: true,
    strictPort: false, // Allow fallback to next available port
    cors: true,
  },
  build: {
    outDir: '../dist-example',
  },
}); 