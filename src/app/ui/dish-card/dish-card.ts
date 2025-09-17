import { Component, effect, inject, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Dish } from '../../../models';
import { Store } from '@ngrx/store';
import { cartAction } from '../../../store/cart/cart.actions';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { dishActions } from '../../../store/dish/dish.actions';


@Component({
  selector: 'app-dish-card',
  imports: [DecimalPipe, RatingModule, FormsModule],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.css',
})
export class DishCard {
  dish = input.required<Dish>();
  private store = inject(Store);
  rateValue = signal<number>(0);
  isAuth = this.store.selectSignal(selectIsAuthenticated);

  addToCart(dish: Dish) {
    this.store.dispatch(cartAction.addItemToCart({dish}));
  }


  onRate(event: RatingRateEvent, dishId: string) {
    const value = event.value;
    if (value > 0 && value <= 5) {
      this.rateValue.set(value);
      this.store.dispatch(dishActions.rateDish({ dishId, rating: value }));
    }
  }
}
