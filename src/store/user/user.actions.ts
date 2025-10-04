import { createActionGroup, props, emptyProps } from '@ngrx/store';
import type {  CreateOrderRequest, User } from '../../models';
import type { Address } from '../../models';

export type CreateAddressRequest = Omit<Address, 'id' | 'userId' | 'isDefault'>;

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Set User': props<{ user: User | null }>(),
    'Load Profile': emptyProps(),
    'Load Profile Success': props<{ user: User }>(),
    'Load Profile Failure': props<{ error: string }>(),
    'Create Address': props<{ address: CreateAddressRequest }>(),
    'Create Address Success': props<{ address: Address }>(),
    'Create Address Failure': props<{ error: string }>(),
    'Clear User Data': emptyProps(),
    'Create Order': props<{ orderData: CreateOrderRequest }>(),
    'Create Order Success': props<{ orderId: string }>(),
    'Create Order Failure': props<{ error: string }>(),
    'Update Address': props<{ addressId: string, address: CreateAddressRequest }>(),
    'Update Address Success': props<{ address: Address }>(),
    'Update Address Failure': props<{ error: string }>(),
    'Update Profile': props<{ profile: Partial<User> }>(),
    'Update Profile Success': props<{ user: User }>(),
    'Update Profile Failure': props<{ error: string }>(),
    'Load All Users': emptyProps(),
    'Load All Users Success': props<{ users: User[] }>(),
    'Load All Users Failure': props<{ error: string }>(),
    'Update User Status': props<{ userId: string; isActive: boolean }>(),
    'Update User Status Success': props<{ user: User }>(),
    'Update User Status Failure': props<{ error: string }>(),
    'Update User Role': props<{ userId: string; role: 'ADMIN' | 'CUSTOMER' }>(),
    'Update User Role Success': props<{ user: User }>(),
    'Update User Role Failure': props<{ error: string }>(),
    'Delete User': props<{ userId: string }>(),
    'Delete User Success': props<{ userId: string }>(),
    'Delete User Failure': props<{ error: string }>(),
  },
});
