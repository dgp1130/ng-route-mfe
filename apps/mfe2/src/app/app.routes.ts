import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, Route } from '@angular/router';
import { NotFoundComponent } from '../not-found/not-found.component';
import { Path1Component } from '../path1/path1.component';
import { Path2Component } from '../path2/path2.component';
import { Path3Component } from '../path3/path3.component';
import { RootComponent } from '../root/root.component';

export const appRoutes: Route[] = [
    {
        path: 'mfe2',
        children: [
            { path: '', loadComponent: () => RootComponent },
            { path: 'path1', loadComponent: () => Path1Component },
            { path: 'path2', loadComponent: () => Path2Component },
            { path: 'path3', loadComponent: () => Path3Component },
            { path: '**', loadComponent: () => NotFoundComponent },
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
