import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterDto, RegisterResponse, User, UserResponse } from '../../../models/User.model';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly API_URL = `${this.config.baseApiUrl}/auth`;

  login(email: string, password: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}/login`, { email, password });
  }

  register(registerData: RegisterDto): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/register`, registerData);
  }

  verifyEmail(token:string) {
    return this.http.get<{message:string}>(`${this.API_URL}/verify-email?token=${token}`);
  }

  verifyUser() {
    return this.http.get<User>(`${this.API_URL}/me`);
  }
}
