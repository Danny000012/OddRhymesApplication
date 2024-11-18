import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // This import is optional if not using RouterModule here
import { AppComponent } from './app.component';
import { RapPostsComponent } from './rap-posts/rap-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { AppRoutingModule } from './app-routing.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutComponent } from './about/about.component';  // Import AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    RapPostsComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    ProfileComponent,
    AnnouncementsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule  // Use AppRoutingModule for routing configuration
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
