import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ProductService} from "../../services/product.service";
import * as ProductActions from '../actions/product.action';
import {switchMap, of, from, map, catchError} from "rxjs";
import {Product} from "../../models/product.model";

@Injectable()
export class ProductEffect {
  constructor(private actions$: Actions, private productService: ProductService) {}

  addProduct$ = createEffect(() =>
    this.actions$.pipe(ofType(ProductActions.addProduct),
      switchMap((action) => from(this.productService.addProduct(action.product))),
      map(() => ProductActions.addProductSuccess()),
      catchError((error) => {
        return of(ProductActions.addProductFailure({error:error}))}
      )
    )
  );

  getAllProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.getAllProducts),
    switchMap(() => from(this.productService.getAllProducts())),
    map((querySnapshot) => {
      let products = querySnapshot.map((doc) => <Product>doc.data());
      return ProductActions.getAllProductsSuccess({products:products});
    }),
    catchError((error) => {
      return of(ProductActions.getAllProductsFailure({error:error}))}
    )
  ));

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.deleteProduct),
    switchMap((action) => from(this.productService.deleteProduct(action.product))),
    map(() => ProductActions.deleteProductSuccess()),
    catchError((error) => {
      return of(ProductActions.deleteProductFailure({error:error}))}
    )
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.updateProduct),
    switchMap((action) => from(this.productService.updateProduct(action.product))),
    map(() => ProductActions.updateProductSuccess()),
    catchError((error) => {
      return of(ProductActions.updateProductFailure({error:error}))}
    )
  ));

  getById$ = createEffect(() => this.actions$.pipe(
    ofType(ProductActions.getById),
    switchMap((action) => from(this.productService.getById(action.id))),
    map((doc) => {
      let product = <Product>doc.data();
      return ProductActions.getByIdSuccess();
    }),
    catchError((error) => {
      return of(ProductActions.getByIdFailure({error:error}))}
    )
  ));



}
