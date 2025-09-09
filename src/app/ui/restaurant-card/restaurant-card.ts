import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Restaurant } from '../../../models';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurant-card',
  imports: [DecimalPipe, RouterModule],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css'
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>();
}
