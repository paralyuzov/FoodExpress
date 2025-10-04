import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { DashboardActions } from '../../../store/dashboard/dashboard.actions';
import * as DashboardSelectors from '../../../store/dashboard/dashboard.selectors';
import { RemoveUnderscorePipe } from '../../core/pipes/remove-underscore-pipe';

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    TagModule,
    ProgressBarModule,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
    RemoveUnderscorePipe
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private store = inject(Store);

  stats = this.store.selectSignal(DashboardSelectors.selectDashboardStats);
  orderTrend = this.store.selectSignal(DashboardSelectors.selectOrderTrend);
  topDishes = this.store.selectSignal(DashboardSelectors.selectTopDishes);
  recentOrders = this.store.selectSignal(DashboardSelectors.selectRecentOrders);

  isLoading = this.store.selectSignal(DashboardSelectors.selectDashboardLoading);
  error = this.store.selectSignal(DashboardSelectors.selectDashboardError);

  ordersChartData = this.store.selectSignal(DashboardSelectors.selectOrderTrendChartData);
  statusChartData = this.store.selectSignal(DashboardSelectors.selectStatusDistributionChartData);

  ordersChartOptions = signal({
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#E5E7EB',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#9CA3AF',
        },
        grid: {
          color: '#374151',
        },
      },
      y: {
        ticks: {
          color: '#9CA3AF',
        },
        grid: {
          color: '#374151',
        },
      },
    },
  });

  statusChartOptions = signal({
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#E5E7EB',
        },
      },
    },
  });

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadDashboard());
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const statusMap = {
      DELIVERED: 'success',
      PREPARING: 'warn',
      CONFIRMED: 'info',
      PENDING: 'secondary',
      CANCELLED: 'danger',
      OUT_FOR_DELIVERY: 'contrast',
    } as const;
    return statusMap[status as keyof typeof statusMap] || 'secondary';
  }

  getGrowthColor(growth: number): string {
    return growth >= 0 ? 'text-green-400' : 'text-red-400';
  }

  getGrowthIcon(growth: number): string {
    return growth >= 0 ? 'pi pi-arrow-up' : 'pi pi-arrow-down';
  }

  refreshDashboard(): void {
    this.store.dispatch(DashboardActions.refreshDashboard());
  }

}
