#!/usr/bin/env node
// Builds all four apps in sequence and assembles dist/kswodeck/.
// Run from the repo root: node scripts/build-all.mjs
import { execSync } from 'child_process';
import { cpSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

function run(cmd, cwd) {
  console.log(`\n▶ ${cmd}  (in ${cwd.replace(root, '.')})`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// 1. Vanilla — clears and writes dist/kswodeck/
run('npm run build', join(root, 'apps/vanilla'));

// 2. Vue — writes dist/kswodeck/vue/
run('npm run build', join(root, 'apps/vue'));

// 3. React — writes dist/kswodeck/react/
run('npm run build', join(root, 'apps/react'));

// 4. Angular — writes dist/kswodeck/angular/
run('npx ng build', join(root, 'apps/angular'));

// 5. Copy shared content.json to dist root so all four apps can fetch it.
//    The vanilla build already placed it there via public/, but the others
//    also serve from their own subdirs; the root copy is authoritative.
const distRoot = join(root, 'dist/kswodeck');
mkdirSync(distRoot, { recursive: true });
cpSync(join(root, 'shared/content.json'), join(distRoot, 'content.json'));

console.log('\n✅  dist/kswodeck/ is ready for deployment.');
console.log('    Paths:');
console.log('      /kswodeck/          → vanilla');
console.log('      /kswodeck/react/    → react');
console.log('      /kswodeck/vue/      → vue');
console.log('      /kswodeck/angular/  → angular');
