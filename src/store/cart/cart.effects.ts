import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { cartAction } from './cart.actions';
import { tap, withLatestFrom, map } from 'rxjs';
import { selectCartState } from './cart.selectors';
import { AuthActions } from '../auth/auth.actions';

const CART_STORAGE_KEY = 'food_delivery_cart';

export const cartEffects = {
  persistCart: createEffect(
    (actions$ = inject(Actions), store = inject(Store)) => {
      return actions$.pipe(
        ofType(
          cartAction.addItemToCart,
          cartAction.removeItemFromCart,
          cartAction.updateItemQuantity,
          cartAction.clearCart
        ),
        withLatestFrom(store.select(selectCartState)),
        tap(([, cartState]) => {
          try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
          } catch (error) {
            console.warn('Failed to save cart to localStorage:', error);
          }
        })
      );
    },
    { functional: true, dispatch: false }
  ),

  showAddToCartToast: createEffect(
    (actions$ = inject(Actions), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(cartAction.addItemToCart),
        tap(({ dish, quantity = 1 }) => {
          messageService.add({
            key: 'cart-toast',
            severity: 'success',
            sticky: false,
            life: 3000,
            data: {
              dish,
              quantity,
            },
          });
        })
      );
    },
    { functional: true, dispatch: false }
  ),

  loadPersistedCart: createEffect(
    (actions$ = inject(Actions)) => {
      return actions$.pipe(
        ofType(cartAction.loadPersistedCart, AuthActions.initApp),
        map(() => {
          try {
            const savedCart = localStorage.getItem(CART_STORAGE_KEY);
            if (savedCart) {
              const cartState = JSON.parse(savedCart);
              return cartAction.restoreCartState({ cartState });
            }
            return { type: 'NO_ACTION' };
          } catch (error) {
            console.warn('Failed to load cart from localStorage:', error);
            return { type: 'NO_ACTION' };
          }
        })
      );
    },
    { functional: true }
  ),
};
