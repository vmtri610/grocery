import { Component } from '@angular/core';
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {ProductDetailComponent} from "../../components/product-detail/product-detail.component";

@Component({
  selector: 'app-product-detail-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ProductDetailComponent
  ],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss'
})
export class ProductDetailPageComponent {

}
