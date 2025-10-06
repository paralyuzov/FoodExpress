import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterDto, User } from '../../models/User.model';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Login: props<{ email: string; password: string }>(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': props<{ error: string }>(),
    Logout: emptyProps(),
    'Logout Success': props<{ message: string }>(),
    'Logout Failure': props<{ error: string }>(),
    Register: props<RegisterDto>(),
    'Register Success': props<{ message: string }>(),
    'Register Failure': props<{ error: string }>(),
    'Clear Auth Error': emptyProps(),
    'Verify Email': props<{ token: string }>(),
    'Verify Email Success': props<{ message: string }>(),
    'Verify Email Failure': props<{ error: string }>(),
    'Verify User': emptyProps(),
    'Verify User Success': props<{ user: User }>(),
    'Verify User Failure': props<{ error: string }>(),
    'Init App': emptyProps(),
    'Change Password': props<{ currentPassword: string; newPassword: string; confirmNewPassword: string }>(),
    'Change Password Success': props<{ message: string }>(),
    'Change Password Failure': props<{ error: string }>(),
  },
});
