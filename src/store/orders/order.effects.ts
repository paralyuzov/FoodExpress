import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../app/core/services/order.service';
import { inject } from '@angular/core';
import { orderActions } from './order.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

export const ordersEffects = {
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
            catchError((error) =>
              of(orderActions.createOrderFailure({ error: error.error.message }))
            )
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
            catchError((error) =>
              of(orderActions.confirmPaymentFailure({ error: error.error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
  getUserOrders: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService)) => {
      return actions$.pipe(
        ofType(orderActions.getUserOrders),
        switchMap(() =>
          orderService.getUserOrders().pipe(
            map((orders) => {
              return orderActions.getUserOrdersSuccess({ orders });
            }),
            catchError((error) =>
              of(orderActions.getUserOrdersFailure({ error: error.error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
  getAllOrders: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService)) => {
      return actions$.pipe(
        ofType(orderActions.getAllOrders),
        switchMap(({ status }) =>
          orderService.getOrdersByStatus(status).pipe(
            map((orders) => {
              return orderActions.getAllOrdersSuccess({ orders });
            }),
            catchError((error) =>
              of(orderActions.getAllOrdersFailure({ error: error.error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
  getOrdersByStatus: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService)) => {
      return actions$.pipe(
        ofType(orderActions.getOrdersByStatus),
        switchMap(({ status }) =>
          orderService.getOrdersByStatus(status).pipe(
            map((orders) => {
              return orderActions.getOrdersByStatusSuccess({ orders });
            }),
            catchError((error) =>
              of(orderActions.getOrdersByStatusFailure({ error: error.error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
  updateOrderStatus: createEffect(
    (actions$ = inject(Actions), orderService = inject(OrderService), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(orderActions.updateOrderStatus),
        switchMap(({ orderId, status }) =>
          orderService.updateOrderStatus(orderId, status).pipe(
            map((order) => {
              messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Order status updated successfully',
              });
              return orderActions.updateOrderStatusSuccess({ order });
            }),
            catchError((error) =>
              of(orderActions.updateOrderStatusFailure({ error: error.error.message }))
            )
          )
        )
      );
    },
    { functional: true }
  ),
};
