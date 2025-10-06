import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../app/core/services/auth.service';
import { AuthActions } from './auth.actions';
import { userActions } from '../user/user.actions';
import { MessageService } from 'primeng/api';

export const authEffects = {
  login: createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(AuthActions.login),
        switchMap(({ email, password }) =>
          authService.login(email, password).pipe(
            map((response) => {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('x-refresh-token', response.refresh_token);
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Login successful!',
              });
              return AuthActions.loginSuccess({ user: response.user });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Login Failed',
                detail: error.error?.message || error.message || 'Login failed',
              });
              return of(
                AuthActions.loginFailure({
                  error: error.error?.message || error.message || 'Login failed',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),

  register: createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(AuthActions.register),
        switchMap((action) => {
          const registerData = {
            email: action.email,
            password: action.password,
            confirmPassword: action.confirmPassword,
            firstName: action.firstName,
            lastName: action.lastName,
            phone: action.phone,
          };

          return authService.register(registerData).pipe(
            map((response) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Registration successful!',
              });
              return AuthActions.registerSuccess({ message: response.message });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Registration Failed',
                detail: error.error?.message || error.message || 'Registration failed',
              });
              return of(
                AuthActions.registerFailure({
                  error: error.error?.message || error.message || 'Registration failed',
                })
              );
            })
          );
        })
      );
    },
    { functional: true }
  ),

  veryifyEmail: createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(AuthActions.verifyEmail),
        switchMap(({ token }) =>
          authService.verifyEmail(token).pipe(
            map((response) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Email verified successfully!',
              });
              return AuthActions.verifyEmailSuccess({ message: response.message });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Verification Failed',
                detail: error.error?.message || error.message || 'Email verification failed',
              });
              return of(
                AuthActions.verifyEmailFailure({
                  error: error.error?.message || error.message || 'Email verification failed',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),

  logout: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(AuthActions.logout),
        switchMap(() => authService.logout()),
        map((response) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('x-refresh-token');
          messageService.add({
            severity: 'info',
            summary: 'Logged Out',
            detail: `${response.message}` || 'You have been logged out successfully',
          });
          return AuthActions.logoutSuccess({ message: response.message });
        }),
        catchError((error) => {
          messageService.add({
            severity: 'error',
            summary: 'Logout Failed',
            detail: error.error?.message || error.message || 'Logout failed',
          });
          return of(AuthActions.logoutFailure({ error: error.error?.message || error.message || 'Logout failed' }));
        })
      );
    },
    { functional: true }
  ),

  verifyUser: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(AuthActions.verifyUser),
        switchMap(() =>
          authService.verifyUser().pipe(
            map((response) => {
              return AuthActions.verifyUserSuccess({ user: response });
            }),
            catchError((error) =>
              of(
                AuthActions.verifyUserFailure({
                  error: error.error?.message || error.message || 'User verification failed',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),

  autoVerifyUser: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(AuthActions.initApp),
        switchMap(() => {
          const token = localStorage.getItem('access_token');
          if (token) {
            return authService.verifyUser().pipe(
              map((response) => AuthActions.verifyUserSuccess({ user: response })),
              catchError(() => {
                localStorage.removeItem('access_token');
                return of(AuthActions.verifyUserFailure({ error: 'Invalid token' }));
              })
            );
          } else {
            return of({ type: 'NO_ACTION' });
          }
        })
      );
    },
    { functional: true }
  ),

  loadUserAfterLogin: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(AuthActions.loginSuccess),
        map(({ user }) => userActions.setUser({ user }))
      );
    },
    { functional: true }
  ),

  loadUserAfterVerification: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(AuthActions.verifyUserSuccess),
        map(({ user }) => userActions.setUser({ user }))
      );
    },
    { functional: true }
  ),
  clearUserOnLogout: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(AuthActions.logout),
        map(() => userActions.clearUserData())
      );
    },
    { functional: true }
  ),
  changePassword: createEffect(
    (
      actions$ = inject(Actions),
      authService = inject(AuthService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(AuthActions.changePassword),
        switchMap(({ currentPassword, newPassword, confirmNewPassword }) =>
          authService.changePassword(currentPassword, newPassword, confirmNewPassword).pipe(
            map((response) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Password changed successfully. Please login with your new password.',
              });
              return AuthActions.logout();
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Password Change Failed',
                detail: error.error?.message || error.message || 'Failed to change password',
              });
              return of(
                AuthActions.changePasswordFailure({
                  error: error.error?.message || error.message || 'Change password failed',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),
};
