import {Component, Input} from '@angular/core';
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {ProductDetailComponent} from "../../components/product-detail/product-detail.component";
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ProductDetailComponent
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  constructor(private productService: ProductService) { }

}
