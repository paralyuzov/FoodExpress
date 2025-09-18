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

export const selectOrdersCount = createSelector(
    selectOrders,
    (state) => state.orders.length
);

export const selectTotalSpent = createSelector(
    selectOrders,
    (state) => {
        return state.orders.reduce((total, order) => {
            const orderTotal = typeof order.total === 'string' ? parseFloat(order.total) : order.total;
            return total + (orderTotal || 0);
        }, 0);
    }
);

