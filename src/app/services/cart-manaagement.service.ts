import { Injectable } from '@angular/core';
import { DocumentData} from "@angular/fire/compat/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc, getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {Product} from "../models/product.model";
import {Cart} from "../models/cart.model";

@Injectable({
  providedIn: 'root'
})
export class CartManaagementService {

  prodList :DocumentData[] = [];
  constructor(private firestore:Firestore) {}

  async addCart(cart: Cart) {
    const userCollection = collection(this.firestore, 'carts');
    const docRef = await addDoc(userCollection, cart);
    cart.id = docRef.id;
    const productDocRef = doc(userCollection, docRef.id);
    await setDoc(productDocRef, cart);
  }

  async getAllCart(){
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'carts'));
      this.prodList = [];

      querySnapshot.forEach((doc) => {
        this.prodList.push(doc.data());
      });

      console.log(this.prodList);
      console.log("get all carts");
    } catch (error) {
      console.error('Error getting carts:', error);
    }
  }

  async updateCart(cart:DocumentData){
    await updateDoc(doc(this.firestore, 'carts', cart['id']), cart);
  }

  async deleteCart(cart:DocumentData){
    await deleteDoc(doc(this.firestore, 'carts', cart['id']));
  }

  cartView: Cart[] = [];
  productView: Product[] = [];

  async getCart(cart: Cart) {
    try {
      const productCollection = collection(this.firestore, 'carts');
      const querySnapshot = await getDocs(productCollection);

      this.cartView = [];
      this.productView = [];

      querySnapshot.forEach((doc) => {
        const cartData = doc.data() as Cart;
        cartData.id = doc.id;

        if (cartData.isView === cart.isView) {
          this.productView.push(cartData.product.product as Product);
          this.cartView.push(cartData);
        }
      });
      console.log(this.productView[0]);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }
}
