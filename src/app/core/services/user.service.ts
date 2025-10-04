import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address, User } from '../../../models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private apiUrl = `${this.config.baseApiUrl}/user`;


  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  createNewAddress(address: Omit<Address, 'id' | 'userId' | 'isDefault'>) {
    return this.http.post<Address>(`${this.apiUrl}/address`, address);
  }

  updateAddress(addressId: string, address: Omit<Address, 'id' | 'userId' | 'isDefault'>) {
    return this.http.put<Address>(`${this.apiUrl}/address/${addressId}`, address);
  }

  updateUserProfile(profile: Partial<User>) {
    return this.http.patch<User>(`${this.apiUrl}/profile`, profile);
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`);
  }

  updateUserStatus(userId: string, isActive: boolean) {
    return this.http.patch<User>(`${this.apiUrl}/admin/users/${userId}/status`, { isActive });
  }

  updateUserRole(userId: string, role: 'ADMIN' | 'CUSTOMER') {
    return this.http.patch<User>(`${this.apiUrl}/admin/users/${userId}/role`, { role });
  }

  deleteUser(userId: string) {
    return this.http.delete<void>(`${this.apiUrl}/admin/users/${userId}`);
  }

}
