import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { select, Store } from '@ngrx/store';
import { ProductState } from '../../ngrx/states/product.state';
import * as ProductActions from '../../ngrx/actions/product.action';
import { CartState } from '../../ngrx/states/cart.state';
import * as CartActions from '../../ngrx/actions/cart.action';
import { UserState } from '../../ngrx/states/user.state';
import { CartItem } from '../../models/cart.model';
import * as CartAction from '../../ngrx/actions/cart.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  productState$ = this.store.select('product');
  cartState$ = this.store.pipe(select('cart', 'cart', 'products'));
  productDetail$ = this.store.select((state) => state.product.products[0]);
  cartId: string = '';
  userId$ = this.store.select('user', 'userId');

  constructor(
    private store: Store<{
      product: ProductState;
      cart: CartState;
      user: UserState;
    }>,
    private activatedRoute: ActivatedRoute,
  ) {}

  productDetail: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  };

  cartItem: CartItem = {
    product: this.productDetail,
    quantity: 1,
  };

  ngOnInit(): void {
    this.subscription.push(
      this.productState$.subscribe((state) => {
        console.log(state);
      }),
    );

    this.subscription.push(
      this.cartState$.subscribe((state) => {
        console.log(state);
      }),
    );

    const productId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(ProductActions.getById({ id: productId }));

    this.subscription.push(
      this.productDetail$.subscribe((product) => {
        if (product !== undefined) {
          this.cartItem.product = { ...product };
          console.log(this.cartItem);
        }
      }),
    );

    this.subscription.push(
      this.userId$.subscribe((userId) => {
        if (userId !== undefined) {
          this.cartId = userId;
          console.log(this.cartId);
        }
      }),
    );
  }

  addToCart(cartItem: CartItem, cartId: string) {
    this.subscription.push(
      this.cartState$.subscribe((cart) => {
        console.log(cart);
        if (cart !== undefined) {
          // Cart đã tồn tại trong Store
          console.log('Cart đã tồn tại trong Store');
          this.store.dispatch(
            CartActions.addProductToCart({
              cartId: cartId,
              cartItem: cartItem,
            }),
          );
        }
        if (!cart) {
          // Cart chưa tồn tại trong Store
          console.log('Cart chưa tồn tại trong Store');
          this.store.dispatch(
            CartAction.addNewCart({
              cartId: cartId,
              cartItem: cartItem,
            }),
          );
        }
      }),
    );
  }

  ngOnDestroy(): void {
    //   unsubscribe
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
