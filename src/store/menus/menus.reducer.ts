import { createReducer, on } from "@ngrx/store";
import { Menu } from "../../models";
import { menusAction } from "./menus.actions";

export interface MenusState {
  menus: Menu[];
  selectedMenu: Menu | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export const initialMenusState: MenusState = {
  menus: [],
  selectedMenu: null,
  loading: false,
  error: null,
  message: null,
}


export const menusReducer = createReducer(
  initialMenusState,
  on(menusAction.createMenu,(state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(menusAction.createMenuSuccess, (state, { menu }) => ({
    ...state,
    loading: false,
    menus: [...state.menus, menu],
    message: 'Menu created successfully',
  })),
  on(menusAction.createMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(menusAction.deleteMenu, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(menusAction.deleteMenuSuccess, (state, { menu }) => ({
    ...state,
    loading: false,
    menus: state.menus.filter(m => m.id !== menu.id),
    message: 'Menu deleted successfully',
  })),
  on(menusAction.deleteMenuFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(menusAction.getMenuById, (state) => ({
    ...state,
    loading: true,
    error: null,
    message: null,
  })),
  on(menusAction.getMenuByIdSuccess, (state, { menu }) => ({
    ...state,
    loading: false,
    selectedMenu: menu,
  })),
  on(menusAction.getMenuByIdFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

)
