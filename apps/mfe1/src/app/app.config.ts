import { APP_INITIALIZER, ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { NavigationTracker } from '../navigation-tracker.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    { provide: APP_BASE_HREF, useValue: '/' },

    // Create an `APP_INITIALIZER` dependency on `NavigationTracker` so it immediately watches for
    // navigation events, even before it gets injected in the app proper.
    { provide: APP_INITIALIZER, useFactory: () => {
      const navTracker = inject(NavigationTracker);
      return () => {
        navTracker.watchNavigations();
      };
    }, multi: true, deps: [NavigationTracker] },
  ],
};
