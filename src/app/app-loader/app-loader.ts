import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@Component({
  selector: 'app-app-loader',
  imports: [ProgressSpinnerModule],
  templateUrl: './app-loader.html',
  styleUrl: './app-loader.css',
})
export class AppLoader  {

}
