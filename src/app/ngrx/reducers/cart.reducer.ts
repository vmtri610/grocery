import {CartState} from "../states/cart.state";
import {createReducer, on} from "@ngrx/store";
import * as CartActions from "../actions/cart.action";

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
  on(CartActions.addNewCartSuccess, (state) => {
    return {...state, isLoading: false};
  }
  ),
  on(CartActions.addNewCartFailure, (state, action) => {
    return {...state, isLoading: false, error: action.error};
  }
  ),
  on(CartActions.addProductToCart, (state) => {
    return {...state, isLoading: true};
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



