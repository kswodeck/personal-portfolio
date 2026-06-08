import { useState, useEffect, useCallback } from 'react';

// React's `useState` returns a value + setter pair. Unlike Vue's ref,
// you call the setter function to trigger a re-render rather than
// mutating `.value` directly.
type Theme = 'light' | 'dark';
const THEME_KEY = 'portfolio-theme';

function getInitialTheme(): Theme {
  const saved = localStorage.getItem(THEME_KEY) as Theme | null;
  if (saved) return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // `useEffect` runs after render and whenever `theme` changes (dependency array).
  // It keeps the DOM attribute in sync — same job as Vue's `watchEffect`.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // `useCallback` memoises the function so it doesn't get recreated every render.
  // Useful when passing handlers as props to avoid unnecessary child re-renders.
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
