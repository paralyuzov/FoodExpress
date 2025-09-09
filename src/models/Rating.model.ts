import { User } from './User.model';
import type { Restaurant } from './Restaurant.model';

export interface RestaurantRating {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  restaurant?: Restaurant;
}
