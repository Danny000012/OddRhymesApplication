import { Component, OnInit } from '@angular/core';
import { RapPostsService } from '../services/rap-posts.service';
import { UserService } from '../services/user.service';

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
  searchLimit: number = 10;
  searchId = '';
  currentPage = 1;
  userRatings = new Map<string, number>();

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
      this.newPost = { user: '', text: '' };
    });
  }

  addComment(postId: string): void {
    const commentWithUser = {
      text: this.newComment.text,
      user: this.userService.getCurrentUsername() || ''
    };

    this.rapPostsService.addComment(postId, commentWithUser).subscribe(() => {
      this.loadPosts();
      this.newComment = { text: '' };
    });
  }

  updatePost(postId: string): void {
    // Implement update post logic here
  }

  deletePost(postId: string): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.rapPostsService.deletePost(postId).subscribe(() => {
        this.rapPosts = this.rapPosts.filter(post => post._id !== postId);
      });
    }
  }

  updateComment(postId: string, commentId: string): void {
    // Implement update comment logic here
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
    const rating = this.userRatings.get(postId);
    if (!rating || rating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }
  
    this.rapPostsService.ratePost(postId, rating).subscribe({
      next: (response) => {
        if (response.isRatingFinal) {
          alert('Post rated successfully! The rating is now final.');
        } else {
          alert('Post rated successfully!');
        }
        // Update the post with the new rating data
        this.rapPosts = this.rapPosts.map(post => 
          post._id === postId ? response : post
        );
      },
      error: (err) => {
        if (err.error === 'The rating for this post has already been finalized') {
          alert('Rating for this post has already been finalized. No further ratings can be submitted.');
        } else {
          console.error('Error rating post:', err);
          alert('There was an error rating this post. Please try again.');
        }
      }
    });
  }

  onSelectRating(postId: string, rating: number): void {
    this.userRatings.set(postId, rating);
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
    this.loadPosts();
  }
}