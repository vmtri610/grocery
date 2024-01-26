import {Component} from '@angular/core';
import {LogoComponent} from "../../components/logo/logo.component";
import {RouterLink} from "@angular/router";
import {UserManagementService} from "../../services/user-management.service";
import {FormsModule} from "@angular/forms";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    LogoComponent,
    RouterLink,
    FormsModule
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss'
})
export class SignUpPageComponent {

  id: string = '';
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
  constructor(private userManagementService: UserManagementService) {
  }

  resetForm() {
    this.email = '';
    this.password = '';
    this.confirm_password = '';
  }

  addUser() {
    if (this.password == this.confirm_password) {
      this.userObj.id = this.id ;
      this.userObj.name = this.name;
      this.userObj.email = this.email;
      this.userObj.password = this.password;
      this.userObj.phone = this.phone;
      this.userObj.address = this.address;
      this.userObj.cart = this.cart;
      this.userObj.liked = this.liked;
      this.userManagementService.addUser(this.userObj).then();
    this.resetForm();
    }

  }



}
