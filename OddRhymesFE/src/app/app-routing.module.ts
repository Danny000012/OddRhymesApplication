import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapPostsComponent } from './rap-posts/rap-posts.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard'; // Adjust path as needed
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect root to login
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'posts', component: RapPostsComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'announcements', component: AnnouncementsComponent },
  { path: 'about', component: AboutComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }  // Wildcard route for handling unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
