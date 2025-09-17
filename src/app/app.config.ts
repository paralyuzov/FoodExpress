import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from '../store/auth/auth.reducers';
import { authEffects } from '../store/auth/auth.effects';
import { userReducer } from '../store/user/user.reducer';
import { userEffects } from '../store/user/user.effects';
import { restaurantReducer } from '../store/restaurant/restaurant.reducers';
import { restaurantEffects } from '../store/restaurant/restaurant.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { cartEffects } from '../store/cart/cart.effects';
import { cartReducer } from '../store/cart/cart.reducer';
import { MessageService } from 'primeng/api';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { ordersEffects } from '../store/orders/order.effects';
import { ordersReducer } from '../store/orders/orders.reducer';
import { dishReducer } from '../store/dish/dish.reducer';
import { dishEffects } from '../store/dish/dish.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideStore({
      auth: authReducer,
      user: userReducer,
      restaurant: restaurantReducer,
      cart: cartReducer,
      orders: ordersReducer,
      dish: dishReducer,
    }),
    provideEffects(authEffects),
    provideEffects(userEffects),
    provideEffects(restaurantEffects),
    provideEffects(cartEffects),
    provideEffects(ordersEffects),
    provideEffects(dishEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
  ],
};
