import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models';
import { dishActions } from './dish.actions';

export interface DishState {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const initialDishState: DishState = {
  dishes: [],
  loading: false,
  error: null,
  message: null,
};

export const dishReducer = createReducer(
  initialDishState,
  on(dishActions.rateDish, (state, { dishId, rating }) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(dishActions.rateDishSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),
  on(dishActions.rateDishFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
