import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  constructor(private router: Router) {}
  onLogin() {
    if (this.email && this.password) {
      console.log('Connexion réussie pour :', this.email);
      this.router.navigate(['/welcome']);
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}

