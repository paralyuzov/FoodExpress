import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantService } from '../../app/core/services/restaurant.service';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { restaurantAction } from './restaurant.actions';
import { MessageService } from 'primeng/api';
import { menusAction } from '../menus/menus.actions';
import { Store } from '@ngrx/store';
import { dishActions } from '../dish/dish.actions';

export const restaurantEffects = {
  loadRestaurants: createEffect(
    (actions$ = inject(Actions), restaurantService = inject(RestaurantService)) => {
      return actions$.pipe(
        ofType(restaurantAction.loadRestaurants),
        switchMap(() =>
          restaurantService.getRestaurants().pipe(
            map((restaurants) => {
              return restaurantAction.loadRestaurantsSuccess({ restaurants });
            }),
            catchError((error) => of(restaurantAction.loadRestaurantsFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),
  loadRestaurantById: createEffect(
    (actions$ = inject(Actions), restaurantService = inject(RestaurantService)) => {
      return actions$.pipe(
        ofType(restaurantAction.loadSelectedRestaurantDetails),
        switchMap(({ id }) =>
          restaurantService.getRestaurantById(id).pipe(
            map((restaurant) => {
              return restaurantAction.loadSelectedRestaurantDetailsSuccess({ restaurant });
            }),
            catchError((error) =>
              of(restaurantAction.loadSelectedRestaurantDetailsFailure({ error }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
  rateRestaurant: createEffect(
    (actions$ = inject(Actions), restaurantService = inject(RestaurantService)) => {
      return actions$.pipe(
        ofType(restaurantAction.rateRestaurant),
        switchMap(({ rating, restaurantId }) =>
          restaurantService.rateRestaurant(rating, restaurantId).pipe(
            map((response) => {
              return restaurantAction.rateRestaurantSuccess({ message: response.message });
            }),
            catchError((error) => of(restaurantAction.rateRestaurantFailure({ error })))
          )
        )
      );
    },
    { functional: true }
  ),
  loadMostPopularRestaurants: createEffect(
    (actions$ = inject(Actions), restaurantService = inject(RestaurantService)) => {
      return actions$.pipe(
        ofType(restaurantAction.loadMostPopularRestaurants),
        switchMap(({ limit }) =>
          restaurantService.getMostPopularRestaurants(limit).pipe(
            map((restaurants) => {
              return restaurantAction.loadMostPopularRestaurantsSuccess({ restaurants });
            }),
            catchError((error) =>
              of(
                restaurantAction.loadMostPopularRestaurantsFailure({
                  error: error.error?.message || 'Failed to load popular restaurants',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  createRestaurant: createEffect(
    (
      actions$ = inject(Actions),
      restaurantService = inject(RestaurantService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(restaurantAction.createRestaurant),
        switchMap(({ restaurant }) =>
          restaurantService.createRestaurant(restaurant).pipe(
            map((newRestaurant) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Restaurant created successfully',
              });
              return restaurantAction.createRestaurantSuccess({ restaurant: newRestaurant });
            }),
            catchError((error) =>
              of(
                restaurantAction.createRestaurantFailure({
                  error: error.error?.message || 'Failed to create restaurant',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  updateRestaurant: createEffect(
    (
      actions$ = inject(Actions),
      restaurantService = inject(RestaurantService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(restaurantAction.updateRestaurant),
        switchMap(({ restaurantId, restaurant }) =>
          restaurantService.editRestaurant(restaurantId, restaurant).pipe(
            map((updatedRestaurant) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Restaurant updated successfully',
              });
              return restaurantAction.updateRestaurantSuccess({ restaurant: updatedRestaurant });
            }),
            catchError((error) =>
              of(
                restaurantAction.updateRestaurantFailure({
                  error: error.error?.message || 'Failed to update restaurant',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  deleteRestaurant: createEffect(
    (
      actions$ = inject(Actions),
      restaurantService = inject(RestaurantService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(restaurantAction.deleteRestaurant),
        switchMap(({ restaurantId }) =>
          restaurantService.deleteRestaurant(restaurantId).pipe(
            map((deletedRestaurant) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Restaurant deleted successfully',
              });
              return restaurantAction.deleteRestaurantSuccess({ restaurant: deletedRestaurant });
            }),
            catchError((error) =>
              of(
                restaurantAction.deleteRestaurantFailure({
                  error: error.error?.message || 'Failed to delete restaurant',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),

  refreshRestaurantOnMenuChanges: createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      return actions$.pipe(
        ofType(
          menusAction.createMenuSuccess,
          menusAction.deleteMenuSuccess,
          menusAction.updateMenuSuccess
        ),
        tap((action) => {
          const restaurantId = action.menu.restaurantId;
          if (restaurantId) {
            store.dispatch(
              restaurantAction.loadSelectedRestaurantDetails({
                id: restaurantId,
              })
            );
          }
        })
      );
    },
    { functional: true, dispatch: false }
  ),
  refreshRestaurantOnDishChanges: createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      return actions$.pipe(
        ofType(
          dishActions.createDishSuccess,
          dishActions.deleteDishSuccess,
          dishActions.updateDishSuccess
        ),
        tap((action) => {
          const restaurantId = action.dish.restaurantId;
          if (restaurantId) {
            store.dispatch(
              restaurantAction.loadSelectedRestaurantDetails({
                id: restaurantId,
              })
            );
          }
        })
      );
    },
    { functional: true, dispatch: false }
  ),
};
