import {CartState} from "../states/cart.state";
import {createReducer, on} from "@ngrx/store";
import * as CartActions from "../actions/cart.action";
import {Product} from "../../models/product.model";

const initialState: CartState = {
  carts: [],
  isLoading: false,
  error: '',
};

export const cartReducer = createReducer(initialState,
  on(CartActions.addNewCart, (state) => {
    return {...state, isLoading: true};
  }
  ),
  on(CartActions.addNewCartSuccess, (state, {cart}) => {
    let newCarts = [...state.carts, cart];
    return {...state, isLoading: false, carts: newCarts};
  }
  ),
  on(CartActions.addNewCartFailure, (state, action) => {
    return {...state, isLoading: false, error: action.error};
  }
  ),
  on(CartActions.addProductToCart, (state, {cartId , product , quantity }) => {
    let newCarts = [...state.carts];
    let cart = newCarts[0];
    let productIndex = cart.products.findIndex(p => p.product.id === product.id);
    if (productIndex === -1) {
      cart.products.push({product: product, quantity: quantity});
    } else {
      cart.products[productIndex].quantity += quantity;
    }
    return {...state, isLoading: true, carts: newCarts};
  }
  ),
  on(CartActions.addProductToCartSuccess, (state) => {
    return {...state, isLoading: false};
  }
  ),
  on(CartActions.addProductToCartFailure, (state, action) => {
    return {...state, isLoading: false, error: action.error};
  }
  ),
);



