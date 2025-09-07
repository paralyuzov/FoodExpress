import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUser } from '../../../store/auth/auth.selectors';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [TieredMenuModule, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  items: MenuItem[] | undefined;
  private store = inject(Store);
  private router = inject(Router);

  isAuthenticated = this.store.selectSignal(selectIsAuthenticated);
  user = this.store.selectSignal(selectUser)
  ngOnInit() {
    this.items = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        command: () => console.log('Login clicked'),
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        command: () => console.log('Register clicked'),
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => console.log('Logout clicked'),
      },
    ];
  }

  navigateToAuth() {
    this.router.navigate(['auth/signup']);
  }

}
