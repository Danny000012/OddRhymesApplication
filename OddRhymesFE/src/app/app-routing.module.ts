// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RapPostsComponent } from './rap-posts/rap-posts.component';
// Import other components if needed

const routes: Routes = [
  { path: '', component: RapPostsComponent },
  { path: 'posts', component: RapPostsComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
