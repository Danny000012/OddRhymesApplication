import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = { email: '', password: '', username: '' };

  constructor(private authService: AuthService, private router: Router) { }

  signup(): void {
    this.authService.signup(this.signupData).subscribe(response => {
      // Handle successful signup
      this.router.navigate(['/login']); // Redirect to login or another route
    }, error => {
      console.error('Signup error:', error);
      // Handle error (e.g., display a message to the user)
    });
  }
}
