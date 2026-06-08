// Angular services are classes decorated with @Injectable.
// `providedIn: 'root'` means Angular creates one instance for the whole app
// and makes it available everywhere via dependency injection — no need to
// register it manually in a providers array.
import { Injectable, signal } from '@angular/core';
import type { Content } from './types';

@Injectable({ providedIn: 'root' })
export class ContentService {
  // `signal` is Angular 17+'s reactive primitive (similar to Vue's ref).
  // Reading a signal in a template creates a dependency; writing triggers updates.
  readonly content = signal<Content | null>(null);
  readonly error = signal<string | null>(null);

  async load(): Promise<void> {
    try {
      const url = new URL('content.json', document.baseURI);
      const res = await fetch(url.href);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.content.set(await res.json());
    } catch (e) {
      this.error.set((e as Error).message);
    }
  }
}
