import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './auth/login/login.component';
import {UpdateProfileComponent} from './user/update-profile/update-profile.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'users/update-profile/:id',
    component: UpdateProfileComponent
  },
  {
    path: 'users/user-profile/:id',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
