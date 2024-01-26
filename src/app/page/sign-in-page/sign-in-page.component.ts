import {Component, OnInit} from '@angular/core';
import {LogoComponent} from "../../components/logo/logo.component";
import {FormsModule} from "@angular/forms";
import {Product} from "../../models/product.model";
import {ProductManagementService} from "../../services/product-management.service";
import {Router, RouterLink} from "@angular/router";
import {UserManagementService} from "../../services/user-management.service";
import {User} from "../../models/user.model";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    LogoComponent,
    FormsModule,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent  {
  isConfirmUser: boolean = false;


  id: string = '0';
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  phone: string = '';
  address: string = '';
  cart: any[] = [];
  liked: any[] = [];

  userObj: User = {
    id: this.id,
    name: this.name,
    email: this.email,
    password: this.password,
    phone: this.phone,
    address: this.address,
    cart: this.cart,
    liked: this.liked
  }

  constructor(private userManagementService: UserManagementService, private router: Router) {
  }

  resetForm() {
    this.email = '';
    this.password = '';
  }

  checkUser() {
    this.userObj.email = this.email;
    this.userManagementService.checkExistUserByEmail(this.userObj).then();
    this.isConfirmUser = this.userManagementService.isCheckExistUserByEmail;

    if (this.isConfirmUser) {
      this.router.navigate(['/']).then();
    }
  }

}
