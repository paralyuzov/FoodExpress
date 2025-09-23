import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantService } from '../../app/core/services/restaurant.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { restaurantAction } from './restaurant.actions';

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
};
