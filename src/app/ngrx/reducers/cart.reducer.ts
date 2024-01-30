import { CartState } from '../states/cart.state';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.action';
import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model';

const initialState: CartState = {
  cart: <Cart>{},
  isLoading: false,
  error: '',
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addNewCart, (state, { type, cartItem, cartId }) => {
    let newCart = { ...state.cart, products: [cartItem] };
    let newState = { ...state, isLoading: true };
    newState.cart = newCart;
    return newState;
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
  on(CartActions.getAllProductsFromCart, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: true };
  }),
  on(CartActions.getAllProductsFromCartSuccess, (state, { type, products }) => {
    let newState = { ...state, isLoading: false };
    let newCart = { ...state.cart, products: products };
    newState.cart = newCart;
    return newState;
  }),
  on(CartActions.getAllProductsFromCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, isLoading: false, error: error };
  }),
  on(CartActions.deleteCart, (state, { type }) => {
    let newState = { ...state, isLoading: true };
    let newCart = { ...state.cart };
    newCart = <Cart>{};
    newState.cart = newCart;
    return newState;
  }),
  on(CartActions.deleteCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isLoading: false };
  }),
  on(CartActions.deleteCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, isLoading: false, error: error };
  }),
);
