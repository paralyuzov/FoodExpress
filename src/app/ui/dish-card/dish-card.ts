import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Dish } from '../../../models';
import { Store } from '@ngrx/store';
import { cartAction } from '../../../store/cart/cart.actions';


@Component({
  selector: 'app-dish-card',
  imports: [DecimalPipe,],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.css',
  providers: [],
})
export class DishCard {
  dish = input.required<Dish>();
  private store = inject(Store);

  addToCart(dish: Dish) {
    this.store.dispatch(cartAction.addItemToCart({dish}));
  }
}
