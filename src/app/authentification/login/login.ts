import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Authentification } from '../../services/authentification';


@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';

  constructor(
    private router: Router,
    private authentificationService: Authentification
  ) {}

  onLogin() {
    if (this.username && this.password) {
      const user = { username: this.username, password: this.password };

      this.authentificationService.login(user).subscribe(
        (response) => {
          console.log(response);

          // Sauvegarder le token JWT dans le localStorage
          if (response.token) {
            localStorage.setItem('token', response.token);
          }

          // Redirection vers la page d’accueil / welcome
          this.router.navigate(['/welcome']);
        },
        (error) => {
          console.error(error);
          alert(
            "Erreur lors de la connexion : " +
              (error.error?.message || error.message)
          );
        }
      );
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }
}

