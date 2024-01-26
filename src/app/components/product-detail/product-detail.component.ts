import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";
import {Product} from "../../models/product.model";
import {CurrencyPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductManagementService} from "../../services/product-management.service";
import {CartManaagementService} from "../../services/cart-manaagement.service";

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{
  product = this.cartManagementService.productView[0]


  constructor(private productService: ProductService, private productManagementService: ProductManagementService,
              private cartManagementService: CartManaagementService)
  {}

  buyProduct(product: Product | undefined) {
    this.productService.addToCart(product);
    if (product) {
      this.productService.addQuantity(product)
    }
  }

  liked(product: Product | undefined) {
    if (product) {
      this.product.liked = !this.product.liked;
      this.productManagementService.updateProduct(product).then();
    }
  }

  ngOnInit(): void {
    console.log(this.product)
  }
}
