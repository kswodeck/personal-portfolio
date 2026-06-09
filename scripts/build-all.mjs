#!/usr/bin/env node
// Builds all four apps in parallel and assembles dist/kswodeck/.
// Run from the repo root: node scripts/build-all.mjs
import { spawn } from 'child_process';
import { cpSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const shared = join(root, 'shared/content.json');

// Stream each process's output prefixed with the framework name.
function run(label, cmd, args, cwd) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { cwd, shell: true });
    const prefix = `[${label}] `;
    proc.stdout.on('data', d => process.stdout.write(prefix + d));
    proc.stderr.on('data', d => process.stderr.write(prefix + d));
    proc.on('close', code =>
      code === 0 ? resolve() : reject(new Error(`${label} exited with code ${code}`))
    );
  });
}

// 0. Copy shared/content.json into every app's public/ so each build picks
//    up the latest content. (Vite dev servers intercept the request live;
//    Angular dev server needs the file present in public/.)
console.log('\n▶ Syncing shared/content.json → apps/*/public/content.json');
for (const app of ['vanilla', 'react', 'vue', 'angular']) {
  cpSync(shared, join(root, `apps/${app}/public/content.json`));
}

// 1. Build all four frameworks in parallel — they write to separate output
//    directories so there's no conflict.
console.log('\n▶ Building all frameworks in parallel…\n');
await Promise.all([
  run('vanilla', 'npm', ['run', 'build'], join(root, 'apps/vanilla')),
  run('vue',     'npm', ['run', 'build'], join(root, 'apps/vue')),
  run('react',   'npm', ['run', 'build'], join(root, 'apps/react')),
  run('angular', 'npx', ['ng', 'build'],  join(root, 'apps/angular')),
]);

// 2. Ensure the dist root has content.json (vanilla's build lands it there
//    already, but this makes the intent explicit).
const distRoot = join(root, 'dist/kswodeck');
mkdirSync(distRoot, { recursive: true });
cpSync(shared, join(distRoot, 'content.json'));

console.log('\n✅  dist/kswodeck/ is ready for deployment.');
console.log('    kswodeck.swodecksitesolutions.com/          → vanilla');
console.log('    kswodeck.swodecksitesolutions.com/react/    → react');
console.log('    kswodeck.swodecksitesolutions.com/vue/      → vue');
console.log('    kswodeck.swodecksitesolutions.com/angular/  → angular');
