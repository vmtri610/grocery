import {Component} from '@angular/core';
import {LogoComponent} from "../../components/logo/logo.component";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {Auth} from "@angular/fire/auth";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [
    LogoComponent,
    FormsModule,
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent  {
  constructor(private auth: AuthService, private router: Router){}

  signInWithGoogle() {
    this.auth.signInWithGoogle();
    this.router.navigate(['/sign-up']).then();
  }

}
