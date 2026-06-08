// A second service handles theme — keeps concerns separate from content loading.
import { Injectable, signal, effect } from '@angular/core';

type Theme = 'light' | 'dark';
const THEME_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.getInitial());

  constructor() {
    // `effect` is Angular's equivalent of Vue's watchEffect / React's useEffect:
    // it runs whenever any signal it reads changes.
    effect(() => {
      document.documentElement.setAttribute('data-theme', this.theme());
    });
  }

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.theme.set(next);
    localStorage.setItem(THEME_KEY, next);
  }

  private getInitial(): Theme {
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
