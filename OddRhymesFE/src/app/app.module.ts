import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RapPostsComponent } from './rap-posts/rap-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

// Define routes
const routes: Routes = [
  { path: '', component: RapPostsComponent }, // Default route
  { path: 'login', component: LoginComponent }, // Route to LoginComponent
  { path: 'signup', component: SignupComponent } // Route to SignupComponent
];

@NgModule({
  declarations: [
    AppComponent,
    RapPostsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes) // Add RouterModule with routes
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
