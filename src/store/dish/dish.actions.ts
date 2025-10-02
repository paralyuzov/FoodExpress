import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dish } from '../../models';

export const dishActions = createActionGroup({
  source: 'Dishes',
  events: {
    'Rate Dish': props<{ dishId: string; rating: number }>(),
    'Rate Dish Success': props<{ message: string }>(),
    'Rate Dish Failure': props<{ error: string }>(),
    'Load Most Popular Dishes': props<{ limit?: number }>(),
    'Load Most Popular Dishes Success': props<{ dishes: Dish[] }>(),
    'Load Most Popular Dishes Failure': props<{ error: string }>(),
    'Get All Dishes': emptyProps(),
    'Get All Dishes Success': props<{ dishes: Dish[] }>(),
    'Get All Dishes Failure': props<{ error: string }>(),
    'Get Dish By Id': props<{ dishId: string }>(),
    'Get Dish By Id Success': props<{ dish: Dish }>(),
    'Get Dish By Id Failure': props<{ error: string }>(),
    'Set Search Term': props<{ searchTerm: string }>(),
    'Set Selected Category': props<{ category: string }>(),
    'Clear Filters': emptyProps(),
    'Create Dish': props<{ menuId: string; dish: Partial<Dish> }>(),
    'Create Dish Success': props<{ dish: Dish }>(),
    'Create Dish Failure': props<{ error: string }>(),
    'Delete Dish': props<{ dishId: string }>(),
    'Delete Dish Success': props<{ dish: Dish }>(),
    'Delete Dish Failure': props<{ error: string }>(),
    'Update Dish': props<{ dishId: string; menuId: string; dish: Partial<Dish> }>(),
    'Update Dish Success': props<{ dish: Dish }>(),
    'Update Dish Failure': props<{ error: string }>(),
  },
});
