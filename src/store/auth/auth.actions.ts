import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../models/User.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    'Logout': emptyProps(),
  },
});
