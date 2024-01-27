import {Product} from "./product.model";

export interface Cart {
  cartId: string;
  userId: string;
  products :[{
    product: Product;
    quantity: number;
  }]
}


