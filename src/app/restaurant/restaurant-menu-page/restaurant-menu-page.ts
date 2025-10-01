import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectRestaurantError,
  selectRestaurantLoading,
  selectRestaurantMessage,
  selectSelectedRestaurant,
} from '../../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';
import { DishCard } from '../../ui/dish-card/dish-card';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { selectDishMessage } from '../../../store/dish/dish.selectors';

@Component({
  selector: 'app-restaurant-menu-page',
  imports: [DecimalPipe, DishCard, RatingModule, FormsModule],
  templateUrl: './restaurant-menu-page.html',
  styleUrl: './restaurant-menu-page.css'
})
export class RestaurantMenuPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);

  isAuth = this.store.selectSignal(selectIsAuthenticated);
  restaurant = this.store.selectSignal(selectSelectedRestaurant);
  isLoading = this.store.selectSignal(selectRestaurantLoading);
  error = this.store.selectSignal(selectRestaurantError);
  message = this.store.selectSignal(selectRestaurantMessage);
  dishMessage = this.store.selectSignal(selectDishMessage);
  rateValue = signal<number>(0);
  messageService = inject(MessageService);

  private readonly messageEffect = effect(() => {
    const message = this.message();
    if (message) {
      this.messageService.add({
        severity: 'info',
        summary: 'Info',
        detail: `${message}`,
        life: 5000,
      });
    }
  });

  private readonly dishMessageEffect = effect(() => {
    const dishMessage = this.dishMessage();
    if (dishMessage) {
      this.messageService.add({
        severity: 'info',
        summary: 'Success',
        detail: `${dishMessage}`,
        life: 5000,
      });
    }
  });

  ngOnInit() {
    const restaurantId = this.activatedRoute.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.store.dispatch(restaurantAction.loadSelectedRestaurantDetails({ id: restaurantId }));
    }
  }

  onRate(event: RatingRateEvent) {
    const value = event.value;
    if (value > 0 && value <= 5) {
      this.rateValue.set(value);
      const restaurantId = this.restaurant()?.id;
      if (restaurantId) {
        this.store.dispatch(
          restaurantAction.rateRestaurant({ rating: this.rateValue(), restaurantId })
        );
      }
    }
  }
}
