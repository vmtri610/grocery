import { Injectable } from '@angular/core';
import {addDoc, collection, doc, Firestore, getDoc, setDoc, updateDoc} from "@angular/fire/firestore";
import {Cart} from "../models/cart.model";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: Firestore) { }

  async addNewCart(cart: Cart) {
      const docRef = await addDoc(collection(this.db, 'carts'), cart);
      const cartId = docRef.id;
      await setDoc(doc(this.db, 'carts', cartId), {id: cartId}, {merge: true});
      return getDoc(doc(this.db, 'carts', cartId));
  }

  async addProductToCart(cartId: string, product: Product, quantity: number) {
    // Lấy giỏ hàng hiện có từ Firestore bằng cartId
    const cartRef = doc(this.db, 'carts', cartId);
    const cartDoc = await getDoc(cartRef);

    if (cartDoc.exists()) {
      const cartData = cartDoc.data();

      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
      const existingProductIndex = cartData['products'].findIndex(
        (item: any) => item.product.id === product.id
      );

      if (existingProductIndex !== -1) {
        // Nếu sản phẩm đã tồn tại, tăng số lượng lên
        const updatedCart = [...cartData['products']];
        updatedCart[existingProductIndex].quantity += quantity;

        // Cập nhật lại giỏ hàng trong Firestore
        await updateDoc(cartRef, { products: updatedCart });
      } else {
        // Nếu sản phẩm chưa tồn tại, thêm nó vào giỏ hàng
        const updatedCart = [
          ...cartData['products'],
          {
            product: product,
            quantity: quantity,
          },
        ];

        // Cập nhật lại giỏ hàng trong Firestore
        await updateDoc(cartRef, { products: updatedCart });
      }
    } else {
      // Nếu giỏ hàng không tồn tại, bạn có thể xử lý tùy ý (ví dụ: tạo giỏ hàng mới)
      console.log('Giỏ hàng không tồn tại.');
    }
    return getDoc(cartRef);
  }




}
