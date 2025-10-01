import { Actions, createEffect, ofType } from '@ngrx/effects';
import { menusAction } from './menus.actions';
import { inject } from '@angular/core';
import { MenuService } from '../../app/core/services/menu.service';
import { catchError, map, of, switchMap } from 'rxjs';
import { MessageService } from 'primeng/api';

export const menusEffects = {
  createMenu: createEffect(
    (actions$ = inject(Actions), menuService = inject(MenuService) , messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(menusAction.createMenu),
        switchMap(({ restaurantId, menu }) =>
          menuService.createMenu(restaurantId, menu).pipe(
            map((menu) => {
              messageService.add({severity:'success', summary: 'Success', detail: 'Menu created successfully'});
              return menusAction.createMenuSuccess({ menu });
            }),
            catchError((error) =>
              of(
                menusAction.createMenuFailure({
                  error: error.error?.message || 'Failed to create menu',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  deleteMenu: createEffect(
    (actions$ = inject(Actions), menuService = inject(MenuService), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(menusAction.deleteMenu),
        switchMap(({ menuId }) =>
          menuService.deleteMenu(menuId).pipe(
            map((response) => {
              messageService.add({severity:'success', summary: 'Success', detail: 'Menu deleted successfully'});
              return menusAction.deleteMenuSuccess({ menu: response });
            }),
            catchError((error) =>
              of(
                menusAction.deleteMenuFailure({
                  error: error.error?.message || 'Failed to delete menu',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  getMenuById: createEffect(
    (actions$ = inject(Actions), menuService = inject(MenuService)) => {
      return actions$.pipe(
        ofType(menusAction.getMenuById),
        switchMap(({ menuId }) =>
          menuService.getMenuById(menuId).pipe(
            map((menu) => menusAction.getMenuByIdSuccess({ menu })),
            catchError((error) =>
              of(
                menusAction.getMenuByIdFailure({
                  error: error.error?.message || 'Failed to get menu',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
  updateMenu: createEffect(
    (actions$ = inject(Actions), menuService = inject(MenuService), messageService = inject(MessageService)) => {
      return actions$.pipe(
        ofType(menusAction.updateMenu),
        switchMap(({ menuId, menu }) =>
          menuService.updateMenu(menuId, menu).pipe(
            map((updatedMenu) => {
              messageService.add({severity:'success', summary: 'Success', detail: 'Menu updated successfully'});
              return menusAction.updateMenuSuccess({ menu: updatedMenu });
            }),
            catchError((error) =>
              of(
                menusAction.updateMenuFailure({
                  error: error.error?.message || 'Failed to update menu',
                })
              )
            )
          )
        )
      );
    },
    { functional: true }
  ),
};
