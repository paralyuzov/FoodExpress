import { Component } from '@angular/core';
import { Nav } from "../ui/nav/nav";
import { HeroSection } from "../ui/hero-section/hero-section";
import { MainSection } from "../ui/main-section/main-section";
import { Footer } from "../ui/footer/footer";

@Component({
  selector: 'app-home',
  imports: [Nav, HeroSection, MainSection, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
