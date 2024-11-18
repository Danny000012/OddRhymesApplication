import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RapPostsService } from '../services/rap-posts.service'; // Import the service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string | null = null;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private rapPostsService: RapPostsService, // Inject the service
    private router: Router
  ) {}

  login(): void {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please fill in both fields.';
      return;
    }
  
    this.isLoading = true;
    this.authService.login(this.loginData).subscribe(
      response => {
        this.isLoading = false;
        localStorage.setItem('token', response.token); // Store token

        // Fetch the user profile after successful login
        this.rapPostsService.getUserProfileByName(response.username).subscribe(
          userProfile => {
            // Optionally store the user profile in local storage or a service if needed
            // Navigate to the profile page
            this.router.navigate(['/profile', userProfile.username]);
          },
          error => {
            this.isLoading = false;
            this.errorMessage = 'Failed to fetch user profile.';
            console.error('Profile fetch error:', error);
          }
        );
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    );
  }
}
