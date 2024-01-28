import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../services/cart.service';

import * as CartAction from '../actions/cart.action';
import { catchError, map, of, switchMap } from 'rxjs';

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
        this.cartService.addNewCart(action.cart).then(() => {
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
}
