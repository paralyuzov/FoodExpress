import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, count, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { userActions } from './user.actions';
import { UserService } from '../../app/core/services/user.service';
import { OrderService } from '../../app/core/services/order.service';

export const userEffects = {
  loadProfile: createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
      return actions$.pipe(
        ofType(userActions.loadProfile),
        switchMap(() =>
          userService.getProfile().pipe(
            map((user) => userActions.loadProfileSuccess({ user })),
            catchError((error) =>
              of(
                userActions.loadProfileFailure({
                  error: error.error?.message || 'Failed to load profile',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  createAddress: createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
      return actions$.pipe(
        ofType(userActions.createAddress),
        switchMap(({address}) => {
          const addressData = {
            country: address.country,
            state: address.state,
            city: address.city,
            zipCode: address.zipCode,
            street: address.street,
          };
          return userService.createNewAddress(addressData).pipe(
            map((newAddress) => userActions.createAddressSuccess({ address: newAddress })),
            catchError((error) =>
              of(
                userActions.createAddressFailure({
                  error: error.error?.message || 'Failed to create address',
                })
              )
            )
          );
        })
      );
    },
    { functional: true }
  ),
};
