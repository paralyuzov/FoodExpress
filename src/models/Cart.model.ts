import type { Dish } from './Menu.model';
export interface CartItem {
  dish: Dish;
  quantity: number;
  totalPrice: number;
}
