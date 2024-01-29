import {Routes} from '@angular/router';
import {LandingPageComponent} from "./landing-page.component";
import {ProductDetailPageComponent} from "../product-detail-page/product-detail-page.component";
import {CheckoutPageComponent} from "../checkout-page/checkout-page.component";
import {AdminPageComponent} from "../admin-page/admin-page.component";


export const LandingRoutes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: 'product-list',
        loadChildren: () => import('../../page/product-list-page/product-list-page.routes').then(mod => mod.ProductListPageRoutes)
      },
      {
        path: 'detail/:id',
        component: ProductDetailPageComponent
      },
      {
        path: 'admin',
        component: AdminPageComponent
      },
      {
        path: 'checkout',
        component: CheckoutPageComponent
      },
      {
        path: '',
        redirectTo: 'product-list',
        pathMatch: 'full',
      },
    ],
  },


];
