import { Component } from '@angular/core';
import {SlideShowComponent} from "../../components/slide-show/slide-show.component";
import {CategoriesComponent} from "../../components/categories/categories.component";
import {ProductListComponent} from "../../components/product-list/product-list.component";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product.model";
import {Category} from "../../models/category.model";

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    SlideShowComponent,
    CategoriesComponent,
    ProductListComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  constructor(private productService: ProductService) {}
  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit() {
    this.products = this.productService.getProducts();
    this.categories = this.productService.getCategories();
  }
}
