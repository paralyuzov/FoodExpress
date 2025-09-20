import { Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import {  DatePipe } from '@angular/common';
import { Order } from '../../../models';
import { RemoveUnderscorePipe } from '../../core/pipes/remove-underscore-pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { OrderDetailPage } from '../../user/order-detail-page/order-detail-page';

@Component({
  selector: 'app-orders-table',
  imports: [CommonModule, TableModule, TagModule, RatingModule, ButtonModule, DatePipe,RemoveUnderscorePipe],
  templateUrl: './orders-table.html',
  styleUrl: './orders-table.css',
  providers: [DialogService],
})
export class OrdersTable {
  expandedRows: { [key: string]: boolean } = {};

  orders = input.required<Order[]>();
  dialogService = inject(DialogService);

  expandAll() {
    const orders = this.orders();
    this.expandedRows = {};
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        this.expandedRows[order.id] = true;
      }
    });
  }

  onViewDetails(order: Order) {
    console.log();
    this.dialogService.open(OrderDetailPage,{
      data: {order},
      styleClass: 'w-6xl! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      maximizable: true,
      closeOnEscape: true,
      focusOnShow: false
    })
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const severity = (() => {
      switch (status.toUpperCase()) {
        case 'CONFIRMED':
          return 'success';    
          return 'contrast';    
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
