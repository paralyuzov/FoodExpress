import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Address, User } from '../../../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  private http = inject(HttpClient);


  getProfile() {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  createNewAddress(address: Omit<Address, 'id' | 'userId' | 'isDefault'>) {
    return this.http.post<Address>(`${this.apiUrl}/address`, address);
  }

  updateAddress(addressId: string, address: Omit<Address, 'id' | 'userId' | 'isDefault'>) {
    return this.http.put<Address>(`${this.apiUrl}/address/${addressId}`, address);
  }

}
