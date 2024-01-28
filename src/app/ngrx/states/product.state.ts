import { Product } from '../../models/product.model';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string;
}
