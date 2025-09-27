import { createReducer, on } from '@ngrx/store';
import { orderActions } from './order.actions';
import { ConfirmedOrder, Order } from '../../models';

export interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  message: string | null;
  checkout_url: string | null;
  confirmedOrder: ConfirmedOrder | null;
}

export const initialOrderState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
  message: null,
  checkout_url: null,
  confirmedOrder: null,
};

export const ordersReducer = createReducer(
  initialOrderState,
  on(orderActions.createOrder, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
    checkout_url: null,
  })),
  on(orderActions.createOrderSuccess, (state, { message, checkoutUrl }) => ({
    ...state,
    loading: false,
    message,
    checkout_url: checkoutUrl,
  })),
  on(orderActions.createOrderFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(orderActions.clearOrderState, () => initialOrderState),
  on(orderActions.confirmPayment, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(orderActions.confirmPaymentSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    error: null,
    message: order.message,
    confirmedOrder: order.order
  })),
  on(orderActions.confirmPaymentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(orderActions.clearOrderError, (state) => ({
    ...state,
    error: null,
  })),
  on(orderActions.getUserOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(orderActions.getUserOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(orderActions.getUserOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(orderActions.getAllOrders, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(orderActions.getAllOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(orderActions.getAllOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(orderActions.getOrdersByStatus, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(orderActions.getOrdersByStatusSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders,
  })),
  on(orderActions.getOrdersByStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(orderActions.updateOrderStatus, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(orderActions.updateOrderStatusSuccess, (state, { order }) => ({
    ...state,
    loading: false,
    error: null,
    message: 'Order status updated successfully',
    orders: state.orders.map((o) => (o.id === order.id ? order : o)),
  })),
  on(orderActions.updateOrderStatusFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
