import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RapPostsService } from '../services/rap-posts.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  posts: any[] = [];
  username: string = ''; // Initialize to an empty string

  constructor(
    private postService: RapPostsService,
    private userService: UserService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username']; // Get username from route parameters
      this.loadUserProfile(); // Call to load the user profile
    });
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.username).subscribe(
      user => {
        this.user = user;
        this.loadUserPosts(this.user.username); // Load posts after user profile is fetched
      },
      error => {
        console.error('Error fetching user profile:', error);
      }
    );
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
