import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  selectAllDishes,
  selectDishesLoading,
  selectCategories,
  selectFilteredDishes,
  selectCategoriesWithDishes,
  selectSearchTerm,
  selectSelectedCategory
} from '../../store/dish/dish.selectors';
import { dishActions } from '../../store/dish/dish.actions';
import { DishCard } from '../ui/dish-card/dish-card';
import { Dish } from '../../models';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, DishCard, ChipModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  private store = inject(Store);

  dishes = this.store.selectSignal(selectAllDishes);
  loadingDishes = this.store.selectSignal(selectDishesLoading);
  categories = this.store.selectSignal(selectCategories);
  filteredDishes = this.store.selectSignal(selectFilteredDishes);
  categoriesWithDishes = this.store.selectSignal(selectCategoriesWithDishes);
  searchTerm = this.store.selectSignal(selectSearchTerm);
  selectedCategory = this.store.selectSignal(selectSelectedCategory);

  ngOnInit(): void {
    this.store.dispatch(dishActions.getAllDishes());
  }

  onSearchChange(term: string): void {
    this.store.dispatch(dishActions.setSearchTerm({ searchTerm: term }));
  }

  onCategoryChange(category: string): void {
    this.store.dispatch(dishActions.setSelectedCategory({ category }));
  }

  clearFilters(): void {
    this.store.dispatch(dishActions.clearFilters());
  }

  getCategoryCount(category: string): number {
    return this.dishes().filter(dish => dish.category === category).length;
  }
}
