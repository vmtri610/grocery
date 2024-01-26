import {Component, Input} from '@angular/core';
import {Category} from "../../models/category.model";
import {CurrencyPipe} from "@angular/common";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  @Input() category!: Category[];
}
