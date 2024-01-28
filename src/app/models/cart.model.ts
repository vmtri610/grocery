import { Product } from './product.model';

export interface Cart {
  id: string;
  products: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
