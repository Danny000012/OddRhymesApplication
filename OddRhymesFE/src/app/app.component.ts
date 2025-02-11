import { Component } from '@angular/core';
import { ThemeService } from '../app/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.applyTheme(); // Apply theme on app start
  }
}
