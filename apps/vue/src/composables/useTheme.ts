import { ref, watchEffect } from 'vue';
import { type Theme, THEME_KEY, getInitialTheme } from '../../../../shared/theme';

// `ref` creates a reactive value — Vue's equivalent of useState in React.
// When `theme` changes, any component that reads it re-renders automatically.
export const theme = ref<Theme>(getInitialTheme());

// `watchEffect` runs immediately and re-runs whenever any reactive value it
// reads changes — here it keeps the DOM attribute in sync with `theme.value`.
watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
});

export function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, theme.value);
}
