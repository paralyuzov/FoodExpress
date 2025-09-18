import { Component, inject, OnInit, computed } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { selectUserProfile, selectProfileLoading } from '../../../store/user/user.selectors';
import { selectAllOrders, selectOrdersCount, selectTotalSpent } from '../../../store/orders/order.selectors';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { User } from '../../../models';
import { orderActions } from '../../../store/orders/order.actions';
import { OrdersTable } from '../../ui/orders-table/orders-table';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, RouterModule, DatePipe, DecimalPipe, OrdersTable],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  user = this.store.selectSignal(selectUserProfile);
  orders = this.store.selectSignal(selectAllOrders);
  isLoading = this.store.selectSignal(selectProfileLoading);
  totalOrders = this.store.selectSignal(selectOrdersCount);
  totalSpent = this.store.selectSignal(selectTotalSpent);


  userInitials = computed(() => {
    const user = this.user() as User;
    if (!user || !user.firstName || !user.lastName) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  ngOnInit() {
    this.store.dispatch(orderActions.getUserOrders());
  }

  onEditProfile() {
    console.log('Edit profile clicked');
  }

  onChangePassword() {
    console.log('Change password clicked');
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/']);
  }

}
