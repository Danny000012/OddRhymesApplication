import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from './storage.service'; // Import StorageService

@Injectable({
  providedIn: 'root'
})

export class RapPostsService {
  private apiUrl = 'http://localhost:3000/api/rapposts';

  constructor(private http: HttpClient, private storageService: StorageService) { }

  private getHeaders(): HttpHeaders {
    const token = this.storageService.getItem('token'); // Use StorageService
    console.log('Token:', token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all rap posts
  getRapPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Create a new rap post
  createRapPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Add a comment to a specific rap post
  addComment(postId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/comments`, comment, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Update a rap post by ID
  updatePost(postId: string, updatedPost: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}`, updatedPost, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Delete a rap post by ID
  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Update a comment on a post
  updateComment(postId: string, commentId: string, updatedComment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}/comments/${commentId}`, updatedComment, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Delete a comment from a post
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}/comments/${commentId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Like a post
  likePost(postId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/like`, {}, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Rate a post
  ratePost(postId: string, rating: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/rate`, { rating }, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Search for posts
  searchPosts(user?: string, text?: string, id?: string, limit?: number, page?: number): Observable<any> {
    let searchParams = new URLSearchParams();
    if (user) searchParams.set('user', user);
    if (text) searchParams.set('text', text);
    if (id) searchParams.set('id', id);
    if (limit) searchParams.set('limit', limit.toString());
    if (page) searchParams.set('page', page.toString());
  
    return this.http.get<any>(`${this.apiUrl}/search?${searchParams.toString()}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }
  
  // Get posts with pagination
  getPaginatedPosts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginate?page=${page}&limit=${limit}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Get user posts
  getUserPosts(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${username}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }

  // Add this method to the RapPostsService
  getUserProfileByName(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${username}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError)); // Handle errors
  }


  // Error handling method
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError('Something went wrong; please try again later.'); // Return a user-friendly error message
  }
}
