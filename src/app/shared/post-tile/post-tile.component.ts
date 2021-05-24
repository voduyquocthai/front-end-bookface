import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../post/post-model';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {User} from '../../user/user';
import {AuthService} from '../../auth/auth.service';
import {UsersService} from '../../user/service/users.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostPayload} from '../../post/create-post/post.payload';
import {validateConstructorDependencies} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {

  public Editor = ClassicEditor;

  @Input() posts: PostModel[] = [];

  currentUser: User;
  editPostForm: FormGroup = new FormGroup(
    {
      id: new FormControl(Validators.required),
      privacy: new FormControl(Validators.required),
      description: new FormControl(Validators.required),
    }
  );
  editPost: PostPayload;
  deletePost: PostModel;


  constructor(private router: Router,
              private postService: PostService,
              private authService: AuthService,
              private userService: UsersService) {

  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  goToPost(id: number): void {

  }

  getCurrentUser(){
    let userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(
      data => this.currentUser = data,
      error => console.log(error.message)
    )
  }

  openModal(mode: string, post: PostModel){
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if(mode === 'edit'){
      this.editPostForm = new FormGroup({
        id: new FormControl(post.id, Validators.required),
        privacy: new FormControl(post.privacy, Validators.required),
        description: new FormControl(post.description, Validators.required),
      });
      button.setAttribute('data-bs-target', '#editPostModal');
    }
    if(mode === 'delete'){
      this.deletePost = post;
      button.setAttribute('data-bs-target', '#deletePostModal');
    }
    container.appendChild(button);
    button.click();
  }

  onEditPost(){
    this.editPost = this.editPostForm.value;
    console.log(this.editPost);
    this.postService.updatePost(this.editPost).subscribe(
      (data) => {
        document.getElementById("close-edit-btn").click();
      },
      (error) => {
        console.log(error.message);
      }
    )
    this.editPostForm.reset();
  }

  onDeletePost() {
      this.postService.deletePostById(this.deletePost.id).subscribe(
        () => {
        document.getElementById("close-delete-button").click();
        },
        (e) => { console.log(e.message)}
      )
  }

  goToUserProfile(userId: number) {
    this.router.navigateByUrl('users/user-profile/' + userId);
  }


}
