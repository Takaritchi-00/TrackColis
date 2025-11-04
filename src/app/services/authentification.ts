import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  // URL de base de l'API ASP.NET
  private apiUrl = 'https://localhost:7096/api/Authenticate';

  constructor(private http: HttpClient, private router: Router) {}

  /**
   *  Connexion d’un utilisateur
   */
  login(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, request);
  }

  /**
   *  Inscription d’un nouvel utilisateur
   */
  signup(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, request);
  }

  /**
   * Déconnexion de l’utilisateur
   */
  logout(): void {
    // Supprimer les données du stockage local
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Rediriger vers la page d’accueil ou de connexion
    this.router.navigate(['/']);
  }

  /**
   * Récupère le nom de l’utilisateur connecté
   */
  getUsername(): string {
    return localStorage.getItem('username') || 'Utilisateur';
  }

  /**
   * Vérifie si l’utilisateur est connecté
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}
