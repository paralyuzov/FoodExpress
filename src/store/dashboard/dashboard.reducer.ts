import { createReducer, on } from '@ngrx/store';
import { DashboardStats, OrderTrend, TopDish, RecentOrder } from '../../models/Dashboard.model';
import { DashboardActions } from './dashboard.actions';

export interface DashboardState {
  stats: DashboardStats | null;
  orderTrend: OrderTrend[];
  topDishes: TopDish[];
  recentOrders: RecentOrder[];

  isLoading: boolean;

  error: string | null;
  lastUpdated: Date | null;
}

const initialState: DashboardState = {
  stats: null,
  orderTrend: [],
  topDishes: [],
  recentOrders: [],

  isLoading: false,

  error: null,
  lastUpdated: null,
};

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.loadDashboard, DashboardActions.refreshDashboard, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(DashboardActions.loadDashboardSuccess, (state, { data }) => ({
    ...state,
    stats: data.stats,
    orderTrend: data.orderTrend,
    topDishes: data.topDishes,
    recentOrders: data.recentOrders,
    isLoading: false,
    error: null,
    lastUpdated: new Date()
  })),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),

  // Clear dashboard
  on(DashboardActions.clearDashboard, () => initialState)
);
