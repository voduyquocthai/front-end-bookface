import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UpdateProfileComponent} from './user/update-profile/update-profile.component';
import {HomeComponent} from './home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {ToastrModule} from 'ngx-toastr';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { MyPostComponent } from './post/my-post/my-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { FriendPostComponent } from './post/friend-post/friend-post.component';
import { GuestPostComponent } from './post/guest-post/guest-post.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateProfileComponent,
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SideBarComponent,
    CreatePostComponent,
    SideBarComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    MyPostComponent,
    EditPostComponent,
    FriendPostComponent,
    GuestPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
