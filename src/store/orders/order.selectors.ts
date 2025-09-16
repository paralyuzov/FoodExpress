import { createFeatureSelector, createSelector } from "@ngrx/store";
import { OrdersState } from "./orders.reducer";

export const selectOrders = createFeatureSelector<OrdersState>('orders');


export const selectOrderLoading = createSelector(
    selectOrders,
    (state) => state.loading
);

export const selectCheckoutUrl = createSelector(
    selectOrders,
    (state) => state.checkout_url
);

export const selectOrderError = createSelector(
    selectOrders,
    (state) => state.error
);

export const selectOrderMessage = createSelector(
    selectOrders,
    (state) => state.message
);

export const selectAllOrders = createSelector(
    selectOrders,
    (state) => state.orders
);

export const selectConfirmedOrder = createSelector(
    selectOrders,
    (state) => state.confirmedOrder
)
