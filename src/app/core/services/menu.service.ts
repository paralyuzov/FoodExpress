import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Menu } from '../../../models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly API_URL = `${this.config.baseApiUrl}/menus`;


  getMenuById(menuId: string) {
    return this.http.get<Menu>(`${this.API_URL}/${menuId}`);
  }

  createMenu(restaurantId: string, menu: Partial<Menu>) {
    return this.http.post<Menu>(`${this.API_URL}/restaurant/${restaurantId}`, menu);
  }

  updateMenu(menuId: string, menu: Partial<Menu>) {
    return this.http.put<Menu>(`${this.API_URL}/${menuId}`, menu);
  }

  deleteMenu(menuId: string) {
    return this.http.delete<Menu>(`${this.API_URL}/${menuId}`);
  }
}
