import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapPostsService {
  private apiUrl = 'http://localhost:3000/api/rapposts';

  constructor(private http: HttpClient) { }

  // Get all rap posts
  getRapPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Create a new rap post
  createRapPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  // Add a comment to a specific rap post
  addComment(postId: string, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/comments`, comment);
  }

  // Update a rap post by ID
  updatePost(postId: string, updatedPost: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}`, updatedPost);
  }

  // Delete a rap post by ID
  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}`);
  }

  // Update a comment on a post
  updateComment(postId: string, commentId: string, updatedComment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${postId}/comments/${commentId}`, updatedComment);
  }

  // Delete a comment from a post
  deleteComment(postId: string, commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${postId}/comments/${commentId}`);
  }

  // Like a post
  likePost(postId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/like`, {});
  }

  // Rate a post
  ratePost(postId: string, rating: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/rate`, { rating });
  }

  // Search posts by user or text
  searchPosts(user?: string, text?: string): Observable<any> {
    let searchParams = new URLSearchParams();
    if (user) searchParams.set('user', user);
    if (text) searchParams.set('text', text);

    return this.http.get<any>(`${this.apiUrl}/search?${searchParams.toString()}`);
  }

  // Get posts with pagination
  getPaginatedPosts(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paginate?page=${page}&limit=${limit}`);
  }
}
