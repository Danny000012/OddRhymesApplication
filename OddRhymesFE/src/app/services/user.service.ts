import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/rapposts'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  // Method to get headers with the token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${username}`, { headers: this.getHeaders() });
  }
}
