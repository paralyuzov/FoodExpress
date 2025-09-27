import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models';
import { dishActions } from './dish.actions';

export interface DishState {
  dishes: Dish[];
  loading: boolean;
  error: string | null;
  message: string | null;
  // Filter state
  searchTerm: string;
  selectedCategory: string;
}

export const initialDishState: DishState = {
  dishes: [],
  loading: false,
  error: null,
  message: null,
  searchTerm: '',
  selectedCategory: 'all',
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
  on(dishActions.loadMostPopularDishes, (state, { limit }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(dishActions.loadMostPopularDishesSuccess, (state, { dishes }) => ({
    ...state,
    loading: false,
    dishes,
  })),
  on(dishActions.loadMostPopularDishesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(dishActions.getAllDishes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(dishActions.getAllDishesSuccess, (state, { dishes }) => ({
    ...state,
    loading: false,
    dishes,
  })),
  on(dishActions.getAllDishesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  // Filter reducers
  on(dishActions.setSearchTerm, (state, { searchTerm }) => ({
    ...state,
    searchTerm,
  })),
  on(dishActions.setSelectedCategory, (state, { category }) => ({
    ...state,
    selectedCategory: category,
  })),
  on(dishActions.clearFilters, (state) => ({
    ...state,
    searchTerm: '',
    selectedCategory: 'all',
  }))
);
