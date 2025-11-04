import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserColisService } from '../../services/user-colis.service';
import { UserColis } from '../../models/user-colis.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-user-colis',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-user-colis.html',
  styleUrl: './add-user-colis.scss',
})
export class AddUserColis {
  userForm = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    adresse: new FormControl(''),
    statut: new FormControl(''),
    cni: new FormControl(''),
    telephone: new FormControl(''),
  });

  constructor( private userService: UserColisService, private router: Router) {}

  onSubmit() {
    if (this.userForm.invalid) return;
    const userData = this.userForm.value as UserColis;
    this.userService.createUser(userData).subscribe({
      next: () => this.router.navigate(['/dashboard/colis']),
      error: (err) => console.error('Erreur création utilisateur :', err)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/colis']);
  }

}
