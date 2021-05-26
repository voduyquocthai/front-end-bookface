import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../user/user";
import {FormControl, FormGroup} from "@angular/forms";
import {CommentModel} from "../../model/component/comment-model";
import {CommentService} from "../../services/comment.service";
import {AuthService} from "../../auth/auth.service";
import {UsersService} from "../../user/service/users.service";
import {PostModel} from "../../post/post-model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  currentUser: User;
  commentModel: CommentModel = {};
  comments: CommentModel[] = [];
  commentForm: FormGroup = new FormGroup({
    text: new FormControl()
  });
  @Input() post: PostModel;

  constructor(private commentService: CommentService,
              private authService: AuthService,
              private userService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getAllCommentForPost();
  }

  createComment() {
    this.commentModel.text = this.commentForm.get('text').value;
    this.commentModel.postId = this.post.id;
    this.commentService.createComment(this.commentModel).subscribe(
      data =>{console.log('Created comment');
        this.comments.push(data)},
    (e) => {console.log(e.message)}
    )
    this.commentForm.reset();
  }

  getCurrentUser() {
    const userId = this.authService.getUserId();
    this.userService.getUserById(userId).subscribe(user => {
      this.currentUser = user;
    })
  }


  getAllCommentForPost() {
    this.commentService.getAllCommentForPost(this.post.id).subscribe(comments =>{
      this.comments =comments;
    })
  }


  goToUserProfile(userId: number) {
    this.router.navigateByUrl('users/user-profile/' + userId);
  }
}
