import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Nav } from "./ui/nav/nav";
import { Footer } from "./ui/footer/footer";
import { CartToast } from "./ui/cart-toast/cart-toast";
import { cartAction } from '../store/cart/cart.actions';
import { AuthActions } from '../store/auth/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Nav, Footer, CartToast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('food-delivery-web');
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(AuthActions.initApp());
    this.store.dispatch(cartAction.loadPersistedCart());
  }
}
