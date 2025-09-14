import { Address } from "./Address.model";
import { DishRating } from "./Menu.model";
import { Order } from "./Order.model";
import { RestaurantRating } from "./Rating.model";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isEmailVerified: boolean;
  role: Role;
  createdAt?: Date;
  updatedAt?: Date;
  addresses: Address[];
  orders: Order[];
  restaurantRatings: RestaurantRating[];
  dishRatings: DishRating[];
}

export type Role = 'ADMIN' | 'CUSTOMER';

export interface UserResponse {
  user: User;
  access_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: Role
}

export interface RegisterResponse {
  message: string;
}
