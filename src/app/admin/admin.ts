import { Component, signal } from '@angular/core';
import { AdminOrdersTable } from "./admin-orders-table/admin-orders-table";

@Component({
  selector: 'app-admin',
  imports: [AdminOrdersTable],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  selectedTab = signal<'orders' | 'restaurants' | 'users' | 'statistic'>('orders');


  setTab(tab: 'orders' | 'restaurants' | 'users' | 'statistic') {
    this.selectedTab.set(tab);
  }

}
