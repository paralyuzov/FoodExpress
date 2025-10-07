import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  hasToken: boolean;
  message: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  hasToken: false,
  message: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    hasToken: true,
    error: null,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    hasToken: false,
  })),

  on(AuthActions.logout, () => initialAuthState),

  on(AuthActions.initApp, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.register, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),

  on(AuthActions.registerSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.clearAuthError, (state) => ({
    ...state,
    error: null,
    message: null,
  })),

  on(AuthActions.verifyEmail, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(AuthActions.verifyEmailSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),

  on(AuthActions.verifyEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.verifyUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.verifyUserSuccess, (state) => ({
    ...state,
    loading: false,
    isAuthenticated: true,
    hasToken: true,
  })),

  on(AuthActions.verifyUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isAuthenticated: false,
    hasToken: false,
  })),
  on(AuthActions.changePassword, (state) => ({
    ...state,
    loading: false,
    error: null,
    message: null,
  })),
  on(AuthActions.changePasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),
  on(AuthActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.forgotPassword, (state) => ({
    ...state,
    loading: false,
    error: null,
    message: null,
  })),
  on(AuthActions.forgotPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),
  on(AuthActions.forgotPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.resetPassword, (state) => ({
    ...state,
    loading: false,
    error: null,
    message: null,
  })),
  on(AuthActions.resetPasswordSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),
  on(AuthActions.resetPasswordFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AuthActions.resendVerificationEmail, (state) => ({
    ...state,
    loading: false,
    error: null,
    message: null,
  })),
  on(AuthActions.resendVerificationEmailSuccess, (state, { message }) => ({
    ...state,
    loading: false,
    message,
  })),
  on(AuthActions.resendVerificationEmailFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
