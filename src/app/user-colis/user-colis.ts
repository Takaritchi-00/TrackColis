import { Component, effect } from '@angular/core';
import { Router, ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Authentification } from '../services/authentification';
import { UserColisService } from '../services/user-colis.service';
import { UserColis as UserColisModel } from '../models/user-colis.model';
import { signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-user-colis',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, NgFor, NgIf],
  templateUrl: './user-colis.html',
  styleUrl: './user-colis.scss',
})
export class UserColis {
  users = signal<UserColisModel[]>([]);
  selectedUser = signal<UserColisModel | null>(null);
  isEditing = signal<boolean>(false);

  constructor(private router: Router,private authentificationService: Authentification, private userColisService: UserColisService,   private route: ActivatedRoute,) {
     // Charger automatiquement les utilisateurs au démarrage
     effect(() => {
      this.loadUsers();
    });
  }
   // Charger tous les utilisateurs
   loadUsers() {
    this.userColisService.getAllUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (err) => console.error('Erreur chargement utilisateurs :', err)
    });
  }

 // Récupérer un utilisateur par son id (optionnel, si besoin)
 getUserById(idUserColis: number) {
  this.userColisService.getUserById(idUserColis).subscribe({
    next: (user) => {
      this.selectedUser.set(user);
      this.isEditing.set(true);
    },
    error: (err) => console.error('Erreur chargement utilisateur :', err)
  });
}

  selectUser(user: UserColisModel) {
    this.selectedUser.set({...user}); // copie pour éviter de modifier directement
    this.isEditing.set(true);
  }

  resetUser() {
    this.selectedUser.set({
      idUserColis: undefined,
      nom: '',
      prenom: '',
      email: '',
      adresse: '',
      statut: '',
      cni: '',
      telephone: ''
    });
    this.isEditing.set(false);
  }

  // Créer ou mettre à jour un utilisateur
  saveUser() {
    const user = this.selectedUser();
    if (!user) return;

    if (this.isEditing()) {
      // Mise à jour
      if (user.idUserColis != null) {
        this.userColisService.updateUser(user.idUserColis, user).subscribe({
          next: () => {
            this.loadUsers();
            this.resetUser();
          },
          error: (err) => console.error('Erreur update utilisateur :', err)
        });
      }
    } else {
      // Création
      this.userColisService.createUser(user).subscribe({
        next: () => {
          this.loadUsers();
          this.resetUser();
        },
        error: (err) => console.error('Erreur création utilisateur :', err)
      });
    }
  }

  editUser(user: UserColisModel) {
    this.router.navigate([`/dashboard/colis/edit/${user.idUserColis}`]);
  }
  
// Supprimer un utilisateur
deleteUser(idUserColis: number) {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    this.userColisService.deleteUser(idUserColis).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Erreur suppression utilisateur :', err)
    });
  }
}

  
  username = localStorage.getItem('username') || 'Utilisateur';

  logout() {
    this.authentificationService.logout();
  }

}
