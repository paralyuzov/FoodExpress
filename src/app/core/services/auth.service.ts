import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse } from '../../../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://localhost:3000/auth';
  private http = inject(HttpClient);

  login(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}/login`, { email, password });
  }
}
