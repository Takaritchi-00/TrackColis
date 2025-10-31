import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss',
})
export class Welcome {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
