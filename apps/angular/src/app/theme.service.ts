// A second service handles theme — keeps concerns separate from content loading.
import { Injectable, signal, effect } from '@angular/core';
import { type Theme, THEME_KEY, getInitialTheme } from '../../../../shared/theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(getInitialTheme());

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
}
