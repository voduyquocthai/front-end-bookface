import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {UsersService} from '../service/users.service';
import {ActivatedRoute} from '@angular/router';
import {parse} from '@angular/compiler/src/render3/view/style_parser';
import {Friend} from '../Friend';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id = -1;
  user: User;
  frienShip: Friend;

  constructor(private userService: UsersService,
              private activatedRoute: ActivatedRoute,
              private localStorage: LocalStorageService) {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = +paramMap.get('id');
      this.getUser(this.id);
    });

  }

  ngOnInit(): void {
    this.getFriendByDoubleId();
  }

  getFriendByDoubleId() {
    let senderId = null;
    let receiverId = this.user.userId;
    this.userService.getFriendByDoubleId(senderId, receiverId).subscribe(value => {
      console.log(value);
      this.frienShip = value;
    })
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(user => {
      this.user = user;
    });
  }
}
