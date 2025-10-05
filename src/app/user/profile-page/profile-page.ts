import { Component, inject, OnInit, computed, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { selectUserProfile, selectProfileLoading } from '../../../store/user/user.selectors';
import {
  selectAllOrders,
  selectOrderLoading,
  selectOrdersCount,
  selectTotalSpent,
} from '../../../store/orders/order.selectors';
import { selectIsAuthenticated } from '../../../store/auth/auth.selectors';
import { AuthActions } from '../../../store/auth/auth.actions';
import { User } from '../../../models';
import { orderActions } from '../../../store/orders/order.actions';
import { OrdersTable } from '../../ui/orders-table/orders-table';
import { AdressTab } from '../../ui/adress-tab/adress-tab';
import { DialogService } from 'primeng/dynamicdialog';
import { EditUserForm } from '../edit-user-form/edit-user-form';
import { ChangePasswordForm } from '../change-password/change-password-form';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, RouterModule, DatePipe, DecimalPipe, OrdersTable, AdressTab],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
  providers: [DialogService],
})
export class ProfilePage implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  user = this.store.selectSignal(selectUserProfile);
  orders = this.store.selectSignal(selectAllOrders);
  isOrderLoading = this.store.selectSignal(selectOrderLoading);
  isLoading = this.store.selectSignal(selectProfileLoading);
  totalOrders = this.store.selectSignal(selectOrdersCount);
  totalSpent = this.store.selectSignal(selectTotalSpent);
  selectedTab = signal<'orders' | 'addresses'>('orders');

  userInitials = computed(() => {
    const user = this.user() as User;
    if (!user || !user.firstName || !user.lastName) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
  });

  selectTab(tab: 'orders' | 'addresses') {
    this.selectedTab.set(tab);
  }

  ngOnInit() {
    this.store.dispatch(orderActions.getUserOrders());
  }

  onEditProfile() {
    this.dialogService.open(EditUserForm, {
      header: 'Update Profile',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      focusOnShow: false,
    });
  }

    onChangePassword() {
    this.dialogService.open(ChangePasswordForm, {
      header: 'Change Password',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      focusOnShow: false,
    });
  }

  onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.router.navigate(['/']);
  }
}
