import { createActionGroup, emptyProps, props } from '@ngrx/store';
import type { Restaurant } from '../../models/index';

export const restaurantAction = createActionGroup({
  source: 'Restaurant',
  events: {
    'Load Restaurants': emptyProps(),
    'Load Restaurants Success': props<{ restaurants: Restaurant[] }>(),
    'Load Restaurants Failure': props<{ error: string }>(),
    'Select Restaurant': props<{ restaurant: Restaurant }>(),
    'Deselect Restaurant': emptyProps(),
    'Load Selected Restaurant Details': props<{ id: string }>(),
    'Load Selected Restaurant Details Success': props<{ restaurant: Restaurant }>(),
    'Load Selected Restaurant Details Failure': props<{ error: string }>(),
    'Rate Restaurant': props<{ rating: number; restaurantId: string }>(),
    'Rate Restaurant Success': props<{ message: string }>(),
    'Rate Restaurant Failure': props<{ error: string }>(),
    'Load Most Popular Restaurants': props<{ limit?: number }>(),
    'Load Most Popular Restaurants Success': props<{ restaurants: Restaurant[] }>(),
    'Load Most Popular Restaurants Failure': props<{ error: string }>(),
    'Create Restaurant': props<{restaurant: Partial<Restaurant>}>(),
    'Create Restaurant Success': props<{ restaurant: Restaurant }>(),
    'Create Restaurant Failure': props<{ error: string }>(),
    'Update Restaurant': props<{ restaurantId: string; restaurant: Partial<Restaurant> }>(),
    'Update Restaurant Success': props<{ restaurant: Restaurant }>(),
    'Update Restaurant Failure': props<{ error: string }>(),
    'Delete Restaurant': props<{ restaurantId: string }>(),
    'Delete Restaurant Success': props<{ restaurant: Restaurant }>(),
    'Delete Restaurant Failure': props<{ error: string }>(),
  },
});
