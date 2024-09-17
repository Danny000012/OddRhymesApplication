import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.loginData).subscribe(response => {
      // Handle successful login
      localStorage.setItem('token', response.token); // Store token or other data
      this.router.navigate(['/profile']); // Redirect to home or other route
    }, error => {
      console.error('Login error:', error);
      // Handle error (e.g., display a message to the user)
    });
  }
}
