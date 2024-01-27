import {Component, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";
import {CurrencyPipe} from "@angular/common";
import {RouterLink, RouterLinkActive, ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product.model";
import {Store} from "@ngrx/store";
import {ProductState} from "../../states/product.state";
import * as ProductActions from "../../actions/product.action";


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    CurrencyPipe,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{

  productState$ = this.store.select('product');

  product: Product | null = null;
  constructor(private store: Store<{ product: ProductState }>, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.productState$.subscribe((state) => {
      console.log(state);
    });

    this.activatedRoute.params.subscribe((params) => {
      const productId = params['id'];

      // Dispatch action khi đã có productId từ URL
      this.store.dispatch(ProductActions.getById(productId));
    });

    this.store.select('product').subscribe((product) => {
      this.product = {
        id: product.id,
        name: product.name,
        type: product.type,
        price: product.price,
        image: product.image,
        rate: product.rate,
        quantity: product.quantity,
      };
    });

  }

}
