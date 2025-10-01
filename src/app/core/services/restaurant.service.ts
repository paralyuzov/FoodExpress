import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Restaurant } from '../../../models/index';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly API_URL = 'http://localhost:3000/restaurants';

  private http = inject(HttpClient);

  getRestaurants() : Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(this.API_URL);
  }

  getRestaurantById(id:string) : Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.API_URL}/${id}`);
  }

  rateRestaurant(rating:number, restaurantId:string) {
    return this.http.post<{ message: string }>(`${this.API_URL}/${restaurantId}/rate`, { rating });
  }

  getMostPopularRestaurants(limit?:number) : Observable<Restaurant[]> {
    const url = limit ? `${this.API_URL}/popular?limit=${limit}` : `${this.API_URL}/popular`;
    return this.http.get<Restaurant[]>(url);
  }

  createRestaurant(restaurant: Partial<Restaurant>) : Observable<Restaurant> {
    console.log(restaurant)
    return this.http.post<Restaurant>(this.API_URL, restaurant);
  }

  editRestaurant(restaurantId: string, restaurant: Partial<Restaurant>) : Observable<Restaurant> {
    return this.http.put<Restaurant>(`${this.API_URL}/${restaurantId}`, restaurant);
  }

  deleteRestaurant(restaurantId: string) : Observable<Restaurant> {
    return this.http.delete<Restaurant>(`${this.API_URL}/${restaurantId}`);
  }
}
