import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RegisterDto, RegisterResponse, User, UserResponse } from '../../../models/User.model';
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
