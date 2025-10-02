import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DishState } from './dish.reducer';

export const selectDishes = createFeatureSelector<DishState>('dish');

export const selectDishMessage = createSelector(selectDishes, (state) => state.message);

export const selectDishesLoading = createSelector(selectDishes, (state) => state.loading);

export const selectDishesError = createSelector(selectDishes, (state) => state.error);

export const selectAllDishes = createSelector(selectDishes, (state) => state.dishes);

export const selectSelectedDish = createSelector(selectDishes, (state) => state.selectedDish);

export const selectSearchTerm = createSelector(selectDishes, (state) => state.searchTerm);

export const selectSelectedCategory = createSelector(
  selectDishes,
  (state) => state.selectedCategory
);

export const selectCategories = createSelector(selectAllDishes, (dishes) => {
  const uniqueCategories = [...new Set(dishes.map((dish) => dish.category))];
  return uniqueCategories.sort();
});

export const selectFilteredDishes = createSelector(
  selectAllDishes,
  selectSearchTerm,
  selectSelectedCategory,
  (dishes, searchTerm, selectedCategory) => {
    let filtered = dishes;

    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (dish) =>
          dish.name.toLowerCase().includes(search) ||
          dish.description?.toLowerCase().includes(search) ||
          dish.category.toLowerCase().includes(search)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((dish) => dish.category === selectedCategory);
    }

    return filtered;
  }
);

export const selectDishesByCategory = createSelector(selectFilteredDishes, (dishes) => {
  return dishes.reduce((acc, dish) => {
    if (!acc[dish.category]) {
      acc[dish.category] = [];
    }
    acc[dish.category].push(dish);
    return acc;
  }, {} as Record<string, typeof dishes>);
});

export const selectCategoriesWithDishes = createSelector(selectDishesByCategory, (grouped) => {
  return Object.keys(grouped).map((category) => ({
    name: category,
    dishes: grouped[category],
  }));
});

export const selectCategoryCount = createSelector(
  selectAllDishes,
  (dishes) => (category: string) => {
    return dishes.filter((dish) => dish.category === category).length;
  }
);

export const selectDishById = createSelector(
  selectAllDishes,
  (dishes) => (id: string) => {
    return dishes.find((dish) => dish.id === id) || null;
  }
);

