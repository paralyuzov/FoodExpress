import { Routes } from '@angular/router';
import { Home } from './home/home';
import { adminGuard } from './core/guards/admin-guard';

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
    loadComponent: () =>
      import('./user/verify-email-page/verify-email-page').then((m) => m.VerifyEmailPage),
  },
  {
    path: 'auth/reset-password',
    loadComponent: () =>
      import('./user/reset-password-page/reset-password-page').then((m) => m.ResetPasswordPage),
  },
  {
    path: 'restaurants',
    loadComponent: () =>
      import('./restaurant/restaurant-page/restaurant-page').then((m) => m.RestaurantPage),
  },
  {
    path: 'restaurants/:id',
    loadComponent: () =>
      import('./restaurant/restaurant-menu-page/restaurant-menu-page').then(
        (m) => m.RestaurantMenuPage
      ),
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./user/order-success-page/order-success-page').then((m) => m.OrderSuccessPage),
  },
  {
    path: 'profile',
    loadComponent: () => import('./user/profile-page/profile-page').then((m) => m.ProfilePage),
  },
  {
    path: 'categories',
    loadComponent: () => import('./categories/categories').then((m) => m.Categories),
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./admin/admin-dashboard/admin-dashboard').then((m) => m.AdminDashboard),
      },
      {
        path: 'orders',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./admin/admin-orders-table/admin-orders-table').then((m) => m.AdminOrdersTable),
      },
      {
        path: 'restaurants',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./admin/admin-restaurant-table/admin-restaurant-table').then(
            (m) => m.AdminRestaurantTable
          ),
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./admin/admin-users-table/admin-users-table').then((m) => m.AdminUsersTable),
      },
    ],
    loadComponent: () => import('./admin/admin').then((m) => m.Admin),
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found').then((m) => m.NotFound),
  }
];
