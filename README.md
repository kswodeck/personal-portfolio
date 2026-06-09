# Kris Swodeck — Multi-Framework Portfolio

A personal portfolio built four times — once in each major front-end framework — all reading
from a single shared `shared/content.json`. Each implementation is a fully independent,
standalone build served at its own URL path on the subdomain `kswodeck.swodecksitesolutions.com`.

| URL | Framework | Build tool |
|-----|-----------|------------|
| `kswodeck.swodecksitesolutions.com/` | Vanilla JS/TS | Vite |
| `kswodeck.swodecksitesolutions.com/react/` | React | Vite |
| `kswodeck.swodecksitesolutions.com/vue/` | Vue | Vite |
| `kswodeck.swodecksitesolutions.com/angular/` | Angular 17+ | Angular CLI |

---

## Repository layout

```
personal-portfolio/
├── apps/
│   ├── vanilla/     Vite + TypeScript
│   ├── react/       Vite + React + TypeScript
│   ├── vue/         Vite + Vue + TypeScript
│   └── angular/     Angular 17+ standalone components
├── shared/
│   ├── content.json   ← single source of truth for all content
│   ├── base.css       ← shared stylesheet (all four apps import this)
│   ├── types.ts       ← shared TypeScript types
│   ├── fetchContent.ts← shared content-fetch helper
│   └── theme.ts       ← shared theme utilities
├── scripts/
│   └── build-all.mjs  ← builds all four apps in parallel
└── dist/
    └── kswodeck/      ← deployable output (gitignored)
```

---

## Local development

Each app has its own dev server. From the repo root:

```bash
npm run dev             # Vanilla (default) → http://localhost:5173/
npm run dev:react       # React             → http://localhost:5173/react/
npm run dev:vue         # Vue               → http://localhost:5173/vue/
npm run dev:angular     # Angular           → http://localhost:4200/angular/
```

Or run from the app's own directory:

```bash
cd apps/vanilla  && npm run dev
cd apps/react    && npm run dev
cd apps/vue      && npm run dev
cd apps/angular  && npx ng serve
```

> The dev servers each serve `content.json` from the app's `public/` folder.
> Running `npm run build` (or `node scripts/build-all.mjs`) syncs
> `shared/content.json` to each app's `public/` automatically.

---

## Build

From the repo root:

```bash
npm run build
```

This runs `node scripts/build-all.mjs`, which:
1. Syncs `shared/content.json` to each app's `public/` directory.
2. Builds all four apps **in parallel**.
3. Copies `shared/content.json` to `dist/kswodeck/content.json`.

Output is `dist/kswodeck/` — a self-contained static folder matching the live site structure.

To install all app dependencies at once:

```bash
npm run install-all
```

---

## Content updates

**All content lives in `shared/content.json`.** Edit only that file —
never hardcode resume content in any component. After editing, run:

```bash
npm run build
```

The build script syncs the file everywhere before building. To update
local dev servers without a full build, copy manually:

```bash
cp shared/content.json apps/vanilla/public/content.json
cp shared/content.json apps/react/public/content.json
cp shared/content.json apps/vue/public/content.json
cp shared/content.json apps/angular/public/content.json
```

---

## Deployment (Netlify)

The site is deployed via Netlify with automatic deploys on every push to `master`.

**Live URL:** `https://kswodeck.swodecksitesolutions.com`

### How it's configured

- **`netlify.toml`** at the repo root sets the build command and publish directory:
  ```toml
  [build]
    command = "npm run install-all && npm run build"
    publish = "dist/kswodeck"
  ```
- **DNS:** `kswodeck.swodecksitesolutions.com` is managed via Netlify DNS,
  with nameservers updated at the domain registrar (Hostinger) to point to Netlify.
- **HTTPS:** Automatic via Netlify's Let's Encrypt integration.

### Deploying a change

Just push to `master` — Netlify picks it up automatically:

```bash
git add -A
git commit -m "your message"
git push origin master
```

Netlify will build and deploy within ~4 minutes. Monitor progress in the
**Deploys** tab of the Netlify dashboard.

### Base paths

Each app is built with its served path baked in so assets resolve correctly:

| App | Base path |
|-----|-----------|
| Vanilla | `/` |
| React | `/react/` |
| Vue | `/vue/` |
| Angular | `/angular/` |

If the subdomain ever changes, update `base` in each Vite config,
`baseHref` in `apps/angular/angular.json`, and `frameworkPaths` in
`shared/content.json`, then push.

---

## IDE notes

- **Vue:** Install the **Vue - Official** (Volar) VS Code extension to resolve
  IDE squiggles on `.vue` imports. The `vue-tsc` build is clean regardless.
- **Angular:** The **Angular Language Service** extension provides IDE support
  for Angular templates and decorators.
