import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from '../../post/post-model';
import {Router} from '@angular/router';
import {PostService} from '../../services/post.service';
import {User} from '../../user/user';
import {AuthService} from '../../auth/auth.service';
import {UsersService} from '../../user/service/users.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
      privacy: new FormControl(Validators.required),
      description: new FormControl(Validators.required),
    }
  );
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
        privacy: new FormControl(post.privacy, Validators.required),
        description: new FormControl(post.description, Validators.required),
      });
      button.setAttribute('data-bs-target', '#editPostModal');
    }
    if(mode === 'delete'){
      button.setAttribute('data-bs-target', '#deletePostModal');
    }
    container.appendChild(button);
    button.click();
  }

  onEditPost(){}

}
