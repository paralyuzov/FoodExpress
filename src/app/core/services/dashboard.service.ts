import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../../../models/Dashboard.model';
import { ConfigService } from './config.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly API_URL = this.config.baseApiUrl;

  getDashboardData(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.API_URL}/admin/dashboard/stats`);
  }
}
