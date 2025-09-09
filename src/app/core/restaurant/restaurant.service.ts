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
}
