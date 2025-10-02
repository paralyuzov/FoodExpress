import { createReducer, on } from '@ngrx/store';
import { Dish } from '../../models';
import { dishActions } from './dish.actions';

export interface DishState {
  dishes: Dish[];
  selectedDish: Dish | null;
  loading: boolean;
  error: string | null;
  message: string | null;
  searchTerm: string;
  selectedCategory: string;
}

export const initialDishState: DishState = {
  dishes: [],
  selectedDish: null,
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
  })),
  on(dishActions.createDish, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(dishActions.createDishSuccess, (state, { dish }) => ({
    ...state,
    loading: false,
    dishes: [...state.dishes, dish],
    message: 'Dish created successfully',
  })),
  on(dishActions.createDishFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(dishActions.deleteDish, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(dishActions.deleteDishSuccess, (state, { dish }) => ({
    ...state,
    loading: false,
    dishes: state.dishes.filter((d) => d.id !== dish.id),
    message: 'Dish deleted successfully',
  })),
  on(dishActions.deleteDishFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(dishActions.updateDish, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(dishActions.updateDishSuccess, (state, { dish }) => ({
    ...state,
    loading: false,
    dishes: state.dishes.map((d) => (d.id === dish.id ? dish : d)),
    message: 'Dish updated successfully',
  })),
  on(dishActions.updateDishFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(dishActions.getDishById, (state) => ({
    ...state,
    loading: true,
    error: null,
    selectedDish: null,
  })),
  on(dishActions.getDishByIdSuccess, (state, { dish }) => ({
    ...state,
    loading: false,
    selectedDish: dish,
  })),
  on(dishActions.getDishByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })) 
);
