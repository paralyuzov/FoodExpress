import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmPaymentResponse, OrderCheckoutResponse } from '../../../models';
import { CreateOrderRequest } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly API_URL = 'http://localhost:3000/orders';

  private http = inject(HttpClient);

  createOrder(order: CreateOrderRequest) {
    return this.http.post<OrderCheckoutResponse>(`${this.API_URL}/checkout`, order);
  }

  confirmOrderPayment(sessionId: string) {
    return this.http.post<ConfirmPaymentResponse>(`${this.API_URL}/confirm-payment`, { sessionId });
  }
}
