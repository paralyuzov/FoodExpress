import { User } from './User.model';
import type { Restaurant } from './Restaurant.model';
import type { Address } from './Address.model';
import type { Dish } from './Menu.model';
import type { CartItem } from './Cart.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
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

export interface CreateOrderRequest {
  addressId: string;
  items: CartItem[];
}


export interface OrderCheckoutResponse {
  success: boolean;
  message: string;
  checkoutUrl: string;
  sessionId: string;
  orderPreview: OrderPreview;
}

export interface OrderPreview {
  items: OrderPreviewItem[];
  deliveryFee: string;
  tax: string;
  total: string;
  restaurantName: string;
  itemCount: number;
}

export interface OrderPreviewItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ConfirmPaymentResponse {
  success: boolean;
  message: string;
  order: ConfirmedOrder;
}

export interface ConfirmedOrder {
  id: string;
  status: OrderStatus;
  subtotal: string;
  deliveryFee: string;
  tax: string;
  total: string;
  estimatedTime: number;
  itemCount: number;
  restaurantName: string;
  sessionId: string;
}
