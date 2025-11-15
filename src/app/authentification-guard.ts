import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authentificationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  // Récupération du token (dans le localStorage)
  const token = localStorage.getItem('token');

  // Vérification simple
  if (token) {
    return true; // autorisé
  } else {
    // Pas de token → redirection vers la page de login
    router.navigate(['/auth/login']);
    return false;
  }
};
