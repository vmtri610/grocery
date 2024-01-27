import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CurrencyPipe} from "@angular/common";
import {LogoComponent} from "../logo/logo.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
