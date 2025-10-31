import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  username = '';
  email = '';
  password = '';

  constructor(private router: Router) {}

  onSignup() {
    if (this.username && this.email && this.password) {
      console.log('Inscription réussie pour :', this.username);
      this.router.navigate(['/login']);
    } else {
      alert('Tous les champs sont requis.');
    }
  }
}
