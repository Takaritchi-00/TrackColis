import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authentification {
  // URL de base de ton API ASP.NET
  private apiUrl = 'https://localhost:7096/api/Authenticate';

  constructor(private http: HttpClient) {}

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
  
}
