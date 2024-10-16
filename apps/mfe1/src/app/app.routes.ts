import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { NavigationTracker } from '@ng-route-mfe/common';

export const appRoutes: Route[] = [
    { path: '', loadComponent: () => import('../home/home.component').then((m) => m.HomeComponent) },
    {
        path: 'mfe1',
        children: [
            { path: '', loadComponent: () => import('../root/root.component').then((m) => m.RootComponent) },
            { path: 'path1', loadComponent: () => import('../path1/path1.component').then((m) => m.Path1Component) },
            { path: 'path2', loadComponent: () => import('../path2/path2.component').then((m) => m.Path2Component) },
            { path: 'path3', loadComponent: () => import('../path3/path3.component').then((m) => m.Path3Component) },
            { path: '**', loadComponent: () => import('../not-found/not-found.component').then((m) => m.NotFoundComponent) },
        ],
    },
    {
        path: '**',
        canActivate: [
            (route: ActivatedRouteSnapshot) => {
                // Render this route for a hard-navigation. This can happen for
                // routes outside any MFE. The proxy server will pass them to
                // MFE1, meaning we need to render the initial navigation.
                const navTracker = inject(NavigationTracker);
                if (!navTracker.hasNavigated) return true;

                // Must be a client-side navigation to a URL outside MFE1,
                // therefore we perform a hard-navigation.
                const platform = inject(PLATFORM_ID);
                if (isPlatformBrowser(platform)) {
                    window.location.href = `/${route.url.join('/')}`;
                }

                return false;
            },
        ],
        loadComponent: () => import('../not-found/not-found.component').then((m) => m.NotFoundComponent),
    },
];
