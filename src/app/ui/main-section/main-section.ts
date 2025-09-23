import { Component, input, signal, computed, effect } from '@angular/core';
import { Dish, Restaurant } from '../../../models';
import { RouterModule } from '@angular/router';
import { Carousel } from 'primeng/carousel';
import { Rating } from 'primeng/rating';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-main-section',
  imports: [RouterModule, Carousel, Rating,FormsModule],
  templateUrl: './main-section.html',
  styleUrl: './main-section.css',
})
export class MainSection {
  dishes = input.required<Dish[]>();
  loadingDishes = input.required<boolean>();

  restaurants = input.required<Restaurant[]>();
  loadingRestaurants = input.required<boolean>();
}
