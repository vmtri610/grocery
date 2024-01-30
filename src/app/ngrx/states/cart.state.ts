import { Cart } from '../../models/cart.model';

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  isDeleting: boolean;
  error: string;
}
