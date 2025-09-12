import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthActions } from '../../../store/auth/auth.actions';
import { AvatarModule } from 'primeng/avatar';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { CartDrawer } from "../cart-drawer/cart-drawer";
import { selectCartItemCount } from '../../../store/cart/cart.selectors';

@Component({
  selector: 'app-nav',
  imports: [TieredMenuModule, RouterModule, AvatarModule, OverlayBadgeModule, CartDrawer],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  items: MenuItem[] | undefined;
  private store = inject(Store);
  private router = inject(Router);
  openCartDrawer = signal(false);
  cartItemsCount = this.store.selectSignal(selectCartItemCount);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  user = this.store.selectSignal(selectUser)
  ngOnInit() {
    this.items = [
      {
        label: 'Orders',
        icon: 'pi pi-sign-in',
        command: () => console.log('Orders clicked'),
      },
      {
        label: 'Profile',
        icon: 'pi pi-user-plus',
        command: () => console.log('Profile clicked'),
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.store.dispatch(AuthActions.logout()),
      },
    ];
  }

  navigateToAuth() {
    this.router.navigate(['auth/signup']);
  }

  openCart() {
    this.openCartDrawer.set(true);
  }

  onCartVisibilityChange(visible: boolean) {
    this.openCartDrawer.set(visible);
  }

}
