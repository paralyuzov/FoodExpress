import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RestaurantService } from '../../app/core/restaurant/restaurant.service';
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
};
