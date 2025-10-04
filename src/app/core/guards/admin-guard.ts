import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, take } from 'rxjs';
import { userActions } from '../../../store/user/user.actions';

export const adminGuard: CanActivateFn = (route, state) => {
const actions$ = inject(Actions);
const store = inject(Store);
const router = inject(Router);

store.dispatch(userActions.loadProfile());

return actions$.pipe(
  ofType(userActions.loadProfileSuccess, userActions.loadProfileFailure),
  take(1),
  map(action => {
    if (action.type === userActions.loadProfileSuccess.type && action.user.role === 'ADMIN') {
      return true;
    }
    return router.createUrlTree(['/auth/login']);
  })
);
};
