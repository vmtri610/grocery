import {Component, OnInit} from '@angular/core';
import {BreadcrumbsComponent} from "../breadcrumbs/breadcrumbs.component";
import {AsyncPipe, CurrencyPipe} from "@angular/common";
import {RouterLink, RouterLinkActive, ActivatedRoute} from "@angular/router";
import {Product} from "../../models/product.model";
import {Store} from "@ngrx/store";
import {ProductState} from "../../ngrx/states/product.state";
import * as ProductActions from "../../ngrx/actions/product.action";
import {CartState} from "../../ngrx/states/cart.state";
import * as CartActions from "../../ngrx/actions/cart.action";
import {UserState} from "../../ngrx/states/user.state";
import * as UserActions from "../../ngrx/actions/user.action";


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit{

  productState$ = this.store.select('product');
  cartState$ = this.store.select('cart');
  productDetail$ = this.store.select((state) => state.product.products[0])
  cartId: string = '';

  constructor(private store: Store<{ product: ProductState, cart: CartState, user: UserState }>, private activatedRoute: ActivatedRoute) {
  }

  productDetail: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  };

  ngOnInit(): void {

    this.productState$.subscribe((state) => {
      console.log(state);
    });

    this.cartState$.subscribe((state) => {
      console.log(state);
    });

    const productId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(ProductActions.getById({id: productId}));
    this.productDetail$.subscribe((product) => {
      this.productDetail = product;
    });
  }



}
