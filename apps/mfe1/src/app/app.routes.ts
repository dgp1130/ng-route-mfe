import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';

export const appRoutes: Route[] = [
    { path: '', loadComponent: () => HomeComponent },
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
                const platform = inject(PLATFORM_ID);
                if (isPlatformBrowser(platform)) {
                    window.location.href = `/${route.url.join('/')}`;
                }

                return false;
            },
        ],
        loadComponent: () => { throw new Error('Unused.'); },
    },
];
