import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  base: '/kswodeck/vue/',
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck/vue'),
    emptyOutDir: true,
  },
});
