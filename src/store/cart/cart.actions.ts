import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Dish } from '../../models';
import { CartState } from './cart.reducer';

export const cartAction = createActionGroup({
  source: 'Cart',
  events: {
    'Add Item To Cart': props<{ dish: Dish; quantity?: number }>(),
    'Remove Item From Cart': props<{ dishId: string }>(),
    'Update Item Quantity': props<{ dishId: string; quantity: number }>(),
    'Clear Cart': emptyProps(),
    'Load Cart': emptyProps(),
    'Load Cart Success': props<{ items: Dish[] }>(),
    'Load Cart Failure': props<{ error: string }>(),
    'Load Persisted Cart': emptyProps(),
    'Restore Cart State': props<{ cartState: CartState }>(),
  },
});
