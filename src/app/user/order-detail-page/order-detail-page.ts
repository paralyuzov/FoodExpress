import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Order } from '../../../models';

@Component({
  selector: 'app-order-detail-page',
  imports: [CommonModule, DatePipe, TagModule, ButtonModule],
  templateUrl: './order-detail-page.html',
  styleUrl: './order-detail-page.css'
})
export class OrderDetailPage {
  private dialogRef = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  
  order = signal<Order | null>(this.config.data?.order || null);
  
  orderEvents = computed(() => {
    const orderData = this.order();
    if (!orderData) return [];
    
    return [
      {
        status: 'Order Placed',
        date: orderData.createdAt,
        icon: 'pi pi-shopping-cart',
        color: '#9CA3AF',
        completed: true
      },
      {
        status: 'Order Confirmed',
        date: orderData.status === 'PENDING' ? null : orderData.createdAt,
        icon: 'pi pi-check',
        color: '#10B981',
        completed: ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'ON_THE_WAY', 'DELIVERED'].includes(orderData.status)
      },
      {
        status: 'Preparing',
        date: orderData.status === 'PREPARING' ? new Date() : null,
        icon: 'pi pi-clock',
        color: '#F59E0B',
        completed: ['PREPARING', 'OUT_FOR_DELIVERY', 'ON_THE_WAY', 'DELIVERED'].includes(orderData.status)
      },
      {
        status: 'Out for Delivery',
        date: ['OUT_FOR_DELIVERY', 'ON_THE_WAY'].includes(orderData.status) ? new Date() : null,
        icon: 'pi pi-car',
        color: '#3B82F6',
        completed: ['OUT_FOR_DELIVERY', 'ON_THE_WAY', 'DELIVERED'].includes(orderData.status)
      },
      {
        status: 'Delivered',
        date: orderData.status === 'DELIVERED' ? new Date() : null,
        icon: 'pi pi-check-circle',
        color: '#10B981',
        completed: orderData.status === 'DELIVERED'
      }
    ];
  });

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status.toUpperCase()) {
      case 'CONFIRMED':
        return 'success';
      case 'DELIVERED':
        return 'contrast';
      case 'PREPARING':
        return 'warn';
      case 'OUT_FOR_DELIVERY':
      case 'ON_THE_WAY':
        return 'info';
      case 'CANCELLED':
        return 'danger';
      case 'PENDING':
        return 'warn';
      default:
        return 'secondary';
    }
  }

  onContactRestaurant() {
    const orderData = this.order();
    if (orderData?.restaurant?.phone) {
      window.open(`tel:${orderData.restaurant.phone}`);
    }
  }

  onClose() {
    this.dialogRef.close();
  }
}
