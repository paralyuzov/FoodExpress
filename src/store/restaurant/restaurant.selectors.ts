import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RestaurantState } from './restaurant.reducers';

export const selectRestaurantState = createFeatureSelector<RestaurantState>('restaurant');

export const selectAllRestaurants = createSelector(
  selectRestaurantState,
  (state) => state.restaurants
);
export const selectRestaurantLoading = createSelector(
  selectRestaurantState,
  (state) => state.loading
);
export const selectRestaurantError = createSelector(selectRestaurantState, (state) => state.error);

export const selectSelectedRestaurant = createSelector(
  selectRestaurantState,
  (state) => state.selectedRestaurant
);
