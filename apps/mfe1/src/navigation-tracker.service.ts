import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, firstValueFrom } from 'rxjs';

/**
 * Track navigation events to know whether the current navigation is an initial
 * navigation from the browser, or a subsequent client-side navigation from
 * Angular Router.
 */
@Injectable({ providedIn: 'root' })
export class NavigationTracker {
  private readonly router: Router;

  /** Whether or not a client-side navigation has ocurred. */
  get hasNavigated() {
    return this.#hasNavigated;
  }
  #hasNavigated = false;

  constructor() {
    this.router = inject(Router);
  }

  /** Watch navigation events to determine when a navigation has ocurred. */
  watchNavigations(): void {
    firstValueFrom(this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
    )).then(() => {
      this.#hasNavigated = true;
    });
  }
}
