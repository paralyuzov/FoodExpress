import { Component, inject, OnInit } from '@angular/core';
import { RestaurantCard } from '../../ui/restaurant-card/restaurant-card';
import { Store } from '@ngrx/store';
import {
  selectAllRestaurants,
  selectRestaurantLoading,
} from '../../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';

@Component({
  selector: 'app-restaurant-page',
  imports: [RestaurantCard],
  templateUrl: './restaurant-page.html',
  styleUrl: './restaurant-page.css',
})
export class RestaurantPage implements OnInit {
  private store = inject(Store);

  isLoading = this.store.selectSignal(selectRestaurantLoading);
  restaurants = this.store.selectSignal(selectAllRestaurants);

  ngOnInit() {
    this.store.dispatch(restaurantAction.loadRestaurants());
  }
}

