import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Nav } from './ui/nav/nav';
import { Footer } from './ui/footer/footer';
import { CartToast } from './ui/cart-toast/cart-toast';
import { ToastModule } from 'primeng/toast';
import { AppLoader } from './app-loader/app-loader';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';
import { selectAuthLoading } from '../store/auth/auth.selectors';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, CartToast, ToastModule, AppLoader],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('food-delivery-web');
  private store = inject(Store);
  authLoading = this.store.selectSignal(selectAuthLoading);
  constructor() {
    this.store.dispatch(AuthActions.initApp());
  }
}
