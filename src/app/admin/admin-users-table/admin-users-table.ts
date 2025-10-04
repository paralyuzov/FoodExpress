import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DatePipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { userActions } from '../../../store/user/user.actions';
import { selectAllUsers, selectUsersLoading, selectUsersError } from '../../../store/user/user.selectors';
import { User } from '../../../models';

@Component({
  selector: 'app-admin-users-table',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    ConfirmDialog,
    DatePipe,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './admin-users-table.html',
  styleUrl: './admin-users-table.css',
  providers: [DialogService, ConfirmationService],
})
export class AdminUsersTable implements OnInit {
  private store = inject(Store);
  private confirmationService = inject(ConfirmationService);

  users = this.store.selectSignal(selectAllUsers);
  loading = this.store.selectSignal(selectUsersLoading);
  error = this.store.selectSignal(selectUsersError);

  ngOnInit(): void {
    this.store.dispatch(userActions.loadAllUsers());
  }

  onUpdateUserStatus(user: User, isActive: boolean) {
    const action = isActive ? 'activate' : 'deactivate';
    this.confirmationService.confirm({
      message: `Are you sure you want to ${action} this user?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: isActive ? 'pi pi-check' : 'pi pi-ban',
      acceptButtonStyleClass: isActive ? 'p-button-success' : 'p-button-warning',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: action.charAt(0).toUpperCase() + action.slice(1),
      },
      accept: () => {
        this.store.dispatch(userActions.updateUserStatus({ userId: user.id, isActive }));
      },
    });
  }

  onUpdateUserRole(user: User, newRole: 'ADMIN' | 'CUSTOMER') {
    const currentRole = user.role;
    this.confirmationService.confirm({
      message: `Are you sure you want to change user role from ${currentRole} to ${newRole}?`,
      header: 'Change User Role',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check',
      acceptButtonStyleClass: 'p-button-warning',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Change Role',
      },
      accept: () => {
        this.store.dispatch(userActions.updateUserRole({ userId: user.id, role: newRole }));
      },
    });
  }

  onDeleteUser(event: Event, user: User) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Are you sure you want to delete user "${user.firstName} ${user.lastName}"? This action cannot be undone.`,
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      acceptButtonStyleClass: 'p-button-danger',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
      },
      accept: () => {
        this.store.dispatch(userActions.deleteUser({ userId: user.id }));
      },
    });
  }

  getRoleSeverity(role: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    return role === 'ADMIN' ? 'danger' : 'info';
  }

  refreshUsers() {
    this.store.dispatch(userActions.loadAllUsers());
  }
}
