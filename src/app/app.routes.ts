import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'auth/signup',
    loadComponent: () => import('./user/register-page/register-page').then((m) => m.RegisterPage),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./user/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'auth/verify-email',
    loadComponent: () => import('./user/verify-email-page/verify-email-page').then((m) => m.VerifyEmailPage),
  },
];
