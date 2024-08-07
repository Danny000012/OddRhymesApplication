// src/app/rap-posts/rap-posts.component.ts
import { Component, OnInit } from '@angular/core';
import { RapPostsService } from '../rap-posts.service';

@Component({
  selector: 'app-rap-posts',
  templateUrl: './rap-posts.component.html',
  styleUrls: ['./rap-posts.component.css']
})
export class RapPostsComponent implements OnInit {
  rapPosts: any[] = [];
  newPost = { user: '', text: '' };
  newComment = { user: '', text: '' };
  searchUser = '';
  searchText = '';
  currentPage = 1;
  pageSize = 10;

  constructor(private rapPostsService: RapPostsService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.rapPostsService.getRapPosts().subscribe(posts => {
      this.rapPosts = posts;
    });
  }

  addPost(): void {
    this.rapPostsService.createRapPost(this.newPost).subscribe(() => {
      this.loadPosts();
      this.newPost = { user: '', text: '' }; // Clear form
    });
  }

  addComment(postId: string): void {
    this.rapPostsService.addComment(postId, this.newComment).subscribe(() => {
      this.loadPosts();
      this.newComment = { user: '', text: '' }; // Clear form
    });
  }

  updatePost(postId: string): void {
    // Add form fields for updating post
    // Use a dialog or form to collect updated data
  }

  deletePost(postId: string): void {
    // Implement delete logic and confirm deletion
  }

  updateComment(postId: string, commentId: string): void {
    // Add form fields for updating comment
    // Use a dialog or form to collect updated data
  }

  deleteComment(postId: string, commentId: string): void {
    this.rapPostsService.deleteComment(postId, commentId).subscribe(() => {
      this.loadPosts();
    });
  }

  likePost(postId: string): void {
    this.rapPostsService.likePost(postId).subscribe(() => {
      this.loadPosts();
    });
  }

  ratePost(postId: string): void {
    // Implement rating logic and collect rating value
  }

  searchPosts(): void {
    // Implement search logic
    // Use this.searchUser and this.searchText
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPosts();
    }
  }

  nextPage(): void {
    this.currentPage++;
    this.loadPosts();
  }
}
