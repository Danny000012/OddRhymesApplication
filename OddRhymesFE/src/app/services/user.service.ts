import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service'; // Import StorageService

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/rapposts';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token'); // Use StorageService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getUserProfile(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${username}`, { headers: this.getHeaders() })
      .pipe(catchError(error => {
        console.error('Error fetching user profile:', error);
        throw error;
      }));
  }

  // Method to get the current username
  getCurrentUsername(): string | null {
    const username = this.storageService.getItem('username');
    console.log('Retrieved Username:', username);
    return username;
  }  
}
