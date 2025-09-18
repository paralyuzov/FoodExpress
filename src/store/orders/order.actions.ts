import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ConfirmPaymentResponse, CreateOrderRequest, Order } from '../../models';

export const orderActions = createActionGroup({
  source: 'Orders',
  events: {
    'Create Order' : props<{ order: CreateOrderRequest }>(),
    'Create Order Success': props<{ message: string; checkoutUrl: string }>(),
    'Create Order Failure': props<{ error: string }>(),
    'Clear Order State': emptyProps(),
    'Confirm Payment': props<{ session_id: string }>(),
    'Confirm Payment Success': props<{ order: ConfirmPaymentResponse }>(),
    'Confirm Payment Failure': props<{ error: string }>(),
    'Clear Order Error': emptyProps(),
    'Get User Orders': emptyProps(),
    'Get User Orders Success': props<{ orders: Order[] }>(),
    'Get User Orders Failure': props<{ error: string }>(),
  },
});
