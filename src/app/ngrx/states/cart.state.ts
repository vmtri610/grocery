import { Cart } from '../../models/cart.model';

export interface CartState {
  cart: Cart;
  isLoading: boolean;
  error: string;
}
