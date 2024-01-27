import { Component } from '@angular/core';
import {BreadcrumbsComponent} from "../../components/breadcrumbs/breadcrumbs.component";
import {RouterLink} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CurrencyPipe} from "@angular/common";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    BreadcrumbsComponent, RouterLink, CurrencyPipe
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss'
})
export class CheckoutPageComponent {

}
