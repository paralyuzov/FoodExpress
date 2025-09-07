import { Component } from '@angular/core';
import { HeroSection } from "../ui/hero-section/hero-section";
import { MainSection } from "../ui/main-section/main-section";

@Component({
  selector: 'app-home',
  imports: [ HeroSection, MainSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
