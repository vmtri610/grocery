import { Component, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartState } from '../../ngrx/states/cart.state';
import { UserState } from '../../ngrx/states/user.state';
import { CartItem } from '../../models/cart.model';
import * as CartActions from '../../ngrx/actions/cart.action';
import { ProductState } from '../../ngrx/states/product.state';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterLink, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnInit {
  cartState$ = this.store.select('cart');
  cartItems: CartItem[] = [];
  cartId: string = '';
  userId$ = this.store.select('user', 'userId');

  constructor(
    private store: Store<{
      cart: CartState;
      user: UserState;
    }>,
  ) {}

  ngOnInit(): void {
    this.userId$.subscribe((userId) => {
      if (userId) {
        this.store.dispatch(
          CartActions.getAllProductsFromCart({ cartId: userId }),
        );
      }
    });
    this.cartState$.subscribe((state) => {
      console.log(state);
    });

    this.cartState$.subscribe((state) => {
      this.cartItems = state.cart.products;
    });
  }
}
