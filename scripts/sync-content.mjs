#!/usr/bin/env node
// Copies shared/content.json into the specified apps' public/ directories.
// Usage: node scripts/sync-content.mjs [app1 app2 ...]
// Defaults to all four apps when no arguments are given.
import { cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const apps = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['vanilla', 'react', 'vue', 'angular'];

for (const app of apps) {
  const dest = join(root, `apps/${app}/public/content.json`);
  cpSync(join(root, 'shared/content.json'), dest);
  console.log(`synced → apps/${app}/public/content.json`);
}
