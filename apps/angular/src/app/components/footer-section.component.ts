import { Component, input } from '@angular/core';
import type { Profile } from '../types';

@Component({
  selector: 'app-footer-section',
  standalone: true,
  template: `
    <footer>
      <div class="container">
        <div class="footer-inner">
          <span class="footer-copy">© {{ year }} {{ profile().name }}</span>
          <div class="footer-links">
            <a [href]="'mailto:' + profile().email">Email</a>
            <a [href]="profile().links.linkedin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a [href]="profile().links.github" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class FooterSectionComponent {
  profile = input.required<Profile>();
  year = new Date().getFullYear();
}
