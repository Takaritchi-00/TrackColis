import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Authentification } from '../services/authentification';


@Component({
  selector: 'app-user-colis',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './user-colis.html',
  styleUrl: './user-colis.scss',
})
export class UserColis {
  constructor(private authentificationService: Authentification) {}
  username = localStorage.getItem('username') || 'Utilisateur';

  logout() {
    this.authentificationService.logout();
  }

}
