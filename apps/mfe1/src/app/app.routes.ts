import { Route } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { Path1Component } from '../path1/path1.component';
import { Path2Component } from '../path2/path2.component';
import { Path3Component } from '../path3/path3.component';

export const appRoutes: Route[] = [
    { path: '', redirectTo: 'mfe1', pathMatch: 'full' },
    { path: 'mfe1', loadComponent: () => HomeComponent },
    { path: 'mfe1/path1', loadComponent: () => Path1Component },
    { path: 'mfe1/path2', loadComponent: () => Path2Component },
    { path: 'mfe1/path3', loadComponent: () => Path3Component },
];
