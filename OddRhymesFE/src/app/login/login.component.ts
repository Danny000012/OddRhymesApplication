import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };
  errorMessage: string | null = null;
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) { }
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
        
        // Redirect to the profile using the username
        this.router.navigate(['/profile', response.username]); // Ensure username is part of response
      },
      error => {
        this.isLoading = false;
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.error('Login error:', error);
      }
    );
  }
}
