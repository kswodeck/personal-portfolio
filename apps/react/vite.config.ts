import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/react/',
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck/react'),
    emptyOutDir: true,
  },
});
