import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RapPostsService } from '../services/rap-posts.service';
import { UserService } from '../services/user.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  posts: any[] = [];
  username: string = '';
  newPostContent: string = ''; // Property for new post content
  @HostBinding('class.dark-mode') isDarkMode = false; // New property for theme state

  constructor(
    private postService: RapPostsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private themeService: ThemeService // Inject ThemeService
  ) {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.loadUserPreferences();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.loadUserProfile();
    });
  }

  loadUserProfile(): void {
    this.userService.getUserProfile(this.username).subscribe(
      user => {
        this.user = user;
        this.loadUserPosts(this.user.username);
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
        this.posts = this.posts.filter(post => post._id !== postId);
      },
      error => {
        console.error('Error deleting post:', error);
      }
    );
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePicture = reader.result as string;
        this.uploadProfilePicture(file);
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePicture(file: File): void {
    // Implement upload logic here (e.g., call a service method)
  }

  addPost(): void {
    if (!this.newPostContent) {
      alert('Please enter post content.');
      return;
    }
  
    const post = {
      text: this.newPostContent,
      user: this.user.username,
    };
  
    this.postService.createRapPost(post).subscribe(
      response => {
        this.posts.unshift(response); // Add the new post to the beginning of the list
        this.newPostContent = ''; // Clear the input after posting
      },
      error => {
        console.error('Error adding post:', error);
      }
    );
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  private saveUserPreferences(): void {
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
  }

  private loadUserPreferences(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    }
  }
}