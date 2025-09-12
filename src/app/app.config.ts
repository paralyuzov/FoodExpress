import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from '../store/auth/auth.reducers';
import { authEffects } from '../store/auth/auth.effects';
import { restaurantReducer } from '../store/restaurant/restaurant.reducers';
import { restaurantEffects } from '../store/restaurant/restaurant.effects';
import { provideHttpClient } from '@angular/common/http';
import { cartEffects } from '../store/cart/cart.effects';
import { cartReducer } from '../store/cart/cart.reducer';

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
      restaurant: restaurantReducer,
      cart: cartReducer
    }),
    provideEffects(authEffects),
    provideEffects(restaurantEffects),
    provideEffects(cartEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
    provideHttpClient(),
    MessageService,
],
};
