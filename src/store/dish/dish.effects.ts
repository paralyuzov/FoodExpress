import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DishService } from '../../app/core/services/dish.service';
import { dishActions } from './dish.actions';
import { catchError, map, of, switchMap } from 'rxjs';

export const dishEffects = {
  rateDish: createEffect(
    (actions$ = inject(Actions), dishService = inject(DishService)) => {
      return actions$.pipe(
        ofType(dishActions.rateDish),
        switchMap(({ dishId, rating }) =>
          dishService.rateDish(dishId, rating).pipe(
            map((response) => dishActions.rateDishSuccess({ message: response.message })),
            catchError((error) => of(dishActions.rateDishFailure({ error: error.error.message })))
          )
        )
      );
    },
    { functional: true }
  ),
};
