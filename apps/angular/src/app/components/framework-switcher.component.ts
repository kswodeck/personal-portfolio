// `@Component` is the decorator that turns a class into an Angular component.
// `standalone: true` (default in Angular 17+) means no NgModule required.
// `imports` lists other components/directives this template uses.
import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import type { Meta } from '../types';

@Component({
  selector: 'app-framework-switcher',
  standalone: true,
  imports: [NgClass],
  template: `
    <!-- [ngClass] binds a CSS class conditionally — Angular's equivalent of :class -->
    <nav [ngClass]="size() === 'large' ? 'fw-switcher-large' : 'fw-switcher'" aria-label="Framework versions">
      <!-- @for is Angular 17's new control flow syntax, replacing *ngFor -->
      @for (fw of meta().frameworks; track fw) {
        @if (fw === current()) {
          <span aria-current="page">{{ meta().frameworkLabels[fw] }}</span>
        } @else {
          <a [href]="meta().frameworkPaths[fw]">{{ meta().frameworkLabels[fw] }}</a>
        }
      }
    </nav>
  `,
})
export class FrameworkSwitcherComponent {
  // `input()` is Angular 17's signal-based input (replaces @Input() decorator).
  // Reading `meta()` in a template creates a reactive dependency.
  meta = input.required<Meta>();
  current = input.required<string>();
  size = input<'small' | 'large'>('small');
}
