import { Component } from '@angular/core';
import {NavbarComponent} from "../navbar/navbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {TableComponent} from "../table/table.component";

@Component({
  selector: 'app-product-info',
  standalone: true,
  imports: [
    NavbarComponent,
    ReactiveFormsModule,
    TableComponent,
  ],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.scss'
})
export class ProductInfoComponent {

}
