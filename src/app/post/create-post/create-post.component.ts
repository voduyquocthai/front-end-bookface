import {Component, Input, OnInit} from '@angular/core';
// @ts-ignore
import {FormControl, FormGroup} from '@angular/forms';
import {PostService} from '../../services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Title} from '@angular/platform-browser';
import {Post} from '../../model/post';



@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {
  post: Post = {
    postId: null,
    User: null,
    createDate: null,
    privacy: 2,
    likeCount: 0,
    heartCount: 0
  };


  constructor(private router: Router,
              private postService: PostService,
              private titleService: Title,
              private storage: AngularFireStorage ) {
    this.titleService.setTitle('Thêm mới');
  }

  ngOnInit(): void {
  }

  createStatusPost(){
    this.postService.createStatusPost(this.post).subscribe(() => {
      alert('Thêm mới thành công!');
      this.router.navigate(['/']);
    });
  }


}

