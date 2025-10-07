import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterDto, RegisterResponse, User, UserResponse, RefreshTokenResponse } from '../../../models/User.model';
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

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken = localStorage.getItem('x-refresh-token');
    const headers = {
      'x-refresh-token': refreshToken || ''
    }
    return this.http.post<RefreshTokenResponse>(`${this.API_URL}/refresh`, {}, { headers });
  }

  logout() {
    return this.http.post<{ message: string }>(`${this.API_URL}/logout`, {});
  }

  changePassword(currentPassword: string, newPassword: string, confirmNewPassword: string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/change-password`, { currentPassword, newPassword, confirmNewPassword });
  }

  forgotPassword(email: string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string, confirmNewPassword: string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/reset-password?token=${token}`, { newPassword, confirmNewPassword });
  }

  resendVerificationEmail(email: string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/resend-verification-email`, { email });
  }
}
