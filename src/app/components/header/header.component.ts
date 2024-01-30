import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { CartState } from '../../ngrx/states/cart.state';
import { UserState } from '../../ngrx/states/user.state';
import * as CartAction from '../../ngrx/actions/cart.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CurrencyPipe, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<{
      cart: CartState;
      user: UserState;
    }>,
  ) {}

  logout() {
    this.auth.signOutWithGoogle();
    this.router.navigate(['/sign-in']).then();
  }
}
