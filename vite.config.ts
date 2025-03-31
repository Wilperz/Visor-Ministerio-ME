import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  css: {
    devSourcemap: true
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: [
        'jquery',
        'bootstrap',
        'chart.js'
      ]
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  }
});