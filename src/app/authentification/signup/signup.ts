import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Authentification } from '../../services/authentification';

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

  constructor(private router: Router, private authentificationService: Authentification) {}

  onSignup() {
    if (this.username && this.email && this.password) {
      const user={username:this.username, email:this.email, password:this.password};
      this.authentificationService.signup(user).subscribe(
        (response) => {
          console.log('Inscription réussie pour :', this.email);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          alert('Erreur lors de l\'inscription : ' + error.message);
        }
      ) 
    } else {
      alert('Tous les champs sont requis.');
    }
  }
}
