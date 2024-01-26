import {Product} from "./product.model";

export interface Cart {
  id: string;
  isView: boolean;
  product :{
    product: Product;
    quantity: number;
}
}


