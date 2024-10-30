import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string | null = null; // To store the logged-in username

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.username = this.userService.getCurrentUsername();
    console.log('Current Username:', this.username); // Check the value
  }  

  navigateToProfile(): void {
    if (this.username) {
      this.router.navigate(['/profile', this.username]); // Navigate to the user's profile
    }
  }
}

