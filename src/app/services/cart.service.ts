import { Injectable } from '@angular/core';
import {
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { DocumentData } from '@angular/fire/compat/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private db: Firestore) {}

  async addNewCart(cartItem: CartItem, cartId: string) {
    //   add new cart with cartId and cartItem
    const cartRef = doc(this.db, 'carts', cartId);
    return await setDoc(cartRef, { products: [cartItem] } as Cart);
  }

  async addProductToCart(cartItem: CartItem, cartId: string) {
    const cartRef = doc(this.db, 'carts', cartId);
    const cartSnap = await getDoc(cartRef);
    const cart = cartSnap.data() as Cart;
    const cartItemIndex = cart.products.findIndex(
      (item) => item.product.id === cartItem.product.id
    );
    if (cartItemIndex > -1) {
      cart.products[cartItemIndex].quantity += cartItem.quantity;
    } else {
      cart.products.push(cartItem);
    }
    return await updateDoc(cartRef, cart as DocumentData);
  }

  getAllProductsFromCart(cartId: string) {
    const cartRef = doc(this.db, 'carts', cartId);
    return from(getDoc(cartRef));
  }

  deleteCart(cartId: string) {
    const cartRef = doc(this.db, 'carts', cartId);
    return deleteDoc(cartRef);
  }
}
