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

@Injectable({
  providedIn: 'root'
})
export class ProductManagementService {
  prodList :DocumentData[] = [];
  constructor(private firestore:Firestore) {}

  async addProduct(product: Product) {
    const userCollection = collection(this.firestore, 'products');

    // Sử dụng addDoc để thêm sản phẩm vào Firestore và lấy ID đã tạo
    const docRef = await addDoc(userCollection, product);

    // Đặt giá trị trường 'id' trong sản phẩm bằng ID đã tạo trong Firestore
    product.id = docRef.id;
    const productDocRef = doc(userCollection, docRef.id);
    await setDoc(productDocRef, product);
  }

  async getAllProduct(){
    try {
      const querySnapshot = await getDocs(collection(this.firestore, 'products'));
      this.prodList = [];

      querySnapshot.forEach((doc) => {
        this.prodList.push(doc.data());
      });

      console.log(this.prodList);
      console.log("get all products");
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }

  async updateProduct(product:DocumentData){
    await updateDoc(doc(this.firestore, 'products', product['id']), product);
  }

  async deleteProduct(product:DocumentData){
    await deleteDoc(doc(this.firestore, 'products', product['id']));
  }

  productView: Product[] = [];
  async getProductByNameAndType(product: Product) {
    try {
      const productCollection = collection(this.firestore, 'products');
      const querySnapshot = await getDocs(productCollection);

      this.productView = []; // Xóa danh sách sản phẩm cũ trước khi thêm mới

      querySnapshot.forEach((doc) => {
        const productData = doc.data() as Product;
        productData.id = doc.id;

        if (productData.name === product.name && productData.type === product.type) {
          this.productView.push(productData);
        }
      });
      console.log(this.productView);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }

  }
