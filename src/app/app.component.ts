import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import {Component, OnInit} from '@angular/core';
import {SharedModule} from "./shared/shared.module";
import {NavbarComponent} from "./components/admin/navbar/navbar.component";
import {TableComponent} from "./components/admin/table/table.component";
import {ProductInfoComponent} from "./components/admin/product-info/product-info.component";
import {SignUpPageComponent} from "./page/sign-up-page/sign-up-page.component";
import {Auth, getAuth, onAuthStateChanged, user} from "@angular/fire/auth";
import {Store} from "@ngrx/store";
import {CartState} from "./ngrx/states/cart.state";
import * as CartAction from "./ngrx/actions/cart.action";
import * as UserAction from "./ngrx/actions/user.action";
import {Product} from "./models/product.model";
import {UserState} from "./ngrx/states/user.state";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NavbarComponent, TableComponent, TuiRootModule, TuiDialogModule, TuiAlertModule, ProductInfoComponent, SignUpPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent implements OnInit{

  cartState$ = this.store.select('cart');
  userState$ = this.store.select('user');
  product : Product = {
    id: '',
    name: '',
    type: '',
    price: 0,
    image: '',
    rate: 0,
    quantity: 0,
  }

  constructor(private auth: Auth, private store: Store<{ cart: CartState, user: UserState }>) {

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        this.auth = getAuth();
        const users = auth.currentUser;
        console.log("User before if statement:", user);
        if (users !== null ) {
          this.store.dispatch(UserAction.addUser({
            user: {
              id: users.uid,
              name: users.displayName as string,
              email: users.email as string,
            }
          }));
          this.store.dispatch(CartAction.addNewCart({
            cart: {
              cartId: '',
              userId: users.uid,
              products :[{
                product: this.product,
                quantity: 0,
              }]
            }
          }));
        } else {
          console.log("User is not authenticated.");
        }
      } else {

        console.log("User is signed out");
      }
    });



  }

  ngOnInit(): void {
    this.cartState$.subscribe((state) => {
      console.log(state);
    });
  }


}
