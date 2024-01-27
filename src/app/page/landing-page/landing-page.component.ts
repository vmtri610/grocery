import { Component } from '@angular/core';
import {SlideShowComponent} from "../../components/slide-show/slide-show.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {ProductListComponent} from "../../components/product-list/product-list.component";
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SlideShowComponent,
    CategoriesComponent,
    ProductListComponent,
    HeaderComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
