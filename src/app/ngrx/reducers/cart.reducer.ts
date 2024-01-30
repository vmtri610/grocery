import { CartState } from '../states/cart.state';
import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.action';
import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model';

const initialState: CartState = {
  cart: <Cart>{},

  isGetting: false,
  isGetSuccess: false,
  getErrorMessage: '',

  isDeleting: false,
  isDeleteSuccess: false,
  deleteErrorMessage: '',

  isCreating: false,
  isCreateSuccess: false,
  createErrorMessage: '',

  isAdding: false,
  isAddSuccess: false,
  addErrorMessage: '',
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addNewCart, (state, { type, cartItem, cartId }) => {
    console.log(type);
    return { ...state, isCreating: false };
  }),
  on(CartActions.addNewCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isCreateSuccess: true, isCreating: true };
  }),
  on(CartActions.addNewCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, createErrorMessage: error };
  }),

  on(CartActions.addProductToCart, (state, { type, cartItem }) => {
    console.log(type);
    return { ...state, isAdding: false };
  }),
  on(CartActions.addProductToCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isAddSuccess: true };
  }),
  on(CartActions.addProductToCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, addErrorMessage: error };
  }),
  on(CartActions.getAllProductsFromCart, (state, { type }) => {
    console.log(type);
    return { ...state, isGetting: false };
  }),
  on(CartActions.getAllProductsFromCartSuccess, (state, { type, products }) => {
    let newState = { ...state, isGetting: true };
    let newCart = { ...state.cart, products: products };
    newState.cart = newCart;
    return newState;
  }),
  on(CartActions.getAllProductsFromCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, getErrorMessage: error };
  }),

  on(CartActions.deleteCart, (state, { type }) => {
    console.log(type);
    return { ...state, isDeleting: false };
  }),
  on(CartActions.deleteCartSuccess, (state, { type }) => {
    console.log(type);
    return { ...state, isDeleting: true };
  }),
  on(CartActions.deleteCartFailure, (state, { type, error }) => {
    console.log(type);
    return { ...state, deleteErrorMessage: error };
  }),

  on(CartActions.clearStates, (state) => {
    return {
      ...state,
      cart: <Cart>{},

      isGetting: false,
      isGetSuccess: false,
      getErrorMessage: '',

      isDeleting: false,
      isDeleteSuccess: false,
      deleteErrorMessage: '',

      isCreating: false,
      isCreateSuccess: false,
      createErrorMessage: '',

      isAdding: false,
      isAddSuccess: false,
      addErrorMessage: '',
    };
  }),
);
