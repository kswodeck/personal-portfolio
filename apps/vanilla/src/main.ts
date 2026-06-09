import '../../../shared/base.css';
import { renderApp } from './render';
import { THEME_KEY, getInitialTheme } from '../../../shared/theme';
import { fetchContent } from '../../../shared/fetchContent';

// ── Theme ────────────────────────────────────────────────────────────────
// Vanilla has no reactive layer, so theme is applied imperatively.
// applyTheme also updates the toggle button emoji — framework-specific detail.
function applyTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next: 'light' | 'dark' = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

applyTheme(getInitialTheme());

// ── Boot ─────────────────────────────────────────────────────────────────
fetchContent().then(content => {
  document.title = content.meta.siteTitle;
  const metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (metaDesc) metaDesc.content = content.meta.description;

  const app = document.getElementById('app')!;
  app.innerHTML = renderApp(content, content.meta.defaultFramework);

  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme);
}).catch((err: Error) => {
  document.getElementById('app')!.innerHTML =
    `<div style="padding:2rem;color:red;">Failed to load portfolio content: ${err.message}</div>`;
});
