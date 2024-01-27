import {Injectable} from '@angular/core';
import {Product} from "../models/product.model";
import {
  addDoc,
  collection,
  collectionSnapshots, deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: Firestore) {}

  async addProduct(product: Product) {
    const docRef = await addDoc(collection(this.db, 'products'), product);
    const productId = docRef.id;
    return await setDoc(doc(this.db, 'products', productId), {id: productId}, {merge: true});
  }

  getAllProducts() {
    return collectionSnapshots(collection(this.db, 'products'));
    // return getDocs(collection(this.db, 'products'));
  }

  deleteProduct(product: Product) {
    const productDocRef = doc(this.db, 'products', product.id);
    return deleteDoc(productDocRef);
  }

  updateProduct(product: Product) {
    const productDocRef = doc(this.db, 'products', product.id);
    return setDoc(productDocRef, product);
  }

  getById(id: string) {
    const productDocRef = doc(this.db, 'products', id);
    return getDoc(productDocRef);
  }
}
