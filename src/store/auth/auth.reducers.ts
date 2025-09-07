import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/User.model';
import { AuthActions } from './auth.actions';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  message: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  message: null,
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

  on(AuthActions.logout, () => initialAuthState),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),

  on(AuthActions.registerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    registrationMessage: message,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    message: null,
  })),
  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null,
  })),
  on(AuthActions.verifyEmail, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.verifyEmailSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message: message,
  })),
  on(AuthActions.verifyEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    message: null,
  }))
);
