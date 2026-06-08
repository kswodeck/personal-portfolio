import { Component, inject, computed } from '@angular/core';
import { FrameworkSwitcherComponent } from './framework-switcher.component';
import { ContentService } from '../content.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [FrameworkSwitcherComponent],
  template: `
    @if (content()) {
      <div class="topbar" role="banner">
        <div class="container">
          <span class="topbar-left">
            Built with: {{ content()!.meta.frameworkLabels[content()!.meta.defaultFramework] }}
          </span>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <app-framework-switcher
              [meta]="content()!.meta"
              [current]="content()!.meta.defaultFramework"
              size="small"
            />
            <button
              class="theme-toggle"
              [attr.aria-label]="'Switch to ' + (themeLabel()) + ' mode'"
              title="Toggle dark mode"
              (click)="themeService.toggle()"
            >{{ toggleIcon() }}</button>
          </div>
        </div>
      </div>
    }
  `,
})
export class TopBarComponent {
  // `inject()` is the functional DI API (Angular 14+) — an alternative to
  // constructor injection that works anywhere inside the injection context.
  contentService = inject(ContentService);
  themeService = inject(ThemeService);

  content = this.contentService.content;

  // `computed` derives a value from signals and memoises it — same as Vue's computed.
  toggleIcon = computed(() => this.themeService.theme() === 'dark' ? '☀️' : '🌙');
  themeLabel = computed(() => this.themeService.theme() === 'dark' ? 'light' : 'dark');
}
