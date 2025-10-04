import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  selectedTab = signal< 'orders' | 'restaurants' | 'users' | 'dashboard' | null>('dashboard');

  setTab(tab: 'orders' | 'restaurants' | 'users' | 'dashboard') {
    this.selectedTab.set(tab);
  }

}
