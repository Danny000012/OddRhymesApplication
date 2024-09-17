import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapPostsComponent } from './rap-posts/rap-posts.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard'; // Adjust path as needed

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect root to login
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'posts', component: RapPostsComponent },
  //{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }  // Wildcard route for handling unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
