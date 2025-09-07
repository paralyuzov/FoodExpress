import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../app/core/services/auth.service';
import { AuthActions } from './auth.actions';

export const authEffects = {
  login: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(AuthActions.login),
        switchMap(({ email, password }) =>
          authService.login(email, password).pipe(
            map((response) => {
              localStorage.setItem('access_token', response.access_token);
              return AuthActions.loginSuccess({ user: response.user });
            }),
            catchError((error) =>
              of(
                AuthActions.loginFailure({
                  error: error.error?.message || error.message || 'Login failed',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),

  register: createEffect(
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
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
              return AuthActions.registerSuccess({ message: response.message });
            }),
            catchError((error) => {
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
    (actions$ = inject(Actions), authService = inject(AuthService)) => {
      return actions$.pipe(
        ofType(AuthActions.verifyEmail),
        switchMap(({ token }) =>
          authService.verifyEmail(token).pipe(
            map((response) => {
              return AuthActions.verifyEmailSuccess({ message: response.message });
            }),
            catchError((error) =>
              of(
                AuthActions.verifyEmailFailure({
                  error: error.error?.message || error.message || 'Email verification failed',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),

  logout: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(AuthActions.logout),
        map(() => {
          localStorage.removeItem('access_token');
          return { type: 'NO_ACTION' };
        })
      );
    },
    { functional: true }
  ),
};
