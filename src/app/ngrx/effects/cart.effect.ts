import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {CartService} from "../../services/cart.service";
import {switchMap, of, from, map, catchError} from "rxjs";
import * as CartActions from '../actions/cart.action';
import {Cart} from "../../models/cart.model";


@Injectable()
export class CartEffect {

  constructor(private actions$: Actions, private cartService: CartService) {}

  addNewCart$ = createEffect(() =>
    this.actions$.pipe(ofType(CartActions.addNewCart),
      switchMap((action) => from(this.cartService.addNewCart(action.cart))),
      map((querySnapshot) => {
        let cart = <Cart>querySnapshot.data();
        return CartActions.addNewCartSuccess({cart:cart})
      }),
      catchError((error) => {
        return of(CartActions.addNewCartFailure({error:error}))}
      )
    )
  );

  addProductToCart$ = createEffect(() =>
    this.actions$.pipe(ofType(CartActions.addProductToCart),
      switchMap((action) => from(this.cartService.addProductToCart(action.cartId, action.product, action.quantity))),
      map((querySnapshot) => {
        let cart = <Cart>querySnapshot.data();
        return CartActions.addProductToCartSuccess({cart:cart})
      }),
      catchError((error) => {
        return of(CartActions.addProductToCartFailure({error:error}))}
      )
    )
  );





}
