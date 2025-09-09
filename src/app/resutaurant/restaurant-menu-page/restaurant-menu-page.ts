import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectRestaurantError,
  selectRestaurantLoading,
  selectSelectedRestaurant,
} from '../../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';
import { DishCard } from "../../ui/dish-card/dish-card";

@Component({
  selector: 'app-restaurant-menu-page',
  imports: [DecimalPipe, DishCard],
  templateUrl: './restaurant-menu-page.html',
  styleUrl: './restaurant-menu-page.css',
})
export class RestaurantMenuPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  restaurant = this.store.selectSignal(selectSelectedRestaurant);
  isLoading = this.store.selectSignal(selectRestaurantLoading);
  error = this.store.selectSignal(selectRestaurantError);

  ngOnInit() {
    const restaurantId = this.activatedRoute.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.store.dispatch(
        restaurantAction.loadSelectedRestaurantDetails({ id: restaurantId })
      );
    }
  }
}
