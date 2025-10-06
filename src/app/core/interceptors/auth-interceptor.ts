import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { AuthActions } from '../../../store/auth/auth.actions';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const store = inject(Store);
  const token = localStorage.getItem('access_token');

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !req.url.includes('auth/refresh')) {
        const refreshToken = localStorage.getItem('x-refresh-token');

        if (refreshToken) {
          return authService.refreshToken().pipe(
            switchMap((response) => {
              localStorage.setItem('access_token', response.access_token);
              localStorage.setItem('x-refresh-token', response.refresh_token);

              const newAuthReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`
                }
              });

              return next(newAuthReq);
            }),
            catchError((refreshError) => {
              store.dispatch(AuthActions.logout());

              return throwError(() => refreshError);
            })
          );
        } else {
          store.dispatch(AuthActions.logout());
        }
      }
      return throwError(() => error);
    })
  );
};
