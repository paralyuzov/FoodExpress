import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DishState } from "./dish.reducer";

export const selectDishes = createFeatureSelector<DishState>('dish');

export const selectDishMessage = createSelector(
    selectDishes,
    (state) => state.message
);

export const selectDishesLoading = createSelector(
    selectDishes,
    (state) => state.loading
);

export const selectDishesError = createSelector(
    selectDishes,
    (state) => state.error
);

export const selectAllDishes = createSelector(
    selectDishes,
    (state) => state.dishes
);
