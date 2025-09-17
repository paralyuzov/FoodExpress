import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DishState } from "./dish.reducer";

export const selectDishes = createFeatureSelector<DishState>('dish');

export const selectDishMessage = createSelector(
    selectDishes,
    (state) => state.message
);
