import { User } from './User.model';
import type { Restaurant } from './Restaurant.model';
import type { Address } from './Address.model';
import type { Dish } from './Menu.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  id: string;
  customerId: string;
  restaurantId: string;
  addressId: string;
  status: OrderStatus;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  notes?: string;
  estimatedTime?: number; 
  createdAt: Date;
  updatedAt: Date;
  customer?: User;
  restaurant?: Restaurant;
  address?: Address;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  dishId: string;
  quantity: number;
  price: number;
  notes?: string;
  order?: Order;
  dish?: Dish;
}
