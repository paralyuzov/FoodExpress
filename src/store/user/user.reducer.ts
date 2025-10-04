import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import type { User } from '../../models';
import type { Address } from '../../models';
import { userActions } from './user.actions';

export const addressAdapter = createEntityAdapter<Address>({
  selectId: (address: Address) => address.id,
});

export interface UserState extends EntityState<Address> {
  profile: User | null;
  profileLoading: boolean;
  profileError: string | null;
  addressesLoading: boolean;
  addressesError: string | null;
  // Admin user management
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
}

export const initialUserState: UserState = addressAdapter.getInitialState({
  profile: null,
  profileLoading: false,
  profileError: null,
  addressesLoading: false,
  addressesError: null,
  users: [],
  usersLoading: false,
  usersError: null,
});

export const userReducer = createReducer(
  initialUserState,

  on(userActions.setUser, (state, { user }) => {
    if (user?.addresses) {
      return addressAdapter.setAll(user.addresses, {
        ...state,
        profile: user,
      });
    }
    return {
      ...state,
      profile: user,
    };
  }),

  on(userActions.loadProfile, (state) => ({
    ...state,
    profileLoading: true,
    profileError: null,
  })),

  on(userActions.loadProfileSuccess, (state, { user }) => ({
    ...state,
    profileLoading: false,
    profile: user,
  })),

  on(userActions.loadProfileFailure, (state, { error }) => ({
    ...state,
    profileLoading: false,
    profileError: error,
  })),
  on(userActions.createAddress,(state) => ({
    ...state,
    addressesLoading: true,
    addressesError: null,
  })),

  on(userActions.createAddressSuccess, (state, { address }) => {
    return addressAdapter.addOne(address, {
      ...state,
      addressesLoading: false,
    });
  }),

  on(userActions.createAddressFailure, (state, { error }) => ({
    ...state,
    addressesLoading: false,
    addressesError: error,
  })),
  on(userActions.updateAddress, (state) => ({
    ...state,
    addressesLoading: true,
    addressesError: null,
  })),

  on(userActions.updateAddressSuccess, (state, { address }) => {
    return addressAdapter.updateOne({ id: address.id, changes: address }, {
      ...state,
      addressesLoading: false,
    });
  }),
  on(userActions.updateAddressFailure, (state, { error }) => ({
    ...state,
    addressesLoading: false,
    addressesError: error,
  })),
  on(userActions.updateProfile, (state) => ({
    ...state,
    profileLoading: true,
    profileError: null,
  })),
  on(userActions.updateProfileSuccess, (state, { user }) => ({
    ...state,
    profileLoading: false,
    profile: user,
  })),
  on(userActions.updateProfileFailure, (state, { error }) => ({
    ...state,
    profileLoading: false,
    profileError: error,
  })),

  // Admin user management
  on(userActions.loadAllUsers, (state) => ({
    ...state,
    usersLoading: true,
    usersError: null,
  })),

  on(userActions.loadAllUsersSuccess, (state, { users }) => ({
    ...state,
    usersLoading: false,
    users,
  })),

  on(userActions.loadAllUsersFailure, (state, { error }) => ({
    ...state,
    usersLoading: false,
    usersError: error,
  })),

  on(userActions.updateUserStatus, (state) => ({
    ...state,
    usersLoading: true,
    usersError: null,
  })),

  on(userActions.updateUserStatusSuccess, (state, { user }) => ({
    ...state,
    usersLoading: false,
    users: state.users.map(u => u.id === user.id ? user : u),
  })),

  on(userActions.updateUserStatusFailure, (state, { error }) => ({
    ...state,
    usersLoading: false,
    usersError: error,
  })),

  on(userActions.updateUserRole, (state) => ({
    ...state,
    usersLoading: true,
    usersError: null,
  })),

  on(userActions.updateUserRoleSuccess, (state, { user }) => ({
    ...state,
    usersLoading: false,
    users: state.users.map(u => u.id === user.id ? user : u),
  })),

  on(userActions.updateUserRoleFailure, (state, { error }) => ({
    ...state,
    usersLoading: false,
    usersError: error,
  })),

  on(userActions.deleteUser, (state) => ({
    ...state,
    usersLoading: true,
    usersError: null,
  })),

  on(userActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    usersLoading: false,
    users: state.users.filter(user => user.id !== userId),
  })),

  on(userActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    usersLoading: false,
    usersError: error,
  })),

  on(userActions.clearUserData, () => initialUserState)
);
