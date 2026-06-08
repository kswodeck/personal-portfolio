import { Component, input } from '@angular/core';
import type { Education } from '../types';

@Component({
  selector: 'app-education-section',
  standalone: true,
  template: `
    <section class="section" id="education" aria-labelledby="education-heading">
      <div class="container">
        <h2 class="section-heading" id="education-heading">Education</h2>
        <div class="education-list">
          @for (edu of education(); track edu.institution) {
            <div class="education-item">
              <div>
                <div class="education-institution">{{ edu.institution }}</div>
                <div class="education-credential">{{ edu.credential }}</div>
              </div>
              <div class="education-dates">{{ edu.start }} – {{ edu.end }}</div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class EducationSectionComponent {
  education = input.required<Education[]>();
}
