import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { CartState } from '../../ngrx/states/cart.state';
import { UserState } from '../../ngrx/states/user.state';
import { CartItem } from '../../models/cart.model';
import * as CartActions from '../../ngrx/actions/cart.action';
import * as UserActions from '../../ngrx/actions/user.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [BreadcrumbsComponent, RouterLink, CurrencyPipe],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
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

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(
      this.userId$.subscribe((userId) => {
        if (userId) {
          this.cartId = userId;
          this.store.dispatch(
            CartActions.getAllProductsFromCart({ cartId: userId }),
          );
        }
      }),
    );
    this.subscription.push(
      this.cartState$.subscribe((state) => {
        this.cartItems = state.cart.products;
      }),
    );

    this.subscription.push(
      this.cartState$.subscribe((state) => {
        this.cartItems = state.cart.products;
      }),
    );
  }

  out() {
    this.userId$.subscribe((userId) => {
      if (userId) {
        this.store.dispatch(CartActions.deleteCart({ cartId: userId }));
      }
    });
    this.store.dispatch(UserActions.deleteUserInStore());
  }
}
