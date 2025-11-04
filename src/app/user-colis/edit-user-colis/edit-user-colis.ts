import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserColisService } from '../../services/user-colis.service';
import { UserColis } from '../../models/user-colis.model';

@Component({
  selector: 'app-edit-user-colis',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './edit-user-colis.html',
  styleUrl: './edit-user-colis.scss',
})
export class EditUserColis implements OnInit {

  userForm!: FormGroup;
  userId!: number;
  isLoading = true;
  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private userService: UserColisService) { }

  ngOnInit(): void {
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
        this.userForm.patchValue(user);
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
      ...this.userForm.getRawValue(),
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
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
}
