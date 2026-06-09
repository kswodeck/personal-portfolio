import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';

const sharedContent = resolve(__dirname, '../../shared/content.json');

export default defineConfig({
  base: '/',
  plugins: [
    {
      name: 'shared-content',
      configureServer(server) {
        // Serve content.json live from shared/ so edits hot-reload without
        // requiring a manual file copy.
        server.watcher.add(sharedContent);
        server.middlewares.use('/content.json', (_req, res) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(readFileSync(sharedContent, 'utf-8'));
        });
      },
    },
  ],
  build: {
    outDir: resolve(__dirname, '../../dist/kswodeck'),
    emptyOutDir: true,
  },
});
