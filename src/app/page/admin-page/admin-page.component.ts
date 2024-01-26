import { Component } from '@angular/core';
import {NavbarComponent} from "../../components/admin/navbar/navbar.component";
import {TableComponent} from "../../components/admin/table/table.component";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NavbarComponent,
    TableComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent {

}
