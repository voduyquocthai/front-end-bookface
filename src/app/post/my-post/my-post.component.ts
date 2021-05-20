import { Component, OnInit } from '@angular/core';
import {Post} from '../../model/post';
import {PostService} from '../../services/post.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: PostService, private titleService: Title) {
    this.getAll();
    this.titleService.setTitle('FaceBook');
  }

  ngOnInit(): void {
  }

  getAll(): Post[]{
    this.postService.getAllPost().subscribe(posts => {
      this.posts = posts;
    });
    return this.posts;
  }

}
