import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../../app/core/services/dashboard.service';
import { DashboardActions } from './dashboard.actions';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard, DashboardActions.refreshDashboard),
      switchMap(() =>
        this.dashboardService.getDashboardData().pipe(
          map(data => DashboardActions.loadDashboardSuccess({ data })),
          catchError(error => of(DashboardActions.loadDashboardFailure({
            error: error.message || 'Failed to load dashboard data'
          })))
        )
      )
    )
  );
}
