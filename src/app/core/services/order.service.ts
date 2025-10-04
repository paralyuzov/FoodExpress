import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmPaymentResponse, Order, OrderCheckoutResponse, OrderStatus } from '../../../models';
import { CreateOrderRequest } from '../../../models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly API_URL = `${this.config.baseApiUrl}/orders`;

  createOrder(order: CreateOrderRequest) {
    return this.http.post<OrderCheckoutResponse>(`${this.API_URL}/checkout`, order);
  }

  confirmOrderPayment(sessionId: string) {
    return this.http.post<ConfirmPaymentResponse>(`${this.API_URL}/confirm-payment`, { sessionId });
  }

  getUserOrders() {
    return this.http.get<Order[]>(`${this.API_URL}/user-orders`);
  }

  getOrdersByStatus(status?: OrderStatus) {
    const url = status ? `${this.API_URL}/all?status=${status}` : `${this.API_URL}/all`;
    return this.http.get<Order[]>(url);
  }

  updateOrderStatus(orderId: string, status: OrderStatus) {
    return this.http.patch<Order>(`${this.API_URL}/update-status/${orderId}`, { status });
  }
}
