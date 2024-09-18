import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Make sure this path is correct

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = { email: '', password: '', username: '' };

  constructor(private authService: AuthService, private router: Router) { }

  signup(): void {
    if (this.signupData.username && this.signupData.email && this.signupData.password) {
      this.authService.signup(this.signupData).subscribe(response => {
        // Handle successful signup
        console.log('Signup successful', response);
        this.router.navigate(['/login']); // Redirect to login or another route
      }, error => {
        console.error('Signup error:', error);
        // Handle error (e.g., display a message to the user)
      });
    }
  }
}
