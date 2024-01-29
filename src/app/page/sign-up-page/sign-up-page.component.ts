import { Component } from '@angular/core';
import { LogoComponent } from '../../components/logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [LogoComponent, RouterLink, FormsModule],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent {
  constructor(private auth: AuthService) {}

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }
}
