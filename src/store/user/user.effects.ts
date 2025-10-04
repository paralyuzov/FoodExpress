import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, count, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { userActions } from './user.actions';
import { UserService } from '../../app/core/services/user.service';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AuthActions } from '../auth/auth.actions';

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
        switchMap(({ address }) => {
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
  updateAddress: createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
      return actions$.pipe(
        ofType(userActions.updateAddress),
        switchMap(({ addressId, address }) => {
          const addressData = {
            country: address.country,
            state: address.state,
            city: address.city,
            zipCode: address.zipCode,
            street: address.street,
          };
          return userService.updateAddress(addressId, addressData).pipe(
            map((updatedAddress) => userActions.updateAddressSuccess({ address: updatedAddress })),
            catchError((error) =>
              of(
                userActions.updateAddressFailure({
                  error: error.error?.message || 'Failed to update address',
                })
              )
            )
          );
        })
      );
    },
    { functional: true }
  ),
  updateProfile: createEffect(
    (actions$ = inject(Actions), userService = inject(UserService), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(userActions.updateProfile),
        switchMap(({ profile }) => {
          return userService.updateUserProfile(profile).pipe(
            map((updatedUser) => {
              messageService.add({
                severity: 'success',
                summary: 'Profile Updated',
                detail: 'Your profile has been updated successfully.',
                life: 3000,
              });
              return userActions.updateProfileSuccess({ user: updatedUser });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Update Failed',
                detail: error.error?.message || 'Failed to update profile',
                life: 5000,
              });
              return of(
                userActions.updateProfileFailure({
                  error: error.error?.message || 'Failed to update profile',
                })
              );
            })
          );
        })
      );
    },
    { functional: true }
  ),

  // Admin user management effects
  loadAllUsers: createEffect(
    (actions$ = inject(Actions), userService = inject(UserService)) => {
      return actions$.pipe(
        ofType(userActions.loadAllUsers),
        switchMap(() =>
          userService.getAllUsers().pipe(
            map((users) => userActions.loadAllUsersSuccess({ users })),
            catchError((error) =>
              of(
                userActions.loadAllUsersFailure({
                  error: error.error?.message || 'Failed to load users',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),

  updateUserStatus: createEffect(
    (
      actions$ = inject(Actions),
      userService = inject(UserService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(userActions.updateUserStatus),
        switchMap(({ userId, isActive }) =>
          userService.updateUserStatus(userId, isActive).pipe(
            map((user) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User status updated successfully`,
                life: 3000,
              });
              return userActions.updateUserStatusSuccess({ user });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Update Failed',
                detail: error.error?.message || 'Failed to update user status',
                life: 5000,
              });
              return of(
                userActions.updateUserStatusFailure({
                  error: error.error?.message || 'Failed to update user status',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),

  updateUserRole: createEffect(
    (
      actions$ = inject(Actions),
      userService = inject(UserService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(userActions.updateUserRole),
        switchMap(({ userId, role }) =>
          userService.updateUserRole(userId, role).pipe(
            map((user) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: `User role updated to ${role}`,
                life: 3000,
              });
              return userActions.updateUserRoleSuccess({ user });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Update Failed',
                detail: error.error?.message || 'Failed to update user role',
                life: 5000,
              });
              return of(
                userActions.updateUserRoleFailure({
                  error: error.error?.message || 'Failed to update user role',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),

  deleteUser: createEffect(
    (
      actions$ = inject(Actions),
      userService = inject(UserService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(userActions.deleteUser),
        switchMap(({ userId }) =>
          userService.deleteUser(userId).pipe(
            map(() => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'User deleted successfully',
                life: 3000,
              });
              return userActions.deleteUserSuccess({ userId });
            }),
            catchError((error) => {
              messageService.add({
                severity: 'error',
                summary: 'Delete Failed',
                detail: error.error?.message || 'Failed to delete user',
                life: 5000,
              });
              return of(
                userActions.deleteUserFailure({
                  error: error.error?.message || 'Failed to delete user',
                })
              );
            })
          )
        )
      );
    },
    { functional: true }
  ),
  loadUserProfileAfterAutoVerify: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(AuthActions.initApp,AuthActions.verifyUserSuccess,AuthActions.loginSuccess),
        map(() => {
          const hasToken = !!localStorage.getItem('access_token');
          if (hasToken) {
            return userActions.loadProfile();
          }
          return AuthActions.logout();
        })
      );
    },
    { functional: true }
  ),
};
