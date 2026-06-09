import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const sharedContent = resolve(__dirname, '../../shared/content.json');

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'shared-content',
      configureServer(server) {
        server.watcher.add(sharedContent);
        server.middlewares.use('/content.json', (_req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(readFileSync(sharedContent, 'utf-8'));
        });
      },
    },
  ],
  base: '/vue/',
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck/vue'),
    emptyOutDir: true,
  },
});
