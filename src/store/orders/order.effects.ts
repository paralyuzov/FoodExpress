import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "../../app/core/services/order.service";
import { inject } from "@angular/core";
import { orderActions } from "./order.actions";
import { catchError, map, of, switchMap } from "rxjs";


export const ordersEffects  = {
 createOrder: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService)) => {
      return actions$.pipe(
        ofType(orderActions.createOrder),
        switchMap(({ order }) =>
          orderService.createOrder(order).pipe(
            map((response) => {
              return orderActions.createOrderSuccess({
                message: response.message,
                checkoutUrl: response.checkoutUrl,
              });
            }),
            catchError((error) => of(orderActions.createOrderFailure({ error: error.error.message })))
          )
        )
      );
    },
    { functional: true }
  ),
  confirmPayment: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService)) => {
      return actions$.pipe(
        ofType(orderActions.confirmPayment),
        switchMap(({ session_id }) =>
          orderService.confirmOrderPayment(session_id).pipe(
            map((order) => {
              return orderActions.confirmPaymentSuccess({ order });
            }),
            catchError((error) => of(orderActions.confirmPaymentFailure({ error: error.error.message  })))
          )
        )
      );
    },
    { functional: true }
  ),
}
