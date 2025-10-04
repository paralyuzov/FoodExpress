import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly isProduction = window.location.hostname !== 'localhost';
  
  readonly apiUrl = this.isProduction 
    ? 'https://food-delivery-api-ecrq.onrender.com'
    : 'http://localhost:3000';

  get baseApiUrl(): string {
    return this.apiUrl;
  }

  get isProductionMode(): boolean {
    return this.isProduction;
  }
}