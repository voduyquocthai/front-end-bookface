import {Component, Input, OnInit} from '@angular/core';
import {User} from '../User';
import {LocalStorageService} from 'ngx-webstorage';
import {ActivatedRoute} from '@angular/router';
import {Friend} from '../Friend';
import {UsersService} from '../service/users.service';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Input()user: User = {};
  @Input()check: boolean;
  id = -1;
  friendShip: Friend;
  constructor(private localStorage: LocalStorageService,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService) {
    this.activatedRoute.paramMap.subscribe(param => {
      this.id = +param.get('id');
      if (this.localStorage.retrieve('userId') === this.id){
        this.check = true;
      }
    });
  }

  ngOnInit(): void {
  }
  getFriendByDoubleId() {
    let senderId = this.localStorage.retrieve('userId');
    let receiverId = this.id;
    this.userService.getFriendByDoubleId(senderId, receiverId).subscribe(value => {
      console.log(value);
      // this.friendShip = value;
    });
  }

  addFriend() {
    this.friendShip = new Friend();
    this.friendShip = {
      sender: {
        userId: this.localStorage.retrieve('userId')
      },
      receiver: {
        userId: this.id
      },
      status: false
    };
    console.log(this.friendShip, 'friendship');

    this.userService.addFriendInFriendsUser(this.friendShip).subscribe(value => {
      console.log(value);
    });
  }
}
