import { createReducer, on } from '@ngrx/store';
import type { Restaurant } from '../../models/index';
import { restaurantAction } from './restaurant.actions';

export interface RestaurantState {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  loading: boolean;
  error: string | null;
}

export const initialRestaurantState: RestaurantState = {
  restaurants: [],
  selectedRestaurant: null,
  loading: false,
  error: null,
};

export const restaurantReducer = createReducer(
  initialRestaurantState,
  on(restaurantAction.loadRestaurants, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(restaurantAction.loadRestaurantsSuccess, (state, { restaurants }) => ({
    ...state,
    loading: false,
    restaurants,
  })),
  on(restaurantAction.loadRestaurantsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(restaurantAction.loadSelectedRestaurantDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(restaurantAction.loadSelectedRestaurantDetailsSuccess, (state, { restaurant }) => ({
    ...state,
    loading: false,
    selectedRestaurant: restaurant,
  })),
  on(restaurantAction.loadSelectedRestaurantDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
