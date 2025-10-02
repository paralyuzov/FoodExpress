import { User } from './User.model';
import type { Restaurant } from './Restaurant.model';
import type { OrderItem } from './Order.model';

export interface Menu {
  id: string;
  restaurantId: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  restaurant?: Restaurant;
  dishes?: Dish[];
}

export interface Dish {
  id: string;
  menuId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  avgRating?: number;
  menu?: Menu;
  orderItems?: OrderItem[];
  ratings?: DishRating[];
  category: string;
  restaurantId?: string; // Added to match backend response
}

export interface DishRating {
  id: string;
  userId: string;
  dishId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  dish?: Dish;
}
