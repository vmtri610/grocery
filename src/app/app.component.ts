import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import { Component } from '@angular/core';
import {SharedModule} from "./shared/shared.module";
import {LandingPageComponent} from "./page/landing-page/landing-page.component";
import {NavbarComponent} from "./components/admin/navbar/navbar.component";
import {TableComponent} from "./components/admin/table/table.component";
import {AdminPageComponent} from "./page/admin-page/admin-page.component";
import {ProductInfoComponent} from "./components/admin/product-info/product-info.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NavbarComponent, TableComponent, TuiRootModule, TuiDialogModule, TuiAlertModule, ProductInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
}
