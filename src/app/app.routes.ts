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
  {
    path: 'restaurants',
    loadComponent: () => import('./resutaurant/restaurant-page/restaurant-page').then((m) => m.RestaurantPage),
  },
  {
    path: 'restaurants/:id',
    loadComponent: () => import('./resutaurant/restaurant-menu-page/restaurant-menu-page').then((m) => m.RestaurantMenuPage),
  },
  {
    path: 'order-success',
    loadComponent: () => import('./user/order-success-page/order-success-page').then((m) => m.OrderSuccessPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/profile-page/profile-page').then((m) => m.ProfilePage),
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories').then((m) => m.Categories)
  },
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin').then((m) => m.Admin)
  }
];
