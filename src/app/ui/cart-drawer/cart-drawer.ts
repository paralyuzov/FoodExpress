import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { DrawerModule } from 'primeng/drawer';
import { InputNumber } from 'primeng/inputnumber';
import {
  selectCartDeliveryFee,
  selectCartItems,
  selectCartSubtotal,
  selectCartTax,
  selectCartTotal,
  selectIsCartEmpty,
} from '../../../store/cart/cart.selectors';
import { cartAction } from '../../../store/cart/cart.actions';
import { DecimalPipe } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CheckoutForm } from '../../user/checkout-form/checkout-form';
import { orderActions } from '../../../store/orders/order.actions';
import { Router } from '@angular/router';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';

@Component({
  selector: 'app-cart-drawer',
  imports: [DrawerModule, InputNumber, FormsModule, DecimalPipe],
  templateUrl: './cart-drawer.html',
  styleUrl: './cart-drawer.css',
  providers: [DialogService],
})
export class CartDrawer {
  visible = input.required<boolean>();
  visibleChange = output<boolean>();
  private store = inject(Store);
  private dialogService = inject(DialogService);
  private dialogRef: DynamicDialogRef | undefined;
  private router = inject(Router);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  cartItems = this.store.selectSignal(selectCartItems);
  cartTotal = this.store.selectSignal(selectCartTotal);
  isCartEmpty = this.store.selectSignal(selectIsCartEmpty);
  cartTax = this.store.selectSignal(selectCartTax);
  cartSubTotal = this.store.selectSignal(selectCartSubtotal);
  cartDeliveryFee = this.store.selectSignal(selectCartDeliveryFee);

  onHide() {
    this.visibleChange.emit(false);
  }

  updateQuantity(dishId: string, quantity: number) {
    this.store.dispatch(cartAction.updateItemQuantity({ dishId, quantity }));
  }

  removeItem(dishId: string) {
    this.store.dispatch(cartAction.removeItemFromCart({ dishId }));
  }

  showAddressForm() {
    if(!this.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      this.visibleChange.emit(false);
      return;
    }
    this.store.dispatch(orderActions.clearOrderError());
    this.dialogRef = this.dialogService.open(CheckoutForm, {
      styleClass: 'bg-gradient-to-br! from-neutral-900! via-neutral-800! to-neutral-900!',
    });
  }

  onRestaurantMenu() {
    this.router.navigate(['/restaurants']);
    this.visibleChange.emit(false);
  }
}
