// A whole Angular app in one file: it exists to prove that a slide can embed an
// app with its own dev server, not just a static page. `servers:` in
// slides.config.js is what starts it alongside the deck.
import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <h1>Hello from Angular</h1>
    <button (click)="count.set(count() + 1)">{{ count() }}</button>
  `,
})
export class App {
  readonly count = signal(0);
}

bootstrapApplication(App).catch((error) => console.error(error));
