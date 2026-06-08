import { ref, watchEffect } from 'vue';

// `ref` creates a reactive value — Vue's equivalent of useState in React.
// When `theme` changes, any component that reads it re-renders automatically.
const THEME_KEY = 'portfolio-theme';

type Theme = 'light' | 'dark';

const saved = localStorage.getItem(THEME_KEY) as Theme | null;
const preferred: Theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const theme = ref<Theme>(saved ?? preferred);

// `watchEffect` runs immediately and re-runs whenever any reactive value it
// reads changes — here it keeps the DOM attribute in sync with `theme.value`.
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
});

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, theme.value);
}
