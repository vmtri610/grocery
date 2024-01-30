import { Product } from './product.model';

export interface Cart {
  id: string;
  products: CartItem[];
  total: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
