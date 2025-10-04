import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Dish } from '../../../models';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private http = inject(HttpClient);
  private config = inject(ConfigService);
  private readonly API_URL = `${this.config.baseApiUrl}/dishes`;

  getMostPopularDishes(limit? : number) {
    const url = limit ? `${this.API_URL}/popular?limit=${limit}` : `${this.API_URL}/popular`;
    return this.http.get<Dish[]>(url);
  }

  rateDish(dishId: string, rating: number) {
    return this.http.post<{ message: string }>(`${this.API_URL}/dish/${dishId}/rate`, { rating });
  }

  getAllDishes() {
    return this.http.get<Dish[]>(this.API_URL);
  }

  getDishById(dishId: string) {
    return this.http.get<Dish>(`${this.API_URL}/dish/${dishId}`);
  }

  getDishesByMenu(menuId: string) {
    return this.http.get<Dish[]>(`${this.API_URL}/menu/${menuId}`);
  }

  createDish(menuId: string, dish: Partial<Dish>) {
    return this.http.post<Dish>(`${this.API_URL}/menu/${menuId}`, dish);
  }

  updateDish(menuId: string, dishId: string, dish: Partial<Dish>) {
    return this.http.put<Dish>(`${this.API_URL}/menu/${menuId}/dish/${dishId}`, dish);
  }

  deleteDish(dishId: string) {
    return this.http.delete<Dish>(`${this.API_URL}/dish/${dishId}`);
  }

}
