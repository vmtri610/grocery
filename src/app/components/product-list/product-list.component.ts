import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CurrencyPipe, DecimalPipe} from "@angular/common";
import { RouterLink, RouterOutlet} from "@angular/router";
import {Product} from "../../models/product.model";
import {Store} from "@ngrx/store";
import {ProductState} from "../../states/product.state";
import * as ProductActions from "../../actions/product.action";


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe, RouterLink, RouterOutlet, AsyncPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  productState$ = this.store.select('product');
  products$ = this.store.select((state) => state.product.products)

  product: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  }
  constructor(private store: Store<{ product: ProductState }>) {}

  ngOnInit(): void {

    this.productState$.subscribe((state) => {
      console.log(state);
    });

    this.store.dispatch(ProductActions.getAllProducts());

  }

}
