import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Product } from '../../models/product.model';
import { Store } from '@ngrx/store';
import { ProductState } from '../../ngrx/states/product.state';
import * as ProductActions from '../../ngrx/actions/product.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, RouterLink, RouterOutlet, AsyncPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  productState$ = this.store.select('product');
  products$ = this.store.select((state) => state.product.products);
  viewProduct: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  };

  product: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  };

  constructor(
    private store: Store<{ product: ProductState }>,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription.push(
      this.productState$.subscribe((state) => {
        if (state.error) {
          alert(state.error);
        }
      }),
    );

    this.store.dispatch(ProductActions.getAllProducts());
  }

  viewDetail(product: Product) {
    this.viewProduct = { ...product };
    this.router.navigate(['home/detail', this.viewProduct.id]).then();
  }

  ngOnDestroy(): void {
    this.subscription.map((subscription) => subscription.unsubscribe());
  }
}
