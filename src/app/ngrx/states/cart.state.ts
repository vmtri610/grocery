import {Cart} from "../../models/cart.model";


export interface CartState {
  carts: Cart[];
  isLoading: boolean;
  error: string;
}
