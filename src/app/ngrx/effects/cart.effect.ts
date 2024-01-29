import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../services/cart.service';

import * as CartAction from '../actions/cart.action';
import { catchError, map, of, switchMap } from 'rxjs';
import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model';

@Injectable()
export class CartEffect {
  constructor(
    private actions$: Actions,
    private cartService: CartService,
  ) {}

  addNewCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.addNewCart),
      switchMap((action) =>
        this.cartService.addNewCart(action.cartItem, action.cartId).then(() => {
          return CartAction.addNewCartSuccess();
        }),
      ),
      catchError((error) => of(CartAction.addNewCartFailure({ error }))),
    ),
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.addProductToCart),
      switchMap((action) =>
        this.cartService
          .addProductToCart(action.cartItem, action.cartId)
          .then(() => {
            return CartAction.addProductToCartSuccess();
          }),
      ),
      catchError((error) => of(CartAction.addProductToCartFailure({ error }))),
    ),
  );

  getAllProductsFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.getAllProductsFromCart),
      switchMap((action) =>
        this.cartService.getAllProductsFromCart(action.cartId).then((doc) => {
          const cart = doc.data() as Cart;
          const cartItems = cart.products;
          return CartAction.getAllProductsFromCartSuccess({
            products: cartItems,
          });
        }),
      ),
      catchError((error) =>
        of(CartAction.getAllProductsFromCartFailure({ error })),
      ),
    ),
  );

  deleteCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartAction.deleteCart),
      switchMap((action) =>
        this.cartService.deleteCart(action.cartId).then(() => {
          return CartAction.deleteCartSuccess();
        }),
      ),
      catchError((error) => of(CartAction.deleteCartFailure({ error }))),
    ),
  );
}
