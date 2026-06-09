import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const sharedContent = resolve(__dirname, '../../shared/content.json');

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'shared-content',
      configureServer(server) {
        server.watcher.add(sharedContent);
        server.middlewares.use('/react/content.json', (_req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(readFileSync(sharedContent, 'utf-8'));
        });
      },
    },
  ],
  base: '/react/',
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck/react'),
    emptyOutDir: true,
  },
});
