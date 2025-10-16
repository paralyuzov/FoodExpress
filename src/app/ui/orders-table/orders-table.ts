import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { Order } from '../../../models';
import { RemoveUnderscorePipe } from '../../core/pipes/remove-underscore-pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderDetailPage } from '../../user/order-detail-page/order-detail-page';

@Component({
  selector: 'app-orders-table',
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    RatingModule,
    ButtonModule,
    DatePipe,
    RemoveUnderscorePipe,
  ],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.css',
  providers: [DialogService],
})
export class OrdersTable {
  expandedRows: { [key: string]: boolean } = {};

  orders = input.required<Order[]>();
  isOrderLoading = input.required<boolean>();
  dialogService = inject(DialogService);
  breakpoints= {
    '960px': '75vw',
    '640px': '90vw',
    '480px': '95vw',
    '0px': '100vw',
  };

  expandAll() {
    const orders = this.orders();
    this.expandedRows = {};
    orders.forEach((order) => {
      if (order.items && order.items.length > 0) {
        this.expandedRows[order.id] = true;
      }
    });
  }

  onViewDetails(order: Order) {
    this.dialogService.open(OrderDetailPage, {
      data: { order },
      styleClass: 'bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      maximizable: true,
      closeOnEscape: true,
      focusOnShow: false,
       breakpoints: this.breakpoints,
    });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getStatusSeverity(
    status: string
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const severity = (() => {
      switch (status.toUpperCase()) {
        case 'CONFIRMED':
          return 'success';
        case 'PREPARING':
          return 'warn';
        case 'OUT_FOR_DELIVERY':
          return 'info';
        case 'CANCELLED':
          return 'danger';
        case 'PENDING':
          return 'warn';
        default:
          return 'secondary';
      }
    })();
    return severity;
  }
}
