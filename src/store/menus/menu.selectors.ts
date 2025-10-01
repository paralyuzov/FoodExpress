import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MenusState } from "./menus.reducer";

export const selectMenus = createFeatureSelector<MenusState>('menus');

export const selectMenusLoading = createSelector(
  selectMenus,
  (state) => state.loading
);

export const selectMenusError = createSelector(
  selectMenus,
  (state) => state.error
);

export const selectMenusMessage = createSelector(
  selectMenus,
  (state) => state.message
);

export const selectAllMenus = createSelector(
  selectMenus,
  (state) => state.menus
);

export const selectSelectedMenu = createSelector(
  selectMenus,
  (state) => state.selectedMenu
);
