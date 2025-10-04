import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { DashboardData } from '../../models/Dashboard.model';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Dashboard': emptyProps(),
    'Load Dashboard Success': props<{ data: DashboardData }>(),
    'Load Dashboard Failure': props<{ error: string }>(),
    'Refresh Dashboard': emptyProps(),
    'Clear Dashboard': emptyProps(),
  }
});
