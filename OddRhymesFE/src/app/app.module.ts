import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes
import { AppComponent } from './app.component';
import { RapPostsComponent } from './rap-posts/rap-posts.component';

// Define routes
const routes: Routes = [
  { path: '', component: RapPostsComponent }, // Route to RapPostsComponent
  // Add more routes as needed
];

@NgModule({
  declarations: [
    AppComponent,
    RapPostsComponent
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
