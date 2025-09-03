import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/User.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
    isAuthenticated: false,
  })),
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    user,
    isAuthenticated: true,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
  })),
  on(AuthActions.logout, () => initialAuthState)
);
