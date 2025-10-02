import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DishService } from '../../app/core/services/dish.service';
import { dishActions } from './dish.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  loadMostPopularDishes: createEffect(
    (actions$ = inject(Actions), dishService = inject(DishService)) => {
      return actions$.pipe(
        ofType(dishActions.loadMostPopularDishes),
        switchMap(({ limit }) =>
          dishService.getMostPopularDishes(limit).pipe(
            map((dishes) => dishActions.loadMostPopularDishesSuccess({ dishes })),
            catchError((error) =>
              of(
                dishActions.loadMostPopularDishesFailure({
                  error: error.error?.message || 'Failed to load popular dishes',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  loadAllDishes: createEffect(
    (actions$ = inject(Actions), dishService = inject(DishService)) => {
      return actions$.pipe(
        ofType(dishActions.getAllDishes),
        switchMap(() =>
          dishService.getAllDishes().pipe(
            map((dishes) => dishActions.getAllDishesSuccess({ dishes })),
            catchError((error) =>
              of(
                dishActions.getAllDishesFailure({
                  error: error.error?.message || 'Failed to load all dishes',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  getDishById: createEffect(
    (actions$ = inject(Actions), dishService = inject(DishService)) => {
      return actions$.pipe(
        ofType(dishActions.getDishById),
        switchMap(({ dishId }) =>
          dishService.getDishById(dishId).pipe(
            map((dish) => dishActions.getDishByIdSuccess({ dish })),
            catchError((error) =>
              of(
                dishActions.getDishByIdFailure({
                  error: error.error?.message || 'Failed to load dish',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  createDish: createEffect(
    (
      actions$ = inject(Actions),
      dishService = inject(DishService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(dishActions.createDish),
        switchMap(({ menuId, dish }) =>
          dishService.createDish(menuId, dish).pipe(
            map((createdDish) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Dish created successfully',
              });
              return dishActions.createDishSuccess({ dish: createdDish });
            }),
            catchError((error) =>
              of(
                dishActions.createDishFailure({
                  error: error.error?.message || 'Failed to create dish',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  deleteDish: createEffect(
    (
      actions$ = inject(Actions),
      dishService = inject(DishService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(dishActions.deleteDish),
        switchMap(({ dishId }) =>
          dishService.deleteDish(dishId).pipe(
            map((deletedDish) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Dish deleted successfully',
              });
              return dishActions.deleteDishSuccess({ dish: deletedDish });
            }),
            catchError((error) =>
              of(
                dishActions.deleteDishFailure({
                  error: error.error?.message || 'Failed to delete dish',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  updateDish: createEffect(
    (
      actions$ = inject(Actions),
      dishService = inject(DishService),
      messageService = inject(MessageService)
    ) => {
      return actions$.pipe(
        ofType(dishActions.updateDish),
        switchMap(({ menuId, dishId, dish }) =>
          dishService.updateDish(menuId, dishId, dish).pipe(
            map((updatedDish) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Dish updated successfully',
              });
              return dishActions.updateDishSuccess({ dish: updatedDish });
            }),
            catchError((error) =>
              of(
                dishActions.updateDishFailure({
                  error: error.error?.message || 'Failed to update dish',
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
