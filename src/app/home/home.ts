import { Component, inject, OnInit } from '@angular/core';
import { HeroSection } from "../ui/hero-section/hero-section";
import { MainSection } from "../ui/main-section/main-section";
import { Store } from '@ngrx/store';
import { selectAllDishes, selectDishesLoading } from '../../store/dish/dish.selectors';
import { dishActions } from '../../store/dish/dish.actions';
import { selectAllRestaurants, selectRestaurantLoading } from '../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../store/restaurant/restaurant.actions';

@Component({
  selector: 'app-home',
  imports: [ HeroSection, MainSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  private store = inject(Store);

  dishes = this.store.selectSignal(selectAllDishes);
  loadingDishes = this.store.selectSignal(selectDishesLoading);
  restaurants = this.store.selectSignal(selectAllRestaurants);
  loadingRestaurants = this.store.selectSignal(selectRestaurantLoading);

  ngOnInit() {
    this.store.dispatch(dishActions.loadMostPopularDishes({ limit: 10 }));
    this.store.dispatch(restaurantAction.loadMostPopularRestaurants({ limit: 10 }));
  }

}
