import { CartState } from '../states/cart.state';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.action';
import { Product } from '../../models/product.model';
import { Cart } from '../../models/cart.model';

const initialState: CartState = {
  cart: <Cart>{},
  isLoading: false,
  error: '',
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addNewCart, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: true };
  }),
  on(CartActions.addNewCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: false };
  }),
  on(CartActions.addNewCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, isLoading: false, error: error };
  }),

  on(CartActions.addProductToCart, (state, { type, cartItem }) => {
    console.log(type);
    return { ...state, isLoading: true };
  }),
  on(CartActions.addProductToCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: false };
  }),
  on(CartActions.addProductToCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, isLoading: false, error: error };
  }),
);
