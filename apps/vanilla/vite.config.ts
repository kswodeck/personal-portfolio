import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: '/kswodeck/',
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck'),
    emptyOutDir: true,
  },
});
