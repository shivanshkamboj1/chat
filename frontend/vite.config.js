import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // <-- output folder for production build
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // optional but helpful
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // <-- proxy API requests to backend
    },
  },
});
