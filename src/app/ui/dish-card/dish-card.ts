import { Component, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Dish } from '../../../models';

@Component({
  selector: 'app-dish-card',
  imports: [DecimalPipe],
  templateUrl: './dish-card.html',
  styleUrl: './dish-card.css'
})
export class DishCard {
  dish = input.required<Dish>();
}
