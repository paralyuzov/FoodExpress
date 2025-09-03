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
            catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
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

  // Add more effects here like register, resetPassword, etc.
  // register: createEffect(...),
  // resetPassword: createEffect(...),
};
