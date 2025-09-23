import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState, addressAdapter } from './user.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

const { selectAll, selectEntities, selectIds, selectTotal } = addressAdapter.getSelectors();

export const selectUserProfile = createSelector(
  selectUserState,
  (state) => state.profile
);

export const selectProfileLoading = createSelector(
  selectUserState,
  (state) => state.profileLoading
);

export const selectProfileError = createSelector(
  selectUserState,
  (state) => state.profileError
);

export const selectAllAddresses = createSelector(
  selectUserState,
  selectAll
);

export const selectAddressEntities = createSelector(
  selectUserState,
  selectEntities
);

export const selectAddressesLoading = createSelector(
  selectUserState,
  (state) => state.addressesLoading
);

export const selectAddressesError = createSelector(
  selectUserState,
  (state) => state.addressesError
);

export const selectDefaultAddress = createSelector(
  selectAllAddresses,
  (addresses) => addresses.find(address => address.isDefault) ?? null
);

export const selectAddressById = (id: string) => createSelector(
  selectAddressEntities,
  (entities) => entities[id] ?? null
);

export const selectAddressCount = createSelector(
  selectUserState,
  selectTotal
);

export const selectUserName = createSelector(
  selectUserProfile,
  (profile) => profile ? `${profile.firstName} ${profile.lastName}` : null
);

export const selectUserEmail = createSelector(
  selectUserProfile,
  (profile) => profile?.email ?? null
);

export const selectHasAddresses = createSelector(
  selectAddressCount,
  (count) => count > 0
);
