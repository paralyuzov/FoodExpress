import { createActionGroup, props } from '@ngrx/store';
import { Menu } from '../../models';

export const menusAction = createActionGroup({
  source: 'Menus',
  events: {
    'Get Menu By Id': props<{ menuId: string }>(),
    'Get Menu By Id Success': props<{ menu: Menu }>(),
    'Get Menu By Id Failure': props<{ error: string }>(),
    'Create Menu': props<{ restaurantId: string; menu: Partial<Menu> }>(),
    'Create Menu Success': props<{ menu: Menu }>(),
    'Create Menu Failure': props<{ error: string }>(),
    'Delete Menu': props<{ menuId: string }>(),
    'Delete Menu Success': props<{ menu: Menu }>(),
    'Delete Menu Failure': props<{ error: string }>(),
    'Update Menu': props<{ menuId: string; menu: Partial<Menu> }>(),
    'Update Menu Success': props<{ menu: Menu }>(),
    'Update Menu Failure': props<{ error: string }>(),
  },
});
