import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AsyncPipe, NgClass} from "@angular/common";
import {Store} from "@ngrx/store";
import {ProductState} from "../../../ngrx/states/product.state";
import * as ProductActions from "../../../ngrx/actions/product.action";
import {Product} from "../../../models/product.model";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    AsyncPipe
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent  implements OnInit{

  productState$ = this.store.select('product');
  products$ = this.store.select((state) => state.product.products)
  productView: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  }
  product: Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
}

  constructor(private store: Store<{ product: ProductState }>) {}

  ngOnInit(): void {

    this.productState$.subscribe((state) => {
      console.log(state);
    });

    this.store.dispatch(ProductActions.getAllProducts());

  }

  addNew() {
    this.store.dispatch(ProductActions.addProduct({product: this.product}));
    this.resetForm()
  }

  resetForm() {
    this.product = {
      id: '',
      name: '',
      type: '',
      price: 0,
      image: '',
      rate: 0,
      quantity: 0,
    }
  }

  viewProduct(product: Product) {
    this.productView = {...product};
  }

  deleteProduct() {
    this.store.dispatch(ProductActions.deleteProduct({product: this.productView}));
    this.store.dispatch(ProductActions.getAllProducts());
  }

  updateProduct() {
    this.store.dispatch(ProductActions.updateProduct({product: this.productView}));
    this.store.dispatch(ProductActions.getAllProducts());
  }

  isAccepted: boolean = false;
  isActive: boolean = false;

  toggleAdd() {
    this.isAccepted = !this.isAccepted;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

}
