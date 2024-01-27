import {ProductState} from "../states/product.state";
import {createReducer, on} from "@ngrx/store";
import * as ProductActions from "../actions/product.action";

const initialState: ProductState = {
    products: [],
    isLoading: false,
    error: '',
};

export const productReducer = createReducer(initialState,
    on(ProductActions.addProduct, (state, {product}) => ({
        ...state,
        isLoading: true
    })),
    on(ProductActions.addProductSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(ProductActions.addProductFailure, (state, {error}) => ({
        ...state,
        error: error,
        isLoading: false
    })),
    on(ProductActions.getAllProducts, (state) => ({
        ...state,
        isLoading: true
    })),
    on(ProductActions.getAllProductsSuccess, (state, {products}) => ({
        ...state,
        products: products,
        isLoading: false
    })),
    on(ProductActions.getAllProductsFailure, (state, {error}) => ({
        ...state,
        error: error,
        isLoading: false
    })),
    on(ProductActions.deleteProduct, (state) => ({
        ...state,
        isLoading: true
    })),
    on(ProductActions.deleteProductSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(ProductActions.deleteProductFailure, (state, {error}) => ({
        ...state,
        error: error,
        isLoading: false
    })),
    on(ProductActions.updateProduct, (state, { product }) => {
      const updatedProducts = [...state.products];

      const index = updatedProducts.findIndex((p) => p.id === product.id);

      if (index !== -1) {
        updatedProducts[index] = product;
      }

      return { ...state, products: updatedProducts, isLoading: true };
    }),
    on(ProductActions.updateProductSuccess, (state) => ({
        ...state,
        isLoading: false
    })),
    on(ProductActions.updateProductFailure, (state, {error}) => ({
        ...state,
        error: error,
        isLoading: false
    })),
);
