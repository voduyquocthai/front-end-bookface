import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UpdateProfileComponent} from './user/update-profile/update-profile.component';


const routes: Routes = [
  {
    path: 'users/update-profile/:id',
    component: UpdateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
