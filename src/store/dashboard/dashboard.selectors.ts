import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectDashboardStats = createSelector(
  selectDashboardState,
  (state) => state.stats
);

export const selectOrderTrend = createSelector(
  selectDashboardState,
  (state) => state.orderTrend
);

export const selectTopDishes = createSelector(
  selectDashboardState,
  (state) => state.topDishes
);

export const selectRecentOrders = createSelector(
  selectDashboardState,
  (state) => state.recentOrders
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.isLoading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectLastUpdated = createSelector(
  selectDashboardState,
  (state) => state.lastUpdated
);

export const selectOrderTrendChartData = createSelector(
  selectOrderTrend,
  (trends) => ({
    labels: trends.map(trend => new Date(trend.date).toLocaleDateString()),
    datasets: [{
      label: 'Orders',
      data: trends.map(trend => trend.orders),
      borderColor: '#F59E0B',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      tension: 0.4,
    }]
  })
);

export const selectStatusDistributionChartData = createSelector(
  selectRecentOrders,
  (orders) => {
    const statusCounts = orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const statusLabels = Object.keys(statusCounts).map(status =>
      status.charAt(0) + status.slice(1).toLowerCase().replace('_', ' ')
    );

    const statusData = Object.values(statusCounts);
    const colors = ['#10B981', '#F59E0B', '#3B82F6', '#6B7280', '#EF4444', '#8B5CF6'];

    return {
      labels: statusLabels,
      datasets: [{
        data: statusData,
        backgroundColor: colors.slice(0, statusLabels.length)
      }]
    };
  }
);
