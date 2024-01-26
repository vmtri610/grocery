import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {CurrencyPipe, DecimalPipe} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {ProductManagementService} from "../../services/product-management.service";
import {DocumentData} from "@angular/fire/compat/firestore";
import {CartManaagementService} from "../../services/cart-manaagement.service";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    DecimalPipe, RouterLink
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{

  productList : Product[] = [];
  // @Input() product!: Product[];
  constructor(private productService: ProductService, private productManagementService: ProductManagementService,
              private cartManagementService: CartManaagementService) { }


  liked(product: Product) {
    product.liked = !product.liked;
    this.productManagementService.updateProduct(product).then();
  }

  view(product: Product) {
    this.cartManagementService.addCart({
      id: ' ',
      isView: true,
      product: {
        product: product,
        quantity: 0,
      }
    }).then();
    this.cartManagementService.getCart(
      {
        id: ' ',
        isView: true,
        product: {
          product: product,
          quantity: 0,
        }
      }
    ).then()
  }

  ngOnInit(): void {
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
    })
  }
}
