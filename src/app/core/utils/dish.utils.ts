import { Dish } from '../../../models';

export function cleanDishForCartAlt(dish: Dish): Dish {
  const { menu, orderItems, ratings, ...cleanDish } = dish as any;
  return cleanDish as Dish;
}
