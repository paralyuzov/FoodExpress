import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Restaurant } from '../../../models';
import { RouterModule } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-restaurant-card',
  imports: [DecimalPipe, RouterModule, RatingModule, NgOptimizedImage],
  templateUrl: './restaurant-card.html',
  styleUrl: './restaurant-card.css',
})
export class RestaurantCard {
  restaurant = input.required<Restaurant>();
}
