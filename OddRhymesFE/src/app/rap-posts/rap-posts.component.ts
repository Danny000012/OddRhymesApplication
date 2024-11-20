import { Component, OnInit } from '@angular/core';
import { RapPostsService } from '../services/rap-posts.service';
import { UserService } from '../services/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rap-posts',
  templateUrl: './rap-posts.component.html',
  styleUrls: ['./rap-posts.component.css']
})
export class RapPostsComponent implements OnInit {
  rapPosts: any[] = [];
  newPost = { user: '', text: '' };
  newComment = { text: '' };
  searchUser = '';
  searchText = '';
  searchLimit: number = 10; // Default limit
  searchId = '';
  currentPage = 1;

  constructor(private rapPostsService: RapPostsService, private userService: UserService) { }

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
    // Here you create a temporary object for the API call
    const commentWithUser = {
      text: this.newComment.text,
      user: this.userService.getCurrentUsername() || ''
    };

    // Pass the temporary object to the service, which now only includes text
    this.rapPostsService.addComment(postId, commentWithUser).subscribe(() => {
      this.loadPosts();
      this.newComment = { text: '' }; // Reset only the text after comment addition
    });
  }

  updatePost(postId: string): void {
    // Add form fields for updating post
    // Use a dialog or form to collect updated data
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.rapPostsService.deletePost(postId).subscribe({
        next: (response) => {
          console.log('Post deleted successfully:', response);
          // Remove the deleted post from the local array
          this.rapPosts = this.rapPosts.filter(post => post._id !== postId);
        },
        error: (err) => {
          console.error('Error deleting post:', err);
          alert('Something went wrong; please try again later.');
        }
      });
    }
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
    this.rapPostsService.searchPosts(this.searchUser, this.searchText, this.searchId, this.searchLimit, this.currentPage).subscribe(posts => {
      this.rapPosts = posts;
    });
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchPosts();
    }
  }
  
  nextPage(): void {
    this.currentPage++;
    this.searchPosts();
  }

  clearSearch(): void {
    this.searchUser = '';
    this.searchText = '';
    this.searchId = '';
    this.searchLimit = 10;
    this.currentPage = 1; // Reset to the first page
    this.loadPosts(); // Optionally reload all posts or search results
  }
}
