import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserColis } from '../models/user-colis.model';

@Injectable({
  providedIn: 'root',
})
export class UserColisService {
  // URL de base de l'API ASP.NET
  private apiUrl = 'https://localhost:7096/api/UsersColis';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAllUsers(): Observable<UserColis[]> {
    return this.http.get<UserColis[]>(this.apiUrl, this.getAuthHeaders());
  }

  getUserById(id: number): Observable<UserColis> {
    return this.http.get<UserColis>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  createUser(user: UserColis): Observable<UserColis> {
    return this.http.post<UserColis>(this.apiUrl, user, this.getAuthHeaders());
  }

  updateUser(id: number, user: UserColis): Observable<UserColis> {
    return this.http.put<UserColis>(`${this.apiUrl}/${id}`, user, this.getAuthHeaders());
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
  
}
