import { Component } from '@angular/core';
import {SlideShowComponent} from "../../components/slide-show/slide-show.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {ProductListComponent} from "../../components/product-list/product-list.component";

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    SlideShowComponent,
    CategoriesComponent,
    ProductListComponent
  ],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss'
})
export class ProductListPageComponent {

}
