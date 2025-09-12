import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "./cart.reducer";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState,
    (state) => state.items
);

export const selectCartItemCount = createSelector(
    selectCartState,
    (state) => state.totalItems
);

export const selectCartSubtotal = createSelector(
    selectCartState,
    (state) => state.subtotal
);

export const selectCartTotal = createSelector(
    selectCartState,
    (state) => state.total
);

export const selectIsCartEmpty = createSelector(
    selectCartItems,
    (items) => items.length === 0
);

export const selectCartTax = createSelector(
    selectCartState,
    (state) => state.tax
);

export const selectCartDeliveryFee = createSelector(
    selectCartState,
    (state) => state.deliveryFee
);
