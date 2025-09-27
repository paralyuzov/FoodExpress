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
    // Filter actions
    'Set Search Term': props<{ searchTerm: string }>(),
    'Set Selected Category': props<{ category: string }>(),
    'Clear Filters': emptyProps(),
  },
});
