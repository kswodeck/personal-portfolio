# Kris Swodeck — Multi-Framework Portfolio

A personal portfolio built four times — once in each major front-end framework — all reading
from a single shared `shared/content.json`. Each implementation is a fully independent,
standalone build served at its own URL path.

| Path | Framework | Build tool |
|------|-----------|------------|
| `/kswodeck/` | Vanilla JS/TS | Vite |
| `/kswodeck/react/` | React | Vite |
| `/kswodeck/vue/` | Vue 3 | Vite |
| `/kswodeck/angular/` | Angular 17+ | Angular CLI |

---

## Repository layout

```
personal-portfolio/
├── apps/
│   ├── vanilla/     Vite + TypeScript
│   ├── react/       Vite + React + TypeScript
│   ├── vue/         Vite + Vue 3 + TypeScript
│   └── angular/     Angular 17+ standalone components
├── shared/
│   ├── content.json   ← single source of truth for all content
│   └── base.css       ← shared stylesheet (all four apps import this)
├── scripts/
│   └── build-all.mjs  ← assembles dist/kswodeck/
└── dist/
    └── kswodeck/      ← deployable output (gitignore this)
```

---

## Local development

Each app has its own dev server. Run from the app's directory:

```bash
# Vanilla
cd apps/vanilla && npm run dev
# → http://localhost:5173/kswodeck/

# React
cd apps/react && npm run dev
# → http://localhost:5173/kswodeck/react/

# Vue
cd apps/vue && npm run dev
# → http://localhost:5173/kswodeck/vue/

# Angular
cd apps/angular && npx ng serve
# → http://localhost:4200/kswodeck/angular/
```

> The dev servers each serve `content.json` from the app's `public/` folder.
> If you edit `shared/content.json`, re-copy it to each `apps/*/public/` to
> see changes in dev — or just run the full build.

---

## Build

From the repo root:

```bash
npm run build
```

This runs `node scripts/build-all.mjs`, which:
1. Builds all four apps in sequence.
2. Copies `shared/content.json` to `dist/kswodeck/content.json`.

Output is `dist/kswodeck/` — a self-contained static folder ready to upload.

To build an individual app:

```bash
cd apps/vanilla  && npm run build
cd apps/react    && npm run build
cd apps/vue      && npm run build
cd apps/angular  && npx ng build
```

---

## Content updates

**All content lives in `shared/content.json`.** Edit only that file —
never hardcode resume content in any component. After editing:

1. Copy to each app's `public/` directory for local dev:
   ```bash
   cp shared/content.json apps/vanilla/public/content.json
   cp shared/content.json apps/react/public/content.json
   cp shared/content.json apps/vue/public/content.json
   cp shared/content.json apps/angular/public/content.json
   ```
2. Run `npm run build` to produce a fresh `dist/kswodeck/`.

---

## Deployment (self-hosted WordPress)

### What to upload

Upload the entire contents of `dist/kswodeck/` as a real `/kswodeck/` directory
in your WordPress web root. The expected structure on the server:

```
/kswodeck/
├── index.html        ← vanilla app
├── content.json
├── assets/
├── react/
│   └── index.html
├── vue/
│   └── index.html
└── angular/
    └── index.html
```

### Why it works without extra server config

WordPress's default `.htaccess` rewrite rules include these conditions before routing:

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
```

A real `/kswodeck/` directory with real files satisfies the `!-d` condition, so
WordPress passes the request straight to Apache, which serves `index.html` from the directory.

### Staging verification checklist

Before going live, verify on a staging copy:

- [ ] `https://yourdomain.com/kswodeck/` loads the vanilla portfolio (not a WordPress 404).
- [ ] `https://yourdomain.com/kswodeck/react/` loads the React version.
- [ ] `https://yourdomain.com/kswodeck/vue/` loads the Vue version.
- [ ] `https://yourdomain.com/kswodeck/angular/` loads the Angular version.
- [ ] All four pages load their CSS and JS assets without 404s (check the browser Network tab).
- [ ] The framework switcher links navigate correctly between all four.
- [ ] The light/dark theme toggle works and persists across page navigations.
- [ ] No phone number is rendered anywhere (respects `showPhonePublicly: false`).

### Fallback: if WordPress intercepts the path

If the staging check fails with a WordPress 404 (meaning WordPress is routing `/kswodeck/`
before Apache checks for the real directory), add this exclusion **at the top** of your
`.htaccess` before WordPress's own rewrite block:

```apache
# Serve the /kswodeck/ portfolio directory directly
RewriteRule ^kswodeck/ - [L]
```

**Always back up `.htaccess` before editing it.** The exclusion must appear above
the `# BEGIN WordPress` marker.

### Base path notes

Each app is built with the correct base path baked in:

| App | Base path |
|-----|-----------|
| Vanilla | `/kswodeck/` |
| React | `/kswodeck/react/` |
| Vue | `/kswodeck/vue/` |
| Angular | `/kswodeck/angular/` |

If you ever need to serve from a different path, update `base` in each Vite config
and `baseHref` in `apps/angular/angular.json`, then rebuild.

---

## IDE notes

- **Vue:** The IDE squiggles on `.vue` imports ("no default export") come from VS Code's
  built-in TypeScript server not understanding Vue files natively. Install the
  **Vue - Official** (Volar) extension and they disappear. The `vue-tsc` build is clean.
- **Angular:** Uses Angular 17+ standalone components and signal-based inputs (`input()`).
  The Angular Language Service extension provides IDE support.
