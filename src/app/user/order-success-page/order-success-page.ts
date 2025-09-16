import { Component, inject, effect } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { orderActions } from '../../../store/orders/order.actions';
import {
  selectConfirmedOrder,
  selectOrderError,
  selectOrderLoading,
  selectOrderMessage,
} from '../../../store/orders/order.selectors';
import { cartAction } from '../../../store/cart/cart.actions';

@Component({
  selector: 'app-order-success-page',
  imports: [RouterModule],
  templateUrl: './order-success-page.html',
  styleUrl: './order-success-page.css',
})
export class OrderSuccessPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private store = inject(Store);
  orderMessage = this.store.selectSignal(selectOrderMessage);
  orderError = this.store.selectSignal(selectOrderError);
  confirmedOrder = this.store.selectSignal(selectConfirmedOrder);
  loading = this.store.selectSignal(selectOrderLoading);

  constructor() {
    const session_id = this.activatedRoute.snapshot.queryParamMap.get('session_id');
    if (session_id) {
      this.store.dispatch(orderActions.confirmPayment({ session_id }));
    }
  }

  private clearCartEffect = effect(() => {
    const order = this.confirmedOrder();
    if (order) {
      this.store.dispatch(cartAction.clearCart());
    }
  });
}
