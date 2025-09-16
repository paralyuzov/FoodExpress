import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../models/index';
import { cartAction } from './cart.actions';

export interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  discountCode: string | null;
  discountAmountPercent: number;
  loading: boolean;
  error: string | null;
}

const TAX_RATE = 0.05;
const DELIVERY_FEE = 3;

export const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  tax: 0,
  deliveryFee: 0,
  total: 0,
  discountCode: null,
  discountAmountPercent: 0,
  loading: false,
  error: null,
};

function calculateTotals(items: CartItem[], discountAmountPercent = 0) {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const tax = subtotal * TAX_RATE;
  const deliveryFee = totalItems > 0 ? DELIVERY_FEE : 0;
  const total = (subtotal + tax + deliveryFee) * (1 - discountAmountPercent / 100);
  return { totalItems, subtotal, tax, deliveryFee, total };
}

export const cartReducer = createReducer(
  initialCartState,

  on(cartAction.addItemToCart, (state, { dish, quantity = 1 }) => {
    const existingItemIndex = state.items.findIndex((item) => item.dish.id === dish.id);

    let updatedItems: CartItem[];
    if (existingItemIndex != -1) {
      updatedItems = state.items.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity + quantity,
            totalPrice: (item.quantity + quantity) * item.dish.price,
          };
        }
        return item;
      });
    } else {
      const newItem: CartItem = {
        dish,
        quantity,
        totalPrice: quantity * dish.price,
      };
      updatedItems = [...state.items, newItem];
    }

    const totals = calculateTotals(updatedItems, state.discountAmountPercent);

    return {
      ...state,
      items: updatedItems,
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      totalItems: totals.totalItems,
    };
  }),

  on(cartAction.restoreCartState, (_, { cartState }) => cartState),

  on(cartAction.updateItemQuantity, (state, { dishId, quantity }) => {
    const updatedItems = state.items
      .map((item) => {
        if (item.dish.id === dishId) {
          return {
            ...item,
            quantity,
            totalPrice: quantity * item.dish.price,
          };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    const totals = calculateTotals(updatedItems, state.discountAmountPercent);

    return {
      ...state,
      items: updatedItems,
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      totalItems: totals.totalItems,
    };
  }),
  on(cartAction.removeItemFromCart, (state, { dishId }) => {
    const updatedItem = state.items.filter((item) => item.dish.id !== dishId);
    const totals = calculateTotals(updatedItem, state.discountAmountPercent);

    return {
      ...state,
      items: updatedItem,
      subtotal: totals.subtotal,
      tax: totals.tax,
      deliveryFee: totals.deliveryFee,
      total: totals.total,
      totalItems: totals.totalItems,
    };
  }),
  on(cartAction.clearCart, () => initialCartState)
);
