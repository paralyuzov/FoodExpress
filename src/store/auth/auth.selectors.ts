import { createFeatureSelector, createSelector } from '@ngrx/store';
import type { AuthState } from './auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectAuthMessage = createSelector(
  selectAuthState,
  (state) => state.message
);

export const selectHasToken = createSelector(
  selectAuthState,
  (state) => state.hasToken
);

// Remove selectUser and selectAddresses - these belong in user store now
