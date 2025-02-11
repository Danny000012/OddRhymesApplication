import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = false;

  constructor() {
    this.loadThemePreference();
  }

  loadThemePreference(): void {
    if (typeof window !== 'undefined') { // Check if we're in a browser environment
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark';
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.isDarkMode = true;
      }
      this.applyTheme();
    }
  }

  toggleTheme(): void {
    if (typeof window !== 'undefined') {
      this.isDarkMode = !this.isDarkMode;
      this.saveTheme();
      this.applyTheme();
    }
  }

  saveTheme(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  applyTheme(): void {
    if (typeof document !== 'undefined') { // Check if document is available
      if (this.isDarkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }
}