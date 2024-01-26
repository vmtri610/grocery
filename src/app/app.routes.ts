import { Routes } from '@angular/router';
import { ProductPageComponent} from "./page/product-page/product-page.component";
import {LandingPageComponent} from "./page/landing-page/landing-page.component";
import {CheckoutPageComponent} from "./page/checkout-page/checkout-page.component";
import {SignInPageComponent} from "./page/sign-in-page/sign-in-page.component";
import {SignUpPageComponent} from "./page/sign-up-page/sign-up-page.component";
import {AdminPageComponent} from "./page/admin-page/admin-page.component";

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: 'product',
    component: ProductPageComponent
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent
  },
  {
    path: 'sign-in',
    component: SignInPageComponent
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  }

];
