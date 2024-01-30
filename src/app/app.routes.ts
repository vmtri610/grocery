import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () =>
      import('./page/sign-in-page/sign-in.routes').then(
        (mod) => mod.SignInRoutes
      ),
  },
  {
    path: 'sign-up',
    loadChildren: () =>
      import('./page/sign-up-page/sign-up-routes').then(
        (mod) => mod.SignUpRoutes
      ),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/landing-page/landing-page.routes').then(
        (mod) => mod.LandingRoutes
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./page/admin-page/admin-page.routes').then(
        (mod) => mod.AdminPageRoutes
      ),
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];
