import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserColisService } from '../../services/user-colis.service';
import { UserColis } from '../../models/user-colis.model';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';




@Component({
  selector: 'app-edit-user-colis',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-user-colis.html',
  styleUrl: './edit-user-colis.scss',
})
export class EditUserColis implements OnInit {
  model: UserColis = {
    idUserColis: undefined,
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    statut: '',
    cni: '',
    telephone: ''
  };

  isEditMode = false;
  isLoading = true;
  successMessage = '';
  errorMessage = '';
  userId!: number;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserColisService) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    if (this.userId) {
      this.isEditMode = true;
      this.loadUser();
    } else {
      this.isLoading = false;
    }
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: UserColis) => {
        this.model = user; // Patch toutes les données dans le formulaire
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur chargement utilisateur', err);
        this.errorMessage = 'Impossible de charger les informations.';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.isEditMode) {
      this.userService.updateUser(this.model.idUserColis!, this.model).subscribe({
        next: () => {
          this.successMessage = 'Utilisateur mis à jour avec succès ✅';
          this.isLoading = false;
          this.router.navigate(['/dashboard/colis']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la mise à jour ❌';
          this.isLoading = false;
        }
      });
    } else {
      this.userService.createUser(this.model).subscribe({
        next: () => {
          this.successMessage = 'Utilisateur créé avec succès ✅';
          this.isLoading = false;
          this.router.navigate(['/dashboard/colis']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la création ❌';
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/dashboard/colis']);
  }
}
