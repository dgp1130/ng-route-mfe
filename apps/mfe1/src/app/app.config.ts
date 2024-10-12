import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

const NO_MATCH = 4002; // From https://github.com/angular/angular/blob/f84e8ddcd90c81bf9c4232cf8436ebb509856f42/packages/router/src/errors.ts#L15

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withNavigationErrorHandler((err) => {
      if (err.error.code !== NO_MATCH) return; // Ignore

      // Perform a hard navigation.
      window.location.href = err.url;
    })),
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
};
