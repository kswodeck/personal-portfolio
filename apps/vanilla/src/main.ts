import '../../../shared/base.css';
import type { Content } from './types';
import { renderApp } from './render';

// ── Theme persistence ────────────────────────────────────────────────────
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) as 'light' | 'dark' | null;
  const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved ?? preferred);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// ── Content fetch ────────────────────────────────────────────────────────
// Resolve relative to the page's base so it works at any depth.
async function loadContent(): Promise<Content> {
  const url = new URL('content.json', document.baseURI);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error(`Failed to load content.json: ${res.status}`);
  return res.json() as Promise<Content>;
}

// ── Boot ─────────────────────────────────────────────────────────────────
initTheme();

loadContent().then(content => {
  document.title = content.meta.siteTitle;
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (metaDesc) metaDesc.content = content.meta.description;

  const app = document.getElementById('app')!;
  app.innerHTML = renderApp(content, content.meta.defaultFramework);

  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}).catch(err => {
  document.getElementById('app')!.innerHTML =
    `<div style="padding:2rem;color:red;">Failed to load portfolio content: ${(err as Error).message}</div>`;
});
