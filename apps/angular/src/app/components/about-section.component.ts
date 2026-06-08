import { Component, input } from '@angular/core';

@Component({
  selector: 'app-about-section',
  standalone: true,
  template: `
    <section class="section" id="about" aria-labelledby="about-heading">
      <div class="container">
        <h2 class="section-heading" id="about-heading">About</h2>
        <p>{{ summary() }}</p>
      </div>
    </section>
  `,
})
export class AboutSectionComponent {
  summary = input.required<string>();
}
