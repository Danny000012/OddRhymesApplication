import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; // Correct URL for users

  constructor(private http: HttpClient) { }

  // Method for logging in a user
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error); // Propagate the error
        })
      );
  }   

  // Method for signing up a new user
  signup(user: { email: string; password: string; username: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, user)
      .pipe(
        catchError(error => {
          console.error('Signup error:', error);
          return throwError(error); // Propagate the error
        })
      );
  }

  // Method to get headers with the token
  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or get it from cookies
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers: this.getHeaders() });
  }  
}
