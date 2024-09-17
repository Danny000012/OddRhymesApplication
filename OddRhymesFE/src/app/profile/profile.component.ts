import { Component, OnInit } from '@angular/core';
import { RapPostsService } from '../rap-posts.service';
import { UserService } from '../user.service'; // Adjust the path as necessary

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  posts: any[] = [];

  constructor(
    private postService: RapPostsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.userService.getUserProfile().subscribe(user => {
      this.user = user;
    });
  }

  loadUserPosts(username: string): void {
    this.postService.getUserPosts(username).subscribe(posts => {
      this.posts = posts;
    });
  }

  deletePost(postId: string): void {
    this.postService.deletePost(postId).subscribe(
      () => {
        // Remove the post from the UI
        this.posts = this.posts.filter(post => post._id !== postId);
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }
}
