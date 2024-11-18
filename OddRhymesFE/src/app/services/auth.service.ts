import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service'; // Import StorageService

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Assuming your API returns a token and username
        this.storageService.setItem('token', response.token);
        this.storageService.setItem('username', response.username);

        // Log the current username
        console.log('Current Username:', response.username);
      }),
      catchError(error => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }  

  signup(user: { email: string; password: string; username: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user)
      .pipe(catchError(error => {
        console.error('Signup error:', error);
        return throwError(error);
      }));
  }

  getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token'); // Use StorageService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }
}
