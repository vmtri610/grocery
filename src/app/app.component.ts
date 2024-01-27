import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import {SharedModule} from "./shared/shared.module";
import {NavbarComponent} from "./components/admin/navbar/navbar.component";
import {TableComponent} from "./components/admin/table/table.component";
import {ProductInfoComponent} from "./components/admin/product-info/product-info.component";
import {SignUpPageComponent} from "./page/sign-up-page/sign-up-page.component";
import {Auth, getAuth, onAuthStateChanged, user} from "@angular/fire/auth";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NavbarComponent, TableComponent, TuiRootModule, TuiDialogModule, TuiAlertModule, ProductInfoComponent, SignUpPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {

  constructor(private auth: Auth) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
        this.auth = getAuth();
        const users = auth.currentUser;
        console.log("User before if statement:", user);
        if (users !== null) {
          const data = {
            uid: users.uid,
            name: users.displayName,
            email: users.email,
            photoUrl: users.photoURL,
            emailVerified: users.emailVerified,
          }
          console.log("User after if statement:", data);
          // ...rest of your code
        } else {
          console.log("User is not authenticated.");
        }
      } else {
        // User is signed out
        // ...
        console.log("User is signed out");
      }
    });

  }


}
