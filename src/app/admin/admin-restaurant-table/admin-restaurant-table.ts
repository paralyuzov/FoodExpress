import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
  selectAllRestaurants,
  selectRestaurantLoading,
} from '../../../store/restaurant/restaurant.selectors';
import { restaurantAction } from '../../../store/restaurant/restaurant.actions';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { DecimalPipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateRestaurantForm } from '../../restaurant/create-restaurant-form/create-restaurant-form';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { EditRestaurantForm } from '../../restaurant/edit-restaurant-form/edit-restaurant-form';
import { CreateMenuForm } from '../../menu/create-menu-form/create-menu-form';
import { menusAction } from '../../../store/menus/menus.actions';
import { EditMenuForm } from '../../menu/edit-menu-form/edit-menu-form';
import { CreateDishForm } from '../../dish/create-dish-form/create-dish-form';
import { dishActions } from '../../../store/dish/dish.actions';
import { EditDishForm } from '../../dish/edit-dish-form/edit-dish-form';

@Component({
  selector: 'app-admin-restaurant-table',
  imports: [
    TableModule,
    ButtonModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
    DecimalPipe,
    ConfirmDialog,
  ],
  templateUrl: './admin-restaurant-table.html',
  styleUrl: './admin-restaurant-table.css',
  providers: [DialogService, ConfirmationService],
})
export class AdminRestaurantTable implements OnInit {
  private store = inject(Store);
  private dialogService = inject(DialogService);
  private confirmationService = inject(ConfirmationService);
  restaurants = this.store.selectSignal(selectAllRestaurants);
  loading = this.store.selectSignal(selectRestaurantLoading);
  expandedRows: { [s: string]: boolean } = {};

  ngOnInit(): void {
    this.store.dispatch(restaurantAction.loadRestaurants());
  }

  onRowExpand(event: any): void {
    this.store.dispatch(restaurantAction.loadSelectedRestaurantDetails({ id: event.data.id }));
  }

  onRowCollapse(event: any): void {
    console.log('Row collapsed:', event.data.name);
  }

  showCreateRestaurantForm() {
    this.dialogService.open(CreateRestaurantForm, {
      header: 'Create Restaurant',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      focusOnShow: false,
    });
  }

  showEditRestaurantForm(restaurantId: string) {
    this.dialogService.open(EditRestaurantForm, {
      header: 'Edit Restaurant',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      focusOnShow: false,
      data: { id: restaurantId },
    });
  }

  onDeleteRestaurant(event: Event, restaurantId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message:
        'Are you sure that you want to delete this restaurant? Menus and related data will also be removed.',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
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
        this.store.dispatch(restaurantAction.deleteRestaurant({ restaurantId }));
      },
    });
  }

  showCreateMenuForm(restaurantId: string) {
    this.dialogService.open(CreateMenuForm, {
      header: 'Create Menu',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      data: { id: restaurantId },
      focusOnShow: false,
    });
  }

  showEditMenuForm(menuId: string) {
    this.dialogService.open(EditMenuForm, {
      header: 'Edit Menu',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      data: { id: menuId },
      focusOnShow: false,
    });
  }

  onDeleteMenu(event: Event, menuId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this menu? This action cannot be undone.',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
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
        this.store.dispatch(menusAction.deleteMenu({ menuId }));
      },
    });
  }

  showCreateDishForm(menuId: string) {
    this.dialogService.open(CreateDishForm, {
      header: 'Create Dish',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      data: { id: menuId },
      focusOnShow: false,
    });
  }

  showEditDishForm(menuId: string, dishId: string) {
    this.dialogService.open(EditDishForm, {
      header: 'Edit Dish',
      styleClass: 'w-96! bg-neutral-900!',
      closable: true,
      maskStyleClass: 'backdrop-blur-sm',
      closeOnEscape: true,
      data: { menuId: menuId, dishId: dishId },
      focusOnShow: false,
    });
  }

  onDeleteDish(event: Event, dishId: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this dish? This action cannot be undone.',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
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
        this.store.dispatch(dishActions.deleteDish({ dishId }));
      },
    });
  }
}
