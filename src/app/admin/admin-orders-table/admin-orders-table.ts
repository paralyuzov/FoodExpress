import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { selectAllOrders, selectOrderLoading } from '../../../store/orders/order.selectors';
import { orderActions } from '../../../store/orders/order.actions';
import { Order, OrderStatus } from '../../../models';
import { RemoveUnderscorePipe } from '../../core/pipes/remove-underscore-pipe';

@Component({
  selector: 'app-admin-orders-table',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TagModule,
    SelectModule,
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    ToastModule,
    TooltipModule,
    RemoveUnderscorePipe,
  ],
  templateUrl: './admin-orders-table.html',
  styleUrl: './admin-orders-table.css',
  providers: [ConfirmationService],
})
export class AdminOrdersTable implements OnInit, OnDestroy {
  private store = inject(Store);
  private confirmationService = inject(ConfirmationService);

  orders = this.store.selectSignal(selectAllOrders);
  loading = this.store.selectSignal(selectOrderLoading);

  selectedStatus = signal<OrderStatus | null>(null);
  searchTerm = signal('');
  debouncedSearch = signal('');

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  statusOptions = [
    { label: 'All Orders', value: null },
    { label: 'Pending', value: OrderStatus.PENDING },
    { label: 'Confirmed', value: OrderStatus.CONFIRMED },
    { label: 'Preparing', value: OrderStatus.PREPARING },
    { label: 'Out for Delivery', value: OrderStatus.OUT_FOR_DELIVERY },
    { label: 'Delivered', value: OrderStatus.DELIVERED },
    { label: 'Cancelled', value: OrderStatus.CANCELLED },
  ];

  filteredOrders = computed(() => {
    let filtered = this.orders();

    if (this.selectedStatus()) {
      filtered = filtered.filter((order) => order.status === this.selectedStatus());
    }

    if (this.debouncedSearch()) {
      const term = this.debouncedSearch().toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.customer?.firstName?.toLowerCase().includes(term) ||
          order.customer?.lastName?.toLowerCase().includes(term) ||
          order.restaurant?.name?.toLowerCase().includes(term) ||
          order.id?.toLowerCase().includes(term) ||
          order.customer?.phone?.toLowerCase().includes(term)
      );
    }

    return [...filtered];
  });

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(searchTerm => {
        this.debouncedSearch.set(searchTerm);
      });

    this.loadAllOrders();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(value: string) {
    this.searchTerm.set(value);
    this.searchSubject.next(value);
  }

  loadAllOrders() {
    this.store.dispatch(orderActions.getAllOrders({}));
  }

  loadOrders() {
    this.loadAllOrders();
  }

  onFilterChange(): void {
    const status = this.selectedStatus();
    this.store.dispatch(orderActions.getAllOrders({ status: status || undefined }));
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.debouncedSearch.set('');
    this.selectedStatus.set(null);
    this.searchSubject.next('');
    this.loadAllOrders();
  }

  getStatusChangeOptions(currentStatus: OrderStatus) {
    const allStatuses = [
      { label: 'Pending', value: OrderStatus.PENDING },
      { label: 'Confirmed', value: OrderStatus.CONFIRMED },
      { label: 'Preparing', value: OrderStatus.PREPARING },
      { label: 'Out for Delivery', value: OrderStatus.OUT_FOR_DELIVERY },
      { label: 'Delivered', value: OrderStatus.DELIVERED },
      { label: 'Cancelled', value: OrderStatus.CANCELLED },
    ];

    return allStatuses.filter((status) => status.value !== currentStatus);
  }

  onStatusChange(order: Order, newStatus: OrderStatus) {
    this.confirmationService.confirm({
      message: `Are you sure you want to change the status to "${newStatus.replaceAll('_', ' ')}"?`,
      header: 'Confirm Status Change',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.store.dispatch(
          orderActions.updateOrderStatus({ orderId: order.id, status: newStatus })
        );
        setTimeout(() => {
          const currentStatus = this.selectedStatus();
          this.store.dispatch(orderActions.getAllOrders({ status: currentStatus || undefined }));
        }, 500);
      },
    });
  }

  getPendingCount(): number {
    return this.orders().filter((order) => order.status === OrderStatus.PENDING).length;
  }

  hasOrdersWithNotes(): boolean {
    return this.filteredOrders().some((order) => order.notes && order.notes.trim().length > 0);
  }

  getStatusSeverity(
    status: OrderStatus
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status) {
      case OrderStatus.PENDING:
        return 'info';
      case OrderStatus.CONFIRMED:
        return 'info';
      case OrderStatus.PREPARING:
        return 'warn';
      case OrderStatus.OUT_FOR_DELIVERY:
        return 'contrast';
      case OrderStatus.DELIVERED:
        return 'success';
      case OrderStatus.CANCELLED:
        return 'danger';
      default:
        return 'secondary';
    }
  }

  get orderStatusEnum() {
    return OrderStatus;
  }
}
