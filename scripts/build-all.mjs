#!/usr/bin/env node
// Builds all four apps in sequence and assembles dist/kswodeck/.
// Run from the repo root: node scripts/build-all.mjs
import { execSync } from 'child_process';
import { cpSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const shared = join(root, 'shared/content.json');

function run(cmd, cwd) {
  console.log(`\n▶ ${cmd}  (in ${cwd.replace(root, '.')})`);
  execSync(cmd, { cwd, stdio: 'inherit' });
}

// 0. Sync shared/content.json into each app's public/ so dev servers and
//    builds always use the latest content without a manual copy step.
console.log('\n▶ Syncing shared/content.json → apps/*/public/content.json');
for (const app of ['vanilla', 'react', 'vue', 'angular']) {
  cpSync(shared, join(root, `apps/${app}/public/content.json`));
}

// 1. Vanilla — clears and writes dist/kswodeck/
run('npm run build', join(root, 'apps/vanilla'));

// 2. Vue — writes dist/kswodeck/vue/
run('npm run build', join(root, 'apps/vue'));

// 3. React — writes dist/kswodeck/react/
run('npm run build', join(root, 'apps/react'));

// 4. Angular — writes dist/kswodeck/angular/
run('npx ng build', join(root, 'apps/angular'));

// 5. Ensure the dist root has content.json (vanilla's public/ copy lands it
//    there already, but this makes the intent explicit).
const distRoot = join(root, 'dist/kswodeck');
mkdirSync(distRoot, { recursive: true });
cpSync(shared, join(distRoot, 'content.json'));

console.log('\n✅  dist/kswodeck/ is ready for deployment.');
console.log('    kswodeck.swodecksitesolutions.com/          → vanilla');
console.log('    kswodeck.swodecksitesolutions.com/react/    → react');
console.log('    kswodeck.swodecksitesolutions.com/vue/      → vue');
console.log('    kswodeck.swodecksitesolutions.com/angular/  → angular');
