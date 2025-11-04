import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserColisService } from '../../services/user-colis.service';
import { NgIf } from '@angular/common';
import { UserColis } from '../../models/user-colis.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user-colis',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-user-colis.html',
  styleUrl: './edit-user-colis.scss',
})
export class EditUserColis implements OnInit {
  userForm!: FormGroup;
  userId!: number; // Cet id vient de l'URL
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserColisService
  ) {}

  ngOnInit(): void {
    // On récupère l'idUserColis depuis l'URL
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.initForm();
    this.loadUserData();
  }

  initForm(): void {
    this.userForm = this.fb.group({
      idUserColis: [{ value: '', disabled: true }],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      statut: ['', Validators.required],
      cni: ['', Validators.required],
      telephone: ['', Validators.required],
    });
  }
  

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe({
      next: (user: UserColis) => {
        this.userForm.patchValue(user); // On met à jour le formulaire avec idUserColis
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des données', error);
        this.router.navigate(['/dashboard/colis']);
      },
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    const updatedUser: UserColis = {
      ...this.userForm.getRawValue(), // récupère idUserColis aussi
    };

    // On utilise idUserColis pour l'appel update
    this.userService.updateUser(updatedUser.idUserColis!, updatedUser).subscribe({
      next: () => {
        alert('Utilisateur mis à jour avec succès ✅');
        this.router.navigate(['/dashboard/colis']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour', err);
        alert('Erreur lors de la mise à jour ❌');
      },
    });
  }
  cancel() {
    this.router.navigate(['/dashboard/colis']);
  }
}
