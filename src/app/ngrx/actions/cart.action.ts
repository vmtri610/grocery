import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';
import { Cart, CartItem } from '../../models/cart.model';

export const addNewCart = createAction(
  '[Cart] Create New Cart',
  props<{ cartItem: CartItem; cartId: string }>()
);
export const addNewCartSuccess = createAction('[Cart] Create New Cart Success');

export const addNewCartFailure = createAction(
  '[Cart] Create New Cart Failure',
  props<{ error: string }>()
);

export const addProductToCart = createAction(
  '[Cart] Add Product To Cart',
  props<{ cartItem: CartItem; cartId: string }>()
);
export const addProductToCartSuccess = createAction(
  '[Cart] Add Product To Cart Success'
);
export const addProductToCartFailure = createAction(
  '[Cart] Add Product To Cart Failure',
  props<{ error: string }>()
);

export const getAllProductsFromCart = createAction(
  '[Cart] Get All Products From Cart',
  props<{ cartId: string }>()
);
export const getAllProductsFromCartSuccess = createAction(
  '[Cart] Get All Products From Cart Success',
  props<{ products: CartItem[] }>()
);
export const getAllProductsFromCartFailure = createAction(
  '[Cart] Get All Products From Cart Failure',
  props<{ error: string }>()
);

export const deleteCart = createAction(
  '[Cart] Delete Cart',
  props<{ cartId: string }>()
);
export const deleteCartSuccess = createAction('[Cart] Delete Cart Success');
export const deleteCartFailure = createAction(
  '[Cart] Delete Cart Failure',
  props<{ error: string }>()
);

export const clearStates = createAction('[Cart] Clear States');
