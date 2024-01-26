import {EventEmitter, Injectable} from '@angular/core';
import {Product} from "../models/product.model";
import {Category} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartChanged = new EventEmitter<void>();
  likeChanged = new EventEmitter<void>();

  viewProduct: Product | undefined
  cart: Product[] = []

  constructor() {   }

  products : Product[] = [
    {
      id: "1",
      name: 'Coffee Beans - Espresso Arabica and Robusta Beans',
      type: 'Lavazza',
      price: 47,
      image: './assets/img/product1.png',
      rate: 4.3,
      quantity: 0,
      liked: false,
    },
    {
      id: "2",
      name: 'Lavazza Coffee Blends - Try the Italian Espresso',
      type: 'Lavazza',
      price: 99.99,
      image: './assets/img/product2.png',
      rate: 3.4,
      quantity: 0,
      liked: false,
    },
    {
      id: "3",
      name: 'Lavazza - Caffè Espresso Black Tin - Ground coffee',
      type: 'Welikecoffee',
      price: 38.65,
      image: './assets/img/product3.png',
      rate: 5.0,
      quantity: 0,
      liked: false,
    },
    {
      id: "4",
      name: 'Qualità Mountain Grown - Espresso Coffee Beans',
      type: 'Welikecoffee',
      price: 53,
      image: './assets/img/product4.png',
      rate: 4.4,
      quantity: 0,
      liked: false,
    },
    {
      id: "5",
      name: 'Lavazza Coffee Blends - Try the Italian Espresso',
      type: 'Lavazza',
      price: 99.99,
      image: './assets/img/product2.png',
      rate: 3.4,
      quantity: 0,
      liked: false,
    },
    {
      id: "6",
      name: 'Qualità Mountain Grown - Espresso Coffee Beans',
      type: 'Welikecoffee',
      price: 53,
      image: './assets/img/product3.png',
      rate: 4.4,
      quantity: 0,
      liked: false,
    },
    {
      id: "7",
      name: 'Coffee Beans - Espresso Arabica and Robusta Beans',
      type: 'Lavazza',
      price: 47,
      image: './assets/img/product1.png',
      rate: 4.3,
      quantity: 0,
      liked: false,
    },
    {
      id: "8",
      name: 'Lavazza - Caffè Espresso Black Tin - Ground coffee',
      type: 'Welikecoffee',
      price: 38.65,
      image: './assets/img/product3.png',
      rate: 5.0,
      quantity: 0,
      liked: false,
    },
    {
      id: "9",
      name: 'Lavazza Coffee Blends - Try the Italian Espresso',
      type: 'Lavazza',
      price: 99.99,
      image: './assets/img/product2.png',
      rate: 3.4,
      quantity: 0,
      liked: false,
    },
    {
      id: "10",
      name: 'Qualità Mountain Grown - Espresso Coffee Beans',
      type: 'Welikecoffee',
      price: 53,
      image: './assets/img/product4.png',
      rate: 4.4,
      quantity: 0,
      liked: false,
    },
  ]
  categories : Category[] = [
    {
      id: 1,
      description: 'New sumatra mandeling coffe blend',
      image: './assets/img/cat1.png',
      minPrice: 24,
      maxPrice: 150,
    },
    {
      id: 2,
      description: 'Espresso arabica and robusta beans',
      image: './assets/img/cat2.png',
      minPrice: 32,
      maxPrice: 160,
    },
    {
      id: 3,
      description: 'Lavazza top class whole bean coffee blend',
      image: './assets/img/cat3.png',
      minPrice: 37,
      maxPrice: 160,
    },
  ]

  getProducts(): Product[] {
    return this.products;
  }

  getCategories(): Category[] {
    return this.categories;
  }

  getViewedProducts(product: Product): void {
    this.viewProduct = product;
  }

  addToCart(product: Product | undefined): void {
    if (product && !this.cart.includes(product)) {
      console.log(product)
      this.cart.push(product);
      this.cartChanged.emit();
      this.totalQuantity();
    }
  }

  getCartProducts(): Product[] {
    return this.cart;
  }

  getCartTotal(): number {
    let total = 0;
    this.cart.forEach((product) => {
      total += product.price*product.quantity;
    });
    return total;
  }

  addQuantity(product: Product): void {
    product.quantity += 1;
  }

  removeQuantity(product: Product): void {
    if (product.quantity >= 0) {
      product.quantity -= 1;
    }
    if (product.quantity === 0) {
      this.removeProduct(product);
    }
    this.cartChanged.emit();
    this.totalQuantity();
  }

  totalQuantity(): number {
    return this.cart.length;
  }

  public removeProduct(product: Product) {
    this.getCartTotal()
    this.cart = this.cart.filter((item) => {
      return item.id !== product.id;
    });
    this.cartChanged.emit();
    this.totalQuantity();

  }

  isLiked(product: Product): void {
    product.liked = !product.liked;
    this.likeChanged.emit();
    this.totalLikeProducts();
  }

  totalLikeProducts(): number {
    let count = 0;
    this.products.forEach((product) => {
      if (product.liked) {
        count += 1;
      }
    });
    return count;
  }

  shippingFee(): number {
    if (this.getCartProducts().length > 0) {
      return 10
    } else {
      return 0
    }
  }

}
