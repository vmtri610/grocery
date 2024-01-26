import {Component, OnInit} from '@angular/core';
import {UserManagementService} from "../../../services/user-management.service";
import {User} from "../../../models/user.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Product} from "../../../models/product.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";
import {ProductManagementService} from "../../../services/product-management.service";
import {ProductService} from "../../../services/product.service";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit{

  productList : Product[] = [];

  id: string= '';
  name: string= '';
  type: string= '';
  price: number= 0;
  image: string= '';
  rate: number= 0;
  quantity: number = 0;
  liked: boolean = false;

  productObj:Product = {
    id: this.id,
    name: this.name,
    type: this.type,
    price: this.price,
    image: this.image,
    rate: this.rate,
    quantity: this.quantity,
    liked: this.liked
  }

  constructor(private productManagementService :ProductManagementService, private productService: ProductService) { }

  isAccepted: boolean = false;
  isActive: boolean = false;
  toggleAdd() {
    this.isAccepted = !this.isAccepted;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  toggleView(product: Product) {
    this.toggleActive()
    this.id = product.id;
    this.name = product.name;
    this.type = product.type;
    this.price = product.price;
    this.image = product.image;
    this.rate = product.rate;
    this.quantity = product.quantity;
    this.liked = product.liked;
    this.productObj = product;
  }

  updateProduct() {
    this.productObj.id = this.id;
    this.productObj.name = this.name;
    this.productObj.type = this.type;
    this.productObj.price = this.price;
    this.productObj.image = this.image;
    this.productObj.rate = this.rate;
    this.productObj.quantity = this.quantity;
    this.productObj.liked = this.liked;
    this.productManagementService.updateProduct(this.productObj).then();
  }

  deleteProduct() {
    this.productManagementService.deleteProduct(this.productObj).then();
  }
  resetForm() {
    this.id = '';
    this.name = '';
    this.type = '';
    this.price = 0;
    this.image = '';
    this.rate = 0;
    this.quantity = 0;
    this.liked = false;
  }



  ngOnInit(): void
  {
    this.productManagementService.getAllProduct().then(() => {
      this.productList = this.productManagementService.prodList.map((userData: DocumentData) => {
        return {
          id: userData['id'] as string,
          name: userData['name'] as string,
          type: userData['type'] as string,
          price: userData['price'] as number,
          image: userData['image'] as string,
          rate: userData['rate'] as number,
          quantity: userData['quantity'] as number,
          liked: userData['liked'] as boolean
        };
      });
    });


  }

  addProduct() {
    this.productObj.id = this.id;
    this.productObj.name = this.name;
    this.productObj.type = this.type;
    this.productObj.price = this.price;
    this.productObj.image = this.image;
    this.productObj.rate = this.rate;
    this.productObj.quantity = this.quantity;
    this.productObj.liked = this.liked;
    this.productManagementService.addProduct(this.productObj).then();
    this.resetForm();
  }
}
