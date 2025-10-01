import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  selectedTab = signal<'orders' | 'restaurants' | 'users' | 'statistic' | null>(null);

  setTab(tab: 'orders' | 'restaurants' | 'users' | 'statistic') {
    this.selectedTab.set(tab);
  }

}
