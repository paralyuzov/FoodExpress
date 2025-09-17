import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private readonly API_URL = 'http://localhost:3000/dishes';
  private http = inject(HttpClient);

  rateDish(dishId: string, rating: number) {
    return this.http.post<{ message: string }>(`${this.API_URL}/${dishId}/rate`, { rating });
  }

}
