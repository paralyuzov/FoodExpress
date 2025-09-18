import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {  DatePipe } from '@angular/common';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { Order } from '../../../models';
import { RemoveUnderscorePipe } from '../../core/pipes/remove-underscore-pipe';

@Component({
  selector: 'app-orders-table',
  imports: [CommonModule, TableModule, TagModule, RatingModule, ButtonModule, DatePipe,RemoveUnderscorePipe],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.css',
})
export class OrdersTable {
  expandedRows: { [key: string]: boolean } = {};

  orders = input.required<Order[]>();

  onRowExpand(event: TableRowExpandEvent) {
    console.log('Row expanded:', event.data);
    console.log('Order items:', event.data.items);
    console.log('Items count:', event.data.items?.length || 0);
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    console.log('Row collapsed:', event.data);
  }

  expandAll() {
    const orders = this.orders();
    this.expandedRows = {};
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        this.expandedRows[order.id] = true;
      }
    });
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const severity = (() => {
      switch (status.toUpperCase()) {
        case 'CONFIRMED':
          return 'success';    // Green
        case 'DELIVERED':
          return 'contrast';    // Green for completed
        case 'PREPARING':
          return 'warn';    // Orange
        case 'OUT_FOR_DELIVERY':
          return 'info';       // Blue
        case 'CANCELLED':
          return 'danger';     // Red
        case 'PENDING':
          return 'warn';    // Orange for pending
        default:
          return 'secondary';  // Gray
      }
    })();
    return severity;
  }

}
